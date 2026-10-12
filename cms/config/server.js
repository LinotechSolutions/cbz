module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Public HTTPS URL (e.g. https://cms-production.up.railway.app). Used for admin
  // links and absolute media URLs.
  url: env('PUBLIC_URL', ''),
  // Railway terminates TLS at its proxy; trust X-Forwarded-* so secure admin
  // cookies work over HTTPS.
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
