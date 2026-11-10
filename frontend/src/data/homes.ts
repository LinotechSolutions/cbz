/**
 * The audience home pages: Personal (/), Business (/business) and School
 * (/school) share one layout (AudienceHome.astro) and differ only in copy,
 * photographs and links. Diaspora keeps its own page at /diaspora.
 * Every link here goes to a page or product that exists on this site.
 */
import type { IconName } from '../components/icons';
import type { LogoKey } from './logos';
import type { AudienceId, NavLink } from './nav';
import { OPEN_ACCOUNT_ITEMS } from './nav';
import { LINKS } from './links';
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
    cta: { label: string; items: NavLink[] };
  };
  help: HelpCard[];
  stages: { title: string; strong: string; items: LifeStage[] };
  digital: { title: string; strong: string; lede: string; cards: DigitalCard[] };
}

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
    title: 'Bank, Invest, Insure and Grow with ',
    brand: 'CBZ Holdings.',
    lede: 'From everyday banking and protecting what matters to building wealth and growing your business, CBZ Holdings brings together the financial solutions, expertise and support you need to achieve more.',
    image: { src: '/images/hero-family.webp', alt: 'A family looking ahead together in the city' },
    cta: { label: 'Explore our products', items: OPEN_ACCOUNT_ITEMS },
  },
  help: [
    { title: 'Bank', line: 'Everyday banking, accounts, cards and savings.', go: 'Explore Banking', href: '/clusters/banking', icon: 'bank' },
    { title: 'Borrow', line: 'Salary, business and cash loans from Red Sphere.', go: 'Explore Loans', href: '/red-sphere', icon: 'wallet' },
    { title: 'Insure', line: 'Short-term insurance solutions for your assets and business.', go: 'Explore Insurance', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Invest', line: 'Wealth creation, unit trusts and corporate finance solutions.', go: 'Explore Investments', href: '/clusters/investments', icon: 'chart' },
    { title: 'Farm', line: 'Finance, inputs, offtake and sector solutions for the agricultural value chain.', go: 'Explore Farming', href: '/clusters/agro-business', icon: 'leaf' },
  ],
  stages: { title: 'Whatever your next step, ', strong: 'we’re here to help you move forward.', items: LIFE_STAGES },
  digital: {
    title: 'Bank wherever you are, ',
    strong: 'whenever you need to',
    lede: 'Three ways to bank without a branch: on your phone, across borders, or from your desk.',
    cards: [
      {
        title: 'CBZ Touch',
        line: 'Zero-rated mobile banking: transfers, bills, school fees, cardless withdrawals and card controls, with no data charges on local networks.',
        ...touchBadges,
      },
      {
        title: 'ZikiCash',
        line: 'Send money home from the United Kingdom to Zimbabwe, pay bills and deposit straight into a CBZ account or collect at a branch, ATM or agent.',
        logo: 'ziki-cash',
        logoHeight: 24,
        app: 'ziki-cash',
      },
      {
        title: 'Internet banking',
        line: 'Balances, statements, internal and RTGS transfers, Visa card transfers and utility payments, on the personal and corporate platforms.',
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
    title: 'Run, fund, protect and grow your business with ',
    brand: 'CBZ Holdings.',
    lede: 'From company accounts and card payments to working capital, cover for your premises and staff, and a home for surplus cash, CBZ Holdings brings every service a growing business needs under one roof.',
    image: { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands' },
    cta: { label: 'Explore business products', items: BUSINESS_SIGNUP_ITEMS },
  },
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

/** The red menu on the School home. */
export const SCHOOL_SIGNUP_ITEMS: NavLink[] = [
  { label: 'Open a school account', href: '/bank/open-account', line: 'School current account with cheque and cash deposit books' },
  { label: 'Collect fees on POS and CBZ Touch', href: '/bank#cards-and-digital', line: 'Kleva POS at the bursar’s office, fees paid from the app' },
  { label: 'Insure school buildings and assets', href: '/insurance/quote', line: 'Property, plant, equipment and public liability' },
  { label: 'Group life for teaching staff', href: '/cbz-life/quote', line: 'Group life assurance and retirement savings' },
  { label: 'Invest school funds with Datvest', href: '/datvest/start-investing', line: 'Money market and fixed income funds' },
  { label: 'Sarapavana education plan for parents', href: '/cbz-life#product-cbz-life-sarapavana', line: 'A savings plan that keeps fees paid' },
];

export const SCHOOL_STAGES: LifeStage[] = [
  {
    tag: 'Accounts',
    icon: 'building',
    question: 'Opening a school account?',
    promise: "Let's get the bursary banking.",
    offers: ['School current account', 'Cheque and cash deposit books'],
    href: '/bank/open-account',
    unit: 'bank',
    image: { src: '/images/accounts/current.webp', alt: 'A bursar at her desk' },
  },
  {
    tag: 'Fees',
    icon: 'wallet',
    question: 'Collecting school fees?',
    promise: "Let's make paying easy for parents.",
    offers: ['Kleva POS', 'Fees on CBZ Touch'],
    href: '/bank#cards-and-digital',
    unit: 'bank',
    image: { src: '/images/cbz-payments.webp', alt: 'A parent paying by card' },
  },
  {
    tag: 'Buildings',
    icon: 'shield',
    question: 'Insuring the school buildings?',
    promise: "Let's cover classrooms and equipment.",
    offers: ['Commercial property and plant', 'Public liability'],
    href: '/insurance/quote',
    unit: 'insurance',
    image: { src: '/images/cbz-protection.webp', alt: 'A school building' },
  },
  {
    tag: 'Teachers',
    icon: 'users',
    question: 'Looking after your teachers?',
    promise: "Let's cover the staff room.",
    offers: ['Group life assurance', 'Retirement savings'],
    href: '/cbz-life/quote',
    unit: 'cbz-life',
    image: { src: '/images/insurance-health.webp', alt: 'Teachers in a staff meeting' },
  },
  {
    tag: 'Parents',
    icon: 'graduation',
    question: 'Helping parents pay fees?',
    promise: "Let's keep every child in class.",
    offers: ['Private school fees loan', 'Sarapavana education plan'],
    href: '/bank#apply-for-a-loan',
    unit: 'bank',
    image: { src: '/images/loan-education.webp', alt: 'A student on campus' },
  },
  {
    tag: 'Building',
    icon: 'home',
    question: 'Building a new block?',
    promise: "Let's manage the project.",
    offers: ['Turnkey project management', 'Property valuations'],
    href: '/properties',
    unit: 'properties',
    image: { src: '/images/hero-home.webp', alt: 'A new building under construction' },
  },
  {
    tag: 'Funds',
    icon: 'chart',
    question: 'Investing school funds?',
    promise: "Let's make reserves work.",
    offers: ['Money market fund', 'Fixed deposits'],
    href: '/datvest/start-investing',
    unit: 'datvest',
    image: { src: '/images/cbz-wealth.webp', alt: 'An adviser reviewing a portfolio' },
  },
  {
    tag: 'School farm',
    icon: 'leaf',
    question: 'Running a school farm?',
    promise: "Let's back the harvest.",
    offers: ['Inputs and offtake', 'Contract farming'],
    href: LINKS.farmerOnboarding ?? '/agro-yield/enquire',
    unit: 'agro-yield',
    image: { src: '/images/cbz-agriculture.webp', alt: 'A maize field' },
  },
];

export const SCHOOL_HOME: HomeConfig = {
  id: 'school',
  path: '/school',
  title: 'Schools',
  description: 'CBZ Holdings for schools: school current accounts, fees collection on POS and CBZ Touch, cover for buildings and staff, and savings plans for parents.',
  hero: {
    title: 'Bank, insure and build your school with ',
    brand: 'CBZ Holdings.',
    lede: 'School current accounts, fees collected on CBZ Touch and POS, cover for buildings and teaching staff, and plans that help parents keep fees paid, all from one group.',
    image: { src: '/images/loan-education.webp', alt: 'A student on campus' },
    cta: { label: 'Explore school products', items: SCHOOL_SIGNUP_ITEMS },
  },
  help: [
    { title: 'Bank', line: 'School current account, fees collection, e-statements and fixed deposits.', go: 'Explore School Banking', href: '/bank', icon: 'bank' },
    { title: 'Borrow', line: 'School fees loans for parents and facilities for the school from CBZ Bank.', go: 'Explore Fees Loans', href: '/bank#apply-for-a-loan', icon: 'wallet' },
    { title: 'Insure', line: 'Buildings, equipment and liability cover, with group life for staff.', go: 'Explore School Cover', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Invest', line: 'Money market and fixed income funds for school reserves; building projects with CBZ Properties.', go: 'Explore Investments', href: '/clusters/investments', icon: 'chart' },
    { title: 'Farm', line: 'Inputs, offtake and contract farming for school farms and agricultural projects.', go: 'Explore Farming', href: '/clusters/agro-business', icon: 'leaf' },
  ],
  stages: { title: 'Whatever the term brings, ', strong: 'we’re here to help your school move forward.', items: SCHOOL_STAGES },
  digital: {
    title: 'Fees in, ',
    strong: 'paperwork out',
    lede: 'Collect fees on CBZ Touch and POS, issue e-statements and bank online between term dates.',
    cards: [
      {
        title: 'CBZ Touch',
        line: 'Parents pay school fees straight from the app, zero-rated on local networks, and the bursar sees the money the same day.',
        ...touchBadges,
      },
      {
        title: 'Internet banking',
        line: 'Balances, e-statements, salaries and supplier payments on the corporate platform, with approvals for the board.',
        icon: 'globe',
        actions: internetActions('See school channels'),
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

export const HOMES: Record<'personal' | 'business' | 'school', HomeConfig> = {
  personal: PERSONAL_HOME,
  business: BUSINESS_HOME,
  school: SCHOOL_HOME,
};
