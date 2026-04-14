import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, X, MessageCircle, ChevronDown, ArrowRight,
  Zap, Timer, RefreshCw, Users, BookOpen, Layout, Bot, Settings, Building, Globe,
  GraduationCap, Briefcase, Laptop, FlaskConical, Building2, ShoppingBag, Users2,
  Megaphone, Video, Star,
} from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';
import { WA_LINK } from '@/lib/config';

/* ─── DATA ─── */

const servicesList = [
  { href: '/services/ai-quick-win',      icon: Zap,       label: 'AI Quick Win',        desc: '1 workflow automated in 3 days' },
  { href: '/services/ai-sprint',         icon: Timer,     label: 'AI Sprint',            desc: 'Full AI stack in 14 days' },
  { href: '/services/ai-retainer',       icon: RefreshCw, label: 'AI Retainer',          desc: 'Ongoing AI management monthly' },
  { href: '/services/notion-os',         icon: Layout,    label: 'Notion OS Build',      desc: 'Your business in one workspace' },
  { href: '/services/n8n-automation',    icon: Settings,  label: 'n8n Automation',       desc: 'Connect & automate your tools' },
  { href: '/services/ai-agent-dev',      icon: Bot,       label: 'AI Agent Dev',         desc: 'Custom agents that work 24/7' },
  { href: '/services/ai-coaching',       icon: Users,     label: '1:1 AI Coaching',      desc: 'Personalised 60-min sessions' },
  { href: '/services/group-workshop',    icon: BookOpen,  label: 'Group Workshop',       desc: 'Team upskilling, half-day' },
  { href: '/services/corporate-training',icon: Building,  label: 'Corporate Training',   desc: 'Enterprise-wide AI adoption' },
  { href: '/services/international',     icon: Globe,     label: 'International',        desc: 'USD pricing · global delivery' },
];

const individualsCol = [
  { href: '/for/students',    icon: GraduationCap, label: 'Students' },
  { href: '/for/job-seekers', icon: Briefcase,     label: 'Job Seekers' },
  { href: '/for/freelancers', icon: Laptop,        label: 'Freelancers' },
  { href: '/for/researchers', icon: FlaskConical,  label: 'Researchers' },
  { href: '/for/creators',    icon: Video,         label: 'Creators' },
];

const businessCol = [
  { href: '/for/sme-founders', icon: Star,      label: 'SME Founders' },
  { href: '/for/f-commerce',   icon: ShoppingBag,label: 'F-Commerce' },
  { href: '/for/agencies',     icon: Building2,  label: 'Digital Agencies' },
  { href: '/for/consultants',  icon: Users2,     label: 'Consultants' },
  { href: '/for/corporates',   icon: Megaphone,  label: 'Corporates & NGOs' },
];

/* ─── PANEL ANIMATION ─── */
const panelAnim = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -5, scale: 0.97, transition: { duration: 0.12, ease: 'easeIn' } },
};

/* ─── DROPDOWN HOOK ─── */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const open_  = () => { clearTimeout(timer.current); setOpen(true); };
  const close_ = () => { timer.current = setTimeout(() => setOpen(false), 100); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return { open, open_, close_ };
}

/* ═══════════════════════════════════════════════
   SERVICES PANEL  —  left-aligned, 2 columns
═══════════════════════════════════════════════ */
function ServicesPanel({ onClose }: { onClose: () => void }) {
  const half = Math.ceil(servicesList.length / 2);
  const col1 = servicesList.slice(0, half);
  const col2 = servicesList.slice(half);

  return (
    <div className="w-[580px] overflow-hidden rounded-2xl bg-[#0C1018] border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
      <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="bg-[#0C1018] p-4 space-y-0.5">
            {col.map((s) => (
              <Link key={s.href} href={s.href} onClick={onClose}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all duration-150">
                <div className="w-7 h-7 rounded-lg bg-blue-600/[0.12] flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 transition-colors">
                  <s.icon size={13} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-slate-100 group-hover:text-white leading-tight">{s.label}</div>
                  <div className="text-[11px] text-slate-500 leading-tight">{s.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="px-5 py-3 bg-slate-900/40 border-t border-white/[0.05] flex items-center justify-between">
        <span className="text-[11px] text-slate-500">All 10 services — fixed pricing, guaranteed results</span>
        <Link href="/services" onClick={onClose}
          className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          View all <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WHO WE HELP PANEL  —  Individuals | Business
═══════════════════════════════════════════════ */
function AudiencePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[440px] overflow-hidden rounded-2xl bg-[#0C1018] border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
      <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
        {/* Individuals */}
        <div className="bg-[#0C1018] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 px-2 mb-2">Individuals</p>
          <div className="space-y-0.5">
            {individualsCol.map((a) => (
              <Link key={a.href} href={a.href} onClick={onClose}
                className="group flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all duration-150">
                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 transition-colors">
                  <a.icon size={12} className="text-blue-400" />
                </div>
                <span className="text-[13px] font-medium text-slate-300 group-hover:text-white transition-colors">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
        {/* Business */}
        <div className="bg-[#0C1018] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 px-2 mb-2">Business</p>
          <div className="space-y-0.5">
            {businessCol.map((a) => (
              <Link key={a.href} href={a.href} onClick={onClose}
                className="group flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all duration-150">
                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 transition-colors">
                  <a.icon size={12} className="text-blue-400" />
                </div>
                <span className="text-[13px] font-medium text-slate-300 group-hover:text-white transition-colors">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 py-3 bg-slate-900/40 border-t border-white/[0.05] flex items-center justify-between">
        <span className="text-[11px] text-slate-500">10 audience profiles · every situation covered</span>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={onClose}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#25D366] hover:text-[#20b858] transition-colors">
          <MessageCircle size={10} /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN HEADER
═══════════════════════════════════════════════ */
export function Header() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled]           = useState(false);
  const [location]                        = useLocation();

  const svc = useDropdown();
  const aud = useDropdown();

  const closeAll = () => { svc.close_(); aud.close_(); };

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

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-[#080A0F]/96 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.5)]'
        : 'bg-[#0A0B0F] border-b border-white/[0.06]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] md:h-[66px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-home-logo">
            <SYSmoAILogo size={30} />
            <SYSmoAIWordmark darkMode />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">

            {/* ── SERVICES ── */}
            <div className="relative"
              onMouseEnter={() => { aud.close_(); svc.open_(); }}
              onMouseLeave={svc.close_}
              data-testid="dropdown-services"
            >
              <button className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                svc.open ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`} aria-expanded={svc.open}>
                Services
                <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${svc.open ? 'rotate-180' : ''}`} />
              </button>
              {svc.open && <div className="absolute inset-x-0 top-full h-3 z-40" onMouseEnter={svc.open_} onMouseLeave={svc.close_} />}
              <AnimatePresence>
                {svc.open && (
                  <motion.div key="svc" variants={panelAnim} initial="hidden" animate="visible" exit="exit"
                    className="absolute left-0 top-[calc(100%+10px)] z-50"
                    onMouseEnter={svc.open_} onMouseLeave={svc.close_}>
                    <ServicesPanel onClose={closeAll} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── WHO WE HELP ── */}
            <div className="relative"
              onMouseEnter={() => { svc.close_(); aud.open_(); }}
              onMouseLeave={aud.close_}
              data-testid="dropdown-audiences"
            >
              <button className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                aud.open ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`} aria-expanded={aud.open}>
                Who We Help
                <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${aud.open ? 'rotate-180' : ''}`} />
              </button>
              {aud.open && <div className="absolute inset-x-0 top-full h-3 z-40" onMouseEnter={aud.open_} onMouseLeave={aud.close_} />}
              <AnimatePresence>
                {aud.open && (
                  <motion.div key="aud" variants={panelAnim} initial="hidden" animate="visible" exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50"
                    onMouseEnter={aud.open_} onMouseLeave={aud.close_}>
                    <AudiencePanel onClose={closeAll} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static links */}
            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/proof',   label: 'Results' },
              { href: '/about',   label: 'About'   },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive(l.href) ? 'text-white' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
                data-testid={`link-nav-${l.label.toLowerCase()}`}
                onMouseEnter={closeAll}
              >
                {l.label}
                {isActive(l.href) && <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-blue-500 rounded-full" />}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              data-testid="link-header-whatsapp"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ead57] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] whitespace-nowrap">
              <MessageCircle size={15} />
              Free AI Audit
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#0A0B0F] z-50 overflow-y-auto"
          >
            <div className="px-4 pt-3 pb-12 space-y-1">

              {/* Services */}
              <button onClick={() => setMobileSection(mobileSection === 'svc' ? null : 'svc')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-slate-200 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors">
                Services
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileSection === 'svc' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSection === 'svc' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="ml-2 pb-2 grid grid-cols-2 gap-1">
                      {servicesList.map((s) => (
                        <Link key={s.href} href={s.href}
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors">
                          <s.icon size={13} className="text-blue-400 shrink-0" />
                          <span className="font-medium leading-tight">{s.label}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/services" className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-blue-400">
                      All Services <ArrowRight size={13} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Who We Help */}
              <button onClick={() => setMobileSection(mobileSection === 'aud' ? null : 'aud')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-slate-200 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors">
                Who We Help
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileSection === 'aud' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSection === 'aud' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="ml-2 pb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-2">Individuals</p>
                      <div className="grid grid-cols-2 gap-1">
                        {individualsCol.map((a) => (
                          <Link key={a.href} href={a.href} className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors">
                            <a.icon size={13} className="text-blue-400 shrink-0" />
                            <span className="font-medium">{a.label}</span>
                          </Link>
                        ))}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-2 mt-2">Business</p>
                      <div className="grid grid-cols-2 gap-1">
                        {businessCol.map((a) => (
                          <Link key={a.href} href={a.href} className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors">
                            <a.icon size={13} className="text-blue-400 shrink-0" />
                            <span className="font-medium">{a.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simple links */}
              {[
                { href: '/pricing', label: 'Pricing' },
                { href: '/proof',   label: 'Results' },
                { href: '/blog',    label: 'Blog'    },
                { href: '/faq',     label: 'FAQ'     },
                { href: '/about',   label: 'About'   },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="block px-4 py-3.5 text-[15px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
                  data-testid={`link-mobile-nav-${l.label.toLowerCase()}`}>
                  {l.label}
                </Link>
              ))}

              <div className="pt-4">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  data-testid="link-mobile-header-whatsapp"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-4 py-4 rounded-xl font-bold w-full text-base transition-colors">
                  <MessageCircle size={20} />
                  Book Free AI Audit
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
