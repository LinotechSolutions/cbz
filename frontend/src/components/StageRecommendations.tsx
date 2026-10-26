import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { ScreenType } from '../types';
import { LogoBrand } from '../brand/logos';
import { SERVICES, SERVICE_LIST, STAGES, ServiceDef, ServiceId } from '../data/cbzJourneys';
import { SUBSIDIARIES } from '../data/cbzData';
import { useSiteImage } from '../context/SiteImagesContext';

/**
 * "Find the right fit for where you are": a stage picker and a fanned carousel
 * of services from elsewhere in the Group, shown on every business-unit page
 * above the campaign slot.
 *
 * The visitor picks a life or business stage; the carousel suggests the
 * Group's services for that stage first, then fills from neighbouring stages,
 * never including the unit whose page this is. Stages and services come from
 * the journeys catalogue, so the recommendations stay in step with what the
 * journeys actually offer.
 */

type Stage = ServiceDef['stage'];

interface StageRecommendationsProps {
  /** The unit whose page this is, so it never recommends itself. */
  brand: LogoBrand;
  onNavigate: (screen: ScreenType) => void;
}

/** Where each journey service lives on the site. */
const SCREEN_FOR: Record<ServiceId, ScreenType> = {
  account: 'open-account',
  bank: 'bank',
  properties: 'properties',
  insurance: 'sbu',
  life: 'cbz-life',
  datvest: 'invest',
  agroyield: 'agro',
  redsphere: 'red-sphere',
  riskadvisory: 'risk-advisory',
  capital: 'capital',
};

/** The subsidiary record whose photo stands for each service. */
const SUBSIDIARY_FOR: Record<ServiceId, string> = {
  account: 'bank',
  bank: 'bank',
  properties: 'properties',
  insurance: 'insurance',
  life: 'life',
  datvest: 'datvest',
  agroyield: 'agri',
  redsphere: 'micro',
  riskadvisory: 'risk',
  capital: 'capital',
};

/** Services that belong to the unit whose page this is. */
const OWN_SERVICES: Partial<Record<LogoBrand, ServiceId[]>> = {
  bank: ['account', 'bank'],
  insurance: ['insurance'],
  life: ['life'],
  datvest: ['datvest'],
  properties: ['properties'],
  'agro-yield': ['agroyield'],
  'red-sphere': ['redsphere'],
  'risk-advisory': ['riskadvisory'],
  capital: ['capital'],
};

/** Plain-language labels for the picker. */
const STAGE_LABEL: Record<Stage, string> = {
  'Everyday money': 'Managing everyday money',
  'Home & assets': 'Buying a home or an asset',
  Protect: 'Protecting my family and things',
  Grow: 'Growing my savings',
  'Business & farm': 'Running a business or farm',
};

/** How many cards the fan shows at once, by viewport, via CSS below. */
const FAN = 4;

/** Tilt and lift per fan position, left to right, after the reference design. */
const FAN_POSE = [
  { rotate: -6, lift: 0 },
  { rotate: -2, lift: -14 },
  { rotate: 2, lift: -14 },
  { rotate: 6, lift: 0 },
];

/**
 * Journeys that share a business with another journey, and so would put two
 * cards wearing the same photo in the fan. "Open an Account" is CBZ Bank's
 * entry point and "Banking & Loans" is CBZ Bank's catalogue; one card for the
 * bank is enough here, and the bank page itself offers both.
 */
const COLLAPSED_INTO_ANOTHER: ServiceId[] = ['account'];

/**
 * The chosen stage first, then the stages either side of it in the order the
 * journeys list them, so the fan is never short of cards on a page that has
 * excluded its own service from a small stage.
 */
function recommend(stage: Stage, exclude: ServiceId[]): ServiceDef[] {
  const order = [...STAGES];
  const i = order.indexOf(stage);
  const ring: Stage[] = [stage];
  for (let d = 1; d < order.length; d++) {
    if (order[i + d]) ring.push(order[i + d]);
    if (order[i - d]) ring.push(order[i - d]);
  }
  const seen = new Set<ServiceId>();
  const out: ServiceDef[] = [];
  ring.forEach((s) => {
    SERVICE_LIST.filter((svc) => svc.stage === s).forEach((svc) => {
      if (exclude.includes(svc.id) || COLLAPSED_INTO_ANOTHER.includes(svc.id) || seen.has(svc.id)) return;
      seen.add(svc.id);
      out.push(svc);
    });
  });
  return out;
}

export const StageRecommendations: React.FC<StageRecommendationsProps> = ({ brand, onNavigate }) => {
  const siteImage = useSiteImage();
  const [stage, setStage] = useState<Stage>(STAGES[0]);
  const [offset, setOffset] = useState(0);

  const exclude = OWN_SERVICES[brand] ?? [];
  const services = useMemo(() => recommend(stage, exclude), [stage, exclude]);

  // Window of FAN cards starting at `offset`, wrapping, so the arrows never
  // dead-end. With fewer than FAN services the fan just shows what there is.
  const visible = useMemo(() => {
    if (services.length <= FAN) return services;
    return Array.from({ length: FAN }, (_, k) => services[(offset + k) % services.length]);
  }, [services, offset]);

  const canPage = services.length > FAN;
  const page = (dir: 1 | -1) =>
    setOffset((o) => (o + dir + services.length) % services.length);

  const pickStage = (next: Stage) => {
    setStage(next);
    setOffset(0);
  };

  return (
    <section
      aria-labelledby="stage-recommendations-heading"
      className="bg-white border-y border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="stage-recommendations-heading"
            className="text-2xl sm:text-3xl font-black uppercase tracking-[0.08em] text-cbz-blue leading-tight"
          >
            Find the right fit
            <br />
            for where you are.
          </h2>

          {/* The stage picker: a native select dressed as a pill button, so it
              is keyboard- and screen-reader-complete without a custom menu. */}
          <label className="mt-6 inline-flex items-center gap-3 text-sm text-cbz-grey">
            <span className="font-bold">I am</span>
            <span className="relative inline-flex">
              <select
                value={stage}
                onChange={(e) => pickStage(e.target.value as Stage)}
                aria-label="Choose your stage"
                className="appearance-none cursor-pointer pl-5 pr-11 py-2.5 rounded-full bg-cbz-blue text-white text-sm font-bold border border-cbz-blue hover:bg-cbz-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cbz-red/40 transition-colors"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s} className="text-cbz-ink bg-white">
                    {STAGE_LABEL[s]}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-4 h-4 text-white/80 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden
              />
            </span>
          </label>
        </div>

        {/* The fan. */}
        <div className="mt-8 sm:mt-10 flex justify-center items-end gap-4 sm:gap-6">
          {visible.map((svc, k) => {
            const pose = FAN_POSE[k] ?? FAN_POSE[0];
            const sub = SUBSIDIARIES.find((s) => s.id === SUBSIDIARY_FOR[svc.id]);
            const image = sub?.image ?? '/images/cbz-banking.webp';
            // Third and fourth cards appear from `sm` and `lg` respectively,
            // so the fan is two cards on a phone and four on a desktop.
            const reveal = k === 2 ? 'hidden sm:block' : k === 3 ? 'hidden lg:block' : '';
            return (
              <button
                key={`${svc.id}-${offset}`}
                type="button"
                onClick={() => onNavigate(SCREEN_FOR[svc.id])}
                aria-label={`${svc.name} from ${svc.entity}`}
                style={{ transform: `rotate(${pose.rotate}deg) translateY(${pose.lift}px)` }}
                className={`${reveal} group relative w-36 sm:w-44 lg:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_50px_-20px_rgba(0,37,84,0.45)] border border-white/60 cursor-pointer transition-transform duration-300 hover:!rotate-0 hover:!translate-y-[-12px] focus:outline-none focus-visible:ring-4 focus-visible:ring-cbz-red/40`}
              >
                <img
                  {...siteImage(`recommend.${svc.id}`, image, '')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-cbz-blue-900/85 via-cbz-blue-900/15 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                    {svc.entity}
                  </span>
                  <span className="block mt-1 text-base sm:text-lg font-black uppercase tracking-[0.06em] text-white leading-tight">
                    {svc.name}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Pager, centred under the fan, as in the reference. */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={!canPage}
            aria-label="Previous suggestions"
            className="w-11 h-11 rounded-full bg-slate-100 text-cbz-blue flex items-center justify-center hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={!canPage}
            aria-label="Next suggestions"
            className="w-11 h-11 rounded-full bg-cbz-blue text-white flex items-center justify-center hover:bg-cbz-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="sr-only" aria-live="polite">
            Showing {visible.map((s) => s.name).join(', ')} for {STAGE_LABEL[stage]}
          </span>
        </div>

        <p className="mt-6 text-center text-xs text-cbz-grey">
          {services.length} {services.length === 1 ? 'service' : 'services'} across the Group fit{' '}
          {STAGE_LABEL[stage].toLowerCase()}.{' '}
          <span className="text-slate-400">
            {SERVICES[visible[0]?.id ?? 'bank'].tagline}
          </span>
        </p>
      </div>
    </section>
  );
};
