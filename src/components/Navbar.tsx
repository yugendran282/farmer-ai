import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X, ArrowRight, Globe, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenDashboard, onOpenPartner }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, profile } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_recommendation', 'Crop Advisor'), href: '#crop-recommendation' },
    { label: t('nav_disease', 'Disease Scanner'), href: '#disease-scanner' },
    { label: t('nav_assistant', 'FARMERS AI'), href: '#farming-assistant' },
    { label: t('nav_weather', 'Weather & Markets'), href: '#weather-market' },
    { label: t('nav_records', 'Records'), href: '#records-reminders' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#143D2B]/95 backdrop-blur-md border-b border-[#DDF3E4]/10 shadow-lg py-3'
          : 'bg-[#143D2B]/90 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C14E] rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4CAF50] to-[#1B5E20] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                FARMERS <span className="text-[#F2C14E]">AI</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-white/90">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 text-white/80 hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#F2C14E] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Auth */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-white/10 p-1 rounded-lg border border-white/10 text-xs font-bold text-white">
              <Globe className="w-3.5 h-3.5 text-[#F2C14E] mx-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded cursor-pointer ${language === 'en' ? 'bg-[#F2C14E] text-[#143D2B]' : 'hover:text-[#F2C14E]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2 py-0.5 rounded cursor-pointer ${language === 'ta' ? 'bg-[#F2C14E] text-[#143D2B]' : 'hover:text-[#F2C14E]'}`}
              >
                தமிழ்
              </button>
            </div>

            {user ? (
              <button
                onClick={onOpenDashboard}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <User className="w-4 h-4" />
                <span>{profile?.fullName || 'Dashboard'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-bold text-[#143D2B] bg-[#F2C14E] hover:bg-[#e5b33d] transition-all rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('nav_login', 'Farmer Login / Register')}</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 px-4 bg-[#143D2B] rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white/80">Language / மொழி:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded ${language === 'en' ? 'bg-[#F2C14E] text-[#143D2B]' : 'text-white bg-white/10'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`px-3 py-1 text-xs font-bold rounded ${language === 'ta' ? 'bg-[#F2C14E] text-[#143D2B]' : 'text-white bg-white/10'}`}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-semibold text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 bg-[#F2C14E] text-[#143D2B] font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t('nav_login', 'Farmer Login / Register')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
