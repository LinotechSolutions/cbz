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
      className={`relative overflow-hidden rounded-2xl bg-cbz-blue text-white shadow-xl ${
        compact ? 'p-5' : 'p-5 sm:p-6'
      }`}
    >
      {/* Flourishes, kept to two so they read as detail rather than clutter. */}
      <Dots className="absolute top-4 right-[14%] opacity-60" />
      <Curl className="absolute bottom-2 right-2 w-16 h-16 text-white/25" flip />

      {/* Height is set by the copy, not the photo: the photo column is a fixed
          square that fits beside the copy instead of dictating the row. */}
      <div
        className={`relative grid gap-5 lg:gap-6 items-center ${
          compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
        }`}
      >
        {/* Copy side. */}
        <div className={compact ? '' : 'lg:col-span-8'}>
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center justify-center h-9 px-2.5 rounded-lg bg-white/95">
              <Logo brand={brand} variant="full" height={20} clearSpace={false} decorative />
            </span>
            {campaign.offer && (
              <span className="text-right text-2xl sm:text-3xl font-black tracking-tight leading-none">
                {campaign.offer}
              </span>
            )}
          </div>

          {campaign.note && (
            <p className="mt-3 text-[11px] text-white/80 leading-snug">
              <strong className="font-extrabold text-white">{campaign.note.lead}.</strong> {campaign.note.detail}
            </p>
          )}

          <div className={`mt-3 rounded-xl bg-cbz-red text-white ${compact ? 'px-4 py-3.5' : 'px-5 py-4'}`}>
            {campaign.tagline && (
              <p className="italic text-sm text-white/90 leading-snug">{campaign.tagline}</p>
            )}
            <h3 className={`font-black tracking-tight leading-tight ${compact ? 'text-lg mt-0.5' : 'text-xl sm:text-2xl mt-1'}`}>
              {campaign.title}
            </h3>
            {campaign.body && (
              <p className="mt-1 text-sm text-white/90 leading-snug">{campaign.body}</p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {campaign.cta && (
              <button
                type="button"
                onClick={() => onCta(campaign.cta!)}
                className="px-4 py-2 rounded-full bg-cbz-red hover:bg-cbz-red-hover text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>{campaign.cta.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="leading-tight text-sm">
              <a href={CONTACT.phoneHref} className="font-black tabular-nums text-white hover:text-red-200 transition-colors">
                {CONTACT.phoneDisplay}
              </a>
              <span className="text-white/50 mx-2">·</span>
              <a
                href={CONTACT.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                {CONTACT.website.display}
              </a>
            </span>
            {pending && (
              <span className="inline-flex items-center text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">
                To be confirmed with Marketing
              </span>
            )}
          </div>
        </div>

        {/* Photo side: a hexagon, as in the reference, at a fixed size. */}
        {!compact && image && (
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              className="relative w-40 h-44 sm:w-48 sm:h-52 lg:w-52 lg:h-56"
              style={{ clipPath: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)' }}
            >
              <img
                {...siteImage(imageKey, image, '')}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cbz-blue/80 to-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
