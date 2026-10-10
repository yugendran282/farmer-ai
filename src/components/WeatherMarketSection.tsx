import React, { useState, useEffect } from 'react';
import { CloudSun, Thermometer, Droplets, Wind, RefreshCw, TrendingUp, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { weatherService, WeatherData } from '../services/weatherService';
import { useLanguage } from '../context/LanguageContext';

export const WeatherMarketSection: React.FC = () => {
  const { t } = useLanguage();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('coimbatore');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadWeather = async (district: string) => {
    setLoading(true);
    try {
      const data = await weatherService.getWeather(district);
      setWeather(data);
    } catch (err) {
      console.error('Failed to load weather:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  return (
    <section id="weather-market" className="py-16 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#143D2B] text-xs font-bold uppercase tracking-wider mb-4">
            <CloudSun className="w-4 h-4 text-[#1B5E20]" />
            <span>Meteorological & APMC Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17251D] tracking-tight">
            {t('weather_title', 'Real-Time Weather & APMC Market Mandi Prices')}
          </h2>
          <p className="mt-3 text-base text-[#17251D]/70">
            {t('weather_subtitle', 'Live hyper-local weather forecast and verified market prices.')}
          </p>
        </div>

        {/* District Selector & Refresh Bar */}
        <div className="max-w-4xl mx-auto mb-8 bg-[#F7F6EF] p-4 rounded-2xl border border-[#143D2B]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#143D2B]">
            <MapPin className="w-4 h-4 text-[#F2C14E]" />
            <span>Select Regional Weather Station:</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2 bg-white text-xs font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#143D2B] focus:outline-none"
            >
              <option value="coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
              <option value="madurai">Madurai (மதுரை)</option>
              <option value="chennai">Chennai (சென்னை)</option>
              <option value="salem">Salem (சேலம்)</option>
              <option value="trichy">Tiruchirappalli (திருச்சி)</option>
              <option value="delhi">New Delhi (புது தில்லி)</option>
            </select>
            <button
              onClick={() => loadWeather(selectedDistrict)}
              className="p-2 bg-white hover:bg-gray-100 text-[#143D2B] rounded-xl border border-gray-300 transition-colors cursor-pointer"
              title="Refresh Live Weather"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Weather Cards Grid */}
        {weather && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            {/* Main Current Weather Card (7 cols) */}
            <div className="md:col-span-7 bg-gradient-to-br from-[#143D2B] to-[#1B5E20] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#F2C14E] bg-white/10 px-3 py-1 rounded-full">
                    {weather.locationName}
                  </span>
                  <span className="text-[11px] text-emerald-200">
                    Source: {weather.source}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-5xl font-black">{weather.temperature}°C</span>
                    <p className="text-sm font-semibold text-emerald-100 mt-1">{weather.weatherCondition}</p>
                  </div>
                  <div className="text-4xl">🌤️</div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/5 p-2 rounded-xl">
                  <Droplets className="w-4 h-4 mx-auto mb-1 text-cyan-300" />
                  <span className="block text-gray-300 text-[10px]">Humidity</span>
                  <strong className="text-white text-sm">{weather.humidity}%</strong>
                </div>
                <div className="bg-white/5 p-2 rounded-xl">
                  <Wind className="w-4 h-4 mx-auto mb-1 text-teal-300" />
                  <span className="block text-gray-300 text-[10px]">Wind Speed</span>
                  <strong className="text-white text-sm">{weather.windSpeedKmH} km/h</strong>
                </div>
                <div className="bg-white/5 p-2 rounded-xl">
                  <Droplets className="w-4 h-4 mx-auto mb-1 text-blue-300" />
                  <span className="block text-gray-300 text-[10px]">Rainfall</span>
                  <strong className="text-white text-sm">{weather.precipitationMm} mm</strong>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast Column (5 cols) */}
            <div className="md:col-span-5 bg-[#F7F6EF] p-6 rounded-3xl border border-[#143D2B]/15 flex flex-col justify-between">
              <h4 className="text-sm font-bold text-[#143D2B] flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-[#F2C14E]" />
                5-Day Agricultural Weather Outlook
              </h4>

              <div className="space-y-2.5 text-xs">
                {weather.forecast.map((f, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center justify-between">
                    <span className="font-bold text-gray-700 w-20">{f.date}</span>
                    <span className="text-gray-500 text-[11px]">{f.condition}</span>
                    <div className="text-right">
                      <span className="font-bold text-[#17251D]">{f.maxTemp}°C</span>
                      <span className="text-gray-400 text-[10px] block">{f.precipitationProbability}% Rain</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
