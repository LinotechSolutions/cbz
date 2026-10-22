import { Building2, FileCheck, Globe, LineChart, LogIn, UserPlus } from 'lucide-react';
import React from 'react';
import { ScreenType } from '../types';
import { EXTERNAL_LINKS } from './facts';

export interface LauncherTask {
  label: string;
  /** One short line. The feedback asked for benefit-led, not descriptive, copy. */
  hint: string;
  icon: React.ElementType;
  screen?: ScreenType;
  href?: string;
  action?: 'login' | 'openAccount' | 'diaspora';
  /** Routes still awaiting a destination from the business. */
  pending?: boolean;
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
  { label: 'Log in', hint: 'Internet banking and CBZ Touch', icon: LogIn, action: 'login' },
  { label: 'Open an account', hint: 'Apply online in minutes', icon: UserPlus, action: 'openAccount' },
  { label: 'Diaspora banking', hint: 'Bank with CBZ from abroad', icon: Globe, action: 'diaspora' },
  {
    label: 'POP verification',
    hint: 'Verify a proof of payment',
    icon: FileCheck,
    href: EXTERNAL_LINKS.popVerification,
    pending: true,
  },
  { label: 'Property', hint: 'Stands, homes and commercial space', icon: Building2, screen: 'properties' },
  {
    label: 'Investor relations',
    hint: 'Results, reports and announcements',
    icon: LineChart,
    href: EXTERNAL_LINKS.investorRelations,
    pending: true,
  },
];
