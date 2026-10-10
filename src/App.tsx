import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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

  const handleExploreClick = () => {
    const el = document.getElementById('crop-recommendation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorksClick = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6EF] text-[#17251D] flex flex-col selection:bg-[#DDF3E4] selection:text-[#143D2B]">
      {/* 1. Premium Sticky Navbar */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenDashboard={() => setDashboardModalOpen(true)}
        onOpenPartner={() => setPartnerTier('Regional Growth')}
      />

      <main className="flex-1 pt-16">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onHowItWorksClick={handleHowItWorksClick}
        />

        {/* 3. Capability Strip */}
        <CapabilityStrip />

        {/* 4. AI Crop Soil Recommendation Module */}
        <CropRecommendationSection />

        {/* 5. Plant Disease Diagnostic Scanner */}
        <PlantDiseaseDetectionSection />

        {/* 6. FARMERS AI Advisory Q&A Assistant */}
        <FarmingAssistantSection />

        {/* 7. Real-Time Weather & APMC Market Mandi Prices */}
        <WeatherMarketSection />

        {/* 8. Farm Records & Scheduled Reminders */}
        <FarmingRecordsRemindersSection />

        {/* 9. Platform Overview Bento */}
        <PlatformOverview />

        {/* 10. Unified AI Market Intelligence Dashboard */}
        <MarketDashboard onContactBuyer={handleOpenContactBuyer} />

        {/* 11. AgriConnect Regional Intelligence */}
        <AgriConnectSection
          onContactDealer={(dealer: DealerListing) => {
            setPartnerTier(`Inquiry with ${dealer.businessName}`);
          }}
        />

        {/* 12. Local Buyer Marketplace */}
        <BuyerMarketplaceSection
          onContactBuyer={handleOpenContactBuyer}
          onPostHarvestListing={() => setOnboardingOpen(true)}
        />

        {/* 13. Crop Score & Sustainability Rewards */}
        <CropScoreSection
          onPreviewEvidence={(practice) => setPreviewPractice(practice)}
        />

        {/* 14. Dealer Promotions */}
        <DealerPromotionSection onPartnerClick={handleOpenDealerCampaign} />

        {/* 15. WhatsApp Smart Alerts */}
        <SmartAlertsSection />

        {/* 16. How FARMERS AI Works */}
        <HowItWorks onStartOnboarding={() => setOnboardingOpen(true)} />

        {/* 17. Storytelling & Farmer Impact */}
        <StorytellingSection />

        {/* 18. FAQ */}
        <FaqSection />

        {/* 19. Final Call-to-Action */}
        <CtaSection
          onRegisterClick={() => setAuthModalOpen(true)}
          onPartnerClick={() => handleOpenDealerCampaign('General Partner Tier')}
        />
      </main>

      {/* 20. Comprehensive Footer */}
      <Footer />

      {/* Floating Quick Auth / Partner Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAuthModalOpen(true)}
          className="bg-[#143D2B] hover:bg-[#1B5E20] text-white px-4 py-2.5 rounded-full shadow-2xl border border-[#F2C14E]/50 text-xs font-bold flex items-center gap-2 group transition-all transform hover:scale-105 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#F2C14E] animate-pulse" />
          <span>Farmer Portal Login</span>
        </button>
      </div>

      {/* Modals */}
      <FarmerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
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
