import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections. A missing or malformed value fails the build instead of
 * reaching the page. Unconfirmed values are `null`, never placeholder strings.
 */

const nullableString = z.string().nullable();

export const clusterSchema = z.enum(['banking', 'investments', 'insurance', 'agro-business', 'philanthropy']);

export const logoKeySchema = z.enum([
  'holdings',
  'bank',
  'insurance',
  'life',
  'datvest',
  'capital',
  'properties',
  'agro-yield',
  'risk-advisory',
  'red-sphere',
  'cbz-touch',
  'ziki-cash',
  'ziki-mall',
  'cbz-way',
]);

const imageRef = z.object({
  src: z.string().min(1),
  alt: z.string(),
});

const cta = z.object({ label: z.string().min(1), href: z.string().min(1) });

/**
 * One child of a site-map branch. `kind` decides how it renders:
 *  - form | page: a link card to a page on this site
 *  - external: an off-site link card, hidden while `href` is null
 *  - app: the App Store and Google Play badges for `app`
 *  - products: the product list for `categories` and/or `productIds`, inline
 *  - calculator: the named calculator, inline
 *  - listings: the property listings grid with filters, inline
 *  - note: a dashed information card with no link
 *  - faq: an accordion of `faqs`, then a "still unanswered?" card whose
 *    button goes to `href` (usually the unit's call-back form)
 */
const branchItem = z.object({
  label: z.string().min(1),
  line: nullableString.default(null),
  kind: z.enum(['form', 'page', 'external', 'app', 'products', 'calculator', 'listings', 'note', 'faq']),
  href: nullableString.default(null),
  /** A photograph on the left of the link card. */
  image: imageRef.optional(),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).optional(),
  app: z.enum(['cbz-touch', 'red-sphere', 'ziki-cash']).optional(),
  categories: z.array(z.string()).optional(),
  productIds: z.array(z.string()).optional(),
  calculator: z.enum(['mortgage', 'carFinance', 'carInsurance', 'policyQuote', 'loan']).optional(),
});

const branch = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  line: nullableString.default(null),
  /** A branch with a single link renders as a feature panel; these dress it. */
  image: imageRef.optional(),
  points: z.array(z.object({ label: z.string().min(1), icon: z.string().optional() })).max(3).optional(),
  items: z.array(branchItem).min(1),
});

const units = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/units' }),
  schema: z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    shortName: z.string().min(1),
    cluster: clusterSchema,
    logo: logoKeySchema,
    order: z.number().int(),
    hero: z.object({ title: z.string().max(60), lede: z.string().max(160), image: imageRef }),
    primaryCta: cta,
    secondaryCta: cta.nullable(),
    /** Audience chips under the hero, from the site map. Each links to a branch or product tab. */
    segments: z.array(z.object({ label: z.string(), line: nullableString.default(null), href: z.string() })).default([]),
    /** The page, in order: one section per branch of the site map. */
    branches: z.array(branch).default([]),
    categories: z.array(z.object({ id: z.string(), label: z.string() })),
    productsNote: nullableString.default(null),
    /** Systems the unit integrates with, for the backend handoff. Never shown to customers. */
    systems: z.array(z.string()).default([]),
    heldEntities: z.array(z.object({ name: z.string(), stake: z.number().min(0).max(100) })).optional(),
    /** The About band after the branches: who the unit is, in one paragraph. */
    about: z.string().max(700).optional(),
    /** A photograph for the About band; the hero image when absent. */
    aboutImage: imageRef.optional(),
    keyFacts: z.array(z.object({ label: z.string(), value: nullableString })).max(6).optional(),
    /** Meet the team: leadership profiles. Empty until the unit supplies names, roles and photos. */
    team: z
      .array(z.object({ name: z.string().min(1), role: z.string().min(1), image: imageRef.nullable().default(null) }))
      .default([]),
    contact: z.object({ heading: z.string(), body: z.string() }).optional(),
    seo: z.object({ title: z.string().max(70), description: z.string().max(160) }),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    unit: z.string().min(1),
    category: z.string().min(1),
    productId: z.string().min(1),
    name: z.string().min(1),
    summary: z.string().max(320),
    benefits: z.array(z.string()),
    eligibility: z.array(z.string()).nullable(),
    audience: nullableString,
    /** Audience strip tags; set by scripts/port-content.ts from src/data/audiences.ts. */
    audiences: z.array(z.enum(['personal', 'business', 'school', 'diaspora'])).default([]),
    pricing: nullableString,
    details: z
      .object({
        tenor: nullableString,
        interestRate: nullableString,
        adminFee: nullableString,
        limit: nullableString,
      })
      .optional(),
    apply: cta,
    /** When set, these buttons replace `apply` on the card: the first is primary, the rest secondary. */
    actions: z.array(cta).nullable().default(null),
    image: imageRef.nullable(),
    order: z.number().int(),
    /** Draft products carry names only; figures were removed pending sign-off. */
    verified: z.boolean(),
  }),
});

const properties = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/properties' }),
  schema: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    type: z.enum(['residential', 'commercial', 'land']),
    location: z.string().min(1),
    status: z.enum(['for-sale', 'to-let', 'sold']),
    price: nullableString,
    summary: z.string().max(320),
    details: z.array(z.object({ label: z.string(), value: z.string() })),
    images: z.array(imageRef).min(1),
    tourUrl: nullableString,
    order: z.number().int(),
    verified: z.boolean(),
  }),
});

const deals = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/deals' }),
  schema: z.object({
    unit: z.enum(['capital', 'datvest']),
    client: z.string().min(1),
    sector: z.string().min(1),
    type: z.string().min(1),
    size: nullableString,
    year: z.number().int().min(1980).max(2100),
  }),
});

const campaigns = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/campaigns' }),
  schema: z.object({
    title: z.string().max(80),
    body: z.string().max(160),
    /** Unit slug, or null for a group-wide campaign shown on the home page. */
    unit: nullableString,
    offer: nullableString,
    image: imageRef,
    cta,
    starts: z.string().date(),
    ends: z.string().date(),
    order: z.number().int().default(0),
  }),
});

const notices = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/notices' }),
  schema: z.object({
    title: z.string().min(1),
    /** YAML turns an unquoted 2026-03-10 into a Date; both forms end up as YYYY-MM-DD. */
    date: z
      .union([z.string().date(), z.date()])
      .transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10))),
    category: z.enum(['shareholder', 'customer', 'regulatory', 'operational', 'security']),
    summary: z.string().max(400),
    reference: nullableString,
    urgent: z.boolean().default(false),
    document: nullableString,
    confirmed: z.boolean().default(false),
  }),
});

export const collections = { units, products, properties, deals, campaigns, notices };
