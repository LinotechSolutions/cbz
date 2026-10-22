// CORS_ORIGINS (comma-separated, e.g. "https://cbz.co.zw,https://*.up.railway.app")
// ADDS to these defaults; it never replaces them, so setting the variable on the
// host can't accidentally block the production frontend.
const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://cbz.co.zw',
  'https://www.cbz.co.zw',
  'https://cbz.vercel.app',
  'https://*.vercel.app',
  'https://*.up.railway.app',
];

const ALLOWED_ORIGINS = [
  ...DEFAULT_ORIGINS,
  ...(process.env.CORS_ORIGINS || '').split(','),
]
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'https://images.unsplash.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      // Strapi matches origins exactly, so wildcard entries like
      // "https://*.vercel.app" are expanded here instead.
      origin: (ctx) => {
        const requestOrigin = ctx.get('Origin');
        const allowed = ALLOWED_ORIGINS.some((pattern) =>
          pattern.includes('*')
            ? new RegExp(`^${pattern.replace(/[.]/g, '\\.').replace('*', '[a-z0-9-]+')}$`).test(requestOrigin)
            : pattern === requestOrigin
        );
        return allowed ? requestOrigin : '';
      },
      headers: ['*'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
