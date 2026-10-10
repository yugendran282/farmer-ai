import React from 'react';
import { UserCheck, Sparkles, Store, Award, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartOnboarding: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOnboarding }) => {
  const steps = [
    {
      num: '01',
      icon: UserCheck,
      title: 'Register Your Farm',
      desc: 'Add your acreage, crop varieties, general district location, and expected harvest window in under 2 minutes.',
    },
    {
      num: '02',
      icon: Sparkles,
      title: 'Receive AI Insights',
      desc: 'Explore historical APMC trends, regional arrival surges, and net-return projections across diverse selling windows.',
    },
    {
      num: '03',
      icon: Store,
      title: 'Connect With Buyers',
      desc: 'Review transparent buyer procurement tenders, evaluate farmgate pickup vs delivery, and contact verified processors.',
    },
    {
      num: '04',
      icon: Award,
      title: 'Earn Practice Points',
      desc: 'Document balanced fertilizer usage, soil testing, and water stewardship to unlock participating buyer incentives.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>Operating Methodology</span>
            <span aria-hidden="true">·</span>
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            How FARMERS AI Works for You.
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            From field planting to final mandi offloading, a transparent and guided path to maximize farm profitability and reward good agronomy.
          </p>
        </div>

        {/* Steps Grid with Large Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
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
                  <span>Step {step.num}</span>
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
            <span>Register Your Farm Now (Free Demo)</span>
            <ArrowRight className="w-4 h-4 text-[#F2C14E]" />
          </button>
        </div>
      </div>
    </section>
  );
};
