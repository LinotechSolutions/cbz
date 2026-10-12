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
 * see the full list in the admin and only have to upload. Existing entries
 * (and any images already uploaded) are never touched.
 */
async function seedSiteImageSlots(strapi) {
  const existing = await strapi.db
    .query('api::site-image.site-image')
    .findMany({ select: ['key'] });
  const existingKeys = new Set(existing.map((entry) => entry.key));

  for (const slot of SITE_IMAGE_SLOTS) {
    if (existingKeys.has(slot.key)) continue;
    await strapi.documents('api::site-image.site-image').create({ data: slot });
    strapi.log.info(`Created site image slot: ${slot.key}`);
  }
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    await grantPublicReadAccess(strapi);
    await seedSiteImageSlots(strapi);
  },
};
