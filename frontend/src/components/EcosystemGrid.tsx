import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Subsidiary, ScreenType } from '../types';
import { SUBSIDIARIES } from '../data/cbzData';
import { Logo } from './Logo';
import { BRAND_BY_KEY, LOGOS, LogoBrand } from '../brand/logos';
import { useSiteImage } from '../context/SiteImagesContext';
import { ClusterId, GROUP_CLUSTERS } from '../data/groupStructure';

interface EcosystemGridProps {
  onNavigate: (screen: ScreenType) => void;
}

/**
 * Path colour per cluster. The flow chart is coloured in runs, one colour per
 * cluster, so the four clusters read as four stretches of road. Hex, not
 * utility classes, because these feed SVG strokes and inline ring colours.
 */
const CLUSTER_COLOUR: Record<ClusterId, string> = {
  banking: '#002554',
  investments: '#3B82F6',
  insurance: '#E4002B',
  agro: '#10B981',
  philanthropy: '#636466',
};

/** Columns in the serpentine. Nine businesses make three rows of three. */
const COLS = 3;

interface NodePos {
  sub: Subsidiary;
  idx: number;
  x: number;
  y: number;
  row: number;
}

/**
 * The Group's businesses as a winding flow chart.
 *
 * On large screens the nine businesses sit on a serpentine road: three rows
 * of three, left to right, then right to left, joined by half-circle turns at
 * the ends. Each business is a white disc on the road holding its official
 * logo, with the category beneath. Below `lg` the road straightens into a
 * vertical timeline, because a three-column snake has no room for a 65px
 * lockup inside each disc at phone width.
 *
 * The feature panel underneath, and all the text in this section, are
 * unchanged from the previous layout; only the rail and the way the logos
 * are presented were redesigned.
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

  /** Two digits, so the numbers align: 01, 02 … 09. */
  const chapter = (index: number) => String(index + 1).padStart(2, '0');

  // Pre-load all subsidiary spotlight images into browser cache so tab switching is instantaneous
  useEffect(() => {
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

  // The serpentine is drawn in pixels from the measured width of its container,
  // so the strokes and discs keep their proportions at any viewport instead of
  // being stretched by a scaled viewBox.
  const roadRef = useRef<HTMLDivElement>(null);
  const [roadWidth, setRoadWidth] = useState(0);
  useEffect(() => {
    const el = roadRef.current;
    if (!el) return;
    const measure = () => setRoadWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const W = roadWidth;
  const disc = Math.min(116, Math.max(96, W / 9)); // disc diameter
  const rowH = Math.round(disc * 1.85); // disc + label + breathing room
  const stroke = Math.round(disc * 0.2);
  const rows = Math.ceil(total / COLS);
  const roadHeight = rows * rowH;

  const nodes: NodePos[] = SUBSIDIARIES.map((sub, idx) => {
    const row = Math.floor(idx / COLS);
    const step = idx % COLS;
    const col = row % 2 === 0 ? step : COLS - 1 - step;
    return {
      sub,
      idx,
      row,
      x: (W / COLS) * (col + 0.5),
      y: rowH * row + rowH * 0.42,
    };
  });

  const segments = nodes.slice(0, -1).map((a, i) => {
    const b = nodes[i + 1];
    let d: string;
    if (a.row === b.row) {
      d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    } else {
      // Turn at the end of a row: a half circle bulging outward, on the right
      // after a left-to-right row and on the left after a right-to-left one.
      const r = (b.y - a.y) / 2;
      const sweep = a.x > W / 2 ? 1 : 0;
      d = `M ${a.x} ${a.y} A ${r} ${r} 0 0 ${sweep} ${b.x} ${b.y}`;
    }
    return {
      d,
      colour: CLUSTER_COLOUR[a.sub.cluster],
      // Road already travelled is solid; road ahead is faded, like the guide.
      travelled: i < activeIndex,
      key: a.sub.id,
    };
  });

  /** Logo height so the lockup spans about 62% of the disc, by its own aspect. */
  const logoHeightFor = (sub: Subsidiary, diameter: number) => {
    const art = LOGOS[brandOf(sub)].full;
    const aspect = art ? art.aspect : 2;
    return Math.round((diameter * 0.62) / aspect);
  };

  const renderDisc = (node: NodePos, diameter: number) => {
    const isActive = node.idx === activeIndex;
    const colour = CLUSTER_COLOUR[node.sub.cluster];
    return (
      <button
        type="button"
        onClick={() => setSelectedSubId(node.sub.id)}
        aria-current={isActive ? 'true' : undefined}
        // The logo is decorative and the visible label is the category, so the
        // button needs the business name as its accessible name.
        aria-label={`${node.sub.name}, business ${node.idx + 1} of ${total}`}
        title={node.sub.name}
        style={{
          width: diameter,
          height: diameter,
          boxShadow: isActive
            ? `0 0 0 4px ${colour}, 0 14px 30px -10px rgba(0,0,0,0.35)`
            : '0 12px 24px -12px rgba(0,0,0,0.3)',
        }}
        className={`relative rounded-full bg-white border border-slate-200/80 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.04] ${
          isActive ? 'scale-[1.04]' : ''
        }`}
      >
        <Logo
          brand={brandOf(node.sub)}
          variant="full"
          height={logoHeightFor(node.sub, diameter)}
          clearSpace={false}
          decorative
        />
        <span
          className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full text-[10px] font-black tabular-nums text-white flex items-center justify-center shadow-sm"
          style={{ backgroundColor: colour }}
          aria-hidden
        >
          {chapter(node.idx)}
        </span>
      </button>
    );
  };

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

        {/* The road, large screens: a serpentine of three rows. */}
        <div
          ref={roadRef}
          className="hidden lg:block relative mt-6"
          style={{ height: W ? roadHeight : undefined }}
          aria-label="CBZ group businesses"
          role="group"
        >
          {W > 0 && (
            <>
              <svg
                className="absolute inset-0 pointer-events-none"
                width={W}
                height={roadHeight}
                viewBox={`0 0 ${W} ${roadHeight}`}
                aria-hidden
              >
                {segments.map((s) => (
                  <path
                    key={s.key}
                    d={s.d}
                    fill="none"
                    stroke={s.colour}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    opacity={s.travelled ? 1 : 0.32}
                    className="transition-opacity duration-500"
                  />
                ))}
              </svg>

              {nodes.map((node) => (
                <div
                  key={node.sub.id}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: node.x - disc / 2,
                    top: node.y - disc / 2,
                    width: disc,
                  }}
                >
                  {renderDisc(node, disc)}
                  <strong
                    className={`mt-3 text-[11px] font-bold text-center leading-tight transition-colors ${
                      node.idx === activeIndex ? 'text-cbz-blue' : 'text-cbz-grey'
                    }`}
                    style={{ width: disc * 1.6 }}
                  >
                    {node.sub.category}
                  </strong>
                </div>
              ))}
            </>
          )}
        </div>

        {/* The road, small screens: straightened into a vertical timeline. */}
        <ol className="lg:hidden relative mt-6 pl-3" aria-label="CBZ group businesses">
          <span
            aria-hidden
            className="absolute left-[calc(0.75rem+36px)] top-9 bottom-9 w-1.5 rounded-full bg-slate-200"
          />
          {nodes.map((node) => {
            const isActive = node.idx === activeIndex;
            const colour = CLUSTER_COLOUR[node.sub.cluster];
            return (
              <li key={node.sub.id} className="relative flex items-center gap-4 py-2">
                {node.idx < activeIndex && (
                  <span
                    aria-hidden
                    className="absolute left-[36px] top-1/2 h-[calc(100%+0.5rem)] w-1.5 rounded-full"
                    style={{ backgroundColor: colour }}
                  />
                )}
                <span className="relative shrink-0">{renderDisc(node, 76)}</span>
                <span className="min-w-0 flex flex-col items-start gap-1">
                  <strong
                    className={`text-sm font-bold ${isActive ? 'text-cbz-blue' : 'text-cbz-grey'}`}
                  >
                    {node.sub.category}
                  </strong>
                  {/* Straight to the business from the timeline, so a phone
                      visitor need not open the chapter card first. */}
                  <button
                    type="button"
                    onClick={() => onNavigate(node.sub.screen ?? 'group')}
                    aria-label={`Visit ${node.sub.name}`}
                    className="group inline-flex items-center gap-1 text-xs font-black cursor-pointer transition-colors hover:text-cbz-red"
                    style={{ color: colour }}
                  >
                    <span>Visit</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </span>
              </li>
            );
          })}
        </ol>

        {/* The chapter in view. Text unchanged; the card is now white to sit with
            the flow chart rather than against it. */}
        <article className="mt-6 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
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
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-sm border border-white/20 text-[10px] font-black tabular-nums tracking-wider text-white">
                {chapter(activeIndex)} / {chapter(total - 1)}
              </span>

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <span
                  className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-white"
                  style={{ backgroundColor: CLUSTER_COLOUR[selectedSub.cluster] }}
                >
                  {selectedCluster ? selectedCluster.name : selectedSub.category}
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-2 leading-snug">
                  “{selectedSub.tagline}”
                </p>
              </div>
            </div>

            {/* Copy side. */}
            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between">
              <div>
                {/* The eyebrow says what the business is; the badge over the
                    image says where it sits in the Group. No overlap. */}
                <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-cbz-grey mb-4">
                  <span
                    className="w-1.5 h-3 rounded-xs inline-block"
                    style={{ backgroundColor: CLUSTER_COLOUR[selectedSub.cluster] }}
                  />
                  <span>{selectedSub.category}</span>
                </p>

                <span className="inline-flex items-center justify-center h-12 px-4 rounded-xl bg-slate-50 border border-slate-200">
                  <Logo brand={brandOf(selectedSub)} variant="full" height={26} clearSpace={false} decorative />
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-cbz-blue mt-5 leading-tight">
                  {selectedSub.name}
                </h3>
                <p className="text-sm text-cbz-grey leading-relaxed mt-3 max-w-xl">
                  {selectedSub.description}
                </p>

                {selectedSub.isCore && (
                  <span className="inline-block mt-4 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cbz-blue-50 border border-cbz-blue-100 text-cbz-blue">
                    Core balance sheet flagship
                  </span>
                )}
              </div>

              {/* Footer: into this business, or on to the next one. */}
              <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {selectedSub.screen ? (
                  <button
                    onClick={() => onNavigate(selectedSub.screen!)}
                    className="group inline-flex items-center gap-2 text-sm font-black text-cbz-blue hover:text-cbz-red transition-colors cursor-pointer"
                  >
                    <span>Explore {selectedSub.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('group')}
                    className="group inline-flex items-center gap-2 text-sm font-black text-cbz-blue hover:text-cbz-red transition-colors cursor-pointer"
                  >
                    <span>See the full Group</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedSubId(nextSub.id)}
                  className="group text-left px-4 py-2.5 rounded-xl bg-cbz-blue hover:bg-cbz-blue-700 text-white transition-colors cursor-pointer inline-flex items-center gap-3"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-white/60">
                      Continue your journey
                    </span>
                    <span className="block text-xs font-black text-white">{nextSub.name}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
