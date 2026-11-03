/**
 * Screen keys. Each has a URL in src/lib/routes.ts.
 * 'sbu' = CBZ Insurance page, 'group' = Buy a home journey, 'journey' = car insurance quote journey,
 * 'the-group' = group companies overview, 'login' = log-in portal chooser, 'open-account' = account opening flow.
 */
export type ScreenType =
  | 'home'
  | 'journey'
  | 'sbu'
  | 'group'
  | 'login'
  | 'agro'
  | 'invest'
  | 'properties'
  | 'bank'
  | 'open-account'
  | 'the-group'
  | 'red-sphere'
  | 'cbz-life'
  | 'capital'
  | 'risk-advisory'
  | 'diaspora'
  | 'security'
  | 'journey-invest'
  | 'journey-bank'
  | 'journey-agro'
  | 'journey-capital'
  | 'journey-risk'
  | 'home-journey'
  // Group information and regulatory pages
  | 'business-conditions'
  | 'privacy-policy'
  | 'tip-offs'
  | 'foundation';

export interface LifecycleStage {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  partnerEntity?: string;
  tag?: string;
}

export interface Country {
  code: string;
  name: string;
  iso: string;
  cur: string;
  dial: string;
  illustrative: boolean;
  regulator: string | null;
  pcur: string;
  rate: number;
  rates: string[];
}

export interface Subsidiary {
  id: string;
  name: string;
  /** The specialism, used as the tile label. */
  category: string;
  /**
   * The Group cluster this company sits in, per the CBZ Holdings Pitchbook
   * structure chart. See data/groupStructure.ts.
   */
  cluster: 'banking' | 'investments' | 'insurance' | 'agro' | 'philanthropy';
  description: string;
  cta: string;
  screen?: ScreenType | null;
  tagline: string;
  isCore?: boolean;
  image: string;
  logo?: string;
}

/** Icon tile and wedge colour on the homepage cards, per the design guide. */
export type Accent = 'navy' | 'red' | 'blue' | 'green' | 'purple' | 'orange';

export interface LifeStage {
  title: string;
  subtitle: string;
  iconName: string;
  accent: Accent;
  /** Photo in the lower half of the card. Replaceable in the CMS by image key. */
  image: string;
}

export interface Goal {
  label: string;
  route: ScreenType | null;
  subsidiary: string;
}

export interface Biller {
  id: string;
  name: string;
  category: string;
  iconName: string;
}

export interface Audience {
  title: string;
  description: string;
  iconName: string;
  image: string;
  tag: string;
}

export interface AssetOption {
  id: string;
  name: string;
  description: string;
  entity: string;
}

export interface CoverOption {
  id: string;
  name: string;
  tier: string;
  basePriceUSD: number;
  features: string[];
}

export interface AddonOption {
  id: string;
  name: string;
  entity: string;
  description: string;
  priceUSD: number;
}

export interface ProductItem {
  id?: string;
  name: string;
  description: string;
  /** Headline commercial line. Only state figures the product documents confirm. */
  pricing: string;
  image?: string;
  icon?: string;
  /** Who the product is for, as stated in the product documentation. */
  target?: string;
  /** What the customer must supply to open or apply. */
  requirements?: string[];
  features?: string[];
  benefits?: string[];
  /** Repayment or investment period, where the product defines one. */
  tenor?: string;
  interestRate?: string;
  adminFee?: string;
  /** Maximum advance, where the product defines one. */
  limit?: string;
}

export interface LedgerItem {
  field: string;
  value: string;
  stage: number;
  source: string;
  isTypedByUser: boolean;
}

export interface HandoverStep {
  from: string;
  to: string;
  payload: [string, string][];
  asked: string;
  avoided: number;
}
