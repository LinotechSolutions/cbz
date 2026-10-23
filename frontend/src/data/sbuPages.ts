import { LogoBrand } from '../brand/logos';
import { ProductItem, ScreenType } from '../types';
import { tbc } from './facts';

/**
 * Configuration for the standardised business-unit landing page.
 *
 * Every business unit uses the same seven sections, in the same order, as agreed
 * in the CBZ Holdings website feedback:
 *   hero - about - key facts - products - campaigns - leadership - contact.
 *
 * Anything awaiting business sign-off is marked with tbc() so it is visible in
 * review rather than quietly invented. Leadership profiles, campaign artwork and
 * some application links are outstanding.
 */

export interface KeyFact {
  value: string;
  label: string;
}

export interface LeadershipProfile {
  name: string;
  role: string;
  /** Image slot key, so the picture is replaceable in the CMS. */
  imageKey?: string;
  image?: string;
}

export interface CampaignSlot {
  /** 'banner' fills the row; up to three 'tile's sit side by side. */
  kind: 'banner' | 'tile';
  /** The headline on the banner's colour block. */
  title: string;
  /** The line under the headline. */
  body?: string;
  cta?: { label: string; href?: string; screen?: ScreenType };
  imageKey?: string;
  image?: string;
  /** The big offer figure, e.g. "30% off" or "From 5%". Shown large, top-left. */
  offer?: string;
  /** One short line in italic above the headline, e.g. "Discover your next step". */
  tagline?: string;
  /** Small strip above the colour block: a lead line and a sentence of detail. */
  note?: { lead: string; detail: string };
}

export interface SbuPageConfig {
  brand: LogoBrand;
  /** CMS image slot prefix for this unit's product cards. */
  imageKeyPrefix: string;
  hero: {
    eyebrow: string;
    /** Benefit-led, short. The feedback asked for shorter, benefit-led headlines. */
    headline: string;
    valueProposition: string;
    imageKey: string;
    image?: string;
    primaryCta: { label: string; screen?: ScreenType; href?: string };
    /** `anchor` scrolls to a section id on the same page instead of navigating away. */
    secondaryCta?: { label: string; screen?: ScreenType; href?: string; anchor?: string };
  };
  about: string;
  keyFacts: KeyFact[];
  products: {
    heading: string;
    intro?: string;
    categories: readonly { readonly id: string; readonly label: string }[];
    items: Record<string, ProductItem[]>;
    /** Shown under the grid, for terms that need stating. */
    termsNote?: string;
  };
  campaigns: CampaignSlot[];
  leadership: LeadershipProfile[];
  contact: {
    heading: string;
    body: string;
    primaryCta: { label: string; screen?: ScreenType; href?: string };
    phone?: string;
    email?: string;
  };
}

/** Placeholder used until the business supplies executive profiles. */
export const leadershipPending = (unit: string): LeadershipProfile[] => [
  { name: tbc(`${unit} executive name`), role: tbc('role') },
];

/** Placeholder campaign slot, sized as agreed: one banner or up to three tiles. */
export const campaignsPending = (unit: string): CampaignSlot[] => [
  {
    kind: 'banner',
    // Every slot of the banner carries a placeholder, so Marketing sees the
    // whole template and what each field is for, not a dashed box.
    title: tbc(`${unit} campaign banner`),
    body: tbc('one line under the headline'),
    offer: tbc('offer'),
    tagline: tbc('short italic line'),
    note: {
      lead: tbc('lead line'),
      detail:
        'Reserved for one main promotional banner, or up to three smaller tiles. Artwork and dimensions to be confirmed with Marketing.',
    },
    cta: { label: tbc('call to action') },
  },
];
