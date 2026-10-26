/**
 * Every replaceable image on the public website. Bootstrap creates a Site Image
 * entry for each key that doesn't exist yet, so editors only need to upload.
 *
 * Keys must match the ones the frontend asks for (see frontend/src/context/SiteImagesContext.tsx
 * and the components that call siteImage()). Adding a slot here without using it
 * in the frontend does nothing.
 *
 * `size` is the recommended upload, about twice the rendered box so the image
 * stays sharp on high-density screens. `framing` says where to keep the subject
 * where a slot crops or fades part of the picture.
 */

/** Unit pages: [imageKey prefix used in sbuConfigs, campaign brand id, display name]. */
const units = [
  ['banner.banking', 'bank', 'CBZ Bank'],
  ['banner.insurance', 'insurance', 'CBZ Insurance'],
  ['banner.life', 'life', 'CBZ Life'],
  ['banner.investments', 'datvest', 'Datvest'],
  ['banner.properties', 'properties', 'CBZ Properties'],
  ['banner.agro', 'agro-yield', 'CBZ Agro-Yield'],
  ['banner.red-sphere', 'red-sphere', 'Red Sphere Finance'],
  ['banner.capital', 'capital', 'CBZ Capital'],
  ['banner.risk-advisory', 'risk-advisory', 'CBZ Risk Advisory Services'],
];

/** The Group page cards: [subsidiary id in TheGroupView, display name]. */
const groupSubsidiaries = [
  ['bank', 'CBZ Bank'],
  ['insurance', 'CBZ Insurance'],
  ['life', 'CBZ Life'],
  ['datvest', 'Datvest'],
  ['properties', 'CBZ Properties'],
  ['agro-yield', 'CBZ Agro-Yield'],
  ['red-sphere', 'Red Sphere Finance'],
  ['risk-advisory', 'CBZ Risk Advisory Services'],
  ['capital', 'CBZ Capital'],
];

/** Recommendation carousel: [journey service id, display name]. */
const services = [
  ['bank', 'Banking & Loans (CBZ Bank)'],
  ['properties', 'Property (CBZ Properties)'],
  ['insurance', 'General Insurance (CBZ Insurance)'],
  ['life', 'Life Assurance (CBZ Life)'],
  ['datvest', 'Investments (Datvest)'],
  ['agroyield', 'Farming Finance (CBZ Agro-Yield)'],
  ['redsphere', 'Microfinance (Red Sphere Finance)'],
  ['riskadvisory', 'Risk Advisory (CBZ Risk Advisory Services)'],
  ['capital', 'Investment Banking (CBZ Capital)'],
];

/** Homepage "what you need" cards: [slug of the stage title, display name]. */
const needs = [
  ['everyday-banking', 'Everyday Banking'],
  ['protection-care', 'Protection & Care'],
  ['wealth-growth', 'Wealth & Growth'],
  ['property-agribusiness', 'Property & Agribusiness'],
];

/** Notice thumbnails, by announcement id. Add a line when a notice is added. */
const notices = [
  ['fy2025-results', 'Audited results FY2025 & final dividend'],
  ['saturday-banking', 'Extended Saturday banking hours'],
  ['agm-notice-2026', '37th AGM notice'],
  ['digital-card-upgrade', '3D Secure card upgrade'],
  ['monetary-policy-circular', 'Monetary policy circular'],
  ['cautionary-statement', 'Cautionary statement'],
];

const bankProducts = [
  ['current', 'Current Account'],
  ['current_joint', 'Current Account (Joint)'],
  ['current_corporate', 'Current Account (Corporate)'],
  ['fca_individual', 'Foreign Currency Account (Individual)'],
  ['fca_corporate', 'Foreign Currency Account (Corporate)'],
  ['smartcash_lite', 'SmartCash Lite'],
  ['smartcash_general', 'SmartCash General'],
  ['smartcash_student', 'SmartCash Student'],
  ['smartcash_extra', 'SmartCash Extra'],
  ['private_banking', 'Private Banking'],
  ['school_current', 'School Current Account'],
  ['church_current', 'Church Current Account'],
  ['savings_individual', 'Savings Account (Individual)'],
  ['savings_corporate', 'Savings Account (Corporate)'],
  ['senior', 'Senior Citizens Savings Account'],
  ['simple_saver', 'Simple Saver'],
  ['fixed_deposit', 'Fixed Deposit'],
  ['cashplus_junior', 'CashPlus Junior'],
  ['cashplus_teen', 'CashPlus Teen'],
  ['cashplus_student', 'CashPlus Student'],
  ['cashplus_business', 'CashPlus Business'],
  ['cashplus_individual', 'CashPlus Individual'],
  ['cashplus_housing', 'CashPlus Housing'],
  ['civil_servant_loan', 'Civil Servant Loan'],
  ['direct_debit_loan', 'Loan - Individual Direct Debit'],
  ['nostro_loan', 'Nostro Individual Loan'],
  ['private_school_fees_loan', 'Private School Fees Loan'],
  ['student_loan_facility', 'Student Loan Facility'],
  ['payday_loan', 'Payday Loan'],
];

const agroProducts = [
  ['agro_enterprise', 'Agro Enterprise'],
  ['agro_farming', 'Agro Farming'],
  ['agro_commodity_trading', 'Agro Commodity Trading'],
  ['agro_supply_chain', 'Agro Supply Chain'],
];

const accountChoices = [
  ['smartcash', 'SmartCash General'],
  ['personal', 'Current Account'],
  ['nostro', 'Foreign Currency Account'],
  ['youth', 'SmartCash Student'],
  ['senior', 'Senior Citizens Savings Account'],
  ['fixed', 'Fixed Deposit'],
  ['business', 'Current Account (Corporate)'],
  ['church', 'Church Current Account'],
];

module.exports = [
  // Homepage
  {
    key: 'home.hero',
    label: 'Home - hero artwork',
    location: 'Home page, top banner (right side, shown whole, not cropped)',
    size: '1600 x 800',
  },
  ...needs.map(([id, name]) => ({
    key: `need.${id}`,
    label: `Home - what you need - ${name}`,
    location: 'Home page, "Or start with what you need" cards (lower half of the card)',
    size: '900 x 540',
  })),
  {
    key: 'notices.header',
    label: 'Home - notices header strip',
    location: 'Home page, "Latest from CBZ" header, top right, heavily faded',
    size: '1600 x 480',
  },
  ...notices.map(([id, name]) => ({
    key: `notice.${id}`,
    label: `Home - notice thumbnail - ${name}`,
    location: 'Home page, "Latest from CBZ" rows',
    size: '300 x 300',
  })),
  {
    key: 'support.hero',
    label: 'Home - support panel backdrop',
    location: 'Home page, "Need a hand?" panel, faded under navy',
    size: '900 x 1200',
  },

  // The Group page
  ...groupSubsidiaries.map(([id, name]) => ({
    key: `group.${id}`,
    label: `The Group - ${name}`,
    location: 'The Group page, subsidiary cards (4:3)',
    size: '1200 x 900',
  })),

  // Unit pages: opening photo, FAQ photo, campaign photo
  ...units.flatMap(([bannerKey, brand, name]) => [
    {
      key: bannerKey,
      label: `${name} - opening photo`,
      location: `${name} page, opening section, right panel`,
      size: '1000 x 1200',
      framing: 'Keep the subject in the upper half; the lower half fades to navy under the key facts.',
    },
    {
      key: `${bannerKey}.faq`,
      label: `${name} - FAQ photo`,
      location: `${name} page, frequently asked questions, bottom left`,
      size: '1000 x 720',
      framing: 'Keep the subject bottom-left; the top and right edges fade into the page.',
    },
    {
      key: `campaign.${brand}`,
      label: `${name} - campaign photo`,
      location: `${name} page, promotional banner, hexagon on the right`,
      size: '900 x 1080',
      framing: 'Keep the subject centred; the hexagon clips all four corners.',
    },
  ]),

  // Recommendation carousel, shared by every unit page
  ...services.map(([id, name]) => ({
    key: `recommend.${id}`,
    label: `Recommendations - ${name}`,
    location: 'Every unit page, "Find the right fit" carousel card (portrait)',
    size: '600 x 800',
  })),

  // Product cards
  ...bankProducts.map(([id, name]) => ({
    key: `bank-product.${id}`,
    label: `Bank product - ${name}`,
    location: 'CBZ Bank page, product cards (top strip)',
    size: '800 x 300',
  })),
  ...agroProducts.map(([id, name]) => ({
    key: `agro-product.${id}`,
    label: `Agro-Yield - ${name}`,
    location: 'CBZ Agro-Yield page, division cards (top strip)',
    size: '800 x 300',
  })),

  // Journeys and other pages
  ...accountChoices.map(([id, name]) => ({
    key: `account.${id}`,
    label: `Open account - ${name}`,
    location: 'Open an account page, account choice cards',
    size: '800 x 300',
  })),
  {
    key: 'handover.property',
    label: 'Property listing picture',
    location: 'Home-ownership journey, property card (4:3)',
    size: '1200 x 900',
  },
  {
    key: 'diaspora.hero',
    label: 'Diaspora - page picture',
    location: 'Diaspora banking page, top right',
    size: '1200 x 800',
  },
];
