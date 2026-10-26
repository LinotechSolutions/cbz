import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { ProductItem } from '../types';
import { useSiteImage } from '../context/SiteImagesContext';
import { Reveal } from './Reveal';
import { analytics } from '../lib/analytics';

interface Category {
  readonly id: string;
  readonly label: string;
}

interface ProductCatalogueProps {
  /** Prefix for CMS-replaceable card images, e.g. "red-sphere-product" */
  imageKeyPrefix: string;
  categories: readonly Category[];
  products: Record<string, ProductItem[]>;
  /** Shown above the grid when a category carries commercial terms */
  termsNote?: string;
  /** Direct conversion action handler */
  onAction?: (product: ProductItem, categoryId: string) => void;
  /** Photo beside the FAQ list, fading into the page. Usually the unit's hero image. */
  faqImage?: string;
  /** CMS slot for that photo. */
  faqImageKey?: string;
}

function getActionLabel(product: ProductItem, categoryId: string): string {
  const name = product.name.toLowerCase();
  if (categoryId === 'accounts' || name.includes('account')) return 'Open Account';
  if (categoryId === 'loans' || name.includes('loan') || name.includes('credit')) return 'Apply for Facility';
  if (categoryId === 'personal' || categoryId === 'business' || name.includes('cover') || name.includes('insurance')) return 'Get a Quote';
  if (categoryId === 'unitTrusts' || categoryId === 'institutional' || name.includes('fund')) return 'Start Investing';
  if (categoryId === 'residential' || categoryId === 'commercial' || name.includes('stand') || name.includes('cluster')) return 'Enquire / View';
  if (categoryId === 'debt' || categoryId === 'advisory' || categoryId === 'equity' || categoryId === 'infrastructure') return 'Structure Mandate';
  if (categoryId === 'broking' || categoryId === 'erm' || categoryId === 'benefits' || categoryId === 'reinsurance') return 'Request Consultation';
  return 'Enquire Now';
}

const FAQS_BY_PREFIX: Record<string, { q: string; a: string }[]> = {
  'bank-product': [
    {
      q: 'What basic documents do I need to open a personal CBZ Bank account?',
      a: 'You will need a valid Zimbabwean National ID or Passport, proof of residence (latest utility bill or letter from employer/chief), and two passport-sized photos.',
    },
    {
      q: 'Can I open a Foreign Currency Account (Nostro FCA) online?',
      a: 'Yes! You can initiate your FCA application online or via the CBZ Touch mobile app. Accounts are available in USD, GBP, EUR, ZAR, and BWP.',
    },
    {
      q: 'How long does loan assessment take?',
      a: 'Personal and salary-based loans typically receive turnaround within 24 to 48 hours following document verification.',
    },
  ],
  'red-sphere-product': [
    {
      q: 'How does Red Sphere salary-based lending work?',
      a: 'Red Sphere provides credit against verified government (SSB) and private payroll agreements with repayments deducted directly at source.',
    },
    {
      q: 'What is required for an SSB loan?',
      a: 'Your National ID, current payslip, and proof of residence. Loans are granted up to US$2,400 with flexible tenors up to 24 months.',
    },
  ],
  'insurance-product': [
    {
      q: 'How quickly is a motor insurance policy issued?',
      a: 'Motor insurance quotations and certificates can be initiated online within minutes through our instant digital quote journey.',
    },
    {
      q: 'What does comprehensive cover include?',
      a: 'Protection against accidental collision, third-party liability, fire, lightning, storm, theft, windscreen damage, and towing rescue.',
    },
  ],
  'datvest-product': [
    {
      q: 'What is the minimum amount required to start investing with Datvest?',
      a: 'Individual unit trust investments start with affordable monthly contributions. Contact our advisers for current fund prospectuses.',
    },
    {
      q: 'How liquid is the Datvest Money Market Fund?',
      a: 'The Money Market Fund offers high liquidity with capital preservation and fast redemption turnaround upon written notice.',
    },
  ],
  'property-product': [
    {
      q: 'Are title deeds guaranteed for CBZ Properties stands?',
      a: 'Yes. All residential stands and cluster developments developed by CBZ Properties come with fully verified, unencumbered statutory title deeds.',
    },
    {
      q: 'Can I get a mortgage to purchase a stand?',
      a: 'Yes. Qualifying buyers can access integrated mortgage financing through CBZ Bank with tenures ranging from 2 to 10 years.',
    },
  ],
  'agro-product': [
    {
      q: 'What are the four operating divisions of CBZ Agro-Yield?',
      a: 'Agro Enterprise (joint venture schemes), Agro Farming (seasonal contract farming), Agro Commodity Trading (offtake opportunities), and Agro Supply Chain (mechanisation, equipment leasing/sales, and borehole drilling).',
    },
  ],
  'life-product': [
    {
      q: 'How soon are ComfortSure funeral cash disbursements processed?',
      a: 'ComfortSure funeral claims are prioritized for prompt disbursement within 24 hours of notification with valid documentation.',
    },
  ],
  'capital-product': [
    {
      q: 'What transaction sizes does CBZ Capital structure?',
      a: 'CBZ Capital arranges debt syndications, M&A transactions, and infrastructure project financing ranging from mid-tier corporate balance sheets to multi-million-dollar national syndicated facilities.',
    },
    {
      q: 'Does CBZ Capital sponsor public listings on the stock exchanges?',
      a: 'Yes. CBZ Capital acts as lead financial advisor and coordinates sponsoring brokers for Initial Public Offerings (IPOs) and listings on both the Zimbabwe Stock Exchange (ZSE) and Victoria Falls Stock Exchange (VFEX).',
    },
  ],
  'risk-product': [
    {
      q: 'How does an independent insurance broker differ from a direct insurer?',
      a: 'CBZ Risk Advisory Services acts solely on behalf of the client, surveying market-wide underwriters to negotiate competitive premiums, tailored policy clauses, and advocate aggressively during claims settlement.',
    },
    {
      q: 'What is covered under an Enterprise Risk Audit?',
      a: 'Our certified risk engineers evaluate operational, cyber, supply-chain, regulatory, and asset loss risks in compliance with ISO 31000 standards to safeguard business continuity.',
    },
  ],
};

/**
 * Conversion-oriented Product Catalogue with per-product action buttons
 * and SEO-optimized FAQs.
 */
export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  imageKeyPrefix,
  categories,
  products,
  termsNote,
  onAction,
  faqImage,
  faqImageKey,
}) => {
  const siteImage = useSiteImage();
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id ?? '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const items = products[activeTab] ?? [];

  // Deep links. A URL hash of `product-<id>` (what the navigation menus and
  // footer send) switches to the category that holds that product, scrolls to
  // the card and rings it for a moment. Without this, every menu entry landed
  // on the top of the page and the visitor had to find the product again.
  useEffect(() => {
    const apply = () => {
      const m = /^#product-(.+)$/.exec(window.location.hash);
      if (!m) return;
      const id = decodeURIComponent(m[1]);
      const category = categories.find((c) => (products[c.id] ?? []).some((p) => p.id === id));
      if (!category) return;
      setActiveTab(category.id);
      setHighlighted(id);
      // Wait for the tab's cards to render before scrolling.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          document.getElementById(`product-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }),
      );
      window.setTimeout(() => setHighlighted((h) => (h === id ? null : h)), 3500);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, [categories, products]);

  const faqs = FAQS_BY_PREFIX[imageKeyPrefix] || [];

  return (
    <div>
      {/* Category selector tabs */}
      <div
        className={`inline-flex flex-wrap gap-1 p-1 bg-slate-200/70 rounded-xl mb-6 sm:mb-8 max-w-full overflow-x-auto ${
          categories.length > 1 ? '' : 'hidden'
        }`}
      >
        {categories.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              analytics.trackConversionCta('apply', `Category filter: ${label}`, id);
            }}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === id
                ? 'bg-white text-[#002554] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((product, index) => {
          const btnLabel = getActionLabel(product, activeTab);
          return (
            <Reveal
              as="article"
              delay={Math.min(index, 5) * 70}
              key={`${activeTab}-${product.id ?? product.name}`}
              id={product.id ? `product-${product.id}` : undefined}
              className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between scroll-mt-28 ${
                highlighted && highlighted === product.id
                  ? 'border-[#E4002B] ring-4 ring-[#E4002B]/15'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {product.image && (
                  <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 sm:mb-4 border border-slate-100 bg-slate-100">
                    <img
                      {...siteImage(`${imageKeyPrefix}.${product.id}`, product.image, product.name)}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h3 className="font-extrabold text-sm sm:text-base text-[#002554]">{product.name}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs text-slate-600 leading-relaxed">{product.description}</p>

                {product.target && (
                  <p className="mt-2.5 sm:mt-3 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">Target customer:</span> {product.target}
                  </p>
                )}

                {product.features && product.features.length > 0 && (
                  <dl className="mt-2.5 sm:mt-3 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1">
                    {product.tenor && (
                      <div className="text-xs">
                        <dt className="inline font-bold text-slate-700">Tenor: </dt>
                        <dd className="inline text-slate-600">{product.tenor}</dd>
                      </div>
                    )}
                    {product.interestRate && (
                      <div className="text-xs">
                        <dt className="inline font-bold text-slate-700">Interest: </dt>
                        <dd className="inline text-slate-600">{product.interestRate}</dd>
                      </div>
                    )}
                    {product.adminFee && (
                      <div className="text-xs">
                        <dt className="inline font-bold text-slate-700">Admin fee: </dt>
                        <dd className="inline text-slate-600">{product.adminFee}</dd>
                      </div>
                    )}
                    {product.limit && (
                      <div className="text-xs">
                        <dt className="inline font-bold text-slate-700">Limit: </dt>
                        <dd className="inline text-slate-600">{product.limit}</dd>
                      </div>
                    )}
                  </dl>
                )}

                {product.benefits && product.benefits.length > 0 && (
                  <ul className="mt-2.5 sm:mt-3 space-y-1">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {product.requirements && product.requirements.length > 0 && (
                  <details className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100">
                    <summary className="text-xs font-bold text-[#002554] cursor-pointer hover:text-[#E4002B]">
                      What you need to apply
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {product.requirements.map((requirement) => (
                        <li key={requirement} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>

              {/* Action and Conversion Bar */}
              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                <span className="text-2xs font-extrabold text-[#002554] tracking-wider uppercase">
                  {product.pricing || 'Standard Terms'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    analytics.trackConversionCta('apply', `${product.name} card action`, activeTab);
                    if (onAction) {
                      onAction(product, activeTab);
                    }
                  }}
                  className="w-full sm:w-auto justify-center px-3.5 py-2 sm:px-4 sm:py-2 bg-[#002554] hover:bg-[#E4002B] text-white text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span>{btnLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>

      {termsNote && <p className="mt-8 text-xs text-slate-500 max-w-3xl">{termsNote}</p>}

      {/* Product FAQs & AI Search Optimization.
          After the reference: a quiet two-column layout. Heading, one line of
          intro and a photo that fades into the page on the left; on the right
          an accordion of hairline-divided rows, question set large and light,
          one answer open at a time. No boxes, no icons, no uppercase labels. */}
      {faqs.length > 0 && (
        <section
          aria-labelledby="product-faq-heading"
          className="mt-16 pt-12 border-t border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: heading, intro, and the fading photo. */}
            <div className="lg:col-span-5 relative">
              <h3
                id="product-faq-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-medium text-cbz-ink tracking-tight leading-[1.1]"
              >
                Frequently
                <br />
                asked questions
              </h3>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-xs">
                A few quick answers about how this works and what to expect.
              </p>

              {faqImage && (
                <div className="relative mt-8 lg:mt-12 h-56 sm:h-72 lg:h-[22rem] overflow-hidden">
                  <img
                    {...siteImage(faqImageKey ?? `${imageKeyPrefix}.faq`, faqImage, '')}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Fade the photo into the page along its top and right edges,
                      so it reads as part of the layout rather than a framed box. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white via-white/70 to-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white via-white/60 to-transparent"
                  />
                </div>
              )}
            </div>

            {/* Right: the accordion. */}
            <div className="lg:col-span-7">
              <ul className="divide-y divide-slate-300/80 border-b border-slate-300/80">
                {faqs.map((faq, idx) => {
                  const open = openFaq === idx;
                  const panelId = `product-faq-panel-${idx}`;
                  return (
                    <li key={faq.q}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : idx)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className="w-full py-6 sm:py-7 text-left flex items-start justify-between gap-6 cursor-pointer group"
                      >
                        <span className="text-lg sm:text-xl lg:text-2xl font-medium text-cbz-ink leading-snug group-hover:text-cbz-blue transition-colors">
                          {faq.q}
                        </span>
                        <ChevronDown
                          aria-hidden
                          className={`w-5 h-5 mt-1.5 shrink-0 text-cbz-ink transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        id={panelId}
                        hidden={!open}
                        className="pb-7 pr-10 text-sm text-slate-600 leading-relaxed border-t border-slate-300/80 pt-6"
                      >
                        {faq.a}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
