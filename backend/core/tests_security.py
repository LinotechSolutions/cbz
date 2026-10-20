"""Regression tests for the fixes from the October 2026 security assessment."""
from django.test import TestCase, override_settings

from chatbot.services import sanitize_pii
from core.ip import client_ip


class _Req:
    def __init__(self, **meta):
        self.META = meta


@override_settings(TRUSTED_PROXY_COUNT=1)
class ClientIpTests(TestCase):
    """The proxy appends the real IP on the right; the caller controls the left."""

    def test_uses_proxy_appended_entry_not_client_supplied_one(self):
        req = _Req(HTTP_X_FORWARDED_FOR="1.2.3.4, 41.175.158.254", REMOTE_ADDR="10.0.0.1")
        self.assertEqual(client_ip(req), "41.175.158.254")

    def test_single_entry_header(self):
        self.assertEqual(client_ip(_Req(HTTP_X_FORWARDED_FOR="41.175.158.254")), "41.175.158.254")

    def test_spoofed_values_cannot_change_the_identity(self):
        real = "41.175.158.254"
        idents = {
            client_ip(_Req(HTTP_X_FORWARDED_FOR=f"{spoof}, {real}"))
            for spoof in ("1.1.1.1", "2.2.2.2", "9.9.9.9")
        }
        self.assertEqual(idents, {real})

    def test_falls_back_to_remote_addr(self):
        self.assertEqual(client_ip(_Req(REMOTE_ADDR="10.0.0.1")), "10.0.0.1")

    def test_malformed_value_is_discarded_not_persisted(self):
        # Would otherwise raise DataError against the inet column and lose the row.
        self.assertIsNone(client_ip(_Req(HTTP_X_FORWARDED_FOR="not-an-ip")))

    def test_no_request(self):
        self.assertIsNone(client_ip(None))


class SanitizePiiTests(TestCase):
    def test_redacts_national_id_formats(self):
        for raw in ("63-1234567-X-42", "63-119284 K18", "63-1234567X42"):
            self.assertNotIn(raw, sanitize_pii(f"my id is {raw} ok"), raw)

    def test_redacts_phone_formats(self):
        for raw in ("+263 77 123 4567", "0771234567", "263771234567"):
            self.assertNotIn(raw, sanitize_pii(f"call {raw}"), raw)

    def test_redacts_card_and_account_numbers(self):
        self.assertNotIn("4111111111111111", sanitize_pii("card 4111111111111111"))
        self.assertNotIn("4111 1111 1111 1111", sanitize_pii("card 4111 1111 1111 1111"))
        self.assertNotIn("012345678", sanitize_pii("acct 012345678"))

    def test_redacts_email(self):
        self.assertNotIn("a.b@example.com", sanitize_pii("mail a.b@example.com"))

    def test_leaves_ordinary_text_and_amounts_alone(self):
        kept = "I want to open an account with USD 500 at branch 12 in 2026"
        self.assertEqual(sanitize_pii(kept), kept)


class SecretKeyPolicyTests(TestCase):
    """The published fallback key also signs every JWT, so it must never load."""

    def _load(self, env):
        import os
        from importlib import reload
        from unittest import mock

        import cbz_backend.settings as settings_module

        with mock.patch.dict(os.environ, env, clear=False):
            return reload(settings_module)

    def test_rejects_published_key_in_production(self):
        from django.core.exceptions import ImproperlyConfigured

        with self.assertRaises(ImproperlyConfigured):
            self._load({
                "DJANGO_DEBUG": "False",
                "DJANGO_SECRET_KEY": "django-insecure-cbz-production-deploy-key-59a8c1f0e2d3b4a5927c81b0",
            })

    def test_rejects_empty_key_in_production(self):
        from django.core.exceptions import ImproperlyConfigured

        with self.assertRaises(ImproperlyConfigured):
            self._load({"DJANGO_DEBUG": "False", "DJANGO_SECRET_KEY": "", "SECRET_KEY": ""})

    def test_accepts_a_real_key(self):
        module = self._load({"DJANGO_DEBUG": "False", "DJANGO_SECRET_KEY": "x" * 60})
        self.assertEqual(module.SECRET_KEY, "x" * 60)
        self.assertEqual(module.SIMPLE_JWT["SIGNING_KEY"], "x" * 60)


class EmailFallbackTests(TestCase):
    def test_unconfigured_backend_logs_without_the_message_body(self):
        from django.core.mail import EmailMessage

        from core.email_backends import UnconfiguredEmailBackend

        message = EmailMessage(
            subject="We've received your request (Ref AC-1)",
            body="National ID: 63-1234567-X-42",
            from_email="webcenter@cbz.co.zw",
            to=["customer@example.com"],
        )
        with self.assertLogs("core.email_backends", level="WARNING") as logs:
            self.assertEqual(UnconfiguredEmailBackend().send_messages([message]), 0)
        logged = "\n".join(logs.output)
        self.assertNotIn("63-1234567-X-42", logged)
        self.assertNotIn("customer@example.com", logged)
