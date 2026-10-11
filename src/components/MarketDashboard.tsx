import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Info,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Truck,
  Building,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  PhoneCall
} from 'lucide-react';
import { CropId, Crop, MarketPricePoint, BuyerOffer } from '../types';
import { CROPS, MARKETS, HISTORICAL_PRICES, BUYER_OFFERS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface MarketDashboardProps {
  onContactBuyer: (offer: BuyerOffer) => void;
}

export const MarketDashboard: React.FC<MarketDashboardProps> = ({ onContactBuyer }) => {
  const { t } = useLanguage();
  const [selectedCropId, setSelectedCropId] = useState<CropId>('paddy');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('kurnool');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Selected Offer for Calculator and comparison
  const cropOffers = useMemo(() => {
    return BUYER_OFFERS.filter((offer) => offer.cropId === selectedCropId);
  }, [selectedCropId]);

  const [selectedOfferId, setSelectedOfferId] = useState<string>(cropOffers[0]?.id || 'bo-1');

  // Keep selected offer synchronized when crop changes
  const activeOffer = useMemo(() => {
    const found = cropOffers.find((o) => o.id === selectedOfferId);
    return found || cropOffers[0] || BUYER_OFFERS[0];
  }, [cropOffers, selectedOfferId]);

  // Selling-Cost Calculator State
  const [quantityQuintals, setQuantityQuintals] = useState<number>(50);
  const [transportCostPerQtl, setTransportCostPerQtl] = useState<number>(60);
  const [storageCostPerQtl, setStorageCostPerQtl] = useState<number>(30);
  const [handlingFeePerQtl, setHandlingFeePerQtl] = useState<number>(25);

  const selectedCrop: Crop = CROPS[selectedCropId];
  const selectedMarket = MARKETS.find((m) => m.id === selectedMarketId) || MARKETS[0];
  const priceSeries: MarketPricePoint[] = HISTORICAL_PRICES[selectedCropId][timeframe];

  // Active hover point or latest point
  const activeDataPoint = hoveredPointIndex !== null && priceSeries[hoveredPointIndex]
    ? priceSeries[hoveredPointIndex]
    : priceSeries[priceSeries.length - 1];

  // SVG Chart Geometry Calculations
  const chartGeometry = useMemo(() => {
    if (!priceSeries || priceSeries.length === 0) return null;
    const width = 640;
    const height = 260;
    const padX = 40;
    const padY = 30;

    const prices = priceSeries.map((p) => p.price);
    const minPrice = Math.min(...prices) * 0.96;
    const maxPrice = Math.max(...prices) * 1.04;
    const priceRange = maxPrice - minPrice || 1;

    const points = priceSeries.map((point, index) => {
      const x = padX + (index / (priceSeries.length - 1)) * (width - padX * 2);
      const y = height - padY - ((point.price - minPrice) / priceRange) * (height - padY * 2);
      return { x, y, point, index };
    });

    const polylinePoints = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

    // Area fill path
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const bottomY = height - padY;
    const areaPath = `M ${firstX},${bottomY} L ${polylinePoints.replace(/ /g, ' L ')} L ${lastX},${bottomY} Z`;

    return { width, height, points, polylinePoints, areaPath, minPrice, maxPrice };
  }, [priceSeries]);

  // Selling Calculator Calculations
  const buyerPrice = activeOffer ? activeOffer.pricePerQuintal : selectedCrop.referencePrice;
  const grossSaleValue = quantityQuintals * buyerPrice;
  const totalTransportCost = activeOffer.pickupProvided ? 0 : quantityQuintals * transportCostPerQtl;
  const totalStorageCost = quantityQuintals * storageCostPerQtl;
  const totalHandlingFee = quantityQuintals * handlingFeePerQtl;
  const totalSellingCosts = totalTransportCost + totalStorageCost + totalHandlingFee;
  const estimatedNetReturn = grossSaleValue - totalSellingCosts;
  const netReturnPerQtl = quantityQuintals > 0 ? estimatedNetReturn / quantityQuintals : 0;

  return (
    <section id="market-dashboard" className="py-20 lg:py-28 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>{t('mkt_eyebrow', 'AI Market Intelligence', 'AI சந்தை நுண்ணறிவு')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('mkt_eyebrow2', 'Interactive Operational Demo', 'ஊடாடும் செயல்பாட்டு டெமோ')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            {t('mkt_heading', 'Better Decisions Begin With Better Market Insights.', 'சிறந்த முடிவுகள் சிறந்த சந்தை நுண்ணறிவுகளிலிருந்து தொடங்குகின்றன.')}
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            {t('mkt_subheading', 'Compare market trends, evaluate local buyer offers, understand selling costs, and explore potential selling windows before making your next move.', 'சந்தை போக்குகளை ஒப்பிட்டு, உள்ளூர் வாங்குபவர் சலுகைகளை மதிப்பிட்டு, விற்பனை செலவுகளைப் புரிந்து கொண்டு உங்கள் முடிவை எடுங்கள்.')}
          </p>
        </div>

        {/* Global Selectors Bar */}
        <div className="bg-[#F7F6EF] p-4 sm:p-5 rounded-2xl border border-gray-200/80 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Crop Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="crop-select" className="text-xs font-semibold text-[#143D2B] uppercase tracking-wider">
                {t('mkt_select_crop', 'Select Crop:', 'பயிரைத் தேர்வுசெய்:')}
              </label>
              <select
                id="crop-select"
                value={selectedCropId}
                onChange={(e) => {
                  const newCropId = e.target.value as CropId;
                  setSelectedCropId(newCropId);
                  const matchingOffers = BUYER_OFFERS.filter((o) => o.cropId === newCropId);
                  if (matchingOffers.length > 0) {
                    setSelectedOfferId(matchingOffers[0].id);
                  }
                }}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20] cursor-pointer"
              >
                {Object.values(CROPS).map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {t(`crop_name_${crop.id}`, crop.name, crop.tamilName || crop.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* Market Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="market-select" className="text-xs font-semibold text-[#143D2B] uppercase tracking-wider">
                {t('mkt_benchmark_mandi', 'Benchmark Mandi:', 'ஒப்பீட்டு மண்டி:')}
              </label>
              <select
                id="market-select"
                value={selectedMarketId}
                onChange={(e) => setSelectedMarketId(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20] cursor-pointer"
              >
                {MARKETS.map((market) => (
                  <option key={market.id} value={market.id}>
                    {market.name} ({market.state})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="flex items-center gap-2 text-xs text-[#69786E]">
            <Info className="w-4 h-4 text-[#1B5E20] shrink-0" />
            <span>{t('mkt_demo_notice', 'Demonstration records · Not a live market quote', 'டெமோ பதிவுகள் · நேரலை மேற்கோள் அல்ல')}</span>
          </div>
        </div>

        {/* Top Split: Price Trend SVG Chart + Reference Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main SVG Historical Price Chart (Col-span 8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-1">
                  {t('mkt_chart_title', 'Historical APMC Price Trend', 'வரலாற்று APMC விலை போக்கு')}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17251D] font-serif">
                  {t(`crop_name_${selectedCrop.id}`, selectedCrop.name, selectedCrop.tamilName || selectedCrop.name)} · {selectedMarket.name}
                </h3>
              </div>

              {/* Timeframe Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                {(['7d', '30d', '90d'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setTimeframe(tf);
                      setHoveredPointIndex(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all uppercase whitespace-nowrap cursor-pointer ${
                      timeframe === tf
                        ? 'bg-white text-[#143D2B] shadow-xs'
                        : 'text-[#69786E] hover:text-[#17251D]'
                    }`}
                  >
                    {tf === '7d' ? t('mkt_tf_7d', '7 Days', '7 நாட்கள்') : tf === '30d' ? t('mkt_tf_30d', '30 Days', '30 நாட்கள்') : t('mkt_tf_90d', '90 Days', '90 நாட்கள்')}
                  </button>
                ))}
              </div>
            </div>

            {/* Native SVG Chart Area */}
            <div className="relative w-full h-[280px] sm:h-[300px] flex items-center justify-center">
              {chartGeometry && (
                <svg
                  viewBox={`0 0 ${chartGeometry.width} ${chartGeometry.height}`}
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline Grids */}
                  {[0.25, 0.5, 0.75].map((pct, idx) => {
                    const yVal = 30 + (260 - 60) * pct;
                    return (
                      <line
                        key={idx}
                        x1="30"
                        y1={yVal}
                        x2="610"
                        y2={yVal}
                        stroke="#E5E7EB"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Area Fill */}
                  <path d={chartGeometry.areaPath} fill="url(#chartGradient)" />

                  {/* Polyline Curve */}
                  <polyline
                    fill="none"
                    stroke="#1B5E20"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartGeometry.polylinePoints}
                  />

                  {/* Interactive Points & Hit Areas */}
                  {chartGeometry.points.map((pt, i) => {
                    const isHovered = hoveredPointIndex === i;
                    const isLast = i === chartGeometry.points.length - 1 && hoveredPointIndex === null;
                    return (
                      <g key={i}>
                        {/* Invisible large hit target for touch and mouse */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="16"
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredPointIndex(i)}
                          onMouseLeave={() => setHoveredPointIndex(null)}
                          onTouchStart={() => setHoveredPointIndex(i)}
                          tabIndex={0}
                          aria-label={`${pt.point.date}: ₹${pt.point.price} per quintal`}
                          onFocus={() => setHoveredPointIndex(i)}
                          onBlur={() => setHoveredPointIndex(null)}
                        />

                        {/* Visible Data Dot */}
                        {(isHovered || isLast) && (
                          <>
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="7"
                              fill="#1B5E20"
                              opacity="0.2"
                              className="animate-ping"
                            />
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="5"
                              fill="#1B5E20"
                              stroke="#FFFFFF"
                              strokeWidth="2"
                            />
                            {/* Vertical drop line */}
                            <line
                              x1={pt.x}
                              y1={pt.y}
                              x2={pt.x}
                              y2={260 - 30}
                              stroke="#1B5E20"
                              strokeWidth="1"
                              strokeDasharray="2 2"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* X-Axis Dates & Dynamic Tooltip Bar */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-[#69786E]">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#17251D]">
                  {t('mkt_point_date', 'Point Date:', 'தேதி:')} <span className="font-mono text-[#143D2B]">{activeDataPoint.date}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {t('mkt_observation', 'Observation:', 'விலை:')} <span className="font-bold font-mono text-[#143D2B] text-sm tabular-nums">₹{activeDataPoint.price.toLocaleString('en-IN')}</span> / qtl
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {t('mkt_arrivals', 'Arrivals:', 'வரத்து:')} <span className="font-mono text-[#17251D]">{activeDataPoint.volumeQuintals} {t('mkt_qtl', 'qtl', 'குவி')}</span>
                </span>
              </div>

              <div className="text-[11px] text-[#69786E]">
                {t('mkt_hover_hint', 'Hover or tap points to inspect historical quotations', 'வரலாற்று மேற்கோள்களைப் பார்க்க புள்ளிகளைத் தொடவும்')}
              </div>
            </div>
          </div>

          {/* Reference Price & Mandi Intelligence Card (Col-span 4) */}
          <div className="lg:col-span-4 bg-[#F7F6EF] rounded-3xl p-6 sm:p-8 border border-gray-200/90 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-2">
                {t('mkt_live_benchmark_overview', 'Live Benchmark Overview', 'நேரலை ஒப்பீட்டு கண்ணோட்டம்')}
              </div>
              <h3 className="text-xl font-bold text-[#17251D] font-serif mb-4">
                {t(`crop_name_${selectedCrop.id}`, selectedCrop.name, selectedCrop.tamilName || selectedCrop.name)}
              </h3>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs mb-6">
                <span className="text-xs text-[#69786E] block mb-1">{t('mkt_current_ref_price', 'Current Reference Price', 'தற்போதைய குறிப்பு விலை')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-[#143D2B] tabular-nums">
                    ₹{selectedCrop.referencePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#69786E]">{t('mktplace_per_quintal', '/ quintal', '/ குவிண்டால்')}</span>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-gray-100">
                  <span className="text-[#69786E]">{t('mkt_7d_movement', '7-Day Movement:', '7-நாள் மாற்றம்:')}</span>
                  <span className={`font-semibold font-mono flex items-center gap-0.5 ${
                    selectedCrop.dayChangePercent >= 0 ? 'text-[#087F5B]' : 'text-red-700'
                  }`}>
                    {selectedCrop.dayChangePercent >= 0 ? '▲ +' : '▼ '}
                    {Math.abs(selectedCrop.dayChangePercent)}%
                  </span>
                </div>

                {selectedCrop.mspGovernment > 0 && (
                  <div className="mt-2 flex items-center justify-between text-xs text-[#69786E]">
                    <span>{t('mkt_govt_msp', 'Govt MSP Benchmark:', 'அரசு ஆதரவு விலை (MSP):')}</span>
                    <span className="font-mono font-medium text-[#17251D]">
                      ₹{selectedCrop.mspGovernment.toLocaleString('en-IN')} / qtl
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-xs text-[#69786E]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#17251D]">{t('mkt_variety', 'Variety:', 'ரகம்:')}</strong> {selectedCrop.variety}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#17251D]">{t('mkt_season', 'Season:', 'பருவம்:')}</strong> {selectedCrop.season}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#17251D]">{t('mkt_std_unit', 'Standard Unit:', 'நிலையான அலகு:')}</strong> {t('mkt_1_quintal', '1 Quintal (100 kg)', '1 குவிண்டால் (100 கிலோ)')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 mt-6">
              <span className="text-[11px] text-[#69786E] block leading-relaxed">
                {t('mkt_benchmark_disclaimer', 'Prices shown reflect average weighted APMC arrivals for fair average quality (FAQ). Perishable vegetables like tomato do not possess a statutory MSP.', 'காட்டப்படும் விலைகள் சராசரி APMC வரத்து விலையாகும். தக்காளி போன்ற அழுகக்கூடிய காய்கறிகளுக்கு சட்டப்பூர்வ MSP இல்லை.')}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Buyer Offer Comparison */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-1">
                {t('mkt_local_comm_demand', 'Local Commercial Demand', 'உள்ளூர் வணிக தேவை')}
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                {t('mkt_verified_offers_for', `Verified Buyer Offers for ${selectedCrop.name}`, `சரிபார்க்கப்பட்ட வாங்குபவர் சலுகைகள்: ${t(`crop_name_${selectedCrop.id}`, selectedCrop.name, selectedCrop.tamilName || selectedCrop.name)}`)}
              </h3>
            </div>
            <span className="text-xs text-[#69786E]">
              {cropOffers.length} {t('mkt_active_quotations', 'Active quotations in region', 'செயலில் உள்ள மேற்கோள்கள் இப்பகுதியில்')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cropOffers.map((offer) => {
              const isSelected = activeOffer.id === offer.id;
              return (
                <div
                  key={offer.id}
                  className={`rounded-2xl p-6 transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F7F6EF] border-[#1B5E20] ring-2 ring-[#1B5E20]/20 shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Buyer Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] text-[#69786E] font-medium block">
                          {offer.businessType}
                        </span>
                        <h4 className="text-base font-bold text-[#17251D] leading-snug">
                          {offer.buyerName}
                        </h4>
                      </div>
                      {offer.isVerified && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1B5E20] shrink-0" title="APMC/GSTIN Business Verified">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t('mkt_verified', 'Verified', 'சரிபார்க்கப்பட்டது')}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#69786E] mb-4 flex items-center gap-1.5">
                      <span>{offer.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{offer.distanceKm} {t('mktplace_km_away', 'km away', 'கிமீ தொலைவு')}</span>
                    </div>

                    {/* Price and Quantity */}
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 mb-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs text-[#69786E]">{t('mkt_offered_price', 'Offered Price:', 'வழங்கப்படும் விலை:')}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold font-mono text-[#143D2B] tabular-nums">
                            ₹{offer.pricePerQuintal.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-[#69786E]">/ qtl</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#69786E] pt-2 border-t border-gray-100">
                        <span>{t('mkt_min_req', 'Min Requirement:', 'குறைந்தபட்ச தேவை:')}</span>
                        <span className="font-mono font-medium text-[#17251D]">
                          {offer.minQuantityQuintals} {t('mkt_quintals', 'quintals', 'குவிண்டால்கள்')}
                        </span>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-1.5 text-xs text-[#69786E] mb-6">
                      <div className="flex items-center justify-between">
                        <span>{t('mkt_logistics', 'Logistics:', 'போக்குவரத்து:')}</span>
                        <span className="font-medium text-[#17251D]">
                          {offer.pickupProvided ? t('mkt_pickup_included', 'Farmgate Pickup Included', 'களத்திலேயே ஏற்றிச்செல்லப்படும்') : t('mkt_delivery_required', 'Farmer Delivery Required', 'விவசாயி கொண்டு சேர்க்க வேண்டும்')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t('mktplace_settlement', 'Payment Terms:', 'பணம் செலுத்துதல்:')}</span>
                        <span className="font-medium text-[#17251D]">{offer.paymentTerms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t('mkt_grade_req', 'Grade Requirement:', 'தரத் தேவை:')}</span>
                        <span className="font-medium text-[#17251D]">{offer.qualityGradeRequired}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOfferId(offer.id)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#143D2B] text-white'
                          : 'bg-gray-100 text-[#17251D] hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? t('mkt_selected_in_calc', 'Selected in Calculator', 'கணக்கீட்டில் தேர்ந்தெடுக்கப்பட்டது') : t('mkt_compare_in_calc', 'Compare in Calculator', 'கணக்கீட்டில் ஒப்பிடுக')}
                    </button>
                    <button
                      onClick={() => onContactBuyer(offer)}
                      className="p-2 text-[#1B5E20] hover:text-[#143D2B] hover:bg-[#DDF3E4] rounded-lg transition-colors cursor-pointer"
                      title={t('mkt_enquire_buyer', 'Enquire with buyer', 'வாங்குபவரிடம் விசாரிக்க')}
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Split: Selling-Cost Calculator & AI Decision-Support Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selling-Cost Calculator (Col-span 6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider block">
                  {t('mkt_comm_transparency', 'Commercial Transparency', 'வணிக வெளிப்படைத்தன்மை')}
                </span>
                <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                  {t('mkt_calc_title', 'Selling-Cost & Net Return Calculator', 'விற்பனை செலவு & நிகர வருவாய் கணக்கீடு')}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#69786E] mb-6 leading-relaxed">
              {t('mkt_calc_desc', 'Evaluating an offer must account for transport, bagging, storage, and APMC cess. Enter your estimated volume to see the real net return.', 'ஒரு சலுகையை மதிப்பிடும்போது போக்குவரத்து, சேமிப்பு, சாக்குகள் மற்றும் செஸ் ஆகியவற்றை கணக்கில் கொள்ள வேண்டும். உண்மையான நிகர வருவாயைக் காண அளவை உள்ளிடவும்.')}
            </p>

            {/* Inputs Grid */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="quantity-input" className="text-xs font-semibold text-[#17251D]">
                    {t('mkt_harvest_qty_sell', 'Harvest Quantity to Sell (Quintals)', 'விற்பனை செய்ய வேண்டிய அறுவடை அளவு (குவிண்டால்)')}
                  </label>
                  <span className="text-xs font-mono font-bold text-[#143D2B]">{quantityQuintals} {t('mkt_qtl', 'qtl', 'குவி')}</span>
                </div>
                <input
                  id="quantity-input"
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={quantityQuintals}
                  onChange={(e) => setQuantityQuintals(Number(e.target.value))}
                  className="w-full accent-[#1B5E20] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-[#69786E] block mb-1">
                    {t('mkt_transport_cost', 'Transport (₹/qtl)', 'போக்குவரத்து (₹/குவி)')}
                  </label>
                  <input
                    type="number"
                    value={activeOffer.pickupProvided ? 0 : transportCostPerQtl}
                    disabled={activeOffer.pickupProvided}
                    onChange={(e) => setTransportCostPerQtl(Number(e.target.value) || 0)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-[#17251D] disabled:opacity-50"
                  />
                  {activeOffer.pickupProvided && (
                    <span className="text-[10px] text-[#087F5B] mt-0.5 block">{t('mkt_pickup_by_buyer', 'Pickup covered by buyer', 'வாங்குபவரே ஏற்றிக்கொள்கிறார்')}</span>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#69786E] block mb-1">
                    {t('mkt_storage_cost', 'Storage/Bags (₹/qtl)', 'சேமிப்பு/பைகள் (₹/குவி)')}
                  </label>
                  <input
                    type="number"
                    value={storageCostPerQtl}
                    onChange={(e) => setStorageCostPerQtl(Number(e.target.value) || 0)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-[#17251D]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#69786E] block mb-1">
                    {t('mkt_handling_cost', 'Handling/Cess (₹/qtl)', 'கையாளுதல்/செஸ் (₹/குவி)')}
                  </label>
                  <input
                    type="number"
                    value={handlingFeePerQtl}
                    onChange={(e) => setHandlingFeePerQtl(Number(e.target.value) || 0)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-[#17251D]"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Breakdown Box */}
            <div className="bg-[#143D2B] text-white p-5 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>{t('mkt_active_offer', 'Active Selected Offer:', 'தேர்ந்தெடுக்கப்பட்ட சலுகை:')}</span>
                <span className="font-semibold text-white truncate max-w-[200px]">{activeOffer.buyerName}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <span>{t('mkt_gross_value', 'Gross Sale Value', 'மொத்த விற்பனை மதிப்பு')} ({quantityQuintals} qtl × ₹{buyerPrice}):</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  ₹{grossSaleValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <span>{t('mkt_deductions', 'Deductions (Transport + Storage + Fees):', 'கழிவுகள் (போக்குவரத்து + சேமிப்பு + கட்டணம்):')}</span>
                <span className="font-mono text-red-300 tabular-nums">
                  - ₹{totalSellingCosts.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#F2C14E] block">
                    {t('mkt_est_net_return', 'Estimated Net Return', 'மதிப்பிடப்பட்ட நிகர வருவாய்')}
                  </span>
                  <span className="text-[11px] text-white/60">{t('mkt_take_home', 'Take-home earnings', 'கைக்கு வரும் தொகை')}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    ₹{Math.max(0, estimatedNetReturn).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-white/70 block font-mono">
                    ≈ ₹{Math.max(0, Math.round(netReturnPerQtl)).toLocaleString('en-IN')} / {t('mktplace_qtl', 'quintal', 'குவிண்டால்')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Decision-Support Panel (Col-span 6) */}
          <div className="lg:col-span-6 bg-[#F7F6EF] rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F2C14E]/20 text-[#143D2B] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#1B5E20]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider block">
                  {t('mkt_decision_paths_eyebrow', 'Intelligent Decision Paths', 'புத்திசாலித்தனமான முடிவெடுக்கும் பாதைகள்')}
                </span>
                <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                  {t('mkt_ai_decision_panel', 'AI Decision-Support Panel', 'AI முடிவெடுக்கும் வழிகாட்டல்')}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#69786E] mb-6 leading-relaxed">
              {t('mkt_eval_offer_prefix', 'Evaluating your current offer for', 'இதற்கான தற்போதைய சலுகை மதிப்பீடு:')} <strong className="text-[#17251D]">{t(`crop_name_${selectedCrop.id}`, selectedCrop.name, selectedCrop.tamilName || selectedCrop.name)}</strong> {t('mkt_eval_offer_suffix', 'against mandi trends and holding costs:', 'மண்டி போக்குகள் மற்றும் சேமிப்பு செலவுகளுடன்:')}
            </p>

            {/* Three Decision Paths */}
            <div className="space-y-4">
              {/* Path 1: Sell at current offer */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1B5E20]" />
                    <h4 className="text-sm font-bold text-[#17251D]">
                      {t('mkt_path_a_title', `Path A: Accept ${activeOffer.buyerName} Offer`, `பாதை A: ${activeOffer.buyerName} சலுகையை ஏற்கவும்`)}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#1B5E20] bg-[#DDF3E4] px-2.5 py-0.5 rounded-md">
                    {t('mkt_recommended', 'Recommended', 'பரிந்துரைக்கப்படுகிறது')}
                  </span>
                </div>
                <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                  <strong className="text-[#17251D]">{t('mkt_evidence', 'Evidence:', 'சான்று:')}</strong> {t('mkt_path_a_evidence', `Offer price of ₹${activeOffer.pricePerQuintal}/qtl is ₹${activeOffer.pricePerQuintal - selectedCrop.referencePrice} above current mandi spot. ${activeOffer.pickupProvided ? 'Zero transport costs at farmgate.' : 'Standard local hauling applies.'}`, `₹${activeOffer.pricePerQuintal}/குவி என்ற விலை தற்போதைய மண்டி விலையை விட ₹${activeOffer.pricePerQuintal - selectedCrop.referencePrice} அதிகமாகும். ${activeOffer.pickupProvided ? 'களத்திலேயே இலவச போக்குவரத்து.' : 'வழக்கமான உள்ளூர் வண்டி செலவு உண்டு.'}`)}
                </p>
                <div className="text-[11px] text-[#69786E] flex items-center gap-2 border-t border-gray-100 pt-2">
                  <span>{t('mkt_risk_low', 'Downside Risk: Low', 'இழப்பு ஆபத்து: குறைவு')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t('mkt_payment_terms_label', 'Payment terms:', 'கட்டண விதிமுறைகள்:')} {activeOffer.paymentTerms}</span>
                </div>
              </div>

              {/* Path 2: Monitor market */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F2C14E]" />
                    <h4 className="text-sm font-bold text-[#17251D]">
                      {t('mkt_path_b_title', 'Path B: Hold & Monitor Market (14–21 Days)', 'பாதை B: சந்தையை கவனித்து இருப்பு வைக்கவும் (14–21 நாட்கள்)')}
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-[#765341] bg-[#F2C14E]/20 px-2.5 py-0.5 rounded-md">
                    {t('mkt_eval_storage', 'Evaluate Storage', 'சேமிப்பை மதிப்பிடுக')}
                  </span>
                </div>
                <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                  <strong className="text-[#17251D]">{t('mkt_evidence', 'Evidence:', 'சான்று:')}</strong> {t('mkt_path_b_evidence', `Regional arrivals are stabilizing. Holding costs will add ~₹${storageCostPerQtl * 2}/qtl over 30 days. Requires minimum +4% price rally to offset bag storage and moisture loss.`, `மண்டிகளில் வரத்து சீராகிறது. 30 நாட்களில் சேமிப்பு செலவு சுமார் ₹${storageCostPerQtl * 2}/குவி அதிகரிக்கும். எடை இழப்பு மற்றும் பைகளின் செலவை ஈடுகட்ட குறைந்தபட்சம் +4% விலை உயர்வு தேவை.`)}
                </p>
                <div className="text-[11px] text-[#69786E] flex items-center gap-2 border-t border-gray-100 pt-2">
                  <span>{t('mkt_risk_med', 'Downside Risk: Moderate (pest/spoilage & arrival influx)', 'இழப்பு ஆபத்து: மிதமானது (பூச்சி/அழுகல் மற்றும் வரத்து அதிகரிப்பு)')}</span>
                </div>
              </div>

              {/* Path 3: Compare another market */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h4 className="text-sm font-bold text-[#17251D]">
                      {t('mkt_path_c_title', 'Path C: Explore Neighboring APMC Hub', 'பாதை C: அண்டை APMC சந்தையை ஆராய்க')}
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {t('mkt_distance_arb', 'Distance Arbitrage', 'தொலைவு விலை வேறுபாடு')}
                  </span>
                </div>
                <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                  <strong className="text-[#17251D]">{t('mkt_evidence', 'Evidence:', 'சான்று:')}</strong> {t('mkt_path_c_evidence', 'Secondary wholesale yards (e.g. Guntur/Vijayawada) show +₹50–80 premium, but additional long-haul transit of ₹120/qtl diminishes the net margin.', 'அண்டை மொத்த விற்பனை மண்டிகள் ₹50–80 கூடுதல் விலை தருகின்றன, ஆனால் ₹120/குவி கூடுதல் வண்டி வாடகை நிகர லாபத்தைக் குறைக்கிறது.')}
                </p>
                <div className="text-[11px] text-[#69786E] flex items-center gap-2 border-t border-gray-100 pt-2">
                  <span>{t('mkt_risk_high', 'Downside Risk: High logistics friction & offloading queues', 'இழப்பு ஆபத்து: அதிக போக்குவரத்து சிரமம் மற்றும் காத்திருப்பு வரிசை')}</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-5 p-3 rounded-xl bg-gray-100/80 border border-gray-200 text-[11px] text-[#69786E] leading-relaxed">
              <strong className="text-[#17251D]">{t('mkt_honest_policy_label', 'Honest Intelligence Policy:', 'வெளிப்படையான வழிகாட்டல் கொள்கை:')}</strong> {t('mkt_honest_policy_desc', 'Historical price patterns and cost models are decision-support guidance. FARMERS AI does not guarantee future price movements.', 'வரலாற்று விலை முறைகள் மற்றும் செலவு மாதிரிகள் முடிவெடுக்கும் வழிகாட்டல்களே. எதிர்கால விலை உயர்வுகளுக்கு விவசாயிகள் AI உத்தரவாதம் அளிக்காது.')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
