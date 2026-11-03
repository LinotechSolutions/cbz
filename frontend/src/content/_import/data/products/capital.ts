import { ProductItem } from '../../types';

/**
 * CBZ Capital product and solutions catalogue.
 * Transcribed from official CBZ Capital investment banking documentation
 * and corporate advisory mandates.
 */

export const CAPITAL_CATEGORIES = [
  { id: 'debt', label: 'Debt Capital Markets & Syndications' },
  { id: 'advisory', label: 'Corporate Advisory & M&A' },
  { id: 'equity', label: 'Equity Capital Markets & IPOs' },
  { id: 'infrastructure', label: 'PPPs & Infrastructure' },
] as const;

export const CAPITAL_PRODUCTS: Record<string, ProductItem[]> = {
  debt: [
    {
      id: 'loan_syndications',
      icon: 'Landmark',
      name: 'Syndicated Loan Facilities',
      description:
        'Structuring, lead-arranging, and placing multi-bank debt facilities for large-scale corporate and parastatal borrowers.',
      pricing: 'Structured Debt',
      target: 'Corporates, parastatals, and institutional developers',
      features: [
        'Lead arranger and facility agent services across Southern African banking syndicates',
        'Multi-currency debt tranches in USD and ZWG',
        'Tenors matched to project cash flows and repayment capabilities',
      ],
      benefits: [
        'Access to larger capital pools beyond single-lender balance sheet limits',
        'Consolidated documentation, covenant management, and single administrative agency',
      ],
      requirements: [
        'Audited financial statements (3 years)',
        'Detailed business plan and financial projections',
        'Feasibility study and asset/collateral schedule',
      ],
    },
    {
      id: 'corporate_bonds',
      icon: 'Receipt',
      name: 'Corporate Bonds & Commercial Paper',
      description:
        'Issuance, credit structuring, and private placement of medium-term notes, municipal bonds, and commercial paper.',
      pricing: 'Capital Markets',
      target: 'Listed corporates, local authorities, and tier-one enterprises',
      features: [
        'Short-term commercial paper programmes for working capital',
        'Medium-to-long term corporate debt notes listed on ZSE/VFEX or unlisted private placement',
        'Advisory on credit ratings and sinking fund structures',
      ],
      benefits: [
        'Diversification of funding sources away from pure bank lending',
        'Optimised weighted average cost of capital (WACC)',
      ],
      requirements: [
        'Credit rating or internal risk evaluation dossier',
        'Board and regulatory listing/placement approvals',
        'Legal opinion and trust deed documentation',
      ],
    },
    {
      id: 'structured_finance',
      icon: 'ShieldCheck',
      name: 'Project & Asset-Backed Finance',
      description:
        'Tailored non-recourse and limited-recourse project finance structures for capital expenditure and equipment acquisition.',
      pricing: 'Structured Solutions',
      target: 'Mining houses, agro-industrial complexes, and infrastructure developers',
      features: [
        'Off-balance sheet and Special Purpose Vehicle (SPV) ring-fencing',
        'Cash-sweep and escrow accounts anchored by CBZ Bank treasury',
        'Commodity and off-take linked repayment mechanisms',
      ],
      benefits: [
        'Isolates project risk from the corporate sponsor’s core balance sheet',
        'Custom grace periods aligning debt service with operational cash generation',
      ],
      requirements: [
        'Bankable off-take agreements',
        'Technical engineering and environmental impact assessments',
        'Detailed cash-flow financial models',
      ],
    },
  ],

  advisory: [
    {
      id: 'mna_advisory',
      icon: 'Briefcase',
      name: 'Mergers & Acquisitions (M&A)',
      description:
        'Comprehensive buy-side and sell-side advisory, target valuation, transaction structuring, and deal execution.',
      pricing: 'Corporate Advisory',
      target: 'Shareholders, institutional investors, and expanding corporates',
      features: [
        'Target screening, strategic alignment assessment, and synergy quantification',
        'Transaction structuring, valuation modeling (DCF, comparable multiples, NAV)',
        'Full management of regulatory approvals (ZSE, SECZIM, CTC, Reserve Bank)',
      ],
      benefits: [
        'Maximised shareholder realization value and disciplined acquisition pricing',
        'Navigates complex statutory compliance and antitrust hurdles seamlessly',
      ],
      requirements: [
        'Company memorandum and articles of association',
        'Historical audited accounts and management records',
        'Board resolution authorising transaction mandate',
      ],
    },
    {
      id: 'balance_sheet_restructuring',
      icon: 'Scale',
      name: 'Recapitalisation & Restructuring',
      description:
        'Right-sizing capital structures, debt rescheduling, capital reorganization, and distressed asset advisory.',
      pricing: 'Strategic Advisory',
      target: 'Enterprises undergoing strategic operational transitions or restructuring',
      features: [
        'Independent debt sustainability and covenant stress-testing',
        'Debt-for-equity conversion frameworks and moratorium negotiations',
        'Optimisation of debt maturity profiles and working capital cycles',
      ],
      benefits: [
        'Restores balance sheet health and lender confidence',
        'Preserves going-concern enterprise value and operational continuity',
      ],
      requirements: [
        'Comprehensive asset register and creditor schedule',
        'Independent audit reports and turnaround strategy plan',
      ],
    },
    {
      id: 'independent_valuations',
      icon: 'Search',
      name: 'Enterprise Valuations & Fairness Opinions',
      description:
        'Rigorous, market-tested business valuations, asset appraisals, and statutory fairness opinions.',
      pricing: 'Valuation Mandate',
      target: 'Boards of directors, special committees, and institutional investors',
      features: [
        'Defensible discounted cash flow, net asset value, and market precedent analyses',
        'Statutory fairness opinions for listed company corporate actions',
        'Independent reports complying with International Valuation Standards (IVS)',
      ],
      benefits: [
        'Objective benchmark pricing for transactions, disputes, and stakeholder negotiations',
        'Satisfies regulatory scrutiny from exchange and governance authorities',
      ],
      requirements: [
        'Company operational and financial records',
        'Strategic business plan and asset condition reports',
      ],
    },
  ],

  equity: [
    {
      id: 'ipos_listings',
      icon: 'TrendingUp',
      name: 'IPOs & Stock Exchange Listings',
      description:
        'Lead financial advisory, underwriting coordination, and sponsoring broker management for public offerings.',
      pricing: 'Capital Raising',
      target: 'High-growth private firms and public entities listing on ZSE or VFEX',
      features: [
        'Prospectus preparation, listing compliance, and roadshow marketing',
        'Equity valuation, share pricing, and book-building management',
        'VFEX USD listing frameworks and offshore capital attraction',
      ],
      benefits: [
        'Unlocks substantial permanent growth equity and institutional liquidity',
        'Elevates market reputation and provides liquidity for early investors',
      ],
      requirements: [
        'Minimum 3–5 year audited track record',
        'Corporate governance structures compliant with national code (ZimCode)',
        'Auditors and legal counsel approval documents',
      ],
    },
    {
      id: 'rights_issues_placements',
      icon: 'PieChart',
      name: 'Rights Issues & Private Placements',
      description:
        'Structuring secondary capital raises for listed issuers and bespoke private equity injections for private firms.',
      pricing: 'Equity Placement',
      target: 'Listed corporations, growing mid-caps, and developmental projects',
      features: [
        'Rights offer pricing, underwriting agreements, and circular distribution',
        'Private placement memoranda targeting local pension funds and regional DFIs',
        'Structuring preferred shares, convertible notes, and mezzanine capital',
      ],
      benefits: [
        'Secures growth capital without diluting controlling ownership unduly',
        'Accelerates strategic acquisitions or major capital expenditure programmes',
      ],
      requirements: [
        'Shareholder mandate for additional share issuance',
        'Regulatory circular approvals from stock exchange regulators',
      ],
    },
  ],

  infrastructure: [
    {
      id: 'ppp_concessions',
      icon: 'Building2',
      name: 'Public-Private Partnerships (PPPs)',
      description:
        'Advising government, municipalities, and concessionaires on BOT, BOOT, and concession contracts.',
      pricing: 'Infrastructure Advisory',
      target: 'State-owned enterprises, ministries, local authorities, and private developers',
      features: [
        'Concession contract structuring, risk-allocation matrices, and tariff setting',
        'Public-Private Partnership legislative compliance under ZIDA frameworks',
        'Sovereign guarantee advisory and blended finance arrangements',
      ],
      benefits: [
        'Unlocks private sector efficiency and capital for national infrastructure',
        'Balanced risk sharing between public authorities and private consortiums',
      ],
      requirements: [
        'ZIDA approval or project registration',
        'Technical feasibility studies and environmental clearance certificates',
      ],
    },
    {
      id: 'bankability_modeling',
      icon: 'Calculator',
      name: 'Feasibility & Bankability Modeling',
      description:
        'Rigorous quantitative financial modeling, sensitivity testing, and bankability preparation for major capital ventures.',
      pricing: 'Financial Modeling',
      target: 'Infrastructure consortia, energy developers, and industrial ventures',
      features: [
        'Comprehensive multi-scenario financial models with sensitivity indices',
        'Identification and mitigation of unhedged currency, inflation, and off-take risks',
        'Preparation of comprehensive information memoranda for international DFIs',
      ],
      benefits: [
        'Enhances likelihood of securing commercial debt and developmental funding',
        'Provides decision-makers with transparent risk-return trade-offs',
      ],
      requirements: [
        'Technical project specifications and capital expenditure estimates',
        'Market demand analysis and pricing study',
      ],
    },
  ],
};
