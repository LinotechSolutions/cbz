import React, { useState } from 'react';
import { ArrowRight, Bell, ExternalLink, MessageSquare, PhoneCall, Smartphone } from 'lucide-react';
import { CONTACT, branchHoursLine } from '../data/facts';
import { useAnnouncements } from '../hooks/useCbzData';

/**
 * Support channels and the latest notices, in one section.
 *
 * This replaces two full sections: a four-card contact directory and a tabbed
 * press room. Both ran long, and the contact details were already in three
 * other places (the utility bar, the contact modal and the footer), so the
 * directory was the fourth telling. What is left is the shortest version that
 * still works: three recent notices, expandable, and a compact help card that
 * hands off to the contact modal for the full channel list.
 *
 * The section keeps the id `announcements-section`, because the notice bar at
 * the top of the page scrolls to it.
 */

interface HelpAndNoticesProps {
  onOpenContact?: () => void;
}

const INITIAL_COUNT = 3;

export const HelpAndNotices: React.FC<HelpAndNoticesProps> = ({ onOpenContact }) => {
  const { announcements } = useAnnouncements();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? announcements : announcements.slice(0, INITIAL_COUNT);
  const hiddenCount = announcements.length - visible.length;

  return (
    <section
      id="announcements-section"
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Latest notices */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E4002B] mb-1.5">
              <Bell className="w-3.5 h-3.5" />
              <span>Official notices and disclosures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#002554]">
              Latest from CBZ
            </h2>

            <div className="mt-6 bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-2xs">
              {visible.map((item) => (
                <article key={item.id} className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                    <span className="text-cbz-grey">{item.date}</span>
                    <span className="text-slate-300">·</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#002554] uppercase tracking-wider">
                      {item.tag}
                    </span>
                    {item.isUrgent && (
                      <span className="px-2 py-0.5 rounded bg-red-50 text-[#E4002B] uppercase tracking-wider">
                        Important
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#002554] mt-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cbz-grey mt-1.5 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  {item.circularRef && (
                    <div className="text-[11px] text-slate-400 font-semibold mt-2 tabular-nums">
                      {item.circularRef}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {(hiddenCount > 0 || showAll) && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="mt-4 text-xs font-bold text-[#E4002B] hover:text-[#C50025] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>{showAll ? 'Show fewer notices' : `View all ${announcements.length} notices`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Help. The full channel list is in the contact modal and the footer,
              so this is the short version: the three channels people use most. */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E4002B] mb-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#002554]">
              Need a hand?
            </h2>

            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-red-50 text-[#E4002B] flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-cbz-grey uppercase tracking-wider">Call us</div>
                    <a
                      href={CONTACT.phoneHref}
                      className="text-base font-black text-[#002554] tabular-nums hover:text-[#E4002B] transition-colors"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-cbz-grey uppercase tracking-wider">WhatsApp</div>
                    <a
                      href={CONTACT.whatsapp.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-black text-[#002554] tabular-nums hover:text-emerald-600 transition-colors"
                    >
                      {CONTACT.whatsapp.display}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-50 text-[#002554] flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-cbz-grey uppercase tracking-wider">
                      Dial from any phone
                    </div>
                    <a
                      href={CONTACT.ussd.href}
                      className="text-base font-black text-[#002554] tabular-nums hover:text-[#E4002B] transition-colors"
                    >
                      {CONTACT.ussd.display}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-1">
                <div className="text-xs text-cbz-grey">
                  <span className="font-bold text-[#002554]">Branches:</span> {branchHoursLine()}
                </div>
                <div className="text-xs text-cbz-grey">
                  <span className="font-bold text-[#002554]">Digital banking:</span> 24/7
                </div>
              </div>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="mt-5 w-full px-4 py-2.5 rounded-xl bg-[#002554] hover:bg-[#0A3E80] text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>All contact channels</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
