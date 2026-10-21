import React from 'react';
import {
  ArrowRight,
  Building2,
  FileCheck,
  Globe,
  LineChart,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { ScreenType } from '../types';
import { EXTERNAL_LINKS } from '../data/facts';

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

interface TaskLauncherProps {
  onNavigate: (screen: ScreenType) => void;
  onLogin: () => void;
  onOpenAccount: () => void;
  onDiaspora: () => void;
}

/**
 * Task launcher: the first thing below the hero, so visitors start from what
 * they came to do rather than from the Group's organisational structure.
 * Sits ahead of news and campaigns deliberately.
 */
export const TaskLauncher: React.FC<TaskLauncherProps> = ({
  onNavigate,
  onLogin,
  onOpenAccount,
  onDiaspora,
}) => {
  const run = (task: LauncherTask) => () => {
    if (task.action === 'login') return onLogin();
    if (task.action === 'openAccount') return onOpenAccount();
    if (task.action === 'diaspora') return onDiaspora();
    if (task.screen) return onNavigate(task.screen);
    if (task.href && !task.href.startsWith('#TBC')) {
      window.open(task.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section aria-labelledby="task-launcher-heading" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2
          id="task-launcher-heading"
          className="text-xl sm:text-2xl font-black tracking-tight text-[#002554]"
        >
          What would you like to do?
        </h2>

        <ul className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {LAUNCHER_TASKS.map((task) => {
            const Icon = task.icon;
            return (
              <li key={task.label}>
                <button
                  onClick={run(task)}
                  className="group w-full h-full text-left bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#E4002B]/40 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer flex items-start gap-3"
                >
                  <span className="w-10 h-10 rounded-xl bg-white group-hover:bg-red-50 border border-slate-200 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-[#002554] group-hover:text-[#E4002B] transition-colors" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-[#002554]">{task.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#E4002B] group-hover:translate-x-0.5 transition-all" />
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500 leading-snug">
                      {task.hint}
                    </span>
                    {task.pending && (
                      <span className="mt-1.5 inline-block text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                        Link to be confirmed
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
