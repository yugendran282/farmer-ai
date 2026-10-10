import React from 'react';
import { ArrowRight, Sprout, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  onRegisterClick: () => void;
  onPartnerClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onRegisterClick,
  onPartnerClick,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-24 bg-[#143D2B] text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B5E20]/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#F2C14E] flex items-center justify-center mx-auto mb-6 border border-white/15 shadow-sm">
          <Sprout className="w-8 h-8" />
        </div>

        <div className="text-xs uppercase tracking-widest text-[#F2C14E] font-semibold mb-3">
          {t('cta_eyebrow', 'Join the Agricultural Intelligence Movement', 'வேளாண் செயற்கை நுண்ணறிவு இயக்கம்')}
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
          {t('cta_title', 'Grow Smarter. Sell at the Right Time. Earn More.', 'அறிவோடு விவசாயம் செய். சரியான நேரத்தில் விற்பனை செய். அதிக லாபம் பெறு.')}
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t(
            'cta_subtitle',
            'Start exploring mandi price patterns, connecting with verified processors, and building your crop practice score today.',
            'சந்தை விலைப் போக்கை அறிந்து, சரிபார்க்கப்பட்ட வாங்குபவர்களுடன் இணைந்து உங்கள் விவசாயத்தை இன்றே மேம்படுத்துங்கள்.'
          )}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onRegisterClick}
            className="px-7 py-4 bg-[#F2C14E] text-[#143D2B] font-bold text-base rounded-xl hover:bg-[#e5b33d] transition-all shadow-md flex items-center gap-2.5 group cursor-pointer"
          >
            <span>{t('btn_reg_farm', 'Register Your Farm (Free Demo)', 'உங்கள் பண்ணையைப் பதிவு செய்யுங்கள்')}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onPartnerClick}
            className="px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <span>{t('btn_partner_dealer', 'Partner as a Dealer or Buyer', 'வியாபாரி அல்லது வாங்குபவராக இணையுங்கள்')}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
            {t('cta_feat1', 'Free for Individual Farmers', 'தனிப்பட்ட விவசாயிகளுக்கு இலவசம்')}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
            {t('cta_feat2', 'APMC & GSTIN Verified Buyers', 'APMC சரிபார்க்கப்பட்ட வியாபாரிகள்')}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
            {t('cta_feat3', 'Zero-Spam WhatsApp Delivery', 'வாட்ஸ்அப் செய்தி எச்சரிக்கைகள்')}
          </span>
        </div>
      </div>
    </section>
  );
};
