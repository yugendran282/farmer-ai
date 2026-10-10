import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Award, Sparkles, ChevronRight, BarChart3 } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onHowItWorksClick }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center bg-[#143D2B] overflow-hidden">
      {/* Background Photography with CSS Gradient Fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=80"
          alt="Indian farmer standing in a lush agricultural field during golden hour sunrise"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
          loading="eager"
          onError={(e) => {
            // Elegant fallback if network image fails
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
            {/* Eyebrow - Unboxed text per Zero-Pill Discipline */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#F2C14E] mb-4">
              <span>Intelligent Agriculture</span>
              <span aria-hidden="true">·</span>
              <span>Better Opportunities</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12] mb-6 text-balance">
              Grow Smarter.{' '}
              <span className="text-[#F2C14E] italic font-normal">
                Sell at the Right Time.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
              AI-powered crop insights, smarter selling decisions, trusted local buyers, and rewards for better farming practices — all in one platform built for farmers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F2C14E] text-[#143D2B] font-bold text-base rounded-xl hover:bg-[#e5b33d] transition-all shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Explore FARMERS AI</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-base rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discover How It Works</span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Supporting Trust Line */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/70 border-t border-white/10 pt-5 w-full">
              <span>Built around farmers</span>
              <span className="text-[#F2C14E]" aria-hidden="true">·</span>
              <span>Powered by intelligence</span>
              <span className="text-[#F2C14E]" aria-hidden="true">·</span>
              <span>Connected to local markets</span>
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
                      AI Market Intelligence
                    </span>
                    <h2 className="text-sm font-bold text-[#17251D]">Crop: Paddy (BPT 5204)</h2>
                  </div>
                </div>
                <span className="text-[11px] text-[#69786E] font-mono">Kurnool Mandi</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#69786E] block mb-0.5">Reference Price</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono tracking-tight text-[#143D2B] tabular-nums">
                      ₹2,350
                    </span>
                    <span className="text-xs text-[#69786E]">/ quintal</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#087F5B] font-semibold mt-1">
                    <span>▲ +1.8%</span>
                    <span className="text-[#69786E] font-normal">vs last week</span>
                  </div>
                </div>

                <div className="bg-[#F7F6EF] p-2.5 rounded-xl border border-[#DDF3E4]">
                  <span className="text-[11px] font-semibold text-[#143D2B] block mb-1">
                    AI Selling Guidance
                  </span>
                  <p className="text-xs text-[#17251D] leading-snug">
                    <span className="font-semibold text-[#1B5E20]">Monitor conditions:</span> Demand firming up, harvest arrivals steadying.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#69786E]">
                <span>Demonstration data · Not a live quote</span>
                <span className="text-[#1B5E20] font-medium flex items-center gap-1">
                  Updated Today <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                </span>
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
                      FARMERS AI Stewardship
                    </span>
                    <h2 className="text-sm font-bold text-white">Crop Intelligence Score</h2>
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
                    Soil-test balanced nutrient prescription
                  </span>
                  <span className="text-[#4CAF50] font-mono font-medium">+20 pts</span>
                </div>
                <div className="flex items-center justify-between text-white/90 bg-white/5 px-2.5 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50]" />
                    AWD Alternate wetting & drying irrigation
                  </span>
                  <span className="text-[#4CAF50] font-mono font-medium">+20 pts</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span className="text-[#F2C14E]">Eligible for participating buyer incentive</span>
                <span>*Subject to buyer terms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
