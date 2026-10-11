import React, { useState } from 'react';
import {
  MessageCircle,
  Bell,
  CheckCircle2,
  Phone,
  Smartphone,
  ShieldCheck,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SmartAlertsSection: React.FC = () => {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<Record<string, boolean>>({
    market_updates: true,
    buyer_offers: true,
    weather_risks: true,
    crop_score: true,
    crop_care: false,
    dealer_availability: false,
  });
  const [simulatedSent, setSimulatedSent] = useState(false);

  const alertCategories = [
    {
      id: 'market_updates',
      label: t('alert_cat_mkt', 'Market Price Updates', 'சந்தை விலை அறிவிப்புகள்'),
      desc: t('alert_cat_mkt_d', 'Significant price changes (>±2%) in your local APMC mandis.', 'உள்ளூர் APMC சந்தைகளில் ஏற்படும் முக்கிய விலை மாற்றங்கள் (>±2%).'),
    },
    {
      id: 'buyer_offers',
      label: t('alert_cat_offers', 'New Buyer Offers', 'புதிய வாங்குபவர் ஒப்பந்தங்கள்'),
      desc: t('alert_cat_offers_d', 'Direct procurement tenders for your registered crop varieties.', 'உங்கள் பயிர் வகைகளுக்கான நேரடி கொள்முதல் ஒப்பந்தங்கள்.'),
    },
    {
      id: 'weather_risks',
      label: t('alert_cat_weather', 'Weather & Moisture Alerts', 'வானிலை மற்றும் மழை எச்சரிக்கைகள்'),
      desc: t('alert_cat_weather_d', 'Unseasonal rainfall or humidity spikes affecting harvest timing.', 'அறுவடை நேரத்தை பாதிக்கும் பருவம் தவறிய மழை அல்லது ஈரப்பதம்.'),
    },
    {
      id: 'crop_score',
      label: t('alert_cat_score', 'Crop Score & Rewards', 'பயிர் மதிப்பெண் & ஊக்கத்தொகை'),
      desc: t('alert_cat_score_d', 'Confirmation when submitted practice evidence is verified.', 'சமர்ப்பிக்கப்பட்ட நற்செயல் சான்றுகள் சரிபார்க்கப்படும்போது தகவல்.'),
    },
    {
      id: 'crop_care',
      label: t('alert_cat_care', 'Agronomic Reminders', 'விவசாயப் பணி நினைவூட்டல்கள்'),
      desc: t('alert_cat_care_d', 'Optimal spray schedules and fertilizer application windows.', 'மருந்து தெளிப்பு மற்றும் உரமிடும் உகந்த கால அட்டவணை.'),
    },
    {
      id: 'dealer_availability',
      label: t('alert_cat_dealer', 'Dealer Input Availability', 'இடுபொருட்கள் கிடைக்கும் நிலை'),
      desc: t('alert_cat_dealer_d', 'Stock alerts on critical inputs like bio-fertilizers and drip parts.', 'உயிர் உரங்கள் மற்றும் சொட்டு நீர் பாகங்கள் இருப்பு விவரம்.'),
    },
  ];

  const toggleAlert = (id: string) => {
    setSelectedAlerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setSimulatedSent(true);
    setTimeout(() => {
      // Keep state displayed
    }, 400);
  };

  return (
    <section id="alerts" className="py-20 lg:py-28 bg-[#F7F6EF] border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>{t('alert_eyebrow1', 'Direct WhatsApp & SMS Channel', 'வாட்ஸ்அப் & SMS சேவை')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('alert_eyebrow2', 'Agricultural Smart Alerts', 'வேளாண் ஸ்மார்ட் எச்சரிக்கைகள்')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            {t('alert_title', 'Timely Intelligence in the Channel Farmers Use Most.', 'விவசாயிகள் பயன்படுத்தும் தளத்திலேயே நேரடி தகவல்கள்.')}
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            {t(
              'alert_subtitle',
              'Never miss a price window or harvest opportunity. FARMERS AI delivers concise, opt-in WhatsApp updates with verified buyer tenders and market advisories.',
              'சந்தை விலை மற்றும் வாங்குபவர்களின் கொள்முதல் விவரங்களை வாட்ஸ்அப் மூலம் உடனடியாகப் பெறுங்கள்.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Notification Preference Controls (Col-span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#17251D] font-serif">
                  {t('alert_pref_title', 'Customize Your Alert Preferences', 'அறிவிப்பு விருப்பங்களைத் தேர்ந்தெடுக்கவும்')}
                </h3>
                <span className="text-xs text-[#69786E]">
                  {t('alert_optin_note', 'Strictly opt-in · Zero promotional spam policy', 'விவசாயிகள் அனுமதித்தால் மட்டுமே அனுப்பப்படும் · தேவையற்ற விளம்பரங்கள் இல்லை')}
                </span>
              </div>
            </div>

            {/* Alert Categories Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {alertCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => toggleAlert(cat.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    selectedAlerts[cat.id]
                      ? 'bg-[#F7F6EF] border-[#1B5E20]/40'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#17251D] mb-0.5">
                      {cat.label}
                    </h4>
                    <p className="text-[11px] text-[#69786E] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 text-white transition-colors ${
                      selectedAlerts[cat.id] ? 'bg-[#1B5E20]' : 'border border-gray-300 bg-white'
                    }`}
                  >
                    {selectedAlerts[cat.id] && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Test Simulation Form */}
            <form onSubmit={handleSimulate} className="bg-[#F7F6EF] p-5 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="phone-input" className="text-xs font-bold text-[#17251D]">
                  {t('alert_test_label', 'Test WhatsApp Simulation on Demo Phone', 'மாதிரி தொலைபேசியில் சோதிக்கவும்')}
                </label>
                <span className="text-[11px] text-[#69786E]">{t('alert_demo_only', 'Demo Mode Only', 'டெமோ முறை மட்டுமே')}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={t('alert_phone_placeholder', 'Enter mobile (e.g. +91 98450 12345)', 'மொபைல் எண் (எ.கா. +91 98450 12345)')}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-[#F2C14E]" />
                  <span>{t('alert_btn_preview', 'Preview Alert', 'செய்தியைப் பார்')}</span>
                </button>
              </div>

              {simulatedSent && (
                <div className="mt-3 p-2.5 bg-[#DDF3E4] rounded-lg border border-[#1B5E20]/30 text-xs text-[#143D2B] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0" />
                  <span>
                    {t('alert_simulated_success', 'Simulated dispatch triggered! See the phone preview mockup on the right.', 'மாதிரி செய்தி அனுப்பப்பட்டது! வலதுபுறத்தில் உள்ள மொபைல் திரையில் பார்க்கவும்.')}
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Smartphone Mockup (Col-span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Phone Bezel */}
            <div className="w-[310px] sm:w-[340px] bg-[#17251D] rounded-[44px] p-3.5 shadow-2xl border-4 border-gray-800 relative">
              {/* Camera Notch */}
              <div className="w-28 h-4 bg-black rounded-b-xl mx-auto mb-3" />

              {/* Screen Area */}
              <div className="bg-[#E5DDD5] rounded-[32px] overflow-hidden flex flex-col h-[520px] shadow-inner text-[#17251D]">
                {/* WhatsApp Chat Header */}
                <div className="bg-[#075E54] text-white p-3 flex items-center gap-2.5 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-xs">
                    FA
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold">FARMERS AI</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" />
                    </div>
                    <span className="text-[10px] text-white/80 block">
                      {t('alert_official_badge', 'Official Agriculture Intelligence', 'அதிகாரப்பூர்வ வேளாண் தகவல்')}
                    </span>
                  </div>
                </div>

                {/* Messages Stream */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
                  <div className="text-center">
                    <span className="bg-white/80 text-[10px] text-gray-600 px-2.5 py-0.5 rounded-md shadow-2xs">
                      Today · 09:30 AM
                    </span>
                  </div>

                  {/* Incoming WhatsApp Bubble */}
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-xs border border-gray-200/50 max-w-[92%]">
                    <div className="text-[11px] font-bold text-[#075E54] mb-1 flex items-center justify-between">
                      <span>{t('alert_bubble_title', '🌾 FARMERS AI — Market Update', '🌾 FARMERS AI — சந்தை நிலவரம்')}</span>
                      <span className="text-[9px] text-gray-400">09:31 AM</span>
                    </div>

                    <p className="text-xs text-gray-800 leading-relaxed mb-2.5">
                      {t('alert_bubble_p1', 'A new market update is available for your registered crop: Paddy (BPT 5204).', 'உங்கள் பயிரான நெல் (BPT 5204) க்கான புதிய சந்தை விலை வந்துள்ளது.')}
                    </p>

                    <div className="bg-[#F7F6EF] p-2 rounded-lg border border-gray-200 mb-2.5 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('alert_kurnool_spot', 'Kurnool Spot:', 'கர்னூல் சந்தை விலை:')}</span>
                        <span className="font-bold font-mono text-[#143D2B]">₹2,350 / qtl (▲ +1.8%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('alert_top_offer', 'Top Verified Offer:', 'உயர்ந்த கொள்முதல் விலை:')}</span>
                        <span className="font-bold font-mono text-[#1B5E20]">₹2,470 / qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('alert_buyer_lbl', 'Buyer:', 'வாங்குபவர்:')}</span>
                        <span className="text-gray-800 truncate max-w-[130px]">Krishna Agri Exports</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-700 leading-snug mb-3">
                      {t('alert_bubble_p2', 'Compare current buyer offers, recent price trends, and estimated selling costs before deciding when to sell.', 'விற்பனை முடிவெடுப்பதற்கு முன் சந்தை விலை மற்றும் செலவுகளை கணக்கிடுங்கள்.')}
                    </p>

                    <a
                      href="#market-dashboard"
                      className="block text-center py-1.5 bg-[#25D366] text-white font-bold rounded-lg text-xs shadow-xs"
                    >
                      {t('alert_open_btn', 'Open FARMERS AI', 'FARMERS AI திறக்கவும்')}
                    </a>
                  </div>

                  {/* Second Bubble for Practice Points */}
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-gray-200/50 max-w-[92%]">
                    <div className="text-[11px] font-bold text-[#1B5E20] mb-1">
                      {t('alert_stewardship_bubble', '⭐ Stewardship Verified', '⭐ நற்செயல் சரிபார்க்கப்பட்டது')}
                    </div>
                    <p className="text-[11px] text-gray-800 leading-snug">
                      {t('alert_stewardship_msg', 'Soil test documentation verified (+20 pts). Your Crop Practice Score is now 85/100.', 'மண் பரிசோதனை சான்று சரிபார்க்கப்பட்டது (+20 புள்ளிகள்). உங்கள் பயிர் மதிப்பெண் 85/100.')}
                    </p>
                    <span className="text-[9px] text-gray-400 block text-right mt-1">11:15 AM</span>
                  </div>
                </div>

                {/* WhatsApp Chat Footer Mock */}
                <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 border-t border-gray-200">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400 border border-gray-200">
                    {t('alert_type_msg', 'Type a message...', 'செய்தியை தட்டச்சு செய்யவும்...')}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Architecture Disclaimer */}
        <div className="mt-12 text-center text-xs text-[#69786E] max-w-2xl mx-auto">
          {t('alert_arch_disclaimer', 'Architecture configured for Twilio WhatsApp Business API integration. Real automated dispatch activates when production API keys and registered sender templates are configured on the backend.', 'Twilio வாட்ஸ்அப் தொழில்நுட்பத்துடன் இணைக்க வடிவமைக்கப்பட்டுள்ளது. நேரலை சேவையகத்தில் செயல்படுத்தப்படும்.')}
        </div>
      </div>
    </section>
  );
};
