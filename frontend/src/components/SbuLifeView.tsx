import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenType } from '../types';
import { LIFE_CATEGORIES, LIFE_PRODUCTS } from '../data/products/life';
import { ProductCatalogue } from './ProductCatalogue';

interface SbuLifeViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SbuLifeView: React.FC<SbuLifeViewProps> = ({ onNavigate }) => (
  <div className="bg-slate-50 min-h-screen">
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate('the-group')}
          className="text-xs font-bold text-slate-500 hover:text-[#E4002B] flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>The CBZ Group</span>
        </button>
        <span className="mt-6 block text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
          CBZ Life
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black text-[#002554] tracking-tight">
          Cover for your family, and for the people you employ
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Funeral and education plans for individuals, and group life, retirement savings,
          annuities and credit life for employers.
        </p>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductCatalogue
        imageKeyPrefix="life-product"
        categories={LIFE_CATEGORIES}
        products={LIFE_PRODUCTS}
        termsNote="Benefits, premiums and terms depend on the cover selected and on underwriting. Speak to a CBZ Life consultant for a quotation and the full policy terms."
      />
    </section>
  </div>
);
