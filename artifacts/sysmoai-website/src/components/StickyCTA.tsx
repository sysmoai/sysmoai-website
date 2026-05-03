import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { WA_URLS } from '@/lib/whatsapp';
import { SprintSlots } from '@/components/SprintSlots';

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
      {/* Mobile-only slot row, since the descriptive text is hidden on mobile. */}
      <div className="sm:hidden max-w-5xl mx-auto mb-2 flex justify-center">
        <SprintSlots variant="compact" />
      </div>
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-white text-sm font-semibold">Stop losing orders in your DMs.</p>
          <p className="text-slate-400 text-xs">Free 30-min F-Commerce AI audit · No commitment</p>
          <SprintSlots variant="compact" className="mt-1" />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/free-ai-audit"
            className="flex-1 sm:flex-none text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Book Free Audit
          </Link>
          <a href={WA_URLS.general}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center border border-green-500 text-green-400 hover:bg-green-500 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
