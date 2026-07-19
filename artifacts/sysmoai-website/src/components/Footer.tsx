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
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const waitlistMutation = useCreateWaitlistSignup();

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const borderC = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const textColor = isDark ? '#64748B' : '#94A3B8';
  const hoverColor = isDark ? '#FFFFFF' : '#0A0B0F';

  return (
    <footer style={{ background: bg, borderTop: `1px solid ${borderC}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        {/* Email capture */}
        <div className="mb-10 pb-10" style={{ borderBottom: `1px solid ${borderC}` }}>
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold mb-2" style={{ color: headingColor }}>Get AI tips for your business</h3>
            <p className="text-sm mb-4" style={{ color: textColor }}>
              Weekly insights on AI automation, Notion systems, and growing with AI. Free.
            </p>
            {subscribed ? (
              <p className="text-sm text-green-500 font-medium">✓ You're subscribed! Check your inbox for the first insight.</p>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  try {
                    await waitlistMutation.mutateAsync({
                      data: { email, source: 'footer-subscribe' },
                    });
                    setSubscribed(true);
                    setEmail('');
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : 'Subscription failed. Try again or WhatsApp us.',
                    );
                  }
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)'}`,
                    color: isDark ? '#F1F5F9' : '#0A0B0F',
                  }}
                />
                <button
                  type="submit"
                  disabled={waitlistMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  {waitlistMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {error && <p className="text-xs mt-2 text-red-500">{error}</p>}
            {!subscribed && !error && (
              <p className="text-xs mt-2" style={{ color: isDark ? '#334155' : '#CBD5E1' }}>No spam. Unsubscribe anytime.</p>
            )}
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
              AI-powered operating systems for ambitious businesses.
            </p>
            <p className="text-sm italic" style={{ color: isDark ? '#334155' : '#CBD5E1', fontFamily: "'Space Grotesk', sans-serif" }}>
              Systems in Motion.
            </p>
            <p className="text-sm" style={{ color: textColor }}>🇧🇩 Bangladesh · Serving clients worldwide</p>

            <div className="flex gap-3 pt-1">
              <a href="mailto:hello@sysmoai.com"
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: textColor }}
                onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
                ✉ hello@sysmoai.com
              </a>
            </div>
          </div>

          {/* Column 2 — Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/services/ai-quick-win',       label: 'AI Quick Win' },
                { href: '/services/ai-sprint',           label: 'AI Sprint' },
                { href: '/services/ai-retainer',         label: 'AI Retainer' },
                { href: '/services/notion-os',           label: 'Notion OS Build' },
                { href: '/services/ai-agent-dev',        label: 'AI Agent Dev' },
                { href: '/services/n8n-automation',      label: 'n8n Automation' },
                { href: '/services/ai-coaching',         label: '1:1 AI Coaching' },
                { href: '/services/corporate-training',  label: 'Corporate Training' },
                { href: '/services/international',       label: 'International Clients' },
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

          {/* Column 3 — Who We Help + Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: headingColor }}>Who We Help</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/for/students',     label: 'Students' },
                { href: '/for/job-seekers',  label: 'Job Seekers' },
                { href: '/for/freelancers',  label: 'Freelancers' },
                { href: '/for/sme-founders', label: 'SME Founders' },
                { href: '/for/f-commerce',   label: 'F-Commerce Sellers' },
                { href: '/for/agencies',     label: 'Digital Agencies' },
                { href: '/for/consultants',  label: 'Consultants' },
                { href: '/for/creators',     label: 'Content Creators' },
                { href: '/for/corporates',   label: 'Corporates' },
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
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] pt-2" style={{ color: headingColor }}>Resources</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/lead-rescue',  label: '🔬 Lead Rescue Pilot'  },
                { href: '/fit-check',    label: 'Fit Check'             },
                { href: '/free-ai-audit',label: 'Free AI Audit'         },
                { href: '/results',      label: 'Case Studies'          },
                { href: '/blog',         label: 'Blog'                  },
                { href: '/faq',          label: 'FAQ'                   },
                { href: '/pricing',      label: 'Pricing'               },
                { href: '/bn',          label: 'বাংলা'                 },
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
