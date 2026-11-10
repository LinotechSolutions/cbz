/**
 * Which audience each product serves: Personal, Business, School, Diaspora.
 * The header's audience strip chooses one, and every product carousel then
 * shows only the cards tagged for it, so a visitor on the Business home who
 * opens CBZ Bank sees the company accounts, merchant devices and corporate
 * channels, while a School visitor sees the school account, fees collection
 * and staff cover.
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
const S: A[] = ['school'];
const PB: A[] = ['personal', 'business'];
const PD: A[] = ['personal', 'diaspora'];
const PS: A[] = ['personal', 'school'];
const BS: A[] = ['business', 'school'];
const PBS: A[] = ['personal', 'business', 'school'];
const PBD: A[] = ['personal', 'business', 'diaspora'];
const ALL: A[] = ['personal', 'business', 'school', 'diaspora'];

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
    current_corporate: B,
    fca_corporate: BS,
    church_current: B,
    school_current: S,
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
    savings_corporate: BS,
    fixed_deposit: PBS,
    // Loans
    civil_servant_loan: P,
    direct_debit_loan: P,
    nostro_loan: P,
    payday_loan: P,
    student_loan_facility: P,
    private_school_fees_loan: PS, // parents; schools point them to it
    // Cards
    atm_card: P,
    student_visa: P,
    visa_gold: PB,
    sme_debit_card: B,
    // Digital and merchant
    cbz_touch: ALL,
    internet_banking: ALL,
    e_statements: BS,
    local_pos: BS,
    visa_pos: BS,
    kleva_pos: BS,
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
    order_finance: B,
    // Agents and partners
    partner_personal_loan: P,
    partner_car_loan: P,
    agency_contract: B,
    partnership: B,
    // Agriculture
    profeeds: PB,
  },
  capital: {
    loan_syndications: B,
    corporate_bonds: B,
    structured_finance: B,
    ipos_listings: B,
    rights_issues_placements: B,
    mna_advisory: B,
    independent_valuations: B,
    balance_sheet_restructuring: B,
    ppp_concessions: B,
    bankability_modeling: B,
  },
  'cbz-life': {
    comfortsure: PD,
    sarapavana: PS, // parents; schools promote it
    annuities: P,
    retirement_savings: PBS,
    group_life: BS,
    credit_life: B,
  },
  datvest: {
    // Unit trusts
    'datvest-balanced-and-growth-fund': P,
    'datvest-equity-fund': P,
    'datvest-high-yield-fixed-income-fund': PBS,
    'datvest-money-market-fund': PBS,
    'datvest-usd-inflation-shield-fund': PD,
    'datvest-diaspora-wealth-fund': ['diaspora', 'personal'],
    // Private wealth
    'executive-foreign-currency-treasury': P,
    'high-net-worth-wealth-architecture': P,
    'intergenerational-trust-and-estate-planning': P,
    'philanthropic-and-endowment-structuring': PB,
    'structured-offshore-usd-investment-notes': PD,
    'victoria-falls-exchange-vfex-usd-equities': PD,
    // Institutional
    'corporate-treasury-liquidity-placement': BS,
    'custodial-and-fiduciary-accounting': B,
    'defined-benefit-and-contribution-pensions': BS,
    'municipal-and-parastatal-portfolio-admin': B,
    'segregated-equity-and-bond-mandates': B,
    'sovereign-and-commercial-debt-syndication': B,
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
    assets: BS,
    commercial_plant: BS,
    engineering: BS,
    marine: B,
    liability: BS,
    // Agriculture
    multi_peril: B,
    livestock: B,
    irrigation_machinery: BS,
    farm_liability: B,
    satellite_weather: B,
    contract_farming: B,
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
    'cbz-centre-and-suburban-office-parks': B,
    'commercial-land-subdivisions-and-light-industrial': B,
    'pomona-industrial-logistics-and-warehouse-park': B,
    'neighborhood-retail-convenience-hubs': B,
    'flexible-business-incubators-and-shared-workspaces': B,
    'modern-medical-chambers-and-specialist-clinics': B,
    // Advisory
    'certified-sworn-property-valuations': PBS,
    'land-regularization-and-title-deed-processing': PS,
    'professional-facilities-and-tenant-management': BS,
    'turnkey-project-and-construction-management': BS,
    'real-estate-development-feasibility-studies': BS,
    'real-estate-investment-trust-reit-structuring': B,
  },
  'risk-advisory': {
    corporate_property_broking: BS,
    fleet_marine_broking: B,
    liability_directors_officers: B,
    enterprise_risk_audits: B,
    business_continuity_planning: B,
    loss_prevention_engineering: BS,
    group_medical_benefits: BS,
    pension_trustee_advisory: BS,
    claims_advocacy: BS,
    regional_reinsurance: B,
  },
  'agro-yield': {
    agro_farming: BS,
    agro_enterprise: B,
    agro_commodity_trading: B,
    agro_supply_chain: BS,
  },
};

/** Fallback by unit category for products added later without a tag. */
const CATEGORY_DEFAULTS: Record<string, Record<string, A[]>> = {
  bank: { accounts: P, savings: P, loans: P, cards: P, channels: PBS },
  'red-sphere': { salary: P, business: B, partners: B, agriculture: PB },
  capital: { debt: B, equity: B, advisory: B, infrastructure: B },
  'cbz-life': { individual: P, employee: BS },
  datvest: { 'unit-trusts': P, 'private-wealth': P, institutional: B },
  insurance: { personal: P, business: BS, agro: B },
  properties: { residential: P, commercial: B, advisory: BS },
  'risk-advisory': { broking: B, erm: B, benefits: BS, reinsurance: B },
  'agro-yield': { divisions: B },
};

/** Property listings by type: homes and stands for people, commercial space for organisations. */
export const LISTING_AUDIENCES: Record<'residential' | 'commercial' | 'land', A[]> = {
  residential: PD,
  commercial: BS,
  land: PBD,
};

export function audiencesFor(unit: string, productId: string, category: string): A[] {
  return PRODUCT_AUDIENCES[unit]?.[productId] ?? CATEGORY_DEFAULTS[unit]?.[category] ?? [];
}
