import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ScreenType } from '../types';
import { AUDIENCES, LIFE_STAGES } from '../data/cbzData';
import { LAUNCHER_TASKS, LauncherTask } from '../data/launcherTasks';
import { Logo } from './Logo';

/**
 * One section covering everything a visitor might be here to do.
 *
 * It replaces four separate sections that all did the same job in different
 * shapes: the task launcher, the life-stage grid, the audience grid and the
 * bill payments band. The homepage feedback was that the page ran long and
 * repeated itself, and those four were the repetition: three consecutive
 * icon-card grids, two of which routed to the same handful of pages.
 *
 * What survives of each:
 *  - task launcher   -> the quick actions row, unchanged in substance
 *  - life stages     -> the four "what do you need" cards, which are the only
 *                       grid whose cards each lead somewhere different
 *  - audiences       -> a single row of links, not five image cards: the
 *                       segment matters for wayfinding, but four of the five
 *                       cards navigated to the same banking page
 *  - bill payments   -> the Ziki strip at the foot of the section
 */

interface HelpYouSectionProps {
  onNavigate: (screen: ScreenType) => void;
  onLogin: () => void;
  onOpenAccount: () => void;
  onDiaspora: () => void;
}

const stageIcon = (iconName: string) => {
  switch (iconName) {
    case 'CreditCard':
      return <CreditCard className="w-6 h-6 text-[#E4002B]" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-6 h-6 text-[#002554]" />;
    case 'TrendingUp':
      return <TrendingUp className="w-6 h-6 text-[#E4002B]" />;
    case 'Building':
      return <Building className="w-6 h-6 text-[#002554]" />;
    default:
      return <CreditCard className="w-6 h-6 text-[#E4002B]" />;
  }
};

const stageRoute = (title: string): ScreenType => {
  switch (title.toLowerCase()) {
    case 'everyday banking':
      return 'bank';
    case 'protection & care':
      return 'sbu';
    case 'wealth & growth':
      return 'invest';
    case 'property & agribusiness':
      return 'properties';
    default:
      return 'bank';
  }
};

const audienceRoute = (title: string): ScreenType => {
  switch (title.toLowerCase()) {
    case 'corporate & institutional':
      return 'the-group';
    case 'diaspora banking':
      return 'diaspora';
    default:
      return 'bank';
  }
};

export const HelpYouSection: React.FC<HelpYouSectionProps> = ({
  onNavigate,
  onLogin,
  onOpenAccount,
  onDiaspora,
}) => {
  const runTask = (task: LauncherTask) => () => {
    if (task.action === 'login') return onLogin();
    if (task.action === 'openAccount') return onOpenAccount();
    if (task.action === 'diaspora') return onDiaspora();
    if (task.screen) return onNavigate(task.screen);
    if (task.href && !task.href.startsWith('#TBC')) {
      window.open(task.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section aria-labelledby="help-you-heading" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        {/* Section header, matching the Group subsidiaries section: red rule and
            eyebrow, black heading, supporting line, and a red link on the right. */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#E4002B] mb-1.5">
              <span className="w-1.5 h-3.5 bg-[#E4002B] rounded-xs inline-block" />
              <span>Start here</span>
            </div>
            <h2
              id="help-you-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-[#002554]"
            >
              What can we help you with?
            </h2>
            <p className="text-sm text-cbz-grey mt-1 max-w-2xl">
              Pick up where you left off, start something new, or tell us who you are and we will
              point you to the right part of the Group.
            </p>
          </div>

          <button
            onClick={() => onNavigate('group')}
            className="text-xs sm:text-sm font-bold text-[#E4002B] hover:text-[#C50025] flex items-center space-x-1.5 mt-4 md:mt-0 transition-colors cursor-pointer"
          >
            <span>Explore all services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick actions, in a tray like the subsidiary selector: white cards on
            a tinted panel so the row reads as one control, not six loose boxes. */}
        <div className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {LAUNCHER_TASKS.map((task) => {
              const Icon = task.icon;
              return (
                <li key={task.label}>
                  <button
                    onClick={runTask(task)}
                    className="group w-full h-full text-left bg-white border border-slate-200 hover:border-[#002554] hover:ring-2 hover:ring-[#002554]/10 rounded-xl p-3 sm:p-4 transition-all hover:shadow-xs cursor-pointer flex items-start gap-2.5 sm:gap-3"
                  >
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-50 group-hover:bg-red-50 border border-slate-200 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-4 h-4 text-[#002554] group-hover:text-[#E4002B] transition-colors" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <span className="font-extrabold text-xs sm:text-sm text-[#002554] leading-tight">
                          {task.label}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#E4002B] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </span>
                      <span className="mt-0.5 block text-2xs sm:text-xs text-slate-500 leading-snug">
                        {task.hint}
                      </span>
                      {task.pending && (
                        <span className="mt-1 inline-block text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded">
                          To be confirmed
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* By need. These four are the only cards on the page that each lead
            somewhere genuinely different, so they keep the card treatment. */}
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#E4002B] mt-10 mb-4">
          <span className="w-1.5 h-3.5 bg-[#E4002B] rounded-xs inline-block" />
          <span>Or start with what you need</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {LIFE_STAGES.map((stage) => (
            <button
              key={stage.title}
              onClick={() => onNavigate(stageRoute(stage.title))}
              className="text-left p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#002554] hover:ring-2 hover:ring-[#002554]/10 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                  {stageIcon(stage.iconName)}
                </div>
                <h3 className="font-black text-base text-[#002554] group-hover:text-[#E4002B] transition-colors">
                  {stage.title}
                </h3>
                <p className="text-xs text-cbz-grey mt-1.5 leading-relaxed">{stage.subtitle}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002554] group-hover:text-[#E4002B]">
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>

        {/* By segment. A row of links rather than five image cards: it is a
            wayfinding aid, not a second product grid. Every pill is weighted the
            same, because none of them is a selected state. */}
        <div className="mt-8 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 flex flex-wrap items-center gap-x-2 gap-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-cbz-grey mr-1 pl-1">
            I am
          </span>
          {AUDIENCES.map((audience) => (
            <button
              key={audience.title}
              onClick={() => onNavigate(audienceRoute(audience.title))}
              title={audience.description}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:border-[#002554] hover:ring-2 hover:ring-[#002554]/10 text-xs font-bold text-[#002554] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{audience.title}</span>
              <ArrowRight className="w-3 h-3 text-slate-300" />
            </button>
          ))}
        </div>

        {/* Bill payments, as a strip rather than a section of its own. The full
            biller list lives on Ziki Mall, which is where paying actually happens. */}
        <div
          id="bill-payments"
          className="mt-4 scroll-mt-24 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Rendered through Logo, never as raw artwork: the brand registry
                owns the clear space and minimum width rules. */}
            <span className="flex-shrink-0">
              <Logo brand="ziki-mall" height={32} clearSpace={false} />
            </span>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-black text-[#002554]">
                Pay every bill in one tap
              </h3>
              <p className="text-xs text-cbz-grey mt-0.5 leading-relaxed">
                Electricity, municipal rates, school fees and subscriptions, from CBZ Touch or the
                Ziki marketplace.
              </p>
            </div>
          </div>
          <a
            href="https://zikimall.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#002554] hover:bg-[#0A3E80] text-white text-xs font-bold rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs flex-shrink-0"
          >
            <span>Pay a bill on Ziki Mall</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
