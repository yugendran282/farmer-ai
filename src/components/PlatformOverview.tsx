import React from 'react';
import { ArrowRight, Compass, ShieldCheck, MapPin, Store, Sparkles, Cpu, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PlatformOverview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="platform" className="py-20 lg:py-28 bg-[#F7F6EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>{t('platform_eco_badge', 'The FARMERS AI Ecosystem', 'FARMERS AI சூழலமைப்பு')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('platform_arch_badge', 'AgriConnect Architecture', 'AgriConnect கட்டமைப்பு')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-6 text-balance">
            {t('platform_main_title', 'Designed for Farmers. Engineered for Connected Agriculture.', 'விவசாயிகளுக்காக உருவாக்கப்பட்டது. நவீன வேளாண்மைக்காக இணைக்கப்பட்டது.')}
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            {t(
              'platform_main_subtitle',
              'FARMERS AI unifies market price transparency, verifiable buyer networks, and practice-based reward incentives into a cohesive, farmer-first operating platform.',
              'சந்தை விலை வெளிப்படைத்தன்மை, சரிபார்க்கப்பட்ட வாங்குபவர்கள் மற்றும் இயற்கை வேளாண் ஊக்கத்தொகைகளை ஒருங்கிணைக்கும் ஒரு முழுமையான தளம்.'
            )}
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Bento Card 1: Core Farmer Intelligence (Col-span 7) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-[#143D2B]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-2">
                {t('bento_engine_badge', 'Core Engine', 'மைய இயந்திரம்')}
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] mb-4 font-serif">
                {t('bento_engine_title', 'AI Market Intelligence & Timing Engine', 'AI சந்தை நுண்ணறிவு & விற்பனை நேர வழிகாட்டி')}
              </h3>
              <p className="text-[#69786E] text-base leading-relaxed mb-6">
                {t(
                  'bento_engine_desc',
                  'Evaluating agricultural markets should not be guesswork. FARMERS AI synthesizes historical APMC mandi data, seasonal arrival volumes, and local buyer quotations to model net returns across holding, transport, and immediate sale paths.',
                  'வேளாண் சந்தைகளை கணிப்பது இனி கடினம் அல்ல. வரலாற்று APMC சந்தை தரவு, வரத்து மற்றும் வாங்குபவர்களின் விலையை ஒப்பிட்டு சிறந்த விற்பனை வழிகளை வழங்குகிறது.'
                )}
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#69786E] block mb-1">{t('bento_benchmarks', 'Mandi Benchmarks', 'சந்தை அளவுகோல்')}</span>
                <span className="font-bold text-[#17251D] text-sm font-mono">{t('bento_benchmarks_val', '5 Major APMCs', '5 முக்கிய APMC சந்தைகள்')}</span>
              </div>
              <div>
                <span className="text-[#69786E] block mb-1">{t('bento_cost_model', 'Cost Modeling', 'செலவு கணக்கீடு')}</span>
                <span className="font-bold text-[#17251D] text-sm">{t('bento_cost_model_val', 'Transport + Storage', 'போக்குவரத்து + சேமிப்பு')}</span>
              </div>
              <div>
                <span className="text-[#69786E] block mb-1">{t('bento_decision_sup', 'Decision Support', 'முடிவெடுக்கும் ஆதரவு')}</span>
                <span className="font-bold text-[#1B5E20] text-sm">{t('bento_decision_sup_val', 'Sell vs. Monitor', 'விற்பதா vs கண்காணிப்பதா')}</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: AgriConnect Module Spotlight (Col-span 5) */}
          <div className="md:col-span-5 bg-[#143D2B] text-white rounded-3xl p-8 lg:p-10 border border-white/10 shadow-md flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#F2C14E] flex items-center justify-center mb-6 border border-white/15">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-[#F2C14E] uppercase tracking-wider mb-2">
                {t('bento_module_badge', 'Proprietary Module', 'பிரத்யேக தொகுதி')}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-serif">
                {t('bento_module_title', 'AgriConnect Hyper-Local Intelligence', 'AgriConnect மண்டல நுண்ணறிவு')}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {t(
                  'bento_module_desc',
                  'The regional demand-prediction and discovery module bridging farming clusters with trusted agricultural dealers, soil testing facilities, and transparent input campaigns.',
                  'விவசாயிகளையும் நம்பகமான வேளாண் வியாபாரிகளையும், மண் பரிசோதனை நிலையங்களையும் இணைக்கும் பிரத்யேக மண்டல தேவை தொகுதி.'
                )}
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 space-y-2.5 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="text-[#F2C14E]">●</span>
                <span>{t('bento_bullet_demand', 'Regional agricultural input demand forecasting', 'மண்டல விவசாய இடுபொருட்கள் தேவை முன்னறிவிப்பு')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F2C14E]">●</span>
                <span>{t('bento_bullet_dealers', 'Verified dealer & service directory with transparent ratings', 'சரிபார்க்கப்பட்ட வியாபாரிகள் மற்றும் சேவை முகவரகம்')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F2C14E]">●</span>
                <span>{t('bento_bullet_alerts', 'Opt-in smart notifications for actionable regional alerts', 'முக்கிய அறிவிப்புகளுக்கான ஸ்மார்ட் வாட்ஸ்அப் தகவல்கள்')}</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Crop Practice Points & Rewards (Col-span 6) */}
          <div className="md:col-span-6 bg-white rounded-3xl p-8 lg:p-10 border border-[#143D2B]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DDF3E4] text-[#143D2B] flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-[#1B5E20]" />
              </div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-2">
                {t('bento_stewardship_badge', 'Stewardship Recognition', 'இயற்கை வேளாண் அங்கீகாரம்')}
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] mb-3 font-serif">
                {t('bento_stewardship_title', 'Crop Practice Points & Rewards', 'பயிர் புள்ளிகள் & ஊக்கத்தொகைகள்')}
              </h3>
              <p className="text-[#69786E] text-sm leading-relaxed mb-6">
                {t(
                  'bento_stewardship_desc',
                  'Recognize verified stewardship practices. From soil-test balanced nutrition to water-efficient alternate wetting and drying, every sustainable effort builds a transparent score that opens eligibility for participating buyer incentives.',
                  'மண் பரிசோதனை, சொட்டு நீர் பாசனம் போன்ற நற்பணிகளை பதிவு செய்து வாங்குபவர்களிடமிருந்து கூடுதல் ஊக்கத்தொகை பெற தகுதி பெறுங்கள்.'
                )}
              </p>
            </div>

            <div className="bg-[#F7F6EF] p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#69786E] block">{t('bento_standard_label', 'Illustrative Standard', 'சான்றளிக்கப்பட்ட தரம்')}</span>
                <span className="text-base font-bold text-[#17251D]">{t('bento_standard_title', 'Verifiable Practice Score', 'சரிபார்க்கக்கூடிய நற்செயல் மதிப்பெண்')}</span>
              </div>
              <span className="text-xs font-semibold text-[#1B5E20] bg-white px-3 py-1.5 rounded-lg border border-[#DDF3E4]">
                {t('bento_criteria_pill', '100 Point Criteria', '100 புள்ளி அளவுகோல்')}
              </span>
            </div>
          </div>

          {/* Bento Card 4: Local Buyer & Dealer Ecosystem (Col-span 6) */}
          <div className="md:col-span-6 bg-white rounded-3xl p-8 lg:p-10 border border-[#143D2B]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F2C14E]/20 text-[#143D2B] flex items-center justify-center mb-6">
                <Store className="w-6 h-6 text-[#765341]" />
              </div>
              <div className="text-xs font-semibold text-[#765341] uppercase tracking-wider mb-2">
                {t('bento_commercial_badge', 'Commercial Network', 'வணிக நெட்வொர்க்')}
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] mb-3 font-serif">
                {t('bento_commercial_title', 'Verified Buyer & Dealer Ecosystem', 'சரிபார்க்கப்பட்ட வாங்குபவர் & வியாபாரி வலையமைப்பு')}
              </h3>
              <p className="text-[#69786E] text-sm leading-relaxed mb-6">
                {t(
                  'bento_commercial_desc',
                  'Direct connections between growers, licensed APMC traders, flour millers, exporters, and input suppliers. Complete with transparent payment terms, pickup logistics, and strict trust policies protecting objective farmer advice.',
                  'விவசாயிகள், உரிமம் பெற்ற வியாபாரிகள், ஆலைகள் மற்றும் ஏற்றுமதியாளர்களுக்கு இடையிலான நேரடி இணைப்பு.'
                )}
              </p>
            </div>

            <div className="bg-[#F7F6EF] p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#69786E] block">{t('bento_transparency_lbl', 'Commercial Transparency', 'வணிக வெளிப்படைத்தன்மை')}</span>
                <span className="text-base font-bold text-[#17251D]">{t('bento_badges_val', 'Verified APMC & GSTIN Badges', 'APMC & GSTIN சரிபார்க்கப்பட்ட முத்திரைகள்')}</span>
              </div>
              <span className="text-xs font-semibold text-[#143D2B] bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                {t('bento_inquiries_pill', 'Direct Enquiries', 'நேரடி விசாரணைகள்')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
