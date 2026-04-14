import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, MessageCircle, ChevronDown, Zap, Timer, RefreshCw, Users, BookOpen, Layout, Bot, Settings, Building, Globe, GraduationCap, Briefcase, Laptop, FlaskConical, Building2, ShoppingBag, Users2, Megaphone, Video, Star } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';
import { WA_LINK } from '@/lib/config';

const services = [
  { href: '/services/ai-quick-win', label: 'AI Quick Win', icon: Zap, desc: '1 workflow automated in 3 days' },
  { href: '/services/ai-sprint', label: 'AI Sprint', icon: Timer, desc: 'Full AI stack in 14 days' },
  { href: '/services/ai-retainer', label: 'AI Retainer', icon: RefreshCw, desc: 'Ongoing AI management' },
  { href: '/services/ai-coaching', label: '1:1 AI Coaching', icon: Users, desc: '60-min personalized session' },
  { href: '/services/group-workshop', label: 'Group Workshop', icon: BookOpen, desc: 'Team upskilling, half-day' },
  { href: '/services/notion-os', label: 'Notion OS', icon: Layout, desc: 'Your business in one place' },
  { href: '/services/ai-agent-dev', label: 'AI Agent Dev', icon: Bot, desc: 'Custom AI agents, 24/7' },
  { href: '/services/n8n-automation', label: 'n8n Automation', icon: Settings, desc: 'Workflow automation' },
  { href: '/services/corporate-training', label: 'Corporate Training', icon: Building, desc: 'Enterprise AI adoption' },
  { href: '/services/international', label: 'International Clients', icon: Globe, desc: 'USD pricing, global delivery' },
];

const audiences = [
  { href: '/for/students', label: 'Students', icon: GraduationCap },
  { href: '/for/job-seekers', label: 'Job Seekers', icon: Briefcase },
  { href: '/for/freelancers', label: 'Freelancers', icon: Laptop },
  { href: '/for/researchers', label: 'Researchers', icon: FlaskConical },
  { href: '/for/agencies', label: 'Digital Agencies', icon: Building2 },
  { href: '/for/sme-founders', label: 'SME Founders', icon: Star },
  { href: '/for/f-commerce', label: 'F-Commerce', icon: ShoppingBag },
  { href: '/for/consultants', label: 'Consultants', icon: Users2 },
  { href: '/for/creators', label: 'Content Creators', icon: Video },
  { href: '/for/corporates', label: 'Corporates', icon: Megaphone },
];

function DropdownMenu({ label, children, testId }: { label: string; children: React.ReactNode; testId?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" data-testid={testId}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-50" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'services' | 'audiences' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setMobileSection(null);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0B0F]/90 backdrop-blur-[14px] shadow-[0_1px_0_rgba(255,255,255,0.05)]'
          : 'bg-[#0A0B0F] border-b border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-home-logo">
            <SYSmoAILogo size={34} />
            <SYSmoAIWordmark darkMode={true} />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <DropdownMenu label="Services" testId="dropdown-services">
              <div className="bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl p-4 w-[560px] grid grid-cols-2 gap-1">
                {services.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600/30 transition-colors">
                      <s.icon size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{s.label}</div>
                      <div className="text-xs text-slate-400">{s.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="col-span-2 mt-2 pt-2 border-t border-slate-800">
                  <Link href="/services" className="flex items-center justify-center gap-2 py-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    View All Services →
                  </Link>
                </div>
              </div>
            </DropdownMenu>

            <DropdownMenu label="For You" testId="dropdown-audiences">
              <div className="bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl p-4 w-[320px] grid grid-cols-2 gap-1">
                {audiences.map(a => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <a.icon size={15} className="text-blue-400 shrink-0" />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{a.label}</span>
                  </Link>
                ))}
              </div>
            </DropdownMenu>

            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/proof', label: 'Proof' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors group ${
                  location === link.href ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${location === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_16px_rgba(37,211,102,0.35)]"
              data-testid="link-header-whatsapp"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#0A0B0F] z-50 overflow-y-auto pb-8">
          <div className="px-4 pt-4 space-y-1">
            <button
              className="w-full flex items-center justify-between px-3 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
            >
              Services
              <ChevronDown size={16} className={`transition-transform ${mobileSection === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'services' && (
              <div className="ml-3 space-y-1 pb-2">
                {services.map(s => (
                  <Link key={s.href} href={s.href} className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors">
                    <s.icon size={14} className="text-blue-400" />
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              className="w-full flex items-center justify-between px-3 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              onClick={() => setMobileSection(mobileSection === 'audiences' ? null : 'audiences')}
            >
              For You
              <ChevronDown size={16} className={`transition-transform ${mobileSection === 'audiences' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'audiences' && (
              <div className="ml-3 grid grid-cols-2 gap-1 pb-2">
                {audiences.map(a => (
                  <Link key={a.href} href={a.href} className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors">
                    <a.icon size={14} className="text-blue-400" />
                    {a.label}
                  </Link>
                ))}
              </div>
            )}

            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/proof', label: 'Proof' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
                data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 px-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3.5 rounded-xl font-semibold w-full transition-colors text-base"
                data-testid="link-mobile-header-whatsapp"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
