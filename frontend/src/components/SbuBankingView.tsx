import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Country, ScreenType } from '../types';
import { BANK_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';
import { RevealSection } from './Reveal';

interface SbuBankingViewProps {
  country: Country;
  onNavigate: (screen: ScreenType) => void;
  /** Starts the /open-account journey, optionally with an account type preselected */
  onOpenAccount: (accountType?: string) => void;
}

export const SbuBankingView: React.FC<SbuBankingViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={BANK_PAGE} onNavigate={onNavigate}>
    {/* Kept from the previous page: the cross-group handover is the clearest
        demonstration of the businesses working as one, which the Group
        proposition feedback asked the site to show rather than assert. */}
    <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-r from-[#002554] via-[#0A3E80] to-[#001736] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold">
              Connected Group journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Buy a home with one application.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
              Find the property with CBZ Properties, finance it with a CBZ Bank mortgage and
              insure it with CBZ Insurance. Tell us your details once and the journey carries
              them across all three.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={() => onNavigate('home-journey')}
              className="px-6 py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start the home journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </RevealSection>
  </SbuLandingPage>
);
