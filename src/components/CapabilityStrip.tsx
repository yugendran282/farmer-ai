import React from 'react';
import { Sprout, TrendingUp, Store, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CapabilityStrip: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: Sprout,
      title: t('cap_1_title', 'AI-Powered Crop Intelligence', 'AI பயிர் நுண்ணறிவு'),
      description: t('cap_1_desc', 'Regional demand forecasting, arrival trends, and price behavior patterns.', 'மண்டல தேவை முன்னறிவிப்பு மற்றும் விலை மாற்றப் போக்குகள்.'),
    },
    {
      icon: TrendingUp,
      title: t('cap_2_title', 'Intelligent Selling Decisions', 'சிறந்த விற்பனை முடிவுகள்'),
      description: t('cap_2_desc', 'Transparent net-return calculators comparing storage, transport, and offer timing.', 'சேமிப்பு, போக்குவரத்து மற்றும் விற்பனை நேரத்தை ஒப்பிடும் கணக்கீடு.'),
    },
    {
      icon: Store,
      title: t('cap_3_title', 'Local Buyer Connections', 'உள்ளூர் வாங்குபவர் தொடர்பு'),
      description: t('cap_3_desc', 'Direct access to verified regional millers, wholesale traders, and food processors.', 'சரிபார்க்கப்பட்ட ஆலை உரிமையாளர்கள் மற்றும் மொத்த வியாபாரிகளுடன் நேரடி தொடர்பு.'),
    },
    {
      icon: Award,
      title: t('cap_4_title', 'Practice-Based Crop Rewards', 'இயற்கை விவசாய ஊக்கத்தொகை'),
      description: t('cap_4_desc', 'Document sustainable farm practices to qualify for participating buyer incentives.', 'இயற்கை விவசாய முறைகளை பதிவு செய்து சிறப்பு ஊக்கத்தொகைகளைப் பெறுங்கள்.'),
    },
  ];

  return (
    <section className="bg-white border-b border-[#143D2B]/10 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`flex items-start gap-4 ${
                  index > 0 ? 'pt-6 sm:pt-0 lg:pl-8' : ''
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-[#17251D] leading-snug mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#69786E] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
