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

interface MarketDashboardProps {
  onContactBuyer: (offer: BuyerOffer) => void;
}

export const MarketDashboard: React.FC<MarketDashboardProps> = ({ onContactBuyer }) => {
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
            <span>AI Market Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Operational Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            Better Decisions Begin With Better Market Insights.
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            Compare market trends, evaluate local buyer offers, understand selling costs, and explore potential selling windows before making your next move.
          </p>
        </div>

        {/* Global Selectors Bar */}
        <div className="bg-[#F7F6EF] p-4 sm:p-5 rounded-2xl border border-gray-200/80 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Crop Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="crop-select" className="text-xs font-semibold text-[#143D2B] uppercase tracking-wider">
                Select Crop:
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
                    {crop.name} ({crop.hindiName})
                  </option>
                ))}
              </select>
            </div>

            {/* Market Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="market-select" className="text-xs font-semibold text-[#143D2B] uppercase tracking-wider">
                Benchmark Mandi:
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
            <span>Demonstration records · Not a live market quote</span>
          </div>
        </div>

        {/* Top Split: Price Trend SVG Chart + Reference Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main SVG Historical Price Chart (Col-span 8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-1">
                  Historical APMC Price Trend
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17251D] font-serif">
                  {selectedCrop.name} · {selectedMarket.name}
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
                    {tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '90 Days'}
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
                  Point Date: <span className="font-mono text-[#143D2B]">{activeDataPoint.date}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Observation: <span className="font-bold font-mono text-[#143D2B] text-sm tabular-nums">₹{activeDataPoint.price.toLocaleString('en-IN')}</span> / qtl
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Arrivals: <span className="font-mono text-[#17251D]">{activeDataPoint.volumeQuintals} qtl</span>
                </span>
              </div>

              <div className="text-[11px] text-[#69786E]">
                Hover or tap points to inspect historical quotations
              </div>
            </div>
          </div>

          {/* Reference Price & Mandi Intelligence Card (Col-span 4) */}
          <div className="lg:col-span-4 bg-[#F7F6EF] rounded-3xl p-6 sm:p-8 border border-gray-200/90 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-2">
                Live Benchmark Overview
              </div>
              <h3 className="text-xl font-bold text-[#17251D] font-serif mb-4">
                {selectedCrop.name}
              </h3>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs mb-6">
                <span className="text-xs text-[#69786E] block mb-1">Current Reference Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-[#143D2B] tabular-nums">
                    ₹{selectedCrop.referencePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#69786E]">/ quintal</span>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-gray-100">
                  <span className="text-[#69786E]">7-Day Movement:</span>
                  <span className={`font-semibold font-mono flex items-center gap-0.5 ${
                    selectedCrop.dayChangePercent >= 0 ? 'text-[#087F5B]' : 'text-red-700'
                  }`}>
                    {selectedCrop.dayChangePercent >= 0 ? '▲ +' : '▼ '}
                    {Math.abs(selectedCrop.dayChangePercent)}%
                  </span>
                </div>

                {selectedCrop.mspGovernment > 0 && (
                  <div className="mt-2 flex items-center justify-between text-xs text-[#69786E]">
                    <span>Govt MSP Benchmark:</span>
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
                    <strong className="text-[#17251D]">Variety:</strong> {selectedCrop.variety}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#17251D]">Season:</strong> {selectedCrop.season}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#17251D]">Standard Unit:</strong> 1 Quintal (100 kg)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 mt-6">
              <span className="text-[11px] text-[#69786E] block leading-relaxed">
                Prices shown reflect average weighted APMC arrivals for fair average quality (FAQ). Perishable vegetables like tomato do not possess a statutory MSP.
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Buyer Offer Comparison */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-1">
                Local Commercial Demand
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                Verified Buyer Offers for {selectedCrop.name}
              </h3>
            </div>
            <span className="text-xs text-[#69786E]">
              {cropOffers.length} Active quotation{cropOffers.length === 1 ? '' : 's'} in region
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
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#69786E] mb-4 flex items-center gap-1.5">
                      <span>{offer.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{offer.distanceKm} km away</span>
                    </div>

                    {/* Price and Quantity */}
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 mb-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs text-[#69786E]">Offered Price:</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold font-mono text-[#143D2B] tabular-nums">
                            ₹{offer.pricePerQuintal.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-[#69786E]">/ qtl</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#69786E] pt-2 border-t border-gray-100">
                        <span>Min Requirement:</span>
                        <span className="font-mono font-medium text-[#17251D]">
                          {offer.minQuantityQuintals} quintals
                        </span>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-1.5 text-xs text-[#69786E] mb-6">
                      <div className="flex items-center justify-between">
                        <span>Logistics:</span>
                        <span className="font-medium text-[#17251D]">
                          {offer.pickupProvided ? 'Farmgate Pickup Included' : 'Farmer Delivery Required'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Payment Terms:</span>
                        <span className="font-medium text-[#17251D]">{offer.paymentTerms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Grade Requirement:</span>
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
                      {isSelected ? 'Selected in Calculator' : 'Compare in Calculator'}
                    </button>
                    <button
                      onClick={() => onContactBuyer(offer)}
                      className="p-2 text-[#1B5E20] hover:text-[#143D2B] hover:bg-[#DDF3E4] rounded-lg transition-colors cursor-pointer"
                      title="Enquire with buyer"
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
                  Commercial Transparency
                </span>
                <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                  Selling-Cost & Net Return Calculator
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#69786E] mb-6 leading-relaxed">
              Evaluating an offer must account for transport, bagging, storage, and APMC cess. Enter your estimated volume to see the real net return.
            </p>

            {/* Inputs Grid */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="quantity-input" className="text-xs font-semibold text-[#17251D]">
                    Harvest Quantity to Sell (Quintals)
                  </label>
                  <span className="text-xs font-mono font-bold text-[#143D2B]">{quantityQuintals} qtl</span>
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
                    Transport (₹/qtl)
                  </label>
                  <input
                    type="number"
                    value={activeOffer.pickupProvided ? 0 : transportCostPerQtl}
                    disabled={activeOffer.pickupProvided}
                    onChange={(e) => setTransportCostPerQtl(Number(e.target.value) || 0)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-[#17251D] disabled:opacity-50"
                  />
                  {activeOffer.pickupProvided && (
                    <span className="text-[10px] text-[#087F5B] mt-0.5 block">Pickup covered by buyer</span>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#69786E] block mb-1">
                    Storage/Bags (₹/qtl)
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
                    Handling/Cess (₹/qtl)
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
                <span>Active Selected Offer:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">{activeOffer.buyerName}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <span>Gross Sale Value ({quantityQuintals} qtl × ₹{buyerPrice}):</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  ₹{grossSaleValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <span>Deductions (Transport + Storage + Fees):</span>
                <span className="font-mono text-red-300 tabular-nums">
                  - ₹{totalSellingCosts.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#F2C14E] block">
                    Estimated Net Return
                  </span>
                  <span className="text-[11px] text-white/60">Take-home earnings</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    ₹{Math.max(0, estimatedNetReturn).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-white/70 block font-mono">
                    ≈ ₹{Math.max(0, Math.round(netReturnPerQtl)).toLocaleString('en-IN')} / quintal
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
                  Intelligent Decision Paths
                </span>
                <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                  AI Decision-Support Panel
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#69786E] mb-6 leading-relaxed">
              Evaluating your current offer for <strong className="text-[#17251D]">{selectedCrop.name}</strong> against mandi trends and holding costs:
            </p>

            {/* Three Decision Paths */}
            <div className="space-y-4">
              {/* Path 1: Sell at current offer */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1B5E20]" />
                    <h4 className="text-sm font-bold text-[#17251D]">
                      Path A: Accept {activeOffer.buyerName} Offer
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-[#1B5E20] bg-[#DDF3E4] px-2.5 py-0.5 rounded-md">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                  <strong className="text-[#17251D]">Evidence:</strong> Offer price of ₹{activeOffer.pricePerQuintal}/qtl is ₹{activeOffer.pricePerQuintal - selectedCrop.referencePrice} above current mandi spot. {activeOffer.pickupProvided ? 'Zero transport costs at farmgate.' : 'Standard local hauling applies.'}
                </p>
                <div className="text-[11px] text-[#69786E] flex items-center gap-2 border-t border-gray-100 pt-2">
                  <span>Downside Risk: Low</span>
                  <span aria-hidden="true">·</span>
                  <span>Payment terms: {activeOffer.paymentTerms}</span>
                </div>
              </div>

              {/* Path 2: Monitor market */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F2C14E]" />
                    <h4 className="text-sm font-bold text-[#17251D]">
                      Path B: Hold & Monitor Market (14–21 Days)
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-[#765341] bg-[#F2C14E]/20 px-2.5 py-0.5 rounded-md">
                    Evaluate Storage
                  </span>
                </div>
                <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                  <strong className="text-[#17251D]">Evidence:</strong> Regional arrivals are stabilizing. Holding costs will add ~₹{storageCostPerQtl * 2}/qtl over 30 days. Requires minimum +4% price rally to offset bag storage and moisture loss.
                </p>
                <div className="text-[11px] text-[#69786E] flex items-center gap-2 border-t border-gray-100 pt-2">
                  <span>Downside Risk: Moderate (pest/spoilage & arrival influx)</span>
                </div>
              </div>

              {/* Path 3: Compare another market */}
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h4 className="text-sm font-bold text-[#17251D]">
                      Path C: Explore Neighboring APMC Hub
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    Distance Arbitrage
                  </span>
                </div>
                <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                  <strong className="text-[#17251D]">Evidence:</strong> Secondary wholesale yards (e.g. Guntur/Vijayawada) show +₹50–80 premium, but additional long-haul transit of ₹120/qtl diminishes the net margin.
                </p>
                <div className="text-[11px] text-[#69786E] flex items-center gap-2 border-t border-gray-100 pt-2">
                  <span>Downside Risk: High logistics friction & offloading queues</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-5 p-3 rounded-xl bg-gray-100/80 border border-gray-200 text-[11px] text-[#69786E] leading-relaxed">
              <strong className="text-[#17251D]">Honest Intelligence Policy:</strong> Historical price patterns and cost models are decision-support guidance. FARMERS AI does not guarantee future price movements.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
