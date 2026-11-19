/**
 * The audience home pages: Personal (/), Business (/business) and School
 * (/corporate) share one layout (AudienceHome.astro) and differ only in copy,
 * photographs and links. Diaspora keeps its own page at /diaspora.
 * Every link here goes to a page or product that exists on this site.
 */
import type { IconName } from '../components/icons';
import type { LogoKey } from './logos';
import type { AudienceId, NavLink } from './nav';
import { OPEN_ACCOUNT_ITEMS } from './nav';
import { LINKS } from './links';
import { CONTACT, GROUP } from './facts';
import { LIFE_STAGES, type LifeStage } from './lifeStages';

export interface HelpCard {
  title: string;
  line: string;
  go: string;
  href: string;
  icon: IconName;
}

export interface DigitalCard {
  title: string;
  line: string;
  /** A brand lockup, or an icon in red when the card has no logo. */
  logo?: LogoKey;
  logoHeight?: number;
  icon?: IconName;
  /** Store badges for an app, or plain buttons. */
  app?: 'cbz-touch' | 'ziki-cash';
  actions?: { label: string; href: string; variant: 'primary' | 'secondary' }[];
}

export interface HomeConfig {
  id: AudienceId;
  path: string;
  /** <title> and meta description. */
  title: string;
  description: string;
  hero: {
    /** The heading, with the group name set in red after it. */
    title: string;
    brand: string;
    lede: string;
    image: { src: string; alt: string };
    /** The hero slideshow: the first slide is `image`; the others crossfade in after it. */
    slides: { src: string; alt: string }[];
    cta: { label: string; items: NavLink[] };
    /** The outlined button beside the red menu. */
    secondary: { label: string; href: string };
  };
  /** The grey band under the hero: a large navy statement beside the latest notice. */
  statement: string;
  /** Solution cards; the heading reads "Solutions for every <noun> need." */
  noun: string;
  help: HelpCard[];
  /** A photograph with a tinted square behind it, beside a heading with a red full stop, a paragraph and an outlined button. */
  about: { title: string; body: string; cta: { label: string; href: string }; image: { src: string; alt: string } };
  stages: { title: string; strong: string; items: LifeStage[] };
  /** The check-circle list beside a photograph. */
  promise: { title: string; items: { lead: string; body: string }[]; image: { src: string; alt: string } };
  digital: { title: string; strong: string; lede: string; cards: DigitalCard[] };
}

const tollFree = CONTACT.tollFree.map((t) => t.display).join(' or ');
const GROUP_PROMISE = [
  { lead: 'We are here when you need us.', body: `Call ${tollFree} toll free, WhatsApp ${CONTACT.whatsapp.display}, chat on the site or walk into a branch.` },
  { lead: 'One relationship for everything.', body: 'Banking, loans, cover, investments, property and farm finance from one group, with one team behind you.' },
  { lead: 'Established and regulated.', body: `${GROUP.listingLine} and ${GROUP.regulatorLine.charAt(0).toLowerCase()}${GROUP.regulatorLine.slice(1)}, with ${GROUP.companies.toLowerCase()} in ${GROUP.clusters.toLowerCase()}.` },
];

const touchBadges: Pick<DigitalCard, 'logo' | 'logoHeight' | 'app'> = { logo: 'cbz-touch', logoHeight: 34, app: 'cbz-touch' };
const internetActions = (learn: string): DigitalCard['actions'] => [
  { label: 'Log in', href: '/login', variant: 'primary' },
  { label: learn, href: '/bank#cards-and-digital', variant: 'secondary' },
];

export const PERSONAL_HOME: HomeConfig = {
  id: 'personal',
  path: '/',
  title: 'CBZ Holdings',
  description: 'CBZ Holdings: banking, insurance, investments and farming in one place. Open an account, apply for a loan, get a quote or start investing.',
  hero: {
    title: 'Bank, Invest, Insure & Grow with ',
    brand: 'CBZ Holdings.',
    lede: 'Everyday banking, family protection, wealth creation and business growth — all in one place.',
    image: { src: '/images/heroes/hero-personal.jpg', alt: 'A family of four smiling together outside their home' },
    slides: [
      { src: '/images/heroes/hero-personal.jpg', alt: 'A family of four smiling together outside their home' },
      { src: '/images/accounts/individual.webp', alt: 'A man banking on his laptop over coffee' },
      { src: '/images/cbz-banking.webp', alt: 'A relationship manager talking a customer through options in a branch' },
    ],
    cta: { label: 'Explore our products', items: OPEN_ACCOUNT_ITEMS },
    secondary: { label: 'Get in touch', href: '/contact' },
  },
  statement: 'Complete financial solutions designed around your life.',
  noun: 'personal',
  about: {
    title: 'We are here to help you grow.',
    body: 'Ten companies, one team — in every province and on your phone.',
    cta: { label: 'About CBZ Holdings', href: '/the-group' },
    image: { src: '/images/cbz-banking.webp', alt: 'A relationship manager talking a customer through options in a branch' },
  },
  promise: { title: 'Our promise to you.', items: GROUP_PROMISE, image: { src: '/images/insurance-family.webp', alt: 'A family laughing together on a sofa' } },
  help: [
    { title: 'Bank', line: 'Accounts, cards and savings.', go: 'Explore Banking', href: '/clusters/banking', icon: 'bank' },
    { title: 'Borrow', line: 'Salary and cash loans.', go: 'Explore Loans', href: '/red-sphere', icon: 'wallet' },
    { title: 'Insure', line: 'Car, home and life cover.', go: 'Explore Insurance', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Invest', line: 'Unit trusts and wealth management.', go: 'Explore Investments', href: '/clusters/investments', icon: 'chart' },
    { title: 'Farm', line: 'Inputs, offtake and farm finance.', go: 'Explore Farming', href: '/clusters/agro-business', icon: 'leaf' },
  ],
  stages: { title: 'Whatever your next step, ', strong: 'we’re here to help you move forward.', items: LIFE_STAGES },
  digital: {
    title: 'Bank wherever you are, ',
    strong: 'whenever you need to',
    lede: 'Three ways to bank without a branch: on your phone, across borders, or from your desk.',
    cards: [
      {
        title: 'CBZ Touch',
        line: 'Zero-rated mobile banking: transfers, bills and cardless withdrawals.',
        ...touchBadges,
      },
      {
        title: 'ZikiCash',
        line: 'Send money from the UK to a CBZ account, branch or agent.',
        logo: 'ziki-cash',
        logoHeight: 24,
        app: 'ziki-cash',
      },
      {
        title: 'Internet banking',
        line: 'Balances, transfers and utility payments online.',
        icon: 'globe',
        actions: internetActions('Learn more'),
      },
    ],
  },
};

/** The red menu on the Business home. */
export const BUSINESS_SIGNUP_ITEMS: NavLink[] = [
  { label: 'Open a business account', href: '/bank/open-account', line: 'Corporate current, foreign currency, church and school accounts' },
  { label: 'Working capital with Red Sphere', href: LINKS.redSphere.playStore, line: 'SME loans, order finance and invoice discounting, through the app', external: true },
  { label: 'Insure your business', href: '/insurance/quote', line: 'Premises, stock, fleet, liability and the SME Business Shield' },
  { label: 'Cover your staff with CBZ Life', href: '/cbz-life/quote', line: 'Group life, retirement savings and credit life' },
  { label: 'Invest surplus cash with Datvest', href: '/datvest/start-investing', line: 'Money market, fixed income and treasury placements' },
  { label: 'Contract farming with Agro-Yield', href: LINKS.farmerOnboarding, line: 'Inputs, offtake and seasonal finance, on Agrideck', external: true },
];

export const BUSINESS_STAGES: LifeStage[] = [
  {
    tag: 'New company',
    icon: 'building',
    question: 'Opening a company account?',
    promise: "Let's get you transacting.",
    offers: ['Corporate current account', 'Foreign currency account'],
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/accounts/current.webp', alt: 'A business owner at her desk' },
  },
  {
    tag: 'Traders',
    icon: 'store',
    question: 'Running a small business?',
    promise: "Let's keep the shelves full.",
    offers: ['Working capital', 'Tuck-shop facility'],
    href: '/red-sphere#explore-loan-products',
    unit: 'red-sphere',
    image: { src: '/images/cbz-payments.webp', alt: 'A shop owner taking a card payment at her counter' },
  },
  {
    tag: 'Payments',
    icon: 'wallet',
    question: 'Taking card payments?',
    promise: "Let's put a POS on the counter.",
    offers: ['Kleva POS', 'Visa and local POS'],
    href: '/bank#cards-and-digital',
    unit: 'bank',
    image: { src: '/images/cbz-banking.webp', alt: 'A card being tapped on a point of sale device' },
  },
  {
    tag: 'Premises',
    icon: 'shield',
    question: 'Protecting your premises and stock?',
    promise: "Let's cover what you have built.",
    offers: ['All-risks business assets', 'SME Business Shield'],
    href: '/insurance/quote',
    unit: 'insurance',
    image: { src: '/images/cbz-protection.webp', alt: 'A warehouse with stock on shelves' },
  },
  {
    tag: 'Your team',
    icon: 'users',
    question: 'Looking after your staff?',
    promise: "Let's cover the people behind the business.",
    offers: ['Group life assurance', 'Retirement savings'],
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-health.webp', alt: 'A team meeting around a table' },
  },
  {
    tag: 'Space',
    icon: 'home',
    question: 'Need office or warehouse space?',
    promise: "Let's find the right address.",
    offers: ['Office parks and retail hubs', 'Industrial and logistics space'],
    href: '/properties?type=commercial',
    unit: 'properties',
    image: { src: '/images/hero-home.webp', alt: 'A modern office building' },
  },
  {
    tag: 'Growth',
    icon: 'chart',
    question: 'Raising capital?',
    promise: "Let's structure the deal.",
    offers: ['Debt and equity raising', 'Mergers and acquisitions'],
    href: '/capital/enquiry',
    unit: 'capital',
    image: { src: '/images/about-capital.webp', alt: 'Advisers reviewing a transaction' },
  },
  {
    tag: 'Farmers',
    icon: 'leaf',
    question: 'Farming at scale?',
    promise: "Let's back the season.",
    offers: ['Contract farming', 'Inputs and offtake'],
    href: LINKS.farmerOnboarding ?? '/agro-yield/enquire',
    unit: 'agro-yield',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A farmer in a maize field' },
  },
  {
    tag: 'Treasury',
    icon: 'coins',
    question: 'Surplus cash to put to work?',
    promise: "Let's make it earn.",
    offers: ['Money market fund', 'Fixed deposits'],
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'An adviser reviewing a portfolio with a client' },
  },
];

export const BUSINESS_HOME: HomeConfig = {
  id: 'business',
  path: '/business',
  title: 'Business',
  description: 'CBZ Holdings for business: company accounts, merchant payments, working capital, cover for premises and staff, commercial property and investing surplus cash.',
  hero: {
    title: 'Run, Fund & Grow Your Business with ',
    brand: 'CBZ Holdings.',
    lede: 'Accounts, merchant payments, working capital and cover — under one roof.',
    image: { src: '/images/heroes/hero-business.jpg', alt: 'A businesswoman reviewing plans on a tablet outside a new building' },
    slides: [
      { src: '/images/heroes/hero-business.jpg', alt: 'A businesswoman reviewing plans on a tablet outside a new building' },
      { src: '/images/accounts/current.webp', alt: 'A business owner in her office' },
      { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands over plans' },
    ],
    cta: { label: 'Explore business products', items: BUSINESS_SIGNUP_ITEMS },
    secondary: { label: 'Get in touch', href: '/bank/call-me-back' },
  },
  statement: 'Banking, finance and cover for the growing enterprise.',
  noun: 'business',
  about: {
    title: 'We are here to help your business grow faster.',
    body: 'Company accounts and merchant devices from CBZ Bank, working capital from Red Sphere, cover from CBZ Insurance and CBZ Life, treasury and capital raising from Datvest and CBZ Capital, and space from CBZ Properties: one group, one relationship.',
    cta: { label: 'About CBZ Holdings', href: '/the-group' },
    image: { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands over plans' },
  },
  promise: { title: 'Our promise to your business.', items: GROUP_PROMISE, image: { src: '/images/cbz-payments.webp', alt: 'A shop owner taking a card payment' } },
  help: [
    { title: 'Bank', line: 'Company accounts, merchant POS, e-statements and corporate internet banking.', go: 'Explore Business Banking', href: '/bank', icon: 'bank' },
    { title: 'Borrow', line: 'Working capital, order finance, invoice discounting and tuck-shop facilities from Red Sphere.', go: 'Explore Business Loans', href: '/red-sphere', icon: 'wallet' },
    { title: 'Insure', line: 'Cover for your premises, stock, fleet, liability and the people who work for you.', go: 'Explore Business Cover', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Invest', line: 'Treasury placements, capital raising and office, retail and industrial space.', go: 'Explore Investments', href: '/clusters/investments', icon: 'chart' },
    { title: 'Farm', line: 'Contract farming, inputs, offtake and commodity trading for agribusinesses.', go: 'Explore Farming', href: '/clusters/agro-business', icon: 'leaf' },
  ],
  stages: { title: 'Whatever the business needs next, ', strong: 'we’re here to help it grow.', items: BUSINESS_STAGES },
  digital: {
    title: 'Run the business ',
    strong: 'from anywhere',
    lede: 'Corporate internet banking, e-statements and merchant devices keep the business moving between branch visits.',
    cards: [
      {
        title: 'CBZ Touch',
        line: 'Mobile banking for sole traders and single-signatory SMEs: transfers, bills and supplier payments, zero-rated on local networks.',
        ...touchBadges,
      },
      {
        title: 'Corporate internet banking',
        line: 'Balances, e-statements, bulk and RTGS payments, salaries and multi-signatory approvals on the corporate platform.',
        icon: 'globe',
        actions: internetActions('See business channels'),
      },
      {
        title: 'Merchant POS',
        line: 'Kleva POS for SMEs and vendors, and local and Visa point of sale devices for merchants, settled into your CBZ account.',
        icon: 'store',
        actions: [
          { label: 'See POS devices', href: '/bank#cards-and-digital', variant: 'primary' },
          { label: 'Speak to an agent', href: '/bank/call-me-back', variant: 'secondary' },
        ],
      },
    ],
  },
};

/** The red menu on the Corporate home. */
export const CORPORATE_SIGNUP_ITEMS: NavLink[] = [
  { label: 'Open a corporate account', href: '/bank/open-account', line: 'Corporate current and foreign currency accounts' },
  { label: 'Collect fees on POS and CBZ Touch', href: '/bank#cards-and-digital', line: 'Kleva POS at the bursar’s office, fees paid from the app' },
  { label: 'Insure your business assets', href: '/insurance/quote', line: 'Property, plant, equipment, liability and marine cover' },
  { label: 'Group life and pensions for staff', href: '/cbz-life/quote', line: 'Group life assurance, retirement savings and pensions' },
  { label: 'Invest surplus cash with Datvest', href: '/datvest/start-investing', line: 'Money market, fixed income and corporate treasury placements' },
  { label: 'Raise capital with CBZ Capital', href: '/capital/enquiry', line: 'Debt, equity, M&A advisory and structured finance' },
];

export const CORPORATE_STAGES: LifeStage[] = [
  {
    tag: 'Accounts',
    icon: 'building',
    question: 'Opening a corporate account?',
    promise: "Let's get you transacting.",
    offers: ['Corporate current account', 'Treasury management'],
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/accounts/current.webp', alt: 'A corporate treasurer at her desk' },
  },
  {
    tag: 'Fees',
    icon: 'wallet',
    question: 'Collecting payments from clients?',
    promise: "Let's streamline receivables.",
    offers: ['Kleva POS', 'Corporate internet banking'],
    href: '/bank#cards-and-digital',
    unit: 'bank',
    image: { src: '/images/cbz-payments.webp', alt: 'A client paying by card' },
  },
  {
    tag: 'Buildings',
    icon: 'shield',
    question: 'Insuring commercial assets?',
    promise: "Let's protect your operations.",
    offers: ['All-risks commercial assets', 'Public liability'],
    href: '/insurance/quote',
    unit: 'insurance',
    image: { src: '/images/cbz-protection.webp', alt: 'A commercial building' },
  },
  {
    tag: 'Teachers',
    icon: 'users',
    question: 'Looking after your staff?',
    promise: "Let's cover your team.",
    offers: ['Group life assurance', 'Retirement savings'],
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-health.webp', alt: 'Staff in a corporate meeting' },
  },
  {
    tag: 'Parents',
    icon: 'graduation',
    question: 'Need structured finance?',
    promise: "Let's structure the right facility.",
    offers: ['Syndicated facilities', 'Project finance'],
    href: '/bank#apply-for-a-loan',
    unit: 'bank',
    image: { src: '/images/loan-education.webp', alt: 'A student on campus' },
  },
  {
    tag: 'Building',
    icon: 'home',
    question: 'Need commercial property?',
    promise: "Let's find or build the right space.",
    offers: ['Turnkey project management', 'Property valuations'],
    href: '/properties',
    unit: 'properties',
    image: { src: '/images/hero-home.webp', alt: 'A commercial building under construction' },
  },
  {
    tag: 'Funds',
    icon: 'chart',
    question: 'Investing corporate reserves?',
    promise: "Let's put surplus cash to work.",
    offers: ['Money market fund', 'Fixed deposits'],
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'A treasury adviser reviewing a portfolio' },
  },
  {
    tag: 'School farm',
    icon: 'leaf',
    question: 'Large-scale agribusiness?',
    promise: "Let's finance the value chain.",
    offers: ['Inputs and offtake', 'Contract farming'],
    href: LINKS.farmerOnboarding ?? '/agro-yield/enquire',
    unit: 'agro-yield',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A large-scale commercial farm' },
  },
];

export const CORPORATE_HOME: HomeConfig = {
  id: 'corporate',
  path: '/corporate',
  title: 'Corporate',
  description: 'CBZ Holdings for corporates, parastatals, NGOs and institutions: corporate accounts, treasury management, capital raising, group cover for staff, and commercial property.',
  hero: {
    title: 'Empower & Scale Your Enterprise with ',
    brand: 'CBZ Holdings.',
    lede: 'Corporate banking, structured finance, institutional asset management and risk advisory.',
    image: { src: '/images/heroes/hero-corporate.jpg', alt: 'A corporate executive at her desk' },
    slides: [
      { src: '/images/heroes/hero-corporate.jpg', alt: 'A corporate executive at her desk' },
      { src: '/images/accounts/current.webp', alt: 'A corporate executive in an office' },
      { src: '/images/loan-education.webp', alt: 'A graduate with her mother outside the university' },
    ],
    cta: { label: 'Explore corporate products', items: CORPORATE_SIGNUP_ITEMS },
    secondary: { label: 'Get in touch', href: '/bank/call-me-back' },
  },
  statement: 'Balance sheet strength powering Zimbabwe\'s leading institutions.',
  noun: 'corporate',
  about: {
    title: 'We are here for your institution.',
    body: 'One group, one relationship — from treasury to capital raising.',
    cta: { label: 'About CBZ Holdings', href: '/the-group' },
    image: { src: '/images/loan-education.webp', alt: 'A graduate with her mother outside the university' },
  },
  promise: { title: 'Our promise to your institution.', items: GROUP_PROMISE, image: { src: '/images/accounts/current.webp', alt: 'A bursar at her desk' } },
  help: [
    { title: 'Bank', line: 'Corporate accounts, trade finance and cash management.', go: 'Explore Corporate Banking', href: '/clusters/banking', icon: 'bank' },
    { title: 'Borrow', line: 'Structured debt, project finance and working capital.', go: 'Explore Corporate Finance', href: '/bank', icon: 'wallet' },
    { title: 'Insure', line: 'Commercial assets, liability, group life and risk advisory.', go: 'Explore Corporate Cover', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Invest', line: 'Treasury placements, capital raising and commercial property.', go: 'Explore Institutional Investing', href: '/clusters/investments', icon: 'chart' },
    { title: 'Agribusiness', line: 'Contract farming, commodity trading and export value chains.', go: 'Explore Agribusiness', href: '/clusters/agro-business', icon: 'leaf' },
  ],
  stages: { title: 'Whatever the challenge, ', strong: 'we’re here to help your institution move forward.', items: CORPORATE_STAGES },
  digital: {
    title: 'Treasury managed, ',
    strong: 'business moving',
    lede: 'Corporate internet banking, e-statements and treasury services keep the business moving between meetings.',
    cards: [
      {
        title: 'CBZ Touch',
        line: 'Zero-rated corporate mobile banking: payments, approvals and account management on the move.',
        ...touchBadges,
      },
      {
        title: 'Internet banking',
        line: 'Balances, e-statements, payroll runs and supplier payments with multi-level approvals.',
        icon: 'globe',
        actions: internetActions('Learn more'),
      },
      {
        title: 'Kleva POS',
        line: 'A point of sale device at the bursar’s office for fees, uniforms and tuck shop, settled into the school account.',
        icon: 'store',
        actions: [
          { label: 'See POS devices', href: '/bank#cards-and-digital', variant: 'primary' },
          { label: 'Speak to an agent', href: '/bank/call-me-back', variant: 'secondary' },
        ],
      },
    ],
  },
};

/** The red menu on the Diaspora home. */
export const DIASPORA_SIGNUP_ITEMS: NavLink[] = [
  { label: 'Open a diaspora account', href: '/bank/open-account', line: 'A foreign currency account run from your phone' },
  { label: 'Browse property back home', href: '/properties#property-listing', line: 'Titled stands and homes, financed by CBZ Bank' },
  { label: 'Invest with Datvest', href: '/datvest/start-investing', line: 'The Diaspora Wealth Fund and USD funds' },
  { label: 'Cover your family with CBZ Life', href: '/cbz-life/quote', line: 'Funeral and education plans' },
  { label: 'Insure property in Zimbabwe', href: '/insurance/quote', line: 'Diaspora property insurance' },
  { label: 'Send money home with ZikiCash', href: LINKS.zikiCash.playStore, line: 'From the UK to a CBZ account, a branch or an agent', external: true },
];

export const DIASPORA_STAGES: LifeStage[] = [
  {
    tag: 'Banking',
    icon: 'globe',
    question: 'Banking from abroad?',
    promise: "Let's open an account you run from your phone.",
    offers: ['Foreign currency account', 'CBZ Touch'],
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/accounts/diaspora.webp', alt: 'A woman abroad banking on her tablet' },
  },
  {
    tag: 'Property',
    icon: 'home',
    question: 'Building or buying back home?',
    promise: "Let's find the stand and the finance.",
    offers: ['Titled stands and turnkey homes', 'CBZ Bank mortgage'],
    href: '/properties#property-listing',
    unit: 'properties',
    image: { src: '/images/loan-home.webp', alt: 'A couple with the keys to their new home' },
  },
  {
    tag: 'Investing',
    icon: 'chart',
    question: 'Putting foreign currency to work?',
    promise: "Let's grow it in Zimbabwe.",
    offers: ['Diaspora Wealth Fund', 'USD Inflation-Shield Fund'],
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'A man looking over the city at dusk' },
  },
  {
    tag: 'Family',
    icon: 'shield',
    question: 'Looking after family at home?',
    promise: "Let's cover the people who depend on you.",
    offers: ['Comfortsure funeral plan', 'Sarapavana education plan'],
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-family.webp', alt: 'A family together at home' },
  },
  {
    tag: 'Sending money',
    icon: 'phoneMobile',
    question: 'Sending money home?',
    promise: "Let's get it there today.",
    offers: ['ZikiCash from the UK', 'Collect at a branch, ATM or agent'],
    href: '/login#apps',
    unit: 'bank',
    image: { src: '/images/cbz-payments.webp', alt: 'A payment being made on a phone' },
  },
];

export const DIASPORA_HOME: HomeConfig = {
  id: 'diaspora',
  path: '/diaspora',
  title: 'Diaspora banking',
  description: 'Bank with CBZ from abroad: foreign currency accounts, property back home with a CBZ Bank mortgage, Datvest funds and CBZ Life cover for your family.',
  hero: {
    title: 'Bank at Home, From Anywhere with ',
    brand: 'CBZ Holdings.',
    lede: 'Foreign currency accounts, property, investments and family cover — opened from abroad.',
    image: { src: '/images/heroes/hero-diaspora.jpg', alt: 'A farmer checking his phone in a maize field' },
    slides: [
      { src: '/images/heroes/hero-diaspora.jpg', alt: 'A farmer checking his phone in a maize field' },
      { src: '/images/accounts/diaspora.webp', alt: 'A woman holding a tablet with a city skyline behind her' },
      { src: '/images/loan-home.webp', alt: 'A couple holding up the key to their new home' },
    ],
    cta: { label: 'Explore diaspora products', items: DIASPORA_SIGNUP_ITEMS },
    secondary: { label: 'WhatsApp us', href: CONTACT.whatsapp.href },
  },
  statement: 'Your trusted bridge to Zimbabwe.',
  noun: 'diaspora',
  about: {
    title: 'We are here to help you build back home.',
    body: 'Banking, property, investments and cover — managed from your phone.',
    cta: { label: 'About CBZ Holdings', href: '/the-group' },
    image: { src: '/images/loan-home.webp', alt: 'A couple holding up the key to their new home' },
  },
  promise: {
    title: 'What you will need.',
    items: [
      { lead: 'A valid Zimbabwean identity document.', body: 'A copy of your Zimbabwean passport or national ID.' },
      { lead: 'Proof of where you live abroad.', body: 'A recent utility bill, council tax statement, tenancy agreement or bank statement showing your address.' },
      { lead: 'Proof of income.', body: 'Your latest payslip, a letter of employment, or three months of bank statements showing salary deposits.' },
    ],
    image: { src: '/images/accounts/diaspora.webp', alt: 'A woman holding a tablet with a floor plan' },
  },
  help: [
    { title: 'Bank', line: 'Foreign currency accounts managed from your phone.', go: 'Explore Banking', href: '/bank', icon: 'bank' },
    { title: 'Property', line: 'Stands and homes financed by CBZ Bank.', go: 'Explore Property', href: '/properties', icon: 'home' },
    { title: 'Invest', line: 'Diaspora Wealth Fund and USD funds.', go: 'Explore Investments', href: '/datvest', icon: 'chart' },
    { title: 'Insure', line: 'Family cover and property insurance in Zimbabwe.', go: 'Explore Cover', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Send money', line: 'ZikiCash remittances from the UK.', go: 'Explore ZikiCash', href: '/login#apps', icon: 'phoneMobile' },
  ],
  stages: { title: 'Wherever you are, ', strong: 'we’re here to keep you connected to home.', items: DIASPORA_STAGES },
  digital: PERSONAL_HOME.digital,
};

export const HOMES: Record<AudienceId, HomeConfig> = {
  personal: PERSONAL_HOME,
  business: BUSINESS_HOME,
  corporate: CORPORATE_HOME,
  diaspora: DIASPORA_HOME,
};
