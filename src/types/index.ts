export type CropId = 'paddy' | 'tomato' | 'onion' | 'maize' | 'groundnut';

export interface Crop {
  id: CropId;
  name: string;
  hindiName: string;
  variety: string;
  season: string;
  standardUnit: 'quintal';
  referencePrice: number;
  priceUnit: string;
  dayChangePercent: number;
  mspGovernment: number; // Minimum Support Price benchmark
  isDemo: boolean;
}

export interface MarketPricePoint {
  date: string;
  price: number;
  volumeQuintals: number;
}

export interface MarketLocation {
  id: string;
  name: string;
  state: string;
  district: string;
}

export interface BuyerOffer {
  id: string;
  buyerName: string;
  businessType: 'Flour Mill & Processor' | 'Agri Export House' | 'Wholesale Trader' | 'Retail Supermarket Chain' | 'Organic Food Producer';
  cropId: CropId;
  location: string;
  distanceKm: number;
  pricePerQuintal: number;
  minQuantityQuintals: number;
  maxQuantityQuintals: number;
  pickupProvided: boolean;
  paymentTerms: 'Immediate UPI/NEFT' | '24hr Bank Transfer' | '50% Advance on Pickup' | 'Within 48 hours';
  qualityGradeRequired: 'Grade A (FAQ)' | 'Grade Super' | 'Standard Commercial';
  isVerified: boolean;
  expiresInDays: number;
  isDemo: boolean;
}

export interface DealerListing {
  id: string;
  businessName: string;
  category: 'Fertilizers & Nutrition' | 'Seeds & Nurseries' | 'Micro-Irrigation' | 'Soil Testing & Crop Health' | 'Farm Implements';
  region: string;
  address: string;
  distanceKm: number;
  supportedCrops: CropId[];
  keyProducts: string[];
  contactPhone: string;
  businessHours: string;
  isVerified: boolean;
  isSponsored: boolean;
  rating: number;
  isDemo: boolean;
}

export interface PracticeCriterion {
  id: string;
  title: string;
  category: 'Soil & Nutrition' | 'Water Stewardship' | 'Plant Protection' | 'Traceability';
  description: string;
  maxPoints: number;
  earnedPoints: number;
  completed: boolean;
  evidenceRequirement: string;
  verificationMethod: 'Self-Reported Photo' | 'Digital Soil Lab API' | 'Satellite NDVI Check' | 'Field Inspector Visit';
  status: 'verified' | 'pending_review' | 'not_submitted';
}

export interface RegionalDemandItem {
  category: string;
  item: string;
  urgency: 'High Anticipated Need' | 'Moderate Demand' | 'Seasonal Peak Approaching';
  growthTrend: string;
  insight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
