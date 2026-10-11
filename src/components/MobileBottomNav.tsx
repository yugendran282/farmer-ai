import React from 'react';
import { Home, LayoutDashboard, Sprout, ScanLine, MessageSquareQuote, CloudSun, ClipboardList } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomNavProps {
  currentView: 'home' | 'dashboard';
  onNavigateView: (view: 'home' | 'dashboard') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigateView,
  onNavigateSection,
}) => {
  const { t } = useLanguage();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8DF] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile Navigation Bar"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        {/* Home */}
        <button
          onClick={() => onNavigateView('home')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] cursor-pointer transition-colors ${
            currentView === 'home'
              ? 'text-[#176B45] font-bold'
              : 'text-[#526357] hover:text-[#17231C]'
          }`}
          aria-current={currentView === 'home' ? 'page' : undefined}
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] leading-none tracking-tight">{t('nav_home', 'Home', 'முகப்பு')}</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => onNavigateView('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] cursor-pointer transition-colors ${
            currentView === 'dashboard'
              ? 'text-[#176B45] font-bold'
              : 'text-[#526357] hover:text-[#17231C]'
          }`}
          aria-current={currentView === 'dashboard' ? 'page' : undefined}
        >
          <LayoutDashboard className={`w-5 h-5 ${currentView === 'dashboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] leading-none tracking-tight">{t('nav_dashboard', 'Dashboard', 'டாஷ்போர்டு')}</span>
        </button>

        {/* Advisor */}
        <button
          onClick={() => {
            onNavigateView('home');
            setTimeout(() => onNavigateSection('crop-recommendation'), 50);
          }}
          className="flex flex-col items-center justify-center gap-1 h-full min-h-[44px] text-[#526357] hover:text-[#176B45] cursor-pointer transition-colors"
        >
          <Sprout className="w-5 h-5 stroke-2" />
          <span className="text-[10px] leading-none tracking-tight">{t('bnav_crops', 'Advisor', 'பயிர்')}</span>
        </button>

        {/* Disease Scanner */}
        <button
          onClick={() => {
            onNavigateView('home');
            setTimeout(() => onNavigateSection('disease-scanner'), 50);
          }}
          className="flex flex-col items-center justify-center gap-1 h-full min-h-[44px] text-[#526357] hover:text-[#176B45] cursor-pointer transition-colors"
        >
          <ScanLine className="w-5 h-5 stroke-2" />
          <span className="text-[10px] leading-none tracking-tight">{t('bnav_scanner', 'Scan', 'ஸ்கேன்')}</span>
        </button>

        {/* Weather & Market */}
        <button
          onClick={() => {
            onNavigateView('home');
            setTimeout(() => onNavigateSection('weather-market'), 50);
          }}
          className="flex flex-col items-center justify-center gap-1 h-full min-h-[44px] text-[#526357] hover:text-[#176B45] cursor-pointer transition-colors"
        >
          <CloudSun className="w-5 h-5 stroke-2" />
          <span className="text-[10px] leading-none tracking-tight">{t('bnav_weather', 'Mandi', 'சந்தை')}</span>
        </button>
      </div>
    </nav>
  );
};
