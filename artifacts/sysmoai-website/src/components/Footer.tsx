import { Link } from 'wouter';
import { Mail, MapPin } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { EMAIL } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { isDark } = useTheme();
  const bg = isDark ? '#0A0B0F' : '#F8FAFC';
  const border = isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0';
  const heading = isDark ? '#F8FAFC' : '#0F172A';
  const text = isDark ? '#64748B' : '#64748B';

  return (
    <footer style={{ background: bg, borderTop: `1px solid ${border}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <SYSmoAILogo size={30} variant={isDark ? 'brand-dark' : 'brand-light'} />
              <span className="font-bold" style={{ color: heading }}>SYSmoAI</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mt-4" style={{ color: text }}>
              Bangladesh-based AI systems and automation practice. Scope first, then build.
            </p>
            <div className="mt-5 space-y-2 text-sm" style={{ color: text }}>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-blue-500"><Mail size={15} />{EMAIL}</a>
              <div className="flex items-center gap-2"><MapPin size={15} />Dhaka, Bangladesh</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: heading }}>Explore</h3>
            <div className="space-y-2 text-sm">
              <Link href="/services" className="block hover:text-blue-500" style={{ color: text }}>Capabilities</Link>
              <Link href="/about" className="block hover:text-blue-500" style={{ color: text }}>About</Link>
              <Link href="/blog" className="block hover:text-blue-500" style={{ color: text }}>Blog</Link>
              <Link href="/contact" className="block hover:text-blue-500" style={{ color: text }}>Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: heading }}>Policies</h3>
            <div className="space-y-2 text-sm">
              <Link href="/privacy-policy" className="block hover:text-blue-500" style={{ color: text }}>Privacy</Link>
              <Link href="/terms-of-service" className="block hover:text-blue-500" style={{ color: text }}>Terms</Link>
              <Link href="/refund-policy" className="block hover:text-blue-500" style={{ color: text }}>Commercial terms notice</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 text-xs flex flex-col sm:flex-row gap-2 justify-between" style={{ color: text, borderTop: `1px solid ${border}` }}>
          <span>© 2026 SYSmoAI. All rights reserved.</span>
          <span>Project-specific claims and commercial terms are governed by the written engagement scope.</span>
        </div>
      </div>
    </footer>
  );
}
