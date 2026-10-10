import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CapabilityStrip } from './components/CapabilityStrip';
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

import {
  BuyerInquiryModal,
  DealerCampaignModal,
  FarmerOnboardingModal,
  EvidencePreviewModal,
} from './components/ContactModals';
import { BuyerOffer, DealerListing, PracticeCriterion } from './types';

export const App: React.FC = () => {
  // Modal states
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
    const el = document.getElementById('market-dashboard');
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
        onOpenRegister={() => setOnboardingOpen(true)}
        onOpenSignIn={() => setOnboardingOpen(true)}
        onOpenPartner={() => setPartnerTier('Regional Growth')}
      />

      <main className="flex-1">
        {/* 2. Cinematic Animated Hero */}
        <Hero
          onExploreClick={handleExploreClick}
          onHowItWorksClick={handleHowItWorksClick}
        />

        {/* 3. Agricultural Capability Strip */}
        <CapabilityStrip />

        {/* 4. Platform Introduction & Feature Bento Grid */}
        <PlatformOverview />

        {/* 5. Unified AI Market Intelligence Dashboard & Interactive Demo */}
        <MarketDashboard onContactBuyer={handleOpenContactBuyer} />

        {/* 6. AgriConnect Regional Intelligence & Dealer Discovery */}
        <AgriConnectSection
          onContactDealer={(dealer: DealerListing) => {
            // Open partner modal with dealer name
            setPartnerTier(`Inquiry with ${dealer.businessName}`);
          }}
        />

        {/* 7. Local Buyer Marketplace */}
        <BuyerMarketplaceSection
          onContactBuyer={handleOpenContactBuyer}
          onPostHarvestListing={() => setOnboardingOpen(true)}
        />

        {/* 8. Crop Intelligence Score & Rewards */}
        <CropScoreSection
          onPreviewEvidence={(practice) => setPreviewPractice(practice)}
        />

        {/* 9. Fertilizer & Dealer Promotions */}
        <DealerPromotionSection onPartnerClick={handleOpenDealerCampaign} />

        {/* 10. WhatsApp & Agricultural Smart Alerts */}
        <SmartAlertsSection />

        {/* 11. How FARMERS AI Works */}
        <HowItWorks onStartOnboarding={() => setOnboardingOpen(true)} />

        {/* 12. Farmer Storytelling & Human Impact */}
        <StorytellingSection />

        {/* 13. FAQ */}
        <FaqSection />

        {/* 14. Final Call-to-Action */}
        <CtaSection
          onRegisterClick={() => setOnboardingOpen(true)}
          onPartnerClick={() => handleOpenDealerCampaign('General Partner Tier')}
        />
      </main>

      {/* 15. Comprehensive Footer */}
      <Footer />

      {/* Floating Quick Trigger: Open AgriConnect Partner Popup anytime */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setPartnerTier('Regional Growth')}
          className="bg-[#143D2B] hover:bg-[#1B5E20] text-white px-4 py-2.5 rounded-full shadow-2xl border border-[#F2C14E]/50 text-xs font-bold flex items-center gap-2 group transition-all transform hover:scale-105 cursor-pointer"
          title="Open AgriConnect Partner Popup"
        >
          <span className="w-2 h-2 rounded-full bg-[#F2C14E]" />
          <span>AgriConnect Partner Popup</span>
        </button>
      </div>

      {/* Interactive Modals */}
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

export default App;
