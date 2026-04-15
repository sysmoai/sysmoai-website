import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const COOKIE_KEY = 'sysmoai_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-4 left-4 z-[9998] max-w-sm w-[calc(100%-2rem)] sm:w-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm text-slate-300 leading-relaxed">
                We use cookies to improve your experience on our site.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={accept}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={decline}
                  className="px-4 py-1.5 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
            <button
              onClick={decline}
              className="text-slate-500 hover:text-slate-300 transition-colors mt-0.5 shrink-0"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
