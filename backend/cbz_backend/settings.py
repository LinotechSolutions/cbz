import os
import sys
from datetime import timedelta
from pathlib import Path
import environ
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
# Read .env file if it exists
env_file = BASE_DIR / ".env"
if env_file.exists():
    environ.Env.read_env(env_file)

# Secret key loading: checks DJANGO_SECRET_KEY, then SECRET_KEY.
SECRET_KEY = env.str("DJANGO_SECRET_KEY", default=env.str("SECRET_KEY", default=""))
DEBUG = env.bool("DJANGO_DEBUG", default=False)

# Values that were once committed to this repository. They also sign every JWT
# (SIMPLE_JWT["SIGNING_KEY"]), so anyone holding one could mint admin tokens.
# Deployments must fail rather than fall back to them.
_COMPROMISED_SECRET_PREFIXES = ("django-insecure", "production-cbz-secret-key")

if not SECRET_KEY or SECRET_KEY.startswith(_COMPROMISED_SECRET_PREFIXES):
    if DEBUG:
        # Fixed, never-deployed value: generating one per process would give each
        # worker a different key and invalidate tokens across workers.
        SECRET_KEY = "django-insecure-local-development-only-do-not-deploy"
    else:
        raise ImproperlyConfigured(
            "DJANGO_SECRET_KEY must be set to a strong, unpublished random value. "
            "Generate one with: python -c \"from django.core.management.utils import "
            "get_random_secret_key; print(get_random_secret_key())\""
        )

ALLOWED_HOSTS = env.list(
    "DJANGO_ALLOWED_HOSTS",
    default=[
        "localhost",
        "127.0.0.1",
        "0.0.0.0",
        "testserver",
        ".cbz.co.zw",
        "cbz.co.zw",
        ".railway.app",
        ".vercel.app",
    ],
)

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "axes",
    # CBZ Domain apps
    "core.apps.CoreConfig",
    "accounts.apps.AccountsConfig",
    "audit.apps.AuditConfig",
    "countries.apps.CountriesConfig",
    "subsidiaries.apps.SubsidiariesConfig",
    "products.apps.ProductsConfig",
    "billers.apps.BillersConfig",
    "branches.apps.BranchesConfig",
    "insurance.apps.InsuranceConfig",
    "calculators.apps.CalculatorsConfig",
    "chatbot.apps.ChatbotConfig",
    "communications.apps.CommunicationsConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "core.middleware.SecurityHeadersMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # Must stay last: it inspects the outcome of the authentication above.
    "axes.middleware.AxesMiddleware",
]

# ============================================================
# Brute-force lockout (django-axes)
# ============================================================
# Guards the Django admin, which exposes every customer's KYC record, and the
# customer login API. Rate limiting alone does not stop credential stuffing.
AUTHENTICATION_BACKENDS = [
    "axes.backends.AxesStandaloneBackend",
    "django.contrib.auth.backends.ModelBackend",
]
AXES_FAILURE_LIMIT = env.int("AXES_FAILURE_LIMIT", default=5)
AXES_COOLOFF_TIME = timedelta(hours=env.int("AXES_COOLOFF_HOURS", default=1))
# Lock the (username, IP) pair rather than the IP alone: locking by IP only would
# let one attacker lock out every customer behind the same carrier NAT, and would
# let an attacker rotating IPs walk past the limit.
AXES_LOCKOUT_PARAMETERS = [["username", "ip_address"]]
AXES_RESET_ON_SUCCESS = True
# Take the client IP from the proxy-appended right-most X-Forwarded-For entry,
# matching core.ip.client_ip. Otherwise every request looks like Railway's proxy
# and a single attacker could lock out all users at once.
AXES_IPWARE_PROXY_COUNT = env.int("TRUSTED_PROXY_COUNT", default=1)
AXES_IPWARE_META_PRECEDENCE_ORDER = ["HTTP_X_FORWARDED_FOR", "REMOTE_ADDR"]

ROOT_URLCONF = "cbz_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "cbz_backend.wsgi.application"
ASGI_APPLICATION = "cbz_backend.asgi.application"

# Database Configuration (PostgreSQL primary via DATABASE_URL; fallback to SQLite in dev)
DATABASE_URL = env.str("DATABASE_URL", default="")
if DATABASE_URL:
    DATABASES = {
        "default": env.db("DATABASE_URL"),
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "cbz_local.sqlite3",
        }
    }

# Custom User Model
AUTH_USER_MODEL = "accounts.User"

# Password Hashing — Argon2 first (Non-negotiable requirement)
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 8}},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Harare"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ============================================================
# CORS & CSRF Configuration
# ============================================================
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS",
    default=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://cbz.co.zw",
        "https://www.cbz.co.zw",
    ],
)
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/.*\.vercel\.app$",
    r"^https:\/\/.*\.up\.railway\.app$",
    r"^https:\/\/([a-zA-Z0-9-]+\.)*cbz\.co\.zw$",
    r"^http:\/\/localhost:\d+$",
    r"^http:\/\/127\.0\.0\.1:\d+$",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CSRF_TRUSTED_ORIGINS = env.list(
    "CSRF_TRUSTED_ORIGINS",
    default=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://*.vercel.app",
        "https://*.up.railway.app",
        "https://*.cbz.co.zw",
        "https://cbz.co.zw",
    ],
)
CSRF_COOKIE_HTTPONLY = False  # Client reads CSRF cookie to provide in X-CSRFToken header
CSRF_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SAMESITE = "Lax"
AUTH_COOKIE_SAMESITE = "Lax"

# ============================================================
# Security & Production Hardening
# ============================================================
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("SECURE_SSL_REDIRECT", default=False)
SECURE_HSTS_SECONDS = env.int("SECURE_HSTS_SECONDS", default=31536000 if not DEBUG else 0)
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SECURE_HSTS_PRELOAD = not DEBUG
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"

SESSION_COOKIE_SECURE = env.bool("SESSION_COOKIE_SECURE", default=not DEBUG)
CSRF_COOKIE_SECURE = env.bool("CSRF_COOKIE_SECURE", default=not DEBUG)
SESSION_COOKIE_HTTPONLY = True

# Obscured Admin Path (No default /admin/)
ADMIN_URL_PATH = env.str("ADMIN_URL_PATH", default="cbz-secure-admin/")
if not ADMIN_URL_PATH.endswith("/"):
    ADMIN_URL_PATH += "/"
if not DEBUG and ADMIN_URL_PATH == "cbz-secure-admin/":
    # The default is published in this repository, so it hides nothing. The real
    # control is the django-axes lockout above; this is defence in depth only.
    import warnings

    warnings.warn(
        "ADMIN_URL_PATH is still the public default. Set it to an unguessable "
        "value in the deployment environment.",
        RuntimeWarning,
    )

# Gemini API Key
GEMINI_API_KEY = env.str("GEMINI_API_KEY", default="")

# ============================================================
# Email (customer journey confirmations)
# ============================================================
# Azure Communication Services over HTTPS (used on Railway, which blocks SMTP
# below the Pro plan). Set ACS_EMAIL_ENDPOINT + AZURE_TENANT_ID + AZURE_CLIENT_ID
# + AZURE_CLIENT_SECRET, or ACS_CONNECTION_STRING.
ACS_EMAIL_ENDPOINT = env.str("ACS_EMAIL_ENDPOINT", default="")
ACS_CONNECTION_STRING = env.str("ACS_CONNECTION_STRING", default="")
AZURE_TENANT_ID = env.str("AZURE_TENANT_ID", default="")
AZURE_CLIENT_ID = env.str("AZURE_CLIENT_ID", default="")
# The Entra app secret is also the SMTP password, so either variable works
AZURE_CLIENT_SECRET = env.str("AZURE_CLIENT_SECRET", default=env.str("EMAIL_HOST_PASSWORD", default=""))

# Otherwise SMTP if EMAIL_HOST is set. With no provider at all, mail must NOT fall
# back to the console backend outside local development: these messages carry full
# KYC data (national ID, date of birth, address) and would be written to the
# hosting provider's log stream in clear text.
EMAIL_HOST = env.str("EMAIL_HOST", default="")
if ACS_CONNECTION_STRING or ACS_EMAIL_ENDPOINT:
    _DEFAULT_EMAIL_BACKEND = "core.email_backends.AzureCommunicationEmailBackend"
elif EMAIL_HOST:
    _DEFAULT_EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
elif DEBUG:
    _DEFAULT_EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    # Logs that mail could not be sent, with no message body. Deliberately not a
    # hard failure: a missing mail variable must not take the whole API down.
    _DEFAULT_EMAIL_BACKEND = "core.email_backends.UnconfiguredEmailBackend"
EMAIL_BACKEND = env.str("EMAIL_BACKEND", default=_DEFAULT_EMAIL_BACKEND)
EMAIL_PORT = env.int("EMAIL_PORT", default=587)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER", default="webcenter@cbz.co.zw")
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD", default="")
EMAIL_TIMEOUT = env.int("EMAIL_TIMEOUT", default=15)
DEFAULT_FROM_EMAIL = env.str("DEFAULT_FROM_EMAIL", default="CBZ <webcenter@cbz.co.zw>")
# Monitored inbox: receives new-request notifications and customers' replies
CONTACT_CENTRE_EMAIL = env.str("CONTACT_CENTRE_EMAIL", default="contactcentre@cbz.co.zw")
# Send in a background thread so SMTP latency never slows the customer's submit
EMAIL_SEND_ASYNC = env.bool("EMAIL_SEND_ASYNC", default=True)

# ============================================================
# Cache & Rate Limiting Backend (Redis / LocMem)
# ============================================================
REDIS_URL = env.str("REDIS_URL", default="")
if not REDIS_URL and not DEBUG:
    # Rate limiting is only as good as its counter store. LocMemCache is per
    # process, so each uvicorn worker counts separately and every restart resets
    # the counts, multiplying the effective limits by the worker count.
    import warnings

    warnings.warn(
        "REDIS_URL is not set: throttle counters are per-worker and reset on "
        "restart, so rate limits are not enforced accurately in production.",
        RuntimeWarning,
    )
if REDIS_URL:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_URL,
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
            },
        }
    }
else:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "cbz-rate-limit-cache",
        }
    }

# ============================================================
# Django REST Framework Configuration
# ============================================================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "accounts.authentication.CookieJWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
    "DEFAULT_THROTTLE_CLASSES": (
        "core.throttling.AnonGlobalThrottle",
        "core.throttling.UserGlobalThrottle",
    ),
    "DEFAULT_THROTTLE_RATES": {
        "anon": env.str("ANON_THROTTLE_RATE", default="60/minute"),
        "user": env.str("USER_THROTTLE_RATE", default="120/minute"),
        "auth": env.str("AUTH_THROTTLE_RATE", default="5/minute"),
        "chatbot": env.str("CHATBOT_THROTTLE_RATE", default="10/minute"),
    },
    # Number of trusted proxies appending to X-Forwarded-For. Railway's edge adds
    # exactly one entry (the real client IP) and does not strip a client-supplied
    # header, so DRF must key throttles on the right-most entry. Without this it
    # uses the whole header, which the caller controls, and every rate limit can
    # be bypassed by varying it per request. Keep in step with TRUSTED_PROXY_COUNT.
    "NUM_PROXIES": env.int("TRUSTED_PROXY_COUNT", default=1),
    "EXCEPTION_HANDLER": "core.exceptions.custom_exception_handler",
}

# Used by core.ip.client_ip for the audit trail; mirrors NUM_PROXIES above.
TRUSTED_PROXY_COUNT = env.int("TRUSTED_PROXY_COUNT", default=1)

# SimpleJWT Settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(
        seconds=env.int("JWT_ACCESS_TOKEN_LIFETIME", default=300)
    ),
    "REFRESH_TOKEN_LIFETIME": timedelta(
        seconds=env.int("JWT_REFRESH_TOKEN_LIFETIME", default=86400)
    ),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

JWT_AUTH_COOKIE = "access_token"
JWT_AUTH_REFRESH_COOKIE = "refresh_token"

# ============================================================
# Structured Logging with Sensitive Data Redaction
# ============================================================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "redacting_filter": {
            "()": "core.logging.RedactingFilter",
        },
    },
    "formatters": {
        "verbose": {
            "format": "[{asctime}] [{levelname}] [{name}] {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
            "filters": ["redacting_filter"],
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": False,
        },
        "cbz_backend": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": False,
        },
        "audit": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": False,
        },
    },
}
