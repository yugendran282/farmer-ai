import React from 'react';
import { Sprout, ScanLine, Bot, CloudSun, ClipboardList, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeatureOverviewGridProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenDashboard: () => void;
}

export const FeatureOverviewGrid: React.FC<FeatureOverviewGridProps> = ({
  onNavigateSection,
  onOpenDashboard,
}) => {
  const { t } = useLanguage();

  const features = [
    {
      id: 'crop-recommendation',
      icon: Sprout,
      badge: t('feat_badge_soil', 'Soil Decision', 'மண் பரிசோதனை'),
      title: t('card_crop_advisor_title', 'AI Crop Soil Recommendation', 'மண் மற்றும் பயிர் பரிந்துரை'),
      desc: t('card_crop_advisor_desc', 'Analyzes soil N-P-K levels, pH texture, and seasonal water availability to rank ideal crops with expected yields.', 'மண் சத்துக்கள் மற்றும் பாசன வசதிக்கேற்ப அதிக மகசூல் தரும் பயிர்களை பரிந்துரைக்கிறது.'),
      actionText: t('feat_btn_try', 'Calculate Crops', 'பயிர்களை கண்டறிய'),
    },
    {
      id: 'disease-scanner',
      icon: ScanLine,
      badge: t('feat_badge_vision', 'Vision Diagnosis', 'பயிர் ஸ்கேன்'),
      title: t('card_disease_scanner_title', 'Plant Disease Diagnostic Scanner', 'பயிர் நோய் கண்டறியும் ஸ்கேனர்'),
      desc: t('card_disease_scanner_desc', 'Instantly identifies leaf symptoms, fungal blights, and pest damage with organic and chemical treatment advice.', 'இலையின் புகைப்படத்தை கொண்டு நோய்களைக் கண்டறிந்து உடனடி இயற்கை & ரசாயன தீர்வுகளைப் பெறுங்கள்.'),
      actionText: t('feat_btn_scan', 'Scan Plant Leaf', 'இலையை ஸ்கேன் செய்'),
    },
    {
      id: 'farming-assistant',
      icon: Bot,
      badge: t('feat_badge_ai', 'AI Expert', 'விவசாயி AI'),
      title: t('card_assistant_title', 'FARMERS AI Advisory Q&A', 'விவசாயி AI ஆலோசனைக் குழு'),
      desc: t('card_assistant_desc', 'Ask direct questions on pest management, fertilizer calculation, drip scheduling, and biological cultivation.', 'உர அட்டவணை, பூச்சி மேலாண்மை மற்றும் பயிர் பராமரிப்பு குறித்த கேள்விகளை கேளுங்கள்.'),
      actionText: t('feat_btn_ask', 'Ask Assistant', 'கேள்வி கேட்க'),
    },
    {
      id: 'weather-market',
      icon: CloudSun,
      badge: t('feat_badge_market', 'Live APMC & Met', 'வானிலை & சந்தை'),
      title: t('card_weather_mandi_title', 'Real-Time Weather & Mandi Prices', 'நேரலை வானிலை & சந்தை விலைகள்'),
      desc: t('card_weather_mandi_desc', 'Live temperature, precipitation forecast, and official benchmark market mandi prices with transparent day changes.', 'உள்ளூர் நேரலை வானிலை மற்றும் அதிகாரப்பூர்வ APMC சந்தை விலை மாற்றங்கள்.'),
      actionText: t('feat_btn_view_prices', 'Check Prices & Rain', 'விலை விவரங்களை பார்'),
    },
    {
      id: 'records-reminders',
      icon: ClipboardList,
      badge: t('feat_badge_ops', 'Operations', 'பண்ணை மேலாண்மை'),
      title: t('card_records_title', 'Farm Field Logs & Reminders', 'பண்ணை பதிவுகள் & நினைவூட்டல்'),
      desc: t('card_records_desc', 'Track farm expenses, log harvest outputs, and set automated reminders for irrigation, fertilization, and spraying.', 'செலவு கணக்குகள், மகசூல் பதிவு மற்றும் பாசன நினைவூட்டல்களை திட்டமிடுங்கள்.'),
      actionText: t('feat_btn_manage_logs', 'Manage Field Logs', 'பதிவுகளை நிர்வகிக்க'),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F7F9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left sm:text-center sm:mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B45]/10 text-[#176B45] text-xs font-bold uppercase tracking-wider mb-2.5">
            <span>{t('feat_tag', 'Modules & Features', 'முக்கிய தொகுதிகள்')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] tracking-tight font-serif">
            {t('feat_overview_title', 'Core Agricultural Capabilities', 'முக்கிய வேளாண்மை அம்சங்கள்')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#526357]">
            {t('feat_overview_subtitle', 'Practical, high-impact digital tools designed specifically for smallholders and commercial growers.', 'விவசாயிகளுக்காக உருவாக்கப்பட்ட எளிய, பயனுள்ள கருவிகள்.')}
          </p>
        </div>

        {/* Feature Bento / Responsive Cards Grid (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E8DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#176B45]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#176B45] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#176B45]" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F7F9F5] text-[#526357] border border-[#E2E8DF]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#17231C] leading-snug mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#526357] leading-relaxed mb-5">
                    {feat.desc}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateSection(feat.id)}
                  className="w-full min-h-[44px] py-2.5 px-4 bg-[#F7F9F5] hover:bg-[#176B45] text-[#17231C] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer border border-[#E2E8DF] hover:border-[#176B45]"
                >
                  <span>{feat.actionText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#526357] group-hover:text-white transition-colors" />
                </button>
              </div>
            );
          })}

          {/* Quick Dashboard Entry Card in Grid */}
          <div className="bg-gradient-to-br from-[#176B45] to-[#125537] text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider block mb-2">
                {t('quick_dash_label', 'Personal Workspace', 'தனிப்பட்ட பணிமனை')}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif mb-2 text-white">
                {t('dash_card_title', 'Go to Farmer Dashboard', 'விவசாயி டாஷ்போர்டு')}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {t('dash_card_desc', 'Track saved crops, live weather for your district, scheduled irrigation reminders, and private field logs in one unified screen.', 'உங்கள் மாவட்ட வானிலை, பாசன நினைவூட்டல்கள் மற்றும் பண்ணை பதிவுகளை ஒரே இடத்தில் காணுங்கள்.')}
              </p>
            </div>

            <button
              onClick={onOpenDashboard}
              className="mt-6 w-full min-h-[44px] py-2.5 px-4 bg-white text-[#176B45] hover:bg-emerald-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{t('btn_launch_dash', 'Launch Dashboard', 'டாஷ்போர்டு திறக்க')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
