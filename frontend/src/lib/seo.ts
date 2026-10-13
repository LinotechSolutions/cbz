import { ScreenType } from '../types';
import { SCREEN_PATHS } from './routes';
import { CONTACT } from '../data/facts';

/**
 * Per-page search metadata. Used twice:
 * - at build time (vite.config.ts → scripts/seo-plugin.ts) to write a static HTML file per
 *   route with the right <title>, description, canonical and structured data, plus
 *   robots.txt and sitemap.xml, so crawlers and link previews see it without JavaScript;
 * - at runtime (usePageMeta) to keep the head in sync as the user navigates.
 *
 * Canonical URLs always point at the production domain, wherever the site is served from.
 */
export const DEFAULT_SITE_URL = 'https://cbz.co.zw';

export interface PageMeta {
  title: string;
  description: string;
  /** Visible page heading, used for breadcrumbs */
  heading: string;
  /** Keep out of search results and the sitemap */
  noindex?: boolean;
  /** Structured data type for the business this page is about */
  org?: { name: string; type: string };
}

const SUBSIDIARY = {
  bank: { name: 'CBZ Bank', type: 'BankOrCreditUnion' },
  insurance: { name: 'CBZ Insurance', type: 'InsuranceAgency' },
  datvest: { name: 'Datvest Asset Management', type: 'FinancialService' },
  properties: { name: 'CBZ Properties', type: 'RealEstateAgent' },
  agro: { name: 'CBZ Agro-Yield', type: 'FinancialService' },
} as const;

export const PAGE_META: Record<ScreenType, PageMeta> = {
  home: {
    title: 'CBZ Holdings | Banking, Insurance & Investments in Zimbabwe',
    description: 'CBZ Holdings: banking, insurance, investments, property and agribusiness finance from one Zimbabwean group.',
    heading: 'CBZ Holdings',
  },
  bank: {
    title: 'CBZ Bank | Accounts, Loans & Mortgages in Zimbabwe',
    description: 'Open a SmartCash, savings or foreign currency account and apply for personal loans, home mortgages and asset finance with CBZ Bank.',
    heading: 'CBZ Bank',
    org: SUBSIDIARY.bank,
  },
  sbu: {
    title: 'CBZ Insurance | Motor, Home & Business Cover',
    description: 'Get a quote for motor, home, business and agricultural insurance from CBZ Insurance, with add-ons from across the CBZ Group.',
    heading: 'CBZ Insurance',
    org: SUBSIDIARY.insurance,
  },
  invest: {
    title: 'Datvest | Unit Trusts & Investments in Zimbabwe',
    description: 'Grow your savings with Datvest: unit trusts, money market funds, equities and offshore investments.',
    heading: 'Datvest',
    org: SUBSIDIARY.datvest,
  },
  agro: {
    title: 'CBZ Agro-Yield | Farming Inputs & Agricultural Finance',
    description: 'Seasonal input credit, crop finance and support for individual, group and commercial farmers from CBZ Agro-Yield.',
    heading: 'CBZ Agro-Yield',
    org: SUBSIDIARY.agro,
  },
  properties: {
    title: 'CBZ Properties | Stands, Homes & Commercial Property',
    description: 'Buy residential stands and homes, rent offices and commercial space, or invest in property with CBZ Properties.',
    heading: 'CBZ Properties',
    org: SUBSIDIARY.properties,
  },
  'the-group': {
    title: 'The CBZ Group | Our Companies',
    description: 'Meet the CBZ Group companies: banking, insurance, life assurance, investments, property, agribusiness, microfinance and advisory.',
    heading: 'The CBZ Group',
  },
  group: {
    title: 'The CBZ Group | Our Companies',
    description: 'Meet the CBZ Group companies: banking, insurance, life assurance, investments, property, agribusiness, microfinance and advisory.',
    heading: 'The CBZ Group',
  },
  'open-account': {
    title: 'Open a Bank Account Online | CBZ Bank',
    description: 'Apply online for a CBZ Bank account: SmartCash, personal, foreign currency, youth, senior citizens, fixed deposit, business and church accounts.',
    heading: 'Open an account',
    org: SUBSIDIARY.bank,
  },
  journey: {
    title: 'Car Insurance Quote | CBZ Insurance',
    description: 'Get a motor insurance quote from CBZ Insurance in a few minutes and choose the level of cover that suits you.',
    heading: 'Car insurance quote',
    org: SUBSIDIARY.insurance,
  },
  'home-journey': {
    title: 'Buy a Home | CBZ Properties & Mortgages',
    description: 'Find a stand or home with CBZ Properties and finance it with a CBZ Bank mortgage.',
    heading: 'Buy a home',
    org: SUBSIDIARY.properties,
  },
  'journey-bank': {
    title: 'Apply for a Loan or Mortgage | CBZ Bank',
    description: 'Apply for a personal loan, home mortgage, asset finance or diaspora banking with CBZ Bank.',
    heading: 'Loans and mortgages',
    org: SUBSIDIARY.bank,
  },
  'journey-invest': {
    title: 'Start Investing | Datvest',
    description: 'Tell us your goal and start investing with Datvest unit trusts, money market and offshore funds.',
    heading: 'Start investing',
    org: SUBSIDIARY.datvest,
  },
  'journey-agro': {
    title: 'Apply for Farming Finance | CBZ Agro-Yield',
    description: 'Apply for seasonal inputs and farming finance from CBZ Agro-Yield.',
    heading: 'Farming finance',
    org: SUBSIDIARY.agro,
  },
  login: {
    title: 'Log In | CBZ Holdings',
    description: 'Log in to CBZ internet banking and self-service portals.',
    heading: 'Log in',
    noindex: true,
  },
};

/** One entry per distinct URL ('group' and 'the-group' share /the-group). */
export const SEO_ROUTES: { screen: ScreenType; path: string }[] = (
  Object.entries(SCREEN_PATHS) as [ScreenType, string][]
)
  .filter(([screen, path], i, all) => all.findIndex(([, p]) => p === path) === i && !!screen)
  .map(([screen, path]) => ({ screen, path }));

export const canonicalUrl = (siteUrl: string, path: string) => `${siteUrl.replace(/\/+$/, '')}${path === '/' ? '/' : path}`;

export const OG_IMAGE_PATH = '/og/cbz-holdings.jpg';

const SOCIAL_PROFILES = [
  'https://www.facebook.com/cbzholdings',
  'https://x.com/cbzholdings',
  'https://www.linkedin.com/company/cbz-holdings-limited',
  'https://www.youtube.com/@CBZHoldings',
  'https://www.instagram.com/cbzholdings',
];

/** schema.org structured data for a page. */
export function structuredData(screen: ScreenType, siteUrl: string): object[] {
  const meta = PAGE_META[screen];
  const base = siteUrl.replace(/\/+$/, '');
  const holding = {
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: 'CBZ Holdings Limited',
    url: `${base}/`,
    logo: `${base}/brand/logos/holdings-roundel.svg`,
    email: CONTACT.email,
    telephone: CONTACT.switchboard.href.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 Campbell Road, Pomona',
      addressLocality: 'Harare',
      addressCountry: 'ZW',
    },
    sameAs: SOCIAL_PROFILES,
  };

  const out: object[] = [];
  if (screen === 'home' || screen === 'the-group' || screen === 'group') {
    out.push({
      '@context': 'https://schema.org',
      ...holding,
      subOrganization: Object.values(SUBSIDIARY).map((s) => ({ '@type': s.type, name: s.name, areaServed: 'ZW' })),
    });
  } else if (meta.org) {
    out.push({
      '@context': 'https://schema.org',
      '@type': meta.org.type,
      name: meta.org.name,
      url: canonicalUrl(base, SCREEN_PATHS[screen]),
      areaServed: 'ZW',
      parentOrganization: { '@id': holding['@id'], name: holding.name },
    });
  }
  if (screen !== 'home') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: meta.heading, item: canonicalUrl(base, SCREEN_PATHS[screen]) },
      ],
    });
  }
  return out;
}
