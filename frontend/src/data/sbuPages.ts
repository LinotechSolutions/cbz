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
  title: string;
  body?: string;
  cta?: { label: string; href?: string; screen?: ScreenType };
  imageKey?: string;
  image?: string;
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
    title: tbc(`${unit} campaign banner`),
    body: 'Reserved for one main promotional banner, or up to three smaller tiles. Artwork and dimensions to be confirmed with Marketing.',
  },
];
