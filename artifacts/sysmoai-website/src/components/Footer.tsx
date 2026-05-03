import React, { useState } from 'react';
import { Link } from 'wouter';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { WA_LINK, EMAIL } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import { useCreateWaitlistSignup } from '@workspace/api-client-react';

export function Footer() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const createWaitlistSignup = useCreateWaitlistSignup();

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const borderC = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const textColor = isDark ? '#64748B' : '#94A3B8';
  const hoverColor = isDark ? '#FFFFFF' : '#0A0B0F';

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || waitlistStatus === 'loading') return;
    setWaitlistStatus('loading');
    try {
      await createWaitlistSignup.mutateAsync({ data: { email, source: 'footer' } });
      setWaitlistStatus('success');
      setEmail('');
    } catch {
      setWaitlistStatus('error');
    }
  };

  return (
    <footer style={{ background: bg, borderTop: `1px solid ${borderC}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">

        {/* Waitlist / Email capture */}
        <div className="mb-10 pb-10" style={{ borderBottom: `1px solid ${borderC}` }}>
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold mb-2" style={{ color: headingColor }}>
              F-Commerce AI tips — straight to your inbox
            </h3>
            <p className="text-sm mb-4" style={{ color: textColor }}>
              Weekly insights on automating DMs, orders, and payments for Bangladesh F-commerce sellers. Free.
            </p>
            {waitlistStatus === 'success' ? (
              <div className="px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: isDark ? 'rgba(34,197,94,0.1)' : '#F0FDF4', color: isDark ? '#86EFAC' : '#166534', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}` }}>
                ✅ You're on the list! We'll be in touch.
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleWaitlistSubmit}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)'}`,
                    color: isDark ? '#F1F5F9' : '#0A0B0F',
                  }}
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === 'loading'}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  {waitlistStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
            )}
            {waitlistStatus === 'error' && (
              <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>
            )}
            <p className="text-xs mt-2" style={{ color: isDark ? '#334155' : '#CBD5E1' }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <SYSmoAILogo size={32} variant={isDark ? 'brand-dark' : 'brand-light'} />
              <span style={{
                fontSize: 18,
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                color: isDark ? '#FFFFFF' : '#0A0B0F',
                letterSpacing: '-0.02em',
                display: 'inline-flex',
                alignItems: 'baseline',
              }}>
                <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
                <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
                <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: textColor }}>
              The F-Commerce Operating System. Built in Dhaka, for Dhaka.
            </p>
            <p className="text-sm italic" style={{ color: isDark ? '#334155' : '#CBD5E1', fontFamily: "'Space Grotesk', sans-serif" }}>
              Systems in Motion.
            </p>
            <p className="text-sm" style={{ color: textColor }}>🇧🇩 Dhaka, Bangladesh · Serving clients worldwide</p>

            {/* Social Media Links */}
            <div className="flex gap-3 pt-1">
              <a href="https://www.facebook.com/sysmoai"
                target="_blank" rel="noopener noreferrer"
                aria-label="SYSmoAI on Facebook"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9', color: textColor }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'; e.currentTarget.style.color = textColor; }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/sysmoai"
                target="_blank" rel="noopener noreferrer"
                aria-label="SYSmoAI on LinkedIn"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9', color: textColor }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'; e.currentTarget.style.color = textColor; }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@sysmoai"
                target="_blank" rel="noopener noreferrer"
                aria-label="SYSmoAI on YouTube"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9', color: textColor }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FF0000'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'; e.currentTarget.style.color = textColor; }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — F-Commerce Hub */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>F-Commerce</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/for/f-commerce',      label: 'F-Commerce Sellers' },
                { href: '/services/ai-sprint',  label: 'The AI Sprint (14 days)' },
                { href: '/services/ai-retainer',label: 'AI Retainer (৳20K/mo)' },
                { href: '/free-ai-audit',        label: 'Book Free Audit' },
                { href: '/pricing',              label: 'Pricing' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="transition-colors"
                    style={{ color: textColor }}
                    onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>Resources</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/proof',   label: 'Results & Proof' },
                { href: '/blog',    label: 'Blog' },
                { href: '/faq',     label: 'FAQ' },
                { href: '/about',   label: 'About Emon' },
                { href: '/contact', label: 'Contact' },
                { href: '/services', label: 'All Services' },
                { href: '/services/other-engagements', label: 'Other Engagements' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="transition-colors"
                    style={{ color: textColor }}
                    onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: textColor }}
                  onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                  data-testid="link-footer-email">
                  <Mail size={14} />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: textColor }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                  onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                  data-testid="link-footer-whatsapp">
                  <MessageCircle size={14} />
                  +880 1711-638693
                </a>
              </li>
              <li className="flex items-center gap-2" style={{ color: textColor }}>
                <MapPin size={14} />
                Dhaka, Bangladesh
              </li>
            </ul>
            <p className="text-xs leading-relaxed pt-2" style={{ color: isDark ? '#334155' : '#CBD5E1' }}>
              Service hours: 10 AM – Midnight (BST)<br />
              Reply within 2 hours on working days.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm" style={{ borderTop: `1px solid ${borderC}` }}>
          <p style={{ color: isDark ? '#334155' : '#CBD5E1' }}>© 2026 SYSmoAI · Made in Bangladesh 🇧🇩</p>
          <div className="flex items-center gap-4" style={{ color: textColor }}>
            {[
              { href: '/privacy-policy',   label: 'Privacy Policy' },
              { href: '/terms-of-service', label: 'Terms' },
              { href: '/refund-policy',    label: 'Refund Policy' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
