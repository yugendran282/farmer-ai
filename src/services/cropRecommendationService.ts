import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface RecommendationInput {
  nitrogenN?: number; // kg/ha or ppm
  phosphorusP?: number;
  potassiumK?: number;
  phLevel?: number;
  soilType: 'clay' | 'loamy' | 'sandy' | 'black' | 'red' | 'alluvial';
  location: string;
  season: 'kharif' | 'rabi' | 'zaid' | 'perennial';
  irrigationAvailable: 'rainfed' | 'drip' | 'canal' | 'well';
}

export interface RecommendedCropResult {
  cropId: string;
  cropName: string;
  hindiName: string;
  matchScore: number; // 0 to 100
  explanation: string;
  growingConditions: string;
  soilConsiderations: string;
  waterConsiderations: string;
  expectedYield: string;
  marketOutlook: string;
}

export interface RecommendationOutput {
  inputsUsed: {
    nitrogenN: number;
    phosphorusP: number;
    potassiumK: number;
    phLevel: number;
    isEstimatedSoil: boolean;
  };
  recommendations: RecommendedCropResult[];
  modelType: 'Rule-Based Agricultural Expert System (ICAR & TNAU Guidelines)';
}

const CROP_DATABASE: Array<{
  id: string;
  name: string;
  hindiName: string;
  preferredSoilTypes: string[];
  preferredSeasons: string[];
  preferredIrrigation: string[];
  minPh: number;
  maxPh: number;
  minN: number;
  maxN: number;
  minP: number;
  maxP: number;
  minK: number;
  maxK: number;
  growingConditions: string;
  soilConsiderations: string;
  waterConsiderations: string;
  expectedYield: string;
  marketOutlook: string;
}> = [
  {
    id: 'paddy',
    name: 'Paddy (Rice)',
    hindiName: 'धान',
    preferredSoilTypes: ['clay', 'alluvial', 'loamy', 'black'],
    preferredSeasons: ['kharif', 'rabi'],
    preferredIrrigation: ['canal', 'well', 'rainfed'],
    minPh: 5.5,
    maxPh: 7.5,
    minN: 80,
    maxN: 150,
    minP: 30,
    maxP: 60,
    minK: 40,
    maxK: 80,
    growingConditions: 'Requires temperature between 20°C - 35°C and standing water during early growth.',
    soilConsiderations: 'Heavy clay or alluvial soils with high water retention capacity are ideal.',
    waterConsiderations: 'High water requirement (1200 - 1400 mm). Regular flooding or canal irrigation recommended.',
    expectedYield: '22 - 28 quintals per acre',
    marketOutlook: 'High steady demand supported by Government MSP (₹2300/qtl).',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    hindiName: 'टमाटर',
    preferredSoilTypes: ['loamy', 'red', 'black', 'alluvial'],
    preferredSeasons: ['rabi', 'kharif', 'perennial'],
    preferredIrrigation: ['drip', 'well'],
    minPh: 6.0,
    maxPh: 7.0,
    minN: 100,
    maxN: 180,
    minP: 50,
    maxP: 90,
    minK: 60,
    maxK: 120,
    growingConditions: 'Warm climate (21°C - 28°C) with good sunlight exposure and frost protection.',
    soilConsiderations: 'Well-drained sandy loam or red loam rich in organic matter.',
    waterConsiderations: 'Moderate water requirement (400 - 600 mm). Drip irrigation with fertigation gives maximum yield.',
    expectedYield: '150 - 220 quintals per acre (hybrid)',
    marketOutlook: 'High profitability with price spikes during peak seasons.',
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    hindiName: 'मक्का',
    preferredSoilTypes: ['loamy', 'alluvial', 'black', 'red'],
    preferredSeasons: ['kharif', 'rabi', 'zaid'],
    preferredIrrigation: ['well', 'canal', 'rainfed'],
    minPh: 5.8,
    maxPh: 7.8,
    minN: 90,
    maxN: 140,
    minP: 40,
    maxP: 70,
    minK: 40,
    maxK: 75,
    growingConditions: 'Thrives in temperatures of 18°C - 32°C. Sensitive to waterlogging.',
    soilConsiderations: 'Deep, fertile, well-drained loamy soil high in organic carbon.',
    waterConsiderations: 'Moderate water requirement (500 - 650 mm). 4-5 critical irrigations needed.',
    expectedYield: '25 - 35 quintals per acre',
    marketOutlook: 'Strong demand from poultry feed industry and ethanol manufacturing.',
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    hindiName: 'मूंगफली',
    preferredSoilTypes: ['sandy', 'red', 'loamy'],
    preferredSeasons: ['kharif', 'rabi'],
    preferredIrrigation: ['well', 'rainfed', 'drip'],
    minPh: 6.0,
    maxPh: 7.5,
    minN: 20,
    maxN: 45, // Nitrogen fixing legume
    minP: 40,
    maxP: 80,
    minK: 30,
    maxK: 60,
    growingConditions: 'Requires light friable soil for peg development and pod expansion.',
    soilConsiderations: 'Sandy loam or well-drained red soils with loose texture.',
    waterConsiderations: 'Low to moderate water requirement (450 - 550 mm). Gypsum application recommended at pegging.',
    expectedYield: '10 - 16 quintals per acre',
    marketOutlook: 'Excellent price stability with Government MSP (₹6780/qtl).',
  },
  {
    id: 'cotton',
    name: 'Cotton (Bt Hybrid)',
    hindiName: 'கபாஸ் / कपास',
    preferredSoilTypes: ['black', 'alluvial', 'red'],
    preferredSeasons: ['kharif', 'perennial'],
    preferredIrrigation: ['canal', 'well', 'rainfed'],
    minPh: 6.5,
    maxPh: 8.2,
    minN: 90,
    maxN: 160,
    minP: 40,
    maxP: 75,
    minK: 40,
    maxK: 80,
    growingConditions: 'Long frost-free period (21°C - 35°C) with bright sunshine during boll maturation.',
    soilConsiderations: 'Deep black cotton soil (Vertisols) or fertile alluvial loam with high CEC.',
    waterConsiderations: 'Moderate to high water requirement (700 - 900 mm). Avoid water stagnation.',
    expectedYield: '12 - 18 quintals per acre',
    marketOutlook: 'High commercial export demand for textile manufacturing.',
  },
  {
    id: 'onion',
    name: 'Onion',
    hindiName: 'प्याज',
    preferredSoilTypes: ['loamy', 'alluvial', 'black'],
    preferredSeasons: ['rabi', 'kharif'],
    preferredIrrigation: ['drip', 'well'],
    minPh: 6.0,
    maxPh: 7.2,
    minN: 80,
    maxN: 130,
    minP: 50,
    maxP: 85,
    minK: 50,
    maxK: 100,
    growingConditions: 'Cool initial climate followed by warm dry weather for bulb formation and curing.',
    soilConsiderations: 'Friable sandy loam soil with good drainage and neutral pH.',
    waterConsiderations: 'Frequent light irrigations (350 - 500 mm total). Stop watering 15 days before harvest.',
    expectedYield: '100 - 140 quintals per acre',
    marketOutlook: 'Essential food staple with strong domestic market return.',
  },
];

export const cropRecommendationService = {
  /**
   * Recommend crops based on soil parameters and local field conditions
   */
  recommendCrops(input: RecommendationInput): RecommendationOutput {
    // Fill in default estimated values if soil lab parameters are missing
    let isEstimated = false;
    const n = input.nitrogenN ?? (() => { isEstimated = true; return 110; })();
    const p = input.phosphorusP ?? (() => { isEstimated = true; return 45; })();
    const k = input.potassiumK ?? (() => { isEstimated = true; return 55; })();
    const ph = input.phLevel ?? (() => { isEstimated = true; return 6.8; })();

    const results: RecommendedCropResult[] = CROP_DATABASE.map((crop) => {
      let score = 50; // Base score

      // Soil Type Match (25 points)
      if (crop.preferredSoilTypes.includes(input.soilType)) {
        score += 25;
      } else {
        score += 5;
      }

      // Season Match (20 points)
      if (crop.preferredSeasons.includes(input.season)) {
        score += 20;
      } else {
        score += 5;
      }

      // Irrigation Match (15 points)
      if (crop.preferredIrrigation.includes(input.irrigationAvailable)) {
        score += 15;
      } else {
        score += 5;
      }

      // pH Match (15 points)
      if (ph >= crop.minPh && ph <= crop.maxPh) {
        score += 15;
      } else if (Math.abs(ph - ((crop.minPh + crop.maxPh) / 2)) <= 1.2) {
        score += 8;
      }

      // N-P-K Fit (25 points)
      let npkScore = 0;
      if (n >= crop.minN && n <= crop.maxN) npkScore += 9;
      if (p >= crop.minP && p <= crop.maxP) npkScore += 8;
      if (k >= crop.minK && k <= crop.maxK) npkScore += 8;
      score += npkScore;

      // Cap match score between 45% and 98%
      const matchScore = Math.min(98, Math.max(45, Math.round(score)));

      const explanation = `Matched ${matchScore}% with your ${input.soilType} soil, ${input.season} season, and ${input.irrigationAvailable} irrigation setup.`;

      return {
        cropId: crop.id,
        cropName: crop.name,
        hindiName: crop.hindiName,
        matchScore,
        explanation,
        growingConditions: crop.growingConditions,
        soilConsiderations: crop.soilConsiderations,
        waterConsiderations: crop.waterConsiderations,
        expectedYield: crop.expectedYield,
        marketOutlook: crop.marketOutlook,
      };
    });

    // Sort by match score descending
    results.sort((a, b) => b.matchScore - a.matchScore);

    return {
      inputsUsed: {
        nitrogenN: n,
        phosphorusP: p,
        potassiumK: k,
        phLevel: ph,
        isEstimatedSoil: isEstimated,
      },
      recommendations: results,
      modelType: 'Rule-Based Agricultural Expert System (ICAR & TNAU Guidelines)',
    };
  },

  /**
   * Save recommendation to Supabase
   */
  async saveRecommendation(input: RecommendationInput, output: RecommendationOutput, farmerId?: string) {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase.from('crop_recommendations').insert([
        {
          farmer_id: farmerId || null,
          nitrogen_n: input.nitrogenN,
          phosphorus_p: input.phosphorusP,
          potassium_k: input.potassiumK,
          ph_level: input.phLevel,
          soil_type: input.soilType,
          location: input.location,
          season: input.season,
          irrigation_available: input.irrigationAvailable,
          recommended_crops: output.recommendations.map(r => ({
            name: r.cropName,
            score: r.matchScore,
            explanation: r.explanation,
          })),
        },
      ]);
    } catch (err) {
      console.error('Failed to save recommendation to Supabase:', err);
    }
  },
};
