import React from 'react';
import { Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#17251D] text-white/80 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (Col-span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight font-sans text-white">
                FARMERS <span className="text-[#F2C14E]">AI</span>
              </span>
            </div>

            <p className="text-sm font-serif italic text-[#F2C14E]">
              {t('foot_motto', 'Grow Smarter. Sell Better. Earn More.', 'அறிவோடு விவசாயம் செய். சிறந்த முறையில் விற்பனை செய். அதிக லாபம் பெறு.')}
            </p>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              {t(
                'foot_desc',
                'Connecting farmers with intelligent agricultural insights, transparent crop-selling opportunities, verified local buyers, and rewards for sustainable farming practices.',
                'செயற்கை நுண்ணறிவுடன் கூடிய வேளாண் ஆலோசனைகள், வெளிப்படையான சந்தை வாய்ப்புகள் மற்றும் சரிபார்க்கப்பட்ட வாங்குபவர்களை இணைக்கிறது.'
              )}
            </p>

            <div className="pt-2 text-[11px] text-white/50">
              {t('foot_cluster', 'Designed for Indian agricultural clusters. Powered by AgriConnect hyper-local intelligence.', 'இந்திய விவசாயிகளுக்கான பிரத்யேக தளம்.')}
            </div>
          </div>

          {/* Nav Column 1: Platform Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t('foot_col1_title', 'Platform Modules', 'தளப் பிரிவுகள்')}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#crop-recommendation" className="hover:text-white transition-colors">
                  {t('nav_recommendation', 'Crop Advisor', 'பயிர் வழிகாட்டி')}
                </a>
              </li>
              <li>
                <a href="#disease-scanner" className="hover:text-white transition-colors">
                  {t('nav_disease', 'Disease Scanner', 'நோய் கண்டறிதல்')}
                </a>
              </li>
              <li>
                <a href="#farming-assistant" className="hover:text-white transition-colors">
                  {t('nav_assistant', 'FARMERS AI', 'விவசாயி AI')}
                </a>
              </li>
              <li>
                <a href="#weather-market" className="hover:text-white transition-colors">
                  {t('nav_weather', 'Weather & Markets', 'வானிலை & சந்தை')}
                </a>
              </li>
              <li>
                <a href="#records-reminders" className="hover:text-white transition-colors">
                  {t('nav_records', 'Records & Reminders', 'பதிவுகள் & நினைவூட்டல்')}
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Commercial Partners */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t('foot_col2_title', 'Commercial Partners', 'வணிகப் பங்குதாரர்கள்')}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#dealers" className="hover:text-white transition-colors">
                  {t('f_dealer_prom', 'Dealer Promotion Plans', 'வியாபாரி திட்டங்கள்')}
                </a>
              </li>
              <li>
                <a href="#dealers" className="hover:text-white transition-colors">
                  {t('f_fert_camp', 'Fertilizer Brand Campaigns', 'உர பிராண்ட் திட்டங்கள்')}
                </a>
              </li>
              <li>
                <a href="#marketplace" className="hover:text-white transition-colors">
                  {t('f_buyer_verif', 'Buyer Verification Program', 'வாங்குபவர் சரிபார்ப்பு')}
                </a>
              </li>
              <li>
                <a href="#dealers" className="hover:text-white transition-colors">
                  {t('f_trust_pol', 'AgriConnect Trust Policy', 'நம்பகத்தன்மை கொள்கை')}
                </a>
              </li>
              <li>
                <a href="#alerts" className="hover:text-white transition-colors">
                  {t('f_wa_alerts', 'WhatsApp Alerts System', 'வாட்ஸ்அப் செய்தி முறை')}
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Trust & Governance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t('foot_col3_title', 'Trust & Legal', 'பாதுகாப்பு & விதிமுறைகள்')}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('f_priv_pol', 'Farmer Privacy Policy', 'தனியுரிமைக் கொள்கை')}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('f_terms', 'Terms of Service', 'சேவை விதிமுறைகள்')}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('f_data_gov', 'Data Governance & Consent', 'தரவு பாதுகாப்பு ஒப்புதல்')}
                </span>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t('f_faq', 'Help & FAQs', 'உதவி & கேள்விகள்')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <div>
            © {new Date().getFullYear()} FARMERS AI Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>{t('f_proto_demo', 'Full-Stack Agricultural Platform', 'முழுமையான விவசாய தொழில்நுட்ப தளம்')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
