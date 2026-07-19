import React from 'react';
import { Link } from 'wouter';
import { Mail, MessageCircle } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { WA_LINK, EMAIL } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { isDark } = useTheme();

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const borderC = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const textColor = isDark ? '#64748B' : '#94A3B8';
  const hoverColor = isDark ? '#FFFFFF' : '#0A0B0F';

  return (
    <footer style={{ background: bg, borderTop: `1px solid ${borderC}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <SYSmoAILogo size={32} variant={isDark ? 'brand-dark' : 'brand-light'} />
              <span style={{
                fontSize: 18,
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
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
              Founder-built AI systems for Bangladesh's growing businesses.
            </p>
            <p className="text-sm italic" style={{ color: isDark ? '#334155' : '#CBD5E1', fontFamily: "'Space Grotesk', sans-serif" }}>
              Systems in Motion.
            </p>
            <p className="text-sm" style={{ color: textColor }}>🇧🇩 Bangladesh · Validation Stage</p>

            <div className="space-y-2 pt-1">
              <a href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: textColor }}
                onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                <Mail size={14} />
                {EMAIL}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: textColor }}
                onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                <MessageCircle size={14} />
                +880 1711-638693
              </a>
            </div>
            <p className="text-xs leading-relaxed pt-1" style={{ color: isDark ? '#334155' : '#CBD5E1' }}>
              Service hours: 10 AM – Midnight (BST)<br />
              Reply within 2 hours on working days.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>Active Offer</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/lead-rescue', label: 'Lead Rescue System' },
                { href: '/fit-check',   label: 'Fit Check (Qualification)' },
                { href: '/how-we-work', label: 'How We Work' },
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

            <h3 className="text-sm font-bold uppercase tracking-[0.12em] pt-2" style={{ color: headingColor }}>Company</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/about',   label: 'About' },
                { href: '/blog',    label: 'Blog' },
                { href: '/faq',     label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
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

          {/* Column 3 — Context & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>Pilot Stage</h3>
            <p className="text-xs leading-relaxed" style={{ color: textColor }}>
              SYSmoAI is currently in active validation. The Lead Rescue System — Agency Edition is our first commercial pilot offering for Bangladesh micro digital agencies.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: isDark ? '#334155' : '#CBD5E1' }}>
              Case studies will be published only after real delivery and with client permission.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-[0.12em] pt-2" style={{ color: headingColor }}>Legal</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/privacy-policy',   label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
                { href: '/refund-policy',    label: 'Refund Policy' },
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
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm" style={{ borderTop: `1px solid ${borderC}` }}>
          <p style={{ color: isDark ? '#334155' : '#CBD5E1' }}>© 2026 SYSmoAI · Made in Bangladesh 🇧🇩</p>
          <div className="flex items-center gap-4" style={{ color: textColor }}>
            {[
              { href: '/privacy-policy',   label: 'Privacy' },
              { href: '/terms-of-service', label: 'Terms' },
              { href: '/refund-policy',    label: 'Refund' },
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
