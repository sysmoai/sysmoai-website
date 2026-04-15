import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle, ChevronRight, Zap, Timer, RefreshCw, Users, BookOpen,
  Layout, Bot, Settings, Building, Globe, GraduationCap, Briefcase, Laptop,
  FlaskConical, Building2, ShoppingBag, Users2, Megaphone, Video, Star,
  CheckCircle2, ArrowRight, Search, PenTool, Rocket, Quote, Sun, Moon,
  TrendingUp, Clock, BarChart3, Sparkles, Play,
} from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import { WA_URLS } from '@/lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import { SYSmoAILogo } from '@/components/SYSmoAILogo';
import { LazyImage } from '@/components/LazyImage';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.10 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const slideRight = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const audiences = [
  { icon: GraduationCap, label: 'Students',     href: '/for/students',    problems: ['Terrible prompts, no real AI skills', "CV looks like everyone else's", 'No freelance portfolio or income'], solution: 'We teach you exactly which AI tools to learn for your career, build your portfolio, and launch your first freelance service — in 30 days.' },
  { icon: Briefcase,     label: 'Job Seekers',  href: '/for/job-seekers', problems: ['Getting rejected without knowing why', 'No AI skills on your CV', 'LinkedIn has 0 engagement'], solution: 'We overhaul your CV with AI skills, rebuild your LinkedIn, and build real portfolio projects so you get shortlisted.' },
  { icon: Laptop,        label: 'Freelancers',  href: '/for/freelancers', problems: ['Income dropped — "ChatGPT can do this"', 'Stuck at low-ticket ৳500 projects', 'Chaotic client management'], solution: 'We upgrade your skills, build your premium service package, and set up a Notion CRM so you earn 3× more.' },
  { icon: FlaskConical,  label: 'Researchers',  href: '/for/researchers', problems: ['Literature review takes 4 weeks', 'Notes in 6 different apps', 'Paper writing is a bottleneck'], solution: 'We build your AI Research OS — literature review in 3 days, notes organized, papers written 3× faster.' },
  { icon: Building2,     label: 'Agencies',     href: '/for/agencies',    problems: ['Competitors pitching AI — you have nothing', 'Content production is 3× slower', 'Proposals take 3–5 hours each'], solution: 'We deploy your complete agency AI stack in 14 days — content production, proposal builder, and team training.' },
  { icon: Star,          label: 'SME Founders', href: '/for/sme-founders',problems: ['847 unread WhatsApp messages', 'No dashboard — you ask 5 people', '14-hour days with nothing automated'], solution: 'We build your AI business OS — WhatsApp auto-replies, connected tools, and a real-time dashboard.' },
  { icon: ShoppingBag,   label: 'F-Commerce',   href: '/for/f-commerce',  problems: ['500 DMs a day, replying to 100', 'Order tracking in a notebook', '0 repeat customer follow-ups'], solution: 'We automate your Facebook DMs, build an order management system, and set up customer follow-up sequences.' },
  { icon: Users2,        label: 'Consultants',  href: '/for/consultants', problems: ['Onboarding takes 2–3 days manually', 'Warm leads go cold — revenue lost', 'Everything is in your head'], solution: 'We automate your onboarding, build a proposal system, and document your expertise into a searchable knowledge base.' },
  { icon: Video,         label: 'Creators',     href: '/for/creators',    problems: ['50 ideas — 0 become posts', '1 YouTube video takes 2 days', 'No content calendar or system'], solution: 'We build your content pipeline OS, AI repurposing engine, and growth tracking dashboard.' },
  { icon: Megaphone,     label: 'Corporates',   href: '/for/corporates',  problems: ['ChatGPT for 50 employees — 10% use it', 'AI strategy = slide deck, nothing implemented', 'Monthly reports take 3 days'], solution: 'We audit your operations, train your team, automate your top 3 bottlenecks, and give you a 90-day AI roadmap.' },
];

const featuredServices = [
  { icon: Zap,       title: 'AI Quick Win', subtitle: 'Your #1 problem automated in 3 days',  description: '', bdPrice: '৳3,750–7,500',    usdPrice: '$50–$100',    href: '/services/ai-quick-win', featured: false, tag: 'Best entry point'  },
  { icon: Timer,     title: 'AI Sprint',    subtitle: 'Full AI stack deployed in 14 days',     description: '', bdPrice: '৳25,000–50,000', usdPrice: '$300–$600',   href: '/services/ai-sprint',    featured: true,  tag: 'Most popular'     },
  { icon: RefreshCw, title: 'AI Retainer',  subtitle: 'Ongoing AI management every month',     description: 'We manage and evolve your AI systems every month. Monthly improvements, priority WhatsApp support, and a full performance report — so your AI keeps working as your business grows.', bdPrice: '৳20,000/mo', usdPrice: '$250/mo', href: '/services/ai-retainer', featured: false, tag: 'Cancel anytime', features: ['Ongoing AI system management', 'Monthly improvements & optimizations', 'Priority WhatsApp support', 'Monthly performance report'] },
];

const otherServices = [
  { icon: Users,    label: '1:1 Coaching',  href: '/services/ai-coaching'        },
  { icon: BookOpen, label: 'Workshop',       href: '/services/group-workshop'     },
  { icon: Layout,   label: 'Notion OS',      href: '/services/notion-os'          },
  { icon: Bot,      label: 'AI Agent Dev',   href: '/services/ai-agent-dev'       },
  { icon: Settings, label: 'n8n Automation', href: '/services/n8n-automation'     },
  { icon: Building, label: 'Corp Training',  href: '/services/corporate-training' },
];

const toolItems = [
  { name: 'ChatGPT',          color: '#10A37F' },
  { name: 'Claude AI',        color: '#D4A574' },
  { name: 'Notion',           color: '#FFFFFF' },
  { name: 'n8n',              color: '#EA4B71' },
  { name: 'Make',             color: '#6B21A8' },
  { name: 'Zapier',           color: '#FF4A00' },
  { name: 'WhatsApp API',     color: '#25D366' },
  { name: 'Google Workspace', color: '#4285F4' },
  { name: 'Midjourney',       color: '#FFFFFF' },
  { name: 'Perplexity AI',    color: '#20B2AA' },
  { name: 'Airtable',         color: '#2D7FF9' },
  { name: 'LangChain',        color: '#1C3C3C' },
  { name: 'Gemini',           color: '#8E75B2' },
  { name: 'GPT-4o',           color: '#10A37F' },
  { name: 'OpenAI',           color: '#FFFFFF' },
];

const steps = [
  { num: '01', icon: Search,  title: 'DIAGNOSE', dayLabel: '(Day 1)',    desc: 'Free 30-min discovery call. We map your biggest workflow problem and identify the highest-ROI fix.', color: '#3B82F6' },
  { num: '02', icon: PenTool, title: 'DESIGN',   dayLabel: '(Day 2)',    desc: 'We design your custom AI system — right tools, automations, and agents for your specific situation.', color: '#8B5CF6' },
  { num: '03', icon: Zap,     title: 'BUILD',    dayLabel: '(Day 3)',    desc: 'We build and deploy it. You just review and approve. No code. No complexity.', color: '#10B981' },
  { num: '04', icon: Rocket,  title: 'SCALE',    dayLabel: '(Day 4–90)', desc: 'We train your team and optimise for 3 months — your system grows with your business.', color: '#F59E0B' },
];

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);
  const [count, setCount] = useState(target);
  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    setCount(0);
    let frame = 0;
    const totalFrames = 70;
    const tick = () => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame < totalFrames) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref} data-target={target}>{prefix}{count}{suffix}</span>;
}

/* ══════════════════════════════════════════
   TOOL MARQUEE
══════════════════════════════════════════ */
function ToolMarquee({ isDark }: { isDark: boolean }) {
  const repeated = [...toolItems, ...toolItems];
  return (
    <div className={`py-5 border-y overflow-hidden relative mask-fade-x ${isDark ? 'bg-[#06080C] border-white/[0.05]' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((tool, i) => (
          <span key={i} className={`inline-flex items-center gap-2 mx-7 text-sm font-medium shrink-0 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} transition-colors`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tool.color, opacity: 0.7 }} />
            {tool.name}
          </span>
        ))}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════
   SVG ANIMATED BACKGROUND (hero grid)
══════════════════════════════════════════ */
function AnimatedGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1"/>
        </pattern>
        <radialGradient id="gridFade" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0A0B0F" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#gridFade)" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   FLOATING UI CARD (hero deco)
══════════════════════════════════════════ */
function AIStatusCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      className="absolute bottom-8 right-4 bg-[#0C1525]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-emerald-400 font-semibold">AI Running</span>
      </div>
      <div className="space-y-1">
        {['Replying to DMs...', 'Filing reports...', 'Following up leads...'].map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle2 size={11} className="text-blue-400 shrink-0" />
            <span className="text-[11px] text-slate-400">{t}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ChaosCard() {
  return (
    <motion.div
      animate={{ y: [0, 6, 0], rotate: [0, -1, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      className="absolute bottom-8 left-4 bg-red-950/80 backdrop-blur-xl border border-red-700/30 rounded-2xl px-4 py-3 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs text-red-400 font-semibold">847 unread</span>
      </div>
      <div className="space-y-1">
        {['Missed follow-up ⚠️', 'Report overdue ⚠️', 'Client waiting ⚠️'].map((t, i) => (
          <div key={i} className="text-[11px] text-red-400/70">{t}</div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
export default function Home() {
  const { isDark } = useTheme();
  const [activeAudience, setActiveAudience] = useState(0);
  const [showUSD, setShowUSD] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  /* ── GSAP scroll-triggered reveals ── */
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('.gsap-scale').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.65, delay: i * 0.08, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  /* ── Parallax ── */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const darkBg   = '#0A0B0F';
  const surface  = isDark ? '#08090D' : '#F8FAFC';
  const altSurf  = isDark ? '#060810' : '#FFFFFF';

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          HERO — Split composition with real photos
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[96vh] flex items-center justify-center overflow-hidden noise-overlay"
        style={{ background: isDark ? darkBg : '#FAFBFF' }}
      >
        {/* Background SVG grid */}
        {isDark && <AnimatedGrid />}
        {!isDark && (
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,1) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,1) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
        )}

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
          <div className="absolute left-[8%] top-[25%] w-[320px] h-[320px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 70%)' }} />
          <div className="absolute right-[8%] bottom-[20%] w-[280px] h-[280px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
        </div>

        {/* Hero images — Left (chaos) + Right (AI-powered) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:flex">
          {/* Left — Chaotic / non-AI user */}
          <div className="absolute left-0 top-0 w-[38%] h-full overflow-hidden">
            <div className="absolute inset-0" style={{
              maskImage: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 100%)',
            }}>
              <LazyImage
                src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=75&auto=format"
                alt="Person overwhelmed without AI"
                className="w-full h-full brand-photo-chaos"
                priority
                objectFit="cover"
              />
              <div className="absolute inset-0" style={{ background: isDark ? 'linear-gradient(135deg, rgba(10,11,15,0.75) 0%, rgba(127,29,29,0.15) 100%)' : 'linear-gradient(135deg, rgba(250,250,255,0.65) 0%, rgba(254,226,226,0.2) 100%)' }} />
            </div>
            <ChaosCard />
            {/* "Before" label */}
            <div className="absolute top-8 left-6 bg-red-950/80 border border-red-700/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <span className="text-red-400 text-xs font-bold tracking-widest">BEFORE AI</span>
            </div>
          </div>

          {/* Right — AI-powered, thriving user */}
          <div className="absolute right-0 top-0 w-[38%] h-full overflow-hidden">
            <div className="absolute inset-0" style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 100%)',
            }}>
              <LazyImage
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=75&auto=format"
                alt="Professional thriving with AI systems"
                className="w-full h-full brand-photo-success"
                priority
                objectFit="cover"
              />
              <div className="absolute inset-0" style={{ background: isDark ? 'linear-gradient(225deg, rgba(10,11,15,0.7) 0%, rgba(16,56,107,0.12) 100%)' : 'linear-gradient(225deg, rgba(250,250,255,0.6) 0%, rgba(219,234,254,0.15) 100%)' }} />
            </div>
            <AIStatusCard />
            {/* "After" label */}
            <div className="absolute top-8 right-6 bg-emerald-950/80 border border-emerald-700/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <span className="text-emerald-400 text-xs font-bold tracking-widest">WITH SYSMOAI</span>
            </div>
          </div>
        </div>

        {/* Center content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="inline-flex items-center gap-2.5 border px-5 py-2 rounded-full mb-8 relative overflow-hidden"
            style={{
              background: isDark ? 'rgba(37,99,235,0.08)' : 'rgba(219,234,254,0.8)',
              borderColor: isDark ? 'rgba(37,99,235,0.25)' : 'rgba(37,99,235,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="relative">
              <span className="w-2 h-2 bg-emerald-400 rounded-full block" />
              <span className="w-2 h-2 bg-emerald-400 rounded-full block absolute inset-0 animate-badge-ping" />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              🇧🇩 Bangladesh's AI Consulting Company — Serving Clients Worldwide
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-[-0.032em] leading-[1.04] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? '#F1F5F9' : '#0A0B0F' }}
          >
            Build Your AI-Powered<br />
            <span className="brand-gradient-text">Business in 72 Hours</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            SYSmoAI designs, builds and deploys custom AI operating systems for founders,
            agencies and freelancers in Bangladesh — and clients worldwide. Automate
            workflows, free up 20+ hours/week, and unlock new revenue streams.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
          >
            <motion.a
              href={WA_URLS.consultation}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-hero-whatsapp"
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(37,211,102,0.40)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-w-[220px] justify-center shadow-lg"
            >
              <MessageCircle size={21} />
              Book Free 30-Min Consultation
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 min-w-[200px] justify-center border"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)',
                  borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(37,99,235,0.2)',
                  color: isDark ? '#CBD5E1' : '#1E40AF',
                  backdropFilter: 'blur(12px)',
                }}
              >
                See How It Works
                <ChevronRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="text-sm mb-10"
            style={{ color: isDark ? '#475569' : '#94A3B8' }}
          >
            No sales pitch. We map your biggest bottleneck and outline a practical AI plan.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              { label: 'Top 5% Prompt Engineers Globally', icon: Sparkles },
              { label: '500+ Projects Delivered', icon: TrendingUp },
              { label: '8+ Client Categories', icon: Users },
            ].map(({ label, icon: Icon }, i) => (
              <span key={i} className="flex items-center gap-2 text-sm" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                <Icon size={13} className="text-blue-500 shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Trust badge pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {[
              { emoji: '✓', color: '#4ade80', label: 'Results Guaranteed' },
              { emoji: '🏆', color: '#60a5fa', label: 'Top 5% AI Engineers' },
              { emoji: '📦', color: '#c084fc', label: '500+ Projects' },
              { emoji: '🌍', color: '#fbbf24', label: 'BD + International' },
            ].map(({ emoji, color, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.06)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.12)'}` }}>
                <span className="text-xs" style={{ color }}>{emoji}</span>
                <span className="text-xs font-medium" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: isDark ? '#334155' : '#CBD5E1' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-9 rounded-full"
            style={{ background: isDark ? 'linear-gradient(to bottom, #334155, transparent)' : 'linear-gradient(to bottom, #CBD5E1, transparent)' }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          TOOL MARQUEE STRIP
      ══════════════════════════════════════ */}
      <ToolMarquee isDark={isDark} />

      {/* ══════════════════════════════════════
          TOOLS & PLATFORMS LOGO STRIP
      ══════════════════════════════════════ */}
      <section className="py-12 border-y" style={{ background: isDark ? '#0A0B0F' : '#F8FAFF', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.08)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            Tools &amp; Platforms We Build With
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {[
              { name: 'OpenAI',           icon: '🤖' },
              { name: 'Notion',           icon: '📋' },
              { name: 'n8n',              icon: '⚡' },
              { name: 'Zapier',           icon: '🔗' },
              { name: 'Make',             icon: '🔄' },
              { name: 'WhatsApp API',     icon: '💬' },
              { name: 'Claude AI',        icon: '🧠' },
              { name: 'Google Workspace', icon: '📊' },
            ].map(tool => (
              <div key={tool.name} className="flex items-center gap-2 transition-colors" style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                onMouseEnter={e => (e.currentTarget.style.color = isDark ? '#F1F5F9' : '#0A0B0F')}
                onMouseLeave={e => (e.currentTarget.style.color = isDark ? '#64748B' : '#94A3B8')}>
                <span className="text-lg">{tool.icon}</span>
                <span className="text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — PROBLEM (Chaos Side)
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#050609' : '#FFFBFB' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(234,88,12,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              Running your business shouldn't feel like this.
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
              Every hour spent on manual tasks is an hour your competitors are using AI.
            </p>
          </motion.div>

          {/* Split layout: image + problem cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            {/* Left: chaos image */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideLeft}
              className="relative rounded-3xl overflow-hidden gsap-reveal" style={{ height: 380 }}>
              <LazyImage
                src="https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=700&q=75&auto=format"
                alt="Overwhelmed without AI systems"
                className="w-full h-full brand-photo-chaos"
                objectFit="cover"
              />
              <div className="absolute inset-0" style={{ background: isDark ? 'linear-gradient(135deg, rgba(127,29,29,0.3) 0%, rgba(10,11,15,0.5) 100%)' : 'linear-gradient(135deg, rgba(254,226,226,0.5) 0%, rgba(249,250,251,0.4) 100%)' }} />
              {/* Floating chaos stats */}
              <div className="absolute top-5 left-5 bg-red-950/85 border border-red-800/50 backdrop-blur-md px-4 py-2.5 rounded-xl">
                <div className="text-red-400 text-xs font-bold tracking-wider mb-0.5">WITHOUT AI</div>
                <div className="text-white text-sm font-bold">14-hour workdays</div>
              </div>
              <div className="absolute bottom-5 right-5 bg-black/70 border border-red-900/40 backdrop-blur-md px-4 py-3 rounded-xl">
                <div className="text-red-400 font-bold text-xl">847</div>
                <div className="text-slate-400 text-xs">unread messages</div>
              </div>
            </motion.div>

            {/* Right: problem cards */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
              className="space-y-4">
              {[
                { emoji: '📱', title: 'Drowning in WhatsApp', desc: 'Orders, leads, and follow-ups lost in an endless inbox every single day.', stat: '847 unread' },
                { emoji: '🔄', title: 'Everything is manual', desc: 'Your team repeats the same tasks daily that AI could handle in seconds.', stat: '12 hrs wasted' },
                { emoji: '📊', title: 'No visibility at all', desc: "You can't see what's happening in your business without asking 5 people.", stat: '0 automation' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="gsap-scale rounded-2xl p-6 glow-card transition-all duration-300"
                  style={{
                    background: isDark ? 'rgba(127,29,29,0.12)' : 'rgba(254,242,242,0.8)',
                    border: `1px solid ${isDark ? 'rgba(153,27,27,0.25)' : 'rgba(254,202,202,0.6)'}`,
                  }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{item.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-0.5" style={{ color: isDark ? '#FEF2F2' : '#7F1D1D' }}>"{item.title}"</h3>
                      <p className="text-sm" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>{item.desc}</p>
                    </div>
                    <div className="text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 bg-red-500/10 text-red-500 border border-red-500/20">{item.stat}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <p className="text-xl font-bold mb-5" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>There's a better way.</p>
            <Link href="/services"
              className="inline-flex items-center gap-2 font-semibold transition-colors group text-blue-500 hover:text-blue-400">
              See how SYSmoAI fixes this
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — SOLUTION (AI-Powered Life)
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#060810' : '#F8FAFF' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center mb-14">
            <p className="text-emerald-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">The Solution</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              Life with <span className="brand-gradient-text">SYSmoAI</span> running your systems.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: solution highlights */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
              className="space-y-4 order-2 lg:order-1">
              {[
                { icon: Clock,    color: '#10B981', title: 'Save 15–20 hours every week',    desc: 'AI handles DMs, reports, and follow-ups automatically.', result: '15 hrs/week back' },
                { icon: TrendingUp, color: '#3B82F6', title: 'Revenue grows 3× or more',     desc: 'More time for high-value work, better client experience.', result: 'Revenue 3×' },
                { icon: BarChart3,  color: '#8B5CF6', title: 'Full visibility, zero chaos',  desc: 'Real-time dashboard — see everything without asking anyone.', result: 'Always in control' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="gsap-scale rounded-2xl p-6 glow-card shadow-sm"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.12)'}`,
                  }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                      <item.icon size={19} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-0.5" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>{item.desc}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
                      {item.result}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: success photo */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideRight}
              className="relative rounded-3xl overflow-hidden order-1 lg:order-2" style={{ height: 380 }}>
              <LazyImage
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=75&auto=format"
                alt="Entrepreneur thriving with AI automation"
                className="w-full h-full brand-photo-success"
                objectFit="cover"
              />
              <div className="absolute inset-0" style={{ background: isDark ? 'linear-gradient(135deg, rgba(10,11,15,0.3) 0%, rgba(16,56,107,0.2) 100%)' : 'linear-gradient(135deg, rgba(219,234,254,0.25) 0%, rgba(250,250,255,0.2) 100%)' }} />
              {/* Floating success stats */}
              <div className="absolute top-5 right-5 bg-emerald-950/85 border border-emerald-800/50 backdrop-blur-md px-4 py-2.5 rounded-xl">
                <div className="text-emerald-400 text-xs font-bold tracking-wider mb-0.5">WITH SYSMOAI</div>
                <div className="text-white text-sm font-bold">4-hour workdays</div>
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute bottom-5 left-5 bg-slate-900/85 border border-blue-900/50 backdrop-blur-md px-4 py-3 rounded-xl">
                <div className="text-blue-400 font-bold text-xl">+300%</div>
                <div className="text-slate-400 text-xs">revenue growth</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS COUNTER ROW
      ══════════════════════════════════════ */}
      <div ref={statsRef} className="py-16 border-y" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.08)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 500, suffix: '+',  prefix: '',     label: 'Projects Delivered'        },
              { target: 8,   suffix: '+',  prefix: '',     label: 'Client Categories Served'  },
              { target: 3,   suffix: '+',  prefix: '',     label: 'Years Building AI Systems' },
              { target: 5,   suffix: '%',  prefix: 'Top ', label: 'Prompt Engineers Globally' },
            ].map((stat, i) => (
              <div key={i} className="gsap-reveal">
                <div className="text-4xl md:text-5xl font-bold tracking-tight mb-1 brand-gradient-text">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-sm font-medium" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <noscript>
          <div className="text-center text-sm text-slate-500 mt-4">500+ Projects Delivered · 8+ Client Categories · 3+ Years Building AI · Top 5% Prompt Engineers Globally</div>
        </noscript>
      </div>

      {/* ══════════════════════════════════════
          SECTION 4 — WHO WE HELP
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#060810' : '#F8FAFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">Who We Help</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              Built for every kind of ambitious person.
            </h2>
          </motion.div>

          {/* Audience tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 scrollbar-none">
            {audiences.map((a, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveAudience(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={i === activeAudience ? {
                  background: '#2563EB',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(37,99,235,0.4)',
                } : {
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.05)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.12)'}`,
                  color: isDark ? '#94A3B8' : '#64748B',
                }}
              >
                <a.icon size={14} />
                {a.label}
              </motion.button>
            ))}
          </div>

          {/* Active panel — min-h prevents CLS when switching tabs */}
          <div className="min-h-[320px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAudience}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Problems */}
              <div className="rounded-2xl p-7" style={{ background: isDark ? 'rgba(127,29,29,0.10)' : 'rgba(254,242,242,0.8)', border: `1px solid ${isDark ? 'rgba(153,27,27,0.2)' : 'rgba(254,202,202,0.5)'}` }}>
                <p className="text-red-500 text-xs font-bold uppercase tracking-[0.15em] mb-4">Your Situation</p>
                <ul className="space-y-3">
                  {audiences[activeAudience].problems.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                      <span className="text-sm" style={{ color: isDark ? '#CBD5E1' : '#4B5563' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Solution */}
              <div className="rounded-2xl p-7" style={{ background: isDark ? 'rgba(16,185,129,0.06)' : 'rgba(240,253,244,0.9)', border: `1px solid ${isDark ? 'rgba(16,185,129,0.15)' : 'rgba(167,243,208,0.6)'}` }}>
                <p className="text-emerald-500 text-xs font-bold uppercase tracking-[0.15em] mb-4">SYSmoAI's Fix</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: isDark ? '#CBD5E1' : '#4B5563' }}>
                  {audiences[activeAudience].solution}
                </p>
                <Link href={audiences[activeAudience].href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors group">
                  See full solution <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — SERVICES + PRICING TOGGLE
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">Services & Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              Pick your starting point.
            </h2>

            {/* BDT / USD Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-xl border" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)', borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)' }}>
              <motion.button
                onClick={() => setShowUSD(false)}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                style={!showUSD ? { background: '#2563EB', color: '#fff' } : { color: isDark ? '#64748B' : '#94A3B8' }}
              >৳ BDT</motion.button>
              <motion.button
                onClick={() => setShowUSD(true)}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                style={showUSD ? { background: '#2563EB', color: '#fff' } : { color: isDark ? '#64748B' : '#94A3B8' }}
              >$ USD</motion.button>
            </div>
          </motion.div>

          {/* Featured 3 services */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featuredServices.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="gsap-scale relative rounded-2xl p-7 glow-card flex flex-col"
                style={{
                  background: s.featured
                    ? isDark ? 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' : 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)'
                    : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(248,250,252,0.9)',
                  border: s.featured ? '1px solid rgba(96,165,250,0.3)' : `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)'}`,
                  boxShadow: s.featured ? '0 20px 60px rgba(37,99,235,0.25)' : undefined,
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Tag */}
                {s.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                  style={{ background: s.featured ? 'rgba(255,255,255,0.12)' : 'rgba(37,99,235,0.1)' }}>
                  <s.icon size={19} className={s.featured ? 'text-blue-200' : 'text-blue-400'} />
                </div>
                <h3 className="text-xl font-bold mb-1.5" style={{ color: s.featured ? '#FFFFFF' : isDark ? '#F1F5F9' : '#0A0B0F' }}>
                  {s.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: s.featured ? 'rgba(255,255,255,0.65)' : isDark ? '#64748B' : '#6B7280' }}>
                  {s.subtitle}
                </p>
                {(s as any).description && (
                  <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: s.featured ? 'rgba(255,255,255,0.55)' : isDark ? '#94A3B8' : '#6B7280' }}>
                    {(s as any).description}
                  </p>
                )}
                {(s as any).features && (
                  <ul className="space-y-1 mb-4">
                    {((s as any).features as string[]).map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-xs" style={{ color: s.featured ? 'rgba(255,255,255,0.65)' : isDark ? '#64748B' : '#6B7280' }}>
                        <span className="text-green-400 font-bold">✅</span> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold" style={{ color: s.featured ? '#FFFFFF' : isDark ? '#F1F5F9' : '#0A0B0F' }}>
                    {showUSD ? s.usdPrice : s.bdPrice}
                  </span>
                </div>
                <Link href={s.href}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={s.featured ? { background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }
                    : { background: '#2563EB', color: '#FFFFFF' }}>
                  Get Started <ChevronRight size={15} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Other 6 services chips */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="flex flex-wrap justify-center gap-3">
            {otherServices.map((s, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Link href={s.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.12)'}`,
                    color: isDark ? '#94A3B8' : '#4B5563',
                  }}>
                  <s.icon size={13} className="text-blue-400" />
                  {s.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/services" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
              All services <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — HOW IT WORKS
      ══════════════════════════════════════ */}
      <section ref={stepsRef} className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#060810' : '#F8FAFF' }}>
        <div className="pointer-events-none absolute inset-0">
          {steps.map((s, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: 240, height: 240,
                left: `${20 + i * 20}%`, top: i % 2 === 0 ? '10%' : '60%',
                background: `radial-gradient(ellipse, ${s.color}08 0%, transparent 70%)`,
              }} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              From discovery to deployed in days.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="gsap-scale relative rounded-2xl p-7 glow-card"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.1)'}`,
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Step number */}
                <div className="text-[10px] font-black tracking-[0.25em] mb-4 font-mono" style={{ color: step.color }}>{step.num}</div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}>
                  <step.icon size={21} style={{ color: step.color }} />
                </div>
                <h3 className="text-sm font-black tracking-[0.08em] mb-0.5" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
                  {step.title}
                </h3>
                <p className="text-xs font-semibold mb-2" style={{ color: step.color }}>{step.dayLabel}</p>
                <p className="text-sm leading-relaxed" style={{ color: isDark ? '#64748B' : '#6B7280' }}>{step.desc}</p>

                {/* Connector arrow (not last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center"
                    style={{ background: isDark ? '#0A0B0F' : '#F8FAFF' }}>
                    <ChevronRight size={12} className="text-blue-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mt-12">
            <motion.a href={WA_URLS.consultation} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg"
              style={{ boxShadow: '0 0 0 0 rgba(37,211,102,0)' }}
            >
              <MessageCircle size={21} />
              Book Free Discovery Call
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TOOLS TRUST STRIP
      ══════════════════════════════════════ */}
      <section className="py-12 border-y" style={{ background: isDark ? '#0A0B0F' : '#F8FAFF', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.08)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            Tools We Master
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { name: 'ChatGPT', emoji: '🤖' },
              { name: 'Claude', emoji: '🧠' },
              { name: 'Notion', emoji: '📋' },
              { name: 'n8n', emoji: '⚡' },
              { name: 'Zapier', emoji: '🔗' },
              { name: 'WhatsApp API', emoji: '💬' },
              { name: 'Make', emoji: '🔄' },
              { name: 'Google Workspace', emoji: '📊' },
            ].map((tool) => (
              <div key={tool.name}
                className="flex items-center gap-2 transition-colors duration-200 group cursor-default"
                style={{ color: isDark ? '#64748B' : '#6B7280' }}>
                <span className="text-xl group-hover:scale-110 transition-transform duration-200">{tool.emoji}</span>
                <span className="text-sm font-medium group-hover:opacity-100 transition-opacity" style={{ opacity: 0.75 }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — RESULTS / PROOF
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">Client Results</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              Real results. Verified numbers.
            </h2>
            <p className="mt-4 text-base" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
              We're documenting detailed case studies from our clients — real names, real numbers, real proof.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '500+',    label: 'Projects Delivered'        },
              { value: '15–20h',  label: 'Saved Per Week (avg)'      },
              { value: '3+ yrs',  label: 'Building AI Systems'       },
              { value: 'Top 5%',  label: 'Prompt Engineers Globally' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="text-center rounded-2xl p-6 border"
                style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFF', borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.12)' }}>
                <div className="text-2xl font-bold mb-1 brand-gradient-text">{s.value}</div>
                <div className="text-xs font-medium" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <Link href="/results"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all duration-200 hover:scale-105"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)', color: isDark ? '#94A3B8' : '#6B7280', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(248,250,252,0.8)' }}>
              See our results page <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION — FOUNDER
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-24 relative overflow-hidden" style={{ background: isDark ? '#060810' : '#F8FAFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-10 items-center"
          >
            {/* Founder Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-40 h-40 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-xl"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)' }}
              >
                EH
              </div>
            </div>

            {/* Founder Info */}
            <div>
              <div className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">
                Meet Your AI Architect
              </div>
              <h2 className="text-3xl font-bold mb-1" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
                Emon Hossain
              </h2>
              <p className="mb-4 text-sm" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                Founder & CEO, SYSmoAI · AI Systems Architect · Notion OS Builder
              </p>
              <blockquote
                className="text-lg leading-relaxed italic border-l-4 border-blue-500 pl-4 mb-6"
                style={{ color: isDark ? '#CBD5E1' : '#475569' }}
              >
                "I built SYSmoAI because I was you 3 years ago — overwhelmed, tool-hopping,
                and losing income while AI was changing everything. I spent 3 years mastering
                every AI tool, building real systems, and delivering 500+ projects.
                Most people don't need another tool. They need someone to build the system
                FOR them. That's SYSmoAI."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'AI Systems Architecture',    href: '/services/ai-sprint'     },
                  { label: 'Top 5% Prompt Engineering',  href: '/results'                },
                  { label: 'Notion OS',                  href: '/services/notion-os'     },
                  { label: 'n8n Automation',             href: '/services/n8n-automation'},
                  { label: 'AI Agent Design',            href: '/services/ai-agent-dev'  },
                  { label: '500+ Projects Delivered',    href: '/results'                },
                  { label: 'SEO Expert',                 href: '/services'               },
                  { label: 'AI Coaching',                href: '/services/ai-coaching'   },
                ].map(tag => (
                  <a
                    key={tag.label}
                    href={tag.href}
                    className="px-3 py-1 text-sm font-medium rounded-full border cursor-pointer no-underline transition-all duration-150"
                    style={{
                      background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF',
                      color: '#3B82F6',
                      borderColor: isDark ? 'rgba(59,130,246,0.2)' : '#BFDBFE',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = isDark ? 'rgba(37,99,235,0.2)' : '#DBEAFE';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = '#93C5FD';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = isDark ? 'rgba(59,130,246,0.2)' : '#BFDBFE';
                    }}
                  >
                    {tag.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 8 — SPLIT CTA
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDark ? '#060810' : '#F8FAFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Primary CTA — WhatsApp */}
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideLeft}
              className="rounded-3xl p-10 relative overflow-hidden gsap-scale"
              style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)' }}
            >
              <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(96,165,250,0.3) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Start a conversation</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-8">
                  Tell us your biggest problem. We'll tell you how AI solves it — for free.
                  No calls, no demos. Just WhatsApp.
                </p>
                <motion.a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-7 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-lg">
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </motion.div>

            {/* Secondary CTA — Free Audit */}
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideRight}
              className="rounded-3xl p-10 relative overflow-hidden gsap-scale"
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.12)'}`,
              }}
            >
              <div className="absolute inset-0 opacity-[0.025]" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.5) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                  <Sparkles size={24} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>Get a free AI audit</h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                  30 minutes. We analyze your workflow, identify your highest-ROI opportunity,
                  and give you a clear action plan.
                </p>
                <div className="space-y-2 mb-8">
                  {['100% free, no strings attached', 'Specific to your business', 'Real action plan, not a sales pitch'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: isDark ? '#CBD5E1' : '#4B5563' }}>
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <motion.a href="/free-ai-audit"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all duration-200"
                  style={{ background: '#2563EB', boxShadow: '0 0 24px rgba(37,99,235,0.35)' }}>
                  Book Free AI Audit <ChevronRight size={16} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 9 — WHAT WE ACTUALLY BUILD
      ══════════════════════════════════════ */}
      <section className="py-20" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full border mb-4"
              style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', color: '#3B82F6', borderColor: isDark ? 'rgba(37,99,235,0.25)' : '#DBEAFE' }}>
              Real Systems. Real Results.
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}>
              What We Actually Build For You
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: isDark ? '#64748B' : '#6B7280' }}>
              Not advice. Not templates. Custom AI systems deployed into your business — working on your data, from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Notion AI OS */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}` }}>
              <div className="h-52 flex items-center justify-center p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)' }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="text-white text-center relative z-10">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">🗂️</div>
                  <div className="font-bold text-xl">Notion AI OS</div>
                  <div className="text-blue-200 text-sm mt-1">Business Command Center</div>
                </div>
              </div>
              <div className="p-6" style={{ background: isDark ? '#111827' : '#FFFFFF' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}>Complete Business Operating System</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                  Every project, client, task, invoice, and KPI — connected in one AI-powered Notion workspace. Your business runs even when you're offline.
                </p>
                <ul className="space-y-1">
                  {['CRM & pipeline tracking', 'Automated task management', 'Real-time dashboards', 'Team SOPs & knowledge base'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: isDark ? '#64748B' : '#6B7280' }}>
                      <span className="text-green-500 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 2 — n8n Automation */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}` }}>
              <div className="h-52 flex items-center justify-center p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)' }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="text-white text-center relative z-10">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <div className="font-bold text-xl">n8n Automation</div>
                  <div className="text-emerald-200 text-sm mt-1">Workflows That Never Sleep</div>
                </div>
              </div>
              <div className="p-6" style={{ background: isDark ? '#111827' : '#FFFFFF' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}>End-to-End Workflow Automation</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                  WhatsApp → CRM → Invoice → Follow-up sequence. Fully automated pipelines connecting all your tools — zero manual steps.
                </p>
                <ul className="space-y-1">
                  {['WhatsApp auto-replies 24/7', 'Lead capture & qualification', 'Auto invoice generation', 'Follow-up sequences'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: isDark ? '#64748B' : '#6B7280' }}>
                      <span className="text-green-500 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 3 — Custom AI Agents */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'}` }}>
              <div className="h-52 flex items-center justify-center p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4338CA 100%)' }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="text-white text-center relative z-10">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">🤖</div>
                  <div className="font-bold text-xl">Custom AI Agents</div>
                  <div className="text-purple-200 text-sm mt-1">Working 24/7 For You</div>
                </div>
              </div>
              <div className="p-6" style={{ background: isDark ? '#111827' : '#FFFFFF' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}>AI Agents That Work While You Sleep</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                  Custom-trained AI agents for WhatsApp, web, and your platforms. Handle queries, qualify leads, and generate reports autonomously.
                </p>
                <ul className="space-y-1">
                  {['Customer support automation', 'Lead qualification & scoring', 'Automated report generation', 'Multi-platform deployment'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: isDark ? '#64748B' : '#6B7280' }}>
                      <span className="text-green-500 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <Link href="/services"
              className="inline-flex items-center gap-2 font-semibold transition-colors"
              style={{ color: '#3B82F6' }}>
              See all 9 AI services we build <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTERNATIONAL CLIENTS SECTION
      ══════════════════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(to right, #1E293B, #0F172A)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/30 mb-6">
                🌍 International Clients
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                World-Class AI Expertise.<br />Not World-Class Prices.
              </h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                US and EU AI consultants charge $200–$500/hr. SYSmoAI delivers the same quality — Notion OS, custom AI agents, n8n automation — at a fraction of the cost.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  '60–80% cost savings vs US/EU consultants',
                  'Top 5% prompt engineering globally',
                  'International payments via Wise & Payoneer',
                  'English-first communication, no language barrier',
                  'Results guarantee — we don\'t get paid until it works',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-blue-500/30 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/services/international"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200">
                See International Pricing (USD) <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="grid grid-cols-2 gap-4">
              {[
                { service: 'AI Quick Win',    bd: '৳3,750–৳7,500',    usd: '$50–$100'     },
                { service: 'AI Sprint',       bd: '৳25,000–৳50,000',  usd: '$300–$600'    },
                { service: 'AI Retainer',     bd: '৳20,000/mo',        usd: '$250/mo'      },
                { service: 'Notion OS Build', bd: '৳15,000–৳50,000',  usd: '$800–$5,000'  },
                { service: 'AI Agent Dev',    bd: '৳50,000+',          usd: '$2,500+'      },
                { service: '1:1 Coaching',    bd: '৳2,500/session',    usd: '$30/session'  },
              ].map(item => (
                <div key={item.service}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200">
                  <div className="text-slate-400 text-xs font-medium mb-2">{item.service}</div>
                  <div className="text-white font-semibold text-sm">{item.usd}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{item.bd} BD</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUSTED BY — GEOGRAPHIC REACH
      ══════════════════════════════════════ */}
      <section className="py-12" style={{ background: isDark ? '#0A0B0F' : '#F8FAFF' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            Trusted by businesses in
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
            <span>🇧🇩 Bangladesh</span>
            <span style={{ color: isDark ? '#334155' : '#CBD5E1' }}>·</span>
            <span>🇺🇸 United States</span>
            <span style={{ color: isDark ? '#334155' : '#CBD5E1' }}>·</span>
            <span>🇬🇧 United Kingdom</span>
            <span style={{ color: isDark ? '#334155' : '#CBD5E1' }}>·</span>
            <span>🇨🇦 Canada</span>
            <span style={{ color: isDark ? '#334155' : '#CBD5E1' }}>·</span>
            <span>🇦🇪 UAE</span>
            <span style={{ color: isDark ? '#334155' : '#CBD5E1' }}>·</span>
            <span>🇮🇳 India</span>
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden" style={{ background: isDark ? '#060810' : '#F8FAFF', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.08)'}` }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="max-w-4xl mx-auto px-4 text-center">

          {/* Urgency Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-10 flex items-start md:items-center gap-4 max-w-2xl mx-auto text-left">
            <span className="text-2xl shrink-0">⏰</span>
            <div>
              <p className="font-bold text-amber-900 text-sm md:text-base">
                Free AI Audit — Limited Availability
              </p>
              <p className="text-amber-700 text-sm mt-0.5">
                Emon personally conducts every discovery call. We keep slots limited to ensure quality. Book yours before this week fills up.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                <span className="text-green-700 text-xs font-medium">3 audit slots remaining this week</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <SYSmoAILogo size={32} variant={isDark ? 'brand-dark' : 'brand-light'} animated />
            <span className="text-xl font-bold tracking-[-0.02em]" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F', fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="font-bold">SYS</span>
              <span className="font-normal opacity-65">mo</span>
              <span className="font-bold">AI</span>
            </span>
          </div>
          <p className="text-sm italic mb-6" style={{ color: isDark ? '#475569' : '#94A3B8', fontFamily: "'Space Grotesk', sans-serif" }}>
            Systems in Motion.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors group">
            Get in touch today <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Trust Micro-copy */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            <span>✓ No commitment required</span>
            <span>✓ Reply within 2 hours</span>
            <span>✓ 100% free, no sales pitch</span>
            <span>✓ Serving Bangladesh & worldwide</span>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
