import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Coins,
  Globe,
  HelpCircle,
  Home,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { ScreenType } from '../types';
import { CONTACT } from '../data/facts';
import { Logo } from './Logo';
import { Reveal, RevealSection } from './Reveal';
import { analytics } from '../lib/analytics';
import { useSiteImage } from '../context/SiteImagesContext';

interface DiasporaViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenAccount: (accountType?: string) => void;
  onOpenContact?: () => void;
  onRequestEnquiry?: (service: string, note?: string) => void;
}

export const DiasporaView: React.FC<DiasporaViewProps> = ({
  onNavigate,
  onOpenAccount,
  onOpenContact,
  onRequestEnquiry
}) => {
  const siteImage = useSiteImage();
  const handleCta = (action: 'apply' | 'quote' | 'callback', label: string, dest: string, callback: () => void) => {
    analytics.trackConversionCta(action, `Diaspora: ${label}`, dest);
    callback();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-bold text-slate-500 hover:text-[#E4002B] flex items-center gap-1.5 cursor-pointer mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <Logo brand="bank" height={38} />
              <span className="mt-5 block text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
                CBZ Diaspora Banking & Wealth Solutions
              </span>
              <h1 className="mt-1 text-3xl sm:text-4xl font-black text-[#002554] tracking-tight leading-tight">
                Bank, Build, Invest & Insure Back Home in Zimbabwe
              </h1>
              <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
                Whether you live in the United Kingdom, South Africa, the United States, Australia, or anywhere across the globe, CBZ connects you directly to home with foreign currency accounts, mortgage financing, turnkey construction, and asset management.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() =>
                    handleCta('apply', 'Open Diaspora Account', '/open-account', () =>
                      onOpenAccount('diaspora')
                    )
                  }
                  className="px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Open a Diaspora Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    handleCta('callback', 'Speak to Diaspora Desk', 'modal', () => {
                      if (onRequestEnquiry) {
                        onRequestEnquiry('CBZ Diaspora Desk', 'Inquiry from Diaspora Banking Portal');
                      } else if (onOpenContact) {
                        onOpenContact();
                      }
                    })
                  }
                  className="px-4 py-2.5 sm:px-6 sm:py-3.5 bg-slate-100 hover:bg-slate-200 text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Speak to a Relationship Manager
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* A CMS slot like every other page picture, instead of a hard-coded path. */}
              <img
                {...siteImage('diaspora.hero', '/images/accounts/diaspora.webp', 'CBZ Diaspora Banking')}
                loading="eager"
                decoding="async"
                className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#002554] tracking-tight">
            Integrated Solutions for Non-Resident Zimbabweans
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Four key pathways connecting your overseas earnings to secure, high-yield opportunities in Zimbabwe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Diaspora Banking */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-[#E4002B] flex items-center justify-center mb-3 sm:mb-4">
                <Coins className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#002554]">FCA Foreign Currency Accounts</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Hold and transact in USD, GBP, EUR, ZAR, or BWP. Zero incoming remittance fees, debit card for family back home, and full online banking access via OBDX.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Available in 5 major foreign currencies</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>CBZ Touch & Internet Banking access</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() =>
                handleCta('apply', 'Open FCA from Pillar', '/open-account', () =>
                  onOpenAccount('fca_individual')
                )
              }
              className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-[#002554] hover:text-white text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Apply for FCA Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Turnkey Property & Mortgages */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#002554] flex items-center justify-center mb-4">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#002554]">Stands & Mortgages</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Acquire titled residential stands or turnkey cluster homes developed by CBZ Properties, with long-term mortgage underwriting from CBZ Bank.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Serviced stands with verified title deeds</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>2 to 10-year mortgage facilities</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() =>
                handleCta('apply', 'Diaspora Mortgage', '/buy-a-home', () =>
                  onNavigate('home-journey')
                )
              }
              className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-[#002554] hover:text-white text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Home Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Datvest Diaspora Wealth Fund */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#002554]">Datvest Wealth Fund</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Professionally managed investments in high-growth national bonds, VFEX USD equities, and commercial property assets. Build your retirement portfolio.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>USD capital appreciation and yield</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Quarterly portfolio performance reporting</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() =>
                handleCta('apply', 'Datvest Diaspora Fund', '/invest-journey', () =>
                  onNavigate('journey-invest')
                )
              }
              className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-[#002554] hover:text-white text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Start Investing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Diaspora Property Insurance */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#E4002B]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#002554]">Diaspora Property Insurance</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Safeguard residential buildings, parental homes, and vehicles in Zimbabwe against fire, storm, burst pipes, and theft with guaranteed USD payouts.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Guaranteed claims settled in USD</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Add-on ComfortSure family funeral cover</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() =>
                handleCta('quote', 'Diaspora Insurance Quote', '/car-insurance-quote', () =>
                  onNavigate('journey')
                )
              }
              className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-[#002554] hover:text-white text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get an Insurance Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </RevealSection>

      {/* KYC / Requirements for Diaspora Customers */}
      <RevealSection className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
                Simple Digital Onboarding
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002554] tracking-tight">
                What You Need to Open Your Diaspora Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You do not need to travel to Zimbabwe. You can complete your entire onboarding online by uploading copies of standard documentation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <UserCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900 font-bold mb-0.5">Valid Zimbabwean Identity Document</strong>
                    <span>Copy of your Zimbabwean Passport or National ID (Metal or Plastic).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Globe className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900 font-bold mb-0.5">Proof of Overseas Residence</strong>
                    <span>Recent foreign utility bill, council tax statement, tenancy agreement, or official bank statement showing your residential address abroad.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Coins className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <strong className="block text-slate-900 font-bold mb-0.5">Proof of Income / Employment</strong>
                    <span>Latest payslip, letter of employment, or recent 3-month foreign bank statement showing salary deposits.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-br from-[#002554] to-[#0A3E80] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Dedicated Diaspora Relationship Desk
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                Have questions about international currency transfers, power of attorney, or property viewings on your behalf? Our dedicated diaspora officers are here to assist.
              </p>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                  <span className="text-slate-200">International Telephone:</span>
                  <a href={CONTACT.switchboard.href} className="font-bold text-white hover:underline">
                    {CONTACT.switchboard.display}
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                  <span className="text-slate-200">Direct WhatsApp Desk:</span>
                  <a
                    href={CONTACT.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-300 hover:underline"
                  >
                    {CONTACT.whatsapp.display}
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                  <span className="text-slate-200">Diaspora Desk Email:</span>
                  <a href="mailto:diasporadesk@cbz.co.zw" className="font-bold text-white hover:underline">
                    diasporadesk@cbz.co.zw
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() =>
                    handleCta('apply', 'Start Onboarding from Desk', '/open-account', () =>
                      onOpenAccount('diaspora')
                    )
                  }
                  className="w-full py-3 sm:py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Start Online Account Application</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
};
