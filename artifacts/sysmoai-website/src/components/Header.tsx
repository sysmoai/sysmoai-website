import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, X, MessageCircle, ChevronDown, ArrowRight, Sun, Moon,
  Target, Zap, Settings, Bot, Timer, RefreshCw, Layout, Building, Users, BookOpen, Globe,
  Star, ShoppingBag, Building2, Megaphone, Laptop, Users2, Video,
  FlaskConical, GraduationCap, Briefcase,
} from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { WA_LINK } from '@/lib/config';
import { WA_URLS } from '@/lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import {
  SERVICES_GROUPS, ALL_SERVICES_LINK, WHO_WE_HELP_GROUPS,
  BANGLADESH_GROUPS, HEADER_LINKS, HEADER_CTA,
  MOBILE_SECTIONS, MOBILE_LINKS,
} from '@/data/navigation';

/* ─── Icon map ─── */
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Zap, Settings, Bot, Timer, RefreshCw, Layout, Building, Users, BookOpen, Globe,
  Star, ShoppingBag, Building2, Megaphone, Laptop, Users2, Video,
  FlaskConical, GraduationCap, Briefcase, MessageCircle,
};

function Icon({ name, size = 13 }: { name: string; size?: number }) {
  const Comp = iconMap[name];
  if (!Comp) return null;
  return <Comp size={size} className="text-blue-400" />;
}

/* ─── Dropdown hook ─── */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const open_ = () => { clearTimeout(timer.current); setOpen(true); };
  const close_ = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return { open, open_, close_ };
}

const panelAnim = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -5, scale: 0.97, transition: { duration: 0.12, ease: 'easeIn' as const } },
};

/* ─── Mega panel wrapper ─── */
function Panel({ children, width = 'auto' }: { children: React.ReactNode; width?: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      style={{ width }}
    />
  );
}

/* ─── Services Panel ─── */
function ServicesPanel({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const bg = isDark ? '#0C1018' : '#FFFFFF';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)';
  const divider = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)';

  return (
    <Panel>
      <div style={{ background: bg, border: `1px solid ${border}`, minWidth: 600 }}>
        {/* Featured: Lead Rescue */}
        <div className="p-4 pb-0">
          <Link href="/lead-rescue" onClick={onClose}
            className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
            style={{ background: isDark ? 'rgba(245,158,11,0.1)' : '#FFFBEB', border: `1px solid ${isDark ? 'rgba(245,158,11,0.25)' : '#FDE68A'}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-500/20">
              <Target size={20} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color: isDark ? '#FBBF24' : '#92400E' }}>Lead Rescue</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500">Popular</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: isDark ? '#D4A04A' : '#78350F' }}>
                Stop losing leads after they contact you — centralized capture and follow-up
              </p>
            </div>
            <ArrowRight size={16} className="text-amber-400 shrink-0" />
          </Link>
        </div>

        {/* Groups */}
        <div className="p-4 grid grid-cols-2 gap-4">
          {SERVICES_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2 px-1"
                style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className="group flex items-center gap-3 px-2 py-2 rounded-xl transition-all"
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(37,99,235,0.12)' }}>
                      {item.icon && <Icon name={item.icon} />}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold leading-tight flex items-center gap-1.5"
                        style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                        {item.label}
                        {item.badge && (
                          <span className="text-[9px] font-semibold px-1 py-0.5 rounded-full"
                            style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>{item.badge}</span>
                        )}
                      </div>
                      {item.desc && (
                        <div className="text-[11px] leading-tight mt-0.5" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 flex items-center justify-between"
          style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(248,250,252,0.8)', borderTop: `1px solid ${divider}` }}>
          <span className="text-[11px]" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            {ALL_SERVICES_LINK.desc}
          </span>
          <Link href={ALL_SERVICES_LINK.href} onClick={onClose}
            className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            {ALL_SERVICES_LINK.label} <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </Panel>
  );
}

/* ─── Who We Help Panel ─── */
function AudiencePanel({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const bg = isDark ? '#0C1018' : '#FFFFFF';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)';

  return (
    <Panel>
      <div style={{ background: bg, border: `1px solid ${border}`, minWidth: 500 }}>
        <div className="p-4 grid grid-cols-3 gap-4">
          {WHO_WE_HELP_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-2 py-2 rounded-xl transition-all"
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)' }}>
                      {item.icon && <Icon name={item.icon} />}
                    </div>
                    <span className="text-[13px] font-medium" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 flex items-center justify-between"
          style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(248,250,252,0.8)', borderTop: `1px solid ${border}` }}>
          <span className="text-[11px]" style={{ color: isDark ? '#475569' : '#94A3B8' }}>Every business and professional</span>
          <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-semibold text-[#25D366] hover:text-[#20b858] transition-colors">
            <MessageCircle size={10} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </Panel>
  );
}

/* ─── Bangladesh Panel ─── */
function BangladeshPanel({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const bg = isDark ? '#0C1018' : '#FFFFFF';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)';

  return (
    <Panel>
      <div style={{ background: bg, border: `1px solid ${border}`, minWidth: 480 }}>
        <div className="p-4 grid grid-cols-3 gap-4">
          {BANGLADESH_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className="group flex items-center gap-2.5 px-2 py-2 rounded-xl transition-all"
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)' }}>
                      {item.icon && <Icon name={item.icon} />}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium leading-tight" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                        {item.label}
                      </div>
                      {item.desc && (
                        <div className="text-[10px] leading-tight mt-0.5" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 flex items-center justify-between"
          style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(248,250,252,0.8)', borderTop: `1px solid ${border}` }}>
          <span className="text-[11px]" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            Locally built AI for Bangladesh
          </span>
          <div className="flex items-center gap-3">
            <Link href="/bangladesh" onClick={onClose}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Overview
            </Link>
            <Link href="/bn" onClick={onClose}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              বাংলা
            </Link>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ─── Theme Toggle ─── */
function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <motion.button onClick={toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
      style={{
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(37,99,235,0.14)'}`,
      }}>
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div key="sun" initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.22 }}>
            <Sun size={15} className="text-amber-400" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.22 }}>
            <Moon size={15} className="text-blue-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Dropdown wrapper ─── */
function DropdownTrigger({ label, isOpen, onMouseEnter, onMouseLeave }: {
  label: string; isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const { isDark } = useTheme();
  return (
    <button
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
      style={{
        color: isOpen ? (isDark ? '#FFFFFF' : '#0A0B0F') : (isDark ? '#94A3B8' : '#64748B'),
        background: isOpen ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.06)') : 'transparent',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-expanded={isOpen}
    >
      {label}
      <ChevronDown size={13} strokeWidth={2.5}
        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

/* ═══════════════════════════════════════════════
   MAIN HEADER
═══════════════════════════════════════════════ */
export function Header() {
  const { isDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const svc = useDropdown();
  const aud = useDropdown();
  const bd = useDropdown();
  const closeAll = () => { svc.close_(); aud.close_(); bd.close_(); };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); setMobileSection(null); }, [location]);

  const isActive = (href: string) => href === '/' ? location === '/' : location.startsWith(href);

  const headerBg = isDark
    ? scrolled ? 'rgba(8,10,15,0.96)' : '#0A0B0F'
    : scrolled ? 'rgba(255,255,255,0.96)' : '#FAFBFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.1)';
  const navText = isDark ? '#94A3B8' : '#64748B';
  const navTextHover = isDark ? '#FFFFFF' : '#0A0B0F';

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-300"
      style={{
        background: headerBg,
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
        boxShadow: scrolled ? (isDark ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(37,99,235,0.08)') : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] md:h-[66px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-home-logo">
            <SYSmoAILogo size={30} variant={isDark ? 'brand-dark' : 'brand-light'} />
            <span style={{
              fontSize: 18,
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
              fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
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
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {/* Services */}
            <div className="relative"
              onMouseEnter={() => { aud.close_(); bd.close_(); svc.open_(); }}
              onMouseLeave={svc.close_}>
              <DropdownTrigger label="Services" isOpen={svc.open}
                onMouseEnter={svc.open_} onMouseLeave={svc.close_} />
              {svc.open && <div className="absolute inset-x-0 top-full h-3" onMouseEnter={svc.open_} onMouseLeave={svc.close_} />}
              <AnimatePresence>
                {svc.open && (
                  <motion.div key="svc" variants={panelAnim} initial="hidden" animate="visible" exit="exit"
                    className="absolute left-0 top-[calc(100%+10px)] z-50"
                    onMouseEnter={svc.open_} onMouseLeave={svc.close_}>
                    <ServicesPanel onClose={closeAll} isDark={isDark} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Who We Help */}
            <div className="relative"
              onMouseEnter={() => { svc.close_(); bd.close_(); aud.open_(); }}
              onMouseLeave={aud.close_}>
              <DropdownTrigger label="Who We Help" isOpen={aud.open}
                onMouseEnter={aud.open_} onMouseLeave={aud.close_} />
              {aud.open && <div className="absolute inset-x-0 top-full h-3" onMouseEnter={aud.open_} onMouseLeave={aud.close_} />}
              <AnimatePresence>
                {aud.open && (
                  <motion.div key="aud" variants={panelAnim} initial="hidden" animate="visible" exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50"
                    onMouseEnter={aud.open_} onMouseLeave={aud.close_}>
                    <AudiencePanel onClose={closeAll} isDark={isDark} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bangladesh */}
            <div className="relative"
              onMouseEnter={() => { svc.close_(); aud.close_(); bd.open_(); }}
              onMouseLeave={bd.close_}>
              <DropdownTrigger label="Bangladesh / বাংলা" isOpen={bd.open}
                onMouseEnter={bd.open_} onMouseLeave={bd.close_} />
              {bd.open && <div className="absolute inset-x-0 top-full h-3" onMouseEnter={bd.open_} onMouseLeave={bd.close_} />}
              <AnimatePresence>
                {bd.open && (
                  <motion.div key="bd" variants={panelAnim} initial="hidden" animate="visible" exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50"
                    onMouseEnter={bd.open_} onMouseLeave={bd.close_}>
                    <BangladeshPanel onClose={closeAll} isDark={isDark} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simple links */}
            {HEADER_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150"
                style={{ color: isActive(l.href) ? (isDark ? '#FFFFFF' : '#0A0B0F') : navText }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = navTextHover; closeAll(); }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive(l.href) ? navTextHover : navText; }}>
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href={HEADER_CTA.href}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] whitespace-nowrap">
              <MessageCircle size={15} />
              {HEADER_CTA.label}
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ color: isDark ? '#94A3B8' : '#64748B', background: mobileOpen ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.06)') : 'transparent' }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              data-testid="button-mobile-menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:hidden fixed inset-x-0 top-[60px] bottom-0 z-50 overflow-y-auto"
            style={{ background: isDark ? '#0A0B0F' : '#FAFBFF' }}>
            <div className="px-4 pt-3 pb-12 space-y-1">

              {/* Services accordion */}
              <button onClick={() => setMobileSection(mobileSection === 'svc' ? null : 'svc')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold rounded-xl transition-colors"
                style={{ color: isDark ? '#E2E8F0' : '#1E293B', background: mobileSection === 'svc' ? (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)') : 'transparent' }}>
                Services
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileSection === 'svc' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'svc' && (
                <div className="ml-2 pb-2 space-y-3">
                  {/* Featured: Lead Rescue */}
                  <Link href="/lead-rescue" className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: isDark ? 'rgba(245,158,11,0.1)' : '#FFFBEB', border: `1px solid ${isDark ? 'rgba(245,158,11,0.2)' : '#FDE68A'}` }}>
                    <Target size={18} className="text-amber-500 shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-amber-500">Lead Rescue</span>
                      <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500">Popular</span>
                    </div>
                  </Link>
                  {SERVICES_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5"
                        style={{ color: isDark ? '#475569' : '#94A3B8' }}>{group.title}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {group.items.map((item) => (
                          <Link key={item.href} href={item.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-xl transition-colors"
                            style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                            {item.icon && <Icon name={item.icon} size={14} />}
                            <span className="font-medium leading-tight">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link href="/services" className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-blue-500">
                    View All Services <ArrowRight size={13} />
                  </Link>
                </div>
              )}

              {/* Who We Help accordion */}
              <button onClick={() => setMobileSection(mobileSection === 'aud' ? null : 'aud')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold rounded-xl transition-colors"
                style={{ color: isDark ? '#E2E8F0' : '#1E293B', background: mobileSection === 'aud' ? (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)') : 'transparent' }}>
                Who We Help
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileSection === 'aud' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'aud' && (
                <div className="ml-2 pb-2">
                  {WHO_WE_HELP_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2"
                        style={{ color: isDark ? '#475569' : '#94A3B8' }}>{group.title}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {group.items.map((item) => (
                          <Link key={item.href} href={item.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-xl transition-colors"
                            style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                            {item.icon && <Icon name={item.icon} size={14} />}
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bangladesh accordion */}
              <button onClick={() => setMobileSection(mobileSection === 'bd' ? null : 'bd')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold rounded-xl transition-colors"
                style={{ color: isDark ? '#E2E8F0' : '#1E293B', background: mobileSection === 'bd' ? (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)') : 'transparent' }}>
                Bangladesh / বাংলা
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileSection === 'bd' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'bd' && (
                <div className="ml-2 pb-2">
                  {BANGLADESH_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2"
                        style={{ color: isDark ? '#475569' : '#94A3B8' }}>{group.title}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {group.items.map((item) => (
                          <Link key={item.href} href={item.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-xl transition-colors"
                            style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                            {item.icon && <Icon name={item.icon} size={14} />}
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Simple links */}
              {MOBILE_LINKS.map((l) => (
                <Link key={l.href} href={l.href}
                  className="block px-4 py-3.5 text-[15px] font-medium rounded-xl transition-colors"
                  style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                  {l.label}
                </Link>
              ))}

              <div className="pt-4">
                <Link href={HEADER_CTA.href}
                  className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-4 rounded-xl font-bold w-full text-base transition-colors">
                  <MessageCircle size={20} />
                  {HEADER_CTA.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
