import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, X, MessageCircle, ChevronDown,
  Zap, Timer, RefreshCw, Users, BookOpen, Layout, Bot, Settings, Building, Globe,
  GraduationCap, Briefcase, Laptop, FlaskConical, Building2, ShoppingBag, Users2,
  Megaphone, Video, Star, BookMarked, HelpCircle, TrendingUp, ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';
import { WA_LINK } from '@/lib/config';

/* ─────────── DATA ─────────── */

const servicesGroups = [
  {
    group: 'Quick Start',
    color: 'blue',
    items: [
      {
        href: '/services/ai-quick-win',
        icon: Zap,
        label: 'AI Quick Win',
        desc: '1 workflow automated in 3 days',
        price: '৳3,750+',
        badge: 'Best entry point',
        badgeColor: 'emerald',
      },
      {
        href: '/services/ai-sprint',
        icon: Timer,
        label: 'AI Sprint',
        desc: 'Full AI stack deployed in 14 days',
        price: '৳25,000+',
        badge: 'Most popular',
        badgeColor: 'blue',
      },
      {
        href: '/services/ai-retainer',
        icon: RefreshCw,
        label: 'AI Retainer',
        desc: 'Ongoing monthly AI management',
        price: '৳20,000/mo',
        badge: '',
        badgeColor: '',
      },
    ],
  },
  {
    group: 'Build & Automate',
    color: 'violet',
    items: [
      {
        href: '/services/notion-os',
        icon: Layout,
        label: 'Notion OS Build',
        desc: 'Your business in one command centre',
        price: '৳15,000+',
        badge: '',
        badgeColor: '',
      },
      {
        href: '/services/n8n-automation',
        icon: Settings,
        label: 'n8n Automation',
        desc: 'Connect tools, automate everything',
        price: '৳2,000–10,000',
        badge: '',
        badgeColor: '',
      },
      {
        href: '/services/ai-agent-dev',
        icon: Bot,
        label: 'AI Agent Dev',
        desc: 'Custom AI agents that work 24/7',
        price: '৳50,000+',
        badge: 'Advanced',
        badgeColor: 'violet',
      },
    ],
  },
  {
    group: 'Learn & Train',
    color: 'indigo',
    items: [
      {
        href: '/services/ai-coaching',
        icon: Users,
        label: '1:1 AI Coaching',
        desc: 'Personalised 60-min sessions',
        price: '৳2,500',
        badge: '',
        badgeColor: '',
      },
      {
        href: '/services/group-workshop',
        icon: BookOpen,
        label: 'Group Workshop',
        desc: 'Team upskilling, half-day format',
        price: '৳500/person',
        badge: '',
        badgeColor: '',
      },
      {
        href: '/services/corporate-training',
        icon: Building,
        label: 'Corporate Training',
        desc: 'Enterprise AI adoption program',
        price: '৳50,000+',
        badge: '',
        badgeColor: '',
      },
      {
        href: '/services/international',
        icon: Globe,
        label: 'International Clients',
        desc: 'USD pricing, Wise / Payoneer',
        price: '$45+/hr',
        badge: '🌍 Global',
        badgeColor: 'sky',
      },
    ],
  },
];

const audienceItems = [
  { href: '/for/students',    icon: GraduationCap, label: 'Students',          desc: 'AI skills, CV prep & freelance start' },
  { href: '/for/job-seekers', icon: Briefcase,     label: 'Job Seekers',       desc: 'Get hired faster with AI tools' },
  { href: '/for/freelancers', icon: Laptop,        label: 'Freelancers',       desc: '3× your rates using AI' },
  { href: '/for/researchers', icon: FlaskConical,  label: 'Researchers',       desc: '10× faster research & writing' },
  { href: '/for/agencies',    icon: Building2,     label: 'Digital Agencies',  desc: 'AI-powered services & delivery' },
  { href: '/for/sme-founders',icon: Star,          label: 'SME Founders',      desc: 'Full AI operating system for your biz' },
  { href: '/for/f-commerce',  icon: ShoppingBag,   label: 'F-Commerce Sellers',desc: 'Automate orders, DMs & follow-ups' },
  { href: '/for/consultants', icon: Users2,        label: 'Consultants',       desc: 'Productize expertise & automate flow' },
  { href: '/for/creators',    icon: Video,         label: 'Content Creators',  desc: 'AI content engine, 5× output' },
  { href: '/for/corporates',  icon: Megaphone,     label: 'Corporates & NGOs', desc: 'Enterprise-wide AI adoption' },
];

const resourceItems = [
  { href: '/proof', icon: TrendingUp,  label: 'Case Studies & Results', desc: 'Real outcomes from real clients' },
  { href: '/blog',  icon: BookMarked,  label: 'Blog & Guides',          desc: 'AI tutorials, tips & strategy' },
  { href: '/faq',   icon: HelpCircle,  label: 'FAQ',                    desc: 'Common questions answered' },
];

/* ─────────── BADGE HELPER ─────────── */
const badgeClass: Record<string, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400',
  blue:    'bg-blue-500/15    text-blue-400',
  violet:  'bg-violet-500/15  text-violet-400',
  sky:     'bg-sky-500/15     text-sky-400',
};

/* ─────────── ANIMATION VARIANTS ─────────── */
const dropdownVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12, ease: 'easeIn' } },
};

/* ─────────── MEGA DROPDOWN WRAPPER ─────────── */
interface MegaProps {
  label: string;
  testId?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

function MegaDropdown({ label, testId, align = 'center', children }: MegaProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const wrapRef = useRef<HTMLDivElement>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const alignClass =
    align === 'left'   ? 'left-0'  :
    align === 'right'  ? 'right-0' :
    'left-1/2 -translate-x-1/2';

  return (
    <div
      ref={wrapRef}
      className="relative"
      data-testid={testId}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        className={`flex items-center gap-1.5 px-1 py-2 text-sm font-medium transition-colors duration-150 ${
          open ? 'text-white' : 'text-slate-300 hover:text-white'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* invisible bridge so cursor can travel from button → panel */}
      {open && <div className="absolute left-0 right-0 top-full h-3 z-50" onMouseEnter={cancelClose} onMouseLeave={scheduleClose} />}

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-[calc(100%+10px)] z-50 ${alignClass}`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────── SERVICES PANEL ─────────── */
function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[760px] bg-[#0C1018] border border-slate-700/50 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="grid grid-cols-3 divide-x divide-slate-800/70">
        {servicesGroups.map((group) => (
          <div key={group.group} className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-3 px-1">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={onClose}
                  className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/50 transition-all duration-150"
                >
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600/20 transition-colors duration-150">
                    <s.icon size={14} className="text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[13px] font-semibold text-slate-100 group-hover/item:text-white transition-colors">
                        {s.label}
                      </span>
                      {s.badge && (
                        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeClass[s.badgeColor] ?? 'bg-slate-700 text-slate-300'}`}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11.5px] text-slate-500 leading-snug">{s.desc}</p>
                    <p className="text-[11px] font-semibold text-blue-400/80 mt-1">{s.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA row */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/60 border-t border-slate-800/70">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles size={12} className="text-yellow-400" />
          Not sure which service fits? We'll recommend the right one free.
        </div>
        <Link
          href="/services"
          onClick={onClose}
          className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0"
        >
          All 10 services <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

/* ─────────── WHO WE HELP PANEL ─────────── */
function AudiencePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[540px] bg-[#0C1018] border border-slate-700/50 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-3 px-1">
          Choose your profile
        </p>
        <div className="grid grid-cols-2 gap-0.5">
          {audienceItems.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              onClick={onClose}
              className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-all duration-150"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600/20 transition-colors duration-150">
                <a.icon size={13} className="text-blue-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-slate-100 group-hover/item:text-white transition-colors leading-tight">
                  {a.label}
                </div>
                <div className="text-[11px] text-slate-500 leading-snug mt-0.5 truncate">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900/60 border-t border-slate-800/70">
        <span className="text-xs text-slate-400">10 audience profiles · All covered</span>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center gap-1 text-xs font-semibold text-[#25D366] hover:text-[#20b858] transition-colors shrink-0"
        >
          <MessageCircle size={11} />
          Talk to us on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─────────── RESOURCES PANEL ─────────── */
function ResourcesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[260px] bg-[#0C1018] border border-slate-700/50 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="p-3 space-y-0.5">
        {resourceItems.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            onClick={onClose}
            className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/50 transition-all duration-150"
          >
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600/20 transition-colors duration-150">
              <r.icon size={13} className="text-blue-400" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-slate-100 group-hover/item:text-white transition-colors">
                {r.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{r.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────── MAIN HEADER ─────────── */
export function Header() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled]           = useState(false);
  const [location]                        = useLocation();

  // close callbacks for panels
  const [servicesOpen,   setServicesOpen]   = useState(false);
  const [audiencesOpen,  setAudiencesOpen]  = useState(false);
  const [resourcesOpen,  setResourcesOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, [location]);

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  const closeAll = () => {
    setServicesOpen(false);
    setAudiencesOpen(false);
    setResourcesOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080A0F]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[#0A0B0F] border-b border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[68px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-home-logo">
            <SYSmoAILogo size={32} />
            <SYSmoAIWordmark darkMode={true} />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">

            {/* Services — left-aligned so the wide panel doesn't go off-screen */}
            <div
              className="relative"
              data-testid="dropdown-services"
              onMouseEnter={() => { closeAll(); setServicesOpen(true); }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  servicesOpen ? 'text-white bg-slate-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full h-3 w-full z-50"
                  onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)} />
              )}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    key="services-panel"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 top-[calc(100%+10px)] z-50"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <ServicesPanel onClose={closeAll} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Who We Help — centered */}
            <div
              className="relative"
              data-testid="dropdown-audiences"
              onMouseEnter={() => { closeAll(); setAudiencesOpen(true); }}
              onMouseLeave={() => setAudiencesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  audiencesOpen ? 'text-white bg-slate-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
                aria-expanded={audiencesOpen}
              >
                Who We Help
                <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${audiencesOpen ? 'rotate-180' : ''}`} />
              </button>
              {audiencesOpen && (
                <div className="absolute left-0 top-full h-3 w-full z-50"
                  onMouseEnter={() => setAudiencesOpen(true)} onMouseLeave={() => setAudiencesOpen(false)} />
              )}
              <AnimatePresence>
                {audiencesOpen && (
                  <motion.div
                    key="audience-panel"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50"
                    onMouseEnter={() => setAudiencesOpen(true)}
                    onMouseLeave={() => setAudiencesOpen(false)}
                  >
                    <AudiencePanel onClose={closeAll} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources */}
            <div
              className="relative"
              data-testid="dropdown-resources"
              onMouseEnter={() => { closeAll(); setResourcesOpen(true); }}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  resourcesOpen ? 'text-white bg-slate-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
                aria-expanded={resourcesOpen}
              >
                Resources
                <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute left-0 top-full h-3 w-full z-50"
                  onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)} />
              )}
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    key="resources-panel"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50"
                    onMouseEnter={() => setResourcesOpen(true)}
                    onMouseLeave={() => setResourcesOpen(false)}
                  >
                    <ResourcesPanel onClose={closeAll} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static links */}
            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/about',   label: 'About'   },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 group ${
                  isActive(link.href)
                    ? 'text-white bg-slate-800/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-header-whatsapp"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ead57] active:bg-[#179448] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] whitespace-nowrap"
            >
              <MessageCircle size={15} />
              Free AI Audit
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ─────────── MOBILE MENU ─────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed inset-0 top-[68px] bg-[#0A0B0F] z-50 overflow-y-auto pb-12"
          >
            <div className="px-4 pt-3 space-y-1">

              {/* Services accordion */}
              <button
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSection === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSection === 'services' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 pb-2">
                      {servicesGroups.map((group) => (
                        <div key={group.group} className="mb-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-4 py-1.5">
                            {group.group}
                          </p>
                          {group.items.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                            >
                              <s.icon size={14} className="text-blue-400 shrink-0" />
                              <span className="font-medium">{s.label}</span>
                              {s.badge && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeClass[s.badgeColor] ?? ''}`}>
                                  {s.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <Link
                        href="/services"
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View all services <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Who We Help accordion */}
              <button
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                onClick={() => setMobileSection(mobileSection === 'audiences' ? null : 'audiences')}
              >
                Who We Help
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSection === 'audiences' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSection === 'audiences' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 pb-2 grid grid-cols-2 gap-1">
                      {audienceItems.map((a) => (
                        <Link
                          key={a.href}
                          href={a.href}
                          className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                        >
                          <a.icon size={14} className="text-blue-400 shrink-0" />
                          <span className="font-medium leading-tight">{a.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Resources accordion */}
              <button
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                onClick={() => setMobileSection(mobileSection === 'resources' ? null : 'resources')}
              >
                Resources
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSection === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSection === 'resources' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 pb-2">
                      {resourceItems.map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                        >
                          <r.icon size={14} className="text-blue-400 shrink-0" />
                          <span className="font-medium">{r.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simple links */}
              {[
                { href: '/pricing', label: 'Pricing' },
                { href: '/about',   label: 'About'   },
                { href: '/blog',    label: 'Blog'    },
                { href: '/faq',     label: 'FAQ'     },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3.5 text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 pb-2">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-mobile-header-whatsapp"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-4 py-4 rounded-xl font-bold w-full transition-colors text-base"
                >
                  <MessageCircle size={20} />
                  Book Free AI Audit on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
