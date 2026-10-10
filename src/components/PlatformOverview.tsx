import React from 'react';
import { ArrowRight, Compass, ShieldCheck, MapPin, Store, Sparkles, Cpu, Award } from 'lucide-react';

export const PlatformOverview: React.FC = () => {
  return (
    <section id="platform" className="py-20 lg:py-28 bg-[#F7F6EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>The FARMERS AI Ecosystem</span>
            <span aria-hidden="true">·</span>
            <span>AgriConnect Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-6 text-balance">
            Designed for Farmers. Engineered for Connected Agriculture.
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            FARMERS AI unifies market price transparency, verifiable buyer networks, and practice-based reward incentives into a cohesive, farmer-first operating platform.
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
                Core Engine
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] mb-4 font-serif">
                AI Market Intelligence & Timing Engine
              </h3>
              <p className="text-[#69786E] text-base leading-relaxed mb-6">
                Evaluating agricultural markets should not be guesswork. FARMERS AI synthesizes historical APMC mandi data, seasonal arrival volumes, and local buyer quotations to model net returns across holding, transport, and immediate sale paths.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#69786E] block mb-1">Mandi Benchmarks</span>
                <span className="font-bold text-[#17251D] text-sm font-mono">5 Major APMCs</span>
              </div>
              <div>
                <span className="text-[#69786E] block mb-1">Cost Modeling</span>
                <span className="font-bold text-[#17251D] text-sm">Transport + Storage</span>
              </div>
              <div>
                <span className="text-[#69786E] block mb-1">Decision Support</span>
                <span className="font-bold text-[#1B5E20] text-sm">Sell vs. Monitor</span>
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
                Proprietary Module
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-serif">
                AgriConnect Hyper-Local Intelligence
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                The regional demand-prediction and discovery module bridging farming clusters with trusted agricultural dealers, soil testing facilities, and transparent input campaigns.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 space-y-2.5 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="text-[#F2C14E]">●</span>
                <span>Regional agricultural input demand forecasting</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F2C14E]">●</span>
                <span>Verified dealer & service directory with transparent ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F2C14E]">●</span>
                <span>Opt-in smart notifications for actionable regional alerts</span>
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
                Stewardship Recognition
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] mb-3 font-serif">
                Crop Practice Points & Rewards
              </h3>
              <p className="text-[#69786E] text-sm leading-relaxed mb-6">
                Recognize verified stewardship practices. From soil-test balanced nutrition to water-efficient alternate wetting and drying, every sustainable effort builds a transparent score that opens eligibility for participating buyer incentives.
              </p>
            </div>

            <div className="bg-[#F7F6EF] p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#69786E] block">Illustrative Standard</span>
                <span className="text-base font-bold text-[#17251D]">Verifiable Practice Score</span>
              </div>
              <span className="text-xs font-semibold text-[#1B5E20] bg-white px-3 py-1.5 rounded-lg border border-[#DDF3E4]">
                100 Point Criteria
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
                Commercial Network
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] mb-3 font-serif">
                Verified Buyer & Dealer Ecosystem
              </h3>
              <p className="text-[#69786E] text-sm leading-relaxed mb-6">
                Direct connections between growers, licensed APMC traders, flour millers, exporters, and input suppliers. Complete with transparent payment terms, pickup logistics, and strict trust policies protecting objective farmer advice.
              </p>
            </div>

            <div className="bg-[#F7F6EF] p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#69786E] block">Commercial Transparency</span>
                <span className="text-base font-bold text-[#17251D]">Verified APMC & GSTIN Badges</span>
              </div>
              <span className="text-xs font-semibold text-[#143D2B] bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                Direct Enquiries
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
