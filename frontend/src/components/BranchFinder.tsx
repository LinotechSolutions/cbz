import React, { useState } from 'react';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { BRANCH_HOURS, CONTACT, branchHoursLine, tbc } from '../data/facts';

/**
 * Branch and ATM finder.
 *
 * The homepage, the contact modal and the footer all linked to
 * `#branch-directory`, but no element with that id existed, so "Branch & ATM
 * map" went nowhere. This section gives the anchor a home: an embedded Google
 * Maps search for CBZ branches, a toggle for ATMs, and one-tap "open in Maps"
 * links that hand off to the visitor's own maps app for directions.
 *
 * The map is Google's own search results, which need no API key and no branch
 * dataset. A curated, bank-maintained list of branches with hours and services
 * is the right next step; until the bank supplies it, the panel says so.
 */

type Mode = 'branches' | 'atms';

const QUERY: Record<Mode, string> = {
  branches: 'CBZ Bank branch Zimbabwe',
  atms: 'CBZ Bank ATM Zimbabwe',
};

const embedUrl = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
const openUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const BranchFinder: React.FC = () => {
  const [mode, setMode] = useState<Mode>('branches');
  const [town, setTown] = useState('');

  const query = town.trim() ? `CBZ Bank ${mode === 'atms' ? 'ATM' : 'branch'} ${town.trim()} Zimbabwe` : QUERY[mode];

  return (
    <section
      id="branch-directory"
      aria-labelledby="branch-finder-heading"
      className="scroll-mt-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Controls. */}
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-cbz-red mb-1.5">
              <span className="w-4 h-0.5 bg-cbz-red inline-block" />
              <span>Find us</span>
            </p>
            <h2
              id="branch-finder-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-cbz-blue leading-tight"
            >
              Branches &amp; ATMs
            </h2>
            <p className="mt-2 text-sm text-cbz-grey leading-relaxed">
              Search the map, or open it in your own maps app for directions.
            </p>

            <div className="mt-5 inline-flex p-1 bg-slate-100 rounded-xl">
              {(['branches', 'atms'] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    mode === m ? 'bg-white text-cbz-blue shadow-xs' : 'text-slate-600 hover:text-cbz-blue'
                  }`}
                >
                  {m === 'branches' ? 'Branches' : 'ATMs'}
                </button>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-cbz-grey mb-1.5">
                Town or suburb
              </span>
              <span className="relative block">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
                <input
                  type="search"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  placeholder="e.g. Borrowdale, Bulawayo, Mutare"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-cbz-blue text-cbz-ink placeholder:text-slate-400"
                />
              </span>
            </label>

            <a
              href={openUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full px-5 py-3 rounded-xl bg-cbz-blue hover:bg-cbz-blue-700 text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <dl className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-cbz-grey">Branches</dt>
                <dd className="font-bold text-cbz-blue text-right">{branchHoursLine()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-cbz-grey">{BRANCH_HOURS.sunday.label}</dt>
                <dd className="font-bold text-cbz-blue">{BRANCH_HOURS.sunday.hours}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-cbz-grey">ATMs</dt>
                <dd className="font-bold text-cbz-blue">24/7</dd>
              </div>
              <div className="flex justify-between gap-4 pt-2 border-t border-slate-200">
                <dt className="text-cbz-grey">Can’t find a branch?</dt>
                <dd>
                  <a href={CONTACT.phoneHref} className="font-bold text-cbz-blue hover:text-cbz-red tabular-nums">
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              Map results come from Google. A full branch list with services and opening hours per branch:{' '}
              {tbc('branch list from the bank')}.
            </p>
          </div>

          {/* The map. Keyed on the query so a new search reloads the frame. */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm aspect-[4/3] sm:aspect-[16/9]">
              <iframe
                key={query}
                title={`Map of CBZ ${mode === 'atms' ? 'ATMs' : 'branches'}${town.trim() ? ` in ${town.trim()}` : ''}`}
                src={embedUrl(query)}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
