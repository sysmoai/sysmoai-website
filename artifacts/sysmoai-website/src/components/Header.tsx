import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Menu, X, MessageCircle, ChevronDown,
  Zap, Timer, RefreshCw, Users, BookOpen, Layout, Bot, Settings, Building, Globe,
  GraduationCap, Briefcase, Laptop, FlaskConical, Building2, ShoppingBag, Users2,
  Megaphone, Video, Star, BookMarked, HelpCircle, TrendingUp, ArrowRight
} from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';
import { WA_LINK } from '@/lib/config';

/* ─────────────────── DATA ─────────────────── */

const servicesData = [
  {
    group: 'Quick Start',
    items: [
      { href: '/services/ai-quick-win', icon: Zap, label: 'AI Quick Win', desc: '1 workflow automated · 3 days · ৳3,750+', tag: 'Best entry point' },
      { href: '/services/ai-sprint', icon: Timer, label: 'AI Sprint', desc: 'Full AI stack · 14 days · ৳25,000+', tag: 'Most popular' },
      { href: '/services/ai-retainer', icon: RefreshCw, label: 'AI Retainer', desc: 'Ongoing AI management · ৳20,000/mo', tag: '' },
    ],
  },
  {
    group: 'Build & Automate',
    items: [
      { href: '/services/notion-os', icon: Layout, label: 'Notion OS Build', desc: 'Custom business OS · ৳15,000+', tag: '' },
      { href: '/services/n8n-automation', icon: Settings, label: 'n8n Automation', desc: 'Per-workflow · ৳2,000–10,000', tag: '' },
      { href: '/services/ai-agent-dev', icon: Bot, label: 'AI Agent Dev', desc: 'Custom AI agents 24/7 · ৳50,000+', tag: '' },
    ],
  },
  {
    group: 'Learn & Train',
    items: [
      { href: '/services/ai-coaching', icon: Users, label: '1:1 AI Coaching', desc: '60-min session · ৳2,500', tag: '' },
      { href: '/services/group-workshop', icon: BookOpen, label: 'Group Workshop', desc: 'Team upskilling · ৳500/person', tag: '' },
      { href: '/services/corporate-training', icon: Building, label: 'Corporate Training', desc: 'Enterprise AI · ৳50,000+', tag: '' },
      { href: '/services/international', icon: Globe, label: 'International Clients', desc: 'USD pricing · Wise / Payoneer', tag: '' },
    ],
  },
];

const audienceData = [
  { href: '/for/students', icon: GraduationCap, label: 'Students', desc: 'AI skills, CV, freelance' },
  { href: '/for/job-seekers', icon: Briefcase, label: 'Job Seekers', desc: 'Hire faster with AI' },
  { href: '/for/freelancers', icon: Laptop, label: 'Freelancers', desc: '3x rates with AI' },
  { href: '/for/researchers', icon: FlaskConical, label: 'Researchers', desc: 'Faster papers & notes' },
  { href: '/for/agencies', icon: Building2, label: 'Digital Agencies', desc: 'AI services & delivery' },
  { href: '/for/sme-founders', icon: Star, label: 'SME Founders', desc: 'Full AI business OS' },
  { href: '/for/f-commerce', icon: ShoppingBag, label: 'F-Commerce Sellers', desc: 'Automate orders & DMs' },
  { href: '/for/consultants', icon: Users2, label: 'Consultants', desc: 'Productize expertise' },
  { href: '/for/creators', icon: Video, label: 'Content Creators', desc: 'AI content engine' },
  { href: '/for/corporates', icon: Megaphone, label: 'Corporates & NGOs', desc: 'Enterprise AI adoption' },
];

const resourcesData = [
  { href: '/proof', icon: TrendingUp, label: 'Case Studies & Results', desc: 'Real client results' },
  { href: '/blog', icon: BookMarked, label: 'Blog', desc: 'AI guides & insights' },
  { href: '/faq', icon: HelpCircle, label: 'FAQ', desc: 'Common questions answered' },
];

/* ─────────────────── MEGA DROPDOWN ─────────────────── */

function MegaMenu({ label, testId, children }: { label: string; testId?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div
      ref={ref}
      className="relative"
      data-testid={testId}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 pt-2">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─────────────────── HEADER ─────────────────── */

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setMobileExpanded(null);
  }, [location]);

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0B0F]/92 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
               : 'bg-[#0A0B0F] border-b border-slate-800/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-[68px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" data-testid="link-home-logo">
            <SYSmoAILogo size={32} />
            <SYSmoAIWordmark darkMode={true} />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">

            {/* Services mega-menu */}
            <MegaMenu label="Services" testId="dropdown-services">
              <div className="bg-[#0D1117] border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden w-[720px]">
                <div className="grid grid-cols-3 gap-0 divide-x divide-slate-800">
                  {servicesData.map((group) => (
                    <div key={group.group} className="p-5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">{group.group}</p>
                      <div className="space-y-1">
                        {group.items.map(s => (
                          <Link key={s.href} href={s.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors group/item">
                            <div className="w-8 h-8 bg-blue-600/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-600/25 transition-colors">
                              <s.icon size={14} className="text-blue-400" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-white leading-tight">{s.label}</span>
                                {s.tag && <span className="text-[10px] font-bold bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded-full shrink-0">{s.tag}</span>}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 leading-snug">{s.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-800 px-5 py-3 flex items-center justify-between bg-slate-900/50">
                  <span className="text-xs text-slate-500">Not sure? We'll recommend the right service for you.</span>
                  <Link href="/services" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    View all services <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </MegaMenu>

            {/* Who We Help mega-menu */}
            <MegaMenu label="Who We Help" testId="dropdown-audiences">
              <div className="bg-[#0D1117] border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden w-[520px]">
                <div className="p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Choose your profile</p>
                  <div className="grid grid-cols-2 gap-1">
                    {audienceData.map(a => (
                      <Link key={a.href} href={a.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors group/item">
                        <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover/item:bg-blue-600/20 transition-colors">
                          <a.icon size={13} className="text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white leading-tight">{a.label}</div>
                          <div className="text-xs text-slate-500">{a.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </MegaMenu>

            {/* Resources mini-dropdown */}
            <MegaMenu label="Resources" testId="dropdown-resources">
              <div className="bg-[#0D1117] border border-slate-700/60 rounded-xl shadow-2xl shadow-black/50 overflow-hidden w-[260px]">
                <div className="p-3 space-y-1">
                  {resourcesData.map(r => (
                    <Link key={r.href} href={r.href}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors group/item">
                      <r.icon size={15} className="text-blue-400 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-white">{r.label}</div>
                        <div className="text-xs text-slate-500">{r.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </MegaMenu>

            {/* Simple links */}
            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className={`relative px-2 py-2 text-sm font-medium transition-colors group ${
                  isActive(link.href) ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-2 right-2 h-[2px] bg-blue-500 rounded-full transition-all duration-200 ${
                  isActive(link.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_16px_rgba(37,211,102,0.35)] min-h-[40px]"
              data-testid="link-header-whatsapp">
              <MessageCircle size={15} />
              Free AI Audit
            </a>
          </div>

          {/* ── Mobile Toggle ── */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#0A0B0F] z-50 overflow-y-auto pb-10">
          <div className="px-4 pt-4 space-y-1">

            {/* Services accordion */}
            <button
              className="w-full flex items-center justify-between px-3 py-3 text-base font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
              onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
            >
              Services
              <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'services' && (
              <div className="ml-2 space-y-4 pb-3">
                {servicesData.map(group => (
                  <div key={group.group}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 py-1">{group.group}</p>
                    {group.items.map(s => (
                      <Link key={s.href} href={s.href}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors">
                        <s.icon size={14} className="text-blue-400 shrink-0" />
                        <span className="font-medium">{s.label}</span>
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href="/services" className="flex items-center gap-1.5 px-3 py-2 text-sm text-blue-400 font-semibold">
                  All Services <ArrowRight size={13} />
                </Link>
              </div>
            )}

            {/* Who We Help accordion */}
            <button
              className="w-full flex items-center justify-between px-3 py-3 text-base font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
              onClick={() => setMobileExpanded(mobileExpanded === 'audiences' ? null : 'audiences')}
            >
              Who We Help
              <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'audiences' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'audiences' && (
              <div className="ml-2 grid grid-cols-2 gap-1 pb-3">
                {audienceData.map(a => (
                  <Link key={a.href} href={a.href}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors">
                    <a.icon size={13} className="text-blue-400 shrink-0" />
                    <span>{a.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Resources accordion */}
            <button
              className="w-full flex items-center justify-between px-3 py-3 text-base font-semibold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
              onClick={() => setMobileExpanded(mobileExpanded === 'resources' ? null : 'resources')}
            >
              Resources
              <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'resources' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'resources' && (
              <div className="ml-2 pb-3">
                {resourcesData.map(r => (
                  <Link key={r.href} href={r.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors">
                    <r.icon size={14} className="text-blue-400 shrink-0" />
                    <span>{r.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Simple links */}
            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
                data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 px-1">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-4 rounded-xl font-bold w-full transition-colors text-base"
                data-testid="link-mobile-header-whatsapp">
                <MessageCircle size={20} />
                Book Free AI Audit on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
