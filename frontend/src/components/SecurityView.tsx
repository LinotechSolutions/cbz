import React from 'react';
import { ArrowLeft, CheckCircle2, Lock, PhoneCall, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ScreenType } from '../types';
import { CONTACT } from '../data/facts';
import { Logo } from './Logo';

interface SecurityViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SecurityView: React.FC<SecurityViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-bold text-slate-500 hover:text-[#E4002B] flex items-center gap-1.5 cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs mb-8">
          <Logo brand="holdings" height={42} />
          <span className="mt-6 block text-xs font-extrabold uppercase tracking-widest text-[#E4002B]">
            Digital Safety & Cyber Protection
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-black text-[#002554] tracking-tight">
            How to Spot Fake CBZ Sites & Protect Your Accounts
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-2xl">
            Cybercriminals may create counterfeit websites, clone social media pages, or send fraudulent SMS notifications claiming your account is blocked. Follow this guide to safeguard your financial information.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Verified Official CBZ Web Domains</span>
              </div>
              <p className="text-xs text-slate-600">
                Always ensure the address bar in your web browser starts with one of our official registered domains:
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-slate-800">
                <li className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">https://www.cbz.co.zw</li>
                <li className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">https://obdx.cbz.co.zw</li>
                <li className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">https://rs.cbz.co.zw</li>
              </ul>
            </div>

            <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>Red Flags to Watch Out For</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Unsolicited emails or SMS asking you to "click here to unlock your account".</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Websites hosted on free web builders (.weebly, .wixsite, .firebaseapp, .blogspot).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Anyone calling and asking you to read out the OTP (One-Time Password) sent to your mobile phone.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
            <h2 className="text-lg font-black text-[#002554]">
              Five Rules for Safe Digital Banking
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Never Share Your PIN or OTP</strong>
                  <span>CBZ staff will NEVER ask for your password, ATM PIN, or SMS OTP code.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Type the URL Manually</strong>
                  <span>Type <code className="font-mono font-bold">cbz.co.zw</code> directly into your browser address bar instead of clicking search engine ad links.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Check for the Padlock</strong>
                  <span>Verify your browser displays a secure connection (HTTPS) before entering credentials.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Report Immediately</strong>
                  <span>If you suspect your credentials have been compromised, contact us immediately to lock your card and digital banking profile.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-[#002554] to-[#0A3E80] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm">Need to report fraud or suspicious activity?</h3>
              <p className="text-xs text-slate-200 mt-1">Our fraud monitoring team is active 24/7/365.</p>
            </div>
            <a
              href={CONTACT.phoneHref}
              className="px-5 py-2.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call {CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
