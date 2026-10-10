import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenSignIn: () => void;
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onOpenSignIn, onOpenPartner }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: 'Platform', href: '#platform' },
    { label: 'AI Intelligence', href: '#market-dashboard' },
    { label: 'Market Insights', href: '#agriconnect' },
    { label: 'Crop Rewards', href: '#crop-rewards' },
    { label: 'Dealer Network', href: '#dealers' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#143D2B]/95 backdrop-blur-md border-b border-[#DDF3E4]/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
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

          {/* Zone 2: Navigation Links (Single Line) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
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

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPartner}
              className="text-xs font-semibold text-[#F2C14E] hover:text-white transition-colors px-3 py-2 rounded-lg border border-[#F2C14E]/30 hover:border-[#F2C14E] hover:bg-white/5 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>Partner Program</span>
            </button>
            <button
              onClick={onOpenSignIn}
              className="text-sm font-medium text-white/90 hover:text-white whitespace-nowrap transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Sign In
            </button>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2.5 text-sm font-semibold text-[#143D2B] bg-[#F2C14E] hover:bg-[#e5b33d] transition-all rounded-lg shadow-sm whitespace-nowrap flex items-center gap-2 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 pb-6 px-4 bg-[#143D2B] rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-base transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartner();
                }}
                className="w-full text-center py-2.5 text-[#F2C14E] font-semibold text-sm rounded-lg hover:bg-white/10 transition-colors border border-[#F2C14E]/30"
              >
                AgriConnect Partner Program
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
                className="w-full text-center py-2.5 text-white/90 hover:text-white font-medium text-sm rounded-lg hover:bg-white/10 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 bg-[#F2C14E] text-[#143D2B] font-semibold text-sm rounded-lg text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
