import React, { useState } from 'react';
import { UploadCloud, AlertCircle, CheckCircle2, ShieldAlert, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { diseaseDetectionService, DiseaseScanResult, isGeminiConfigured } from '../services/diseaseDetectionService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const PlantDiseaseDetectionSection: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<DiseaseScanResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setScanResult(null);

    const validation = diseaseDetectionService.validateImage(file);
    if (!validation.valid) {
      setErrorMsg(validation.error || t('invalid_img_err', 'Invalid image file.', 'தவறான பட வடிவம்.'));
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    setErrorMsg(null);

    try {
      const result = await diseaseDetectionService.analyzePlantImage(selectedFile, user?.id);
      setScanResult(result);
    } catch (err: any) {
      setErrorMsg(err.message || t('process_img_err', 'Error processing plant leaf image.', 'பயிரின் இலையை செயலாக்குவதில் பிழை.'));
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="disease-scanner" className="py-16 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#143D2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#1B5E20]" />
            <span>{t('vision_pathologist_badge', 'AI Vision Pathologist', 'செயற்கை நுண்ணறிவு நோய் பரிசோதகர்')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17251D] tracking-tight">
            {t('disease_title', 'Plant Disease Diagnostic Scanner', 'பயிர் நோய் கண்டறியும் ஸ்கேனர்')}
          </h2>
          <p className="mt-3 text-base text-[#17251D]/70">
            {t(
              'disease_subtitle',
              'Upload a photo of your affected leaf or crop for instant disease identification and treatment options.',
              'பாதிக்கப்பட்ட இலையின் புகைப்படத்தைப் பதிவேற்றி நோயையும் அதற்கான தீர்வையும் அறியவும்.'
            )}
          </p>
        </div>

        {/* Notice Banner if Gemini API key is missing */}
        {!isGeminiConfigured && (
          <div className="mb-8 max-w-4xl mx-auto p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <strong className="font-bold block text-sm mb-0.5">
                {t('ai_model_config_notice', 'AI Disease Model Configuration Notice', 'செயற்கை நுண்ணறிவு மாதிரி இணைப்பு அறிவிப்பு')}
              </strong>
              {t(
                'ai_model_notice_body',
                'Live AI vision analysis requires a Gemini API key. To activate live leaf scanning, add GEMINI_API_KEY in your .env file.',
                'நேரலை நோய் கண்டறிதலுக்கு Gemini API சாவி தேவை. நேரலை ஸ்கேனிங்கைச் செயல்படுத்த .env கோப்பில் சாவி சேர்க்கவும்.'
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* File Upload Box */}
          <div className="lg:col-span-5 bg-[#F7F6EF] p-6 sm:p-8 rounded-2xl border border-[#143D2B]/15 text-center">
            <div className="border-2 border-dashed border-[#143D2B]/30 hover:border-[#143D2B] transition-all rounded-xl p-6 bg-white flex flex-col items-center justify-center cursor-pointer relative group">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 border border-gray-200">
                  <img src={previewUrl} alt="Selected crop leaf" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#143D2B]/10 flex items-center justify-center mb-3 text-[#143D2B] group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
              )}

              <p className="text-sm font-bold text-[#17251D]">
                {selectedFile ? selectedFile.name : t('drag_leaf_msg', 'Click or drag plant leaf image here', 'இங்கு அழுத்தவும் அல்லது இலையின் புகைப்படத்தை இழுத்து போடவும்')}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t('img_supported_formats', 'Supports JPEG, PNG, WebP (Max size: 5MB)', 'JPEG, PNG, WebP வடிவங்களை ஆதரிக்கிறது (அதிகபட்சம்: 5MB)')}
              </p>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || analyzing}
              className={`w-full mt-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedFile && !analyzing
                  ? 'bg-[#143D2B] hover:bg-[#1B5E20] text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('scanning_symptoms', 'Scanning Leaf Symptoms...', 'இலை அறிகுறிகளை ஆராய்கிறது...')}</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  <span>{t('btn_analyze_leaf', 'Analyze Disease & Get Remedies', 'நோயைக் கண்டறிந்து தீர்வுகளைப் பெறுக')}</span>
                </>
              )}
            </button>
          </div>

          {/* Results Output */}
          <div className="lg:col-span-7">
            {!scanResult && (
              <div className="bg-[#F7F6EF] p-8 rounded-2xl border border-[#143D2B]/10 text-center flex flex-col items-center justify-center min-h-[340px]">
                <ImageIcon className="w-12 h-12 text-[#143D2B]/30 mb-3" />
                <h4 className="text-base font-bold text-[#17251D]">
                  {t('diag_standby_title', 'Diagnostic Report Standby', 'நோய் அறிக்கை தயார் நிலையில் உள்ளது')}
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1">
                  {t(
                    'diag_standby_body',
                    'Upload a photo of your infected crop or leaf to view instant disease diagnosis, organic remedies, and chemical treatment guidelines.',
                    'பாதிக்கப்பட்ட இலையின் புகைப்படத்தை பதிவேற்றி நோயைக் கண்டறிந்து இயற்கை மற்றும் ரசாயன தீர்வுகளைப் பெறுங்கள்.'
                  )}
                </p>
              </div>
            )}

            {scanResult && (
              <div className="bg-white p-6 rounded-2xl border border-[#143D2B]/20 shadow-sm space-y-5">
                {scanResult.setupRequiredMsg ? (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>{scanResult.diseaseName}</span>
                    </div>
                    <p>{scanResult.setupRequiredMsg}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                      <div>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          {t('diag_result_label', 'Diagnosis Result', 'நோய் கண்டறிதல் முடிவு')}
                        </span>
                        <h3 className="text-2xl font-black text-[#17251D] mt-0.5">{scanResult.diseaseName}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-[#143D2B]">{scanResult.confidencePercent}%</span>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">
                          {t('confidence_score', 'Confidence Score', 'நம்பகத்தன்மை அளவு')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                        <strong className="text-amber-900 font-bold block mb-1">
                          {t('visible_symptoms', '🔍 Visible Symptoms:', '🔍 காணப்படும் அறிகுறிகள்:')}
                        </strong>
                        <p className="text-amber-800">{scanResult.symptoms}</p>
                      </div>

                      <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                        <strong className="text-emerald-900 font-bold block mb-1">
                          {t('organic_treatment', '🌿 Recommended Organic Treatment:', '🌿 பரிந்துரைக்கப்படும் இயற்கை தீர்வுகள்:')}
                        </strong>
                        <p className="text-emerald-800">{scanResult.organicTreatment}</p>
                      </div>

                      <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                        <strong className="text-blue-900 font-bold block mb-1">
                          {t('chemical_treatment', '🧪 Chemical Treatment (If severe):', '🧪 ரசாயன மருந்துகள் (தேவையெனில்):')}
                        </strong>
                        <p className="text-blue-800">{scanResult.chemicalTreatment}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <strong className="text-gray-900 font-bold block mb-1">
                          {t('preventive_measures', '🛡️ Preventive Measures:', '🛡️ முன்எச்சரிக்கை நடவடிக்கைகள்:')}
                        </strong>
                        <p className="text-gray-700">{scanResult.preventiveMeasures}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
