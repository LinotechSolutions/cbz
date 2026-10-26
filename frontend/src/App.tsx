import React, { Suspense, lazy, useMemo, useState } from 'react';
import { Country } from './types';
import { useScreenRoute } from './lib/routes';
import { usePageMeta } from './lib/usePageMeta';
import { COUNTRIES } from './data/cbzData';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Navbar } from './components/Navbar';
import { AnnouncementsBar } from './components/AnnouncementsBar';
import { HeroSection } from './components/HeroSection';
import { HelpYouSection } from './components/HelpYouSection';
import { EcosystemGrid } from './components/EcosystemGrid';
import { HelpAndNotices } from './components/HelpAndNotices';
import { BranchFinder } from './components/BranchFinder';
import { LoginModal, PortalType } from './components/LoginModal';
import { ContactChannelsModal } from './components/ContactChannelsModal';
import { Footer } from './components/Footer';
import { ClientProfileProvider } from './context/ClientProfileContext';
import { SiteImagesProvider } from './context/SiteImagesContext';
import { Reveal } from './components/Reveal';

// Pages other than home load on demand, so the first visit only downloads what it shows
const CustomerJourney = lazy(() => import('./components/CustomerJourney').then((m) => ({ default: m.CustomerJourney })));
const SbuInsuranceView = lazy(() => import('./components/SbuInsuranceView').then((m) => ({ default: m.SbuInsuranceView })));
const SbuAgribusinessView = lazy(() => import('./components/SbuAgribusinessView').then((m) => ({ default: m.SbuAgribusinessView })));
const SbuInvestmentsView = lazy(() => import('./components/SbuInvestmentsView').then((m) => ({ default: m.SbuInvestmentsView })));
const SbuPropertiesView = lazy(() => import('./components/SbuPropertiesView').then((m) => ({ default: m.SbuPropertiesView })));
const SbuBankingView = lazy(() => import('./components/SbuBankingView').then((m) => ({ default: m.SbuBankingView })));
const TheGroupView = lazy(() => import('./components/TheGroupView').then((m) => ({ default: m.TheGroupView })));
const SbuRedSphereView = lazy(() => import('./components/SbuRedSphereView').then((m) => ({ default: m.SbuRedSphereView })));
const SbuLifeView = lazy(() => import('./components/SbuLifeView').then((m) => ({ default: m.SbuLifeView })));
const SbuCapitalView = lazy(() => import('./components/SbuCapitalView').then((m) => ({ default: m.SbuCapitalView })));
const SbuRiskAdvisoryView = lazy(() => import('./components/SbuRiskAdvisoryView').then((m) => ({ default: m.SbuRiskAdvisoryView })));
const LoginPage = lazy(() => import('./components/LoginPage').then((m) => ({ default: m.LoginPage })));
const DiasporaView = lazy(() => import('./components/DiasporaView').then((m) => ({ default: m.DiasporaView })));
const SecurityView = lazy(() => import('./components/SecurityView').then((m) => ({ default: m.SecurityView })));
const InfoPage = lazy(() => import('./components/InfoPage').then((m) => ({ default: m.InfoPage })));
const ChatWidget = lazy(() => import('./components/ChatWidget'));
import { CallbackModal } from './components/CallbackModal';

export default function App() {
  // URL-backed screen state (see src/lib/routes.ts). navigate() pushes history and scrolls to top.
  const [currentScreen, setCurrentScreen] = useScreenRoute();
  usePageMeta(currentScreen);
  const [currentCountry, setCurrentCountry] = useState<Country>(COUNTRIES[0]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginPortal, setLoginPortal] = useState<PortalType>('personal');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackService, setCallbackService] = useState('CBZ Bank');
  const [callbackNote, setCallbackNote] = useState('');

  const openCallback = (service = 'CBZ Holdings', note = '') => {
    setCallbackService(service);
    setCallbackNote(note);
    setIsCallbackOpen(true);
  };
  // Account type chosen on the page that sent the user to /open-account (e.g. a product card)
  const [accountType, setAccountType] = useState<string | undefined>();
  const accountSeed = useMemo(() => (accountType ? { accountType } : undefined), [accountType]);
  const openAccount = (type?: string) => {
    setAccountType(type);
    setCurrentScreen('open-account');
  };
  // Diaspora needs a top-level entry, not a buried option: this opens the
  // banking journey with the diaspora path already chosen.
  const [bankProduct, setBankProduct] = useState<string | undefined>();
  const bankSeed = useMemo(() => (bankProduct ? { product: bankProduct } : undefined), [bankProduct]);
  const startBankJourney = (product?: string) => {
    setBankProduct(product);
    setCurrentScreen('journey-bank');
  };
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <ClientProfileProvider>
    <SiteImagesProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-clip">

      {/* Top Utility Bar (Rotating Indicative FX, Toll-Free, WhatsApp, Channels Trigger) */}
      <TopUtilityBar
        currentCountry={currentCountry}
        onSelectCountry={setCurrentCountry}
        activeEntityName={
          currentScreen === 'bank' || currentScreen === 'journey-bank' || currentScreen === 'open-account'
            ? 'CBZ Bank'
            : currentScreen === 'sbu' || currentScreen === 'journey'
            ? 'CBZ Insurance'
            : currentScreen === 'agro' || currentScreen === 'journey-agro'
            ? 'CBZ Agro-Yield'
            : currentScreen === 'invest' || currentScreen === 'journey-invest'
            ? 'Datvest Investments'
            : currentScreen === 'capital' || currentScreen === 'journey-capital'
            ? 'CBZ Capital'
            : currentScreen === 'risk-advisory' || currentScreen === 'journey-risk'
            ? 'CBZ Risk Advisory Services'
            : currentScreen === 'red-sphere'
            ? 'Red Sphere Finance'
            : currentScreen === 'cbz-life'
            ? 'CBZ Life'
            : currentScreen === 'properties' || currentScreen === 'home-journey'
            ? 'CBZ Properties'
            : currentScreen === 'diaspora'
            ? 'CBZ Diaspora Banking'
            : currentScreen === 'group' || currentScreen === 'the-group'
            ? 'CBZ Holdings Limited'
            : undefined
        }
        onGoHome={() => setCurrentScreen('home')}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Main Navigation Bar (With Prominent Open Account button) */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenLogin={(portal?: PortalType) => {
          if (portal) setLoginPortal(portal);
          setIsLoginOpen(true);
        }}
        onOpenAccount={() => openAccount()}
        onOpenContact={() => setIsContactModalOpen(true)}
        entityName={
          currentScreen === 'bank' || currentScreen === 'journey-bank' || currentScreen === 'open-account'
            ? 'Bank'
            : currentScreen === 'sbu' || currentScreen === 'journey'
            ? 'Insurance'
            : currentScreen === 'cbz-life'
            ? 'Life'
            : currentScreen === 'agro' || currentScreen === 'journey-agro'
            ? 'Agro-Yield'
            : currentScreen === 'invest' || currentScreen === 'journey-invest'
            ? 'Datvest'
            : currentScreen === 'capital' || currentScreen === 'journey-capital'
            ? 'Capital'
            : currentScreen === 'risk-advisory' || currentScreen === 'journey-risk'
            ? 'Risk Advisory'
            : currentScreen === 'red-sphere'
            ? 'Red Sphere'
            : currentScreen === 'properties' || currentScreen === 'home-journey'
            ? 'Properties'
            : currentScreen === 'diaspora'
            ? 'Diaspora'
            : 'Holdings'
        }
      />

      {/* Screen Views */}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-screen" />}>
        {currentScreen === 'home' && (
          <div>
            {/* Urgent Corporate Notice Ticker */}
            <AnnouncementsBar
              onOpenAll={() => {
                const el = document.getElementById('announcements-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Clean Authoritative Hero (No AI gradients, no AI pills, Open Account CTA) */}
            <HeroSection
              country={currentCountry}
              onNavigate={setCurrentScreen}
              onOpenAccount={() => openAccount()}
              onOpenContact={() => setIsContactModalOpen(true)}
            />

            {/* The homepage is four sections: hero, what we can help with,
                who we are, and help plus notices. It used to be eight, three of
                which were the same icon-card grid in different clothes. See
                HelpYouSection and HelpAndNotices for what was folded into each. */}

            {/* What visitors arrive to do, what they might need, and who they
                are: one section instead of the four that used to follow the hero. */}
            <HelpYouSection
              onNavigate={setCurrentScreen}
              onLogin={() => setCurrentScreen('login')}
              onOpenAccount={() => openAccount()}
              onDiaspora={() => setCurrentScreen('diaspora')}
            />

            {/* Each section below rises into place as it scrolls into view.
                The hero is deliberately left alone: it is above the fold, and
                animating it would delay the first thing a visitor reads. */}

            {/* Group Subsidiaries (Showcasing Official Logos instead of card repetition) */}
            <Reveal>
              <EcosystemGrid onNavigate={setCurrentScreen} />
            </Reveal>

            {/* Support channels and the latest notices, in one section. */}
            <Reveal>
              <HelpAndNotices onOpenContact={() => setIsContactModalOpen(true)} />
            </Reveal>

            {/* Branch and ATM map. Owns the #branch-directory anchor that the
                contact modal, footer and hero all point at. */}
            <Reveal>
              <BranchFinder />
            </Reveal>
          </div>
        )}

        {currentScreen === 'journey' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="insurance"
            seed={{ asset: 'motor' }}
          />
        )}

        {currentScreen === 'bank' && (
          <SbuBankingView country={currentCountry} onNavigate={setCurrentScreen} onOpenAccount={openAccount} />
        )}

        {currentScreen === 'sbu' && (
          <SbuInsuranceView country={currentCountry} onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'agro' && (
          <SbuAgribusinessView country={currentCountry} onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'invest' && (
          <SbuInvestmentsView country={currentCountry} onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'properties' && (
          <SbuPropertiesView country={currentCountry} onNavigate={setCurrentScreen} />
        )}

        {(currentScreen === 'group' || currentScreen === 'the-group') && (
          <TheGroupView country={currentCountry} onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'home-journey' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="properties"
          />
        )}

        {currentScreen === 'journey-invest' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="datvest"
          />
        )}

        {currentScreen === 'journey-bank' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="bank"
            seed={bankSeed}
          />
        )}

        {currentScreen === 'red-sphere' && <SbuRedSphereView onNavigate={setCurrentScreen} />}

        {currentScreen === 'cbz-life' && <SbuLifeView onNavigate={setCurrentScreen} />}

        {currentScreen === 'capital' && <SbuCapitalView onNavigate={setCurrentScreen} />}

        {currentScreen === 'risk-advisory' && <SbuRiskAdvisoryView onNavigate={setCurrentScreen} />}

        {currentScreen === 'journey-capital' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="capital"
          />
        )}

        {currentScreen === 'journey-risk' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="riskadvisory"
          />
        )}

        {currentScreen === 'open-account' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="account"
            seed={accountSeed}
          />
        )}

        {currentScreen === 'journey-agro' && (
          <CustomerJourney
            country={currentCountry}
            onNavigate={setCurrentScreen}
            startWith="agroyield"
          />
        )}

        {currentScreen === 'login' && (
          <LoginPage onNavigate={setCurrentScreen} onOpenAccount={() => openAccount()} />
        )}

        {currentScreen === 'diaspora' && (
          <DiasporaView
            onNavigate={setCurrentScreen}
            onOpenAccount={openAccount}
            onOpenContact={() => setIsContactModalOpen(true)}
            onRequestEnquiry={(service, note) => openCallback(service, note)}
          />
        )}

        {currentScreen === 'security' && (
          <SecurityView onNavigate={setCurrentScreen} />
        )}

        {/* Group information and regulatory pages share one document layout. */}
        {(currentScreen === 'business-conditions' ||
          currentScreen === 'privacy-policy' ||
          currentScreen === 'tip-offs' ||
          currentScreen === 'foundation') && (
          <InfoPage page={currentScreen} onNavigate={setCurrentScreen} />
        )}
        </Suspense>
      </main>

      {/* Persistent Comprehensive Footer (With Verified Social Media & Toll-Free Links) */}
      <Footer
        country={currentCountry}
        onNavigate={setCurrentScreen}
        onOpenAccount={() => openAccount()}
        onOpenContact={() => setIsContactModalOpen(true)}
        activeEntity={
          currentScreen === 'bank'
            ? 'Bank'
            : currentScreen === 'sbu'
            ? 'Insurance'
            : currentScreen === 'cbz-life'
            ? 'Life'
            : currentScreen === 'capital'
            ? 'Capital'
            : currentScreen === 'risk-advisory'
            ? 'Risk Advisory'
            : currentScreen === 'red-sphere'
            ? 'Red Sphere'
            : currentScreen === 'agro'
            ? 'Agro-Yield'
            : currentScreen === 'invest'
            ? 'Datvest'
            : currentScreen === 'properties'
            ? 'Properties'
            : currentScreen === 'diaspora'
            ? 'Bank'
            : undefined
        }
      />

      {/* Interactive Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onNavigate={setCurrentScreen}
        initialPortal={loginPortal}
      />

      {/* Interactive All Contact Channels Modal */}
      <ContactChannelsModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Lead Generation & Callback Modal (Connected to /accounts/onboard/) */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        initialService={callbackService}
        initialNote={callbackNote}
      />

      {/* Full-site AI Concierge — persists across all screen changes */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>

    </div>
    </SiteImagesProvider>
    </ClientProfileProvider>
  );
}
