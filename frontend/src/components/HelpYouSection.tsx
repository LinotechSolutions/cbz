import React from 'react';
import {
  ArrowRight,
  Building,
  Building2,
  ChevronRight,
  CreditCard,
  ExternalLink,
  Gem,
  Globe,
  ShieldCheck,
  ShieldCheck as BadgeIcon,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Accent, ScreenType } from '../types';
import { AUDIENCES, LIFE_STAGES } from '../data/cbzData';
import { LAUNCHER_TASKS, LauncherTask } from '../data/launcherTasks';
import { Logo } from './Logo';
import { useSiteImage } from '../context/SiteImagesContext';

/**
 * One section covering everything a visitor might be here to do, built to the
 * homepage design guide: a row of quick-action cards with coloured icon tiles,
 * four photo cards for what the visitor needs, a row of "I am" pills, and the
 * Ziki bill-payments strip.
 *
 * It replaces four separate sections that all did the same job in different
 * shapes: the task launcher, the life-stage grid, the audience grid and the
 * bill payments band. See the git history of this file for that reasoning.
 */

interface HelpYouSectionProps {
  onNavigate: (screen: ScreenType, hash?: string) => void;
  onLogin: () => void;
  onOpenAccount: () => void;
  onDiaspora: () => void;
}

/** Icon tile fills. Navy and red are the brand tokens; the rest follow the guide. */
const TILE: Record<Accent, string> = {
  navy: 'bg-cbz-blue',
  red: 'bg-cbz-red',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  purple: 'bg-violet-600',
  orange: 'bg-orange-500',
};

const stageIcon = (iconName: string) => {
  const cls = 'w-5 h-5';
  switch (iconName) {
    case 'ShieldCheck':
      return <ShieldCheck className={cls} />;
    case 'TrendingUp':
      return <TrendingUp className={cls} />;
    case 'Building':
      return <Building className={cls} />;
    case 'CreditCard':
    default:
      return <CreditCard className={cls} />;
  }
};

const stageRoute = (title: string): ScreenType => {
  switch (title.toLowerCase()) {
    case 'protection & care':
      return 'sbu';
    case 'wealth & growth':
      return 'invest';
    case 'property & agribusiness':
      return 'properties';
    case 'everyday banking':
    default:
      return 'bank';
  }
};

/** Pill icons, matched to the guide's glyphs rather than the data's icon names. */
const audienceIcon = (iconName: string) => {
  const cls = 'w-4 h-4';
  switch (iconName) {
    case 'Briefcase':
      return <Building2 className={cls} />;
    case 'Landmark':
      return <Users className={cls} />;
    case 'Award':
      return <Gem className={cls} />;
    case 'Globe':
      return <Globe className={cls} />;
    case 'User':
    default:
      return <User className={cls} />;
  }
};

/**
 * Where each segment lands. Three of the five used to land on the top of the
 * same bank page; they now open the product that fits the segment.
 */
const audienceRoute = (title: string): [ScreenType, string?] => {
  switch (title.toLowerCase()) {
    case 'business & smes':
      return ['bank', 'product-current_corporate'];
    case 'affluent banking':
      return ['bank', 'product-private_banking'];
    case 'corporate & institutional':
      return ['the-group'];
    case 'diaspora banking':
      return ['diaspora'];
    default:
      return ['bank', 'product-current'];
  }
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const HelpYouSection: React.FC<HelpYouSectionProps> = ({
  onNavigate,
  onLogin,
  onOpenAccount,
  onDiaspora,
}) => {
  const siteImage = useSiteImage();

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
        <div className="mb-6">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cbz-red mb-1.5">
            <span className="w-1.5 h-3.5 bg-cbz-red rounded-xs inline-block" />
            <span>Start here</span>
          </p>
          <h2
            id="help-you-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-cbz-blue"
          >
            What can we help you with?
          </h2>
          <p className="text-sm text-cbz-grey mt-1 max-w-2xl">
            Pick up where you left off, start something new, or tell us who you are and we will
            point you to the right part of the Group.
          </p>
        </div>

        {/* Quick actions. Content is top-aligned, so a card that carries a badge
            grows downward and the titles stay on one line across the row. */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {LAUNCHER_TASKS.map((task) => {
            const Icon = task.icon;
            return (
              <li key={task.label}>
                <button
                  onClick={runTask(task)}
                  className="group relative w-full h-full text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-bl from-slate-100 to-transparent pointer-events-none"
                  />

                  <span
                    className={`relative w-10 h-10 rounded-lg ${TILE[task.accent]} text-white flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </span>

                  <span className="relative mt-3 flex items-center justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block font-black text-sm sm:text-base text-cbz-blue leading-tight">
                        {task.label}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500 leading-snug">
                        {task.hint}
                      </span>
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-cbz-blue text-cbz-blue group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </span>

                  {task.pending ? (
                    <span className="relative mt-3 inline-flex self-start items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                      To be confirmed
                    </span>
                  ) : task.badge ? (
                    <span className="relative mt-3 inline-flex self-start items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                      <BadgeIcon className="w-3.5 h-3.5" />
                      {task.badge}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        {/* By need. */}
        <div className="mt-8 mb-3 flex items-center justify-between gap-4">
          <h3 className="flex items-center gap-2.5 text-sm font-black uppercase tracking-[0.18em] text-cbz-ink">
            <span className="w-6 h-0.5 bg-cbz-red inline-block" />
            <span>Or start with what you need</span>
          </h3>
          <button
            onClick={() => onNavigate('group')}
            className="text-xs sm:text-sm font-bold text-cbz-blue hover:text-cbz-red inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Explore all services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIFE_STAGES.map((stage) => (
            <button
              key={stage.title}
              onClick={() => onNavigate(stageRoute(stage.title))}
              className="group text-left bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden"
            >
              <span className="p-4 sm:p-5">
                <span
                  className={`w-10 h-10 rounded-lg ${TILE[stage.accent]} text-white flex items-center justify-center shadow-sm`}
                >
                  {stageIcon(stage.iconName)}
                </span>
                <span className="block mt-3 font-black text-base text-cbz-blue leading-tight">
                  {stage.title}
                </span>
                <span className="block text-xs text-slate-500 mt-1 leading-snug">
                  {stage.subtitle}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-cbz-blue group-hover:text-cbz-red transition-colors">
                  <span>Explore</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-cbz-red group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </span>

              {/* Photo with the accent wedge in the lower-left corner. */}
              <span className="relative block h-32 sm:h-36 mt-auto">
                <img
                  {...siteImage(`need.${slug(stage.title)}`, stage.image, '')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 w-[52%] h-[58%] ${TILE[stage.accent]} opacity-95`}
                  style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
                />
              </span>
            </button>
          ))}
        </div>

        {/* By segment. Every pill carries the same weight at rest: none of
            these is a selected state, they each lead to a different page. The
            navy fill from the guide is the hover and focus state instead. */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-black uppercase tracking-[0.2em] text-cbz-grey mr-2">
            I am
          </span>
          {AUDIENCES.map((audience) => (
            <button
              key={audience.title}
              onClick={() => onNavigate(...audienceRoute(audience.title))}
              title={audience.description}
              className="group inline-flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-cbz-blue hover:bg-cbz-blue hover:border-cbz-blue hover:text-white focus-visible:bg-cbz-blue focus-visible:text-white transition-colors cursor-pointer"
            >
              {audienceIcon(audience.iconName)}
              <span>{audience.title}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>

        {/* Bill payments, as a strip rather than a section of its own. The full
            biller list lives on Ziki Mall, which is where paying actually happens. */}
        <div
          id="bill-payments"
          className="mt-6 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Rendered through Logo, never as raw artwork: the brand registry
                owns the clear space and minimum width rules. */}
            <span className="flex-shrink-0">
              <Logo brand="ziki-mall" height={32} clearSpace={false} />
            </span>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-black text-cbz-blue">
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
            className="px-5 py-2.5 bg-cbz-blue hover:bg-cbz-blue-700 text-white text-xs font-bold rounded-xl inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs flex-shrink-0"
          >
            <span>Pay a bill on Ziki Mall</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
