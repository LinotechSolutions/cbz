import React from 'react';
import { ArrowLeft, Download, ExternalLink, Info } from 'lucide-react';
import { ScreenType } from '../types';
import { INFO_PAGES, InfoPageId, isPending } from '../data/infoPages';
import { Logo } from './Logo';

interface InfoPageProps {
  page: InfoPageId;
  onNavigate: (screen: ScreenType) => void;
}

/**
 * A document page: title, metadata, numbered sections, contact channels and an
 * optional download. Used for the General Business Conditions, the Privacy
 * Policy, Tip-offs Anonymous and the CBZ Foundation.
 *
 * Any page still carrying placeholder text shows a review notice at the top
 * naming the owner who has to supply it. The notice goes when the last
 * placeholder does.
 */
export const InfoPage: React.FC<InfoPageProps> = ({ page, onNavigate }) => {
  const def = INFO_PAGES[page];
  const pending = isPending(def);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-bold text-slate-500 hover:text-cbz-red flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <header className="mt-6">
          <Logo brand="holdings" height={34} clearSpace={false} />
          <p className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cbz-red">
            <span className="w-1.5 h-3.5 bg-cbz-red rounded-xs inline-block" />
            <span>{def.eyebrow}</span>
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-cbz-blue tracking-tight leading-tight">
            {def.title}
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">{def.intro}</p>

          {def.meta && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              {def.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-cbz-grey">{m.label}</dt>
                  <dd className="font-bold text-cbz-blue">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {pending && (
          <div
            role="status"
            className="mt-8 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 px-4 py-3 text-sm flex items-start gap-3"
          >
            <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
            <p>
              <strong>In review.</strong> Parts of this page are marked <code className="font-mono text-xs">[TBC]</code>{' '}
              and await the approved wording from {def.owner}. Regulatory and legal text is reproduced exactly as
              approved, never paraphrased, so these passages stay blank until it arrives.
            </p>
          </div>
        )}

        {def.download && (
          <a
            href={def.download.href.startsWith('[TBC') ? undefined : def.download.href}
            aria-disabled={def.download.href.startsWith('[TBC') || undefined}
            className={`mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-colors ${
              def.download.href.startsWith('[TBC')
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-cbz-blue hover:bg-cbz-blue-700 text-white cursor-pointer'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{def.download.label}</span>
          </a>
        )}

        <div className="mt-10 space-y-10">
          {def.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-black text-cbz-blue">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.every((b) => b.startsWith('- ')) ? (
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 leading-relaxed">
                    {section.body.map((b) => (
                      <li key={b}>{b.slice(2)}</li>
                    ))}
                  </ul>
                ) : (
                  section.body.map((b) => (
                    <p
                      key={b}
                      className={`text-sm leading-relaxed ${
                        b.includes('[TBC:') ? 'text-amber-800 italic' : 'text-slate-600'
                      }`}
                    >
                      {b}
                    </p>
                  ))
                )}
              </div>
            </section>
          ))}
        </div>

        {def.links && def.links.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-black text-cbz-blue">Official documents</h2>
            <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {def.links.map((l) => {
                const placeholder = l.href.startsWith('[TBC');
                return (
                  <li key={l.label} className="py-3.5 flex items-start justify-between gap-4">
                    <span className="min-w-0">
                      {placeholder ? (
                        <span className="text-sm font-bold text-amber-800 italic">{l.label} — {l.href}</span>
                      ) : (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-cbz-blue hover:text-cbz-red transition-colors"
                        >
                          {l.label}
                        </a>
                      )}
                      {l.note && <span className="block text-xs text-cbz-grey mt-0.5">{l.note}</span>}
                    </span>
                    {!placeholder && <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden />}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {def.channels && def.channels.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-black text-cbz-blue">Contact</h2>
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {def.channels.map((c) => {
                const placeholder = c.value.includes('[TBC:');
                return (
                  <div key={c.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-cbz-grey">{c.label}</dt>
                    <dd className={`mt-1 text-sm font-bold ${placeholder ? 'text-amber-800 italic' : 'text-cbz-blue'}`}>
                      {c.href && !placeholder ? (
                        <a href={c.href} className="hover:text-cbz-red transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        )}
      </div>
    </div>
  );
};
