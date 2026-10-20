import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ProductItem } from '../types';
import { useSiteImage } from '../context/SiteImagesContext';

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
}

/**
 * Renders a subsidiary's product catalogue: tabs per category, then a card per
 * product showing who it is for, its terms, its benefits and what to bring.
 * Shared by the Red Sphere and CBZ Life pages.
 */
export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  imageKeyPrefix,
  categories,
  products,
  termsNote,
}) => {
  const siteImage = useSiteImage();
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id ?? '');
  const items = products[activeTab] ?? [];

  return (
    <div>
      <div className="inline-flex flex-wrap gap-1 p-1 bg-slate-200/70 rounded-xl mb-8">
        {categories.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === id
                ? 'bg-white text-[#002554] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <article
            key={product.id ?? product.name}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col"
          >
            {product.image && (
              <div className="w-full h-36 rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-100">
                <img
                  {...siteImage(`${imageKeyPrefix}.${product.id}`, product.image, product.name)}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h3 className="font-extrabold text-base text-[#002554]">{product.name}</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">{product.description}</p>

            {product.target && (
              <p className="mt-3 text-xs text-slate-500">
                <span className="font-bold text-slate-700">For:</span> {product.target}
              </p>
            )}

            {product.features && product.features.length > 0 && (
              <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
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
                    <dt className="inline font-bold text-slate-700">Up to: </dt>
                    <dd className="inline text-slate-600">{product.limit}</dd>
                  </div>
                )}
              </dl>
            )}

            {product.benefits && product.benefits.length > 0 && (
              <ul className="mt-3 space-y-1">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {product.requirements && product.requirements.length > 0 && (
              <details className="mt-4 pt-3 border-t border-slate-100">
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
          </article>
        ))}
      </div>

      {termsNote && <p className="mt-8 text-xs text-slate-500 max-w-3xl">{termsNote}</p>}
    </div>
  );
};
