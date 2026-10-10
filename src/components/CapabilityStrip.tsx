import React from 'react';
import { Sprout, TrendingUp, Store, Award } from 'lucide-react';

export const CapabilityStrip: React.FC = () => {
  const capabilities = [
    {
      icon: Sprout,
      title: 'AI-Powered Crop Intelligence',
      description: 'Regional demand forecasting, arrival trends, and price behavior patterns.',
    },
    {
      icon: TrendingUp,
      title: 'Intelligent Selling Decisions',
      description: 'Transparent net-return calculators comparing storage, transport, and offer timing.',
    },
    {
      icon: Store,
      title: 'Local Buyer Connections',
      description: 'Direct access to verified regional millers, wholesale traders, and food processors.',
    },
    {
      icon: Award,
      title: 'Practice-Based Crop Rewards',
      description: 'Document sustainable farm practices to qualify for participating buyer incentives.',
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
