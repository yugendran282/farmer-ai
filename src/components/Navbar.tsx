import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X, Globe, User, LogIn, LayoutDashboard, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentView: 'home' | 'dashboard';
  onNavigateView: (view: 'home' | 'dashboard') => void;
  onOpenAuth: () => void;
  onOpenDashboardModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateView,
  onOpenAuth,
  onOpenDashboardModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, profile } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_recommendation', 'Crop Advisor', 'பயிர் வழிகாட்டி'), href: '#crop-recommendation' },
    { label: t('nav_disease', 'Disease Scanner', 'நோய் கண்டறிதல்'), href: '#disease-scanner' },
    { label: t('nav_assistant', 'AI Advisory', 'AI ஆலோசனை'), href: '#farming-assistant' },
    { label: t('nav_weather', 'Weather & Prices', 'வானிலை & விலை'), href: '#weather-market' },
    { label: t('nav_records', 'Farm Records', 'பண்ணை பதிவுகள்'), href: '#records-reminders' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#176B45] text-white shadow-md py-2.5 border-b border-[#176B45]/20'
          : 'bg-[#176B45]/95 backdrop-blur-md text-white py-3 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Wordmark & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateView('home')}
              className="flex items-center gap-2.5 text-white shrink-0 group focus:outline-none cursor-pointer text-left"
              aria-label="Agniva Home"
            >
              <div className="w-9 h-9 rounded-xl bg-white text-[#176B45] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <Sprout className="w-5 h-5 text-[#176B45]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight leading-none font-sans">
                  {t('brand_name', 'Agniva', 'அக்னிவா')}
                </span>
                <span className="text-[10px] font-medium tracking-wider text-emerald-200 uppercase mt-0.5">
                  {t('brand_tagline', 'Farmer AI', 'விவசாயி AI')}
                </span>
              </div>
            </button>

            {/* View Switcher Tabs (Desktop) */}
            <div className="hidden md:flex items-center bg-black/15 p-0.5 rounded-xl ml-4 border border-white/10 text-xs font-semibold">
              <button
                onClick={() => onNavigateView('home')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-white text-[#17231C] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('nav_home', 'Home', 'முகப்பு')}</span>
              </button>
              <button
                onClick={() => onNavigateView('dashboard')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-white text-[#17231C] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{t('nav_dashboard', 'Farmer Dashboard', 'விவசாயி டாஷ்போர்டு')}</span>
              </button>
            </div>
          </div>

          {/* Center Navigation Links (Only on Home View on Desktop) */}
          {currentView === 'home' && (
            <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-white/90">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap shrink-0 text-white/80 hover:text-white transition-colors py-1 hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right Area: Language Switcher & Auth */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-black/15 p-1 rounded-xl border border-white/10 text-xs font-bold">
              <Globe className="w-3.5 h-3.5 text-emerald-200 mx-1" aria-hidden="true" />
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-white text-[#17231C] shadow-xs' : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                aria-label="தமிழுக்கு மாறவும்"
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  language === 'ta' ? 'bg-white text-[#17231C] shadow-xs' : 'text-white/70 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Auth Action Button */}
            {user ? (
              <button
                onClick={onOpenDashboardModal}
                className="px-3 py-1.5 min-h-[40px] bg-emerald-700/80 hover:bg-emerald-700 text-white border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="View Farmer Profile"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  <User className="w-3 h-3" />
                </div>
                <span className="max-w-[110px] truncate">{profile?.fullName || 'Farmer'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 min-h-[40px] text-xs font-bold text-[#17231C] bg-white hover:bg-emerald-50 transition-all rounded-xl shadow-xs whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#176B45]" />
                <span className="hidden sm:inline">{t('nav_login', 'Sign In', 'உள்நுழைவு')}</span>
                <span className="sm:hidden">{t('btn_login_short', 'Login', 'நுழை')}</span>
              </button>
            )}

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[40px] min-w-[40px] text-white hover:bg-white/10 rounded-xl transition-colors md:hidden flex items-center justify-center cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-5 px-3 bg-[#135939] rounded-2xl border border-white/15 shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* View Switcher inside Mobile Menu */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/20 rounded-xl">
              <button
                onClick={() => {
                  onNavigateView('home');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  currentView === 'home' ? 'bg-white text-[#17231C]' : 'text-white'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('nav_home', 'Home', 'முகப்பு')}</span>
              </button>
              <button
                onClick={() => {
                  onNavigateView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  currentView === 'dashboard' ? 'bg-white text-[#17231C]' : 'text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{t('nav_dashboard', 'Dashboard', 'டாஷ்போர்டு')}</span>
              </button>
            </div>

            {/* Section Links */}
            <div className="flex flex-col gap-1 pt-1 border-t border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    onNavigateView('home');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10 font-semibold text-xs transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* User action in mobile menu */}
            <div className="pt-2 border-t border-white/10">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboardModal();
                  }}
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>{profile?.fullName || 'Profile Settings'}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 bg-white text-[#17231C] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  <LogIn className="w-4 h-4 text-[#176B45]" />
                  <span>{t('nav_login', 'Farmer Login / Register', 'உள்நுழைவு / பதிவு')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
