/**
 * Every replaceable image on the public website. Bootstrap creates a Site Image
 * entry for each key that doesn't exist yet, so editors only need to upload.
 *
 * Keys must match the ones the frontend asks for (see frontend/src/context/SiteImagesContext.tsx
 * and the components that call siteImage()). Adding a slot here without using it
 * in the frontend does nothing.
 */
const subsidiaries = [
  ['bank', 'CBZ Bank'],
  ['insurance', 'CBZ Insurance'],
  ['life', 'CBZ Life'],
  ['datvest', 'Datvest'],
  ['capital', 'CBZ Capital'],
  ['properties', 'CBZ Properties'],
  ['agri', 'CBZ Agro-Yield'],
  ['risk', 'CBZ Risk Advisory'],
  ['micro', 'Red Sphere Finance'],
];

const groupSubsidiaries = [
  ['bank', 'CBZ Bank'],
  ['insurance', 'CBZ Insurance'],
  ['life', 'CBZ Life'],
  ['datvest', 'Datvest'],
  ['properties', 'CBZ Properties'],
  ['agro-yield', 'CBZ Agro-Yield'],
  ['red-sphere', 'Red Sphere Finance'],
  ['risk-advisory', 'CBZ Risk Advisory'],
  ['capital', 'CBZ Capital'],
];

const audiences = [
  ['personal', 'Personal'],
  ['business-smes', 'Business & SMEs'],
  ['corporate-institutional', 'Corporate & Institutional'],
  ['diaspora-banking', 'Diaspora Banking'],
];

const bankProducts = [
  ['smartcash', 'SmartCash Current Account'],
  ['personal', 'Personal Current Account'],
  ['fca', 'Foreign Currency Account'],
  ['senior', 'Senior Citizens Account'],
  ['youth', 'Youth Account'],
  ['fixed_deposit', 'Fixed Deposit'],
  ['personal_loan', 'Personal Loan'],
  ['mortgages', 'Mortgages'],
  ['vaf', 'Vehicle & Asset Finance'],
  ['red_sphere', 'Red Sphere SME Micro-Credit'],
  ['overdrafts', 'Overdrafts'],
  ['invoice', 'Invoice Discounting'],
];

const accounts = [
  ['smartcash', 'SmartCash Current Account'],
  ['nostro', 'Individual Nostro FCA'],
  ['personal', 'Personal Current Account'],
  ['youth', 'Youth Account'],
  ['senior', 'Senior Citizens Account'],
  ['fixed', 'Fixed Deposit'],
  ['business', 'SME & Enterprise Business Account'],
  ['church', 'ChurchSaver & Community Account'],
];

module.exports = [
  { key: 'home.hero', label: 'Home - hero picture', location: 'Home page, top banner' },
  { key: 'banner.banking', label: 'CBZ Bank - page picture', location: 'CBZ Bank page' },
  { key: 'banner.insurance', label: 'CBZ Insurance - page picture', location: 'CBZ Insurance page' },
  { key: 'banner.agro', label: 'CBZ Agro-Yield - page picture', location: 'CBZ Agro-Yield page' },
  { key: 'banner.investments', label: 'Datvest - page picture', location: 'Datvest / investments page' },
  { key: 'banner.properties', label: 'CBZ Properties - page picture', location: 'CBZ Properties page' },
  { key: 'handover.property', label: 'Property listing picture', location: 'Home-ownership journey, property card' },
  ...subsidiaries.map(([id, name]) => ({
    key: `ecosystem.${id}`,
    label: `Ecosystem - ${name}`,
    location: 'Home page, "Our ecosystem" panel',
  })),
  ...audiences.map(([id, name]) => ({
    key: `audience.${id}`,
    label: `Solutions - ${name}`,
    location: 'Home page, "Solutions for" cards',
  })),
  ...groupSubsidiaries.map(([id, name]) => ({
    key: `group.${id}`,
    label: `The Group - ${name}`,
    location: 'The Group page, subsidiary cards',
  })),
  ...bankProducts.map(([id, name]) => ({
    key: `bank-product.${id}`,
    label: `Bank product - ${name}`,
    location: 'CBZ Bank page, product cards',
  })),
  ...accounts.map(([id, name]) => ({
    key: `account.${id}`,
    label: `Open account - ${name}`,
    location: 'Open an account page, account choice cards',
  })),
];
