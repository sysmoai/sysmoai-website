import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        <motion.div
          className="absolute -inset-2 bg-[#25D366] rounded-full opacity-30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <a
          href="https://wa.me/8801711638693"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20b858] transition-colors z-10"
          title="Chat on WhatsApp"
          data-testid="link-fab-whatsapp"
        >
          <MessageCircle size={28} />
        </a>
        
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
