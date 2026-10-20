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


def _validated(value):
    """Returns a normalised IP string, or None when the value is not an IP."""
    if not value:
        return None
    try:
        return str(ipaddress.ip_address(value.strip()))
    except ValueError:
        return None


def client_ip(request):
    """
    Returns the caller's IP as a validated string, or None when it cannot be
    established. Never returns a client-supplied value.
    """
    if request is None:
        return None

    # Optional: a single header the edge proxy sets and always overwrites, such as
    # HTTP_X_REAL_IP. Preferred when available, since it does not depend on
    # counting hops. Left unset by default because it is only safe if the proxy
    # is known to overwrite, not pass through, whatever the client sent.
    header = getattr(settings, "CLIENT_IP_HEADER", "")
    if header:
        from_header = _validated(request.META.get(header, "").split(",")[0])
        if from_header:
            return from_header

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

    # Guard the GenericIPAddressField columns: a malformed value would raise
    # DataError on save, losing the audit row or 500-ing the request.
    resolved = _validated(candidate)
    if candidate and not resolved:
        logger.warning("Discarded malformed client IP from request headers")
    return resolved
