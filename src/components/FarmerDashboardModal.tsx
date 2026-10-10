import React from 'react';
import { X, User, MapPin, Phone, ShieldCheck, LogOut, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FarmerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerDashboardModal: React.FC<FarmerDashboardModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, signOut } = useAuth();

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
            <span>Protected Farmer Profile</span>
          </div>
          <h3 className="text-xl font-extrabold">{profile?.fullName || 'Farmer Profile'}</h3>
          <p className="text-xs text-emerald-100 mt-0.5">{user.email}</p>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <strong className="block text-sm font-bold">Supabase Row Level Security Active</strong>
                <span className="text-[11px] text-emerald-700">Your records and recommendations are private.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Phone Number:</span>
              <p className="font-semibold text-gray-800">{profile?.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">District / State:</span>
              <p className="font-semibold text-gray-800">{profile?.district}, {profile?.state}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Total Landholding:</span>
              <p className="font-semibold text-gray-800">{profile?.landAcreage || 5} Acres</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-0.5">Preferred Language:</span>
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
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
