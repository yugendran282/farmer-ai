import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Building, User, Sprout, MapPin, Award } from 'lucide-react';
import { BuyerOffer, DealerListing, PracticeCriterion, CropId } from '../types';
import { CROPS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

// --- Buyer Inquiry Modal ---
interface BuyerInquiryModalProps {
  offer: BuyerOffer | null;
  onClose: () => void;
}

export const BuyerInquiryModal: React.FC<BuyerInquiryModalProps> = ({ offer, onClose }) => {
  const { t } = useLanguage();
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
              {t('modal_inquiry_sent', 'Inquiry Sent to Buyer', 'விசாரணை வாங்குபவருக்கு அனுப்பப்பட்டது')}
            </h3>
            <p className="text-sm text-[#69786E] mb-6 leading-relaxed">
              {t('modal_inquiry_desc', `Your harvest specification (${offeredQuantity} quintals of ${crop.name}) has been shared with`, `உங்கள் அறுவடை விவரங்கள் (${offeredQuantity} குவிண்டால் ${t(`crop_name_${crop.id}`, crop.name, crop.tamilName || crop.name)}) வாங்குபவருடன் பகிரப்பட்டது: `)} <strong className="text-[#17251D]">{offer.buyerName}</strong>. {t('modal_inquiry_followup', 'The procurement manager will contact you at', 'கொள்முதல் அலுவலர் உங்களை தொடர்புகொள்வார்:')} <strong className="text-[#17251D]">{farmerPhone}</strong> {t('modal_inquiry_within', 'within 24 hours.', '24 மணி நேரத்திற்குள்.')}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#143D2B] text-white text-xs font-bold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
            >
              {t('modal_done', 'Done', 'முடிந்தது')}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2">
              <span>{t('modal_direct_comm_contact', 'Direct Commercial Contact', 'நேரடி வணிகத் தொடர்பு')}</span>
            </div>
            <h3 className="text-xl font-bold text-[#17251D] font-serif mb-1">
              {t('modal_connect_with', `Connect with ${offer.buyerName}`, `${offer.buyerName} உடன் இணையவும்`)}
            </h3>
            <p className="text-xs text-[#69786E] mb-4">
              {t('mkt_offered_price', 'Offered Price:', 'வழங்கப்படும் விலை:')} <strong className="text-[#143D2B]">₹{offer.pricePerQuintal}/qtl</strong> · {offer.paymentTerms}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#17251D] block mb-1">
                  {t('modal_full_name', 'Your Full Name', 'உங்கள் முழுப் பெயர்')}
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
                    {t('modal_mobile_whatsapp', 'Mobile Number (WhatsApp)', 'அலைபேசி எண் (வாட்ஸ்அப்)')}
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
                    {t('modal_est_quantity', 'Estimated Quantity (Quintals)', 'மதிப்பிடப்பட்ட அளவு (குவிண்டால்)')}
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
                  {t('modal_farm_location', 'Farm Village & District', 'கிராமம் & மாவட்டம்')}
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
                {t('modal_inquiry_disclaimer', 'By submitting, your harvest volume will be transmitted directly to the buyer’s procurement desk. No intermediaries or brokerage fees apply.', 'சமர்ப்பிப்பதன் மூலம், உங்கள் அறுவடை அளவு நேரடியாக வாங்குபவருக்கு தெரிவிக்கப்படும். இடைத்தரகர்கள் அல்லது தரகு கட்டணம் எதுவும் இல்லை.')}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  {t('modal_send_inquiry_btn', 'Send Inquiry to Buyer', 'வாங்குபவருக்கு அனுப்புக')}
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
  const { t } = useLanguage();
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
              {t('modal_partner_received', 'Partnership Inquiry Received', 'கூட்டாண்மை கோரிக்கை பெறப்பட்டது')}
            </h3>
            <p className="text-sm text-[#69786E] mb-6 leading-relaxed">
              {t('modal_partner_thanks', 'Thank you', 'நன்றி')}, <strong className="text-[#17251D]">{contactPerson}</strong>. {t('modal_partner_desk', 'Our AgriConnect regional partnership desk will review', 'எங்கள் அக்ரிகனெக்ட் மண்டல பிரிவு பரிசீலிக்கும்:')} <strong className="text-[#17251D]">{businessName}</strong> {t('modal_partner_for_tier', 'for the', 'பிரிவு:')} <strong className="text-[#1B5E20]">{tier}</strong> {t('modal_partner_tier_contact', 'tier and contact you at', 'மற்றும் உங்களை தொடர்புகொள்வார்கள்:')} <strong className="text-[#17251D]">{phone}</strong> {t('modal_partner_shortly', 'shortly.', 'விரைவில்.')}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#17251D] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t('modal_edit_details', 'Edit Details', 'விவரங்களை திருத்த')}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#143D2B] text-white text-xs font-bold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
              >
                {t('modal_close', 'Close', 'மூடு')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 pr-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20]">
                {t('modal_partner_program', 'AgriConnect Partner Program', 'அக்ரிகனெக்ட் கூட்டாளர் திட்டம்')}
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-[#1B5E20] bg-[#DDF3E4] hover:bg-[#c9ebd3] px-2.5 py-0.5 rounded-md transition-colors cursor-pointer"
                title="Auto-fill sample data"
              >
                {t('modal_auto_fill', 'Auto-Fill Sample', 'மாதிரி விவரங்களை நிரப்ப')}
              </button>
            </div>
            <h3 className="text-2xl font-bold text-[#17251D] font-serif mb-1">
              {t('modal_partner_heading', 'Partner With AGNIVA', 'அக்னிவா உடன் கூட்டாளராக இணையுங்கள்')}
            </h3>

            <div className="flex items-center gap-2 mb-5 text-xs text-[#69786E]">
              <span>{t('modal_selected_tier', 'Selected Tier:', 'தேர்ந்தெடுக்கப்பட்ட அடுக்கு:')}</span>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="font-bold text-[#143D2B] bg-[#F7F6EF] border border-gray-300 rounded-md px-2 py-0.5 text-xs focus:outline-none cursor-pointer"
              >
                <option value="Regional Growth">{t('dealer_tier_growth_title', 'Regional Growth', 'மண்டல வளர்ச்சி')}</option>
                <option value="Local Dealer Starter">{t('dealer_tier_starter_title', 'Local Dealer Starter', 'உள்ளூர் டீலர் தொடக்கம்')}</option>
                <option value="Agricultural Brand Partner">{t('dealer_tier_enterprise_title', 'Agricultural Brand Partner', 'விவசாய பிராண்ட் பார்ட்னர்')}</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#17251D] block mb-1">
                  {t('modal_business_name', 'Business / Brand Name', 'வணிகம் / பிராண்ட் பெயர்')}
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
                    {t('modal_contact_person', 'Contact Person', 'தொடர்பு நபர்')}
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
                    {t('modal_phone_mobile', 'Phone / Mobile', 'அலைபேசி எண்')}
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
                    {t('modal_target_district', 'Target District / Region', 'இலக்கு மாவட்டம் / பகுதி')}
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
                    {t('modal_business_category', 'Business Category', 'வணிகப் பிரிவு')}
                  </label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none cursor-pointer"
                  >
                    <option value="Fertilizers & Nutrition">{t('agri_cat_fertilizers', 'Fertilizers & Nutrition', 'உரங்கள் & ஊட்டச்சத்து')}</option>
                    <option value="Seeds & Nurseries">{t('agri_cat_seeds', 'Seeds & Nurseries', 'விதைகள் & நாற்றங்கால்')}</option>
                    <option value="Micro-Irrigation">{t('agri_cat_irrigation', 'Micro-Irrigation Systems', 'நுண் பாசன அமைப்புகள்')}</option>
                    <option value="Soil Testing Lab">{t('agri_cat_lab', 'Soil Testing Lab', 'மண் பரிசோதனைக்கூடம்')}</option>
                    <option value="Farm Machinery">{t('agri_cat_machinery', 'Farm Machinery / Implements', 'விவசாய இயந்திரங்கள்')}</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#F7F6EF] rounded-xl text-[11px] text-[#69786E] leading-relaxed border border-gray-200">
                <strong className="text-[#17251D]">{t('modal_trust_policy_label', 'Trust Policy Agreement:', 'நம்பிக்கைக் கொள்கை உடன்படிக்கை:')}</strong> {t('modal_trust_policy_desc', 'By applying, you acknowledge that sponsored promotions are transparently labelled and never compromise unbiased farmer crop guidance.', 'விண்ணப்பிப்பதன் மூலம், விளம்பரங்கள் வெளிப்படையாகக் குறிக்கப்படும் மற்றும் பக்கச்சார்பற்ற விவசாய ஆலோசனைகளை ஒருபோதும் பாதிக்காது என்பதை ஒப்புக்கொள்கிறீர்கள்.')}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  {t('modal_submit_partnership', 'Submit Partnership Request', 'கூட்டாண்மை கோரிக்கையை சமர்ப்பிக்கவும்')}
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
  const { t } = useLanguage();
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
              {t('modal_farm_registered_success', 'Farm Registered Successfully!', 'பண்ணை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!')}
            </h3>
            <p className="text-sm text-[#69786E] mb-6 leading-relaxed">
              {t('modal_farm_registered_desc', `Your farm profile for ${acres} acres of ${CROPS[crop].name} in ${district} is active. Your initial practice profile starts at 60/100 points, qualifying for regional alert broadcasts.`, `${district} மாவட்டத்தில் ${acres} ஏக்கர் ${t(`crop_name_${crop}`, CROPS[crop].name, CROPS[crop].tamilName || CROPS[crop].name)} நிலப்பரப்புக்கான பண்ணை சுயவிவரம் செயலில் உள்ளது. ஆரம்ப நற்பயிற்சி மதிப்பீடு 60/100 புள்ளிகளில் தொடங்குகிறது.`)}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#143D2B] text-white text-xs font-bold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
            >
              {t('modal_go_dashboard', 'Go to Dashboard', 'டாஷ்போர்டிற்குச் செல்க')}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider">
                {t('modal_onboard_step', `Farmer Onboarding Demo · Step ${step} of 2`, `விவசாயி சேர்க்கை டெமோ · படி ${step} / 2`)}
              </span>
              <div className="flex gap-1.5">
                <span className={`w-6 h-1.5 rounded-full ${step >= 1 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
                <span className={`w-6 h-1.5 rounded-full ${step >= 2 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#17251D] font-serif mb-1">
              {step === 1 ? t('modal_register_crop_land', 'Register Your Crop & Land', 'பயிர் & நில விவரங்களை பதிவு செய்யவும்') : t('modal_loc_harvest_window', 'Location & Harvest Window', 'இடம் & அறுவடை காலம்')}
            </h3>
            <p className="text-xs text-[#69786E] mb-6">
              {t('modal_onboard_sub', 'Connect your farm to receive automated APMC pricing and local verified buyers.', 'தானியங்கி APMC விலைகள் மற்றும் சரிபார்க்கப்பட்ட வாங்குபவர்களைப் பெற உங்கள் பண்ணையை இணைக்கவும்.')}
            </p>

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    {t('modal_primary_crop', 'Primary Crop', 'முதன்மைப் பயிர்')}
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value as CropId)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none cursor-pointer"
                  >
                    {Object.values(CROPS).map((c) => (
                      <option key={c.id} value={c.id}>
                        {t(`crop_name_${c.id}`, c.name, c.tamilName || c.name)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    {t('modal_land_area', 'Land Area Under Cultivation (Acres)', 'சாகுபடி நிலப்பரப்பு (ஏக்கர்)')}
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
                    <span>{t('modal_next_location', 'Next: Location Details', 'அடுத்து: இருப்பிட விவரங்கள்')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#17251D] block mb-1">
                    {t('modal_agri_district', 'Agricultural District', 'விவசாய மாவட்டம்')}
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
                    {t('modal_expected_harvest_month', 'Expected Harvest Month', 'எதிர்பார்க்கப்படும் அறுவடை மாதம்')}
                  </label>
                  <select
                    value={harvestMonth}
                    onChange={(e) => setHarvestMonth(e.target.value)}
                    className="w-full bg-[#F7F6EF] border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#17251D] focus:outline-none cursor-pointer"
                  >
                    <option value="October">{t('month_october', 'October (Current)', 'அக்டோபர் (தற்போது)')}</option>
                    <option value="November">{t('month_november', 'November', 'நவம்பர்')}</option>
                    <option value="December">{t('month_december', 'December', 'டிசம்பர்')}</option>
                    <option value="January">{t('month_january', 'January', 'ஜனவரி')}</option>
                    <option value="February">{t('month_february', 'February', 'பிப்ரவரி')}</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-[#17251D] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    {t('modal_back', 'Back', 'பின்னே')}
                  </button>
                  <button
                    onClick={() => setCompleted(true)}
                    className="flex-1 py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    {t('modal_complete_setup', 'Complete Farm Setup', 'அமைப்பை முடிக்கவும்')}
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
  const { t } = useLanguage();
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
          <span>{t('modal_stewardship_scoring', 'Stewardship Scoring Criteria', 'விவசாய நற்பயிற்சி மதிப்பீட்டு அளவுகோல்')}</span>
        </div>
        <h3 className="text-xl font-bold text-[#17251D] font-serif mb-2">
          {practice.title}
        </h3>
        <p className="text-xs text-[#69786E] mb-6 leading-relaxed">
          {practice.description}
        </p>

        <div className="space-y-3 bg-[#F7F6EF] p-4 rounded-2xl border border-gray-200 text-xs mb-6">
          <div className="flex justify-between">
            <span className="text-[#69786E]">{t('modal_category', 'Category:', 'பிரிவு:')}</span>
            <span className="font-semibold text-[#17251D]">{practice.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#69786E]">{t('modal_max_points', 'Max Points:', 'அதிகபட்ச புள்ளிகள்:')}</span>
            <span className="font-mono font-bold text-[#143D2B]">+{practice.maxPoints} {t('modal_pts', 'pts', 'புள்ளிகள்')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#69786E]">{t('modal_verification_method', 'Verification Method:', 'சரிபார்ப்பு முறை:')}</span>
            <span className="font-medium text-[#17251D]">{practice.verificationMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#69786E]">{t('modal_evidence_req', 'Evidence Required:', 'தேவைப்படும் சான்று:')}</span>
            <span className="font-medium text-[#17251D] text-right max-w-[200px]">
              {practice.evidenceRequirement}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#143D2B] text-white text-xs font-semibold rounded-xl hover:bg-[#1B5E20] transition-colors cursor-pointer"
        >
          {t('modal_close_preview', 'Close Preview', 'மூடுக')}
        </button>
      </div>
    </div>
  );
};
