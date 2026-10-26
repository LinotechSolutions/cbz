import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  HelpCircle,
  KeyRound,
  Lock,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  User,
  UserPlus
} from 'lucide-react';
import { ScreenType } from '../types';
import { CONTACT, EXTERNAL_LINKS } from '../data/facts';
import { Logo } from './Logo';
import { analytics } from '../lib/analytics';

interface LoginPageProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenAccount: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onOpenAccount }) => {
  const [selectedPortal, setSelectedPortal] = useState<'personal' | 'corporate' | 'touch'>('personal');

  const handlePortalClick = (portal: string, href: string) => {
    analytics.trackConversionCta('login', portal, href);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-bold text-slate-500 hover:text-[#E4002B] flex items-center gap-1.5 cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>

        {/* Header Block */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-100">
            <div>
              <Logo brand="bank" height={36} />
              <h1 className="mt-3 sm:mt-4 text-xl sm:text-3xl font-black text-[#002554] tracking-tight">
                CBZ Internet Banking & Self-Service
              </h1>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
                Access your personal, corporate, or mobile accounts safely and conveniently through our verified secure banking platforms.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 shrink-0 w-full sm:max-w-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                New to CBZ Bank?
              </span>
              <p className="text-xs text-slate-600 mb-3">
                Open your account online in 3 minutes with instant card and mobile access.
              </p>
              <button
                onClick={() => {
                  analytics.trackConversionCta('apply', 'Open Account from Login', '/open-account');
                  onOpenAccount();
                }}
                className="w-full py-2.5 px-4 bg-[#002554] hover:bg-[#0A3E80] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-3.5 h-3.5 text-red-400" />
                <span>Open an Account Online</span>
              </button>
            </div>
          </div>

          {/* Portal Switcher Tabs */}
          <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-1 sm:flex flex-wrap gap-1.5 sm:gap-2 p-1.5 bg-slate-100 rounded-xl sm:rounded-2xl w-full sm:w-fit">
              <button
                onClick={() => setSelectedPortal('personal')}
                className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center sm:justify-start gap-2 ${
                  selectedPortal === 'personal'
                    ? 'bg-white text-[#002554] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 text-[#E4002B]" />
                <span>Personal Banking</span>
              </button>
              <button
                onClick={() => setSelectedPortal('corporate')}
                className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center sm:justify-start gap-2 ${
                  selectedPortal === 'corporate'
                    ? 'bg-white text-[#002554] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#002554]" />
                <span>Corporate & SME</span>
              </button>
              <button
                onClick={() => setSelectedPortal('touch')}
                className={`w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center sm:justify-start gap-2 ${
                  selectedPortal === 'touch'
                    ? 'bg-white text-[#002554] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>CBZ Touch App & USSD</span>
              </button>
            </div>

            {/* Tab 1: Personal Banking */}
            {selectedPortal === 'personal' && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E4002B] rounded-full text-xs font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Personal Online Banking (OBDX)</span>
                  </div>
                  <h2 className="text-xl font-black text-[#002554]">
                    Bank from anywhere on your personal accounts
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Log in with your username and password to monitor real-time balances, initiate instant ZIPIT and RTGS transfers, settle utility bills (ZESA, rates, DStv), and manage your Nostro FCA funds.
                  </p>

                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Single sign-on across all your personal and savings accounts</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Instant domestic ZIPIT transfers with zero delay</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Download court-admissible official electronic bank statements</span>
                    </li>
                  </ul>

                  <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <a
                      href={EXTERNAL_LINKS.ibPersonal}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handlePortalClick('Personal OBDX', EXTERNAL_LINKS.ibPersonal)}
                      className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Launch Personal Internet Banking</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={EXTERNAL_LINKS.forgotPassword}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-100 hover:bg-slate-200 text-[#002554] text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                      <span>Reset Password</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    <HelpCircle className="w-4 h-4" />
                    <span>Quick Assistance</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Forgot your username or need your internet banking unlocked? Our 24/7 contact centre is ready to assist you.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500">Toll-Free (All Networks):</span>
                      <span className="font-bold text-[#002554]">460 / 461</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500">Direct Switchboard:</span>
                      <a href={CONTACT.switchboard.href} className="font-bold text-[#002554] hover:underline">
                        {CONTACT.switchboard.display}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500">Official WhatsApp:</span>
                      <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 hover:underline">
                        {CONTACT.whatsapp.display}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Corporate & SME */}
            {selectedPortal === 'corporate' && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#002554] rounded-full text-xs font-bold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Corporate & SME Online Banking</span>
                  </div>
                  <h2 className="text-xl font-black text-[#002554]">
                    Enterprise-grade cash and treasury management
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Designed for registered companies, trusts, and commercial institutions requiring multi-tier approvals, bulk payroll processing, high-value RTGS settlements, and forex management.
                  </p>

                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Multi-user dual authorisations and role-based matrix approval</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Automated bulk salary processing directly into CBZ and interbank accounts</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Letters of credit, customs guarantees, and trade finance lines</span>
                    </li>
                  </ul>

                  <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <a
                      href={EXTERNAL_LINKS.ibCorporate}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handlePortalClick('Corporate OBDX', EXTERNAL_LINKS.ibCorporate)}
                      className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#002554] hover:bg-[#0A3E80] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Launch Corporate Internet Banking</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    <PhoneCall className="w-4 h-4" />
                    <span>Corporate Support Desk</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For corporate mandate updates, token inquiries, or host-to-host ERP integration, speak directly with your dedicated Relationship Manager or our corporate helpdesk.
                  </p>
                  <div className="pt-2 text-xs text-slate-700">
                    <p className="font-bold text-[#002554]">Corporate Helpdesk Email:</p>
                    <a href="mailto:corporatebanking@cbz.co.zw" className="text-slate-600 hover:text-[#E4002B]">
                      corporatebanking@cbz.co.zw
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Mobile Touch & USSD */}
            {selectedPortal === 'touch' && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Zero-Rated Mobile Banking</span>
                  </div>
                  <h2 className="text-xl font-black text-[#002554]">
                    CBZ Touch Mobile App &amp; {CONTACT.ussd.display} USSD
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Transact on the go without consuming your mobile data on selected networks. Send money, scan to pay via QR, buy airtime, manage virtual cards, and track spending in real time.
                  </p>

                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <span className="text-xs font-extrabold text-[#002554] block mb-1">
                        Download CBZ Touch
                      </span>
                      <p className="text-xs text-slate-500 mb-3">
                        Available on Android Google Play and Apple iOS App Store.
                      </p>
                      <div className="flex flex-col gap-2">
                        <a
                          href={EXTERNAL_LINKS.touchPlayStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg inline-flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Google Play Store</span>
                        </a>
                        <a
                          href={EXTERNAL_LINKS.touchAppStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg inline-flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Apple App Store</span>
                        </a>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <span className="text-xs font-extrabold text-[#002554] block mb-1">
                        No Smartphone or Data?
                      </span>
                      <p className="text-xs text-slate-500 mb-3">
                        Use our universal USSD short code on any phone model across Econet, NetOne, and Telecel.
                      </p>
                      <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-center">
                        <span className="text-lg font-black text-[#002554] tracking-wider block">
                          {CONTACT.ussd.display}
                        </span>
                        <span className="text-2xs text-slate-500">Dial to bank instantly</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>App Highlights</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Biometric fingerprint and FaceID login</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Instant foreign currency Nostro and local transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Cardless ATM cash withdrawals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Zero-rated browsing on participating domestic carrier networks</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security / Phishing Protection Warning Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-base text-[#002554]">
                Security Checklist: Protect Your Banking Credentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                CBZ will <strong>never</strong> call, SMS, or email you asking for your password, PIN, OTP (One-Time Password), or card CVV. Always verify the address bar displays our official encrypted domain: <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">obdx.cbz.co.zw</code> with a valid padlock icon.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                <button
                  onClick={() => onNavigate('security')}
                  className="text-[#002554] hover:text-[#E4002B] underline cursor-pointer"
                >
                  Read our full Security & Anti-Phishing Guide
                </button>
                <a
                  href={CONTACT.phoneHref}
                  className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>Report suspicious activity: {CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
