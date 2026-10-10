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

export const SmartAlertsSection: React.FC = () => {
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
      label: 'Market Price Updates',
      desc: 'Significant price changes (>±2%) in your local APMC mandis.',
    },
    {
      id: 'buyer_offers',
      label: 'New Buyer Offers',
      desc: 'Direct procurement tenders for your registered crop varieties.',
    },
    {
      id: 'weather_risks',
      label: 'Weather & Moisture Alerts',
      desc: 'Unseasonal rainfall or humidity spikes affecting harvest timing.',
    },
    {
      id: 'crop_score',
      label: 'Crop Score & Rewards',
      desc: 'Confirmation when submitted practice evidence is verified.',
    },
    {
      id: 'crop_care',
      label: 'Agronomic Reminders',
      desc: 'Optimal spray schedules and fertilizer application windows.',
    },
    {
      id: 'dealer_availability',
      label: 'Dealer Input Availability',
      desc: 'Stock alerts on critical inputs like bio-fertilizers and drip parts.',
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
            <span>Direct WhatsApp & SMS Channel</span>
            <span aria-hidden="true">·</span>
            <span>Agricultural Smart Alerts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            Timely Intelligence in the Channel Farmers Use Most.
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            Never miss a price window or harvest opportunity. FARMERS AI delivers concise, opt-in WhatsApp updates with verified buyer tenders and market advisories.
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
                  Customize Your Alert Preferences
                </h3>
                <span className="text-xs text-[#69786E]">
                  Strictly opt-in · Zero promotional spam policy
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
                  Test WhatsApp Simulation on Demo Phone
                </label>
                <span className="text-[11px] text-[#69786E]">Demo Mode Only</span>
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
                    placeholder="Enter mobile (e.g. +91 98450 12345)"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-[#F2C14E]" />
                  <span>Preview Alert</span>
                </button>
              </div>

              {simulatedSent && (
                <div className="mt-3 p-2.5 bg-[#DDF3E4] rounded-lg border border-[#1B5E20]/30 text-xs text-[#143D2B] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0" />
                  <span>
                    Simulated dispatch triggered! See the phone preview mockup on the right.
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
                      Official Agriculture Intelligence
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
                      <span>🌾 FARMERS AI — Market Update</span>
                      <span className="text-[9px] text-gray-400">09:31 AM</span>
                    </div>

                    <p className="text-xs text-gray-800 leading-relaxed mb-2.5">
                      A new market update is available for your registered crop: <strong className="text-[#143D2B]">Paddy (BPT 5204)</strong>.
                    </p>

                    <div className="bg-[#F7F6EF] p-2 rounded-lg border border-gray-200 mb-2.5 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kurnool Spot:</span>
                        <span className="font-bold font-mono text-[#143D2B]">₹2,350 / qtl (▲ +1.8%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Top Verified Offer:</span>
                        <span className="font-bold font-mono text-[#1B5E20]">₹2,470 / qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Buyer:</span>
                        <span className="text-gray-800 truncate max-w-[130px]">Krishna Agri Exports</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-700 leading-snug mb-3">
                      Compare current buyer offers, recent price trends, and estimated selling costs before deciding when to sell.
                    </p>

                    <a
                      href="#market-dashboard"
                      className="block text-center py-1.5 bg-[#25D366] text-white font-bold rounded-lg text-xs shadow-xs"
                    >
                      Open FARMERS AI
                    </a>
                  </div>

                  {/* Second Bubble for Practice Points */}
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-gray-200/50 max-w-[92%]">
                    <div className="text-[11px] font-bold text-[#1B5E20] mb-1">
                      ⭐ Stewardship Verified
                    </div>
                    <p className="text-[11px] text-gray-800 leading-snug">
                      Soil test documentation verified (+20 pts). Your Crop Practice Score is now <strong>85/100</strong>.
                    </p>
                    <span className="text-[9px] text-gray-400 block text-right mt-1">11:15 AM</span>
                  </div>
                </div>

                {/* WhatsApp Chat Footer Mock */}
                <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 border-t border-gray-200">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400 border border-gray-200">
                    Type a message...
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
          Architecture configured for Twilio WhatsApp Business API integration. Real automated dispatch activates when production API keys and registered sender templates are configured on the backend.
        </div>
      </div>
    </section>
  );
};
