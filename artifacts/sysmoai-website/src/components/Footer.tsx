import React from 'react';
import { Link } from 'wouter';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';

const WA_LINK = "https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%27m%20interested%20in%20your%20AI%20services.";

export function Footer() {
  const currentYear = new Date().getFullYear(); // Typically dynamic, but task asks for © 2026, let's use 2026 per spec
  
  return (
    <footer className="bg-[#0A0B0F] text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <SYSmoAILogo size={32} />
              <SYSmoAIWordmark darkMode={true} />
            </div>
            <p className="text-gray-300 font-medium">AI Systems That Work For You</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-[-0.02em]">Company</h3>
            <ul className="space-y-2">
              <li>SYSmoAI Pvt Ltd</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-[-0.02em]">Contact & Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@sysmoai.com" className="hover:text-white transition-colors" data-testid="link-footer-email">
                  support@sysmoai.com
                </a>
              </li>
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" data-testid="link-footer-whatsapp">
                  WhatsApp: +880 1711-638693
                </a>
              </li>
              <li>
                <div className="flex gap-4 mt-4">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                  <Link href="/about" className="hover:text-white transition-colors">About</Link>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 SYSmoAI Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
