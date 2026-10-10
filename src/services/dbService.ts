import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CROPS, BUYER_OFFERS, DEALER_LISTINGS } from '../data/mockData';
import { Crop, BuyerOffer, DealerListing } from '../types';

export interface FarmerInquiryInput {
  fullName: string;
  phoneNumber: string;
  district: string;
  state: string;
  landAcreage?: number;
  primaryCrops?: string[];
  inquiryType: string;
  details?: Record<string, any>;
}

export const dbService = {
  /**
   * Fetch all crops from Supabase DB or mock data fallback
   */
  async getCrops(): Promise<Record<string, Crop>> {
    if (!isSupabaseConfigured || !supabase) {
      return CROPS;
    }

    try {
      const { data, error } = await supabase.from('crops').select('*');
      if (error || !data || data.length === 0) {
        console.warn('Supabase query fallback to mock crops:', error);
        return CROPS;
      }

      const cropsMap: Record<string, Crop> = {};
      data.forEach((item: any) => {
        cropsMap[item.id] = {
          id: item.id,
          name: item.name,
          hindiName: item.hindi_name,
          variety: item.variety,
          season: item.season,
          standardUnit: item.standard_unit || 'quintal',
          referencePrice: Number(item.reference_price),
          priceUnit: item.price_unit || '₹ / quintal',
          dayChangePercent: Number(item.day_change_percent),
          mspGovernment: Number(item.msp_government),
          isDemo: false,
        };
      });

      return cropsMap;
    } catch (err) {
      console.error('Error fetching crops from Supabase:', err);
      return CROPS;
    }
  },

  /**
   * Fetch buyer offers from Supabase DB or mock data fallback
   */
  async getBuyerOffers(): Promise<BuyerOffer[]> {
    if (!isSupabaseConfigured || !supabase) {
      return BUYER_OFFERS;
    }

    try {
      const { data, error } = await supabase.from('buyer_offers').select('*');
      if (error || !data || data.length === 0) {
        return BUYER_OFFERS;
      }

      return data.map((item: any) => ({
        id: item.id,
        buyerName: item.buyer_name,
        companyName: item.company_name,
        location: item.location,
        cropId: item.crop_id,
        targetVolumeQuintals: Number(item.target_volume_quintals),
        offeredPricePerUnit: Number(item.offered_price_per_unit),
        qualityGrade: item.quality_grade,
        paymentTerms: item.payment_terms,
        verifiedBuyer: item.verified_buyer,
        deliveryWindow: item.delivery_window,
        badges: item.badges || [],
      }));
    } catch (err) {
      console.error('Error fetching buyer offers from Supabase:', err);
      return BUYER_OFFERS;
    }
  },

  /**
   * Submit a farmer inquiry / onboarding payload to Supabase DB
   */
  async submitFarmerInquiry(inquiry: FarmerInquiryInput): Promise<{ success: boolean; id?: string }> {
    console.log('Submitting inquiry:', inquiry);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('farmer_inquiries')
          .insert([
            {
              full_name: inquiry.fullName,
              phone_number: inquiry.phoneNumber,
              district: inquiry.district,
              state: inquiry.state,
              land_acreage: inquiry.landAcreage,
              primary_crops: inquiry.primaryCrops,
              inquiry_type: inquiry.inquiryType,
              details: inquiry.details,
            },
          ])
          .select();

        if (error) {
          console.error('Supabase error inserting inquiry:', error);
          return { success: false };
        }

        return { success: true, id: data?.[0]?.id };
      } catch (err) {
        console.error('Failed to insert inquiry to Supabase:', err);
        return { success: false };
      }
    }

    // Fallback success for local offline/mock mode
    return { success: true, id: 'demo-' + Date.now() };
  },
};
