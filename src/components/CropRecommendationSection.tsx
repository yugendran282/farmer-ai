import React, { useState } from 'react';
import { Sprout, CheckCircle2, ChevronRight, Info, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { cropRecommendationService, RecommendationInput, RecommendationOutput } from '../services/cropRecommendationService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const CropRecommendationSection: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState<RecommendationInput>({
    nitrogenN: undefined,
    phosphorusP: undefined,
    potassiumK: undefined,
    phLevel: undefined,
    soilType: 'loamy',
    location: 'Coimbatore, Tamil Nadu',
    season: 'rabi',
    irrigationAvailable: 'well',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationOutput | null>(null);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedStatus(null);

    try {
      const output = cropRecommendationService.recommendCrops(formData);
      setResult(output);

      if (user) {
        await cropRecommendationService.saveRecommendation(formData, output, user.id);
        setSavedStatus('Recommendation saved to your Farmer Profile!');
      }
    } catch (err) {
      console.error('Error generating recommendation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="crop-recommendation" className="py-16 bg-[#F7F6EF] border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143D2B]/10 text-[#143D2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sprout className="w-4 h-4 text-[#1B5E20]" />
            <span>AI Agricultural Soil Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17251D] tracking-tight">
            {t('crop_rec_title', 'AI Soil & Crop Recommendation Engine')}
          </h2>
          <p className="mt-3 text-base text-[#17251D]/70">
            {t('crop_rec_subtitle', 'Enter your soil N-P-K parameters, pH, and local field conditions for data-backed crop suggestions.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#143D2B]/15 shadow-sm">
            <form onSubmit={handleSubmit} className="space-[#17251D] space-y-5">
              <h3 className="text-lg font-bold text-[#143D2B] flex items-center gap-2 border-b border-gray-100 pb-3">
                <Sparkles className="w-5 h-5 text-[#F2C14E]" />
                Field & Soil Parameters
              </h3>

              {/* N-P-K optional inputs grid */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Soil Nutrients (N - P - K in kg/ha)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="block text-[11px] font-semibold text-gray-500 mb-1">Nitrogen (N)</span>
                    <input
                      type="number"
                      placeholder="e.g. 120"
                      value={formData.nitrogenN ?? ''}
                      onChange={(e) => setFormData({ ...formData, nitrogenN: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-gray-500 mb-1">Phosphorus (P)</span>
                    <input
                      type="number"
                      placeholder="e.g. 45"
                      value={formData.phosphorusP ?? ''}
                      onChange={(e) => setFormData({ ...formData, phosphorusP: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-gray-500 mb-1">Potassium (K)</span>
                    <input
                      type="number"
                      placeholder="e.g. 60"
                      value={formData.potassiumK ?? ''}
                      onChange={(e) => setFormData({ ...formData, potassiumK: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  * If N-P-K values are unknown, regional soil estimates will be automatically applied.
                </p>
              </div>

              {/* pH Level */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Soil pH Level (0 - 14)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="3"
                  max="10"
                  placeholder="e.g. 6.5 (Neutral)"
                  value={formData.phLevel ?? ''}
                  onChange={(e) => setFormData({ ...formData, phLevel: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
                />
              </div>

              {/* Soil Type Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Soil Texture / Type
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none bg-white"
                >
                  <option value="loamy">Loamy Soil (கண்டல் மண்)</option>
                  <option value="clay">Clay Soil (களிமண்)</option>
                  <option value="sandy">Sandy Soil (மணல் மண்)</option>
                  <option value="black">Black Cotton Soil (கரிசல் மண்)</option>
                  <option value="red">Red Soil (செம்மண்)</option>
                  <option value="alluvial">Alluvial Soil (வண்டல் மண்)</option>
                </select>
              </div>

              {/* Season & Irrigation Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Season
                  </label>
                  <select
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none bg-white"
                  >
                    <option value="rabi">Rabi (Nov - Mar)</option>
                    <option value="kharif">Kharif (Jun - Oct)</option>
                    <option value="zaid">Zaid (Mar - Jun)</option>
                    <option value="perennial">Perennial / All Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Irrigation System
                  </label>
                  <select
                    value={formData.irrigationAvailable}
                    onChange={(e) => setFormData({ ...formData, irrigationAvailable: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none bg-white"
                  >
                    <option value="well">Borewell / Open Well</option>
                    <option value="drip">Drip / Micro Sprinkler</option>
                    <option value="canal">Canal / River Supply</option>
                    <option value="rainfed">Rainfed / Monsoon Only</option>
                  </select>
                </div>
              </div>

              {/* District / Location */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  District / Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Soil Suitability...</span>
                  </>
                ) : (
                  <>
                    <Sprout className="w-4 h-4" />
                    <span>Generate Crop Recommendations</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output / Recommendations Display */}
          <div className="lg:col-span-7 space-y-4">
            {savedStatus && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{savedStatus}</span>
              </div>
            )}

            {!result && (
              <div className="bg-white p-8 rounded-2xl border border-[#143D2B]/10 text-center flex flex-col items-center justify-center min-h-[380px]">
                <div className="w-16 h-16 rounded-full bg-[#143D2B]/5 flex items-center justify-center mb-4 text-[#143D2B]">
                  <Sprout className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#17251D]">Ready to Analyze Your Field</h4>
                <p className="text-sm text-gray-500 max-w-md mt-1">
                  Fill in your soil parameters on the left to receive AI-backed crop suggestions tailored for your regional soil type and season.
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Model Info Strip */}
                <div className="bg-[#143D2B]/5 p-4 rounded-xl border border-[#143D2B]/15 flex items-center justify-between text-xs text-[#143D2B] font-medium">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#143D2B]" />
                    <span>Model: {result.modelType}</span>
                  </div>
                  {result.inputsUsed.isEstimatedSoil && (
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      <AlertTriangle className="w-3 h-3" /> Estimated N-P-K Applied
                    </span>
                  )}
                </div>

                {/* Crop Recommendation Cards */}
                {result.recommendations.map((crop, idx) => (
                  <div
                    key={crop.cropId}
                    className={`bg-white p-5 rounded-2xl border transition-all ${
                      idx === 0
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-[#17251D]">
                            {crop.cropName} <span className="text-sm font-normal text-gray-500">({crop.hindiName})</span>
                          </h4>
                          {idx === 0 && (
                            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                              Top Match
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{crop.explanation}</p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-black text-[#143D2B]">
                          {crop.matchScore}%
                        </div>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Suitability</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-gray-50 p-2.5 rounded-lg">
                        <span className="font-bold text-gray-700 block mb-0.5">🌱 Soil & Water Requirements:</span>
                        <p className="text-gray-600">{crop.soilConsiderations}</p>
                        <p className="text-gray-600 mt-1">{crop.waterConsiderations}</p>
                      </div>
                      <div className="bg-gray-50 p-2.5 rounded-lg">
                        <span className="font-bold text-gray-700 block mb-0.5">📈 Yield & Market:</span>
                        <p className="text-gray-600">Expected: {crop.expectedYield}</p>
                        <p className="text-gray-600 mt-1">{crop.marketOutlook}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
