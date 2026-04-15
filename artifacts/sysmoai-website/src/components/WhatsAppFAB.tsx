import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { WA_URLS } from '@/lib/whatsapp';

export function WhatsAppFAB() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      setStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={`fixed right-6 z-50 flex flex-col items-center gap-3 transition-all duration-300 ${stickyVisible ? 'bottom-20' : 'bottom-6'}`}>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-11 h-11 bg-gray-800/90 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all hover:scale-110 backdrop-blur-sm"
          aria-label="Back to top"
          data-testid="button-back-to-top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <div className="relative group">
        <span className="absolute -inset-2 bg-[#25D366] rounded-full opacity-30 animate-wa-pulse" />
        <a
          href={WA_URLS.general}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20b858] text-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
          aria-label="Chat with SYSmoAI on WhatsApp"
          title="Chat on WhatsApp"
          data-testid="link-fab-whatsapp"
        >
          <MessageCircle size={28} />
        </a>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
        </div>
      </div>
    </div>
  );
}
