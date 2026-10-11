import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureOverviewGrid } from './components/FeatureOverviewGrid';
import { FarmerDashboardView } from './components/FarmerDashboardView';
import { MobileBottomNav } from './components/MobileBottomNav';

import { CapabilityStrip } from './components/CapabilityStrip';
import { CropRecommendationSection } from './components/CropRecommendationSection';
import { PlantDiseaseDetectionSection } from './components/PlantDiseaseDetectionSection';
import { FarmingAssistantSection } from './components/FarmingAssistantSection';
import { WeatherMarketSection } from './components/WeatherMarketSection';
import { FarmingRecordsRemindersSection } from './components/FarmingRecordsRemindersSection';

import { PlatformOverview } from './components/PlatformOverview';
import { MarketDashboard } from './components/MarketDashboard';
import { AgriConnectSection } from './components/AgriConnectSection';
import { BuyerMarketplaceSection } from './components/BuyerMarketplaceSection';
import { CropScoreSection } from './components/CropScoreSection';
import { DealerPromotionSection } from './components/DealerPromotionSection';
import { SmartAlertsSection } from './components/SmartAlertsSection';
import { HowItWorks } from './components/HowItWorks';
import { StorytellingSection } from './components/StorytellingSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';

import { FarmerAuthModal } from './components/FarmerAuthModal';
import { FarmerDashboardModal } from './components/FarmerDashboardModal';

import {
  BuyerInquiryModal,
  DealerCampaignModal,
  FarmerOnboardingModal,
  EvidencePreviewModal,
} from './components/ContactModals';
import { BuyerOffer, DealerListing, PracticeCriterion } from './types';

const MainAppContent: React.FC = () => {
  // Navigation view state ('home' or 'dashboard')
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [inquiryOffer, setInquiryOffer] = useState<BuyerOffer | null>(null);
  const [partnerTier, setPartnerTier] = useState<string | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [previewPractice, setPreviewPractice] = useState<PracticeCriterion | null>(null);

  const handleOpenContactBuyer = (offer: BuyerOffer) => {
    setInquiryOffer(offer);
  };

  const handleOpenDealerCampaign = (tierName: string) => {
    setPartnerTier(tierName);
  };

  const handleScrollToSection = (sectionId: string) => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-[#17231C] flex flex-col selection:bg-[#DDF3E4] selection:text-[#176B45] pb-16 md:pb-0">
      {/* 1. Modern Responsive Navbar */}
      <Navbar
        currentView={currentView}
        onNavigateView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenDashboardModal={() => setDashboardModalOpen(true)}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1 pt-14">
        {currentView === 'home' ? (
          <>
            {/* Mobile-First Hero Section */}
            <Hero
              onOpenDashboard={() => {
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreFeatures={() => handleScrollToSection('feature-grid')}
              onHowItWorksClick={() => handleScrollToSection('how-it-works')}
            />

            {/* Core Capabilities Interactive Feature Grid */}
            <div id="feature-grid">
              <FeatureOverviewGrid
                onNavigateSection={handleScrollToSection}
                onOpenDashboard={() => {
                  setCurrentView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* Agricultural Capability Strip */}
            <CapabilityStrip />

            {/* AI Crop Soil Recommendation Module */}
            <CropRecommendationSection />

            {/* Plant Disease Diagnostic Scanner */}
            <PlantDiseaseDetectionSection />

            {/* FARMERS AI Advisory Q&A Assistant */}
            <FarmingAssistantSection />

            {/* Real-Time Weather & APMC Market Mandi Prices */}
            <WeatherMarketSection />

            {/* Farm Records & Scheduled Reminders */}
            <FarmingRecordsRemindersSection />

            {/* Platform Overview Bento */}
            <PlatformOverview />

            {/* Unified AI Market Intelligence Dashboard */}
            <MarketDashboard onContactBuyer={handleOpenContactBuyer} />

            {/* AgriConnect Regional Intelligence */}
            <AgriConnectSection
              onContactDealer={(dealer: DealerListing) => {
                setPartnerTier(`Inquiry with ${dealer.businessName}`);
              }}
            />

            {/* Local Buyer Marketplace */}
            <BuyerMarketplaceSection
              onContactBuyer={handleOpenContactBuyer}
              onPostHarvestListing={() => setOnboardingOpen(true)}
            />

            {/* Crop Score & Sustainability Rewards */}
            <CropScoreSection
              onPreviewEvidence={(practice) => setPreviewPractice(practice)}
            />

            {/* Dealer Promotions */}
            <DealerPromotionSection onPartnerClick={handleOpenDealerCampaign} />

            {/* WhatsApp Smart Alerts */}
            <SmartAlertsSection />

            {/* How FARMERS AI Works */}
            <HowItWorks onStartOnboarding={() => setOnboardingOpen(true)} />

            {/* Storytelling & Farmer Impact */}
            <StorytellingSection />

            {/* FAQ */}
            <FaqSection />

            {/* Final Call-to-Action */}
            <CtaSection
              onRegisterClick={() => setAuthModalOpen(true)}
              onPartnerClick={() => handleOpenDealerCampaign('General Partner Tier')}
            />
          </>
        ) : (
          /* Redesigned Full-Screen Mobile-First Farmer Dashboard */
          <FarmerDashboardView
            onNavigateSection={handleScrollToSection}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
      </main>

      {/* 3. Comprehensive Footer */}
      <Footer />

      {/* 4. Mobile Bottom Navigation Bar (Visible only on < 768px screens) */}
      <MobileBottomNav
        currentView={currentView}
        onNavigateView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateSection={handleScrollToSection}
      />

      {/* 5. Modals */}
      <FarmerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessAuth={() => {
          setCurrentView('dashboard');
          setDashboardModalOpen(true);
        }}
      />

      <FarmerDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
      />

      <BuyerInquiryModal
        offer={inquiryOffer}
        onClose={() => setInquiryOffer(null)}
      />

      {partnerTier !== null && (
        <DealerCampaignModal
          selectedTier={partnerTier}
          onClose={() => setPartnerTier(null)}
        />
      )}

      <FarmerOnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />

      <EvidencePreviewModal
        practice={previewPractice}
        onClose={() => setPreviewPractice(null)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
