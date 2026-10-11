import React from 'react';
import { ArrowRight, LayoutDashboard, ShieldCheck, Sprout, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenDashboard: () => void;
  onExploreFeatures: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDashboard,
  onExploreFeatures,
  onHowItWorksClick,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#176B45] text-white overflow-hidden border-b border-[#176B45]/20">
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="agniva-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.7" />
              <circle cx="20" cy="20" r="1" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agniva-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTA Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-emerald-100 text-xs font-bold tracking-wide mb-4">
              <Sprout className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t('hero_badge', 'Agniva • Next-Gen Farmer AI Platform', 'அக்னிவா • நவீன வேளாண் AI தளம்')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] mb-4 text-balance font-serif">
              {t('hero_title_p1', 'Smart Decisions for', 'ஒவ்வொரு அறுவடைக்கும்')}{' '}
              <span className="text-emerald-200 underline decoration-emerald-300/60 decoration-wavy decoration-2">
                {t('hero_title_p2', 'Every Harvest.', 'சரியான முடிவுகள்.')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed mb-6 font-sans">
              {t(
                'hero_subtitle',
                'Data-driven crop recommendations, real-time APMC mandi prices, instant leaf disease diagnosis, and hyper-local weather alerts in one unified mobile platform.',
                'மண் பரிசோதனை சார்ந்த பயிர் பரிந்துரைகள், நேரலை APMC சந்தை விலைகள், பயிர் நோய் கண்டறிதல் மற்றும் உள்ளூர் வானிலை எச்சரிக்கைகள் அனைத்தும் ஒரே மொபைல் தளத்தில்.'
              )}
            </p>

            {/* Primary & Secondary Action Buttons (Min height 44px for touch targets) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
              <button
                onClick={onOpenDashboard}
                className="min-h-[46px] px-6 py-3 bg-white text-[#176B45] hover:bg-emerald-50 active:scale-[0.98] font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-[#176B45]" />
                <span>{t('btn_open_dashboard', 'Open Farmer Dashboard', 'விவசாயி டாஷ்போர்டு திறக்க')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreFeatures}
                className="min-h-[46px] px-5 py-3 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white border border-white/25 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('btn_explore_features', 'Explore Capabilities', 'அம்சங்களை பார்க்க')}</span>
              </button>
            </div>

            {/* Verified Trust Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100/90 pt-3 border-t border-white/10 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{t('trust_free', 'Free for Individual Farmers', 'விவசாயிகளுக்கு முற்றிலும் இலவசம்')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{t('trust_supabase', 'Supabase Cloud Synced', 'Supabase கிளவுட் பாதுகாப்பு')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile-Ready Highlight Metrics Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/95 text-[#17231C] p-5 sm:p-6 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#176B45] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#176B45] block">
                      {t('live_snapshot', 'Live Market Intelligence', 'நேரலை சந்தை நிலவரம்')}
                    </span>
                    <h3 className="text-sm font-bold text-[#17231C]">
                      {t('mandi_hub', 'Kurnool & Coimbatore Mandi', 'கர்னூல் & கோவை சந்தை')}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  {t('status_live', 'Live Feed', 'நேரலை')}
                </span>
              </div>

              {/* Mini Price Row Sample */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-[#F7F9F5] rounded-xl border border-[#E2E8DF]">
                  <span className="text-xs text-[#526357] block font-medium">Paddy (धान)</span>
                  <div className="text-lg font-black text-[#17231C] mt-0.5">₹2,350 <span className="text-[10px] text-gray-500 font-normal">/qtl</span></div>
                  <span className="text-[10px] font-bold text-emerald-700">▲ +1.8% vs last wk</span>
                </div>
                <div className="p-3 bg-[#F7F9F5] rounded-xl border border-[#E2E8DF]">
                  <span className="text-xs text-[#526357] block font-medium">Tomato (F1)</span>
                  <div className="text-lg font-black text-[#17231C] mt-0.5">₹1,840 <span className="text-[10px] text-gray-500 font-normal">/qtl</span></div>
                  <span className="text-[10px] font-bold text-emerald-700">Daily Demand High</span>
                </div>
              </div>

              {/* Quick Prompt */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#526357]">
                <span>{t('open_dash_hint', 'Access full advisor, diagnostic scanner & records:', 'முழு கருவிகளையும் டாஷ்போர்டில் பெறுக:')}</span>
                <button
                  onClick={onOpenDashboard}
                  className="font-bold text-[#176B45] hover:underline cursor-pointer"
                >
                  {t('btn_view', 'View', 'பார்')} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
