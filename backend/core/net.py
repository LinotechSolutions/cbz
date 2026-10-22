"""
Client IP resolution behind trusted proxies.

The leftmost X-Forwarded-For entry is whatever the client chose to send, so it
must never be used for throttling, lockouts or audit records. Instead, either
read a single header that our edge proxy sets (CLIENT_IP_HEADER), or count
TRUSTED_PROXY_COUNT hops in from the right of X-Forwarded-For, since each
trusted proxy appends the address it received the connection from.
"""
import ipaddress

from django.conf import settings


def _valid_ip(value):
    if not value:
        return None
    value = value.strip()
    try:
        return str(ipaddress.ip_address(value))
    except ValueError:
        return None


def get_client_ip(request):
    """Returns the client's IP address as seen by our outermost trusted proxy, or None."""
    if request is None:
        return None
    meta = request.META

    header = getattr(settings, "CLIENT_IP_HEADER", "")
    if header:
        ip = _valid_ip(meta.get(header, "").split(",")[0])
        if ip:
            return ip

    proxy_count = getattr(settings, "TRUSTED_PROXY_COUNT", 1)
    forwarded_for = meta.get("HTTP_X_FORWARDED_FOR", "")
    if proxy_count > 0 and forwarded_for:
        hops = [hop.strip() for hop in forwarded_for.split(",") if hop.strip()]
        if hops:
            ip = _valid_ip(hops[-min(proxy_count, len(hops))])
            if ip:
                return ip

    return _valid_ip(meta.get("REMOTE_ADDR", ""))
