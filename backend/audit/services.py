import logging
from audit.models import AuditLog
from core.ip import client_ip

logger = logging.getLogger(__name__)


def get_client_ip(request):
    """
    Safely extracts the client IP address.

    Delegates to core.ip.client_ip, which reads the proxy-appended right-most
    X-Forwarded-For entry. Reading the left-most entry would let a caller forge
    the address recorded against their own actions.
    """
    return client_ip(request)


def record_audit_event(
    request,
    action: str,
    status: str = "success",
    user=None,
    username: str = None,
    details: dict = None,
):
    """
    Creates an immutable audit log entry.
    Filters out any sensitive payload items.
    """
    try:
        ip = get_client_ip(request)
        user_agent = request.META.get("HTTP_USER_AGENT", "") if request else ""
        
        target_user = user
        if not target_user and request and getattr(request, "user", None) and request.user.is_authenticated:
            target_user = request.user

        target_username = username
        if not target_username and target_user:
            target_username = getattr(target_user, "username", str(target_user))

        safe_details = {}
        if details and isinstance(details, dict):
            # Sanitize details, ensure no passwords or tokens are stored
            for k, v in details.items():
                if any(bad in k.lower() for bad in ["password", "token", "secret", "cookie"]):
                    safe_details[k] = "[REDACTED]"
                else:
                    safe_details[k] = str(v)[:256]

        AuditLog.objects.create(
            user=target_user,
            username=target_username,
            action=action,
            ip_address=ip,
            user_agent=user_agent[:500],
            status=status,
            details=safe_details,
        )
    except Exception as exc:
        logger.error("Failed to record audit event %s: %s", action, exc)
