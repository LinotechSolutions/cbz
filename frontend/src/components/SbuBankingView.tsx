import React, { useState } from 'react';
import {
  Landmark,
  CreditCard,
  Wallet,
  Banknote,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  PiggyBank,
  BadgePercent,
  Building2,
  Sparkles,
  Clock,
  Coins,
  Lock,
  QrCode,
  PhoneCall,
  FileCheck,
  ChevronRight,
  Copy,
  Check,
  Info,
  Shield
} from 'lucide-react';
import { ScreenType, Country } from '../types';
import { BANK_LIFECYCLE, convertTextWithCurrency } from '../data/cbzData';
import { BANK_PRODUCTS, BANK_PRODUCT_CATEGORIES, BankProductCategory } from '../data/products/bank';
import { useGroupedProducts } from '../hooks/useCbzData';
import { CbzLogo } from './CbzLogo';
import { useSiteImage } from '../context/SiteImagesContext';
import { Reveal } from './Reveal';

interface SbuBankingViewProps {
  country: Country;
  onNavigate: (screen: ScreenType) => void;
  /** Starts the /open-account journey, optionally with an account type preselected */
  onOpenAccount: (accountType?: string) => void;
}

export const SbuBankingView: React.FC<SbuBankingViewProps> = ({ country, onNavigate, onOpenAccount }) => {
  const siteImage = useSiteImage();
  const [activeTab, setActiveTab] = useState<BankProductCategory>('accounts');
  const { products } = useGroupedProducts('bank', BANK_PRODUCTS);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);

  const selectedStage = BANK_LIFECYCLE[selectedStageIndex];

  // Bank product ids that differ from the account ids used by the /open-account journey
  const ACCOUNT_TYPE_FOR_PRODUCT: Record<string, string> = {
    fca_individual: 'nostro',
    fca_corporate: 'nostro',
    current: 'current',
    smartcash_general: 'smartcash',
    smartcash_lite: 'smartcash',
    smartcash_student: 'youth',
    smartcash_extra: 'smartcash',
    senior: 'senior',
    fixed_deposit: 'fixed',
    church_current: 'church',
    current_corporate: 'business',
  };

  const handleProductAction = (productId?: string) => {
    if (activeTab === 'loans') return onNavigate('journey-bank');
    if (productId && ACCOUNT_TYPE_FOR_PRODUCT[productId]) {
      return onOpenAccount(ACCOUNT_TYPE_FOR_PRODUCT[productId]);
    }
    onOpenAccount();
  };

  const renderProductIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-[#E4002B]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[#002554]" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'PiggyBank':
        return <PiggyBank className="w-5 h-5 text-[#E4002B]" />;
      case 'Banknote':
        return <Banknote className="w-5 h-5 text-[#E4002B]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#002554]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-amber-600" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#E4002B]" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-[#E4002B]" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-blue-600" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-emerald-600" />;
      case 'QrCode':
        return <QrCode className="w-5 h-5 text-[#E4002B]" />;
      default:
        return <Landmark className="w-5 h-5 text-[#002554]" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. SBU HERO SECTION */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <CbzLogo entity="Bank" size={32} />
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#002554]/5 border border-[#002554]/15">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E4002B] animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#002554]">
                    CBZ Bank · Registered Commercial Bank
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-[#002554] tracking-tight leading-tight">
                Financial Foundations.{' '}
                <span className="text-[#E4002B]">Limitless Horizons.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                CBZ Bank is Zimbabwe's premier commercial banking powerhouse. From zero-fee SmartCash accounts and high-yield Nostro FCA deposits to 20-year home mortgages, vehicle asset finance, and corporate treasury syndications — we back your ambitions at every step.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenAccount()}
                  className="px-6 py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md cbz-shadow-red transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>Open an Account Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('banking-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-[#002554] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Explore Accounts & Loans
                </button>

                <button
                  onClick={() => onNavigate('home')}
                  className="px-4 py-3 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Return to Group Home
                </button>
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xl font-black text-[#002554]">46+ Yrs</div>
                  <div className="text-xs uppercase font-bold text-cbz-grey mt-0.5">
                    Banking Heritage
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xl font-black text-[#E4002B]">60+</div>
                  <div className="text-xs uppercase font-bold text-cbz-grey mt-0.5">
                    Branches & Agencies
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xl font-black text-blue-900">24/7</div>
                  <div className="text-xs uppercase font-bold text-cbz-grey mt-0.5">
                    Touch & WhatsApp
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2">
                <img
                  {...siteImage('banner.banking', '/images/cbz-banking.webp', 'CBZ Bank Commercial Advisory')}
                  className="rounded-xl w-full h-80 lg:h-96 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/cbz-banking-branch.webp';
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#002554] flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5 text-[#E4002B]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#002554]">CBZ Touch & WhatsApp</div>
                  <div className="text-xs text-slate-500">ZIPIT Instant Interbank · +263 774 460 460</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5-STAGE CUSTOMER BANKING LIFECYCLE */}
      <section className="py-16 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
              Integrated Banking Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002554] mt-1">
              From Digital Onboarding to Generational Wealth & Enterprise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Follow the seamless financial journey through CBZ Bank's digital ecosystem, unified lending, and cross-subsidiary wealth building.
            </p>
          </div>

          {/* Stepper Navigation Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {BANK_LIFECYCLE.map((stage, idx) => {
              const isActive = selectedStageIndex === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#002554] border-[#002554] text-white shadow-md'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xl font-black ${
                        isActive ? 'text-[#E4002B]' : 'text-cbz-grey'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {stage.tag}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold leading-snug ${
                        isActive ? 'text-white' : 'text-[#002554]'
                      }`}
                    >
                      {stage.phase}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E4002B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Selected Stage Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-2xl font-black text-[#E4002B]">
                    Stage {selectedStage.step}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {selectedStage.phase}
                  </span>
                  {selectedStage.partnerEntity && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#002554] border border-blue-100">
                      {selectedStage.partnerEntity}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#002554] leading-snug">
                  {selectedStage.title}
                </h3>

                <p className="text-xs sm:text-sm text-cbz-grey leading-relaxed">
                  {selectedStage.description}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-cbz-grey mb-3">
                    Stage Highlights & Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedStage.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Stage Callout Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#002554] text-white p-6 rounded-2xl flex flex-col justify-between h-full shadow-md">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded bg-[#E4002B] text-white text-xs font-bold tracking-wider uppercase mb-3">
                    Connected Group Advantage
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">
                    Unified Balance Sheet Advantage
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Because your transaction record and KYC are anchored with CBZ Bank, you gain fast-track access across the entire group: direct mortgage qualification with CBZ Properties, seamless unit trust investments with Datvest, and discounted insurance premiums with CBZ Insurance.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Next Lifecycle Phase:</span>
                    <span className="font-bold text-blue-300">
                      {selectedStageIndex < BANK_LIFECYCLE.length - 1
                        ? `Stage 0${selectedStageIndex + 2}: ${BANK_LIFECYCLE[selectedStageIndex + 1].phase}`
                        : 'Full Lifecycle Active · Group Advantage Unlocked'}
                    </span>
                  </div>
                  {selectedStageIndex < BANK_LIFECYCLE.length - 1 ? (
                    <button
                      onClick={() => setSelectedStageIndex(selectedStageIndex + 1)}
                      className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Advance to Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('home-journey')}
                      className="w-full py-2.5 px-4 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Explore Connected Home Buying Journey</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG MATRIX */}
      <section id="banking-catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
              Comprehensive Banking Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002554] mt-0.5">
              Accounts, Loans & Digital Channels
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
            {BANK_PRODUCT_CATEGORIES.map(({ id, label }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#002554] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(products[activeTab] || BANK_PRODUCTS[activeTab] || []).map((prod, index) => (
            <Reveal
              // Keyed by tab so switching category replays the cascade.
              key={`${activeTab}-${prod.id || prod.name}`}
              delay={Math.min(index, 5) * 70}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {prod.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-100">
                    <img
                      {...siteImage(`bank-product.${prod.id}`, prod.image, prod.name)}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002554] flex items-center justify-center mb-4">
                  {renderProductIcon(prod.icon)}
                </div>
                <h4 className="font-extrabold text-base text-[#002554] mb-2">
                  {prod.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {prod.description}
                </p>

                {prod.target && (
                  <p className="mt-3 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">For:</span> {prod.target}
                  </p>
                )}

                {prod.benefits && prod.benefits.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {prod.benefits.slice(0, 4).map((benefit) => (
                      <li key={benefit} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {prod.requirements && prod.requirements.length > 0 && (
                  <details className="mt-3 group">
                    <summary className="text-xs font-bold text-[#002554] cursor-pointer hover:text-[#E4002B]">
                      What you need to apply
                    </summary>
                    <ul className="mt-2 space-y-1 pl-1">
                      {prod.requirements.map((requirement) => (
                        <li key={requirement} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#E4002B]">
                  {convertTextWithCurrency(prod.pricing, country)}
                </span>
                <button
                  onClick={() => handleProductAction(prod.id)}
                  className="font-bold text-[#002554] hover:text-[#E4002B] flex items-center space-x-1 cursor-pointer"
                >
                  <span>
                    {activeTab === 'loans'
                      ? 'Apply for Facility'
                      : prod.id && ACCOUNT_TYPE_FOR_PRODUCT[prod.id]
                      ? 'Open Account'
                      : 'Enquire'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. CROSS-SBU HOME BUYING HANDOVER BANNER */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#002554] via-[#0A3E80] to-[#001736] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold">
                  <span>Connected Group Journey</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Buy a home with one application.
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                  Reserve your home, secure your mortgage, insure it and protect your family — entering your details once across all four CBZ institutions with zero duplicate paperwork.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <button
                  onClick={() => onNavigate('home-journey')}
                  className="w-full py-3.5 px-5 bg-[#E4002B] hover:bg-[#C50025] text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Launch Connected Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('invest')}
                  className="w-full py-3.5 px-5 bg-white text-[#002554] hover:bg-slate-100 font-bold text-xs rounded-xl transition-all shadow-md text-center cursor-pointer"
                >
                  Invest with Datvest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
