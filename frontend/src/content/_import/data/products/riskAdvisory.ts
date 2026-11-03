import { ProductItem } from '../../types';

/**
 * CBZ Risk Advisory Services product catalogue.
 * Transcribed from official CBZ Risk Advisory Services documentation,
 * IPEC broking regulatory guidelines, and corporate risk audit standards.
 */

export const RISK_ADVISORY_CATEGORIES = [
  { id: 'broking', label: 'Short-Term Insurance Broking' },
  { id: 'erm', label: 'Enterprise Risk Management & Audits' },
  { id: 'benefits', label: 'Employee Benefits & Pensions' },
  { id: 'reinsurance', label: 'Reinsurance & Claims Advocacy' },
] as const;

export const RISK_ADVISORY_PRODUCTS: Record<string, ProductItem[]> = {
  broking: [
    {
      id: 'corporate_property_broking',
      icon: 'Building2',
      name: 'Corporate Property & Assets Broking',
      description:
        'Independent risk placement of Industrial All Risks (IAR), fire, allied perils, and business interruption policies across licensed insurers.',
      pricing: 'Commission Broking',
      target: 'Commercial enterprises, manufacturers, and property funds',
      features: [
        'Multi-underwriter quote comparison to secure competitive premium rates',
        'Bespoke policy wordings eliminating restrictive endorsements and loopholes',
        'Business interruption extensions covering loss of gross profit and standing charges',
      ],
      benefits: [
        'Unbiased, independent market representation focused solely on the client’s interest',
        'Consolidated insurance portfolio under a single dedicated broker team',
      ],
      requirements: [
        'Updated asset valuation register',
        'Historical claims loss history (past 3 to 5 years)',
        'Site risk survey reports',
      ],
    },
    {
      id: 'fleet_marine_broking',
      icon: 'Car',
      name: 'Commercial Fleet & Marine Cargo',
      description:
        'Structuring comprehensive fleet coverage, goods in transit (GIT), and international ocean and air freight marine policies.',
      pricing: 'Brokerage Placement',
      target: 'Logistics operators, fleet owners, distributors, and importers/exporters',
      features: [
        'Aggregate fleet deductibles and profit-sharing rebate clauses',
        'Warehouse-to-warehouse international cargo cover (Institute Cargo Clauses A/B)',
        'Telematics integration advice to lower fleet loss ratios and premiums',
      ],
      benefits: [
        'Immediate cross-border cover notes for regional transit across SADC corridors',
        'Reduced downtime through fast-tracked mobile damage assessment',
      ],
      requirements: [
        'Vehicle fleet schedule including registration, make, year, and sum insured',
        'Route descriptions and typical cargo profile',
      ],
    },
    {
      id: 'liability_directors_officers',
      icon: 'Shield',
      name: 'Directors & Officers (D&O) and Liability',
      description:
        'Comprehensive protection against regulatory fines, shareholder litigation, professional negligence, and public liability.',
      pricing: 'Liability Placement',
      target: 'Company boards, trustees, professionals, and corporate executives',
      features: [
        'Directors & Officers (D&O) liability indemnifying board members personally',
        'Professional Indemnity (PI) for lawyers, accountants, medical practitioners, and engineers',
        'Cyber liability shield against data breaches, ransom attacks, and system outages',
      ],
      benefits: [
        'Protects personal net worth and reputation of directors and senior managers',
        'Guarantees defense cost funding during lengthy litigation',
      ],
      requirements: [
        'Completed liability proposal form',
        'Latest audited annual report',
        'Details of internal governance and cyber compliance controls',
      ],
    },
  ],

  erm: [
    {
      id: 'enterprise_risk_audits',
      icon: 'Search',
      name: 'Enterprise Risk Audits & Profiling',
      description:
        'Comprehensive, cross-functional risk audits evaluating strategic, operational, financial, and compliance exposures.',
      pricing: 'Consultancy Mandate',
      target: 'C-suite executives, audit committees, and corporate boards',
      features: [
        'Diagnostic risk register creation complying with ISO 31000 and COSO standards',
        'Quantitative impact scoring and vulnerability heat mapping',
        'Detailed mitigation roadmaps with assignable managerial ownership',
      ],
      benefits: [
        'Uncovers hidden, uninsured, or underinsured balance sheet liabilities',
        'Empowers boards to demonstrate robust corporate governance to regulators',
      ],
      requirements: [
        'Organisational chart and core process flow diagrams',
        'Existing risk registers and internal audit reports',
      ],
    },
    {
      id: 'loss_prevention_engineering',
      icon: 'Wrench',
      name: 'Loss Prevention & Engineering Surveys',
      description:
        'On-site technical engineering inspections identifying fire hazards, structural integrity gaps, and industrial safety risks.',
      pricing: 'Technical Survey',
      target: 'Industrial plants, manufacturing facilities, warehouses, and farms',
      features: [
        'Infrared thermography audits of electrical switchboards to prevent fire outbreaks',
        'Fire hydrant, sprinkler, and suppression system flow rate testing',
        'Environmental hazard containment and hazardous material storage reviews',
      ],
      benefits: [
        'Substantially lowers insurance premiums by demonstrating proactive risk reduction',
        'Prevents catastrophic production downtime and human casualty risks',
      ],
      requirements: [
        'Site access for technical risk engineers',
        'Building layout diagrams and electrical reticulation plans',
      ],
    },
    {
      id: 'business_continuity_planning',
      icon: 'RefreshCw',
      name: 'Business Continuity & Disaster Recovery',
      description:
        'Formulating and stress-testing operational continuity plans for power grid failures, floods, cyber hacks, and civil unrest.',
      pricing: 'Strategic Advisory',
      target: 'Financial institutions, utilities, mission-critical processors, and retailers',
      features: [
        'Business Impact Analysis (BIA) defining Recovery Time Objectives (RTO)',
        'Alternative site disaster recovery protocols and supply chain redundancy matrices',
        'Crisis simulation exercises and staff emergency readiness drills',
      ],
      benefits: [
        'Guarantees rapid restoration of mission-critical business functions',
        'Protects customer confidence and contracts during unforeseen macro disruptions',
      ],
      requirements: [
        'Process dependency data and IT infrastructure topology',
        'Key supplier dependency list',
      ],
    },
  ],

  benefits: [
    {
      id: 'pension_trustee_advisory',
      icon: 'Award',
      name: 'Pension Fund Structuring & Trustee Advisory',
      description:
        'Independent consulting to pension fund trustees on scheme design, investment policy statements, and IPEC regulatory compliance.',
      pricing: 'Retirement Advisory',
      target: 'Pension fund boards of trustees, principal officers, and employers',
      features: [
        'Review and drafting of pension fund rules and member communications',
        'Asset-liability modeling and independent investment performance monitoring',
        'Prescribed asset compliance advisory and governance health checks',
      ],
      benefits: [
        'Ensures full statutory alignment with IPEC pension regulations',
        'Optimises fund performance to safeguard member retirement benefits',
      ],
      requirements: [
        'Current pension fund rules and registration certificate',
        'Actuarial valuation reports and asset manager statements',
      ],
    },
    {
      id: 'group_medical_benefits',
      icon: 'HeartHandshake',
      name: 'Corporate Healthcare & Group Benefits',
      description:
        'Structuring, negotiating, and managing corporate employee medical aid schemes, wellness programmes, and group life benefits.',
      pricing: 'Employee Benefits',
      target: 'Corporate HR departments and employee benefit committees',
      features: [
        'Comparative benchmarking across leading medical aid societies',
        'Design of cost-containment measures and wellness incentive programs',
        'Dedicated broker helpdesk for rapid resolution of member claim rejections',
      ],
      benefits: [
        'Enhances employee attraction and retention with superior health cover',
        'Reduces corporate healthcare expenditure through expert tariff negotiations',
      ],
      requirements: [
        'Staff census including age distribution and family dependants',
        'Current medical aid package details and historical premium claims loss ratio',
      ],
    },
  ],

  reinsurance: [
    {
      id: 'regional_reinsurance',
      icon: 'Globe',
      name: 'Regional Treaty & Facultative Reinsurance',
      description:
        'Placing large-scale, complex risks across reputable regional and international reinsurance markets via our SADC desk.',
      pricing: 'Treaty / Facultative',
      target: 'Direct insurance underwriters, mining houses, and mega-infrastructure projects',
      features: [
        'Facultative placement for high-value risks exceeding domestic underwriting capacity',
        'Proportional and non-proportional treaty structures with A-rated regional reinsurers',
        'Specialised underwriting for mining, aviation, infrastructure, and energy generation',
      ],
      benefits: [
        'Provides security backed by internationally recognized balance sheets',
        'Enables execution of mega-projects with guaranteed insurance capacity',
      ],
      requirements: [
        'Comprehensive technical underwriting slip and slip conditions',
        'Engineering survey report and maximum probable loss (MPL) calculations',
      ],
    },
    {
      id: 'claims_advocacy',
      icon: 'Scale',
      name: 'Claims Advocacy & Dispute Resolution',
      description:
        'Tenacious, client-centric advocacy representing corporate policyholders to ensure prompt and equitable insurance claim payouts.',
      pricing: 'Claims Representation',
      target: 'All corporate clients experiencing significant insured losses',
      features: [
        'Independent loss adjuster assessment scrutiny and quantum challenge',
        'Expert interpretation of complex policy wordings and warranty compliance',
        'Fast-tracking interim emergency relief payments during extended claim reviews',
      ],
      benefits: [
        'Significantly increases claim recovery quantum and eliminates unjustified rejections',
        'Removes administrative burden so corporate executives can focus on recovery',
      ],
      requirements: [
        'Claim notification and incident report',
        'Proof of loss and repair/replacement quotations',
      ],
    },
  ],
};
