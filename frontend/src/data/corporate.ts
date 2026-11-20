/**
 * Corporate Segment Data from the Corporate Banking Product Deck.
 * Maps business needs to CBZ solutions across 4 core pillars,
 * with standard requirements and relationship-manager contact details.
 */
import type { Intent } from './nav';

export interface CorporateSolution {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  requirements: string[];
  href: string;
  pillar: 'working-capital' | 'asset-receivable' | 'trade' | 'value-chain';
  need: string;
}

export interface BusinessNeedMapping {
  need: string;
  icon: string;
  solutions: string[];
  description: string;
  href: string;
}

export const CORPORATE_DISCLAIMER =
  'All facilities are subject to assessment, documentation, security and approval requirements.';

export const CORPORATE_CLOSING = {
  headline: 'Let’s finance what’s next.',
  subline: 'Speak to your CBZ Corporate Banking Relationship Manager or visit any CBZ branch nationwide.',
  phone: { display: '+263 867 700 4050', href: 'tel:+2638677004050' },
  tollFree: { display: '460 / 461', href: 'tel:460' },
  website: 'www.cbz.co.zw',
  signOff: 'Partners for Success',
  disclaimer: CORPORATE_DISCLAIMER,
};

/** Product Finder: Maps 9 Business Needs directly to CBZ Solutions */
export const CORPORATE_PRODUCT_FINDER: BusinessNeedMapping[] = [
  {
    need: 'Short-term liquidity',
    icon: 'wallet',
    solutions: ['Overdraft', 'Short Term Loan', 'Working Capital Finance'],
    description: 'Revolving and structured credit bridging operational cash-flow gaps, payroll and immediate stock needs.',
    href: '#working-capital',
  },
  {
    need: 'Medium/long-term growth',
    icon: 'chart',
    solutions: ['Term Loan', 'SME Loans'],
    description: 'Scheduled multi-year facilities for business expansion, capital expenditure, premises and capacity scaling.',
    href: '#working-capital',
  },
  {
    need: 'Vehicles, machinery & equipment',
    icon: 'car',
    solutions: ['Asset Finance', 'Lease Finance'],
    description: 'Specialised facilities matched to asset cash flows, preserving working capital while acquiring plant and fleet.',
    href: '#asset-receivable',
  },
  {
    need: 'Receivables & confirmed orders',
    icon: 'store',
    solutions: ['Invoice Discounting', 'Order Finance'],
    description: 'Liquidity advances against approved commercial invoices and purchase orders from credible corporate buyers.',
    href: '#asset-receivable',
  },
  {
    need: 'Stock & inventory',
    icon: 'building',
    solutions: ['Inventory Financing'],
    description: 'Structured funding linked to inventory turnover cycles, keeping shelves and production lines running.',
    href: '#asset-receivable',
  },
  {
    need: 'Imports, exports & trade',
    icon: 'globe',
    solutions: ['Trade Finance', 'Letters of Credit', 'Export Finance'],
    description: 'Cross-border financing, pre- and post-shipment liquidity, and payment assurance reducing counterparty risk.',
    href: '#trade',
  },
  {
    need: 'Contracts & tenders',
    icon: 'shield',
    solutions: ['Bank Guarantees'],
    description: 'Bid bonds, performance guarantees and advance payment undertakings enhancing credibility for major tenders.',
    href: '#trade',
  },
  {
    need: 'Supplier/distributor ecosystems',
    icon: 'users',
    solutions: ['Supply Chain Finance', 'Distributor Finance', 'Value Chain Finance'],
    description: 'Anchor-led chain liquidity, early supplier payments, and authorised distributor stocking facilities.',
    href: '#value-chain',
  },
  {
    need: 'Agriculture',
    icon: 'leaf',
    solutions: ['Agri-Business Loans'],
    description: 'Seasonal and structured finance aligned to agricultural production, processing, inputs and offtake.',
    href: '#value-chain',
  },
];

/** 4 Detailed Solution Pillars from Pages 3 to 11 */
export interface CorporatePillar {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  solutions: CorporateSolution[];
}

export const CORPORATE_PILLARS: CorporatePillar[] = [
  {
    id: 'working-capital',
    title: 'Working Capital & Growth',
    subtitle: 'Pages 3–4: Liquidity, expansion and operational stability',
    icon: 'wallet',
    solutions: [
      {
        id: 'overdraft',
        name: 'Overdraft',
        subtitle: 'Revolving cash-flow facility',
        tagline: 'For established businesses with regular cash flows.',
        description:
          'A revolving facility to draw and repay as needed, bridging short-term cash-flow gaps between receivables and payables.',
        requirements: ['Application form', 'Company profile & KYC', 'Audited financials', 'Cash-flow projections', 'Acceptable security'],
        href: '/bank/call-me-back',
        pillar: 'working-capital',
        need: 'Short-term liquidity',
      },
      {
        id: 'short-term-loan',
        name: 'Short Term Loan',
        subtitle: 'Fixed facility over a defined tenor',
        tagline: 'Structured repayment for immediate business needs.',
        description:
          'A fixed facility over a defined tenor with structured repayment. Funds stock purchases, order fulfilment, working capital and temporary liquidity.',
        requirements: ['Company profile & KYC', 'Financial records', 'Cash-flow projections', 'Acceptable security'],
        href: '/bank/call-me-back',
        pillar: 'working-capital',
        need: 'Short-term liquidity',
      },
      {
        id: 'term-loan',
        name: 'Term Loan',
        subtitle: 'Medium- to long-term capex facility',
        tagline: 'Lump-sum expansion and equipment funding.',
        description:
          'A lump-sum facility with an agreed tenor and scheduled repayments, structured for expansion, capital expenditure, new plant and machinery.',
        requirements: ['Company profile & KYC', 'Audited financials', 'Cash-flow projections & business plan', 'Acceptable security'],
        href: '/bank/call-me-back',
        pillar: 'working-capital',
        need: 'Medium/long-term growth',
      },
      {
        id: 'sme-loan',
        name: 'SME Loan',
        subtitle: 'Tailored growth & working capital',
        tagline: 'For viable small and medium enterprises.',
        description:
          'Tailored funding designed for viable growing enterprises needing working capital, equipment finance, or market expansion capital.',
        requirements: ['Financial or trading records', 'Cash-flow projections', 'Security as applicable', 'Business KYC'],
        href: '/red-sphere',
        pillar: 'working-capital',
        need: 'Medium/long-term growth',
      },
      {
        id: 'working-capital-loan',
        name: 'Working Capital Finance',
        subtitle: 'Structured operating & inventory funding',
        tagline: 'For businesses with recurring operational cycles.',
        description:
          'Structured funding engineered specifically for raw materials, inventory stocking, payroll, utility settlements and supplier payables.',
        requirements: ['Company profile & KYC', 'Financials', 'Cash-flow projections', 'Acceptable security'],
        href: '/bank/call-me-back',
        pillar: 'working-capital',
        need: 'Short-term liquidity',
      },
    ],
  },
  {
    id: 'asset-receivable',
    title: 'Asset & Receivable Finance',
    subtitle: 'Pages 5–7: Equipment, fleet, invoices and order fulfilment',
    icon: 'car',
    solutions: [
      {
        id: 'asset-finance',
        name: 'Asset Finance',
        subtitle: 'Repayment matched to asset cash flows',
        tagline: 'For acquiring or replacing vehicles, machinery & equipment.',
        description:
          'Finances eligible commercial assets, aligning repayment directly with the income and cash flows generated by the asset.',
        requirements: ['Supplier quotations', 'Financials or cash-flow projections', 'Deposit / equity contribution', 'Security as applicable'],
        href: '/bank/call-me-back',
        pillar: 'asset-receivable',
        need: 'Vehicles, machinery & equipment',
      },
      {
        id: 'lease-finance',
        name: 'Lease Finance',
        subtitle: 'Fixed periodic rentals over agreed tenor',
        tagline: 'Preserve working capital while modernising plant.',
        description:
          'Asset acquisition structured through a lease with fixed periodic rentals over an agreed tenor, conserving essential balance sheet liquidity.',
        requirements: ['Supplier quotation', 'Financial or cash-flow assessment', 'Asset documentation & specifications'],
        href: '/bank/call-me-back',
        pillar: 'asset-receivable',
        need: 'Vehicles, machinery & equipment',
      },
      {
        id: 'invoice-discounting',
        name: 'Invoice Discounting / Factoring',
        subtitle: 'Advance against eligible commercial invoices',
        tagline: 'For businesses selling on credit to reputable corporate clients.',
        description:
          'Immediate liquidity advance against verified commercial debtor invoices, with collections structured smoothly through the Bank.',
        requirements: ['Valid tax invoices', 'Debtor confirmation or acceptance', 'Trading history', 'Assignment or cession of receivables'],
        href: '/bank/call-me-back',
        pillar: 'asset-receivable',
        need: 'Receivables & confirmed orders',
      },
      {
        id: 'order-finance',
        name: 'Order Finance',
        subtitle: 'Fulfillment funding for confirmed purchase orders',
        tagline: 'For businesses with purchase orders from credible buyers.',
        description:
          'Short-term funding to manufacture or procure goods to fulfil confirmed purchase orders or tenders, self-liquidating from order proceeds.',
        requirements: ['Confirmed purchase order or contract', 'Customer details', 'Supplier quotations', 'Cash-flow assessment'],
        href: '/bank/call-me-back',
        pillar: 'asset-receivable',
        need: 'Receivables & confirmed orders',
      },
      {
        id: 'inventory-financing',
        name: 'Inventory Financing',
        subtitle: 'Funding against eligible stock turnover',
        tagline: 'For businesses with established inventory cycles.',
        description:
          'Credit facility secured against eligible inventory, with repayment milestones synchronized directly with inventory sales turnover.',
        requirements: ['Stock management records', 'Supplier invoices', 'Financial / trading records', 'Acceptable stock controls'],
        href: '/bank/call-me-back',
        pillar: 'asset-receivable',
        need: 'Stock & inventory',
      },
    ],
  },
  {
    id: 'trade',
    title: 'Trade & International Business',
    subtitle: 'Pages 8–9: Import, export, guarantees and payment assurance',
    icon: 'globe',
    solutions: [
      {
        id: 'trade-finance',
        name: 'Trade Finance',
        subtitle: 'Structured cross-border and local trade facilities',
        tagline: 'For importers, exporters, distributors and traders.',
        description:
          'Structured funding tailored to specific import, export and domestic trade cycles, handling currency settlement and customs clearance.',
        requirements: ['Trade documentation', 'Transaction evidence', 'Supplier & buyer profiles', 'Security or cash margin as applicable'],
        href: '/bank/call-me-back',
        pillar: 'trade',
        need: 'Imports, exports & trade',
      },
      {
        id: 'bank-guarantees',
        name: 'Bank Guarantees',
        subtitle: 'Bid bonds, performance & advance payment guarantees',
        tagline: 'Enhance credibility and qualify for major contracts & tenders.',
        description:
          'An irrevocable bank undertaking issued to a project principal or beneficiary for an agreed amount and tenor, unlocking tender participation.',
        requirements: ['Underlying tender document or contract', 'Credit limit assessment', 'Cash margin and/or acceptable security'],
        href: '/bank/call-me-back',
        pillar: 'trade',
        need: 'Contracts & tenders',
      },
      {
        id: 'letters-of-credit',
        name: 'Letters of Credit',
        subtitle: 'Irrevocable documentary payment assurance',
        tagline: 'Mitigate international trade and counterparty risk.',
        description:
          'Bank undertaking guaranteeing payment to foreign or domestic suppliers against compliant presentation of agreed shipping and trade documents.',
        requirements: ['Proforma or commercial invoice', 'Full shipping & trade documents', 'Approved credit line or cash margin'],
        href: '/bank/call-me-back',
        pillar: 'trade',
        need: 'Imports, exports & trade',
      },
      {
        id: 'export-finance',
        name: 'Export Finance',
        subtitle: 'Pre- and post-shipment export liquidity',
        tagline: 'For exporters with confirmed international orders.',
        description:
          'Pre-shipment production funding and post-shipment discounting that bridges the cash conversion cycle until foreign currency proceeds are received.',
        requirements: ['Export contract or purchase order', 'Foreign buyer details', 'Shipping / bill of lading documentation', 'Cash-flow plan'],
        href: '/bank/call-me-back',
        pillar: 'trade',
        need: 'Imports, exports & trade',
      },
    ],
  },
  {
    id: 'value-chain',
    title: 'Sector & Value Chain Finance',
    subtitle: 'Pages 10–11: Agribusiness, anchor supply chains and distribution',
    icon: 'leaf',
    solutions: [
      {
        id: 'agri-business-loans',
        name: 'Agri-Business Loans',
        subtitle: 'Aligned to production and harvest cycles',
        tagline: 'For commercial farmers, agro-processors & input suppliers.',
        description:
          'Seasonal production loans, irrigation facilities, farm machinery leasing and processing infrastructure finance aligned to agricultural seasons.',
        requirements: ['Farm or enterprise trading records', 'Seasonal production plan', 'Offtake agreements or market evidence', 'Security'],
        href: '/agro-yield',
        pillar: 'value-chain',
        need: 'Agriculture',
      },
      {
        id: 'supply-chain-finance',
        name: 'Supply Chain Finance',
        subtitle: 'Anchor-led early payment for vendor networks',
        tagline: 'For approved suppliers selling to corporate anchor buyers.',
        description:
          'Financing based on approved invoices within an anchor corporate ecosystem, delivering early payment to vendors while optimizing buyer working capital.',
        requirements: ['Corporate anchor buyer relationship', 'Approved invoices or purchase orders', 'Supplier KYC', 'Transaction evidence'],
        href: '/bank/call-me-back',
        pillar: 'value-chain',
        need: 'Supplier/distributor ecosystems',
      },
      {
        id: 'distributor-finance',
        name: 'Distributor Finance',
        subtitle: 'Stocking facilities for accredited distribution networks',
        tagline: 'For authorised distributors of established brand manufacturers.',
        description:
          'Short-term credit for inventory purchases from approved principals, bolstering purchasing power, stock availability and nationwide sales velocity.',
        requirements: ['Distribution agreement with manufacturer', 'Purchase orders or invoices', 'Trading records', 'Repayment controls'],
        href: '/bank/call-me-back',
        pillar: 'value-chain',
        need: 'Supplier/distributor ecosystems',
      },
      {
        id: 'value-chain-finance',
        name: 'Value Chain Finance',
        subtitle: 'Integrated ecosystem funding for mining, agro & industry',
        tagline: 'Linked to established production and off-take relationships.',
        description:
          'Ecosystem credit structured across the entire production and supply chain in agriculture, mining and manufacturing from raw inputs to final off-take.',
        requirements: ['Anchor or off-take contracts', 'Supply orders', 'Integrated cash-flow assessment', 'Cessions or assignments'],
        href: '/bank/call-me-back',
        pillar: 'value-chain',
        need: 'Supplier/distributor ecosystems',
      },
    ],
  },
];

/** Corporate Intents for the Hero Finder on the Corporate Page */
export const CORPORATE_INTENTS: Intent[] = [
  {
    verb: 'finance',
    objects: [
      { label: 'short-term liquidity (Overdraft, Loans)', href: '#working-capital' },
      { label: 'growth & expansion (Term Loan, SME)', href: '#working-capital' },
      { label: 'vehicles, machinery & equipment (Asset & Lease)', href: '#asset-receivable' },
      { label: 'invoices & confirmed orders (Discounting, Order)', href: '#asset-receivable' },
      { label: 'stock & inventory cycles', href: '#asset-receivable' },
      { label: 'imports, exports & trade (LCs, Trade Finance)', href: '#trade' },
      { label: 'contracts & tenders (Bank Guarantees)', href: '#trade' },
      { label: 'supplier & distributor ecosystems', href: '#value-chain' },
      { label: 'commercial agribusiness', href: '#value-chain' },
    ],
  },
  {
    verb: 'manage',
    objects: [
      { label: 'corporate accounts & treasury', href: '/clusters/banking' },
      { label: 'foreign currency accounts (FCA)', href: '/bank/fca_corporate' },
      { label: 'electronic payroll & bulk payments', href: '/bank/internet_banking' },
      { label: 'merchant collections & Kleva POS', href: '/bank#cards-and-digital' },
    ],
  },
  {
    verb: 'insure',
    objects: [
      { label: 'commercial assets & plant', href: '/clusters/insurance' },
      { label: 'group life & staff pensions', href: '/cbz-life/quote' },
      { label: 'enterprise risk & loss prevention', href: '/risk-advisory' },
      { label: 'fleet & marine cargo', href: '/insurance/quote' },
    ],
  },
  {
    verb: 'invest',
    objects: [
      { label: 'corporate treasury placements', href: '/datvest/corporate-treasury-liquidity-placement' },
      { label: 'capital raising & debt syndications', href: '/capital' },
      { label: 'commercial real estate & development', href: '/properties?type=commercial' },
    ],
  },
];
