import React, { useState, useMemo } from 'react';
import {
  Store,
  Filter,
  Search,
  ShieldCheck,
  Truck,
  ArrowRight,
  PlusCircle,
  MapPin,
  Calendar,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { BuyerOffer, CropId } from '../types';
import { BUYER_OFFERS, CROPS } from '../data/mockData';

interface BuyerMarketplaceProps {
  onContactBuyer: (offer: BuyerOffer) => void;
  onPostHarvestListing: () => void;
}

export const BuyerMarketplaceSection: React.FC<BuyerMarketplaceProps> = ({
  onContactBuyer,
  onPostHarvestListing,
}) => {
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price_desc' | 'distance_asc' | 'expiry_asc'>('price_desc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOffers = useMemo(() => {
    let result = BUYER_OFFERS.filter((offer) => {
      const matchesCrop =
        selectedCropFilter === 'all' || offer.cropId === selectedCropFilter;
      const matchesSearch =
        searchQuery === '' ||
        offer.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.businessType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCrop && matchesSearch;
    });

    return result.sort((a, b) => {
      if (sortBy === 'price_desc') return b.pricePerQuintal - a.pricePerQuintal;
      if (sortBy === 'distance_asc') return a.distanceKm - b.distanceKm;
      if (sortBy === 'expiry_asc') return a.expiresInDays - b.expiresInDays;
      return 0;
    });
  }, [selectedCropFilter, sortBy, searchQuery]);

  return (
    <section id="marketplace" className="py-20 lg:py-28 bg-[#F7F6EF] border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
              <span>Direct Commercial Access</span>
              <span aria-hidden="true">·</span>
              <span>Local Buyer Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
              Your Harvest. More Opportunities.
            </h2>
            <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
              Discover verified wholesale buyers, compare quotations, and make informed selling decisions with transparent commercial terms.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onPostHarvestListing}
              className="px-5 py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#F2C14E]" />
              <span>Post Harvest Listing</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Crop Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCropFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCropFilter === 'all'
                  ? 'bg-[#143D2B] text-white'
                  : 'bg-[#F7F6EF] text-[#69786E] hover:text-[#17251D]'
              }`}
            >
              All Crops
            </button>
            {Object.values(CROPS).map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCropFilter(crop.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCropFilter === crop.id
                    ? 'bg-[#143D2B] text-white'
                    : 'bg-[#F7F6EF] text-[#69786E] hover:text-[#17251D]'
                }`}
              >
                {crop.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search buyer..."
                className="w-full bg-[#F7F6EF] border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#17251D] focus:outline-none focus:ring-1 focus:ring-[#1B5E20]"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#69786E] font-medium whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F6EF] border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#17251D] focus:outline-none cursor-pointer"
              >
                <option value="price_desc">Highest Offered Price</option>
                <option value="distance_asc">Nearest Distance</option>
                <option value="expiry_asc">Expiring Soonest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredOffers.map((offer) => {
            const crop = CROPS[offer.cropId];
            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 hover:border-gray-300 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-[#1B5E20] uppercase tracking-wider block">
                      {crop.name} · {offer.qualityGradeRequired}
                    </span>
                    {offer.isVerified && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1B5E20]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#17251D] mb-1 leading-snug">
                    {offer.buyerName}
                  </h3>

                  <div className="text-xs text-[#69786E] mb-4 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#69786E]" />
                    <span>{offer.location} ({offer.distanceKm} km away)</span>
                  </div>

                  {/* Price Banner */}
                  <div className="bg-[#F7F6EF] p-3.5 rounded-xl border border-gray-200/70 mb-4">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs text-[#69786E]">Procurement Offer:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-mono text-[#143D2B] tabular-nums">
                          ₹{offer.pricePerQuintal.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#69786E]">/ quintal</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#69786E] pt-2 border-t border-gray-200">
                      <span>Volume Required:</span>
                      <span className="font-mono font-medium text-[#17251D]">
                        {offer.minQuantityQuintals}–{offer.maxQuantityQuintals} qtl
                      </span>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-1.5 text-xs text-[#69786E] mb-6">
                    <div className="flex items-center justify-between">
                      <span>Transport:</span>
                      <span className="font-medium text-[#17251D]">
                        {offer.pickupProvided ? 'Buyer arranges farmgate pickup' : 'Farmer self-delivers'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Settlement:</span>
                      <span className="font-medium text-[#17251D]">{offer.paymentTerms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Quotation Valid:</span>
                      <span className="font-mono text-[#1B5E20] font-medium">
                        Next {offer.expiresInDays} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#69786E]">APMC Licensed Buyer</span>
                  <button
                    onClick={() => onContactBuyer(offer)}
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Contact Buyer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Disclosure Banner */}
        <div className="text-center text-xs text-[#69786E] max-w-2xl mx-auto">
          All quotations displayed above represent sample procurement tenders in prototype demonstration mode. FARMERS AI does not intermediate financial settlements without explicit user agreements.
        </div>
      </div>
    </section>
  );
};
