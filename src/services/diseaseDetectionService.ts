import { GoogleGenAI } from '@google/genai';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface DiseaseScanResult {
  diseaseName: string;
  confidencePercent: number;
  symptoms: string;
  organicTreatment: string;
  chemicalTreatment: string;
  preventiveMeasures: string;
  isAiGenerated: boolean;
  setupRequiredMsg?: string;
}

const geminiApiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || '';

export const isGeminiConfigured = Boolean(
  geminiApiKey && 
  geminiApiKey !== 'MY_GEMINI_API_KEY' && 
  geminiApiKey.trim().length > 10
);

export const diseaseDetectionService = {
  /**
   * Validate image file size and type
   */
  validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file format. Please upload JPEG, PNG, or WebP image.' };
    }
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBytes) {
      return { valid: false, error: 'File size exceeds 5MB limit. Please upload a smaller image.' };
    }
    return { valid: true };
  },

  /**
   * Analyze plant leaf image using Gemini Vision API or return setup message
   */
  async analyzePlantImage(file: File, farmerId?: string): Promise<DiseaseScanResult> {
    const validation = this.validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid file');
    }

    if (!isGeminiConfigured) {
      return {
        diseaseName: 'Gemini AI API Key Setup Required',
        confidencePercent: 0,
        symptoms: 'AI Disease Diagnostic Model is not yet configured with a valid API key.',
        organicTreatment: 'N/A',
        chemicalTreatment: 'N/A',
        preventiveMeasures: 'N/A',
        isAiGenerated: false,
        setupRequiredMsg: 'To enable live AI plant disease scanning, please add your GEMINI_API_KEY in the project .env file (GEMINI_API_KEY="your_api_key").',
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const base64Data = await this.fileToBase64(file);

      const prompt = `You are an expert plant pathologist and agricultural consultant. Analyze this plant leaf/crop image for disease symptoms.
      Respond STRICTLY in valid JSON format with the following structure:
      {
        "diseaseName": "Name of the plant disease (or Healthy Crop if no disease)",
        "confidencePercent": 92,
        "symptoms": "Description of leaf symptoms visible",
        "organicTreatment": "Bio-pesticide or organic remedies",
        "chemicalTreatment": "Recommended chemical treatments with dosage warning",
        "preventiveMeasures": "Preventive practices for next season"
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: file.type,
                  data: base64Data,
                },
              },
            ],
          },
        ],
      });

      const responseText = response.text || '';
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      const result: DiseaseScanResult = {
        diseaseName: parsed.diseaseName || 'Unidentified Leaf Condition',
        confidencePercent: Number(parsed.confidencePercent) || 85,
        symptoms: parsed.symptoms || 'Visible leaf discoloration.',
        organicTreatment: parsed.organicTreatment || 'Apply Neem oil spray (5ml/L water).',
        chemicalTreatment: parsed.chemicalTreatment || 'Consult local Agricultural Extension Officer.',
        preventiveMeasures: parsed.preventiveMeasures || 'Maintain field hygiene and proper spacing.',
        isAiGenerated: true,
      };

      // Store in Supabase scan records if configured
      if (isSupabaseConfigured && supabase) {
        await supabase.from('disease_scan_records').insert([
          {
            farmer_id: farmerId || null,
            crop_name: 'Scanned Crop',
            predicted_disease: result.diseaseName,
            confidence_percent: result.confidencePercent,
            symptoms: result.symptoms,
            organic_treatment: result.organicTreatment,
            chemical_treatment: result.chemicalTreatment,
            preventive_measures: result.preventiveMeasures,
          },
        ]);
      }

      return result;
    } catch (err) {
      console.error('Gemini vision API error:', err);
      throw new Error('Failed to analyze image with Gemini AI. Please check network connection and API key.');
    }
  },

  /**
   * Helper to convert File to base64
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
    });
  },
};
