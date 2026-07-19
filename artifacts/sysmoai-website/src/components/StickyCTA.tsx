import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { WA_URLS } from '@/lib/whatsapp';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0B0F]/95 backdrop-blur-sm border-t border-slate-800 py-3 px-4 transition-all duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-white text-sm font-semibold">Lead Rescue System — Agency Edition</p>
          <p className="text-slate-400 text-xs">15-minute Fit Check · Qualification only · Free</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/fit-check"
            className="flex-1 sm:flex-none text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Take the Fit Check
          </Link>
          <a href={WA_URLS.fitcheck}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center border border-green-500 text-green-400 hover:bg-green-500 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
