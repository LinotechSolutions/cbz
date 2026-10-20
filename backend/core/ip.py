"""
Trusted client IP resolution behind the Railway edge proxy.

Railway appends the real client IP as the RIGHT-MOST entry of X-Forwarded-For and
does not strip a client-supplied header, so the left-most entry is attacker
controlled. Verified against the deployment: a request carrying
`X-Forwarded-For: <any value>` arrives as "<any value>, <real client IP>".

Anything that identifies a caller (rate limiting, audit trail) must therefore read
the right-most entry. DRF's own throttles are kept consistent with this module by
REST_FRAMEWORK["NUM_PROXIES"] in settings.py.
"""
import ipaddress
import logging

from django.conf import settings

logger = logging.getLogger(__name__)


def client_ip(request):
    """
    Returns the caller's IP as a validated string, or None when it cannot be
    established. Never returns a client-supplied value.
    """
    if request is None:
        return None

    trusted_proxies = getattr(settings, "TRUSTED_PROXY_COUNT", 1)
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")

    candidate = None
    if forwarded and trusted_proxies > 0:
        hops = [hop.strip() for hop in forwarded.split(",") if hop.strip()]
        if hops:
            # The right-most `trusted_proxies` entries were added by infrastructure
            # we trust; the client controls everything to the left of them.
            candidate = hops[-min(trusted_proxies, len(hops))]
    if not candidate:
        candidate = request.META.get("REMOTE_ADDR")

    if not candidate:
        return None
    try:
        # Guard the GenericIPAddressField columns: a malformed value would raise
        # DataError on save, losing the audit row or 500-ing the request.
        return str(ipaddress.ip_address(candidate))
    except ValueError:
        logger.warning("Discarded malformed client IP from request headers")
        return None
