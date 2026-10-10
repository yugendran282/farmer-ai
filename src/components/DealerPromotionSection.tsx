import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface DealerPromotionProps {
  onPartnerClick: (tierName: string) => void;
}

export const DealerPromotionSection: React.FC<DealerPromotionProps> = ({ onPartnerClick }) => {
  const tiers = [
    {
      name: 'Local Dealer Starter',
      badge: 'Single District',
      price: '₹2,499',
      unit: '/ month (Sample Plan)',
      description: 'Ideal for local retail input shops, seed retailers, and farm implement rentals looking for neighborhood farmer discoverability.',
      features: [
        'Verified business profile with address & hours',
        'Direct phone inquiry button from farmers',
        'Featured in 1 agricultural district directory',
        'Monthly search impression report',
        'Standard catalog listing (up to 10 products)',
      ],
      cta: 'Choose Starter',
      featured: false,
    },
    {
      name: 'Regional Growth',
      badge: 'Most Popular',
      price: '₹6,999',
      unit: '/ month (Sample Plan)',
      description: 'Built for regional distributors, soil testing laboratories, and micro-irrigation specialists targeting multi-mandal farming clusters.',
      features: [
        'Priority placement in AgriConnect directory',
        'Coverage across 3 contiguous agricultural districts',
        'Highlighted "Sponsored Listing" badge on search',
        'Regional crop-stage input demand insights',
        'Direct farmer inquiry dashboard & lead alerts',
        'Seasonal promotional banners during sowing peak',
      ],
      cta: 'Partner for Growth',
      featured: true,
    },
    {
      name: 'Agricultural Brand Partner',
      badge: 'State & National',
      price: 'Custom',
      unit: 'Commercial Inquiry',
      description: 'Tailored for fertilizer manufacturers, seed biotech enterprises, and tractor OEMs seeking compliant, data-driven regional farmer outreach.',
      features: [
        'State-wide or multi-state geo-targeted campaigns',
        'Co-branded agronomic stewardship awareness initiatives',
        'Aggregated regional demand trend analytics',
        'Dedicated account strategist & compliance officer',
        'Strict trust-policy compliant sponsored educational modules',
      ],
      cta: 'Contact Brand Team',
      featured: false,
    },
  ];

  return (
    <section id="dealers" className="py-20 lg:py-28 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>B2B Commercial Outreach</span>
            <span aria-hidden="true">·</span>
            <span>Input Dealers & Fertilizer Brands</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            Connect Your Business With the Right Farming Communities.
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            FARMERS AI helps agricultural input businesses improve discoverability, share relevant seasonal solutions, and understand regional demand through transparent, compliant campaigns.
          </p>
        </div>

        {/* Pricing & Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 transition-all flex flex-col justify-between ${
                tier.featured
                  ? 'bg-[#143D2B] text-white shadow-xl ring-2 ring-[#F2C14E] relative'
                  : 'bg-[#F7F6EF] text-[#17251D] border border-gray-200/90 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      tier.featured
                        ? 'bg-[#F2C14E] text-[#143D2B]'
                        : 'bg-white text-[#1B5E20] border border-gray-200'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-2 font-serif ${tier.featured ? 'text-white' : 'text-[#17251D]'}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 ${tier.featured ? 'text-white/80' : 'text-[#69786E]'}`}>
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-current/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold font-mono tracking-tight tabular-nums">
                      {tier.price}
                    </span>
                    <span className={`text-xs ${tier.featured ? 'text-white/70' : 'text-[#69786E]'}`}>
                      {tier.unit}
                    </span>
                  </div>
                  <span className={`text-[11px] block mt-1 ${tier.featured ? 'text-white/60' : 'text-[#69786E]'}`}>
                    Sample demonstration pricing
                  </span>
                </div>

                {/* Feature Bullet List */}
                <ul className="space-y-3 text-xs mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.featured ? 'text-[#F2C14E]' : 'text-[#1B5E20]'
                        }`}
                      />
                      <span className={tier.featured ? 'text-white/90' : 'text-[#17251D]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onPartnerClick(tier.name)}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.featured
                      ? 'bg-[#F2C14E] text-[#143D2B] hover:bg-[#e5b33d]'
                      : 'bg-[#143D2B] text-white hover:bg-[#1B5E20]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ESSENTIAL TRUST POLICY: Crucial Anti-Corruption Banner */}
        <div className="bg-[#17251D] text-white rounded-3xl p-8 lg:p-10 border border-white/10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#F2C14E] font-bold mb-1">
                  Non-Negotiable Editorial Independence
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
                  The FARMERS AI Trust Policy
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  All sponsored promotions on FARMERS AI are clearly labelled. Crucially, commercial sponsorships and advertising campaigns <strong className="text-white">never influence</strong> objective crop-health assessments, practice scores, independent APMC price comparisons, or agronomically appropriate farm guidance. A brand is never recommended simply because it pays to advertise.
                </p>
              </div>
            </div>

            <div className="shrink-0 bg-white/10 p-4 rounded-2xl border border-white/15 text-xs text-white/90 max-w-xs">
              <span className="font-bold text-[#F2C14E] block mb-1">Our Core Commitment:</span>
              "Farmers trust us for unbiased data. We protect that trust above all commercial arrangements."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
