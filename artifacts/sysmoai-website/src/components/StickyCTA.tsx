import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { WA_URLS } from '@/lib/whatsapp';
import { SprintSlots } from '@/components/SprintSlots';
import { useTheme } from '@/contexts/ThemeContext';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const bg = isDark ? 'rgba(10,11,15,0.95)' : 'rgba(255,255,255,0.97)';
  const borderC = isDark ? 'rgba(30,41,59,1)' : 'rgba(226,232,240,1)';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#64748B';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-sm py-3 px-4 transition-all duration-300"
      style={{ background: bg, borderTop: `1px solid ${borderC}` }}>
      {/* Mobile-only slot row, since the descriptive text is hidden on mobile. */}
      <div className="sm:hidden max-w-5xl mx-auto mb-2 flex justify-center">
        <SprintSlots variant="compact" />
      </div>
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold" style={{ color: heading }}>Stop losing orders in your DMs.</p>
          <p className="text-xs" style={{ color: body }}>Free 30-min F-Commerce AI audit · No commitment</p>
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
