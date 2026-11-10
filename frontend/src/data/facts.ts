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

export interface Person {
  name: string;
  role: string;
  /** Month and year of appointment to the board, when published. */
  since?: string;
  /** One line of background. */
  line?: string;
  image: { src: string; alt: string } | null;
}

/**
 * Group board of directors, from the 2025 annual report (pp. 138 to 146):
 * six independent non-executive directors, two executive directors, and the
 * Group Chief Legal Counsel attending ex officio. Photographs to follow.
 */
export const BOARD: Person[] | null = [
  {
    name: 'Luxon Zembe',
    role: 'Chairperson, Independent Non-executive Director',
    since: 'December 2023',
    line: 'Former Standard Chartered senior executive; served on the RBZ Advisory Board and Monetary Policy Committee.',
    image: null,
  },
  {
    name: 'Edward Mashingaidze',
    role: 'Independent Non-executive Director',
    since: 'November 2019',
    line: 'Engineer and executive with over 30 years in mining, construction and industry; MD (Africa) of EnergyDAS.',
    image: null,
  },
  {
    name: 'Edward Galante',
    role: 'Independent Non-executive Director; chairs Audit and Finance, and Sustainability',
    since: 'November 2019',
    line: 'Co-founder of Mangwana Capital; Senior Advisor to the Presidential Housing and Title Deeds Programme.',
    image: null,
  },
  {
    name: 'Rebecca Gaskin Gain',
    role: 'Independent Non-executive Director; chairs Risk, Legal and Compliance',
    since: 'November 2019',
    line: 'New York-admitted lawyer; former CEO of Standard Bank Congo and Standard Bank Africa Exco member.',
    image: null,
  },
  {
    name: 'Pfungwa Serima',
    role: 'Independent Non-executive Director; chairs Digital',
    since: 'April 2025',
    line: 'Former CEO of Metrofile Holdings, SAP Africa and Microsoft South Africa.',
    image: null,
  },
  {
    name: 'Takudzwa Mudzengerere',
    role: 'Independent Non-executive Director',
    since: 'May 2025',
    line: 'Chartered accountant and CFA charterholder; Athari Capital Partners, formerly EY, EOH and AB InBev.',
    image: null,
  },
  {
    name: 'Lawrence Nyazema',
    role: 'Group Chief Executive Officer, Executive Director',
    since: 'December 2023',
    line: 'Over 33 years in banking, including 19 at Barclays; CBZ Bank Managing Director from 2022.',
    image: null,
  },
  {
    name: 'Joel Makombe',
    role: 'Group Chief Financial Officer, Executive Director',
    since: 'March 2025',
    line: 'FCCA, CA(Z) and ICAEW; with CBZ since 2008, Divisional Director, Group Finance from 2019.',
    image: null,
  },
  {
    name: 'Rumbidzayi Jakanani',
    role: 'Group Chief Legal Counsel and Governance Officer, attends ex officio',
    line: 'With CBZ since 2005; Group Legal Corporate Secretary from 2012 to 2022.',
    image: null,
  },
];

/** The six board committees (annual report pp. 156 to 159). */
export const BOARD_COMMITTEES = [
  'Audit and Finance',
  'Risk, Legal and Compliance',
  'Human Resources and Corporate Governance (also Nominations)',
  'Digital',
  'Sustainability',
  'Strategy',
] as const;

/** Group executive committee (annual report pp. 137 and 161). Photographs to follow. */
export const EXCO: Person[] = [
  { name: 'Lawrence Nyazema', role: 'Group Chief Executive Officer', image: null },
  { name: 'Joel Makombe', role: 'Group Chief Financial Officer', image: null },
  { name: 'Valeta Mthimkhulu', role: 'Managing Director, CBZ Bank', image: null },
  { name: 'Nkosana Ndlovu', role: 'Group Chief Strategy and Transformation Officer', image: null },
  { name: 'Thabo Ndlela', role: 'Group Chief Information Officer', image: null },
  { name: 'Nyasha Mangwiza', role: 'Group Chief Human Capital Officer', image: null },
  { name: 'Rumbidzayi Jakanani', role: 'Group Chief Legal Counsel and Governance Officer', image: null },
  { name: 'Matilda Nyathi', role: 'Group Chief Marketing and Customer Experience Officer', image: null },
  { name: 'Eunice Mujekenyeki', role: 'Group Chief Risk Officer', image: null },
  { name: 'Takawira Chinyani', role: 'Head of Insurance Cluster', image: null },
  { name: 'Tendai Muzadzi', role: 'Head of Investments Cluster', image: null },
  { name: 'Wellington Mutizwa', role: 'Head of Agro-Business Cluster', image: null },
];

/** Items the business must confirm before launch, printed in HANDOFF.md. */
export const UNCONFIRMED: { item: string; owner: string; note?: string }[] = [
  { item: 'Branch hours (Mon to Fri 08:00 to 15:00, Sat 08:00 to 13:00)', owner: 'Retail Banking' },
  { item: '"46 years" and "Over 60 branches" claims', owner: 'Marketing', note: 'Hidden until confirmed.' },
  { item: 'Mortgage term limits (2 to 10 years used in the calculator)', owner: 'CBZ Bank' },
  { item: 'Car finance term limits (1 to 5 years used in the calculator)', owner: 'CBZ Bank' },
  { item: 'Unit mailboxes for form routing', owner: 'Marketing managers' },
  { item: 'Final photography for heroes and tiles', owner: 'Marketing' },
  { item: 'Campaign artwork and copy', owner: 'Marketing' },
  { item: 'Leadership photographs per unit, and confirmation of the subsidiary board names taken from the 2025 annual report (p. 161, a rotated page)', owner: 'Each unit', note: 'Names and roles sit in each unit JSON under "team". Confirm: the CBZ Bank chair\'s full name (Dr Alex Marufu), the CBZ Insurance Principal Officer\'s first name (Jame Mharadze), the Agro-Yield director Mutendadzamera (first name unclear, left out) and whether Nomathema Ndlovu still chairs CBZ Risk Advisory (marked retired or resigned, left out).' },
  { item: 'Objectives and customer segmentation per unit', owner: 'Marketing' },
  { item: 'Property listings, prices and photography', owner: 'CBZ Properties' },
  { item: 'FAQ answers on the Bank, Insurance, Properties, Datvest and Capital pages', owner: 'Each business unit', note: 'Drafted from the product data and form copy; each unit to confirm or replace the five questions.' },
  { item: 'Datvest and CBZ Capital track record (deals)', owner: 'Datvest, CBZ Capital' },
  { item: 'Car insurance and life policy rate tables', owner: 'CBZ Insurance, CBZ Life' },
  { item: 'Chatbot provider and endpoint', owner: 'Digital' },
  { item: 'Analytics vendor and tag', owner: 'Digital' },
  { item: 'Notices content (the six ported notices are sample content)', owner: 'Corporate Communications' },
  { item: 'CBZ Bank calls to action (site map says "to be confirmed"; Open an account, Apply for a loan and Call me back are in place)', owner: 'CBZ Bank' },
  { item: 'Board and executive committee photographs; Group CEO appointment date (the 2025 report says 1 December 2024, ZSE notices 1 December 2023; the site shows December 2023)', owner: 'Corporate Affairs', note: 'Names and roles are in src/data/facts.ts (BOARD, EXCO) from the 2025 annual report.' },
  { item: 'Sustainability: Grievance Procedure PDF, Grievance Resolution Form PDF, grievance mailbox, and the reports to publish', owner: 'Sustainability', note: 'src/data/sustainability.ts; links are hidden until set.' },
  { item: 'Off-site link: property management sign-in', owner: 'Digital, CBZ Properties' },
  { item: 'Zeex invoice-discounting wording and customer journey on the Red Sphere page', owner: 'Red Sphere Finance and Zeex', note: 'Both parties to approve. Link to zeex.co.zw is live.' },
  { item: 'ATDC button placement on the Agro-Yield page (Supply chain, commodity trading or a Group businesses area)', owner: 'CBZ Agro-Yield', note: 'Placed in Choose your service and in its own Explore ATDC section, linking to africatdc.com. Confirm or move.' },
  { item: 'Integrations behind the forms: SSP Pure, ICECASH and Flex Cube (Insurance), Life Central (Life)', owner: 'Digital', note: 'Recorded on each unit JSON under "systems"; nothing is wired yet.' },
  { item: 'Landing pages for the Business & SME and Corporate & Investment audience tabs in the header', owner: 'Marketing', note: 'On product pages the tabs filter the cards in place. Elsewhere they open the matching part of Explore our solutions (/journeys#business, /journeys#corporate) until dedicated pages exist. Personal is the home page; Diaspora is /diaspora.' },
  { item: 'Audience tags on every product (Personal, Business & SME, Corporate & Investment, Diaspora)', owner: 'Each business unit', note: 'Assigned in src/data/audiences.ts from each product\'s "who it\'s for" line; units to confirm, in particular products tagged for more than one audience.' },
];
