import { LINKS } from './links';

export interface NavLink {
  label: string;
  href: string | null;
  /** One line under the label in menus. */
  line?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  /** Where the top-level label itself goes. */
  href: string;
  items: NavLink[];
}

/** Cluster mega-menu. Order matches the Group structure chart. */
export const CLUSTERS: NavGroup[] = [
  {
    label: 'Bank',
    href: '/clusters/banking',
    items: [
      { label: 'CBZ Bank', href: '/bank', line: 'Accounts, cards, loans and mortgages' },
      { label: 'Red Sphere Finance', href: '/red-sphere', line: 'Salary and business loans' },
      { label: 'CBZ Custodial Services', href: null, line: 'Custody and safekeeping of securities' },
      { label: 'Diaspora banking', href: '/diaspora', line: 'Bank with CBZ from abroad' },
    ],
  },
  {
    label: 'Invest',
    href: '/clusters/investments',
    items: [
      { label: 'Datvest', href: '/datvest', line: 'Unit trusts and wealth management' },
      { label: 'CBZ Capital', href: '/capital', line: 'Corporate finance and advisory' },
      { label: 'CBZ Properties', href: '/properties', line: 'Homes, stands and commercial space' },
    ],
  },
  {
    label: 'Insure',
    href: '/clusters/insurance',
    items: [
      { label: 'CBZ Insurance', href: '/insurance', line: 'Motor, home, business and farm cover' },
      { label: 'CBZ Life', href: '/cbz-life', line: 'Funeral, education and group life' },
      { label: 'CBZ Risk Advisory', href: '/risk-advisory', line: 'Broking and risk management' },
    ],
  },
  {
    label: 'Agro',
    href: '/clusters/agro-business',
    items: [
      { label: 'CBZ Agro-Yield', href: '/agro-yield', line: 'Contract farming, inputs and offtake' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    items: [
      { label: 'About CBZ Holdings', href: '/about', line: 'Who we are and how we are structured' },
      { label: 'CBZ Foundation', href: '/cbz-foundation', line: 'Our philanthropic arm' },
      { label: 'Notices', href: '/notices', line: 'Shareholder and customer notices' },
      { label: 'Calculators', href: '/calculators', line: 'Work out repayments and quotes' },
      { label: 'Contact us', href: '/contact', line: 'Call, chat or find a branch' },
    ],
  },
];

/** Split log-in menu. */
export const LOGIN_ITEMS: NavLink[] = [
  { label: 'Internet banking, personal', href: LINKS.internetBanking.personal, external: true },
  { label: 'Internet banking, corporate', href: LINKS.internetBanking.newCorporate, external: true },
  { label: 'Internet banking, corporate (previous platform)', href: LINKS.internetBanking.corporate, external: true },
  { label: 'CBZ Touch', href: '/#digital-channels', line: 'Open the app on your phone' },
  { label: 'Red Sphere portal', href: LINKS.redSphere.portal, external: true },
];

/** Red "Open an account" menu. Each item deep-links to that unit's application. */
export const OPEN_ACCOUNT_ITEMS: NavLink[] = [
  { label: 'Sign up for CBZ Bank', href: '/bank/open-account', line: 'Current, savings and foreign currency accounts' },
  { label: 'Apply with Red Sphere', href: LINKS.redSphere.portal, line: 'Salary and business loans', external: true },
  { label: 'Sign up for Agro-Yield', href: '/agro-yield/apply', line: 'Contract farming and seasonal finance' },
  { label: 'Start investing with Datvest', href: '/datvest/start-investing', line: 'Unit trusts and managed portfolios' },
  { label: 'Get a quote from CBZ Insurance', href: '/insurance/quote', line: 'Motor, home and business cover' },
  { label: 'Get a quote from CBZ Life', href: '/cbz-life/quote', line: 'Funeral and education plans' },
];

export const FOOTER = {
  clusters: [
    { label: 'Banking', href: '/clusters/banking' },
    { label: 'Investments', href: '/clusters/investments' },
    { label: 'Insurance', href: '/clusters/insurance' },
    { label: 'Agro-Business', href: '/clusters/agro-business' },
    { label: 'CBZ Foundation', href: '/cbz-foundation' },
  ],
  digital: [
    { label: 'CBZ Touch', href: '/#digital-channels' },
    { label: 'Internet banking, personal', href: LINKS.internetBanking.personal, external: true },
    { label: 'Internet banking, corporate', href: LINKS.internetBanking.newCorporate, external: true },
    { label: 'Self-service portal', href: LINKS.internetBanking.selfService, external: true },
    { label: 'Ziki Mall', href: LINKS.zikiMall, external: true },
    { label: 'Proof of payment check', href: LINKS.popVerification, external: true },
  ],
  help: [
    { label: 'Contact us', href: '/contact' },
    { label: 'Find a branch', href: '/contact#branches' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Security and online safety', href: '/security' },
    { label: 'Notices', href: '/notices' },
    { label: 'Investor relations', href: LINKS.investorRelations, external: true },
  ],
  legal: [
    { label: 'General business conditions', href: '/business-conditions' },
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Tip-offs anonymous', href: '/tip-offs' },
    { label: 'Website terms', href: LINKS.documents.websiteTerms, external: true },
    { label: 'Sitemap', href: '/sitemap' },
  ],
} as const;
