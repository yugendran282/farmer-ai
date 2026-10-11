import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  TrendingUp,
  WifiOff,
  Sparkles,
  ChevronRight,
  Store,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { DealerListing, CropId } from '../types';
import { DEALERS, REGIONAL_DEMAND_INSIGHTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface AgriConnectSectionProps {
  onContactDealer: (dealer: DealerListing) => void;
}

export const AgriConnectSection: React.FC<AgriConnectSectionProps> = ({ onContactDealer }) => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('kurnool');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cropFilter, setCropFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('mktplace_all_crops', 'All Services', 'அனைத்து சேவைகள்') },
    { id: 'Fertilizers & Nutrition', label: t('cat_fert_rem', 'Fertilizers & Nutrition', 'உரங்கள் & ஊட்டச்சத்து') },
    { id: 'Seeds & Nurseries', label: t('cat_plant', 'Seeds & Nurseries', 'விதைகள் & நாற்றங்கால்') },
    { id: 'Micro-Irrigation', label: t('irrig_drip', 'Micro-Irrigation', 'சொட்டு நீர் பாசனம்') },
    { id: 'Soil Testing & Crop Health', label: t('qa_advisor', 'Soil Testing Labs', 'மண் பரிசோதனை நிலையங்கள்') },
    { id: 'Farm Implements', label: t('cat_machinery', 'Machinery & Implements', 'வேளாண் இயந்திரங்கள்') },
  ];

  const filteredDealers = useMemo(() => {
    return DEALERS.filter((dealer) => {
      const matchesSearch =
        searchQuery === '' ||
        dealer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dealer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dealer.keyProducts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        categoryFilter === 'all' || dealer.category === categoryFilter;

      const matchesCrop =
        cropFilter === 'all' || dealer.supportedCrops.includes(cropFilter as CropId);

      return matchesSearch && matchesCategory && matchesCrop;
    });
  }, [searchQuery, categoryFilter, cropFilter]);

  return (
    <section id="agriconnect" className="py-20 lg:py-28 bg-[#F7F6EF] border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>{t('agri_eyebrow1', 'AgriConnect Regional Intelligence', 'AgriConnect மண்டல நுண்ணறிவு')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('agri_eyebrow2', 'Local Dealer Discovery', 'உள்ளூர் வியாபாரி தேடல்')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            {t('agri_title', 'Local Knowledge. Connected Agriculture.', 'உள்ளூர் அறிவு. இணைக்கப்பட்ட வேளாண்மை.')}
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            {t(
              'agri_subtitle',
              'AgriConnect helps farmers discover verified agricultural services while enabling dealers to understand regional demand and reach interested farming communities.',
              'விவசாயிகள் சரிபார்க்கப்பட்ட வேளாண் சேவைகளைக் கண்டறியவும், வியாபாரிகள் விவசாயிகளை எளிதில் சென்றடையவும் உதவுகிறது.'
            )}
          </p>
        </div>

        {/* Regional Intelligence Bento Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
          {/* Regional Summary & Stage (Col-span 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider">
                  {t('agri_status_badge', 'Regional Cluster Status', 'மண்டல நிலை')}
                </span>
                <span className="text-xs text-[#69786E] font-medium">{t('agri_demo_cluster', 'Demonstration Cluster', 'மாதிரி மண்டலம்')}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#17251D] font-serif mb-2">
                {t('agri_cluster_name', 'Kurnool & Tungabhadra Basin', 'கர்னூல் & துங்கபத்ரா படுகை')}
              </h3>
              <p className="text-xs sm:text-sm text-[#69786E] mb-6 leading-relaxed">
                {t('agri_cluster_desc', 'Active monitoring across 14 mandals covering paddy, maize, and groundnut acreages.', 'நெல், மக்காச்சோளம் மற்றும் நிலக்கடலை சாகுபடி மண்டலங்கள் கண்காணிக்கப்படுகின்றன.')}
              </p>

              {/* Crop Stage Progress Breakdown */}
              <div className="space-y-3.5 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#17251D] mb-1">
                    <span>Paddy (Kharif Harvest Arrival)</span>
                    <span className="font-mono text-[#1B5E20]">68% Harvested</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#1B5E20] h-2 rounded-full w-[68%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#17251D] mb-1">
                    <span>Tomato (Peak Flowering / Flush)</span>
                    <span className="font-mono text-[#087F5B]">82% Active Growth</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#087F5B] h-2 rounded-full w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#17251D] mb-1">
                    <span>Groundnut (Pod Development)</span>
                    <span className="font-mono text-[#F2C14E]">55% Pod Setting</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#F2C14E] h-2 rounded-full w-[55%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Offline Architecture Indicator */}
            <div className="pt-4 border-t border-gray-100 flex items-start gap-3 bg-[#F7F6EF] p-3.5 rounded-xl">
              <WifiOff className="w-4 h-4 text-[#765341] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#69786E] leading-relaxed">
                <strong className="text-[#17251D]">{t('agri_offline_arch_title', 'Offline-Ready Architecture:', 'இணையம் இல்லாத போதும் இயங்கும்:')}</strong>{' '}
                {t('agri_offline_arch_desc', 'Directory listings and reference prices cache locally to device storage for low-connectivity rural fields.', 'குறைந்த இணைய வசதி கொண்ட கிராமப்புறங்களிலும் தகவல்கள் போனில் சேமிக்கப்பட்டு இயங்கும்.')}
              </div>
            </div>
          </div>

          {/* Regional Input Demand Prediction (Col-span 7) */}
          <div className="lg:col-span-7 bg-[#143D2B] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#F2C14E]/20 flex items-center justify-center text-[#F2C14E]">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#F2C14E] uppercase tracking-wider">
                    {t('agri_demand_badge', 'AgriConnect Demand Predictions', 'தேவை கணிப்புகள்')}
                  </span>
                </div>
                <span className="text-xs text-white/60">{t('agri_est_trends', 'Estimated Trends', 'மதிப்பிடப்பட்ட போக்குகள்')}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-2">
                {t('agri_anticipated_inputs', 'Anticipated Farm Input Requirements', 'எதிர்பார்க்கப்படும் வேளாண் இடுபொருட்கள் தேவை')}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed">
                {t('agri_anticipated_desc', 'Aggregated from farmer crop cycle logs, planting timelines, and seasonal moisture forecasts to help dealers stock appropriately.', 'விவசாயிகளின் நடவு காலம் மற்றும் வானிலை முன்னறிவிப்பின் அடிப்படையில் கணிக்கப்பட்ட தேவை.')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                {REGIONAL_DEMAND_INSIGHTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-[#F2C14E] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#DDF3E4] font-medium">
                          {item.growthTrend}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug mb-2">
                        {item.item}
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {item.insight}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-white/50">
                      Indicator: {item.urgency}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-white/50 pt-2">
              {t('agri_demand_disclaimer', 'Demand indicators are aggregate predictive models, not confirmed purchase orders.', 'இவை மதிப்பீட்டு கணிப்புகள் மட்டுமே, உறுதிப்படுத்தப்பட்ட கொள்முதல் அல்ல.')}
            </div>
          </div>
        </div>

        {/* Searchable Dealer Discovery Directory */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-1">
                {t('agri_dir_badge', 'Verified Local Services', 'சரிபார்க்கப்பட்ட சேவைகள்')}
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                {t('agri_dir_title', 'Agricultural Dealer & Service Directory', 'வேளாண் வியாபாரிகள் மற்றும் சேவை முகவரகம்')}
              </h3>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('agri_search_placeholder', 'Search dealer, fertilizer, seeds...', 'உரங்கள், விதைகள், வியாபாரிகளைத் தேடவும்...')}
                className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              />
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat.id
                    ? 'bg-[#143D2B] text-white shadow-xs'
                    : 'bg-[#F7F6EF] text-[#69786E] hover:text-[#17251D]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dealers Grid */}
          {filteredDealers.length === 0 ? (
            <div className="text-center py-12">
              <Store className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#17251D]">{t('agri_no_dealers', 'No dealers match your search criteria', 'வியாபாரிகள் யாரும் கிடைக்கவில்லை')}</p>
              <p className="text-xs text-[#69786E] mt-1">{t('agri_no_dealers_sub', 'Try resetting the search terms or category filters.', 'வேறு வார்த்தைகளைப் பயன்படுத்தி தேடவும்.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="bg-[#F7F6EF] rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Verified & Sponsored Badges */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-[#1B5E20] uppercase tracking-wider block">
                        {dealer.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {dealer.isSponsored && (
                          <span className="text-[10px] font-bold text-[#765341] bg-[#F2C14E]/30 px-2 py-0.5 rounded-md">
                            {t('agri_sponsored', 'Sponsored', 'விளம்பரம்')}
                          </span>
                        )}
                        {dealer.isVerified && (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1B5E20]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t('mkt_verified_buyer', 'Verified', 'சரிபார்க்கப்பட்டது')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-[#17251D] mb-1.5 leading-snug">
                      {dealer.businessName}
                    </h4>

                    <div className="flex items-start gap-1.5 text-xs text-[#69786E] mb-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1B5E20]" />
                      <span>{dealer.address} ({dealer.distanceKm} km {t('mkt_away', 'away', 'தொலைவில்')})</span>
                    </div>

                    {/* Key Products */}
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-[#17251D] block mb-1.5">
                        {t('agri_key_products', 'Key Products / Services:', 'முக்கிய தயாரிப்புகள் / சேவைகள்:')}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dealer.keyProducts.map((prod, idx) => (
                          <span
                            key={idx}
                            className="bg-white px-2 py-1 rounded-md text-[11px] text-[#17251D] border border-gray-200/70"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#69786E] mb-4">
                      <Clock className="w-3.5 h-3.5 text-[#69786E]" />
                      <span>{dealer.businessHours}</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-medium text-[#17251D]">
                      {dealer.contactPhone}
                    </span>
                    <button
                      onClick={() => onContactDealer(dealer)}
                      className="px-3.5 py-2 bg-[#143D2B] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t('agri_btn_enquire', 'Enquire', 'தொடர்பு கொள்ள')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
