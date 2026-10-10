import React from 'react';
import { Sprout, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17251D] text-white/80 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (Col-span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight font-sans text-white">
                FARMERS <span className="text-[#F2C14E]">AI</span>
              </span>
            </div>

            <p className="text-sm font-serif italic text-[#F2C14E]">
              Grow Smarter. Sell Better. Earn More.
            </p>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Connecting farmers with intelligent agricultural insights, transparent crop-selling opportunities, verified local buyers, and rewards for sustainable farming practices.
            </p>

            <div className="pt-2 text-[11px] text-white/50">
              Initial platform designed for Indian agricultural clusters. Powered by AgriConnect hyper-local intelligence.
            </div>
          </div>

          {/* Nav Column 1: Platform Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#market-dashboard" className="hover:text-white transition-colors">
                  AI Market Intelligence
                </a>
              </li>
              <li>
                <a href="#agriconnect" className="hover:text-white transition-colors">
                  AgriConnect Discovery
                </a>
              </li>
              <li>
                <a href="#crop-rewards" className="hover:text-white transition-colors">
                  Crop Practice Score
                </a>
              </li>
              <li>
                <a href="#marketplace" className="hover:text-white transition-colors">
                  Local Buyer Marketplace
                </a>
              </li>
              <li>
                <a href="#market-dashboard" className="hover:text-white transition-colors">
                  Net Return Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Commercial Partners */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Commercial Partners
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#dealers" className="hover:text-white transition-colors">
                  Dealer Promotion Plans
                </a>
              </li>
              <li>
                <a href="#dealers" className="hover:text-white transition-colors">
                  Fertilizer Brand Campaigns
                </a>
              </li>
              <li>
                <a href="#marketplace" className="hover:text-white transition-colors">
                  Buyer Verification Program
                </a>
              </li>
              <li>
                <a href="#dealers" className="hover:text-white transition-colors">
                  AgriConnect Trust Policy
                </a>
              </li>
              <li>
                <a href="#alerts" className="hover:text-white transition-colors">
                  WhatsApp Alerts System
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Trust & Governance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Farmer Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Data Governance & Consent
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Editorial Independence
                </span>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Help & FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <div>
            © {new Date().getFullYear()} FARMERS AI Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Prototype Demonstration Environment</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Spam Farmer Shield Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
