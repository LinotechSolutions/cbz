import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LogoBrand } from '../brand/logos';
import { CampaignSlot } from '../data/sbuPages';
import { CONTACT } from '../data/facts';
import { Logo } from './Logo';
import { useSiteImage } from '../context/SiteImagesContext';

/**
 * The promotional banner, after the supplied reference: a dark panel with the
 * unit's logo top-left, the offer figure large beside it, a white note strip,
 * a bold colour block carrying tagline, headline and subline, a pill CTA with
 * the phone number and website beneath, and a hexagonal photo on the right
 * with rows of dots and a few loose line flourishes around it.
 *
 * Brand colours stand in for the reference's: navy for the dark panel, red
 * for the colour block and the CTA. The photo is the campaign's own image,
 * or the unit's hero image until Marketing supplies one.
 *
 * A `[TBC` campaign renders the full design with a "To be confirmed" chip, so
 * Marketing sees the template it is filling rather than a dashed box.
 */

interface CampaignBannerProps {
  campaign: CampaignSlot;
  brand: LogoBrand;
  /** Used when the campaign has no image of its own. */
  fallbackImage?: string;
  onCta: (cta: NonNullable<CampaignSlot['cta']>) => void;
  /** Tiles are the compact form: no photo, smaller type. */
  compact?: boolean;
}

/** A row of hollow dots, like the reference's beaded lines. Decorative. */
const Dots: React.FC<{ className?: string; count?: number }> = ({ className = '', count = 9 }) => (
  <span aria-hidden className={`flex gap-1 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <span key={i} className="w-2 h-2 rounded-full border border-white/50" />
    ))}
  </span>
);

/** A loose, hand-drawn-looking curl. Decorative. */
const Curl: React.FC<{ className?: string; flip?: boolean }> = ({ className = '', flip }) => (
  <svg
    aria-hidden
    viewBox="0 0 80 80"
    className={`${className} ${flip ? '-scale-x-100' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M6 62c18-2 30-14 30-30 0-10-6-16-13-16-8 0-11 7-8 13 3 7 14 6 20-2" />
    <path d="M40 28c14-10 32-4 36 10" />
  </svg>
);

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  campaign,
  brand,
  fallbackImage,
  onCta,
  compact = false,
}) => {
  const siteImage = useSiteImage();
  const pending = campaign.title.startsWith('[TBC');
  const image = campaign.image ?? fallbackImage;
  const imageKey = campaign.imageKey ?? `campaign.${brand}`;

  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] bg-cbz-blue text-white shadow-xl ${
        compact ? 'p-6 sm:p-7' : 'p-6 sm:p-8 lg:p-10'
      }`}
    >
      {/* Flourishes. */}
      <Dots className="absolute top-6 right-[14%] opacity-70" />
      <Dots className="absolute top-9 right-[12%] opacity-50" />
      <Dots className="absolute bottom-7 left-6 opacity-60" count={8} />
      <Dots className="absolute bottom-10 left-9 opacity-40" count={8} />
      <Curl className="absolute -top-2 right-[26%] w-20 h-20 text-white/40" />
      <Curl className="absolute bottom-4 right-4 w-24 h-24 text-white/25" flip />

      <div
        className={`relative grid gap-8 items-center ${
          compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
        }`}
      >
        {/* Copy side. */}
        <div className={compact ? '' : 'lg:col-span-7'}>
          <div className="flex items-start justify-between gap-6">
            <span className="inline-flex items-center justify-center h-12 px-3 rounded-xl bg-white/95">
              <Logo brand={brand} variant="full" height={26} clearSpace={false} decorative />
            </span>
            {campaign.offer && (
              <span className="text-right leading-none">
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  {campaign.offer}
                </span>
              </span>
            )}
          </div>

          {campaign.note && (
            <div className="mt-6 rounded-xl bg-white text-cbz-ink px-5 py-4">
              <strong className="block text-xs font-extrabold text-cbz-blue">{campaign.note.lead}</strong>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">{campaign.note.detail}</p>
            </div>
          )}

          <div
            className={`mt-6 rounded-[1.5rem] bg-cbz-red text-white ${
              compact ? 'px-6 py-6' : 'px-7 py-7 sm:px-9 sm:py-9'
            }`}
          >
            {campaign.tagline && (
              <p className="italic text-base sm:text-lg text-white/90 leading-snug">{campaign.tagline}</p>
            )}
            <h3
              className={`font-black tracking-tight leading-tight ${
                compact ? 'text-xl sm:text-2xl mt-1' : 'text-2xl sm:text-3xl lg:text-4xl mt-1.5'
              }`}
            >
              {campaign.title}
            </h3>
            {campaign.body && (
              <p className={`mt-2 text-white/90 leading-snug ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
                {campaign.body}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            {campaign.cta && (
              <button
                type="button"
                onClick={() => onCta(campaign.cta!)}
                className="px-7 py-3 rounded-full bg-cbz-red hover:bg-cbz-red-hover text-white text-sm font-black uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>{campaign.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <span className="leading-tight">
              <a
                href={CONTACT.phoneHref}
                className="block text-xl sm:text-2xl font-black tabular-nums text-white hover:text-red-200 transition-colors"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/80 hover:text-white transition-colors"
              >
                {CONTACT.website.display}
              </a>
            </span>
          </div>

          {pending && (
            <span className="mt-5 inline-flex items-center text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-1 rounded-md">
              To be confirmed with Marketing
            </span>
          )}
        </div>

        {/* Photo side: a hexagon, as in the reference. */}
        {!compact && image && (
          <div className="lg:col-span-5 relative">
            <div
              className="relative aspect-[4/5] sm:aspect-[5/6] max-w-md mx-auto"
              style={{ clipPath: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)' }}
            >
              <img
                {...siteImage(imageKey, image, '')}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* The reference fades the photo's left edge into the panel. */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cbz-blue/80 to-transparent"
              />
            </div>
            <Dots className="absolute top-8 left-[18%] opacity-60" />
          </div>
        )}
      </div>
    </article>
  );
};
