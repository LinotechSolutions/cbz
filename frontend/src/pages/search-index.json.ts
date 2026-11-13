/**
 * The header's search index: every product card, every menu link, the
 * guided flows and the main pages, as a static JSON file fetched when the
 * search dialog opens. Nothing is fetched at build time from elsewhere.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUDIENCES, JOURNEYS, MEGA, OPEN_ACCOUNT_ITEMS } from '../data/nav';

interface Hit {
  label: string;
  line: string;
  href: string;
  group: string;
}

export const GET: APIRoute = async () => {
  const units = (await getCollection('units')).map((u) => u.data);
  const unitName = (slug: string) => units.find((u) => u.slug === slug)?.name ?? slug;
  const products = (await getCollection('products')).map((p) => p.data);

  const hits: Hit[] = [];
  const seen = new Set<string>();
  const add = (h: Hit) => {
    const key = `${h.href}|${h.label}`;
    if (seen.has(key)) return;
    seen.add(key);
    hits.push(h);
  };

  for (const a of AUDIENCES) add({ label: `${a.label} home`, line: a.line, href: a.href, group: 'Home' });
  for (const u of units) {
    if (u.cluster === 'philanthropy') continue;
    add({ label: u.name, line: u.hero.lede, href: `/${u.slug}`, group: 'Business' });
  }
  for (const p of products) {
    add({ label: p.name, line: p.summary, href: `/${p.unit}#product-${p.unit}-${p.productId}`, group: unitName(p.unit) });
  }
  for (const m of MEGA) {
    for (const c of m.columns) {
      for (const it of c.items) add({ label: it.label, line: c.title, href: it.href, group: m.label });
    }
  }
  for (const j of JOURNEYS) add({ label: j.label, line: j.line, href: j.href, group: 'Guided flow' });
  for (const o of OPEN_ACCOUNT_ITEMS) if (o.href) add({ label: o.label, line: o.line ?? '', href: o.href, group: 'Sign up' });
  const pages: Hit[] = [
    { label: 'Calculators', line: 'Mortgage, car finance, loan, car insurance and life policy', href: '/calculators', group: 'Tools' },
    { label: 'Log in', line: 'Internet banking, CBZ Touch, Red Sphere portal', href: '/login', group: 'Access' },
    { label: 'Contact us', line: 'Call, WhatsApp, email, branches and ATMs', href: '/contact', group: 'Access' },
    { label: 'Branches and ATMs', line: 'Find a branch near you', href: '/contact#branches', group: 'Access' },
    { label: 'Diaspora banking', line: 'Bank with CBZ from abroad', href: '/diaspora', group: 'Home' },
    { label: 'The Group', line: 'Structure, awards, milestones, board and executive management', href: '/the-group', group: 'Group' },
    { label: 'CBZ Foundation', line: 'Our philanthropic arm', href: '/cbz-foundation', group: 'Group' },
    { label: 'Sustainability', line: 'Grievance mechanism, documents and reports', href: '/sustainability', group: 'Group' },
    { label: 'Latest from CBZ', line: 'Shareholder, customer and regulatory notices', href: '/notices', group: 'Group' },
    { label: 'Security', line: 'How to spot fake CBZ messages', href: '/security', group: 'Access' },
    { label: 'Sitemap', line: 'Every page on the site', href: '/sitemap', group: 'Access' },
  ];
  pages.forEach(add);

  return new Response(JSON.stringify(hits), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
