import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { WA_LINK } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';

const NAV_LINKS = [
  { href: '/for/f-commerce', label: 'F-Commerce' },
  { href: '/services/ai-sprint', label: 'The Sprint' },
  { href: '/proof', label: 'Proof' },
  { href: '/about', label: 'About' },
];

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
      style={{
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(37,99,235,0.14)'}`,
      }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div key="sun" initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.22 }}>
            <Sun size={15} className="text-amber-400" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ opacity: 0, rotate: 90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0.7 }} transition={{ duration: 0.22 }}>
            <Moon size={15} className="text-blue-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Header() {
  const { isDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (href: string) => href === '/' ? location === '/' : location.startsWith(href);

  const headerBg = isDark
    ? scrolled ? 'rgba(8,10,15,0.96)' : '#0A0B0F'
    : scrolled ? 'rgba(255,255,255,0.96)' : '#FAFBFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.1)';
  const navText = isDark ? '#94A3B8' : '#64748B';

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-300"
      style={{
        background: headerBg,
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
        boxShadow: scrolled ? (isDark ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(37,99,235,0.08)') : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] md:h-[66px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-home-logo">
            <SYSmoAILogo size={30} variant={isDark ? 'brand-dark' : 'brand-light'} />
            <span
              style={{
                fontSize: 18,
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                color: isDark ? '#FFFFFF' : '#0A0B0F',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
              <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
              <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
                style={{
                  color: isActive(link.href) ? (isDark ? '#FFFFFF' : '#0A0B0F') : navText,
                  background: isActive(link.href) ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.06)') : 'transparent',
                  fontWeight: isActive(link.href) ? 600 : 500,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/free-ai-audit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: '#FFFFFF',
                boxShadow: '0 2px 12px rgba(37,99,235,0.35)',
              }}
            >
              Get Free Audit
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile: right side */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)', border: `1px solid ${borderColor}` }}
            >
              {mobileOpen ? <X size={17} style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }} /> : <Menu size={17} style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: isDark ? '#08090E' : '#FFFFFF', borderTop: `1px solid ${borderColor}` }}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? '#3B82F6' : (isDark ? '#94A3B8' : '#64748B'),
                    background: isActive(link.href) ? (isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.06)') : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 pb-1 space-y-2">
                <Link
                  href="/free-ai-audit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}
                >
                  Get Free F-Commerce Audit
                  <ArrowRight size={14} />
                </Link>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
                  style={{ background: isDark ? 'rgba(37,211,102,0.1)' : 'rgba(37,211,102,0.08)', color: '#25D366', border: '1px solid rgba(37,211,102,0.25)' }}
                >
                  💬 WhatsApp Us
                </a>
              </div>

              <div className="pt-2 pb-1 border-t" style={{ borderColor }}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { href: '/blog', label: 'Blog' },
                    { href: '/pricing', label: 'Pricing' },
                    { href: '/faq', label: 'FAQ' },
                    { href: '/contact', label: 'Contact' },
                    { href: '/services', label: 'All Services' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ color: isDark ? '#64748B' : '#94A3B8', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
