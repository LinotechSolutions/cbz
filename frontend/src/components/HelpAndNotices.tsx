import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Clock,
  FileText,
  Headset,
  LayoutGrid,
  PhoneCall,
  Search,
  Smartphone,
} from 'lucide-react';
import { CONTACT, branchHoursLine } from '../data/facts';
import { Announcement } from '../data/announcementsData';
import { useAnnouncements } from '../hooks/useCbzData';
import { useSiteImage } from '../context/SiteImagesContext';
import { WhatsAppIcon } from './ui/BrandIcons';

/**
 * Latest notices and support, after the supplied design: a white notices
 * card on the left with filter pills, search, and dated rows with a
 * thumbnail, badges, title, summary and reference, and a navy "Need a hand?"
 * panel on the right with call and WhatsApp cards, hours and digital banking
 * rows, and a button to the full channel list.
 *
 * The section keeps the id `announcements-section`, because the notice bar at
 * the top of the page and the footer both scroll to it.
 *
 * There is no notice detail page. "Read notice" expands the row to the full
 * summary in place, and the PDF chip states the file size the notice carries.
 */

interface HelpAndNoticesProps {
  onOpenContact?: () => void;
}

type Filter = 'all' | 'customer' | 'shareholder' | 'regulatory' | 'important';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'customer', label: 'Customer Notices' },
  { id: 'shareholder', label: 'Shareholder Notices' },
  { id: 'regulatory', label: 'Regulatory' },
  { id: 'important', label: 'Important Updates' },
];

const INITIAL_COUNT = 3;

/** Thumbnail by category, until a notice carries its own image in the CMS. */
const THUMB_FOR: Record<Announcement['category'], string> = {
  shareholder: '/images/cbz-banking.webp',
  customer: '/images/cbz-banking-branch.webp',
  regulatory: '/images/cbz-protection.webp',
  operational: '/images/cbz-payments.webp',
};

/** "28 March 2026" -> { day: "28", rest: "Mar 2026" }. Falls back to the raw string. */
const splitDate = (date: string) => {
  const [day, month, year] = date.split(' ');
  if (!day || !month || !year) return { day: date, rest: '' };
  return { day, rest: `${month.slice(0, 3)} ${year}` };
};

const matches = (a: Announcement, filter: Filter, query: string) => {
  const byFilter =
    filter === 'all' ||
    (filter === 'important' ? Boolean(a.isUrgent) : a.category === filter || (filter === 'customer' && a.category === 'operational'));
  const q = query.trim().toLowerCase();
  const byQuery =
    !q ||
    a.title.toLowerCase().includes(q) ||
    a.summary.toLowerCase().includes(q) ||
    a.tag.toLowerCase().includes(q);
  return byFilter && byQuery;
};

export const HelpAndNotices: React.FC<HelpAndNoticesProps> = ({ onOpenContact }) => {
  const siteImage = useSiteImage();
  const { announcements } = useAnnouncements();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const matching = useMemo(
    () => announcements.filter((a) => matches(a, filter, query)),
    [announcements, filter, query],
  );
  // A filter or a search is a request to browse, so show everything that matches.
  const browsing = showAll || filter !== 'all' || query.trim().length > 0;
  const visible = browsing ? matching : matching.slice(0, INITIAL_COUNT);
  const hidden = matching.length - visible.length;

  return (
    <section
      id="announcements-section"
      className="relative overflow-hidden bg-slate-50 border-b border-slate-200"
    >
      {/* Header photo, top right, fading into the section. Decorative. */}
      <div aria-hidden className="absolute top-0 right-0 w-full lg:w-[58%] h-56 pointer-events-none">
        <img
          {...siteImage('notices.header', '/images/cbz-banking.webp', '')}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
        <span className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Heading. */}
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cbz-red mb-2">
            <span className="w-4 h-0.5 bg-cbz-red inline-block" />
            <span>News &amp; updates</span>
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-cbz-blue leading-tight">
            Latest from CBZ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cbz-grey leading-relaxed">
            Stay informed with the latest announcements, notices and updates from CBZ Holdings.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Notices. */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
            {/* Filters and search. */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="flex flex-wrap gap-2 flex-1" role="tablist" aria-label="Filter notices">
                {FILTERS.map((f) => {
                  const active = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(f.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        active
                          ? 'bg-cbz-blue text-white'
                          : 'bg-cbz-blue-50 text-cbz-blue hover:bg-cbz-blue-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <label className="relative md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search notices..."
                  aria-label="Search notices"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:border-cbz-blue text-cbz-ink placeholder:text-slate-400"
                />
              </label>
            </div>

            {/* Rows. */}
            <ul className="mt-5 space-y-4">
              {visible.length === 0 && (
                <li className="py-10 text-center text-sm text-cbz-grey">No notices match.</li>
              )}
              {visible.map((item) => {
                const { day, rest } = splitDate(item.date);
                const open = openId === item.id;
                const urgent = Boolean(item.isUrgent);
                return (
                  <li
                    key={item.id}
                    className={`relative rounded-xl border p-4 sm:p-5 ${
                      urgent
                        ? 'bg-cbz-red-50 border-red-100 border-l-4 border-l-cbz-red'
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_auto_1fr_auto] gap-4 sm:gap-5 items-start">
                      {/* Date. */}
                      <div className="w-14 shrink-0">
                        <span className="block text-2xl font-black text-cbz-blue leading-none">{day}</span>
                        <span className="block mt-1 text-[11px] font-semibold text-cbz-grey">{rest}</span>
                      </div>

                      {/* Thumbnail. */}
                      <div className="hidden sm:block w-36 h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          {...siteImage(`notice.${item.id}`, THUMB_FOR[item.category], '')}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Copy. */}
                      <div className="min-w-0 col-span-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-cbz-blue-50 text-cbz-blue text-[10px] font-black uppercase tracking-wider">
                            {item.tag}
                          </span>
                          {urgent && (
                            <span className="px-2 py-0.5 rounded bg-red-100 text-cbz-red text-[10px] font-black uppercase tracking-wider">
                              Important
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-base sm:text-lg font-black text-cbz-blue leading-snug">
                          {item.title}
                        </h3>
                        <p
                          id={`notice-${item.id}`}
                          className={`mt-2 text-sm text-cbz-grey leading-relaxed ${open ? '' : 'line-clamp-2'}`}
                        >
                          {item.summary}
                        </p>
                        {item.circularRef && (
                          <div className="mt-2.5 text-[11px] font-semibold text-slate-400 tabular-nums">
                            {item.circularRef}
                          </div>
                        )}
                      </div>

                      {/* Actions. */}
                      <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-4 sm:pl-2">
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : item.id)}
                          aria-expanded={open}
                          aria-controls={`notice-${item.id}`}
                          className="group inline-flex items-center gap-1.5 text-sm font-black text-cbz-red hover:text-cbz-red-hover transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span>{open ? 'Close notice' : 'Read notice'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        {item.fileSize && (
                          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-cbz-grey">
                            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-cbz-red">
                              <FileText className="w-4 h-4" />
                            </span>
                            {item.fileSize.replace(/^PDF\s*·\s*/, '')}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* View all. */}
            {(hidden > 0 || showAll) && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-5 w-full rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 py-3.5 text-sm font-black text-cbz-blue inline-flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 text-cbz-blue" />
                <span>{showAll ? 'Show fewer announcements' : 'View all announcements'}</span>
                <ArrowRight className="w-4 h-4 text-cbz-red" />
              </button>
            )}
          </div>

          {/* Support. */}
          <aside className="lg:col-span-4 relative overflow-hidden rounded-2xl bg-cbz-blue text-white p-5 sm:p-6 shadow-xl">
            <img
              {...siteImage('support.hero', '/images/cbz-banking-branch.webp', '')}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-cbz-blue/70 via-cbz-blue to-cbz-blue pointer-events-none"
            />

            <div className="relative">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-300 mb-2">
                <span className="w-4 h-0.5 bg-cbz-red inline-block" />
                <span>Support</span>
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Need a hand?</h2>
              <p className="mt-2 text-sm text-white/80">We’re here to help, whenever you need us.</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={CONTACT.phoneHref}
                  className="group bg-white text-cbz-ink rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="w-12 h-12 rounded-full bg-cbz-red text-white flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </span>
                  <span className="mt-5 text-sm font-bold text-cbz-grey">Call us</span>
                  <span className="mt-1 text-lg font-black text-cbz-blue tabular-nums leading-tight">
                    {CONTACT.phoneDisplay}
                  </span>
                  <span className="mt-1.5 text-xs text-cbz-grey leading-snug">Speak to our customer support team.</span>
                  <span className="mt-4 self-end w-9 h-9 rounded-full bg-slate-100 group-hover:bg-cbz-blue text-cbz-blue group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>

                <a
                  href={CONTACT.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white text-cbz-ink rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="w-12 h-12 rounded-full bg-whatsapp text-cbz-blue-900 flex items-center justify-center">
                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                  </span>
                  <span className="mt-5 text-sm font-bold text-cbz-grey">WhatsApp</span>
                  <span className="mt-1 text-lg font-black text-cbz-blue tabular-nums leading-tight">
                    {CONTACT.whatsapp.display}
                  </span>
                  <span className="mt-1.5 text-xs text-cbz-grey leading-snug">Chat with our team.</span>
                  <span className="mt-4 self-end w-9 h-9 rounded-full bg-slate-100 group-hover:bg-cbz-blue text-cbz-blue group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>

              <ul className="mt-4 bg-white text-cbz-ink rounded-2xl divide-y divide-slate-100 shadow-sm">
                <li className="flex items-center gap-4 p-4">
                  <span className="w-11 h-11 rounded-full bg-cbz-blue text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black text-cbz-blue">Branch operating hours</span>
                    <span className="block text-xs text-cbz-grey mt-0.5">{branchHoursLine()}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-cbz-blue shrink-0" aria-hidden />
                </li>
                <li className="flex items-center gap-4 p-4">
                  <span className="w-11 h-11 rounded-full bg-cbz-blue text-white flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black text-cbz-blue">Digital banking</span>
                    <span className="block text-xs text-cbz-grey mt-0.5">Available 24/7</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-cbz-blue shrink-0" aria-hidden />
                </li>
              </ul>

              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="mt-4 w-full rounded-2xl bg-cbz-blue-900 hover:bg-black/60 border border-white/15 px-5 py-4 inline-flex items-center gap-4 transition-colors cursor-pointer"
                >
                  <Headset className="w-6 h-6 shrink-0" />
                  <span className="flex-1 text-left text-sm font-black">Explore all support options</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
