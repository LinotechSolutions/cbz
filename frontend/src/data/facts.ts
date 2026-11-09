/**
 * Group facts and contact details. Every page reads from here; nothing is
 * hardcoded in a component. Unconfirmed values are `null` and never render.
 */

export const GROUP = {
  name: 'CBZ Holdings',
  legalName: 'CBZ Holdings Limited',
  founded: '1980',
  listing: 'ZSE: CBZ',
  listingLine: 'Listed on the Zimbabwe Stock Exchange',
  companies: 'Ten operating companies',
  clusters: 'Four clusters',
  /** Not confirmed by the business; stays out of the UI until it is. */
  yearsOfService: null as string | null,
  /** Not confirmed by the business; stays out of the UI until it is. */
  branchCount: null as string | null,
  regulatorLine: 'Regulated by the Reserve Bank of Zimbabwe and IPEC',
  tagline: 'Partners for success',
} as const;

export const CONTACT = {
  contactCentre: { display: '+263 8677 004050', href: 'tel:+2638677004050' },
  contactCentreSecond: { display: '+263 24 2799 234-9', href: 'tel:+2632427992349' },
  tollFree: [
    { display: '460', href: 'tel:460' },
    { display: '461', href: 'tel:461' },
  ],
  whatsapp: {
    display: '+263 774 460 460',
    href: 'https://wa.me/263774460460',
    chatHref: 'https://wa.me/263774460460?text=Hi%20CBZ%2C%20I%20would%20like%20some%20help',
  },
  ussd: { display: '*230#', href: 'tel:*230%23' },
  email: 'contactcentre@cbz.co.zw',
  address: { line1: '5 Campbell Road', line2: 'Pomona, Harare', country: 'Zimbabwe' },
  /** Not yet supplied. */
  dpoEmail: null as string | null,
  tipOffs: {
    hotline: null as string | null,
    email: null as string | null,
    web: null as string | null,
  },
  foundationEmail: null as string | null,
} as const;

export const HOURS = {
  branches: [
    { days: 'Monday to Friday', hours: '08:00 to 15:00' },
    { days: 'Saturday', hours: '08:00 to 13:00' },
    { days: 'Sunday and public holidays', hours: 'Closed' },
  ],
  digital: '24 hours a day, 7 days a week',
  /** The business has not confirmed branch hours. Listed in HANDOFF.md. */
  confirmed: false,
} as const;

export const SOCIAL = [
  { name: 'Facebook', handle: '@cbzholdings', href: 'https://www.facebook.com/cbzholdings' },
  { name: 'X', handle: '@cbzholdings', href: 'https://x.com/cbzholdings' },
  { name: 'LinkedIn', handle: 'CBZ Holdings Limited', href: 'https://www.linkedin.com/company/cbz-holdings-limited' },
  { name: 'YouTube', handle: '@cbzholdings', href: 'https://www.youtube.com/@cbzholdings975' },
  { name: 'Instagram', handle: '@cbzholdings', href: 'https://www.instagram.com/cbzholdings' },
] as const;

export const AWARDS = [
  { awarder: 'Global Finance Magazine', title: 'Best Bank in Zimbabwe', years: ['2023', '2024', '2025'] },
  { awarder: 'Euromoney', title: 'Best Bank in Zimbabwe', years: ['2024', '2025'] },
  {
    awarder: 'Afreximbank Pan-African Business & Development Awards',
    title: 'Best Financial Institution of the Year',
    years: ['2025'],
  },
] as const;

export const MILESTONES = [
  { period: '1980', text: 'Established.' },
  { period: '1991', text: 'The Government acquired a significant shareholding in the banking operations.' },
  { period: '1997', text: 'The International Finance Corporation acquired additional equity.' },
  { period: '1998', text: 'Listed on the stock exchange, with about 55% of bank shares issued to the public. A microfinance unit was established.' },
  { period: '2004 to 2007', text: 'A holding company was formed and key subsidiaries established, including asset management and mortgage financing.' },
  { period: '2016 to 2019', text: 'Risk advisory started in 2016; microfinance initiatives drove a collaborative business.' },
  { period: '2023', text: 'CBZ Foundation established.' },
  { period: '2025', text: 'A growth strategy to expand within the Sub-Saharan Africa region.' },
] as const;

/** Board of directors, for The Group page. Null until Corporate Affairs supplies names, roles and photos. */
export const BOARD: { name: string; role: string; image: { src: string; alt: string } | null }[] | null = null;

/** Items the business must confirm before launch, printed in HANDOFF.md. */
export const UNCONFIRMED: { item: string; owner: string; note?: string }[] = [
  { item: 'Branch hours (Mon to Fri 08:00 to 15:00, Sat 08:00 to 13:00)', owner: 'Retail Banking' },
  { item: '"46 years" and "Over 60 branches" claims', owner: 'Marketing', note: 'Hidden until confirmed.' },
  { item: 'Mortgage term limits (2 to 10 years used in the calculator)', owner: 'CBZ Bank' },
  { item: 'Car finance term limits (1 to 5 years used in the calculator)', owner: 'CBZ Bank' },
  { item: 'Unit mailboxes for form routing', owner: 'Marketing managers' },
  { item: 'Final photography for heroes and tiles', owner: 'Marketing' },
  { item: 'Campaign artwork and copy', owner: 'Marketing' },
  { item: 'Leadership profiles per unit', owner: 'Each unit' },
  { item: 'Objectives and customer segmentation per unit', owner: 'Marketing' },
  { item: 'Property listings, prices and photography', owner: 'CBZ Properties' },
  { item: 'FAQ answers on the Bank, Insurance, Properties, Datvest and Capital pages', owner: 'Each business unit', note: 'Drafted from the product data and form copy; each unit to confirm or replace the five questions.' },
  { item: 'Datvest and CBZ Capital track record (deals)', owner: 'Datvest, CBZ Capital' },
  { item: 'Car insurance and life policy rate tables', owner: 'CBZ Insurance, CBZ Life' },
  { item: 'Chatbot provider and endpoint', owner: 'Digital' },
  { item: 'Analytics vendor and tag', owner: 'Digital' },
  { item: 'Notices content (the six ported notices are sample content)', owner: 'Corporate Communications' },
  { item: 'CBZ Bank calls to action (site map says "to be confirmed"; Open an account, Apply for a loan and Call me back are in place)', owner: 'CBZ Bank' },
  { item: 'Board of directors: names, roles and photos', owner: 'Corporate Affairs' },
  { item: 'Sustainability: Grievance Procedure PDF, Grievance Resolution Form PDF, grievance mailbox, and the reports to publish', owner: 'Sustainability', note: 'src/data/sustainability.ts; links are hidden until set.' },
  { item: 'Off-site link: property management sign-in', owner: 'Digital, CBZ Properties' },
  { item: 'Zeex invoice-discounting wording and customer journey on the Red Sphere page', owner: 'Red Sphere Finance and Zeex', note: 'Both parties to approve. Link to zeex.co.zw is live.' },
  { item: 'ATDC button placement on the Agro-Yield page (Supply chain, commodity trading or a Group businesses area)', owner: 'CBZ Agro-Yield', note: 'Placed in Choose your service and in its own Explore ATDC section, linking to africatdc.com. Confirm or move.' },
  { item: 'Integrations behind the forms: SSP Pure, ICECASH and Flex Cube (Insurance), Life Central (Life)', owner: 'Digital', note: 'Recorded on each unit JSON under "systems"; nothing is wired yet.' },
];
