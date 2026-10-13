"""
Customer journey emails: a confirmation to the customer and a notification to
the contact centre for every onboarding request.

Email is best-effort: the request is already saved before anything is sent, and
a mail failure is logged, never shown to the customer.
"""
import logging
import re
import threading

from django.conf import settings
from django.core.mail import EmailMessage, get_connection

from accounts.models import OnboardingApplication

logger = logging.getLogger(__name__)

# Journey ids from frontend/src/data/cbzJourneys.ts -> what the customer sees
SERVICE_NAMES = {
    "account": "account opening with CBZ Bank",
    "bank": "banking request with CBZ Bank",
    "properties": "property enquiry with CBZ Properties",
    "insurance": "insurance quote request with CBZ Insurance",
    "life": "life cover request with CBZ Life",
    "datvest": "investment enquiry with Datvest",
    "agroyield": "farming finance request with CBZ Agro-Yield",
    "redsphere": "microfinance request with Red Sphere",
    "riskadvisory": "advisory request with CBZ Risk Advisory",
    "capital": "enquiry with CBZ Capital",
}


def _service_name(service: str) -> str:
    return SERVICE_NAMES.get(service, f"{service} request")


def _humanize(key: str) -> str:
    """'monthlyDeposits' -> 'Monthly deposits', 'documents_smartcash' -> 'Documents smartcash'."""
    words = re.sub(r"(?<!^)(?=[A-Z])", " ", key).replace("_", " ")
    return words[:1].upper() + words[1:].lower()


def _format_answers(answers: dict) -> str:
    lines = []
    for key, value in (answers or {}).items():
        if value in ("", None, []):
            continue
        shown = ", ".join(str(v) for v in value) if isinstance(value, list) else str(value)
        lines.append(f"{_humanize(key)}: {shown}")
    return "\n".join(lines) or "(none)"


def _customer_email(app: OnboardingApplication) -> EmailMessage:
    body = (
        f"Hi {app.first_name},\n\n"
        f"Thank you for your {_service_name(app.service)}. We've received it and "
        f"one of our team will contact you shortly.\n\n"
        f"Your reference number: {app.reference_code}\n"
        f"Please quote it if you contact us about this request.\n\n"
        f"If you have any questions, reply to this email or write to "
        f"{settings.CONTACT_CENTRE_EMAIL}.\n\n"
        f"Kind regards,\n"
        f"CBZ Holdings\n"
    )
    return EmailMessage(
        subject=f"We've received your request (Ref {app.reference_code})",
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[app.email],
        # Customer replies go to the monitored contact centre inbox
        reply_to=[settings.CONTACT_CENTRE_EMAIL],
    )


def _contact_centre_email(app: OnboardingApplication) -> EmailMessage:
    body = (
        f"New website request: {_service_name(app.service)}\n\n"
        f"Reference: {app.reference_code}\n"
        f"Submitted: {app.created_at:%Y-%m-%d %H:%M} UTC\n\n"
        f"CUSTOMER\n"
        f"Name: {app.first_name} {app.surname}\n"
        f"National ID: {app.national_id}\n"
        f"Date of birth: {app.date_of_birth}\n"
        f"Phone: {app.phone}\n"
        f"Email: {app.email}\n"
        f"Address: {app.address}\n\n"
        f"REQUEST DETAILS\n"
        f"{_format_answers(app.answers)}\n\n"
        f"Reply to this email to respond to the customer directly.\n"
    )
    return EmailMessage(
        subject=f"New {app.service} request from {app.first_name} {app.surname} ({app.reference_code})",
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.CONTACT_CENTRE_EMAIL],
        # Staff replies go straight to the customer
        reply_to=[app.email],
    )


def _send(app: OnboardingApplication) -> None:
    try:
        with get_connection() as connection:
            connection.send_messages([_customer_email(app), _contact_centre_email(app)])
        logger.info("Onboarding emails sent for %s", app.reference_code)
    except Exception:
        logger.exception("Onboarding emails failed for %s", app.reference_code)


def send_onboarding_emails(app: OnboardingApplication) -> None:
    if settings.EMAIL_SEND_ASYNC:
        threading.Thread(target=_send, args=(app,), daemon=True).start()
    else:
        _send(app)
