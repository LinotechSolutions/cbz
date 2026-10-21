import { INVESTMENT_PRODUCTS, PROPERTY_PRODUCTS, SBU_PRODUCTS } from '../cbzData';
import { EXTERNAL_LINKS, GROUP_FACTS, tbc } from '../facts';
import { SbuPageConfig, campaignsPending, leadershipPending } from '../sbuPages';
import { AGRO_CATEGORIES, AGRO_PRODUCTS } from './agro';
import { BANK_PRODUCTS, BANK_PRODUCT_CATEGORIES } from './bank';
import { CAPITAL_CATEGORIES, CAPITAL_PRODUCTS } from './capital';
import { LIFE_CATEGORIES, LIFE_PRODUCTS } from './life';
import { RED_SPHERE_CATEGORIES, RED_SPHERE_PRODUCTS } from './redSphere';
import { RISK_ADVISORY_CATEGORIES, RISK_ADVISORY_PRODUCTS } from './riskAdvisory';

/**
 * Per-business-unit configuration for the standardised landing page.
 *
 * Product content comes from the catalogues transcribed from the official
 * product documentation. Facts come from data/facts.ts. Anything still awaiting
 * business sign-off is wrapped in tbc() so it shows up in review.
 */

export const RED_SPHERE_PAGE: SbuPageConfig = {
  brand: 'red-sphere',
  imageKeyPrefix: 'red-sphere-product',
  hero: {
    eyebrow: 'Red Sphere Finance',
    headline: 'Credit that fits how you earn',
    valueProposition:
      'Salary-based lending for government and private payrolls, working capital for enterprises and tuck-shops, and partnership programmes for agents and retailers.',
    imageKey: 'banner.red-sphere',
    image: '/images/cbz-payments.webp',
    primaryCta: { label: 'Apply online', href: EXTERNAL_LINKS.redSphereApply },
    secondaryCta: { label: 'Get the mobile app', href: EXTERNAL_LINKS.redSphereApp },
  },
  about:
    'Red Sphere Finance is the CBZ Group’s microfinance business. It lends against a salary, a payroll agreement or a trading record, so customers who fall outside traditional bank lending can still access credit, and partners and agents can extend it through their own networks.',
  keyFacts: [
    { value: '13', label: 'Lending and partnership products' },
    { value: 'From 5%', label: 'Interest on business and partner facilities' },
    { value: '1–24 months', label: 'Tenors, by product' },
    { value: 'US$2,400', label: 'SSB loan limit' },
    { value: '8%', label: 'Partner commission' },
    { value: 'Part of CBZ', label: GROUP_FACTS.zseListed.value },
  ],
  products: {
    heading: 'Products and solutions',
    intro:
      'Lending by how the customer earns, plus the agency and partnership routes that put Red Sphere credit in front of more people.',
    categories: RED_SPHERE_CATEGORIES,
    items: RED_SPHERE_PRODUCTS,
    termsNote:
      'Tenors, interest rates and administration fees are those set out in the Red Sphere Finance product documentation and are subject to credit assessment and approval. Security requirements vary by product; the documents listed against each product show what is required. Interest rates may change, so confirm the current terms before you apply.',
  },
  campaigns: campaignsPending('Red Sphere'),
  leadership: leadershipPending('Red Sphere'),
  contact: {
    heading: 'Talk to Red Sphere Finance',
    body: 'Apply online, through the mobile app, or speak to the team about agency and partnership opportunities.',
    primaryCta: { label: 'Request a callback', screen: 'open-account' },
  },
};

/**
 * Insurance, Datvest and Properties have no product documentation yet. Their
 * product names and descriptions are drafts awaiting sign-off, and every
 * invented premium, yield and price has been removed: each card now carries an
 * action rather than a figure nobody can stand behind.
 */
const PENDING_VERIFICATION =
  'Product details are being confirmed with the business. Terms, pricing and availability are subject to assessment; speak to us for current terms before you rely on anything here.';

export const BANK_PAGE: SbuPageConfig = {
  brand: 'bank',
  imageKeyPrefix: 'bank-product',
  hero: {
    eyebrow: 'CBZ Bank',
    headline: 'Banking for every stage of life',
    valueProposition:
      'Accounts, savings, cards and loans for individuals, companies, schools and churches, with internet banking and CBZ Touch.',
    imageKey: 'banner.banking',
    image: '/images/cbz-banking.webp',
    primaryCta: { label: 'Open an account', screen: 'open-account' },
    secondaryCta: { label: 'Apply for a loan', screen: 'journey-bank' },
  },
  about:
    'CBZ Bank is the Group’s commercial bank. It runs everyday transactional and savings accounts, foreign currency accounts, cards, and personal and school fee lending, alongside internet banking, CBZ Touch and merchant point of sale.',
  keyFacts: [
    { value: '39', label: 'Products in the retail catalogue' },
    { value: 'Five', label: 'Foreign currencies held' },
    { value: 'Zero rated', label: 'CBZ Touch mobile banking' },
    { value: GROUP_FACTS.branches.value, label: 'Nationwide' },
    { value: GROUP_FACTS.years.value, label: 'Serving Zimbabwe' },
    { value: 'ZSE: CBZ', label: 'Listed' },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'Everything in the retail banking catalogue, grouped by what it does.',
    categories: BANK_PRODUCT_CATEGORIES,
    items: BANK_PRODUCTS,
    termsNote:
      'Requirements, features and benefits are those set out in the Retail Banking Product Manual. Lending is subject to credit assessment, and interest rates are subject to change; confirm current terms before you apply.',
  },
  campaigns: campaignsPending('CBZ Bank'),
  leadership: leadershipPending('CBZ Bank'),
  contact: {
    heading: 'Open an account with CBZ Bank',
    body: 'Apply online, or ask a relationship manager to call you back about accounts, cards and lending.',
    primaryCta: { label: 'Open an account', screen: 'open-account' },
  },
};

export const INSURANCE_PAGE: SbuPageConfig = {
  brand: 'insurance',
  imageKeyPrefix: 'insurance-product',
  hero: {
    eyebrow: 'CBZ Insurance',
    headline: 'Cover for what you have worked for',
    valueProposition:
      'Motor, home, travel and personal cover, business and commercial policies, and agricultural protection for crops, livestock and machinery.',
    imageKey: 'banner.insurance',
    image: '/images/insurance-family.webp',
    primaryCta: { label: 'Get a quote', screen: 'journey' },
    secondaryCta: { label: 'Request a callback', screen: 'open-account' },
  },
  about:
    'CBZ Insurance is the Group’s short-term insurer, covering individuals, businesses and farms. Cover can be arranged alongside a CBZ Bank facility, so an asset is protected from the day it is financed.',
  keyFacts: [
    { value: 'Personal', label: 'Motor, home, travel and accident' },
    { value: 'Business', label: 'Property, liability, marine and engineering' },
    { value: 'Agriculture', label: 'Crop, livestock and machinery' },
    { value: 'Regulated', label: tbc('IPEC registration details') },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'Cover for individuals, for businesses, and for farms.',
    categories: [
      { id: 'personal', label: 'Personal' },
      { id: 'business', label: 'Business' },
      { id: 'agro', label: 'Agriculture' },
    ] as const,
    items: SBU_PRODUCTS,
    termsNote: PENDING_VERIFICATION,
  },
  campaigns: campaignsPending('CBZ Insurance'),
  leadership: leadershipPending('CBZ Insurance'),
  contact: {
    heading: 'Get a quote from CBZ Insurance',
    body: 'Tell us what you need covered and we will come back with a quotation.',
    primaryCta: { label: 'Get a quote', screen: 'journey' },
  },
};

export const DATVEST_PAGE: SbuPageConfig = {
  brand: 'datvest',
  imageKeyPrefix: 'datvest-product',
  hero: {
    eyebrow: 'Datvest Asset Management',
    headline: 'Put your money to work',
    valueProposition:
      'Unit trusts, institutional mandates and private wealth management, for savers, companies and pension funds.',
    imageKey: 'banner.investments',
    image: '/images/cbz-wealth.webp',
    primaryCta: { label: 'Start investing', screen: 'journey-invest' },
    secondaryCta: { label: 'Speak to an adviser', screen: 'open-account' },
  },
  about:
    'Datvest is the Group’s asset manager. It runs unit trusts for individual savers, segregated mandates for institutions and pension funds, and private wealth and family office advisory for high net worth clients.',
  keyFacts: [
    { value: 'Unit trusts', label: 'For individual savers' },
    { value: 'Institutional', label: 'Segregated and fiduciary mandates' },
    { value: 'Private wealth', label: 'Advisory and family office' },
    { value: 'Licensed', label: tbc('SECZIM licence details') },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'Funds and mandates for individuals, institutions and private wealth.',
    categories: [
      { id: 'unitTrusts', label: 'Unit trusts' },
      { id: 'institutional', label: 'Institutional' },
      { id: 'privateWealth', label: 'Private wealth' },
    ] as const,
    items: INVESTMENT_PRODUCTS,
    termsNote: `${PENDING_VERIFICATION} The value of investments can fall as well as rise, and past performance is not a guide to future returns.`,
  },
  campaigns: campaignsPending('Datvest'),
  leadership: leadershipPending('Datvest'),
  contact: {
    heading: 'Talk to Datvest',
    body: 'Tell us your goal and timeframe, and an adviser will set out the options.',
    primaryCta: { label: 'Start investing', screen: 'journey-invest' },
  },
};

export const PROPERTIES_PAGE: SbuPageConfig = {
  brand: 'properties',
  imageKeyPrefix: 'property-product',
  hero: {
    eyebrow: 'CBZ Properties',
    headline: 'Find the space, and the finance behind it',
    valueProposition:
      'Residential stands and homes, commercial and retail space, and property advisory, with CBZ Bank mortgages alongside.',
    imageKey: 'banner.properties',
    image: '/images/loan-home.webp',
    primaryCta: { label: 'Request a viewing', screen: 'home-journey' },
    secondaryCta: { label: 'Explore mortgages', screen: 'journey-bank' },
  },
  about:
    'CBZ Properties develops, sells and manages property across Zimbabwe: serviced residential stands and homes, commercial and retail space, and advisory including valuations and project management. A purchase can be financed by a CBZ Bank mortgage and insured by CBZ Insurance.',
  keyFacts: [
    { value: 'Residential', label: 'Stands, homes and clusters' },
    { value: 'Commercial', label: 'Office, retail and industrial' },
    { value: 'Advisory', label: 'Valuations and project management' },
    { value: '2 to 10 years', label: 'CBZ Bank mortgage tenure' },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'Residential and commercial property, and the advisory around it.',
    categories: [
      { id: 'residential', label: 'Residential' },
      { id: 'commercial', label: 'Commercial' },
      { id: 'advisory', label: 'Advisory' },
    ] as const,
    items: PROPERTY_PRODUCTS,
    termsNote: `${PENDING_VERIFICATION} Prices, availability and specifications are confirmed on application.`,
  },
  campaigns: campaignsPending('CBZ Properties'),
  leadership: leadershipPending('CBZ Properties'),
  contact: {
    heading: 'Talk to CBZ Properties',
    body: 'Register your interest in a development, request a viewing, or ask about valuations and project management.',
    primaryCta: { label: 'Request a viewing', screen: 'home-journey' },
  },
};

export const AGRO_PAGE: SbuPageConfig = {
  brand: 'agro-yield',
  imageKeyPrefix: 'agro-product',
  hero: {
    eyebrow: 'CBZ Agro-Yield',
    headline: 'Backing the season, from inputs to offtake',
    valueProposition:
      'Joint venture schemes, seasonal contract farming, commodity trading and a supply chain division covering mechanisation, equipment and water.',
    imageKey: 'banner.agro',
    image: '/images/cbz-agriculture.webp',
    primaryCta: { label: 'Apply for farming finance', screen: 'journey-agro' },
    secondaryCta: { label: 'Speak to the team', screen: 'open-account' },
  },
  about:
    'CBZ Agro-Yield is the CBZ Group’s agribusiness. It works with farming enterprises through joint ventures, funds seasonal contract farming, opens market and offtake routes for commodities, and supplies the mechanisation, equipment and water infrastructure that production depends on.',
  keyFacts: [
    { value: 'Four', label: 'Operating divisions' },
    { value: 'Seasonal', label: 'Contract farming cycles' },
    { value: 'Offtake', label: 'Market routes for commodities' },
    { value: 'Part of CBZ', label: GROUP_FACTS.zseListed.value },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'The four Agro-Yield divisions and what each one covers.',
    categories: AGRO_CATEGORIES,
    items: AGRO_PRODUCTS,
    termsNote:
      'Scheme terms, pricing and qualifying criteria depend on the crop, the season and the agreement in place. Speak to CBZ Agro-Yield for the current terms.',
  },
  campaigns: campaignsPending('Agro-Yield'),
  leadership: leadershipPending('Agro-Yield'),
  contact: {
    heading: 'Talk to CBZ Agro-Yield',
    body: 'Apply for seasonal finance, discuss a joint venture, or enquire about mechanisation, equipment and borehole drilling.',
    primaryCta: { label: 'Apply for farming finance', screen: 'journey-agro' },
  },
};

export const LIFE_PAGE: SbuPageConfig = {
  brand: 'life',
  imageKeyPrefix: 'life-product',
  hero: {
    eyebrow: 'CBZ Life',
    headline: 'Cover for your family, and for the people you employ',
    valueProposition:
      'Funeral and education plans for individuals, and group life, retirement savings, annuities and credit life for employers.',
    imageKey: 'banner.life',
    image: '/images/insurance-family.webp',
    primaryCta: { label: 'Request a quotation', screen: 'journey' },
    secondaryCta: { label: 'Speak to a consultant', screen: 'open-account' },
  },
  about:
    'CBZ Life provides long-term assurance for individuals and for employers. Individual plans cover funeral costs and build savings towards a child’s education, with life cover attached. Employee benefits cover group life, retirement savings, annuities in retirement, and credit life that settles an outstanding loan balance.',
  keyFacts: [
    { value: 'Six', label: 'Individual and employee benefit products' },
    { value: 'Immediate', label: 'Comfortsure funeral benefit payment' },
    { value: 'Primary & secondary', label: 'Education covered by Sarapavana' },
    { value: 'Regulated', label: tbc('IPEC registration details') },
  ],
  products: {
    heading: 'Products and solutions',
    intro: 'Individual life plans, and the employee benefit products offered to employers.',
    categories: LIFE_CATEGORIES,
    items: LIFE_PRODUCTS,
    termsNote:
      'Benefits, premiums and terms depend on the cover selected and on underwriting. Speak to a CBZ Life consultant for a quotation and the full policy terms.',
  },
  campaigns: campaignsPending('CBZ Life'),
  leadership: leadershipPending('CBZ Life'),
  contact: {
    heading: 'Talk to CBZ Life',
    body: 'Request a quotation for an individual plan, or speak to us about cover for your employees.',
    primaryCta: { label: 'Request a quotation', screen: 'journey' },
  },
};

export const CAPITAL_PAGE: SbuPageConfig = {
  brand: 'capital',
  imageKeyPrefix: 'capital-product',
  hero: {
    eyebrow: 'CBZ Capital',
    headline: 'Structuring transactions that shape industries',
    valueProposition:
      'Debt capital markets, loan syndications, M&A advisory, IPOs, and public-private infrastructure financing backed by Zimbabwe’s premier financial institution.',
    imageKey: 'banner.capital',
    image: '/images/accounts/partnership.webp',
    primaryCta: { label: 'Start capital inquiry', screen: 'journey-capital' },
    secondaryCta: { label: 'Explore advisory services', screen: 'the-group' },
  },
  about:
    'CBZ Capital is the dedicated investment banking and corporate advisory arm of CBZ Holdings Limited. We structure and lead-arrange high-impact debt capital syndications, corporate bond issuances, strategic mergers and acquisitions, and public-private partnership (PPP) infrastructure transactions that power economic development across Zimbabwe.',
  keyFacts: [
    { value: 'US$1B+', label: 'Debt and syndications structured' },
    { value: 'ZSE & VFEX', label: 'Listing advisory and sponsorship' },
    { value: 'M&A Leaders', label: 'Corporate buy-side & sell-side' },
    { value: 'PPP & Infra', label: 'Concessions and energy financing' },
    { value: 'Fortress', label: 'CBZ Group balance sheet backing' },
    { value: 'Part of CBZ', label: GROUP_FACTS.zseListed.value },
  ],
  products: {
    heading: 'Investment banking and advisory solutions',
    intro:
      'Structured debt facilities, strategic corporate advisory, equity capital markets, and national infrastructure advisory.',
    categories: CAPITAL_CATEGORIES,
    items: CAPITAL_PRODUCTS,
    termsNote:
      'Transaction advisory, capital raising, and syndication terms are tailored to each corporate mandate and subject to regulatory approvals. Speak to the CBZ Capital investment banking team to structure your mandate.',
  },
  campaigns: campaignsPending('CBZ Capital'),
  leadership: leadershipPending('CBZ Capital'),
  contact: {
    heading: 'Engage CBZ Capital',
    body: 'Speak with our senior investment bankers regarding capital raising, loan syndications, M&A advisory, or infrastructure financing.',
    primaryCta: { label: 'Start capital inquiry', screen: 'journey-capital' },
  },
};

export const RISK_ADVISORY_PAGE: SbuPageConfig = {
  brand: 'risk-advisory',
  imageKeyPrefix: 'risk-product',
  hero: {
    eyebrow: 'CBZ Risk Advisory Services',
    headline: 'Independent broking and precision risk management',
    valueProposition:
      'Short-term insurance broking, enterprise risk audits, corporate employee benefit consulting, and regional reinsurance advocacy across Southern Africa.',
    imageKey: 'banner.risk-advisory',
    image: '/images/insurance-health.webp',
    primaryCta: { label: 'Request risk consultation', screen: 'journey-risk' },
    secondaryCta: { label: 'Explore broking services', screen: 'the-group' },
  },
  about:
    'CBZ Risk Advisory Services is an accredited short-term insurance broker and risk consultancy registered under the Insurance and Pensions Commission (IPEC). We represent corporate clients independently across all licensed underwriters, perform rigorous on-site loss prevention surveys, structure employee benefit schemes, and advocate tirelessly for equitable claim settlements.',
  keyFacts: [
    { value: 'IPEC Registered', label: 'Independent insurance broker' },
    { value: 'Southern Africa', label: 'Regional reinsurance placement' },
    { value: 'ISO 31000', label: 'Enterprise risk audit standards' },
    { value: 'Advocacy', label: 'Dedicated claims dispute support' },
    { value: 'Employee Benefits', label: 'Pensions and medical aid design' },
    { value: 'Part of CBZ', label: GROUP_FACTS.zseListed.value },
  ],
  products: {
    heading: 'Broking and risk management solutions',
    intro:
      'Independent short-term broking, enterprise risk audits, employee healthcare and retirement benefits, and reinsurance placement.',
    categories: RISK_ADVISORY_CATEGORIES,
    items: RISK_ADVISORY_PRODUCTS,
    termsNote:
      'Insurance broking and advisory services are governed by IPEC regulations. Terms, premium rates, and coverage extensions are negotiated across licensed underwriters based on risk profiling.',
  },
  campaigns: campaignsPending('CBZ Risk Advisory'),
  leadership: leadershipPending('CBZ Risk Advisory'),
  contact: {
    heading: 'Consult CBZ Risk Advisory Services',
    body: 'Schedule an enterprise risk audit, review your corporate insurance portfolio, or discuss pension and healthcare benefit structuring.',
    primaryCta: { label: 'Request risk consultation', screen: 'journey-risk' },
  },
};
