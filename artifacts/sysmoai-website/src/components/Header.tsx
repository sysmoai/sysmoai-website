import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { useTheme } from '@/contexts/ThemeContext';

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

const navLinks = [
  { href: '/lead-rescue', label: 'Lead Rescue' },
  { href: '/about',       label: 'About' },
  { href: '/blog',        label: 'Blog' },
];

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
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <SYSmoAILogo size={30} variant={isDark ? 'brand-dark' : 'brand-light'} />
            <span style={{
              fontSize: 18,
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
              color: isDark ? '#FFFFFF' : '#0A0B0F',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              display: 'inline-flex',
              alignItems: 'baseline',
            }}>
              <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
              <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
              <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
                style={{
                  color: isActive(link.href) ? (isDark ? '#FFFFFF' : '#0A0B0F') : navText,
                  background: isActive(link.href) ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.06)') : 'transparent',
                }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/fit-check"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Fit Check নিন <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.06)',
                border: `1px solid ${borderColor}`,
                color: isDark ? '#94A3B8' : '#64748B',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: isDark ? '#0A0B0F' : '#FFFFFF', borderTop: `1px solid ${borderColor}` }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? '#2563EB' : (isDark ? '#94A3B8' : '#64748B'),
                    background: isActive(link.href) ? (isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF') : 'transparent',
                  }}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 pb-1">
                <Link href="/fit-check"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-all"
                >
                  Fit Check নিন <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
