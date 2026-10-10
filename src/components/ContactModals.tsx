import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Building, User, Sprout, MapPin, Award } from 'lucide-react';
import { BuyerOffer, DealerListing, PracticeCriterion, CropId } from '../types';
import { CROPS } from '../data/mockData';

// --- Buyer Inquiry Modal ---
interface BuyerInquiryModalProps {
  offer: BuyerOffer | null;
  onClose: () => void;
}

export const BuyerInquiryModal: React.FC<BuyerInquiryModalProps> = ({ offer, onClose }) => {
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [offeredQuantity, setOfferedQuantity] = useState('50');
  const [villageLocation, setVillageLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!offer) return null;

  const crop = CROPS[offer.cropId];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#17251D] mb-2">
              Inquiry Sent to Buyer
            </h3>
            <p className="text-sm text-[#69786E] mb-6 leading-relaxed">
              Your harvest specification ({offeredQuantity} quintals of {crop.name}) has been shared with <strong className="text-[#17251D]">{offer.buyerName}</strong>. The procurement manager will contact you at <strong className="text-[#17251D]">{farmerPhone}</strong> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#143D2B] text-white text-xs font-bold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2">
              <span>Direct Commercial Contact</span>
            </div>
            <h3 className="text-xl font-bold text-[#17251D] font-serif mb-1">
              Connect with {offer.buyerName}
            </h3>
            <p className="text-xs text-[#69786E] mb-4">
              Offered Price: <strong className="text-[#143D2B]">₹{offer.pricePerQuintal}/qtl</strong> · {offer.paymentTerms}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#17251D] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Mobile Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Estimated Quantity (Quintals)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={offeredQuantity}
                    onChange={(e) => setOfferedQuantity(e.target.value)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#17251D] block mb-1">
                  Farm Village & District
                </label>
                <input
                  type="text"
                  required
                  value={villageLocation}
                  onChange={(e) => setVillageLocation(e.target.value)}
                  placeholder="e.g. Ulindakonda Village, Kurnool"
                  className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                />
              </div>

              <div className="p-3 bg-[#F7F6EF] rounded-xl text-[11px] text-[#69786E] leading-relaxed">
                By submitting, your harvest volume will be transmitted directly to the buyer’s procurement desk. No intermediaries or brokerage fees apply.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Send Inquiry to Buyer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Dealer Campaign Partner Modal ---
interface DealerCampaignModalProps {
  selectedTier: string;
  onClose: () => void;
}

export const DealerCampaignModal: React.FC<DealerCampaignModalProps> = ({ selectedTier: initialTier, onClose }) => {
  const [tier, setTier] = useState(initialTier || 'Regional Growth');
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Fertilizers & Nutrition');
  const [submitted, setSubmitted] = useState(false);

  const handleFillDemo = () => {
    setBusinessName('Kisan Seva Fertilizer Depot');
    setContactPerson('Ravi Verma (Managing Partner)');
    setPhone('+91 94400 00000');
    setDistrict('Kurnool & Nandyal');
    setBusinessCategory('Fertilizers & Nutrition');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#17251D] mb-2">
              Partnership Inquiry Received
            </h3>
            <p className="text-sm text-[#69786E] mb-6 leading-relaxed">
              Thank you, <strong className="text-[#17251D]">{contactPerson}</strong>. Our AgriConnect regional partnership desk will review <strong className="text-[#17251D]">{businessName}</strong> for the <strong className="text-[#1B5E20]">{tier}</strong> tier and contact you at <strong className="text-[#17251D]">{phone}</strong> shortly.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#17251D] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Edit Details
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#143D2B] text-white text-xs font-bold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 pr-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20]">
                AgriConnect Partner Program
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-[#1B5E20] bg-[#DDF3E4] hover:bg-[#c9ebd3] px-2.5 py-0.5 rounded-md transition-colors cursor-pointer"
                title="Auto-fill sample data"
              >
                Auto-Fill Sample
              </button>
            </div>
            <h3 className="text-2xl font-bold text-[#17251D] font-serif mb-1">
              Partner With FARMERS AI
            </h3>

            <div className="flex items-center gap-2 mb-5 text-xs text-[#69786E]">
              <span>Selected Tier:</span>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="font-bold text-[#143D2B] bg-[#F7F6EF] border border-gray-300 rounded-md px-2 py-0.5 text-xs focus:outline-none cursor-pointer"
              >
                <option value="Regional Growth">Regional Growth</option>
                <option value="Local Dealer Starter">Local Dealer Starter</option>
                <option value="Agricultural Brand Partner">Agricultural Brand Partner</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#17251D] block mb-1">
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Kisan Seva Fertilizer Depot"
                  className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Name & Designation"
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94400 00000"
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Target District / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Kurnool & Nandyal"
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Business Category
                  </label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none cursor-pointer"
                  >
                    <option value="Fertilizers & Nutrition">Fertilizers & Nutrition</option>
                    <option value="Seeds & Nurseries">Seeds & Nurseries</option>
                    <option value="Micro-Irrigation">Micro-Irrigation Systems</option>
                    <option value="Soil Testing Lab">Soil Testing Lab</option>
                    <option value="Farm Machinery">Farm Machinery / Implements</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#F7F6EF] rounded-xl text-[11px] text-[#69786E] leading-relaxed border border-gray-200">
                <strong className="text-[#17251D]">Trust Policy Agreement:</strong> By applying, you acknowledge that sponsored promotions are transparently labelled and never compromise unbiased farmer crop guidance.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Submit Partnership Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Farmer Onboarding Demo Modal ---
interface FarmerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerOnboardingModal: React.FC<FarmerOnboardingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState<CropId>('paddy');
  const [acres, setAcres] = useState('5');
  const [district, setDistrict] = useState('Kurnool');
  const [harvestMonth, setHarvestMonth] = useState('November');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {completed ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF3E4] text-[#1B5E20] flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#17251D] mb-2">
              Farm Registered Successfully!
            </h3>
            <p className="text-sm text-[#69786E] mb-6 leading-relaxed">
              Your farm profile for {acres} acres of {CROPS[crop].name} in {district} is active. Your initial practice profile starts at 60/100 points, qualifying for regional alert broadcasts.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#143D2B] text-white text-xs font-bold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider">
                Farmer Onboarding Demo · Step {step} of 2
              </span>
              <div className="flex gap-1.5">
                <span className={`w-6 h-1.5 rounded-full ${step >= 1 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
                <span className={`w-6 h-1.5 rounded-full ${step >= 2 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#17251D] font-serif mb-1">
              {step === 1 ? 'Register Your Crop & Land' : 'Location & Harvest Window'}
            </h3>
            <p className="text-xs text-[#69786E] mb-6">
              Connect your farm to receive automated APMC pricing and local verified buyers.
            </p>

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Primary Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value as CropId)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none cursor-pointer"
                  >
                    {Object.values(CROPS).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.hindiName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Land Area Under Cultivation (Acres)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next: Location Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Agricultural District
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Kurnool, AP"
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    Expected Harvest Month
                  </label>
                  <select
                    value={harvestMonth}
                    onChange={(e) => setHarvestMonth(e.target.value)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none cursor-pointer"
                  >
                    <option value="October">October (Current)</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-[#17251D] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCompleted(true)}
                    className="flex-1 py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Complete Farm Setup
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Evidence Preview Modal ---
interface EvidencePreviewModalProps {
  practice: PracticeCriterion | null;
  onClose: () => void;
}

export const EvidencePreviewModal: React.FC<EvidencePreviewModalProps> = ({ practice, onClose }) => {
  if (!practice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2">
          <span>Stewardship Scoring Criteria</span>
        </div>
        <h3 className="text-xl font-bold text-[#17251D] font-serif mb-2">
          {practice.title}
        </h3>
        <p className="text-xs text-[#69786E] mb-6 leading-relaxed">
          {practice.description}
        </p>

        <div className="space-y-3 bg-[#F7F6EF] p-4 rounded-2xl border border-gray-200 text-xs mb-6">
          <div className="flex justify-between">
            <span className="text-[#69786E]">Category:</span>
            <span className="font-semibold text-[#17251D]">{practice.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#69786E]">Max Points:</span>
            <span className="font-mono font-bold text-[#143D2B]">+{practice.maxPoints} pts</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#69786E]">Verification Method:</span>
            <span className="font-medium text-[#17251D]">{practice.verificationMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#69786E]">Evidence Required:</span>
            <span className="font-medium text-[#17251D] text-right max-w-[200px]">
              {practice.evidenceRequirement}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#143D2B] text-white text-xs font-semibold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};
