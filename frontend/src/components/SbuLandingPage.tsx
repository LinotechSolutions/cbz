import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, PhoneCall, User } from 'lucide-react';
import { ScreenType } from '../types';
import { SbuPageConfig } from '../data/sbuPages';
import { CONTACT, EXTERNAL_LINKS } from '../data/facts';
import { useSiteImage } from '../context/SiteImagesContext';
import { Logo } from './Logo';
import { ProductCatalogue } from './ProductCatalogue';
import { Reveal, RevealSection } from './Reveal';
import { CallbackModal } from './CallbackModal';
import { analytics } from '../lib/analytics';

interface SbuLandingPageProps {
  config: SbuPageConfig;
  onNavigate: (screen: ScreenType) => void;
  /**
   * Unit-specific content rendered after the products section, for things the
   * standard seven sections do not cover, such as the bank's cross-group
   * handover. The seven sections stay in the same order either way.
   */
  children?: React.ReactNode;
}

/**
 * The standardised business-unit landing page: hero, about, key facts, products,
 * campaigns, leadership, contact. Every unit renders through this component so
 * the structure stays consistent, as agreed in the website feedback.
 */
export const SbuLandingPage: React.FC<SbuLandingPageProps> = ({ config, onNavigate, children }) => {
  const siteImage = useSiteImage();
  const { hero, about, keyFacts, products, campaigns, leadership, contact } = config;
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackNote, setCallbackNote] = useState('');

  const act = (target?: { label?: string; screen?: ScreenType; href?: string }) => () => {
    const label = target?.label || '';
    if (
      label.toLowerCase().includes('callback') ||
      label.toLowerCase().includes('speak to') ||
      label.toLowerCase().includes('consultant')
    ) {
      setCallbackNote(`Inquiry via ${hero.eyebrow}: ${label}`);
      setIsCallbackOpen(true);
      analytics.trackConversionCta('callback', `${hero.eyebrow}: ${label}`, 'modal');
      return;
    }

    if (target?.screen) {
      analytics.trackConversionCta('apply', `${hero.eyebrow}: ${label}`, target.screen);
      onNavigate(target.screen);
    } else if (target?.href) {
      analytics.trackConversionCta('apply', `${hero.eyebrow}: ${label}`, target.href);
      window.open(target.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO BANNER — value proposition, image and primary action */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            onClick={() => onNavigate('the-group')}
            className="text-xs font-bold text-slate-500 hover:text-[#E4002B] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>The CBZ Group</span>
          </button>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <Logo brand={config.brand} height={38} />
              <span className="mt-5 block text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
                {hero.eyebrow}
              </span>
              <h1 className="mt-1 text-3xl sm:text-4xl font-black text-[#002554] tracking-tight leading-tight">
                {hero.headline}
              </h1>
              <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
                {hero.valueProposition}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={act(hero.primaryCta)}
                  className="px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {hero.secondaryCta && (
                  <button
                    onClick={act(hero.secondaryCta)}
                    className="px-4 py-2.5 sm:px-6 sm:py-3.5 bg-slate-100 hover:bg-slate-200 text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {hero.secondaryCta.label}
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                {...siteImage(hero.imageKey, hero.image ?? '', hero.headline)}
                className="w-full h-56 sm:h-72 object-cover rounded-2xl border border-slate-200 bg-slate-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US + 3. KEY FACTS */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">About us</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{about}</p>
          </div>

          <div className="lg:col-span-6">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Key facts</h2>
            <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {keyFacts.map((fact) => (
                <div key={fact.label} className="bg-white rounded-xl border border-slate-200 p-4">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="text-xl font-black text-[#002554]">{fact.value}</dd>
                  <dd className="mt-1 text-xs text-slate-500 leading-snug">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </RevealSection>

      {/* 4. PRODUCTS AND SOLUTIONS */}
      <RevealSection className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#002554] tracking-tight">
            {products.heading}
          </h2>
          {products.intro && (
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">{products.intro}</p>
          )}
          <div className="mt-8">
            <ProductCatalogue
              imageKeyPrefix={config.imageKeyPrefix}
              categories={products.categories}
              products={products.items}
              termsNote={products.termsNote}
              onAction={(product, categoryId) => {
                if (config.brand === 'bank') {
                  if (categoryId === 'accounts') onNavigate('open-account');
                  else if (categoryId === 'loans') onNavigate('journey-bank');
                  else {
                    setCallbackNote(`Enquiry for CBZ Bank: ${product.name}`);
                    setIsCallbackOpen(true);
                  }
                } else if (config.brand === 'insurance') {
                  onNavigate('journey');
                } else if (config.brand === 'datvest') {
                  onNavigate('journey-invest');
                } else if (config.brand === 'properties') {
                  onNavigate('home-journey');
                } else if (config.brand === 'agro-yield') {
                  onNavigate('journey-agro');
                } else if (config.brand === 'red-sphere') {
                  window.open(EXTERNAL_LINKS.redSphereApply, '_blank', 'noopener,noreferrer');
                } else {
                  setCallbackNote(`Enquiry for ${hero.eyebrow}: ${product.name}`);
                  setIsCallbackOpen(true);
                }
              }}
            />
          </div>
        </div>
      </RevealSection>

      {children}

      {/* 5. CAMPAIGN ADVERTS — one banner, or up to three tiles */}
      {campaigns.length > 0 && (
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className={
              campaigns[0]?.kind === 'banner'
                ? 'grid grid-cols-1 gap-6'
                : 'grid grid-cols-1 md:grid-cols-3 gap-6'
            }
          >
            {campaigns.slice(0, campaigns[0]?.kind === 'banner' ? 1 : 3).map((campaign) => (
              <article
                key={campaign.title}
                className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:p-8"
              >
                <h3 className="font-extrabold text-base text-[#002554]">{campaign.title}</h3>
                {campaign.body && (
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{campaign.body}</p>
                )}
                {campaign.cta && (
                  <button
                    onClick={act(campaign.cta)}
                    className="mt-4 text-xs font-bold text-[#E4002B] hover:underline cursor-pointer"
                  >
                    {campaign.cta.label}
                  </button>
                )}
              </article>
            ))}
          </div>
        </RevealSection>
      )}

      {/* 6. LEADERSHIP */}
      {leadership.length > 0 && (
        <RevealSection className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Leadership
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((person, index) => (
                <Reveal
                  as="article"
                  key={person.name}
                  delay={Math.min(index, 3) * 70}
                  className="rounded-2xl border border-slate-200 p-5 text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                    {person.image || person.imageKey ? (
                      <img
                        {...siteImage(person.imageKey ?? '', person.image ?? '', person.name)}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-slate-400" />
                    )}
                  </div>
                  <h3 className="mt-3 font-bold text-sm text-[#002554]">{person.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{person.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      {/* 7. CONTACT AND CONVERSION */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#002554] via-[#0A3E80] to-[#001736] text-white p-5 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-xl sm:text-3xl font-black tracking-tight">{contact.heading}</h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                {contact.body}
              </p>
              <div className="mt-4 sm:mt-5 flex flex-wrap gap-3 sm:gap-4 text-xs text-slate-200">
                <a
                  href={contact.phone ?? CONTACT.switchboard.href}
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{CONTACT.switchboard.display}</span>
                </a>
                <a
                  href={`mailto:${contact.email ?? CONTACT.email}`}
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                  <span>{contact.email ?? CONTACT.email}</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={act(contact.primaryCta)}
                className="w-full sm:w-auto justify-center px-5 py-3 sm:px-6 sm:py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{contact.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </RevealSection>

      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        initialService={hero.eyebrow}
        initialNote={callbackNote}
      />
    </div>
  );
};
