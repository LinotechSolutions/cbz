/**
 * Ports the current site's product data (src/content/_import) into content
 * collection files. Idempotent: run before every build.
 *
 *  - products/<unit>/<id>.json      one file per product
 *  - properties/<id>.json           draft listings from the Properties catalogue
 *  - notices/<id>.md                the existing announcements, marked unconfirmed
 *
 * Properties, Datvest and Insurance are draft catalogues: names and summaries
 * are kept, every price, premium, yield and rate becomes null.
 */
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BANK_PRODUCTS } from '../src/content/_import/data/products/bank';
import { RED_SPHERE_PRODUCTS } from '../src/content/_import/data/products/redSphere';
import { CAPITAL_PRODUCTS } from '../src/content/_import/data/products/capital';
import { LIFE_PRODUCTS } from '../src/content/_import/data/products/life';
import { RISK_ADVISORY_PRODUCTS } from '../src/content/_import/data/products/riskAdvisory';
import { AGRO_PRODUCTS } from '../src/content/_import/data/products/agro';
import { SBU_PRODUCTS, INVESTMENT_PRODUCTS, PROPERTY_PRODUCTS } from '../src/content/_import/data/cbzData';
import { ANNOUNCEMENTS } from '../src/content/_import/data/announcementsData';
import type { ProductItem } from '../src/content/_import/types';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (...p: string[]) => join(root, 'src', 'content', ...p);

interface Cta {
  label: string;
  href: string;
}
interface UnitPort {
  unit: string;
  source: Record<string, ProductItem[]>;
  verified: boolean;
  apply: (category: string) => Cta;
  /** Per-product buttons that replace the category default, keyed by product id. */
  actions?: Record<string, Cta[]>;
  /** Rename source categories where the new site uses a different id. */
  category?: (id: string) => string;
}

/* Digital channels and merchant devices do not open an account: they go to
   the app stores, to internet banking, or to a relationship manager. */
const LOGIN: Cta = { label: 'Log in to internet banking', href: '/login' };
const AGENT: Cta = { label: 'Speak to an agent', href: '/bank/call-me-back' };
const BANK_ACTIONS: Record<string, Cta[]> = {
  cbz_touch: [
    { label: 'App Store', href: 'https://apps.apple.com/zw/app/cbz-touch/id1099147682' },
    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=zw.co.cbz.touch' },
  ],
  internet_banking: [LOGIN],
  e_statements: [LOGIN],
  visa_pos: [AGENT],
  local_pos: [AGENT],
  kleva_pos: [AGENT],
};

const UNITS: UnitPort[] = [
  {
    unit: 'bank',
    source: BANK_PRODUCTS,
    verified: true,
    apply: (c) =>
      c === 'loans'
        ? { label: 'Apply for a loan', href: '/bank/apply' }
        : { label: 'Open an account', href: '/bank/open-account' },
    actions: BANK_ACTIONS,
  },
  {
    unit: 'red-sphere',
    source: RED_SPHERE_PRODUCTS,
    verified: true,
    // Applications go through the Red Sphere app on Google Play.
    apply: () => ({ label: 'Apply online', href: 'https://play.google.com/store/apps/details?id=zw.co.cbz.redsphere&hl=en' }),
  },
  {
    unit: 'capital',
    source: CAPITAL_PRODUCTS,
    verified: true,
    apply: () => ({ label: 'Start a capital enquiry', href: '/capital/enquiry' }),
  },
  {
    unit: 'cbz-life',
    source: LIFE_PRODUCTS,
    verified: true,
    apply: () => ({ label: 'Request a quotation', href: '/cbz-life/quote' }),
  },
  {
    unit: 'risk-advisory',
    source: RISK_ADVISORY_PRODUCTS,
    verified: true,
    apply: () => ({ label: 'Request a risk consultation', href: '/risk-advisory/consultation' }),
  },
  {
    unit: 'agro-yield',
    source: AGRO_PRODUCTS,
    verified: true,
    apply: () => ({ label: 'Apply online', href: 'https://agrideck.cbz.co.zw/' }),
  },
  {
    unit: 'insurance',
    source: SBU_PRODUCTS,
    verified: false,
    apply: () => ({ label: 'Get a quote', href: '/insurance/quote' }),
  },
  {
    unit: 'datvest',
    source: INVESTMENT_PRODUCTS,
    verified: false,
    apply: () => ({ label: 'Start investing', href: '/datvest/start-investing' }),
    category: (id) => ({ unitTrusts: 'unit-trusts', privateWealth: 'private-wealth' })[id] ?? id,
  },
  {
    unit: 'properties',
    source: PROPERTY_PRODUCTS,
    verified: false,
    apply: () => ({ label: 'Request a viewing', href: '/properties/request-a-viewing' }),
  },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const orNull = (v: string | undefined, allowed: boolean) => (allowed && v && v.trim() ? v : null);

function write(path: string, data: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// Products
rmSync(out('products'), { recursive: true, force: true });
let productCount = 0;
for (const u of UNITS) {
  for (const [sourceCategory, items] of Object.entries(u.source)) {
    const category = u.category ? u.category(sourceCategory) : sourceCategory;
    items.forEach((p, i) => {
      const productId = p.id ?? slug(p.name);
      const benefits = [...(p.features ?? []), ...(p.benefits ?? [])].filter(Boolean);
      write(out('products', u.unit, `${productId}.json`), {
        unit: u.unit,
        category,
        productId,
        name: p.name,
        summary: p.description,
        benefits,
        eligibility: p.requirements && p.requirements.length ? p.requirements : null,
        audience: p.target ?? null,
        pricing: orNull(p.pricing, u.verified),
        details: {
          tenor: orNull(p.tenor, u.verified),
          interestRate: orNull(p.interestRate, u.verified),
          adminFee: orNull(p.adminFee, u.verified),
          limit: orNull(p.limit, u.verified),
        },
        apply: u.apply(category),
        actions: u.actions?.[productId] ?? null,
        image: p.image ? { src: p.image, alt: '' } : null,
        order: i,
        verified: u.verified,
      });
      productCount++;
    });
  }
}

// Properties: residential and commercial items become draft listings.
rmSync(out('properties'), { recursive: true, force: true });
let propertyCount = 0;
const typeFor = (category: string) => (category === 'commercial' ? 'commercial' : 'residential');
for (const category of ['residential', 'commercial'] as const) {
  (PROPERTY_PRODUCTS[category] ?? []).forEach((p, i) => {
    const id = slug(p.id ?? p.name);
    write(out('properties', `${id}.json`), {
      id,
      title: p.name,
      type: typeFor(category),
      location: 'Harare',
      status: category === 'commercial' ? 'to-let' : 'for-sale',
      price: null,
      summary: p.description,
      details: [],
      images: [
        { src: '/images/loan-home.webp', alt: '' },
        { src: '/images/cbz-banking-branch.webp', alt: '' },
        { src: '/images/cbzpicture1.webp', alt: '' },
      ],
      tourUrl: null,
      order: i,
      verified: false,
    });
    propertyCount++;
  });
}

// Notices
rmSync(out('notices'), { recursive: true, force: true });
mkdirSync(out('notices'), { recursive: true });
const MONTHS: Record<string, string> = {
  January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
  July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
};
function isoDate(d: string): string {
  const m = d.match(/(\d{1,2}) (\w+) (\d{4})/);
  if (!m) return '2026-01-01';
  return `${m[3]}-${MONTHS[m[2]] ?? '01'}-${m[1].padStart(2, '0')}`;
}
for (const a of ANNOUNCEMENTS) {
  const fm = [
    '---',
    `title: ${JSON.stringify(a.title)}`,
    `date: ${isoDate(a.date)}`,
    `category: ${a.category}`,
    `summary: ${JSON.stringify(a.summary)}`,
    `reference: ${a.circularRef ? JSON.stringify(a.circularRef) : 'null'}`,
    `urgent: ${a.isUrgent ? 'true' : 'false'}`,
    'document: null',
    'confirmed: false',
    '---',
    '',
    a.summary,
    '',
  ].join('\n');
  writeFileSync(out('notices', `${a.id}.md`), fm, 'utf8');
}

// Security guidance lives as a notice so /security has a home in the collection too.
const security = `---
title: "Security and online safety"
date: 2026-10-01
category: security
summary: "How to spot fake CBZ messages and websites, and what to do if you think you have been targeted."
reference: null
urgent: false
document: null
confirmed: true
---

CBZ will never ask for your PIN, password or one-time code by phone, SMS, WhatsApp or email.

## How to spot a fake

- The address bar does not show **cbz.co.zw**. Our internet banking is at obdx.cbz.co.zw and cbzonline.cbz.co.zw only.
- The message urges you to act now, or threatens to close your account.
- The sender asks for a PIN, password, card number or one-time code.
- The link is shortened or points to an unfamiliar domain.

## If you think you have been targeted

1. Do not click the link or reply.
2. Call the Contact Centre at once on +263 8677 004050.
3. If you entered your details anywhere, change your internet banking password from a device you trust.
`;
writeFileSync(out('notices', 'security-and-online-safety.md'), security, 'utf8');

for (const dir of ['deals', 'campaigns']) {
  if (!existsSync(out(dir))) mkdirSync(out(dir), { recursive: true });
}

console.log(`Ported ${productCount} products, ${propertyCount} draft properties, ${ANNOUNCEMENTS.length + 1} notices.`);
