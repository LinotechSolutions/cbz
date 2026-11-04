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
    label: 'Finance',
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
    label: 'The Group',
    href: '/the-group',
    items: [
      { label: 'The Group', href: '/the-group', line: 'Structure, awards, milestones and board' },
      { label: 'Journeys', href: '/journeys', line: 'Nine guided flows, from account to advice' },
      { label: 'CBZ Foundation', href: '/cbz-foundation', line: 'Our philanthropic arm' },
      { label: 'Sustainability', href: '/sustainability', line: 'Grievance mechanism and reports' },
      { label: 'Latest from CBZ', href: '/notices', line: 'Shareholder and customer notices' },
      { label: 'Contact us', href: '/contact', line: 'Call, chat or find a branch' },
    ],
  },
];

/** Split log-in menu. */
export const LOGIN_ITEMS: NavLink[] = [
  { label: 'Internet banking, personal', href: LINKS.internetBanking.personal, external: true },
  { label: 'Internet banking, corporate', href: LINKS.internetBanking.newCorporate, line: 'New platform', external: true },
  { label: 'Internet banking, corporate', href: LINKS.internetBanking.corporate, line: 'Previous platform (OBDX)', external: true },
  { label: 'Self-service portal', href: LINKS.internetBanking.selfService, external: true },
  { label: 'CBZ Touch', href: '/login#apps', line: 'Open the app on your phone' },
  { label: 'Red Sphere portal', href: LINKS.redSphere.portal, external: true },
];

/** Red "Open an account" menu. Each item deep-links to that unit's application. */
export const OPEN_ACCOUNT_ITEMS: NavLink[] = [
  { label: 'Sign up for CBZ Bank', href: '/bank/open-account', line: 'Current, savings and foreign currency accounts' },
  { label: 'Apply with Red Sphere', href: LINKS.redSphere.playStore, line: 'Salary and business loans, through the app', external: true },
  { label: 'Sign up for Agro-Yield', href: '/agro-yield/apply', line: 'Contract farming and seasonal finance' },
  { label: 'Start investing with Datvest', href: '/datvest/start-investing', line: 'Unit trusts and managed portfolios' },
  { label: 'Get a quote from CBZ Insurance', href: '/insurance/quote', line: 'Motor, home and business cover' },
  { label: 'Get a quote from CBZ Life', href: '/cbz-life/quote', line: 'Funeral and education plans' },
];

/** The nine guided flows on the site map. */
export const JOURNEYS: { label: string; line: string; href: string; unit: string }[] = [
  { label: 'Open an account', line: 'A CBZ Bank account in three steps.', href: '/bank/open-account', unit: 'bank' },
  { label: 'Buy a home', line: 'Find a property and finance it with a CBZ Bank mortgage.', href: '/properties/request-a-viewing', unit: 'properties' },
  { label: 'Car insurance quote', line: 'Comprehensive cover for your vehicle.', href: '/insurance/quote', unit: 'insurance' },
  { label: 'Banking and loans', line: 'Personal, school fees, civil servant and business loans.', href: '/bank/apply', unit: 'bank' },
  { label: 'Investments', line: 'Start with Datvest unit trusts or a managed portfolio.', href: '/datvest/start-investing', unit: 'datvest' },
  { label: 'Farming finance', line: 'Contract farming for the season with Agro-Yield.', href: '/agro-yield/apply', unit: 'agro-yield' },
  { label: 'Capital raising', line: 'Debt, equity and advisory from CBZ Capital.', href: '/capital/enquiry', unit: 'capital' },
  { label: 'Risk advisory', line: 'A broker’s view of your cover and your risks.', href: '/risk-advisory/quote', unit: 'risk-advisory' },
  { label: 'Salary loans', line: 'SSB and payroll loans from Red Sphere, through the app.', href: '/red-sphere#explore-loan-products', unit: 'red-sphere' },
];

/** The twelve off-site destinations on the site map. Null links are hidden. */
export const OFFSITE: NavLink[] = [
  { label: 'Internet banking (new platform)', href: LINKS.internetBanking.newCorporate, external: true },
  { label: 'Internet banking (OBDX)', href: LINKS.internetBanking.personal, external: true },
  { label: 'Self-service portal', href: LINKS.internetBanking.selfService, external: true },
  { label: 'Red Sphere loan application', href: LINKS.redSphere.playStore, external: true },
  { label: 'CBZ Touch on Google Play', href: LINKS.touch.playStore, external: true },
  { label: 'CBZ Touch on the App Store', href: LINKS.touch.appStore, external: true },
  { label: 'Red Sphere on Google Play', href: LINKS.redSphere.playStore, external: true },
  { label: 'Red Sphere on the App Store', href: LINKS.redSphere.appStore, external: true },
  { label: 'ZikiCash on Google Play', href: LINKS.zikiCash.playStore, external: true },
  { label: 'ZikiCash on the App Store', href: LINKS.zikiCash.appStore, external: true },
  { label: 'CBZ Properties listings on Propertybook', href: LINKS.propertyListings, external: true },
  { label: 'Zeex invoice discounting', href: LINKS.zeex, external: true },
  { label: 'Farmer onboarding', href: LINKS.farmerOnboarding, external: true },
  { label: 'ATDC Zimbabwe', href: LINKS.atdc, external: true },
  { label: 'Ziki Mall', href: LINKS.zikiMall, external: true },
  { label: 'Investor relations', href: LINKS.investorRelations, external: true },
  { label: 'Official documents', href: LINKS.documents.policiesAndRegulations, external: true },
];

/** Footer columns mirror the site map's groups. */
export const FOOTER = {
  businesses: [
    { label: 'CBZ Bank', href: '/bank' },
    { label: 'CBZ Insurance', href: '/insurance' },
    { label: 'CBZ Life', href: '/cbz-life' },
    { label: 'Datvest', href: '/datvest' },
    { label: 'CBZ Properties', href: '/properties' },
    { label: 'CBZ Agro-Yield', href: '/agro-yield' },
    { label: 'Red Sphere Finance', href: '/red-sphere' },
    { label: 'CBZ Capital', href: '/capital' },
    { label: 'CBZ Risk Advisory', href: '/risk-advisory' },
  ],
  journeys: JOURNEYS.map((j) => ({ label: j.label, href: j.href })),
  group: [
    { label: 'The Group', href: '/the-group' },
    { label: 'CBZ Foundation', href: '/cbz-foundation' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Diaspora banking', href: '/diaspora' },
    { label: 'Log in', href: '/login' },
    { label: 'Security', href: '/security' },
    { label: 'Latest from CBZ', href: '/notices' },
    { label: 'Contact us', href: '/contact' },
  ],
  regulatory: [
    { label: 'Business conditions', href: '/business-conditions' },
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Tip-offs anonymous', href: '/tip-offs' },
    { label: 'Website terms', href: LINKS.documents.websiteTerms, external: true },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  offsite: OFFSITE,
} as const;
