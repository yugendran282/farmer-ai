import { GoogleGenAI } from '@google/genai';
import { isGeminiConfigured } from './diseaseDetectionService';

export interface QAResponse {
  answer: string;
  source: 'Gemini AI Agricultural Advisory' | 'Offline Agricultural Knowledge Base (ICAR/TNAU)';
  disclaimer: string;
}

const geminiApiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || '';

const KNOWLEDGE_BASE: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['pest', 'caterpillar', 'stem borer', 'insect', 'bugs'],
    answer: 'For stem borer control in paddy/maize: Apply Neem Seed Kernel Extract (NSKE 5%) or installation of pheromone traps (5 traps/acre). For chemical control, Cartap Hydrochloride 4G @ 7.5 kg/acre can be applied with strict safety equipment.',
  },
  {
    keywords: ['fertilizer', 'urea', 'npk', 'dap', 'dosage'],
    answer: 'Base fertilizer dose for Paddy per acre: 50 kg DAP + 25 kg MOP at planting. Apply 25 kg Urea at 21 days (tillering stage) and 25 kg Urea at panicle initiation stage. Always conduct a soil test before heavy application.',
  },
  {
    keywords: ['water', 'irrigation', 'drip', 'watering'],
    answer: 'Drip irrigation saves up to 45% water compared to flood irrigation. Water early morning (5 AM - 8 AM) or late evening to minimize evaporation losses. For vegetables, maintain 70% field capacity during flowering and fruit setting.',
  },
  {
    keywords: ['tomato', 'blight', 'leaf curl', 'wilt'],
    answer: 'Tomato leaf curl is transmitted by whiteflies. Use yellow sticky traps (10/acre) and spray Neem oil (3ml/L). For early blight, spray Mancozeb 75% WP @ 2g/litre of water.',
  },
  {
    keywords: ['organic', 'vermicompost', 'panchagavya', 'natural'],
    answer: 'Panchagavya preparation: Mix 5kg fresh cow dung, 3L cow urine, 2L milk, 2L curd, 500g ghee, 3L tender coconut water, 3L sugarcane juice. Ferment for 18 days. Dilute 300ml in 10L water for foliar spray.',
  },
];

export const farmingAssistantService = {
  async askQuestion(question: string, language: 'en' | 'ta' = 'en'): Promise<QAResponse> {
    const disclaimer = 'Disclaimer: Always verify chemical spray dosages with your local Agricultural Extension Officer or Krishi Vigyan Kendra (KVK).';

    if (isGeminiConfigured) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        const sysPrompt = `You are FARMERS AI, an agricultural expert assisting Indian farmers. Answer the following question accurately, concisely, and practically. Language: ${language === 'ta' ? 'Tamil' : 'English'}. Keep tone respectful and encouraging.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${sysPrompt}\n\nFarmer Question: ${question}` }],
            },
          ],
        });

        return {
          answer: response.text || 'No response generated from AI advisor.',
          source: 'Gemini AI Agricultural Advisory',
          disclaimer,
        };
      } catch (err) {
        console.error('Error calling Gemini AI for assistant Q&A:', err);
      }
    }

    // Fallback search in knowledge base
    const lowerQ = question.toLowerCase();
    const match = KNOWLEDGE_BASE.find(item => item.keywords.some(kw => lowerQ.includes(kw)));

    if (match) {
      return {
        answer: match.answer,
        source: 'Offline Agricultural Knowledge Base (ICAR/TNAU)',
        disclaimer,
      };
    }

    return {
      answer: language === 'ta'
        ? 'உங்கள் கேள்விக்கான பொதுவான பதில்: பயிர் பராமரிப்பு மற்றும் உர மேலாண்மைக்கு உங்கள் உள்ளூர் வேளாண் உதவி இயக்குநரைத் தொடர்பு கொள்ளவும்.'
        : 'For general crop care, irrigation schedules, and pest management: Ensure balanced N-P-K fertilization, regular field weeding, and soil moisture monitoring. For specialized local advice, contact your nearest Krishi Vigyan Kendra (KVK).',
      source: 'Offline Agricultural Knowledge Base (ICAR/TNAU)',
      disclaimer,
    };
  },
};
