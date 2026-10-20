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
  { key: 'bank-product.current', label: 'Bank product - Current Account', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.current_joint', label: 'Bank product - Current Account (Joint)', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.current_corporate', label: 'Bank product - Current Account (Corporate)', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.fca_individual', label: 'Bank product - Foreign Currency Account (Individual)', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.fca_corporate', label: 'Bank product - Foreign Currency Account (Corporate)', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.smartcash_lite', label: 'Bank product - SmartCash Lite', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.smartcash_general', label: 'Bank product - SmartCash General', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.smartcash_student', label: 'Bank product - SmartCash Student', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.smartcash_extra', label: 'Bank product - SmartCash Extra', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.private_banking', label: 'Bank product - Private Banking', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.school_current', label: 'Bank product - School Current Account', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.church_current', label: 'Bank product - Church Current Account', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.savings_individual', label: 'Bank product - Savings Account (Individual)', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.savings_corporate', label: 'Bank product - Savings Account (Corporate)', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.senior', label: 'Bank product - Senior Citizens Savings Account', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.simple_saver', label: 'Bank product - Simple Saver', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.fixed_deposit', label: 'Bank product - Fixed Deposit', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.cashplus_junior', label: 'Bank product - CashPlus Junior', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.cashplus_teen', label: 'Bank product - CashPlus Teen', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.cashplus_student', label: 'Bank product - CashPlus Student', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.cashplus_business', label: 'Bank product - CashPlus Business', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.cashplus_individual', label: 'Bank product - CashPlus Individual', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.cashplus_housing', label: 'Bank product - CashPlus Housing', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.civil_servant_loan', label: 'Bank product - Civil Servant Loan', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.direct_debit_loan', label: 'Bank product - Loan — Individual Direct Debit', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.nostro_loan', label: 'Bank product - Nostro Individual Loan', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.private_school_fees_loan', label: 'Bank product - Private School Fees Loan', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.student_loan_facility', label: 'Bank product - Student Loan Facility', location: 'CBZ Bank page, product cards' },
  { key: 'bank-product.payday_loan', label: 'Bank product - Payday Loan', location: 'CBZ Bank page, product cards' },
  { key: 'account.smartcash', label: 'Open account - SmartCash General', location: 'Open an account page, account choice cards' },
  { key: 'account.personal', label: 'Open account - Current Account', location: 'Open an account page, account choice cards' },
  { key: 'account.nostro', label: 'Open account - Foreign Currency Account', location: 'Open an account page, account choice cards' },
  { key: 'account.youth', label: 'Open account - SmartCash Student', location: 'Open an account page, account choice cards' },
  { key: 'account.senior', label: 'Open account - Senior Citizens Savings Account', location: 'Open an account page, account choice cards' },
  { key: 'account.fixed', label: 'Open account - Fixed Deposit', location: 'Open an account page, account choice cards' },
  { key: 'account.business', label: 'Open account - Current Account (Corporate)', location: 'Open an account page, account choice cards' },
  { key: 'account.church', label: 'Open account - Church Current Account', location: 'Open an account page, account choice cards' },
];
