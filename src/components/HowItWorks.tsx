import React from 'react';
import { UserCheck, Sparkles, Store, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowItWorksProps {
  onStartOnboarding: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOnboarding }) => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: UserCheck,
      title: t('how_step1_t', 'Register Your Farm', 'உங்கள் பண்ணையைப் பதிவு செய்யுங்கள்'),
      desc: t('how_step1_d', 'Add your acreage, crop varieties, general district location, and expected harvest window in under 2 minutes.', 'நிலப்பரப்பு, பயிர் வகைகள் மற்றும் அறுவடை காலத்தை 2 நிமிடங்களில் பதிவு செய்யுங்கள்.'),
    },
    {
      num: '02',
      icon: Sparkles,
      title: t('how_step2_t', 'Receive AI Insights', 'AI ஆலோசனைகளைப் பெறுங்கள்'),
      desc: t('how_step2_d', 'Explore historical APMC trends, regional arrival surges, and net-return projections across diverse selling windows.', 'சந்தை விலை போக்குகள் மற்றும் லாபக் கணக்கீடுகளை எளிதாக அறிந்து கொள்ளுங்கள்.'),
    },
    {
      num: '03',
      icon: Store,
      title: t('how_step3_t', 'Connect With Buyers', 'வாங்குபவர்களுடன் இணையுங்கள்'),
      desc: t('how_step3_d', 'Review transparent buyer procurement tenders, evaluate farmgate pickup vs delivery, and contact verified processors.', 'கொள்முதல் ஒப்பந்தங்களை ஆராய்ந்து, சரிபார்க்கப்பட்ட ஆலைகளுடன் தொடர்பு கொள்ளுங்கள்.'),
    },
    {
      num: '04',
      icon: Award,
      title: t('how_step4_t', 'Earn Practice Points', 'நற்செயல் புள்ளிகளைப் பெறுங்கள்'),
      desc: t('how_step4_d', 'Document balanced fertilizer usage, soil testing, and water stewardship to unlock participating buyer incentives.', 'சரியான உர பயன்பாடு, நீர் சேமிப்பு மூலம் கூடுதல் ஊக்கத்தொகைகளைப் பெறுங்கள்.'),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>{t('how_eyebrow1', 'Operating Methodology', 'செயல்பாட்டு முறை')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('how_eyebrow2', 'Simple 4-Step Process', 'எளிய 4-படி முறை')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            {t('how_title', 'How FARMERS AI Works for You.', 'FARMERS AI உங்களுக்கு எவ்வாறு உதவுகிறது.')}
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            {t(
              'how_subtitle',
              'From field planting to final mandi offloading, a transparent and guided path to maximize farm profitability and reward good agronomy.',
              'விதைப்பு முதல் சந்தை விற்பனை வரை, விவசாய லாபத்தை அதிகரிக்க ஒரு தெளிவான வழிகாட்டி.'
            )}
          </p>
        </div>

        {/* Steps Grid with Large Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#F7F6EF] rounded-3xl p-7 border border-gray-200/90 shadow-sm flex flex-col justify-between relative group hover:border-[#1B5E20]/40 transition-all"
              >
                <div>
                  {/* Large Editorial Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-[#143D2B]/30 group-hover:text-[#1B5E20] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white text-[#1B5E20] flex items-center justify-center shadow-2xs border border-gray-200/60">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#17251D] font-serif mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#69786E] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/60 text-xs font-semibold text-[#1B5E20] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t('how_step_prefix', 'Step', 'படி')} {step.num}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Action */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartOnboarding}
            className="px-6 py-3.5 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t('how_btn_reg', 'Register Your Farm Now (Free Demo)', 'உங்கள் பண்ணையை இப்போது பதிவு செய்யுங்கள்')}</span>
            <ArrowRight className="w-4 h-4 text-[#F2C14E]" />
          </button>
        </div>
      </div>
    </section>
  );
};
