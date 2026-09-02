import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { useTheme } from '@/contexts/ThemeContext';

const NAV_LINKS = [
  { href: '/services', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9' }}>
      {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-blue-500" />}
    </button>
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
  useEffect(() => { setMobileOpen(false); }, [location]);

  const bg = isDark ? 'rgba(10,11,15,0.96)' : 'rgba(255,255,255,0.96)';
  const border = isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0';
  const text = isDark ? '#94A3B8' : '#475569';
  const active = isDark ? '#FFFFFF' : '#0F172A';

  return (
    <header className="sticky top-0 z-40" style={{ background: bg, borderBottom: `1px solid ${border}`, backdropFilter: scrolled ? 'blur(20px)' : 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <SYSmoAILogo size={30} variant={isDark ? 'brand-dark' : 'brand-light'} />
          <span className="font-bold" style={{ color: active }}>SYSmoAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium rounded-lg"
              style={{ color: location === link.href ? active : text }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            Discuss a project
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
            className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ border: `1px solid ${border}` }}>
            {mobileOpen ? <X size={17} style={{ color: active }} /> : <Menu size={17} style={{ color: active }} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden" style={{ background: bg, borderTop: `1px solid ${border}` }}>
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="block px-4 py-3 rounded-xl text-sm font-medium"
                  style={{ color: location === link.href ? active : text }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
