import React from 'react';
import { HeartHandshake, Eye, TrendingUp, Users, ShieldCheck, Sprout } from 'lucide-react';

export const StorytellingSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#143D2B] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#4CAF50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F2C14E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#F2C14E] mb-3">
              <span>Human-Centered Agriculture</span>
              <span aria-hidden="true">·</span>
              <span>Our Foundational Purpose</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif leading-[1.18] mb-6 text-balance">
              Technology Should Reach the People Who Grow Our Food.
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              For generations, smallholder farmers have operated in information asymmetry — selling under distress when middlemen arrive, lacking transparent freight costs, and rarely receiving premiums for soil and water stewardship.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              FARMERS AI exists to invert that dynamic. By putting transparent market intelligence, verified direct buyer access, and digital practice records directly in the farmer’s hands, we empower agricultural communities to capture fair value for their labor.
            </p>
          </div>

          {/* Photo Montage with Fallback Containers */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#17251D] border border-white/10 shadow-md relative group">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer inspecting healthy grain stalks in field"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-medium text-white/90">Field Stewardship</span>
                </div>
              </div>

              <div className="h-36 sm:h-44 rounded-2xl overflow-hidden bg-[#17251D] border border-white/10 shadow-md relative group">
                <img
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
                  alt="Harvested grains and produce in rural market"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-medium text-white/90">Harvest Realization</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="h-36 sm:h-44 rounded-2xl overflow-hidden bg-[#17251D] border border-white/10 shadow-md relative group">
                <img
                  src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer holding phone in lush green fields"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-medium text-white/90">Digital Connectivity</span>
                </div>
              </div>

              <div className="h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#17251D] border border-white/10 shadow-md relative group">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Rural farming family and community teamwork"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-medium text-white/90">Farming Families</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Human Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          {[
            {
              icon: Eye,
              title: 'Eliminate Hidden Costs',
              desc: 'Transparent accounting of mandi cess, transport freight, and bags so farmers know their real take-home net return before loading trucks.',
            },
            {
              icon: TrendingUp,
              title: 'Empower Timing Decisions',
              desc: 'Actionable data comparing storage holding expenses against historical post-harvest price trends.',
            },
            {
              icon: Sprout,
              title: 'Reward Stewardship',
              desc: 'Recognize farmers who invest in soil health and water conservation by linking verifiable records to buyer incentive programs.',
            },
            {
              icon: Users,
              title: 'Preserve Independence',
              desc: 'Strictly neutral agricultural advice where paid dealer advertisements are clearly quarantined from agronomic recommendations.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#F2C14E]/20 text-[#F2C14E] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsible Metrics Notice */}
        <div className="mt-12 text-center text-[11px] text-white/50">
          Illustrative product narrative · Real pilot testimonials and impact assessments will be published post-harvest trials with verified farmer authorization.
        </div>
      </div>
    </section>
  );
};
