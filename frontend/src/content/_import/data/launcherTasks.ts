import { Building2, FileCheck, Globe, LineChart, LogIn, UserPlus } from 'lucide-react';
import React from 'react';
import { Accent, ScreenType } from '../types';
import { EXTERNAL_LINKS } from './facts';

export interface LauncherTask {
  label: string;
  /** One short line. The feedback asked for benefit-led, not descriptive, copy. */
  hint: string;
  icon: React.ElementType;
  /** Icon tile colour, per the homepage design guide: one accent per task. */
  accent: Accent;
  screen?: ScreenType;
  href?: string;
  action?: 'login' | 'openAccount' | 'diaspora';
  /** Routes still awaiting a destination from the business. */
  pending?: boolean;
  /**
   * Optional reassurance pill under the hint, e.g. "Secure & fast". Not shown
   * while `pending` is set: a link that is not yet confirmed cannot promise
   * anything, so the pending notice takes the slot instead.
   */
  badge?: string;
}

/**
 * The tasks a visitor actually arrives to do, taken from the web analytics
 * review: internet banking, account applications, diaspora, proof of payment,
 * property and investor relations.
 *
 * These used to live in TaskLauncher.tsx. That component was folded into
 * HelpYouSection when the homepage was cut from eight sections to four, so the
 * data moved here rather than staying in a component nothing renders.
 */
export const LAUNCHER_TASKS: LauncherTask[] = [
  { label: 'Log in', hint: 'Internet banking and CBZ Touch', icon: LogIn, accent: 'navy', action: 'login' },
  { label: 'Open an account', hint: 'Apply online in minutes', icon: UserPlus, accent: 'red', action: 'openAccount' },
  { label: 'Diaspora banking', hint: 'Bank with CBZ from abroad', icon: Globe, accent: 'blue', action: 'diaspora' },
  {
    label: 'POP verification',
    hint: 'Verify a proof of payment',
    icon: FileCheck,
    accent: 'green',
    href: EXTERNAL_LINKS.popVerification,
    pending: true,
    // Shown once the link is confirmed and `pending` comes off.
    badge: 'Secure & fast',
  },
  {
    label: 'Property',
    hint: 'Stands, homes and commercial space',
    icon: Building2,
    accent: 'purple',
    screen: 'properties',
  },
  {
    label: 'Investor relations',
    hint: 'Results, reports and announcements',
    icon: LineChart,
    accent: 'orange',
    href: EXTERNAL_LINKS.investorRelations,
    pending: true,
  },
];
