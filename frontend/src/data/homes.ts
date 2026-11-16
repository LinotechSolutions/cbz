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
    title: 'Bank, Invest, Insure and Grow with ',
    brand: 'CBZ Holdings.',
    lede: 'From everyday banking and protecting what matters to building wealth and growing your business, CBZ Holdings brings together the financial solutions, expertise and support you need to achieve more.',
    image: { src: '/images/heroes/hero-personal.jpg', alt: 'A family of four smiling together outside their home' },
    slides: [
      { src: '/images/heroes/hero-personal.jpg', alt: 'A family of four smiling together outside their home' },
      { src: '/images/accounts/individual.webp', alt: 'A man banking on his laptop over coffee' },
      { src: '/images/cbz-banking.webp', alt: 'A relationship manager talking a customer through options in a branch' },
    ],
    cta: { label: 'Explore our products', items: OPEN_ACCOUNT_ITEMS },
    secondary: { label: 'Get in touch', href: '/contact' },
  },
  statement: 'From a first account to retirement plans and everything in between, we provide the guidance and support you need for financial success.',
  noun: 'personal',
  about: {
    title: 'We are here to help you grow faster.',
    body: 'Whether you are opening your first account, buying a home, covering your family or putting savings to work, the ten companies of CBZ Holdings work as one team around you, in every province and on your phone.',
    cta: { label: 'About CBZ Holdings', href: '/the-group' },
    image: { src: '/images/cbz-banking.webp', alt: 'A relationship manager talking a customer through options in a branch' },
  },
  promise: { title: 'Our promise to you.', items: GROUP_PROMISE, image: { src: '/images/insurance-family.webp', alt: 'A family laughing together on a sofa' } },
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
    image: { src: '/images/heroes/hero-business.jpg', alt: 'A businesswoman reviewing plans on a tablet outside a new building' },
    slides: [
      { src: '/images/heroes/hero-business.jpg', alt: 'A businesswoman reviewing plans on a tablet outside a new building' },
      { src: '/images/accounts/current.webp', alt: 'A business owner in her office' },
      { src: '/images/accounts/partnership.webp', alt: 'Two business partners shaking hands over plans' },
    ],
    cta: { label: 'Explore business products', items: BUSINESS_SIGNUP_ITEMS },
    secondary: { label: 'Get in touch', href: '/bank/call-me-back' },
  },
  statement: 'From a first company account to capital raising and everything in between, we provide the banking, finance and cover a growing business needs.',
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

/** The red menu on the School home. */
export const SCHOOL_SIGNUP_ITEMS: NavLink[] = [
  { label: 'Open a school account', href: '/bank/open-account', line: 'School current account with cheque and cash deposit books' },
  { label: 'Collect fees on POS and CBZ Touch', href: '/bank#cards-and-digital', line: 'Kleva POS at the bursar’s office, fees paid from the app' },
  { label: 'Insure school buildings and assets', href: '/insurance/quote', line: 'Property, plant, equipment and public liability' },
  { label: 'Group life for teaching staff', href: '/cbz-life/quote', line: 'Group life assurance and retirement savings' },
  { label: 'Invest school funds with Datvest', href: '/datvest/start-investing', line: 'Money market and fixed income funds' },
  { label: 'Sarapavana education plan for parents', href: '/cbz-life/sarapavana', line: 'A savings plan that keeps fees paid' },
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
    image: { src: '/images/heroes/hero-school.jpg', alt: 'An administrator working at a laptop' },
    slides: [
      { src: '/images/heroes/hero-school.jpg', alt: 'An administrator working at a laptop' },
      { src: '/images/accounts/teen.webp', alt: 'A student with her textbooks' },
      { src: '/images/loan-education.webp', alt: 'A graduate with her mother outside the university' },
    ],
    cta: { label: 'Explore school products', items: SCHOOL_SIGNUP_ITEMS },
    secondary: { label: 'Get in touch', href: '/bank/call-me-back' },
  },
  statement: 'From the school account and fees collection to cover for buildings and staff, we provide what a school needs to run and grow.',
  noun: 'school',
  about: {
    title: 'We are here to help your school grow faster.',
    body: 'A school current account with fees collected on CBZ Touch and POS, cover for classrooms and teaching staff, funds that earn between terms and plans that keep parents paying, from one group that understands schools.',
    cta: { label: 'About CBZ Holdings', href: '/the-group' },
    image: { src: '/images/loan-education.webp', alt: 'A graduate with her mother outside the university' },
  },
  promise: { title: 'Our promise to your school.', items: GROUP_PROMISE, image: { src: '/images/accounts/current.webp', alt: 'A bursar at her desk' } },
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
    title: 'Bank at home, from anywhere with ',
    brand: 'CBZ Holdings.',
    lede: 'Foreign currency accounts, property, investments and cover for your family in Zimbabwe, opened from wherever you live.',
    image: { src: '/images/heroes/hero-diaspora.jpg', alt: 'A farmer checking his phone in a maize field' },
    slides: [
      { src: '/images/heroes/hero-diaspora.jpg', alt: 'A farmer checking his phone in a maize field' },
      { src: '/images/accounts/diaspora.webp', alt: 'A woman holding a tablet with a city skyline behind her' },
      { src: '/images/loan-home.webp', alt: 'A couple holding up the key to their new home' },
    ],
    cta: { label: 'Explore diaspora products', items: DIASPORA_SIGNUP_ITEMS },
    secondary: { label: 'WhatsApp us', href: CONTACT.whatsapp.href },
  },
  statement: 'From a foreign currency account to a home and a plan for your family, we provide what Zimbabweans abroad need to stay connected to home.',
  noun: 'diaspora',
  about: {
    title: 'We are here to help you build back home.',
    body: 'A CBZ Bank account you run from your phone, titled stands and turnkey homes from CBZ Properties financed by CBZ Bank, Datvest funds for your foreign currency and CBZ Life cover for the people who depend on you.',
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
    { title: 'Bank', line: 'A foreign currency account you can run from your phone, with CBZ Touch and internet banking.', go: 'Explore Banking', href: '/bank', icon: 'bank' },
    { title: 'Property', line: 'Titled stands and turnkey homes from CBZ Properties, financed by CBZ Bank.', go: 'Explore Property', href: '/properties', icon: 'home' },
    { title: 'Invest', line: 'Put foreign currency to work through the Datvest Diaspora Wealth Fund and USD funds.', go: 'Explore Investments', href: '/datvest', icon: 'chart' },
    { title: 'Insure', line: 'CBZ Life cover for your family and CBZ Insurance for property in Zimbabwe.', go: 'Explore Cover', href: '/clusters/insurance', icon: 'shield' },
    { title: 'Send money', line: 'ZikiCash from the United Kingdom into a CBZ account, a branch, an ATM or an agent.', go: 'Explore ZikiCash', href: '/login#apps', icon: 'phoneMobile' },
  ],
  stages: { title: 'Wherever you are, ', strong: 'we’re here to keep you connected to home.', items: DIASPORA_STAGES },
  digital: PERSONAL_HOME.digital,
};

export const HOMES: Record<AudienceId, HomeConfig> = {
  personal: PERSONAL_HOME,
  business: BUSINESS_HOME,
  school: SCHOOL_HOME,
  diaspora: DIASPORA_HOME,
};
