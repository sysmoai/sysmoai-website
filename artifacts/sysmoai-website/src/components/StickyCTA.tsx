import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { WA_URLS } from '@/lib/whatsapp';
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
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: heading }}>Have a workflow worth automating?</p>
          <p className="text-xs" style={{ color: body }}>Scope, deliverables, and commercial terms are confirmed in writing per engagement.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/contact"
            className="flex-1 sm:flex-none text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Discuss a project
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
