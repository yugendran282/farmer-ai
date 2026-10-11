import React from 'react';
import { Eye, TrendingUp, Users, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StorytellingSection: React.FC = () => {
  const { t } = useLanguage();

  const commitments = [
    {
      icon: Eye,
      title: t('story_c1_t', 'Eliminate Hidden Costs', 'மறைமுக செலவுகளை நீக்குதல்'),
      desc: t('story_c1_d', 'Transparent accounting of mandi cess, transport freight, and bags so farmers know their real take-home net return before loading trucks.', 'சந்தை வரிகள், போக்குவரத்து கட்டணங்களை வெளிப்படையாகக் காட்டி உண்மையான வருமானத்தை அறிய உதவுதல்.'),
    },
    {
      icon: TrendingUp,
      title: t('story_c2_t', 'Empower Timing Decisions', 'சரியான விற்பனை நேரம்'),
      desc: t('story_c2_d', 'Actionable data comparing storage holding expenses against historical post-harvest price trends.', 'சேமிப்பு செலவுகளையும் சந்தை விலை உயர்வையும் ஒப்பிட்டு சரியான நேரத்தில் விற்க உதவுதல்.'),
    },
    {
      icon: Sprout,
      title: t('story_c3_t', 'Reward Stewardship', 'இயற்கை நற்செயலுக்கு வெகுமதி'),
      desc: t('story_c3_d', 'Recognize farmers who invest in soil health and water conservation by linking verifiable records to buyer incentive programs.', 'மண் மற்றும் நீர் வளம் காக்கும் விவசாயிகளுக்கு கூடுதல் ஊக்கத்தொகை பெற்றுத் தருதல்.'),
    },
    {
      icon: Users,
      title: t('story_c4_t', 'Preserve Independence', 'நடுநிலை வழிகாட்டல்'),
      desc: t('story_c4_d', 'Strictly neutral agricultural advice where paid dealer advertisements are clearly quarantined from agronomic recommendations.', 'விளம்பரங்களால் பாதிக்கப்படாத, விவசாயிகளுக்கான நடுநிலையான பயிர் ஆலோசனைகள்.'),
    },
  ];

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
              <span>{t('story_eyebrow1', 'Human-Centered Agriculture', 'மனிதநேய வேளாண்மை')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('story_eyebrow2', 'Our Foundational Purpose', 'எங்கள் அடிப்படை நோக்கம்')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif leading-[1.18] mb-6 text-balance">
              {t('story_title', 'Technology Should Reach the People Who Grow Our Food.', 'உணவு தரும் விவசாயிகளை தொழில்நுட்பம் சென்றடைய வேண்டும்.')}
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              {t(
                'story_p1',
                'For generations, smallholder farmers have operated in information asymmetry — selling under distress when middlemen arrive, lacking transparent freight costs, and rarely receiving premiums for soil and water stewardship.',
                'விவசாயிகள் இடைத்தரகர்களிடம் குறைந்த விலைக்கு விற்பதைத் தடுத்து, வெளிப்படையான சந்தை மற்றும் போக்குவரத்து செலவுகளை அறிய வைப்பதே எங்கள் நோக்கம்.'
              )}
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {t(
                'story_p2',
                'FARMERS AI exists to invert that dynamic. By putting transparent market intelligence, verified direct buyer access, and digital practice records directly in the farmer’s hands, we empower agricultural communities to capture fair value for their labor.',
                'நேரடி சந்தை அறிவு, சரிபார்க்கப்பட்ட வியாபாரிகள் மற்றும் டிஜிட்டல் பதிவுகளை விவசாயிகளின் கைகளில் வழங்குவதன் மூலம் உழைப்பிற்கு ஏற்ற நியாயமான விலையைப் பெற உதவுகிறோம்.'
              )}
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
                  <span className="text-[11px] font-medium text-white/90">{t('story_photo1', 'Field Stewardship', 'நிலப் பராமரிப்பு')}</span>
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
                  <span className="text-[11px] font-medium text-white/90">{t('story_photo2', 'Harvest Realization', 'அறுவடை பலன்')}</span>
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
                  <span className="text-[11px] font-medium text-white/90">{t('story_photo3', 'Digital Connectivity', 'டிஜிட்டல் இணைப்பு')}</span>
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
                  <span className="text-[11px] font-medium text-white/90">{t('story_photo4', 'Farming Families', 'விவசாயக் குடும்பங்கள்')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Human Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          {commitments.map((item, idx) => {
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
          {t('story_narrative_note', 'Illustrative product narrative · Real pilot testimonials and impact assessments will be published post-harvest trials with verified farmer authorization.', 'விவசாயிகளின் நலனுக்காக அர்ப்பணிக்கப்பட்ட மாதிரி தளம்.')}
        </div>
      </div>
    </section>
  );
};
