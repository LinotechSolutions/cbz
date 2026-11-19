import { LINKS } from './links';
import { PRODUCT_AUDIENCES } from './audiences';
import type { IconName } from '../components/icons';

export interface NavLink {
  label: string;
  href: string | null;
  /** One line under the label in menus. */
  line?: string;
  external?: boolean;
}

export type AudienceId = 'personal' | 'corporate' | 'business' | 'diaspora';

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
  { id: 'corporate', label: 'Corporate', href: '/corporate', match: /^\/corporate(\/|$)/, line: 'Banking, finance, cover and advisory for corporates, parastatals, NGOs and institutions.' },
  { id: 'diaspora', label: 'Diaspora', href: '/diaspora', match: /^\/diaspora(\/|$)/, line: 'Bank with CBZ from abroad.' },
];

export interface MegaLink {
  label: string;
  href: string;
  external?: boolean;
  /** The audiences this link is shown to; a product link takes its product's tags, and no tags means everyone. */
  audiences?: AudienceId[];
}
export interface MegaColumn {
  /** The customer's purpose, e.g. "Choose an account". */
  title: string;
  items: MegaLink[];
  /** The business units behind the column, shown as "Offered by". */
  offeredBy: { name: string; href: string }[];
  /** The audiences this column is shown to; no tags means everyone. A column with no visible links is hidden. */
  audiences?: AudienceId[];
}
export interface MegaMenu {
  id: string;
  label: string;
  /** The icon on the chip in the navy band. */
  icon: IconName;
  /** Where the label itself goes before hydration, and the "View all" link. */
  href: string;
  /** One line under the columns. */
  note: string;
  columns: MegaColumn[];
  /** The buttons on the panel's footer: the first is red, the rest navy outline. */
  actions: MegaLink[];
  /** The audiences whose chip band carries this menu; no tags means everyone. */
  audiences?: AudienceId[];
}

const P = (unit: string, id: string) => `/${unit}/${id}`;
const BUSINESS: AudienceId[] = ['business'];
const CORPORATE: AudienceId[] = ['corporate'];
const PERSONAL_DIASPORA: AudienceId[] = ['personal', 'diaspora'];
const PERSONAL_BUSINESS: AudienceId[] = ['personal', 'business'];
const BUSINESS_CORPORATE: AudienceId[] = ['business', 'corporate'];
const NOT_DIASPORA: AudienceId[] = ['personal', 'corporate', 'business'];
const BANK = { name: 'CBZ Bank', href: '/bank' };
const RED_SPHERE = { name: 'Red Sphere Finance', href: '/red-sphere' };
const LIFE = { name: 'CBZ Life', href: '/cbz-life' };
const INSURANCE = { name: 'CBZ Insurance', href: '/insurance' };
const RISK = { name: 'CBZ Risk Advisory', href: '/risk-advisory' };
const DATVEST = { name: 'Datvest', href: '/datvest' };
const CAPITAL = { name: 'CBZ Capital', href: '/capital' };
const PROPERTIES = { name: 'CBZ Properties', href: '/properties' };
const AGRO = { name: 'CBZ Agro-Yield', href: '/agro-yield' };
const HOLDINGS = { name: 'CBZ Holdings', href: '/the-group' };

/**
 * The seven header menus. Each opens a full-width panel of up to five columns
 * grouped by what the customer wants to do, each column naming the business
 * unit behind it. Every link goes to a page, a section or a product card on
 * this site (a product link opens that product's own page, /<unit>/<id>).
 *
 * The panel shows only the links for the audience chosen in the toggle:
 * a product link takes its product's audience tags (src/data/audiences.ts),
 * a page link carries its own `audiences`, and untagged links show to all.
 * Columns with nothing left are hidden. A menu with its own `audiences`
 * (Affluent Banking, for individuals) is on the chip band for those
 * audiences only.
 */
const RAW_MEGA: MegaMenu[] = [
  {
    id: 'bank',
    label: 'Bank',
    icon: 'bank',
    href: '/clusters/banking',
    note: 'Accounts, savings, payments, cards and digital banking from CBZ Bank.',
    columns: [
      {
        title: 'Choose an account',
        items: [
          { label: 'Current Account', href: P('bank', 'current') },
          { label: 'Savings Account', href: P('bank', 'savings_individual') },
          { label: 'Simple Saver', href: P('bank', 'simple_saver') },
          { label: 'SmartCash', href: P('bank', 'smartcash_general') },
          { label: 'Foreign Currency Account', href: P('bank', 'fca_individual') },
          { label: 'Current Account (Corporate)', href: P('bank', 'current_corporate') },
          { label: 'Church Current Account', href: P('bank', 'church_current') },
          { label: 'School Current Account', href: P('bank', 'school_current') },
          { label: 'Foreign Currency Account (Corporate)', href: P('bank', 'fca_corporate') },
          { label: 'Open a diaspora account', href: '/diaspora', audiences: ['diaspora'] },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Save for a goal',
        items: [
          { label: 'CashPlus Junior', href: P('bank', 'cashplus_junior') },
          { label: 'CashPlus Teen', href: P('bank', 'cashplus_teen') },
          { label: 'CashPlus Student', href: P('bank', 'cashplus_student') },
          { label: 'CashPlus Housing', href: P('bank', 'cashplus_housing') },
          { label: 'Fixed Deposit', href: P('bank', 'fixed_deposit') },
          { label: 'Savings Account (Corporate)', href: P('bank', 'savings_corporate') },
          { label: 'CashPlus Business', href: P('bank', 'cashplus_business') },
          { label: 'Datvest Diaspora Wealth Fund', href: P('datvest', 'datvest-diaspora-wealth-fund'), audiences: ['diaspora'] },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Pay & transact',
        items: [
          { label: 'Bills & school fees', href: P('bank', 'cbz_touch') },
          { label: 'Transfers', href: P('bank', 'internet_banking') },
          { label: 'Foreign currency payments', href: P('bank', 'fca_individual') },
          { label: 'E-statements', href: P('bank', 'e_statements') },
          { label: 'Send money home with ZikiCash', href: '/#digital', audiences: ['diaspora'] },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Cards & merchant services',
        items: [
          { label: 'Visa Gold', href: P('bank', 'visa_gold') },
          { label: 'Student Visa', href: P('bank', 'student_visa') },
          { label: 'Debit / ATM card', href: P('bank', 'atm_card') },
          { label: 'SME Debit Card', href: P('bank', 'sme_debit_card') },
          { label: 'Kleva POS', href: P('bank', 'kleva_pos') },
          { label: 'Local POS', href: P('bank', 'local_pos') },
          { label: 'Visa POS', href: P('bank', 'visa_pos') },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Bank digitally',
        items: [
          { label: 'Internet Banking', href: '/login' },
          { label: 'CBZ Touch', href: '/login#apps' },
          { label: 'Cardless withdrawals', href: P('bank', 'cbz_touch'), audiences: PERSONAL_DIASPORA },
          { label: 'Stay safe online', href: '/security' },
        ],
        offeredBy: [BANK],
      },
    ],
    actions: [
      { label: 'Open an account', href: '/bank/open-account' },
      { label: 'Compare accounts', href: '/bank#open-an-account' },
      { label: 'Log in', href: '/login' },
    ],
  },
  {
    id: 'affluent',
    label: 'Affluent Banking',
    icon: 'star',
    href: '/affluent',
    note: 'Private Banking, Prime Banking and Wealth Management from CBZ Bank, for individuals.',
    audiences: ['personal'],
    columns: [
      {
        title: 'Private Banking',
        items: [
          { label: 'Exclusive banking for those shaping tomorrow', href: '/affluent/private-banking' },
          { label: 'What you need to know', href: '/affluent/private-banking#know' },
          { label: 'Visa Infinite', href: '/affluent/cards' },
          { label: 'Why clients choose CBZ', href: '/affluent/private-banking#why' },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Prime Banking',
        items: [
          { label: 'Premium banking that moves with your ambition', href: '/affluent/prime-banking' },
          { label: 'What you need to know', href: '/affluent/prime-banking#know' },
          { label: 'Visa Debit and Gold', href: '/affluent/cards#gold' },
          { label: 'Why clients choose CBZ', href: '/affluent/prime-banking#why' },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Wealth Management',
        items: [
          { label: 'Grow, protect and pass on your wealth', href: '/affluent/wealth-management' },
          { label: 'What you need to know', href: '/affluent/wealth-management#know' },
          { label: 'Investment solutions', href: '/affluent/investments' },
          { label: 'Why clients choose CBZ', href: '/affluent/wealth-management#why' },
        ],
        offeredBy: [BANK, DATVEST],
      },
      {
        title: 'Solutions for every tier',
        items: [
          { label: 'Transactional accounts', href: '/affluent/accounts' },
          { label: 'Loans', href: '/affluent/loans' },
          { label: 'Vehicle finance', href: '/affluent/vehicle-finance' },
          { label: 'Safe deposit boxes', href: '/affluent/safe-deposit' },
          { label: 'Insurance and life assurance', href: '/affluent/insurance' },
          { label: 'Property solutions', href: '/affluent/properties' },
          { label: 'Farm finance', href: '/affluent/farm' },
        ],
        offeredBy: [BANK, INSURANCE, PROPERTIES, AGRO],
      },
      {
        title: 'Talk to us',
        items: [
          { label: 'Compare the three tiers', href: '/affluent#compare' },
          { label: 'Locate a Private Banking centre', href: '/contact#private-banking' },
          { label: 'Book an appointment', href: '/affluent#appointment' },
          { label: 'Speak to a wealth manager', href: '/datvest/call-me-back' },
        ],
        offeredBy: [BANK],
      },
    ],
    actions: [
      { label: 'Explore Affluent Banking', href: '/affluent' },
      { label: 'Book an appointment', href: '/affluent#appointment' },
      { label: 'Compare the tiers', href: '/affluent#compare' },
    ],
  },
  {
    id: 'insure',
    label: 'Insure',
    icon: 'shield',
    href: '/clusters/insurance',
    note: 'Cover for your family, what you own, your business and your staff.',
    columns: [
      {
        title: 'Protect my family',
        items: [
          { label: 'Comfortsure Funeral Cashplan', href: P('cbz-life', 'comfortsure') },
          { label: 'Sarapavana Education Plan', href: P('cbz-life', 'sarapavana') },
          { label: 'Credit Life', href: P('cbz-life', 'credit_life') },
          { label: 'Diaspora Property Insurance', href: P('insurance', 'diaspora') },
          { label: 'Get a life quote', href: '/cbz-life/quote' },
        ],
        offeredBy: [LIFE],
      },
      {
        title: 'Plan for retirement',
        items: [
          { label: 'Retirement Savings', href: P('cbz-life', 'retirement_savings') },
          { label: 'Annuities', href: P('cbz-life', 'annuities') },
          { label: 'Pension fund management', href: P('datvest', 'defined-benefit-and-contribution-pensions') },
        ],
        offeredBy: [LIFE, DATVEST],
      },
      {
        title: 'Protect what I own',
        items: [
          { label: 'Motor', href: P('insurance', 'motor') },
          { label: 'Home & Contents', href: P('insurance', 'home') },
          { label: 'Travel', href: P('insurance', 'travel') },
          { label: 'Health & Personal Accident', href: P('insurance', 'health') },
        ],
        offeredBy: [INSURANCE],
      },
      {
        title: 'Protect business / farm',
        items: [
          { label: 'SME Business Shield', href: P('insurance', 'sme_shield') },
          { label: 'Commercial Property & Plant', href: P('insurance', 'commercial_plant') },
          { label: 'All-Risks Business Assets', href: P('insurance', 'assets') },
          { label: 'Professional & Public Liability', href: P('insurance', 'liability') },
          { label: 'Goods in transit', href: P('insurance', 'marine') },
          { label: 'Crop protection', href: P('insurance', 'multi_peril') },
        ],
        offeredBy: [INSURANCE],
      },
      {
        title: 'Manage benefits & risk',
        items: [
          { label: 'Group Life', href: P('cbz-life', 'group_life') },
          { label: 'Healthcare & group benefits', href: P('risk-advisory', 'group_medical_benefits') },
          { label: 'Enterprise risk audits', href: P('risk-advisory', 'enterprise_risk_audits') },
          { label: 'Pensions advisory', href: P('risk-advisory', 'pension_trustee_advisory') },
        ],
        offeredBy: [RISK, LIFE],
      },
    ],
    actions: [
      { label: 'Get a quote', href: '/insurance/quote' },
      { label: 'Explore cover', href: '/insurance' },
      { label: 'Request advice', href: '/risk-advisory/quote' },
    ],
  },
  {
    id: 'invest',
    label: 'Invest',
    icon: 'chart',
    href: '/clusters/investments',
    note: 'From a first unit trust to capital raising and commercial property.',
    columns: [
      {
        title: 'Grow my money',
        items: [
          { label: 'Unit trusts', href: '/datvest#panel-datvest-unit-trusts', audiences: PERSONAL_DIASPORA },
          { label: 'Money Market Fund', href: P('datvest', 'datvest-money-market-fund') },
          { label: 'Fixed income', href: P('datvest', 'datvest-high-yield-fixed-income-fund') },
          { label: 'Equity Fund', href: P('datvest', 'datvest-equity-fund') },
          { label: 'USD Inflation-Shield Fund', href: P('datvest', 'datvest-usd-inflation-shield-fund') },
          { label: 'Diaspora Wealth Fund', href: P('datvest', 'datvest-diaspora-wealth-fund') },
          { label: 'Corporate treasury placement', href: P('datvest', 'corporate-treasury-liquidity-placement') },
        ],
        offeredBy: [DATVEST],
      },
      {
        title: 'Manage wealth',
        items: [
          { label: 'Wealth management', href: P('datvest', 'high-net-worth-wealth-architecture') },
          { label: 'Portfolio management', href: P('datvest', 'segregated-equity-and-bond-mandates') },
          { label: 'Trust & estate planning', href: P('datvest', 'intergenerational-trust-and-estate-planning') },
          { label: 'Pension fund management', href: P('datvest', 'defined-benefit-and-contribution-pensions') },
          { label: 'Offshore USD investment notes', href: P('datvest', 'structured-offshore-usd-investment-notes') },
          { label: 'VFEX USD equities', href: P('datvest', 'victoria-falls-exchange-vfex-usd-equities') },
        ],
        offeredBy: [DATVEST],
      },
      {
        title: 'Raise capital',
        items: [
          { label: 'Corporate finance', href: '/capital#learn-more', audiences: BUSINESS },
          { label: 'Debt / equity raising', href: P('capital', 'rights_issues_placements') },
          { label: 'Syndicated finance', href: P('capital', 'loan_syndications') },
          { label: 'IPOs & listings', href: P('capital', 'ipos_listings') },
        ],
        offeredBy: [CAPITAL],
      },
      {
        title: 'Property',
        items: [
          { label: 'Homes and stands for sale', href: '/properties#property-listing', audiences: PERSONAL_DIASPORA },
          { label: 'Commercial space to let', href: '/properties?type=commercial', audiences: BUSINESS_CORPORATE },
          { label: 'Request a viewing', href: '/properties/request-a-viewing' },
          { label: 'Valuations & advisory', href: '/properties/call-back' },
        ],
        offeredBy: [PROPERTIES],
      },
      {
        title: 'Strategic transactions',
        items: [
          { label: 'M&A advisory', href: P('capital', 'mna_advisory') },
          { label: 'Valuations & fairness opinions', href: P('capital', 'independent_valuations') },
          { label: 'Restructuring', href: P('capital', 'balance_sheet_restructuring') },
          { label: 'Public-private partnerships', href: P('capital', 'ppp_concessions') },
        ],
        offeredBy: [CAPITAL],
      },
    ],
    actions: [
      { label: 'Explore investments', href: '/datvest' },
      { label: 'Speak to a specialist', href: '/datvest/call-me-back' },
      { label: 'Explore property', href: '/properties' },
    ],
  },
  {
    id: 'borrow',
    label: 'Borrow',
    icon: 'wallet',
    href: '/red-sphere',
    note: 'Loans by purpose, from CBZ Bank and Red Sphere Finance.',
    columns: [
      {
        title: 'Borrow against salary',
        items: [
          { label: 'Civil Servant Loan', href: P('bank', 'civil_servant_loan') },
          { label: 'Private Payroll Loan', href: P('red-sphere', 'private_payroll') },
          { label: 'Nostro Individual Loan', href: P('bank', 'nostro_loan') },
          { label: 'Payday Loan', href: P('bank', 'payday_loan') },
          { label: 'SSB Loan', href: P('red-sphere', 'ssb_loan') },
        ],
        offeredBy: [BANK, RED_SPHERE],
      },
      {
        title: 'Pay for education',
        items: [
          { label: 'Private School Fees Loan', href: P('bank', 'private_school_fees_loan') },
          { label: 'Student Loan Facility', href: P('bank', 'student_loan_facility') },
          { label: 'Sarapavana Education Plan', href: P('cbz-life', 'sarapavana') },
        ],
        offeredBy: [BANK, LIFE],
      },
      {
        title: 'Finance property',
        items: [
          { label: 'Mortgage finance', href: '/bank/apply', audiences: PERSONAL_DIASPORA },
          { label: 'Mortgage calculator', href: '/calculators#mortgage', audiences: PERSONAL_DIASPORA },
          { label: 'CashPlus Housing', href: P('bank', 'cashplus_housing') },
          { label: 'Diaspora turnkey home build', href: '/properties', audiences: ['diaspora'] },
        ],
        offeredBy: [BANK],
      },
      {
        title: 'Grow my business',
        items: [
          { label: 'SME Working Capital', href: P('red-sphere', 'sme_working_capital') },
          { label: 'Tuck-shop Facility', href: P('red-sphere', 'tuckshop') },
          { label: 'Order Finance', href: P('red-sphere', 'order_finance') },
          { label: 'Invoice Discounting', href: '/red-sphere#explore-invoice-discounting', audiences: BUSINESS },
        ],
        offeredBy: [RED_SPHERE],
      },
      {
        title: 'Finance the school',
        items: [
          { label: 'School Current Account', href: P('bank', 'school_current') },
          { label: 'Fixed Deposit for reserves', href: P('bank', 'fixed_deposit') },
          { label: 'Talk to CBZ Bank about a facility', href: '/bank/call-me-back' },
        ],
        offeredBy: [BANK],
        audiences: BUSINESS,
      },
      {
        title: 'Finance assets',
        items: [
          { label: 'Car finance', href: '/calculators#car-finance', audiences: PERSONAL_BUSINESS },
          { label: 'Partner Car Loan', href: P('red-sphere', 'partner_car_loan') },
          { label: 'Device finance', href: P('red-sphere', 'lockable_device') },
          { label: 'Irrigation & machinery cover', href: P('insurance', 'irrigation_machinery') },
        ],
        offeredBy: [BANK, RED_SPHERE],
      },
    ],
    actions: [
      { label: 'Compare options', href: '/calculators' },
      { label: 'Check requirements', href: '/bank#apply-for-a-loan' },
      { label: 'Apply', href: '/bank/apply' },
    ],
  },
  {
    id: 'agribusiness',
    label: 'Agribusiness',
    icon: 'leaf',
    href: '/clusters/agro-business',
    note: 'The agricultural value chain: contract farming, inputs, offtake and commodity trading.',
    columns: [
      {
        title: 'Produce more',
        items: [
          { label: 'Contract farming', href: P('agro-yield', 'agro_farming') },
          { label: 'Agro enterprise', href: P('agro-yield', 'agro_enterprise') },
          { label: 'Input finance on Agrideck', href: LINKS.farmerOnboarding ?? '/agro-yield/enquire', external: Boolean(LINKS.farmerOnboarding), audiences: NOT_DIASPORA },
          { label: 'Register as a farmer', href: '/agro-yield#register-as-a-farmer', audiences: NOT_DIASPORA },
        ],
        offeredBy: [AGRO],
      },
      {
        title: 'Access machinery',
        items: [
          { label: 'Supply chain & logistics', href: P('agro-yield', 'agro_supply_chain') },
          { label: 'Irrigation & machinery cover', href: P('insurance', 'irrigation_machinery') },
          { label: 'ATDC equipment', href: LINKS.atdc ?? '/agro-yield#explore-atdc', external: Boolean(LINKS.atdc), audiences: BUSINESS_CORPORATE },
        ],
        offeredBy: [AGRO, INSURANCE],
      },
      {
        title: 'Sell produce',
        items: [
          { label: 'Commodity trading', href: P('agro-yield', 'agro_commodity_trading') },
          { label: 'Livestock cover', href: P('insurance', 'livestock') },
          { label: 'Weather index cover', href: P('insurance', 'satellite_weather') },
        ],
        offeredBy: [AGRO, INSURANCE],
      },
      {
        title: 'Finance agriculture',
        items: [
          { label: 'Seasonal finance on Agrideck', href: LINKS.farmerOnboarding ?? '/agro-yield/enquire', external: Boolean(LINKS.farmerOnboarding), audiences: NOT_DIASPORA },
          { label: 'Profeeds farmer product', href: P('red-sphere', 'profeeds') },
          { label: 'Farm loans', href: '/bank/apply', audiences: PERSONAL_BUSINESS },
          { label: 'Contract farming cover', href: P('insurance', 'contract_farming') },
        ],
        offeredBy: [AGRO, BANK, RED_SPHERE],
      },
      {
        title: 'Grow my SME',
        items: [
          { label: 'SME Working Capital', href: P('red-sphere', 'sme_working_capital') },
          { label: 'Order Finance', href: P('red-sphere', 'order_finance') },
          { label: 'Invoice Discounting', href: '/red-sphere#explore-invoice-discounting', audiences: BUSINESS },
          { label: 'Merchant POS', href: P('bank', 'kleva_pos') },
        ],
        offeredBy: [RED_SPHERE, BANK],
      },
      {
        title: 'Invest from abroad',
        items: [
          { label: 'Farmland and stands', href: '/properties#property-listing' },
          { label: 'Diaspora Wealth Fund', href: P('datvest', 'datvest-diaspora-wealth-fund') },
          { label: 'Talk to Agro-Yield', href: '/agro-yield/enquire' },
        ],
        offeredBy: [PROPERTIES, DATVEST, AGRO],
        audiences: ['diaspora'],
      },
    ],
    actions: [
      { label: 'Explore farming', href: '/agro-yield' },
      { label: 'Request finance', href: '/agro-yield/enquire' },
      { label: 'Sell produce', href: P('agro-yield', 'agro_commodity_trading') },
    ],
  },
  {
    id: 'zikimall',
    label: 'ZikiMall',
    icon: 'store',
    href: 'https://zikimall.com/',
    note: 'Africa\'s digital marketplace: buy, sell and discover products from local and international sellers.',
    columns: [
      {
        title: 'Shop',
        items: [
          { label: 'Browse categories', href: 'https://zikimall.com/', external: true },
          { label: 'Deals of the day', href: 'https://zikimall.com/deals', external: true },
          { label: 'New arrivals', href: 'https://zikimall.com/new', external: true },
        ],
        offeredBy: [{ name: 'ZikiMall', href: 'https://zikimall.com/' }],
      },
      {
        title: 'Sell on ZikiMall',
        items: [
          { label: 'Register as a seller', href: 'https://zikimall.com/sell', external: true },
          { label: 'Seller dashboard', href: 'https://zikimall.com/seller', external: true },
          { label: 'Fulfilment and delivery', href: 'https://zikimall.com/logistics', external: true },
        ],
        offeredBy: [{ name: 'ZikiMall', href: 'https://zikimall.com/' }],
      },
      {
        title: 'Pay with CBZ',
        items: [
          { label: 'Pay with CBZ Touch', href: '/login#apps' },
          { label: 'Internet banking', href: '/login' },
          { label: 'Card payments', href: '/bank/visa_gold' },
        ],
        offeredBy: [BANK],
      },
    ],
    actions: [
      { label: 'Shop on ZikiMall', href: 'https://zikimall.com/', external: true },
      { label: 'Sell on ZikiMall', href: 'https://zikimall.com/sell', external: true },
    ],
  },
  {
    id: 'group',
    label: 'Group',
    icon: 'users',
    href: '/the-group',
    note: 'Who we are, how we are structured, and how to reach us.',
    columns: [
      {
        title: 'About',
        items: [
          { label: 'Who we are', href: '/the-group' },
          { label: 'Structure', href: '/the-group#structure' },
          { label: 'Leadership', href: '/the-group#board' },
          { label: 'Milestones', href: '/the-group#milestones' },
        ],
        offeredBy: [HOLDINGS],
      },
      {
        title: 'Businesses',
        items: [
          { label: 'Banking', href: '/clusters/banking' },
          { label: 'Insurance', href: '/clusters/insurance' },
          { label: 'Investments', href: '/clusters/investments' },
          { label: 'Farm', href: '/clusters/agro-business' },
        ],
        offeredBy: [HOLDINGS],
      },
      {
        title: 'Investors',
        items: [
          { label: 'Results and reports', href: LINKS.investorRelations, external: true },
          { label: 'Newsroom', href: '/notices' },
          { label: 'Awards', href: '/the-group#awards' },
          { label: 'Executive management', href: '/the-group#exco' },
        ],
        offeredBy: [HOLDINGS],
      },
      {
        title: 'Sustainability & trust',
        items: [
          { label: 'Sustainability', href: '/sustainability' },
          { label: 'Raise a concern', href: '/sustainability/grievance' },
          { label: 'Tip-offs anonymous', href: '/tip-offs' },
          { label: 'Security', href: '/security' },
        ],
        offeredBy: [HOLDINGS],
      },
      {
        title: 'Community & help',
        items: [
          { label: 'CBZ Foundation', href: '/cbz-foundation' },
          { label: 'Explore our solutions', href: '/journeys' },
          { label: 'Contact us', href: '/contact' },
          { label: 'Sitemap', href: '/sitemap' },
        ],
        offeredBy: [HOLDINGS],
      },
    ],
    actions: [
      { label: 'About CBZ', href: '/the-group' },
      { label: 'Group businesses', href: '/the-group#structure' },
      { label: 'Investor information', href: LINKS.investorRelations, external: true },
    ],
  },
];

/** A product link's audiences come from the product's own tags. */
const productAudiences = (href: string): AudienceId[] | undefined => {
  const m = href.match(/^\/([a-z-]+)\/([a-z0-9_-]+)$/);
  if (!m) return undefined;
  return PRODUCT_AUDIENCES[m[1]]?.[m[2]];
};
export const MEGA: MegaMenu[] = RAW_MEGA.map((m) => ({
  ...m,
  columns: m.columns.map((c) => ({
    ...c,
    items: c.items.map((it) => (it.audiences ? it : { ...it, audiences: productAudiences(it.href) })),
  })),
}));

/** Plain links in the header row, before Log in and Sign up. */
export const UTILITY_LINKS: NavLink[] = [
  { label: 'Branches & ATMs', href: '/contact#branches' },
  { label: 'Help', href: '/contact' },
];

export interface Intent {
  /** The verb, e.g. "open". */
  verb: string;
  /** What can follow it, each going to one page or product card. */
  objects: { label: string; href: string; external?: boolean }[];
}

/**
 * The "I want to … " sentence builder at the top of the search dialog: pick
 * a verb, pick what you want, press Search. Every combination lands on a
 * page, a section or a product card.
 */
export const INTENTS: Intent[] = [
  {
    verb: 'open',
    objects: [
      { label: 'a bank account', href: '/bank/open-account' },
      { label: 'a business account', href: '/bank/open-account?for=business' },
      { label: 'a school account', href: P('bank', 'school_current') },
      { label: 'a foreign currency account', href: P('bank', 'fca_individual') },
      { label: 'a diaspora account', href: '/diaspora' },
    ],
  },
  {
    verb: 'start',
    objects: [
      { label: 'saving and investing', href: '/datvest/start-investing' },
      { label: 'saving for my child', href: P('bank', 'cashplus_junior') },
      { label: 'a fixed deposit', href: P('bank', 'fixed_deposit') },
      { label: 'a funeral plan', href: '/cbz-life/quote' },
      { label: 'banking on my phone', href: '/login#apps' },
    ],
  },
  {
    verb: 'borrow',
    objects: [
      { label: 'against my salary', href: P('red-sphere', 'ssb_loan') },
      { label: 'for school fees', href: P('bank', 'private_school_fees_loan') },
      { label: 'for a home', href: '/bank/apply' },
      { label: 'for a car', href: '/calculators#car-finance' },
      { label: 'for my business', href: '/red-sphere#explore-loan-products' },
    ],
  },
  {
    verb: 'insure',
    objects: [
      { label: 'my car', href: P('insurance', 'motor') },
      { label: 'my home', href: P('insurance', 'home') },
      { label: 'my family', href: P('cbz-life', 'comfortsure') },
      { label: 'my business', href: P('insurance', 'sme_shield') },
      { label: 'my farm', href: P('insurance', 'multi_peril') },
      { label: 'my staff', href: P('cbz-life', 'group_life') },
    ],
  },
  {
    verb: 'invest',
    objects: [
      { label: 'in unit trusts', href: '/datvest#panel-datvest-unit-trusts' },
      { label: 'in a money market fund', href: P('datvest', 'datvest-money-market-fund') },
      { label: 'surplus company cash', href: P('datvest', 'corporate-treasury-liquidity-placement') },
      { label: 'in property', href: '/properties' },
      { label: 'for retirement', href: P('cbz-life', 'retirement_savings') },
    ],
  },
  {
    verb: 'pay',
    objects: [
      { label: 'school fees', href: P('bank', 'cbz_touch') },
      { label: 'bills', href: P('bank', 'cbz_touch') },
      { label: 'my insurance premium', href: '/cbz-life/pay' },
      { label: 'suppliers', href: P('bank', 'internet_banking') },
    ],
  },
  {
    verb: 'grow',
    objects: [
      { label: 'my farm', href: '/agro-yield' },
      { label: 'my SME', href: P('red-sphere', 'sme_working_capital') },
      { label: 'my company', href: '/capital' },
      { label: 'my wealth', href: P('datvest', 'high-net-worth-wealth-architecture') },
    ],
  },
  {
    verb: 'join',
    objects: [
      { label: 'Private Banking', href: '/affluent/private-banking' },
      { label: 'Prime Banking', href: '/affluent/prime-banking' },
      { label: 'Wealth Management', href: '/affluent/wealth-management' },
      { label: 'Corporate banking', href: '/corporate' },
    ],
  },
  {
    verb: 'find',
    objects: [
      { label: 'a branch or ATM', href: '/contact#branches' },
      { label: 'a property', href: '/properties#property-listing' },
      { label: 'a calculator', href: '/calculators' },
      { label: 'the CBZ Touch app', href: '/login#apps' },
    ],
  },
  {
    verb: 'claim',
    objects: [
      { label: 'on my car or home cover', href: '/insurance/claim' },
      { label: 'on a life policy', href: '/cbz-life/claim' },
    ],
  },
  {
    verb: 'talk to',
    objects: [
      { label: 'CBZ Bank', href: '/bank/call-me-back' },
      { label: 'CBZ Insurance', href: '/insurance/call-me-back' },
      { label: 'CBZ Life', href: '/cbz-life/talk-to-an-agent' },
      { label: 'Datvest', href: '/datvest/call-me-back' },
      { label: 'CBZ Properties', href: '/properties/call-back' },
      { label: 'someone at CBZ', href: '/contact' },
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
    { label: 'Newsroom', href: '/notices' },
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
