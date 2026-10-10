import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onHowItWorksClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center bg-[#143D2B] overflow-hidden">
      {/* Background Photography with CSS Gradient Fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=80"
          alt="Indian farmer standing in a lush agricultural field"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Deep Green & Atmospheric Scrim Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#143D2B] via-[#143D2B]/90 to-[#143D2B]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#143D2B] via-transparent to-[#143D2B]/50" />

        {/* Fine Topographic & Grid Texture Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="topo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#DDF3E4" strokeWidth="0.7" />
              <circle cx="30" cy="30" r="1" fill="#F2C14E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-grid)" />
        </svg>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F2C14E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4CAF50]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start pt-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#F2C14E] mb-4">
              <span>{t('hero_eyebrow1', 'Intelligent Agriculture', 'நவீன வேளாண்மை')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('hero_eyebrow2', 'Better Opportunities', 'சிறந்த வாய்ப்புகள்')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12] mb-6 text-balance">
              {t('hero_title_p1', 'Grow Smarter.', 'அறிவோடு விவசாயம் செய்.')}{' '}
              <span className="text-[#F2C14E] italic font-normal">
                {t('hero_title_p2', 'Sell at the Right Time.', 'சரியான நேரத்தில் விற்பனை செய்.')}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
              {t(
                'hero_subtitle',
                'AI-powered crop insights, smarter selling decisions, trusted local buyers, and rewards for better farming practices — all in one platform built for farmers.',
                'செயற்கை நுண்ணறிவுடன் கூடிய பயிர் தகவல்கள், சிறந்த விற்பனை முடிவுகள், நம்பகமான உள்ளூர் வாங்குபவர்கள் மற்றும் இயற்கை விவசாய ஊக்கத்தொகைகள் — அனைத்தும் ஒரே தளத்தில்.'
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F2C14E] text-[#143D2B] font-bold text-base rounded-xl hover:bg-[#e5b33d] transition-all shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>{t('btn_explore_ai', 'Explore FARMERS AI', 'பயன்படுத்தத் தொடங்கு')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-base rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('btn_how_it_works', 'Discover How It Works', 'இது எப்படி செயல்படுகிறது')}</span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Supporting Trust Line */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/70 border-t border-white/10 pt-5 w-full">
              <span>{t('trust_1', 'Built around farmers', 'விவசாயிகளுக்காக உருவாக்கப்பட்டது')}</span>
              <span className="text-[#F2C14E]" aria-hidden="true">·</span>
              <span>{t('trust_2', 'Powered by intelligence', 'செயற்கை நுண்ணறிவு கொண்டது')}</span>
              <span className="text-[#F2C14E]" aria-hidden="true">·</span>
              <span>{t('trust_3', 'Connected to local markets', 'சந்தைகளுடன் இணைக்கப்பட்டது')}</span>
            </div>
          </div>

          {/* Right Column: Floating Interactive Insight Cards */}
          <div className="lg:col-span-5 relative flex flex-col gap-5 lg:pl-4">
            {/* Floating Insight Card 1 — Market Intelligence */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/20 text-[#17251D] transform lg:translate-x-2 transition-all hover:translate-y-[-2px]">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#DDF3E4] flex items-center justify-center text-[#143D2B]">
                    <TrendingUp className="w-4 h-4 text-[#1B5E20]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider block">
                      {t('card1_tag', 'AI Market Intelligence', 'சந்தை விலை விவரம்')}
                    </span>
                    <h2 className="text-sm font-bold text-[#17251D]">
                      {t('card1_crop', 'Crop: Paddy (BPT 5204)', 'பயிர்: நெல் (BPT 5204)')}
                    </h2>
                  </div>
                </div>
                <span className="text-[11px] text-[#69786E] font-mono">
                  {t('card1_mandi', 'Kurnool Mandi', 'கர்னூல் சந்தை')}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#69786E] block mb-0.5">
                    {t('card1_ref_price', 'Reference Price', 'குறிப்பு விலை')}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono tracking-tight text-[#143D2B] tabular-nums">
                      ₹2,350
                    </span>
                    <span className="text-xs text-[#69786E]">/ quintal</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#087F5B] font-semibold mt-1">
                    <span>▲ +1.8%</span>
                    <span className="text-[#69786E] font-normal">{t('vs_last_week', 'vs last week', 'சென்ற வாரத்தை விட')}</span>
                  </div>
                </div>

                <div className="bg-[#F7F6EF] p-2.5 rounded-xl border border-[#DDF3E4]">
                  <span className="text-[11px] font-semibold text-[#143D2B] block mb-1">
                    {t('card1_guidance_title', 'AI Selling Guidance', 'விற்பனை வழிகாட்டுதல்')}
                  </span>
                  <p className="text-xs text-[#17251D] leading-snug">
                    <span className="font-semibold text-[#1B5E20]">{t('monitor_cond', 'Monitor conditions:', 'நிலைமையை கவனிக்கவும்:')}</span>{' '}
                    {t('card1_guidance_body', 'Demand firming up, harvest arrivals steadying.', 'தேவை அதிகரித்து வருகிறது, வரத்து நிலையாக உள்ளது.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Insight Card 2 — Crop Practice Points */}
            <div className="bg-[#17251D]/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/15 text-white transform lg:-translate-x-2 transition-all hover:translate-y-[-2px]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#F2C14E]/20 flex items-center justify-center text-[#F2C14E]">
                    <Award className="w-4 h-4 text-[#F2C14E]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#F2C14E] uppercase tracking-wider block">
                      {t('card2_tag', 'FARMERS AI Stewardship', 'பயிர் தகுதி மதிப்பீடு')}
                    </span>
                    <h2 className="text-sm font-bold text-white">
                      {t('card2_score_title', 'Crop Intelligence Score', 'பயிர் நுண்ணறிவு மதிப்பெண்')}
                    </h2>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-xl font-bold text-[#F2C14E] tabular-nums">85</span>
                  <span className="text-xs text-white/50">/ 100</span>
                </div>
              </div>

              <div className="mt-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-white/90 bg-white/5 px-2.5 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" />
                    {t('card2_item1', 'Soil-test balanced nutrient prescription', 'மண் பரிசோதனை சார்ந்த உரமிடுதல்')}
                  </span>
                  <span className="text-[#4CAF50] font-mono font-medium">+20 pts</span>
                </div>
                <div className="flex items-center justify-between text-white/90 bg-white/5 px-2.5 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" />
                    {t('card2_item2', 'AWD Alternate wetting & drying irrigation', 'காய்ச்சி பாய்ச்சும் பாசன முறை')}
                  </span>
                  <span className="text-[#4CAF50] font-mono font-medium">+20 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
