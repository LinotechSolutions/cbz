import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Subsidiary, ScreenType } from '../types';
import { SUBSIDIARIES } from '../data/cbzData';
import { Logo } from './Logo';
import { BRAND_BY_KEY, LogoBrand } from '../brand/logos';
import { useSiteImage } from '../context/SiteImagesContext';
import { GROUP_CLUSTERS } from '../data/groupStructure';

interface EcosystemGridProps {
  onNavigate: (screen: ScreenType) => void;
}

/**
 * The Group's businesses, presented as a journey rather than a picker.
 *
 * The section is built on the chapter pattern: a two-part header, a progress
 * bar, a numbered rail, and one feature panel for the chapter in view, ending
 * with a link into that business and a prompt on to the next one. The rail
 * keeps the official subsidiary logos, which is the point of the section, and
 * adds the chapter number so position in the Group reads at a glance.
 */
export const EcosystemGrid: React.FC<EcosystemGridProps> = ({ onNavigate }) => {
  const siteImage = useSiteImage();
  const [selectedSubId, setSelectedSubId] = useState<string>('bank');

  const total = SUBSIDIARIES.length;
  const activeIndex = Math.max(
    0,
    SUBSIDIARIES.findIndex((s) => s.id === selectedSubId),
  );
  const selectedSub = SUBSIDIARIES[activeIndex];
  const nextSub = SUBSIDIARIES[(activeIndex + 1) % total];

  // Which of the Group's four operating clusters the selected company sits in.
  const selectedCluster = GROUP_CLUSTERS.find((c) => c.id === selectedSub.cluster);

  /** Two digits, so the rail numbers align: 01, 02 … 09. */
  const chapter = (index: number) => String(index + 1).padStart(2, '0');

  // Pre-load all subsidiary spotlight images into browser cache so tab switching is instantaneous
  React.useEffect(() => {
    SUBSIDIARIES.forEach((sub) => {
      if (sub.image) {
        const img = new Image();
        img.src = sub.image;
      }
    });
  }, []);

  const brandOf = (sub: Subsidiary): LogoBrand =>
    BRAND_BY_KEY[sub.id] ||
    BRAND_BY_KEY[sub.name.toLowerCase().replace(/^cbz\s+/, '')] ||
    'holdings';

  return (
    <section id="group-businesses" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: the statement on the left, the invitation on the right. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cbz-red mb-3">
              <span className="w-1.5 h-3.5 bg-cbz-red rounded-xs inline-block" />
              <span>A group that moves with you</span>
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-cbz-blue leading-[1.08]">
              Nine businesses.
              <br />
              <em className="italic font-semibold text-cbz-grey">One connected group.</em>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10">
            <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-cbz-blue/50 mb-2">
              Your CBZ path
            </span>
            <p className="text-sm text-cbz-grey leading-relaxed">
              A mortgage that brings its own home insurance. A harvest that funds next season.
              Pick the business closest to where you are today, and see what it opens up elsewhere
              in the Group.
            </p>
          </div>
        </div>

        {/* Progress through the nine chapters. */}
        <div
          className="mt-8 h-1 w-full bg-slate-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={activeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Business ${activeIndex + 1} of ${total}`}
        >
          <span
            className="block h-full bg-cbz-red rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* The rail. Scrolls horizontally on small screens rather than wrapping
            into rows, so the chapter order stays readable. */}
        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-5 lg:grid-cols-9 sm:overflow-visible"
          aria-label="CBZ group businesses"
        >
          {SUBSIDIARIES.map((sub, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                type="button"
                key={sub.id}
                onClick={() => setSelectedSubId(sub.id)}
                aria-current={isActive ? 'true' : undefined}
                // The logo is decorative and the visible label is the category,
                // so the button needs the business name as its accessible name.
                aria-label={`${sub.name}, business ${idx + 1} of ${total}`}
                title={sub.name}
                className={`shrink-0 w-32 sm:w-auto rounded-xl border p-2.5 flex flex-col items-center justify-between gap-1 h-24 transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white border-cbz-blue ring-2 ring-cbz-blue/10 shadow-xs'
                    : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`text-[10px] font-black tabular-nums tracking-wider transition-colors ${
                    isActive ? 'text-cbz-red' : 'text-slate-400'
                  }`}
                >
                  {chapter(idx)}
                </span>
                <span className="h-7 flex items-center justify-center">
                  <Logo brand={brandOf(sub)} variant="full" height={24} clearSpace={false} decorative />
                </span>
                <strong className="text-[9px] sm:text-[10px] font-bold text-cbz-ink truncate max-w-full">
                  {sub.category}
                </strong>
              </button>
            );
          })}
        </div>

        {/* The chapter in view. */}
        <article className="mt-5 rounded-xl sm:rounded-2xl overflow-hidden border border-cbz-blue-900 bg-cbz-blue shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image side, stamped with the chapter number. */}
            <div className="lg:col-span-5 relative bg-cbz-blue-900 min-h-[190px] sm:min-h-[240px] lg:min-h-full">
              <img
                {...siteImage(`ecosystem.${selectedSub.id}`, selectedSub.image, selectedSub.name)}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-85"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/cbz-banking.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cbz-blue-900 via-cbz-blue-900/35 to-transparent" />

              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-sm border border-white/20 text-[10px] font-black tabular-nums tracking-wider text-white">
                {chapter(activeIndex)} / {chapter(total - 1)}
              </span>

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-cbz-red text-white">
                  {selectedCluster ? selectedCluster.name : selectedSub.category}
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-2 leading-snug">
                  “{selectedSub.tagline}”
                </p>
              </div>
            </div>

            {/* Copy side. */}
            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between text-white">
              <div>
                {/* The eyebrow says what the business is; the badge over the
                    image says where it sits in the Group. No overlap. */}
                <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-white/60 mb-4">
                  <span className="w-1.5 h-3 bg-cbz-red rounded-xs inline-block" />
                  <span>{selectedSub.category}</span>
                </p>

                {/* The logo stands in for the chapter icon: it is the one mark
                    that identifies the business, so it leads the panel. */}
                <span className="inline-flex items-center justify-center h-12 px-4 rounded-xl bg-white/95 border border-white/40">
                  <Logo brand={brandOf(selectedSub)} variant="full" height={26} clearSpace={false} decorative />
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-5 leading-tight">
                  {selectedSub.name}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed mt-3 max-w-xl">
                  {selectedSub.description}
                </p>

                {selectedSub.isCore && (
                  <span className="inline-block mt-4 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 border border-white/25 text-white">
                    Core balance sheet flagship
                  </span>
                )}
              </div>

              {/* Footer: into this business, or on to the next one. */}
              <div className="mt-7 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {selectedSub.screen ? (
                  <button
                    onClick={() => onNavigate(selectedSub.screen!)}
                    className="group inline-flex items-center gap-2 text-sm font-black text-white hover:text-cbz-red transition-colors cursor-pointer"
                  >
                    <span>Explore {selectedSub.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('group')}
                    className="group inline-flex items-center gap-2 text-sm font-black text-white hover:text-cbz-red transition-colors cursor-pointer"
                  >
                    <span>See the full Group</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedSubId(nextSub.id)}
                  className="group text-left px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer inline-flex items-center gap-3"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-white/55">
                      Continue your journey
                    </span>
                    <span className="block text-xs font-black text-white">{nextSub.name}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
