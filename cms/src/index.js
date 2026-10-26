const SITE_IMAGE_SLOTS = require('./site-image-slots');

// Content types the public website reads without an API token.
const PUBLIC_READ_ACTIONS = [
  'api::announcement.announcement.find',
  'api::announcement.announcement.findOne',
  'api::corporate-fact.corporate-fact.find',
  'api::corporate-fact.corporate-fact.findOne',
  'api::site-image.site-image.find',
  'api::site-image.site-image.findOne',
];

/**
 * Grants the Public role read access so a fresh production database serves
 * the public endpoints instead of 403.
 */
async function grantPublicReadAccess(strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  const existing = await strapi.db.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id, action: { $in: PUBLIC_READ_ACTIONS } },
  });
  const granted = new Set(existing.map((permission) => permission.action));

  for (const action of PUBLIC_READ_ACTIONS) {
    if (granted.has(action)) continue;
    await strapi.db.query('plugin::users-permissions.permission').create({
      data: { action, role: publicRole.id },
    });
    strapi.log.info(`Granted public permission: ${action}`);
  }
}

/**
 * Creates an empty Site Image entry for every slot the website uses, so editors
 * see the full list in the admin and only have to upload.
 *
 * Existing entries keep their image and alt text untouched. Their descriptive
 * fields (label, location, size, framing) are refreshed from the registry, so
 * the guidance editors see stays in step with where the website actually puts
 * each picture. Entries whose key the website no longer asks for are logged,
 * not deleted: they may carry an upload someone wants back.
 */
async function seedSiteImageSlots(strapi) {
  const existing = await strapi.db
    .query('api::site-image.site-image')
    .findMany({ select: ['documentId', 'key', 'label', 'location', 'size', 'framing'] });
  const byKey = new Map(existing.map((entry) => [entry.key, entry]));
  const wanted = new Set(SITE_IMAGE_SLOTS.map((slot) => slot.key));

  for (const slot of SITE_IMAGE_SLOTS) {
    const current = byKey.get(slot.key);
    if (!current) {
      await strapi.documents('api::site-image.site-image').create({ data: slot });
      strapi.log.info(`Created site image slot: ${slot.key}`);
      continue;
    }
    const descriptive = {
      label: slot.label,
      location: slot.location ?? null,
      size: slot.size ?? null,
      framing: slot.framing ?? null,
    };
    const changed = Object.keys(descriptive).some((field) => (current[field] ?? null) !== descriptive[field]);
    if (changed) {
      await strapi.documents('api::site-image.site-image').update({
        documentId: current.documentId,
        data: descriptive,
      });
      strapi.log.info(`Refreshed site image slot: ${slot.key}`);
    }
  }

  for (const entry of existing) {
    if (!wanted.has(entry.key)) {
      strapi.log.warn(`Site image slot no longer used by the website: ${entry.key} (left in place)`);
    }
  }
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    await grantPublicReadAccess(strapi);
    await seedSiteImageSlots(strapi);
  },
};
