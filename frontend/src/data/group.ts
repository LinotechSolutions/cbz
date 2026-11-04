/**
 * CBZ Holdings group structure, transcribed from the CBZ Holdings Pitchbook
 * 2026 structure chart. Nothing here is invented: if the pitchbook does not
 * state it, it is not here.
 */
import type { LogoKey } from './logos';

export type ClusterId = 'banking' | 'investments' | 'insurance' | 'agro-business' | 'philanthropy';

export interface Cluster {
  id: ClusterId;
  name: string;
  shortName: string;
  /** Verb-led label used in navigation and the home page. */
  taskLabel: string;
  summary: string;
  line: string;
  isOperating: boolean;
  route: string;
  image: { src: string; alt: string };
}

export interface Company {
  id: string;
  name: string;
  cluster: ClusterId;
  summary: string;
  logo?: LogoKey;
  route?: string;
  /** Set where the pitchbook states a shareholding. */
  ownership?: string;
  /** Set on entities drawn beneath another company. */
  heldBy?: string;
}

export const CLUSTERS: readonly Cluster[] = [
  {
    id: 'banking',
    name: 'Banking Cluster',
    shortName: 'Banking',
    taskLabel: 'Bank',
    line: 'Accounts, cards, loans and microfinance',
    summary:
      'Corporate and retail banking, treasury and transactional services, delivered through the Group’s commercial bank, its microfinance business and its custodial services arm.',
    isOperating: true,
    route: '/clusters/banking',
    image: { src: '/images/cbz-banking.webp', alt: '' },
  },
  {
    id: 'investments',
    name: 'Investment Cluster',
    shortName: 'Investments',
    taskLabel: 'Invest',
    line: 'Unit trusts, corporate finance and property',
    summary: 'Corporate finance and capital raising, asset and wealth management, and property development and management.',
    isOperating: true,
    route: '/clusters/investments',
    image: { src: '/images/cbz-wealth.webp', alt: '' },
  },
  {
    id: 'insurance',
    name: 'Insurance Cluster',
    shortName: 'Insurance',
    taskLabel: 'Insure',
    line: 'Short-term cover, life assurance and broking',
    summary: 'Life assurance, short-term insurance, and independent broking, risk advisory and employee benefits consulting.',
    isOperating: true,
    route: '/clusters/insurance',
    image: { src: '/images/cbz-protection.webp', alt: '' },
  },
  {
    id: 'agro-business',
    name: 'Agro Business Cluster',
    shortName: 'Agro-Business',
    taskLabel: 'Farm',
    line: 'Contract farming, inputs, offtake, livestock and equipment',
    summary:
      'An integrated contract farming and supply-chain model covering input finance, aggregation, commodity trading and market linkages.',
    isOperating: true,
    route: '/clusters/agro-business',
    image: { src: '/images/cbz-agriculture.webp', alt: '' },
  },
  {
    id: 'philanthropy',
    name: 'Philanthropy',
    shortName: 'Philanthropy',
    taskLabel: 'Give',
    line: 'The CBZ Foundation',
    summary: 'The Group’s philanthropic arm, held directly by CBZ Holdings alongside the operating clusters.',
    isOperating: false,
    route: '/cbz-foundation',
    image: { src: '/images/cbzpicture1.webp', alt: '' },
  },
];

export const COMPANIES: readonly Company[] = [
  { id: 'bank', name: 'CBZ Bank', cluster: 'banking', logo: 'bank', route: '/bank', summary: 'Corporate and retail banking, treasury and transactional services, including loans, deposits, payments, collections, trade finance, cash management and cards.' },
  { id: 'red-sphere', name: 'Red Sphere Finance', cluster: 'banking', logo: 'red-sphere', route: '/red-sphere', summary: 'The Group’s microfinance business, lending against a salary, a payroll agreement or a trading record.' },
  { id: 'custodial', name: 'CBZ Custodial Services', cluster: 'banking', summary: 'Custody and safekeeping of securities for institutional investors, pension funds and asset managers, with fiduciary accounting and settlement.' },
  { id: 'properties', name: 'CBZ Properties', cluster: 'investments', logo: 'properties', route: '/properties', summary: 'Property development and project management, residential and commercial sales, leasing, valuations, estate agency and facilities management.' },
  { id: 'capital', name: 'CBZ Capital', cluster: 'investments', logo: 'capital', route: '/capital', summary: 'Corporate finance advisory, structuring and capital raising across equity, debt and mezzanine, M&A advisory, private equity and syndicated finance.' },
  { id: 'datvest', name: 'Datvest', cluster: 'investments', logo: 'datvest', route: '/datvest', summary: 'The Group’s investment management arm: unit trusts, wealth and portfolio management, pension fund management, and money-market and equity investments.' },
  { id: 'cbz-life', name: 'CBZ Life', cluster: 'insurance', logo: 'life', route: '/cbz-life', summary: 'Long-term insurance: individual and group life cover, funeral assurance, investment and education policies, credit life, and retirement and pension solutions.' },
  { id: 'insurance', name: 'CBZ Insurance', cluster: 'insurance', logo: 'insurance', route: '/insurance', summary: 'Short-term insurance covering personal, SME, agricultural and corporate risks, from motor and homeowners to marine, fire and personal accident.' },
  { id: 'risk-advisory', name: 'CBZ Risk Advisory Services', cluster: 'insurance', logo: 'risk-advisory', route: '/risk-advisory', summary: 'Insurance broking and risk advisory, employee benefits and pensions consulting, and individual life financial planning.' },
  { id: 'botswana-re', name: 'Botswana Reinsurance Brokers', cluster: 'insurance', ownership: '100% owned', heldBy: 'risk-advisory', summary: 'Reinsurance broking.' },
  { id: 'cbz-secure', name: 'CBZ Secure', cluster: 'insurance', ownership: '100% owned', heldBy: 'insurance', summary: 'Held beneath CBZ Insurance.' },
  { id: 'cbz-shield', name: 'CBZ Shield', cluster: 'insurance', ownership: '100% owned', heldBy: 'cbz-life', summary: 'Held beneath CBZ Life.' },
  { id: 'agro-yield', name: 'CBZ Agro-Yield', cluster: 'agro-business', logo: 'agro-yield', route: '/agro-yield', summary: 'Farming and contract farming, commodity trading in grain, oilseeds, legumes and horticulture, agri-supply chain management, and out-grower schemes.' },
  { id: 'atdc', name: 'ATDC Zimbabwe', cluster: 'agro-business', ownership: '40% owned', heldBy: 'agro-yield', summary: 'Associate held beneath CBZ Agro-Yield.' },
  { id: 'foundation', name: 'CBZ Foundation', cluster: 'philanthropy', route: '/cbz-foundation', summary: 'The Group’s philanthropic arm, held directly by CBZ Holdings.' },
];

export const clusterById = (id: ClusterId) => CLUSTERS.find((c) => c.id === id)!;
export const companiesIn = (id: ClusterId) => COMPANIES.filter((c) => c.cluster === id && !c.heldBy);
export const heldBy = (companyId: string) => COMPANIES.filter((c) => c.heldBy === companyId);

export const VALUE_PROPOSITION = [
  { title: 'One stop for financial services', body: 'Banking, financing, insurance, inputs, offtake and export support, built around the sectors clients work in.' },
  { title: 'Nationwide reach', body: 'A wide physical and digital footprint across every province of Zimbabwe, including agency banking.' },
  { title: 'An established brand', body: 'One of Zimbabwe’s most recognisable financial brands, known for consistency and stability.' },
  { title: 'Digital at scale', body: 'Growing digital platforms for client onboarding, automated credit decisions and data-driven insight.' },
] as const;
