import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, Sprout, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, isSupabaseActive } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('Coimbatore');
  const [stateName, setStateName] = useState('Tamil Nadu');
  const [landAcreage, setLandAcreage] = useState(5);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMsg(error.message || 'Failed to sign in. Please check your credentials.');
        } else {
          setSuccessMsg('Successfully signed in!');
          setTimeout(() => onClose(), 800);
        }
      } else {
        const { error } = await signUp(email, password, {
          fullName,
          phoneNumber,
          district,
          state: stateName,
          landAcreage,
          preferredLanguage: 'en',
        });

        if (error) {
          setErrorMsg(error.message || 'Registration failed. Please try again.');
        } else {
          setSuccessMsg('Account created successfully! Session saved.');
          setTimeout(() => onClose(), 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Header Banner */}
        <div className="bg-[#143D2B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#F2C14E] text-xs font-bold uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4" />
            <span>FARMERS AI Authentication</span>
          </div>
          <h3 className="text-xl font-extrabold">
            {mode === 'login' ? 'Farmer Sign In' : 'Farmer Registration'}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            {isSupabaseActive
              ? 'Secured with Supabase Auth & Row Level Security (RLS)'
              : 'Demo Authentication Mode'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'border-b-2 border-[#143D2B] text-[#143D2B] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'register'
                ? 'border-b-2 border-[#143D2B] text-[#143D2B] bg-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Land (Acres)</label>
                  <input
                    type="number"
                    value={landAcreage}
                    onChange={(e) => setLandAcreage(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-bold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B]"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Register Farmer Account'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
