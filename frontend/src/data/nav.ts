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

export type AudienceId = 'personal' | 'business' | 'school' | 'diaspora';

export interface Audience {
  id: AudienceId;
  label: string;
  /** That audience's home page, where the tab goes. */
  href: string;
  /** The home page itself (and anything under it): being here selects the audience. */
  match: RegExp;
  /** One line under the heading on the solutions page. */
  line: string;
}

/**
 * The white strip above the header: one tab per audience. A tab opens that
 * audience's home and makes it the chosen audience; the choice is kept in
 * the browser, and every product carousel and property listing then shows
 * that audience's products (see AudienceBar.astro, ProductGroup.astro and
 * Listings.astro). The menus in the navy bar are the same for every audience.
 */
export const AUDIENCES: Audience[] = [
  { id: 'personal', label: 'Personal', href: '/', match: /^\/$/, line: 'Everyday banking, cover, investments and a home of your own.' },
  { id: 'business', label: 'Business', href: '/business', match: /^\/business(\/|$)/, line: 'Accounts, finance, cover and space for companies, traders and farmers.' },
  { id: 'school', label: 'School', href: '/school', match: /^\/school(\/|$)/, line: 'Accounts, fees collection, cover and savings plans for schools and their parents.' },
  { id: 'diaspora', label: 'Diaspora', href: '/diaspora', match: /^\/diaspora(\/|$)/, line: 'Bank with CBZ from abroad.' },
];

/** Header menus: Bank, Insure, Invest, Borrow, Farm, Group. The same for every audience. */
export const CLUSTERS: NavGroup[] = [
  {
    label: 'Bank',
    href: '/clusters/banking',
    items: [
      { label: 'CBZ Bank', href: '/bank', line: 'Accounts, cards, loans and mortgages' },
      { label: 'CBZ Custodial Services', href: null, line: 'Custody and safekeeping of securities' },
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
    label: 'Invest',
    href: '/clusters/investments',
    items: [
      { label: 'Datvest', href: '/datvest', line: 'Unit trusts and wealth management' },
      { label: 'CBZ Capital', href: '/capital', line: 'Corporate finance and advisory' },
      { label: 'CBZ Properties', href: '/properties', line: 'Homes, stands and commercial space' },
    ],
  },
  {
    label: 'Borrow',
    href: '/red-sphere',
    items: [
      { label: 'Red Sphere Finance', href: '/red-sphere', line: 'Salary, SME, tuck-shop and partner loans' },
      { label: 'CBZ Bank loans', href: '/bank#apply-for-a-loan', line: 'Payday, school fees, civil servant and mortgage loans' },
      { label: 'Loan calculators', href: '/calculators', line: 'Mortgage, car finance and Red Sphere repayments' },
    ],
  },
  {
    label: 'Farm',
    href: '/clusters/agro-business',
    items: [
      { label: 'CBZ Agro-Yield', href: '/agro-yield', line: 'Contract farming, inputs and offtake' },
    ],
  },
  {
    label: 'Group',
    href: '/the-group',
    items: [
      { label: 'The Group', href: '/the-group', line: 'Structure, awards, milestones and board' },
      { label: 'Explore our solutions', href: '/journeys', line: 'Ten guided flows, from account to advice' },
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
  { label: 'Sign up for Agro-Yield', href: LINKS.farmerOnboarding, line: 'Contract farming and seasonal finance, on Agrideck', external: true },
  { label: 'Start investing with Datvest', href: '/datvest/start-investing', line: 'Unit trusts and managed portfolios' },
  { label: 'Get a quote from CBZ Insurance', href: '/insurance/quote', line: 'Motor, home and business cover' },
  { label: 'Get a quote from CBZ Life', href: '/cbz-life/quote', line: 'Funeral and education plans' },
];

/** The ten guided flows on the site map, one or two per business unit. */
export const JOURNEYS: { label: string; line: string; href: string; unit: string; audience: 'personal' | 'business' }[] = [
  { label: 'Open an account', line: 'A CBZ Bank account in three steps.', href: '/bank/open-account', unit: 'bank', audience: 'personal' },
  { label: 'Loans and mortgages', line: 'Personal, school fees, civil servant and business loans from CBZ Bank.', href: '/bank/apply', unit: 'bank', audience: 'personal' },
  { label: 'Small business finance', line: 'Working capital, order finance and invoice discounting from Red Sphere.', href: '/red-sphere#explore-loan-products', unit: 'red-sphere', audience: 'business' },
  { label: 'Short-term insurance', line: 'Motor, home, travel, business and farm cover from CBZ Insurance.', href: '/insurance/quote', unit: 'insurance', audience: 'personal' },
  { label: 'Life assurance', line: 'Funeral, education and group life plans from CBZ Life.', href: '/cbz-life/quote', unit: 'cbz-life', audience: 'personal' },
  { label: 'Risk advisory', line: 'A broker’s view of your cover and your risks.', href: '/risk-advisory/quote', unit: 'risk-advisory', audience: 'business' },
  { label: 'Investments', line: 'Start with Datvest unit trusts or a managed portfolio.', href: '/datvest/start-investing', unit: 'datvest', audience: 'personal' },
  { label: 'Capital raising', line: 'Debt, equity and advisory from CBZ Capital.', href: '/capital/enquiry', unit: 'capital', audience: 'business' },
  { label: 'Buy a property', line: 'Find a home, stand or commercial space with CBZ Properties.', href: '/properties/request-a-viewing', unit: 'properties', audience: 'personal' },
  { label: 'Farming finance', line: 'Contract farming for the season with Agro-Yield, on Agrideck.', href: LINKS.farmerOnboarding ?? '/agro-yield/enquire', unit: 'agro-yield', audience: 'business' },
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

/** Footer columns: Our Businesses, The Group, Access, Explore Our Solutions. */
export const FOOTER = {
  businesses: [
    { label: 'CBZ Bank', href: '/bank' },
    { label: 'CBZ Insurance', href: '/insurance' },
    { label: 'CBZ Life', href: '/cbz-life' },
    { label: 'CBZ Properties', href: '/properties' },
    { label: 'Datvest', href: '/datvest' },
    { label: 'CBZ Agro-Yield', href: '/agro-yield' },
    { label: 'Red Sphere Finance', href: '/red-sphere' },
    { label: 'CBZ Capital', href: '/capital' },
    { label: 'CBZ Risk Advisory', href: '/risk-advisory' },
  ],
  /** One solution per business, in title case. */
  solutions: [
    { label: 'Open an Account', href: '/bank/open-account' },
    { label: 'Insurance Solutions', href: '/insurance/quote' },
    { label: 'Life Assurance Solutions', href: '/cbz-life/quote' },
    { label: 'Buy a Property', href: '/properties/request-a-viewing' },
    { label: 'Investments', href: '/datvest/start-investing' },
    { label: 'Farm Solutions', href: LINKS.farmerOnboarding ?? '/agro-yield/enquire' },
    { label: 'Capital Raising', href: '/capital/enquiry' },
  ],
  group: [
    { label: 'The Group', href: '/the-group' },
    { label: 'CBZ Foundation', href: '/cbz-foundation' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Diaspora Banking', href: '/diaspora' },
  ],
  access: [
    { label: 'Log In', href: '/login' },
    { label: 'Find a Branch', href: '/contact#branches' },
    { label: 'Security', href: '/security' },
    { label: 'Latest from CBZ', href: '/notices' },
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
