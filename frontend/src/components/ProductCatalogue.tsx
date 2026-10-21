import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
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
}

function getActionLabel(product: ProductItem, categoryId: string): string {
  const name = product.name.toLowerCase();
  if (categoryId === 'accounts' || name.includes('account')) return 'Open Account';
  if (categoryId === 'loans' || name.includes('loan') || name.includes('credit')) return 'Apply for Facility';
  if (categoryId === 'personal' || categoryId === 'business' || name.includes('cover') || name.includes('insurance')) return 'Get a Quote';
  if (categoryId === 'unitTrusts' || categoryId === 'institutional' || name.includes('fund')) return 'Start Investing';
  if (categoryId === 'residential' || categoryId === 'commercial' || name.includes('stand') || name.includes('cluster')) return 'Enquire / View';
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
}) => {
  const siteImage = useSiteImage();
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id ?? '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const items = products[activeTab] ?? [];

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
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between"
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

      {/* Product FAQs & AI Search Optimization */}
      {faqs.length > 0 && (
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#E4002B]" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#002554]">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#002554] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-[#E4002B]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
