import { LogoBrand } from '../brand/logos';
import { ScreenType } from '../types';

/**
 * CBZ Holdings Limited group structure.
 *
 * Single source of truth for which companies exist, which cluster each one sits
 * in, and what the Group owns. Transcribed from the CBZ Holdings Pitchbook 2026
 * ("CBZ Holdings Structure", "Key Corporate Milestones" and "Highlights"), which
 * is the authoritative statement of the Group structure.
 *
 * Nothing here may be invented. If the pitchbook does not state it, it is not in
 * this file. Anything the website asserts about the shape of the Group must read
 * from here.
 *
 * Note the distinction the pitchbook draws:
 *  - four operating clusters (Banking, Investments, Insurance, Agro-Business),
 *  - plus Philanthropy, which is not an operating cluster.
 * Ten operating companies sit in the four clusters. CBZ Foundation sits under
 * Philanthropy. Four further entities are held beneath operating companies.
 */

export type ClusterId = 'banking' | 'investments' | 'insurance' | 'agro' | 'philanthropy';

export interface GroupCompany {
  /** Matches the subsidiary id in cbzData.ts where the company has a page. */
  id: string;
  /** Legal / brand name exactly as the pitchbook writes it. */
  name: string;
  cluster: ClusterId;
  /** What the company does, in the pitchbook's own terms. */
  summary: string;
  /** Logo artwork, where master art exists. Held entities have no CBZ artwork. */
  brand?: LogoBrand;
  /** Site route, where the company has a page. */
  route?: ScreenType;
  /**
   * Set where the pitchbook states a shareholding. Wholly owned operating
   * companies carry no percentage in the pitchbook and are left undefined.
   */
  ownership?: string;
  /** Set on entities the pitchbook draws beneath another company, not beside it. */
  heldBy?: string;
}

export interface GroupCluster {
  id: ClusterId;
  /** Label as the pitchbook writes it. */
  name: string;
  /** Short label for the homepage and navigation. */
  shortName: string;
  /** The pitchbook's own description of what the cluster delivers. */
  summary: string;
  /** True for the four operating clusters; false for Philanthropy. */
  isOperating: boolean;
}

export const GROUP_CLUSTERS: readonly GroupCluster[] = [
  {
    id: 'banking',
    name: 'Banking Cluster',
    shortName: 'Banking',
    summary:
      'Corporate and retail banking, treasury and transactional services, delivered through the Group’s commercial bank, its microfinance business and its custodial services arm.',
    isOperating: true,
  },
  {
    id: 'investments',
    name: 'Investment Cluster',
    shortName: 'Investments',
    summary:
      'Corporate finance and capital raising, asset and wealth management, and property development and management.',
    isOperating: true,
  },
  {
    id: 'insurance',
    name: 'Insurance Cluster',
    shortName: 'Insurance',
    summary:
      'Life assurance, short-term insurance, and independent broking, risk advisory and employee benefits consulting.',
    isOperating: true,
  },
  {
    id: 'agro',
    name: 'Agro Business Cluster',
    shortName: 'Agro-Business',
    summary:
      'An integrated contract farming and supply-chain model covering input finance, aggregation, commodity trading and market linkages.',
    isOperating: true,
  },
  {
    id: 'philanthropy',
    name: 'Philanthropy',
    shortName: 'Philanthropy',
    summary: 'The Group’s philanthropic arm, held directly by CBZ Holdings alongside the operating clusters.',
    isOperating: false,
  },
] as const;

/**
 * Every company in the pitchbook structure chart, in the chart's own order.
 *
 * `route` is set only where this website has a page for the company. CBZ
 * Custodial Services, CBZ Foundation and the four held entities have no page and
 * no master logo artwork, so they appear in the structure but not in the
 * logo-led subsidiary showcase.
 */
export const GROUP_COMPANIES: readonly GroupCompany[] = [
  // Banking Cluster
  {
    id: 'bank',
    name: 'CBZ Bank',
    cluster: 'banking',
    brand: 'bank',
    route: 'bank',
    summary:
      'Corporate and retail banking, treasury and transactional services, including loans, deposits, payments, collections, trade finance, cash management and cards.',
  },
  {
    id: 'micro',
    name: 'Red Sphere Finance',
    cluster: 'banking',
    brand: 'red-sphere',
    route: 'red-sphere',
    summary:
      'The Group’s microfinance business, lending against a salary, a payroll agreement or a trading record.',
  },
  {
    id: 'custodial',
    name: 'CBZ Custodial Services',
    cluster: 'banking',
    // No lockup of its own exists. The CBZ Bank mark stands in, which also
    // reflects where custodial services sit in the Banking cluster. Swap this
    // for dedicated artwork if Marketing issues one.
    brand: 'bank',
    summary:
      'Custody and safekeeping of securities for institutional investors, pension funds and asset managers, with fiduciary accounting and settlement.',
  },

  // Investment Cluster
  {
    id: 'properties',
    name: 'CBZ Properties',
    cluster: 'investments',
    brand: 'properties',
    route: 'properties',
    summary:
      'Property development and project management, residential and commercial sales, leasing, valuations, estate agency and facilities management.',
  },
  {
    id: 'capital',
    name: 'CBZ Capital',
    cluster: 'investments',
    brand: 'capital',
    route: 'capital',
    summary:
      'Corporate finance advisory, structuring and capital raising across equity, debt and mezzanine, M&A advisory, private equity and syndicated finance.',
  },
  {
    id: 'datvest',
    name: 'Datvest',
    cluster: 'investments',
    brand: 'datvest',
    route: 'invest',
    summary:
      'The Group’s investment management arm: unit trusts, wealth and portfolio management, pension fund management, and money-market and equity investments.',
  },

  // Insurance Cluster
  {
    id: 'life',
    name: 'CBZ Life',
    cluster: 'insurance',
    brand: 'life',
    route: 'cbz-life',
    summary:
      'Long-term insurance: individual and group life cover, funeral assurance, investment and education policies, credit life, and retirement and pension solutions.',
  },
  {
    id: 'insurance',
    name: 'CBZ Insurance',
    cluster: 'insurance',
    brand: 'insurance',
    route: 'sbu',
    summary:
      'Short-term insurance covering personal, SME, agricultural and corporate risks, from motor and homeowners to marine, fire and personal accident.',
  },
  {
    id: 'risk',
    name: 'CBZ Risk Advisory Services',
    cluster: 'insurance',
    brand: 'risk-advisory',
    route: 'risk-advisory',
    summary:
      'Insurance broking and risk advisory, employee benefits and pensions consulting, and individual life financial planning.',
  },
  {
    id: 'botswana-re',
    name: 'Botswana Reinsurance Brokers',
    cluster: 'insurance',
    ownership: '100% owned',
    heldBy: 'risk',
    summary: 'Reinsurance broking, held beneath CBZ Risk Advisory Services.',
  },
  {
    id: 'cbz-secure',
    name: 'CBZ Secure',
    cluster: 'insurance',
    ownership: '100% owned',
    heldBy: 'insurance',
    summary: 'Held beneath CBZ Insurance.',
  },
  {
    id: 'cbz-shield',
    name: 'CBZ Shield',
    cluster: 'insurance',
    ownership: '100% owned',
    heldBy: 'life',
    summary: 'Held beneath CBZ Life.',
  },

  // Agro Business Cluster
  {
    id: 'agri',
    name: 'CBZ Agro-Yield',
    cluster: 'agro',
    brand: 'agro-yield',
    route: 'agro',
    summary:
      'Farming and contract farming, commodity trading in grain, oilseeds, legumes and horticulture, agri-supply chain management, and out-grower schemes.',
  },
  {
    id: 'atdc',
    name: 'ATDC Zimbabwe',
    cluster: 'agro',
    ownership: '40% owned',
    heldBy: 'agri',
    summary: 'Associate held beneath CBZ Agro-Yield.',
  },

  // Philanthropy
  {
    id: 'foundation',
    name: 'CBZ Foundation',
    cluster: 'philanthropy',
    // No lockup of its own exists; the CBZ Bank mark stands in until Marketing
    // issues one. The Foundation is held directly by CBZ Holdings, not by the
    // Bank, so the name is always shown alongside the mark.
    brand: 'bank',
    summary: 'The Group’s philanthropic arm, held directly by CBZ Holdings.',
  },
] as const;

/** Companies held directly in one of the four operating clusters. */
export const OPERATING_COMPANIES = GROUP_COMPANIES.filter(
  (c) => c.cluster !== 'philanthropy' && !c.heldBy,
);

/** Entities the pitchbook draws beneath an operating company, with a shareholding. */
export const HELD_ENTITIES = GROUP_COMPANIES.filter((c) => Boolean(c.heldBy));

/** Companies that have a page on this website. */
export const COMPANIES_WITH_PAGES = GROUP_COMPANIES.filter((c) => Boolean(c.route));

export const companiesInCluster = (cluster: ClusterId) =>
  GROUP_COMPANIES.filter((c) => c.cluster === cluster && !c.heldBy);

export const heldEntitiesOf = (companyId: string) =>
  GROUP_COMPANIES.filter((c) => c.heldBy === companyId);

/**
 * Group awards, from the pitchbook "Highlights" slide. Years are listed exactly
 * as the pitchbook lists them; do not extend this list without a new source.
 */
export interface GroupAward {
  awarder: string;
  title: string;
  years: readonly string[];
}

export const GROUP_AWARDS: readonly GroupAward[] = [
  { awarder: 'Global Finance Magazine', title: 'Best Bank in Zimbabwe', years: ['2023', '2024', '2025'] },
  { awarder: 'Euromoney', title: 'Best Bank in Zimbabwe', years: ['2024', '2025'] },
  {
    awarder: 'Afreximbank Pan-African Business & Development Awards',
    title: 'Best Financial Institution of the Year',
    years: ['2025'],
  },
] as const;

/**
 * Corporate milestones, from the pitchbook "Key Corporate Milestones" slide.
 */
export interface GroupMilestone {
  period: string;
  description: string;
}

export const GROUP_MILESTONES: readonly GroupMilestone[] = [
  {
    period: '1980',
    description:
      'Established. The company has since evolved into one of Africa’s largest publicly listed financial groups, operating across banking, insurance, trading, investments and agribusiness.',
  },
  {
    period: '1991',
    description: 'The Government acquired significant shareholding in the company’s banking operations.',
  },
  {
    period: '1995',
    description:
      'An efficiency-focused strategy drove mobilisation of financial resources and enabled greater focus on critical issues of the banking business.',
  },
  {
    period: '1997',
    description:
      'The International Finance Corporation acquired additional equity, in a bid to adequately capitalise the company.',
  },
  {
    period: '1998',
    description:
      'The bank was listed on the stock exchange, with approximately 55% of bank shares issued to the public. A microfinance unit was established to support SME enterprises.',
  },
  {
    period: '2004–2007',
    description:
      'A holding company was formed and key subsidiaries established, including asset management and expansion into the mortgage financing business.',
  },
  {
    period: '2016–2019',
    description:
      'Risk advisory was started in 2016 to enhance insurance offerings, and several initiatives were implemented in microfinance to drive a collaborative business.',
  },
  {
    period: '2025',
    description: 'The Group executed a growth strategy to expand its footprint within the Sub-Saharan Africa region.',
  },
] as const;

/**
 * The Group's integrated value proposition, from the pitchbook slide of the same
 * name. Used where the site explains what holding the companies together buys.
 */
export const VALUE_PROPOSITION = [
  {
    title: 'Bespoke value chains',
    body: 'CBZ is a one stop shop for financial services, delivering sector-specific solutions spanning banking, financing, insurance, inputs, off-take and export support.',
  },
  {
    title: 'Nationwide reach and market penetration',
    body: 'CBZ has a wide physical and digital footprint in Zimbabwe, serving clients across all provinces through our agency banking model.',
  },
  {
    title: 'Sector-focused value chains',
    body: 'CBZ is one of Zimbabwe’s most established and recognisable financial brands, known for consistency and stability.',
  },
  {
    title: 'Digital capabilities and scalability',
    body: 'The Group’s growing digital platforms enable scalable client onboarding, automated credit decisions, and data-driven insights.',
  },
] as const;
