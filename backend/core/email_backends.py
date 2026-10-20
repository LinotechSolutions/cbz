"""
Django email backend for Azure Communication Services Email over HTTPS.

Railway blocks outbound SMTP (ports 465/587) below the Pro plan, so mail goes
through the ACS REST API on port 443 instead. Authenticates with the Entra app
(tenant/client ID + client secret), or with an ACS connection string if set.
"""
import logging
from email.utils import parseaddr

from django.conf import settings
from django.core.mail.backends.base import BaseEmailBackend

logger = logging.getLogger(__name__)


class UnconfiguredEmailBackend(BaseEmailBackend):
    """
    Last-resort backend when no mail provider is configured outside development.

    Django's console backend would print the whole message, and these messages
    carry full KYC data (national ID, date of birth, address) that would then sit
    in the hosting provider's log stream in clear text. This records only that a
    message could not be sent, never its body or recipients.
    """

    def send_messages(self, email_messages):
        for message in email_messages:
            logger.warning(
                "No email provider configured; message not sent (subject=%r, recipients=%d)",
                message.subject,
                len(message.recipients()),
            )
        # Report nothing sent so callers log a failure rather than success.
        return 0


class AzureCommunicationEmailBackend(BaseEmailBackend):
    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        self._client = None

    def _get_client(self):
        if self._client is None:
            from azure.communication.email import EmailClient

            if settings.ACS_CONNECTION_STRING:
                self._client = EmailClient.from_connection_string(settings.ACS_CONNECTION_STRING)
            else:
                from azure.identity import ClientSecretCredential

                credential = ClientSecretCredential(
                    tenant_id=settings.AZURE_TENANT_ID,
                    client_id=settings.AZURE_CLIENT_ID,
                    client_secret=settings.AZURE_CLIENT_SECRET,
                )
                self._client = EmailClient(settings.ACS_EMAIL_ENDPOINT, credential)
        return self._client

    @staticmethod
    def _to_acs_message(message):
        addresses = lambda emails: [{"address": parseaddr(e)[1]} for e in emails]
        content = {"subject": message.subject, "plainText": message.body}
        for alternative, mimetype in getattr(message, "alternatives", []):
            if mimetype == "text/html":
                content["html"] = alternative
        acs_message = {
            # ACS sends from a verified MailFrom address; the display name is set in Azure
            "senderAddress": parseaddr(message.from_email)[1],
            "recipients": {
                "to": addresses(message.to),
                "cc": addresses(message.cc),
                "bcc": addresses(message.bcc),
            },
            "content": content,
        }
        if message.reply_to:
            acs_message["replyTo"] = addresses(message.reply_to)
        return acs_message

    def send_messages(self, email_messages):
        sent = 0
        for message in email_messages:
            if not message.recipients():
                continue
            try:
                poller = self._get_client().begin_send(self._to_acs_message(message))
                result = poller.result(timeout=settings.EMAIL_TIMEOUT * 4)
                if result.get("status") != "Succeeded":
                    raise RuntimeError(f"ACS email status {result.get('status')}: {result.get('error')}")
                sent += 1
            except Exception:
                if not self.fail_silently:
                    raise
                logger.exception("Azure email send failed")
        return sent
