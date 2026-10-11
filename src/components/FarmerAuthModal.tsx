import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Mail,
  Phone,
  Sprout,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  MapPin,
  Compass,
  ArrowRight,
  Globe,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAuth?: () => void;
}

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({ isOpen, onClose, onSuccessAuth }) => {
  const { signIn, signUp, isSupabaseActive } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration profile fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('Coimbatore');
  const [stateName, setStateName] = useState('Tamil Nadu');
  const [landAcreage, setLandAcreage] = useState(5);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [emailConfirmNotice, setEmailConfirmNotice] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(t('auth_err_email_invalid', 'Please enter a valid email address.', 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.'));
      return false;
    }
    if (password.length < 6) {
      setErrorMsg(t('auth_err_pass_len', 'Password must be at least 6 characters long.', 'கடவுச்சொல் குறைந்தபட்சம் 6 எழுத்துகள் இருக்க வேண்டும்.'));
      return false;
    }
    if (mode === 'register') {
      if (!fullName.trim()) {
        setErrorMsg(t('auth_err_name_req', 'Full name is required.', 'முழு பெயர் தேவை.'));
        return false;
      }
      if (password !== confirmPassword) {
        setErrorMsg(t('auth_err_pass_match', 'Passwords do not match. Please verify.', 'கடவுச்சொற்கள் பொருந்தவில்லை. மீண்டும் சரிபார்க்கவும்.'));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmailConfirmNotice(false);
    setShowForgotNotice(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          setErrorMsg(error);
        } else {
          setSuccessMsg(t('auth_succ_signin', 'Successfully signed in!', 'வெற்றிகரமாக உள்நுழைந்தீர்கள்!'));
          setTimeout(() => {
            onClose();
            if (onSuccessAuth) onSuccessAuth();
          }, 600);
        }
      } else {
        const { error, requiresEmailConfirmation } = await signUp(email.trim(), password, {
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          district: district.trim(),
          state: stateName.trim(),
          landAcreage: Number(landAcreage) || 1,
          preferredLanguage: language,
        });

        if (error) {
          setErrorMsg(error);
        } else if (requiresEmailConfirmation) {
          setEmailConfirmNotice(true);
          setSuccessMsg(
            t(
              'signup_confirm_msg',
              'Registration initiated! Please check your email inbox to confirm your account before logging in.',
              'பதிவு செய்யப்பட்டது! உள்நுழைவதற்கு முன் உங்கள் மின்னஞ்சலை சரிபார்க்கவும்.'
            )
          );
        } else {
          setSuccessMsg(t('auth_succ_signup', 'Account created successfully! Session saved.', 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!'));
          setTimeout(() => {
            onClose();
            if (onSuccessAuth) onSuccessAuth();
          }, 800);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || t('auth_err_gen', 'An error occurred during authentication.', 'பிழை ஏற்பட்டது.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Outer Card Container */}
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-agniva-border overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row my-auto max-h-[92vh]">
        
        {/* Left Branding / Value Proposition Column (Desktop and Tablet) */}
        <div className="hidden md:flex md:w-5/12 bg-linear-to-br from-agniva-primary via-[#0F4A2F] to-[#0A301E] text-white p-8 flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-agniva-fresh/10 pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-inner">
                <Sprout className="w-6 h-6 text-agniva-gold" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block leading-none">AGNIVA</span>
                <span className="text-[10px] text-agniva-fresh font-bold uppercase tracking-widest">Farmer AI Platform</span>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white mb-3">
              {mode === 'login'
                ? t('auth_left_login_h', 'Empowering Indian Farmers with Intelligent Insights', 'புத்திசாலித்தனமான வழிகாட்டலுடன் விவசாயிகளின் முன்னேற்றம்')
                : t('auth_left_reg_h', 'Smart Agriculture Starts Here', 'நவீன விவசாயம் இங்கிருந்து துவங்குகிறது')}
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              {mode === 'login'
                ? t('auth_left_login_p', 'Access real-time mandi prices, hyper-local weather alerts, AI-driven crop disease diagnostics, and secure farm ledger records.', 'நேரலை சந்தை நிலவரம், பயிர் நோய் கண்டறிதல் மற்றும் பண்ணை பதிவுகளை பாதுகாப்பாகக் கண்காணிக்கவும்.')
                : t('auth_left_reg_p', 'Join hundreds of progressive farmers utilizing predictive agronomy and automated harvest reminders on Supabase cloud.', 'மேகக்கணி பாதுகாப்பில் உங்கள் பயிர் விவரங்கள், நில பரப்பளவை இணைத்து அதிக மகசூல் பெறுங்கள்.')}
            </p>
          </div>

          {/* Feature Highlights List */}
          <div className="relative z-10 space-y-3 my-6">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-agniva-fresh flex-shrink-0" />
              <span className="text-xs font-medium text-white/90">
                {t('feat_bullet_1', 'AI Crop Disease Scanner with 98% accuracy', '98% துல்லியமான பயிர் நோய் ஸ்கேனர்')}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-agniva-fresh flex-shrink-0" />
              <span className="text-xs font-medium text-white/90">
                {t('feat_bullet_2', 'Real-time Tamil Nadu Mandi Price feeds', 'நேரலை ஒழுங்குமுறை விற்பனைக்கூட விலைகள்')}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-agniva-fresh flex-shrink-0" />
              <span className="text-xs font-medium text-white/90">
                {t('feat_bullet_3', 'Row Level Security protecting your private land data', 'பாதுகாக்கப்பட்ட உங்கள் தனிப்பட்ட பண்ணை தரவு')}
              </span>
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/70">
            <ShieldCheck className="w-4 h-4 text-agniva-gold flex-shrink-0" />
            <span>
              {isSupabaseActive
                ? t('supa_auth_secured', 'Secured with Supabase Auth & Row Level Security (RLS)', 'Supabase Auth மூலம் பாதுகாக்கப்பட்டது')
                : t('demo_auth_mode', 'Demo Authentication Mode', 'டெமோ உள்நுழைவு முறை')}
            </span>
          </div>
        </div>

        {/* Right Form Column (Mobile-First) */}
        <div className="w-full md:w-7/12 flex flex-col justify-between overflow-y-auto">
          {/* Top Bar inside form card */}
          <div className="p-5 sm:p-6 pb-2 border-b border-gray-100 flex items-center justify-between">
            {/* Language Switcher pill inside modal */}
            <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-gray-500 ml-1.5" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-agniva-primary shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'bg-white text-agniva-primary shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label={t('btn_close', 'Close', 'மூடு')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-6 sm:p-8 pt-4 flex-1">
            {/* Header Titles */}
            <div className="mb-6">
              <h3 id="auth-modal-title" className="text-2xl font-black text-gray-900 tracking-tight">
                {mode === 'login'
                  ? t('auth_login_welcome', 'Welcome back', 'நல்வரவு')
                  : t('auth_register_title', 'Join Agniva', 'அக்னிவாவில் இணையுங்கள்')}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {mode === 'login'
                  ? t('auth_login_sub', 'Sign in to continue your farming journey.', 'அக்னிவாவுடன் உங்கள் விவசாயப் பயணத்தைத் தொடர உள்நுழையவும்.')
                  : t('auth_register_sub', 'Create your farmer account to sync land acreage, save field records and get disease alerts.', 'உங்கள் நிலத்தை இணைக்கவும், பண்ணை பதிவுகளைச் சேமிக்கவும் புதிய கணக்கை உருவாக்கவும்.')}
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex bg-gray-100/90 p-1 rounded-2xl mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setShowForgotNotice(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-center transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-agniva-primary shadow-xs font-extrabold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('tab_signin', 'Sign In', 'உள்நுழைவு')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setShowForgotNotice(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-center transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white text-agniva-primary shadow-xs font-extrabold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('tab_register', 'Create Account', 'புதிய கணக்கு')}
              </button>
            </div>

            {/* Status Messages */}
            {errorMsg && (
              <div className="p-3.5 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="flex-1">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="flex-1">{successMsg}</span>
              </div>
            )}

            {showForgotNotice && (
              <div className="p-3 mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{t('auth_forgot_info', 'Please contact support or check your email verification link.', 'உதவி மையத்தைத் தொடர்பு கொள்ளவும் அல்லது உங்கள் மின்னஞ்சல் சரிபார்ப்பு இணைப்பைச் சரிபார்க்கவும்.')}</span>
              </div>
            )}

            {/* The Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Registration Specific Fields */}
              {mode === 'register' && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="font-bold text-gray-700 block mb-1.5">
                      {t('auth_fullname_lbl', 'Full Name', 'முழு பெயர்')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder={t('auth_fullname_placeholder', 'e.g. Ramesh Kumar', 'ரமேஷ் குமார்')}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="font-bold text-gray-700 block mb-1.5">
                      {t('auth_phone_lbl', 'Mobile Number', 'கைபேசி எண்')}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        placeholder={t('auth_phone_placeholder', '9876543210', '9876543210')}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 transition-all"
                      />
                    </div>
                  </div>

                  {/* Location & Land Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1.5">
                        {t('auth_district_lbl', 'District', 'மாவட்டம்')}
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full pl-8 pr-2.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 text-xs transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1.5">
                        {t('auth_acreage_lbl', 'Land (Acres)', 'நிலப்பரப்பு (ஏக்கர்)')}
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={landAcreage}
                        onChange={(e) => setLandAcreage(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 text-xs transition-all"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="font-bold text-gray-700 block mb-1.5">
                  {t('auth_email_lbl', 'Email Address', 'மின்னஞ்சல் முகவரி')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder={t('auth_email_placeholder', 'farmer@example.com', 'farmer@example.com')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700">
                    {t('auth_password_lbl', 'Password', 'கடவுச்சொல்')} <span className="text-red-500">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotNotice(!showForgotNotice)}
                      className="text-agniva-primary hover:text-agniva-fresh font-semibold text-[11px] cursor-pointer"
                    >
                      {t('auth_forgot_password', 'Forgot password?', 'கடவுச்சொல் மறந்ததா?')}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth_password_placeholder', '••••••••', '••••••••')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                    aria-label={showPassword ? t('auth_hide_password', 'Hide password', 'கடவுச்சொல்லை மறை') : t('auth_show_password', 'Show password', 'கடவுச்சொல்லை காட்டு')}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register mode only) */}
              {mode === 'register' && (
                <div>
                  <label className="font-bold text-gray-700 block mb-1.5">
                    {t('auth_confirm_password_lbl', 'Confirm Password', 'கடவுச்சொல்லை உறுதிசெய்க')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('auth_password_placeholder', '••••••••', '••••••••')}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-agniva-primary text-gray-900 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                      aria-label={showConfirmPassword ? t('auth_hide_password', 'Hide password', 'கடவுச்சொல்லை மறை') : t('auth_show_password', 'Show password', 'கடவுச்சொல்லை காட்டு')}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember me (Login Mode) */}
              {mode === 'login' && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-agniva-primary focus:ring-agniva-primary h-4 w-4"
                    />
                    <span className="text-gray-600 font-medium text-xs">
                      {t('auth_remember_me', 'Remember me', 'என்னை நினைவில் கொள்')}
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-linear-to-r from-agniva-primary to-[#1B663F] hover:from-[#135436] hover:to-[#175535] text-white font-black text-sm rounded-2xl shadow-lg shadow-agniva-primary/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {mode === 'login'
                        ? t('auth_btn_signing_in', 'Signing In...', 'உள்நுழைகிறது...')
                        : t('auth_btn_registering', 'Creating Account...', 'கணக்கு உருவாகிறது...')}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'login'
                        ? t('auth_btn_signin', 'Sign In', 'உள்நுழையவும்')
                        : t('auth_btn_register', 'Create Account', 'கணக்கை உருவாக்கு')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Switch Links */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col items-center gap-2.5 text-center">
              {mode === 'login' ? (
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setShowForgotNotice(false);
                  }}
                  className="text-xs font-semibold text-agniva-primary hover:text-agniva-fresh hover:underline cursor-pointer"
                >
                  {t('auth_switch_to_reg', 'New to Agniva? Create an account.', 'அக்னிவாவிற்கு புதியவரா? கணக்கை உருவாக்குங்கள்.')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setShowForgotNotice(false);
                  }}
                  className="text-xs font-semibold text-agniva-primary hover:text-agniva-fresh hover:underline cursor-pointer"
                >
                  {t('auth_switch_to_login', 'Already have an account? Sign in.', 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்.')}
                </button>
              )}

              {/* Back to Home Link */}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer mt-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('auth_back_home', 'Back to Home', 'முகப்பிற்குத் திரும்பு')}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
