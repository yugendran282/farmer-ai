import React, { useState, useEffect } from 'react';
import {
  Sprout,
  ScanLine,
  Bot,
  CloudSun,
  ClipboardList,
  Calendar,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  User,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Droplets,
  Wind
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/dbService';
import { weatherService, WeatherData } from '../services/weatherService';
import { recordsService, FarmRecordItem, FarmingReminderItem } from '../services/recordsService';
import { Crop } from '../types';

interface FarmerDashboardViewProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAuth: () => void;
}

export const FarmerDashboardView: React.FC<FarmerDashboardViewProps> = ({
  onNavigateSection,
  onOpenAuth,
}) => {
  const { user, profile, signOut } = useAuth();
  const { language, t } = useLanguage();

  // State
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'advisory' | 'records'>('overview');
  const [crops, setCrops] = useState<Record<string, Crop>>({});
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [records, setRecords] = useState<FarmRecordItem[]>([]);
  const [reminders, setReminders] = useState<FarmingReminderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [district, setDistrict] = useState<string>('coimbatore');

  // Load all dashboard metrics
  const loadDashboardData = async () => {
    try {
      const [cropsData, weatherData, recordsData, remindersData] = await Promise.all([
        dbService.getCrops(),
        weatherService.getWeather(district),
        recordsService.getRecords(user?.id),
        recordsService.getReminders(user?.id),
      ]);

      setCrops(cropsData);
      setWeather(weatherData);
      setRecords(recordsData);
      setReminders(remindersData);
    } catch (err) {
      console.error('Failed to load farmer dashboard metrics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user, district]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const handleToggleReminder = async (id: string, currentVal: boolean) => {
    await recordsService.toggleReminderComplete(id, !currentVal, user?.id);
    const updatedReminders = await recordsService.getReminders(user?.id);
    setReminders(updatedReminders);
  };

  // Personalized Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dash_greeting_morning', 'Good morning', 'காலை வணக்கம்');
    if (hour < 17) return t('dash_greeting_afternoon', 'Good afternoon', 'மதிய வணக்கம்');
    return t('dash_greeting_evening', 'Good evening', 'மாலை வணக்கம்');
  };

  // Pending reminder count
  const pendingRemindersCount = reminders.filter((r) => !r.isCompleted).length;
  const cropsList = Object.values(crops);

  return (
    <div className="py-6 sm:py-8 bg-[#F7F9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 1. Header Banner & Profile Greeting */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E8DF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {t('dash_title', 'Farmer Control Center', 'விவசாயி கட்டுப்பாட்டு மையம்')}
              </span>
              <span className="text-xs text-[#526357]">•</span>
              <span className="text-xs text-[#526357] font-medium">
                {new Date().toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#17231C] font-serif leading-tight">
              {getGreeting()},{' '}
              <span className="text-[#176B45]">
                {profile?.fullName || (user ? user.email?.split('@')[0] : t('farmer_guest', 'Valued Farmer', 'மரியாதைக்குரிய விவசாயி'))}!
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#526357]">
              {t('dash_welcome_sub', 'Here is your farm overview, live market snapshot, and scheduled field actions.', 'உங்கள் பண்ணை நிலவரம், நேரலை சந்தை விலை மற்றும் பணிகள் இங்கே.')}
            </p>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="min-h-[40px] px-3 py-2 bg-[#F7F9F5] hover:bg-[#E2E8DF] text-[#17231C] rounded-xl text-xs font-bold border border-[#E2E8DF] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#176B45]' : ''}`} />
              <span className="hidden sm:inline">{t('btn_refresh', 'Sync', 'புதுப்பி')}</span>
            </button>

            {user ? (
              <button
                onClick={() => signOut()}
                className="min-h-[40px] px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('nav_logout', 'Logout', 'வெளியேறு')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="min-h-[40px] px-4 py-2 bg-[#176B45] hover:bg-[#125537] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('nav_login', 'Sign In to Save', 'உள்நுழைக')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Guest Banner if not signed in */}
        {!user && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <strong className="block font-bold">
                  {t('dash_guest_banner_title', 'You are viewing Demo Farmer Mode', 'நீங்கள் டெமோ முறையில் பார்க்கிறீர்கள்')}
                </strong>
                <span className="text-amber-800">
                  {t('dash_guest_banner_desc', 'Sign in with Supabase to sync your real acreage, save custom crop plans, and protect your private farm records.', 'உங்கள் நில அளவை இணைக்கவும், பண்ணை பதிவுகளை பாதுகாக்கவும் உள்நுழையவும்.')}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="min-h-[38px] px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors shadow-xs"
            >
              {t('dash_guest_btn', 'Sign In to Sync Farm Data', 'உள்நுழையவும்')}
            </button>
          </div>
        )}

        {/* 2. Key Metrics Strip (Responsive 2 cols on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Crops Tracked */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DF] shadow-xs">
            <div className="flex items-center justify-between text-[#526357] mb-2">
              <span className="text-xs font-semibold">{t('metric_crops_available', 'Tracked Crops', 'பதிவான பயிர்கள்')}</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#176B45] flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#17231C]">
              {cropsList.length} <span className="text-xs font-normal text-[#526357]">varieties</span>
            </div>
            <span className="text-[11px] text-[#176B45] font-semibold mt-1 block">
              APMC benchmark verified
            </span>
          </div>

          {/* Card 2: Weather */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DF] shadow-xs">
            <div className="flex items-center justify-between text-[#526357] mb-2">
              <span className="text-xs font-semibold">{t('metric_live_temp', 'Current Weather', 'நேரலை வானிலை')}</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#176B45] flex items-center justify-center">
                <CloudSun className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#17231C]">
              {weather ? `${weather.temperature}°C` : '--°C'}
            </div>
            <span className="text-[11px] text-[#526357] truncate block">
              {weather?.locationName || district} • {weather?.weatherCondition || 'Clear'}
            </span>
          </div>

          {/* Card 3: Pending Reminders */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DF] shadow-xs">
            <div className="flex items-center justify-between text-[#526357] mb-2">
              <span className="text-xs font-semibold">{t('metric_pending_reminders', 'Pending Tasks', 'நிலுவை பணிகள்')}</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#17231C]">
              {pendingRemindersCount} <span className="text-xs font-normal text-[#526357]">due</span>
            </div>
            <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
              {pendingRemindersCount > 0 ? 'Action required today' : 'All tasks up to date'}
            </span>
          </div>

          {/* Card 4: Farm Acreage */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8DF] shadow-xs">
            <div className="flex items-center justify-between text-[#526357] mb-2">
              <span className="text-xs font-semibold">{t('metric_farm_acreage', 'Registered Acreage', 'பதிவு செய்த நிலம்')}</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#176B45] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#17231C]">
              {profile?.landAcreage || 5} <span className="text-xs font-normal text-[#526357]">Acres</span>
            </div>
            <span className="text-[11px] text-[#526357] truncate block">
              {profile?.district || 'Coimbatore'}, {profile?.state || 'TN'}
            </span>
          </div>
        </div>

        {/* 3. Dashboard Segment Tabs */}
        <div className="flex items-center overflow-x-auto pb-1 gap-2 border-b border-[#E2E8DF]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#526357] hover:bg-[#E2E8DF] border border-[#E2E8DF]'
            }`}
          >
            {t('tab_overview', 'Overview', 'மேலோட்டம்')}
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'market'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#526357] hover:bg-[#E2E8DF] border border-[#E2E8DF]'
            }`}
          >
            {t('tab_market_prices', 'Mandi Prices', 'சந்தை விலைகள்')} ({cropsList.length})
          </button>
          <button
            onClick={() => setActiveTab('advisory')}
            className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'advisory'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#526357] hover:bg-[#E2E8DF] border border-[#E2E8DF]'
            }`}
          >
            {t('tab_advisory', 'Advisory Tools', 'ஆலோசனை கருவிகள்')}
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'records'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#526357] hover:bg-[#E2E8DF] border border-[#E2E8DF]'
            }`}
          >
            {t('tab_reminders', 'Reminders & Logs', 'நினைவூட்டல்கள் & பதிவுகள்')} ({reminders.length})
          </button>
        </div>

        {/* 4. Tab Content Panels */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Quick Launch Actions + Market Highlights (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quick Actions Bento */}
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-[#17231C]">
                  {t('quick_actions_title', 'Frequently Used Field Actions', 'விரைவு விவசாய பணிகள்')}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <button
                    onClick={() => onNavigateSection('crop-recommendation')}
                    className="p-3 rounded-xl bg-[#F7F9F5] hover:bg-emerald-50 border border-[#E2E8DF] hover:border-[#176B45] text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px]"
                  >
                    <Sprout className="w-5 h-5 text-[#176B45]" />
                    <div>
                      <span className="font-bold text-[#17231C] block">{t('qa_advisor', 'Soil Recommendation', 'மண் பரிந்துரை')}</span>
                      <span className="text-[10px] text-[#526357]">Input NPK & pH</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onNavigateSection('disease-scanner')}
                    className="p-3 rounded-xl bg-[#F7F9F5] hover:bg-emerald-50 border border-[#E2E8DF] hover:border-[#176B45] text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px]"
                  >
                    <ScanLine className="w-5 h-5 text-[#176B45]" />
                    <div>
                      <span className="font-bold text-[#17231C] block">{t('qa_scanner', 'Scan Plant Leaf', 'நோய் ஸ்கேனர்')}</span>
                      <span className="text-[10px] text-[#526357]">Upload Leaf Photo</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onNavigateSection('farming-assistant')}
                    className="p-3 rounded-xl bg-[#F7F9F5] hover:bg-emerald-50 border border-[#E2E8DF] hover:border-[#176B45] text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px]"
                  >
                    <Bot className="w-5 h-5 text-[#176B45]" />
                    <div>
                      <span className="font-bold text-[#17231C] block">{t('qa_assistant', 'Ask Assistant', 'விவசாயி AI')}</span>
                      <span className="text-[10px] text-[#526357]">Pests & Fertilizer</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Crop Prices Overview Snapshot */}
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-[#17231C] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#176B45]" />
                    <span>{t('top_crop_prices', 'Top APMC Mandi Benchmark Prices', 'முக்கிய APMC சந்தை விலைகள்')}</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('market')}
                    className="text-xs font-bold text-[#176B45] hover:underline cursor-pointer"
                  >
                    {t('view_all', 'View All', 'அனைத்தும்')} ({cropsList.length}) →
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {cropsList.slice(0, 4).map((crop) => (
                    <div key={crop.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#17231C] block text-sm">{crop.name}</span>
                        <span className="text-[#526357] text-[11px]">{crop.variety} • {crop.season}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-[#17231C] block">
                          ₹{crop.referencePrice.toLocaleString()}
                        </span>
                        <span className={`text-[10px] font-bold ${crop.dayChangePercent >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {crop.dayChangePercent >= 0 ? `▲ +${crop.dayChangePercent}%` : `▼ ${crop.dayChangePercent}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Scheduled Reminders & Weather Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Scheduled Tasks Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-[#17231C] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#176B45]" />
                    <span>{t('upcoming_reminders', 'Upcoming Reminders', 'அடுத்த பணிகள்')}</span>
                  </h3>
                  <button
                    onClick={() => onNavigateSection('records-reminders')}
                    className="text-xs font-bold text-[#176B45] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('btn_add', 'Add', 'சேர்')}</span>
                  </button>
                </div>

                {reminders.length === 0 ? (
                  <p className="text-xs text-[#526357] py-4 text-center">
                    {t('no_reminders_dash', 'No pending tasks. Click "Add" to schedule watering or fertilizing.', 'பணிகள் எதுவும் இல்லை.')}
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {reminders.slice(0, 3).map((rem) => (
                      <div
                        key={rem.id}
                        className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                          rem.isCompleted ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-[#F7F9F5] border-[#E2E8DF]'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className={`font-bold ${rem.isCompleted ? 'line-through text-gray-500' : 'text-[#17231C]'}`}>
                            {rem.title}
                          </h4>
                          <span className="text-[10px] text-[#526357] block">
                            Due: {rem.dueDate} • {rem.category}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleReminder(rem.id, rem.isCompleted)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                            rem.isCompleted ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-300 hover:border-emerald-600'
                          }`}
                          title="Toggle Completion"
                        >
                          {rem.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weather Forecast Mini-Card */}
              {weather && (
                <div className="bg-gradient-to-br from-[#176B45] to-[#125537] text-white rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider block">
                        {t('local_met_station', 'Meteorological Forecast', 'உள்ளூர் வானிலை')}
                      </span>
                      <h4 className="text-base font-bold text-white">{weather.locationName}</h4>
                    </div>
                    <span className="text-2xl font-black">{weather.temperature}°C</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-white/10">
                    <div className="bg-white/10 p-2 rounded-xl">
                      <Droplets className="w-3.5 h-3.5 mx-auto mb-1 text-cyan-200" />
                      <span className="text-[10px] text-gray-200 block">Humidity</span>
                      <strong>{weather.humidity}%</strong>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl">
                      <Wind className="w-3.5 h-3.5 mx-auto mb-1 text-teal-200" />
                      <span className="text-[10px] text-gray-200 block">Wind</span>
                      <strong>{weather.windSpeedKmH} km/h</strong>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl">
                      <Droplets className="w-3.5 h-3.5 mx-auto mb-1 text-blue-200" />
                      <span className="text-[10px] text-gray-200 block">Rainfall</span>
                      <strong>{weather.precipitationMm} mm</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Mandi Prices Full Grid */}
        {activeTab === 'market' && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-[#17231C]">
                  {t('all_mandi_prices', 'Official Mandi Benchmark Prices', 'அனைத்து சந்தை விலை நிலவரம்')}
                </h3>
                <p className="text-xs text-[#526357]">
                  {t('mandi_source_note', 'Prices reported per standard quintal with statutory MSP comparison.', 'அரசு குறைந்தபட்ச ஆதரவு விலை (MSP) உடன் ஒப்பிட்ட விலை விவரம்.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cropsList.map((crop) => (
                <div key={crop.id} className="p-4 rounded-xl border border-[#E2E8DF] bg-[#F7F9F5] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-[#17231C]">{crop.name}</h4>
                      <span className={`text-xs font-bold ${crop.dayChangePercent >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {crop.dayChangePercent >= 0 ? `+${crop.dayChangePercent}%` : `${crop.dayChangePercent}%`}
                      </span>
                    </div>
                    <span className="text-xs text-[#526357] block mb-2">{crop.variety} • {crop.season}</span>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8DF] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Market Price</span>
                      <strong className="text-base text-[#17231C]">₹{crop.referencePrice.toLocaleString()}</strong>
                    </div>
                    {crop.mspGovernment > 0 && (
                      <div className="text-right">
                        <span className="text-[10px] text-gray-500 block">Govt MSP</span>
                        <span className="font-bold text-[#176B45]">₹{crop.mspGovernment.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Advisory Tools Direct Shortcuts */}
        {activeTab === 'advisory' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs flex flex-col justify-between">
              <div>
                <Sprout className="w-8 h-8 text-[#176B45] mb-3" />
                <h3 className="font-bold text-base text-[#17231C] mb-1">
                  {t('crop_rec_title', 'Crop Soil Recommendation', 'பயிர் மண் பரிந்துரை')}
                </h3>
                <p className="text-xs text-[#526357] leading-relaxed mb-4">
                  Run soil suitability calculations using Nitrogen, Phosphorus, Potassium, and pH test parameters.
                </p>
              </div>
              <button
                onClick={() => onNavigateSection('crop-recommendation')}
                className="w-full min-h-[44px] py-2 bg-[#176B45] text-white font-bold rounded-xl text-xs hover:bg-[#125537] cursor-pointer"
              >
                Launch Soil Calculator
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs flex flex-col justify-between">
              <div>
                <ScanLine className="w-8 h-8 text-[#176B45] mb-3" />
                <h3 className="font-bold text-base text-[#17231C] mb-1">
                  {t('disease_title', 'Plant Disease Scanner', 'நோய் கண்டறியும் ஸ்கேனர்')}
                </h3>
                <p className="text-xs text-[#526357] leading-relaxed mb-4">
                  Diagnose fungal blights, viral curl, and insect infestations from plant leaf photographs.
                </p>
              </div>
              <button
                onClick={() => onNavigateSection('disease-scanner')}
                className="w-full min-h-[44px] py-2 bg-[#176B45] text-white font-bold rounded-xl text-xs hover:bg-[#125537] cursor-pointer"
              >
                Scan Plant Leaf
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8DF] shadow-xs flex flex-col justify-between">
              <div>
                <Bot className="w-8 h-8 text-[#176B45] mb-3" />
                <h3 className="font-bold text-base text-[#17231C] mb-1">
                  {t('assistant_title', 'FARMERS AI Advisory Q&A', 'விவசாயி AI ஆலோசனைக் குழு')}
                </h3>
                <p className="text-xs text-[#526357] leading-relaxed mb-4">
                  Ask conversational questions on crop protection, organic inputs, and biological fertilizers.
                </p>
              </div>
              <button
                onClick={() => onNavigateSection('farming-assistant')}
                className="w-full min-h-[44px] py-2 bg-[#176B45] text-white font-bold rounded-xl text-xs hover:bg-[#125537] cursor-pointer"
              >
                Chat with Assistant
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Farm Records & Scheduled Reminders Overview */}
        {activeTab === 'records' && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E8DF] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-[#17231C]">
                  {t('records_title', 'Farm Management Records & Reminders', 'விவசாய பதிவுகள் & நினைவூட்டல்கள்')}
                </h3>
                <p className="text-xs text-[#526357]">
                  {records.length} {t('field_logs_saved', 'field logs recorded', 'பதிவுகள் உள்ளன')} • {reminders.length} {t('reminders_count', 'reminders configured', 'நினைவூட்டல்கள் உள்ளன')}
                </p>
              </div>
              <button
                onClick={() => onNavigateSection('records-reminders')}
                className="min-h-[40px] px-4 py-2 bg-[#176B45] text-white rounded-xl text-xs font-bold hover:bg-[#125537] cursor-pointer"
              >
                Manage All Records
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.slice(0, 4).map((r) => (
                <div key={r.id} className="p-4 rounded-xl border border-[#E2E8DF] bg-[#F7F9F5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#17231C]">{r.cropName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                      {r.activityType}
                    </span>
                  </div>
                  <span className="text-[#526357] block">{r.fieldName} • {r.recordDate}</span>
                  {r.notes && <p className="text-gray-700 bg-white p-2 rounded text-[11px] mt-1 border border-gray-200">{r.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
