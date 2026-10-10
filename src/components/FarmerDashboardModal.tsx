import React from 'react';
import { X, ShieldCheck, LogOut, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface FarmerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerDashboardModal: React.FC<FarmerDashboardModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative">
        <div className="bg-[#143D2B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#F2C14E] text-xs font-bold uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4" />
            <span>{t('dash_protected_tag', 'Protected Farmer Profile', 'பாதுகாக்கப்பட்ட விவசாயி சுயவிவரம்')}</span>
          </div>
          <h3 className="text-xl font-extrabold">{profile?.fullName || t('farmer_profile_fallback', 'Farmer Profile', 'விவசாயி சுயவிவரம்')}</h3>
          <p className="text-xs text-emerald-100 mt-0.5">{user.email}</p>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <strong className="block text-sm font-bold">
                  {t('rls_active_title', 'Supabase Row Level Security Active', 'Supabase தரவுத்தள பாதுகாப்பு செயலில் உள்ளது')}
                </strong>
                <span className="text-[11px] text-emerald-700">
                  {t('rls_active_sub', 'Your records and recommendations are private.', 'உங்கள் பதிவுகள் மற்றும் பரிந்துரைகள் தனிப்பட்டவை.')}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">{t('phone_lbl', 'Phone Number:', 'கைபேசி எண்:')}</span>
              <p className="font-semibold text-gray-800">{profile?.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">{t('district_state_lbl', 'District / State:', 'மாவட்டம் / மாநிலம்:')}</span>
              <p className="font-semibold text-gray-800">{profile?.district}, {profile?.state}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">{t('landholding_lbl', 'Total Landholding:', 'மொத்த நிலப்பரப்பு:')}</span>
              <p className="font-semibold text-gray-800">{profile?.landAcreage || 5} {t('acres_unit', 'Acres', 'ஏக்கர்')}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">{t('pref_lang_lbl', 'Preferred Language:', 'விரும்பும் மொழி:')}</span>
              <p className="font-semibold text-gray-800 uppercase">{profile?.preferredLanguage || 'English'}</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={async () => {
                await signOut();
                onClose();
              }}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('btn_signout', 'Sign Out', 'வெளியேறு')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
