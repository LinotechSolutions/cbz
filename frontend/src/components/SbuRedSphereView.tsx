import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenType } from '../types';
import { RED_SPHERE_CATEGORIES, RED_SPHERE_PRODUCTS } from '../data/products/redSphere';
import { ProductCatalogue } from './ProductCatalogue';

interface SbuRedSphereViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SbuRedSphereView: React.FC<SbuRedSphereViewProps> = ({ onNavigate }) => (
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
          Red Sphere Finance
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black text-[#002554] tracking-tight">
          Microfinance built around how you earn
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Salary-based lending for government and private payrolls, working capital for
          enterprises and tuck-shops, and partnership programmes for agents and retailers.
        </p>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductCatalogue
        imageKeyPrefix="red-sphere-product"
        categories={RED_SPHERE_CATEGORIES}
        products={RED_SPHERE_PRODUCTS}
        termsNote="Tenors, interest rates and administration fees are those set out in the Red Sphere Finance product documentation and are subject to credit assessment and approval. Interest rates may change; confirm the current terms before you apply."
      />
    </section>
  </div>
);
