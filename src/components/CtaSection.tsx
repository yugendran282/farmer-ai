import React from 'react';
import { ArrowRight, Sprout, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CtaSectionProps {
  onRegisterClick: () => void;
  onPartnerClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onRegisterClick,
  onPartnerClick,
}) => {
  return (
    <section className="py-20 lg:py-24 bg-[#143D2B] text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B5E20]/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#F2C14E] flex items-center justify-center mx-auto mb-6 border border-white/15 shadow-sm">
          <Sprout className="w-8 h-8" />
        </div>

        <div className="text-xs uppercase tracking-widest text-[#F2C14E] font-semibold mb-3">
          Join the Agricultural Intelligence Movement
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
          Grow Smarter. Sell at the Right Time. Earn More.
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Start exploring mandi price patterns, connecting with verified processors, and building your crop practice score today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onRegisterClick}
            className="px-7 py-4 bg-[#F2C14E] text-[#143D2B] font-bold text-base rounded-xl hover:bg-[#e5b33d] transition-all shadow-md flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Register Your Farm (Free Demo)</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onPartnerClick}
            className="px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Partner as a Dealer or Buyer</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
            Free for Individual Farmers
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
            APMC & GSTIN Verified Buyers
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
            Zero-Spam WhatsApp Delivery
          </span>
        </div>
      </div>
    </section>
  );
};
