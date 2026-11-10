/**
 * Which audience each product serves: Personal, Business & SME, Corporate &
 * Investment, Diaspora. The header's audience strip filters product cards by
 * these tags, so a visitor who chooses Business & SME sees the business
 * packages on the Bank, Red Sphere, Insurance and Life pages, and so on.
 *
 * Tags come from each product's own "who it's for" line and name in the
 * ported data (src/content/_import). A product may serve more than one
 * audience. Products not listed fall back to their category's default.
 * Applied at build time by scripts/port-content.ts.
 */
import type { AudienceId } from './nav';

type A = AudienceId;
const P: A[] = ['personal'];
const B: A[] = ['business'];
const C: A[] = ['corporate'];
const PB: A[] = ['personal', 'business'];
const PD: A[] = ['personal', 'diaspora'];
const BC: A[] = ['business', 'corporate'];
const PBC: A[] = ['personal', 'business', 'corporate'];

/** Per product, by unit then product id. */
export const PRODUCT_AUDIENCES: Record<string, Record<string, A[]>> = {
  bank: {
    // Accounts
    smartcash_lite: P,
    smartcash_general: P,
    smartcash_extra: P,
    smartcash_student: P,
    current: PB, // individuals and companies
    current_joint: P,
    private_banking: P,
    fca_individual: PD,
    current_corporate: BC,
    fca_corporate: BC,
    church_current: B,
    school_current: B,
    // Savings and investments
    savings_individual: P,
    cashplus_individual: P,
    cashplus_housing: P,
    cashplus_junior: P,
    cashplus_teen: P,
    cashplus_student: P,
    simple_saver: P,
    senior: P,
    cashplus_business: B,
    savings_corporate: BC,
    fixed_deposit: PBC,
    // Loans
    civil_servant_loan: P,
    direct_debit_loan: P,
    nostro_loan: P,
    payday_loan: P,
    student_loan_facility: P,
    private_school_fees_loan: P,
    // Cards
    atm_card: P,
    student_visa: P,
    visa_gold: PB,
    sme_debit_card: B,
    // Digital and merchant
    cbz_touch: ['personal', 'business', 'diaspora'],
    internet_banking: ['personal', 'business', 'corporate', 'diaspora'],
    e_statements: BC,
    local_pos: B,
    visa_pos: B,
    kleva_pos: B,
  },
  'red-sphere': {
    // Salary-based lending
    ssb_loan: P,
    private_payroll: P,
    pensioners: P,
    lockable_device: P,
    // Business lending
    sme_working_capital: B,
    tuckshop: B,
    individual_business: B,
    order_finance: BC,
    // Agents and partners
    partner_personal_loan: P,
    partner_car_loan: P,
    agency_contract: B,
    partnership: B,
    // Agriculture
    profeeds: PB,
  },
  capital: {
    loan_syndications: C,
    corporate_bonds: C,
    structured_finance: C,
    ipos_listings: C,
    rights_issues_placements: C,
    mna_advisory: C,
    independent_valuations: C,
    balance_sheet_restructuring: BC,
    ppp_concessions: C,
    bankability_modeling: C,
  },
  'cbz-life': {
    comfortsure: P,
    sarapavana: P,
    annuities: P,
    retirement_savings: PB,
    group_life: BC,
    credit_life: BC,
  },
  datvest: {
    // Unit trusts
    'datvest-balanced-and-growth-fund': P,
    'datvest-equity-fund': P,
    'datvest-high-yield-fixed-income-fund': PB,
    'datvest-money-market-fund': PBC,
    'datvest-usd-inflation-shield-fund': PD,
    'datvest-diaspora-wealth-fund': ['diaspora', 'personal'],
    // Private wealth
    'executive-foreign-currency-treasury': P,
    'high-net-worth-wealth-architecture': P,
    'intergenerational-trust-and-estate-planning': P,
    'philanthropic-and-endowment-structuring': ['personal', 'corporate'],
    'structured-offshore-usd-investment-notes': PD,
    'victoria-falls-exchange-vfex-usd-equities': PD,
    // Institutional
    'corporate-treasury-liquidity-placement': BC,
    'custodial-and-fiduciary-accounting': C,
    'defined-benefit-and-contribution-pensions': C,
    'municipal-and-parastatal-portfolio-admin': C,
    'segregated-equity-and-bond-mandates': C,
    'sovereign-and-commercial-debt-syndication': C,
  },
  insurance: {
    // Personal
    motor: P,
    home: PD,
    health: P,
    milady: P,
    travel: P,
    diaspora: ['diaspora', 'personal'],
    // Business
    sme_shield: B,
    assets: B,
    commercial_plant: BC,
    engineering: BC,
    marine: BC,
    liability: BC,
    // Agriculture
    multi_peril: B,
    livestock: B,
    irrigation_machinery: B,
    farm_liability: B,
    satellite_weather: B,
    contract_farming: BC,
  },
  properties: {
    // Residential
    'bloomingdale-master-luxury-clusters': P,
    'pomona-north-private-residential-estate': P,
    'middle-income-suburban-housing-developments': P,
    'eco-friendly-sustainable-green-enclaves': P,
    'fully-serviced-residential-stands': PD,
    'diaspora-turnkey-home-build-scheme': ['diaspora', 'personal'],
    // Commercial
    'cbz-centre-and-suburban-office-parks': BC,
    'commercial-land-subdivisions-and-light-industrial': BC,
    'pomona-industrial-logistics-and-warehouse-park': BC,
    'neighborhood-retail-convenience-hubs': B,
    'flexible-business-incubators-and-shared-workspaces': B,
    'modern-medical-chambers-and-specialist-clinics': B,
    // Advisory
    'certified-sworn-property-valuations': PBC,
    'land-regularization-and-title-deed-processing': P,
    'professional-facilities-and-tenant-management': BC,
    'turnkey-project-and-construction-management': BC,
    'real-estate-development-feasibility-studies': C,
    'real-estate-investment-trust-reit-structuring': C,
  },
  'risk-advisory': {
    corporate_property_broking: BC,
    fleet_marine_broking: BC,
    liability_directors_officers: C,
    enterprise_risk_audits: C,
    business_continuity_planning: BC,
    loss_prevention_engineering: BC,
    group_medical_benefits: BC,
    pension_trustee_advisory: C,
    claims_advocacy: BC,
    regional_reinsurance: C,
  },
  'agro-yield': {
    agro_farming: B,
    agro_enterprise: B,
    agro_commodity_trading: BC,
    agro_supply_chain: BC,
  },
};

/** Fallback by unit category for products added later without a tag. */
const CATEGORY_DEFAULTS: Record<string, Record<string, A[]>> = {
  bank: { accounts: P, savings: P, loans: P, cards: P, channels: PB },
  'red-sphere': { salary: P, business: B, partners: B, agriculture: PB },
  capital: { debt: C, equity: C, advisory: C, infrastructure: C },
  'cbz-life': { individual: P, employee: BC },
  datvest: { 'unit-trusts': P, 'private-wealth': P, institutional: C },
  insurance: { personal: P, business: B, agro: B },
  properties: { residential: P, commercial: BC, advisory: BC },
  'risk-advisory': { broking: BC, erm: C, benefits: BC, reinsurance: C },
  'agro-yield': { divisions: B },
};

export function audiencesFor(unit: string, productId: string, category: string): A[] {
  return PRODUCT_AUDIENCES[unit]?.[productId] ?? CATEGORY_DEFAULTS[unit]?.[category] ?? [];
}
