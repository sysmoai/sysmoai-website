import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  MessageCircle, ChevronRight, Zap, Timer, RefreshCw, Users, BookOpen,
  Layout, Bot, Settings, Building, Globe, GraduationCap, Briefcase, Laptop,
  FlaskConical, Building2, ShoppingBag, Users2, Megaphone, Video, Star,
  CheckCircle2, X, ArrowRight, Search, PenTool, Rocket, Quote, TrendingUp,
} from 'lucide-react';
import { WA_LINK } from '@/lib/config';

/* ─── VARIANTS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
};

/* ─── DATA ─── */
const audiences = [
  {
    icon: GraduationCap, label: 'Students', href: '/for/students',
    problems: ['Terrible prompts, no real AI skills', "CV looks like everyone else's", 'No freelance portfolio or income'],
    solution: 'We teach you exactly which AI tools to learn for your career, build your portfolio, and launch your first freelance service — in 30 days.',
  },
  {
    icon: Briefcase, label: 'Job Seekers', href: '/for/job-seekers',
    problems: ['Getting rejected without knowing why', 'No AI skills on your CV', 'LinkedIn has 0 engagement'],
    solution: 'We overhaul your CV with AI skills, rebuild your LinkedIn, and build real portfolio projects so you get shortlisted.',
  },
  {
    icon: Laptop, label: 'Freelancers', href: '/for/freelancers',
    problems: ['Income dropped — "ChatGPT can do this"', 'Stuck at low-ticket ৳500 projects', 'Chaotic client management'],
    solution: 'We upgrade your skills, build your premium service package, and set up a Notion CRM so you earn 3× more.',
  },
  {
    icon: FlaskConical, label: 'Researchers', href: '/for/researchers',
    problems: ['Literature review takes 4 weeks', 'Notes in 6 different apps', 'Paper writing is a bottleneck'],
    solution: 'We build your AI Research OS — literature review in 3 days, notes organized, papers written 3× faster.',
  },
  {
    icon: Building2, label: 'Agencies', href: '/for/agencies',
    problems: ['Competitors pitching AI — you have nothing', 'Content production is 3× slower than it should be', 'Proposals take 3–5 hours each'],
    solution: 'We deploy your complete agency AI stack in 14 days — content production, proposal builder, and team training.',
  },
  {
    icon: Star, label: 'SME Founders', href: '/for/sme-founders',
    problems: ['847 unread WhatsApp messages', 'No dashboard — you ask 5 people', '14-hour days with nothing automated'],
    solution: 'We build your AI business OS — WhatsApp auto-replies, connected tools, and a real-time dashboard.',
  },
  {
    icon: ShoppingBag, label: 'F-Commerce', href: '/for/f-commerce',
    problems: ['500 DMs a day, replying to 100', 'Order tracking in a notebook', '0 repeat customer follow-ups'],
    solution: 'We automate your Facebook DMs, build an order management system, and set up customer follow-up sequences.',
  },
  {
    icon: Users2, label: 'Consultants', href: '/for/consultants',
    problems: ['Onboarding takes 2–3 days manually', 'Warm leads go cold — revenue lost', 'Everything is in your head'],
    solution: 'We automate your onboarding, build a proposal system, and document your expertise into a searchable knowledge base.',
  },
  {
    icon: Video, label: 'Creators', href: '/for/creators',
    problems: ['50 ideas — 0 become posts', '1 YouTube video takes 2 days', 'No content calendar or system'],
    solution: 'We build your content pipeline OS, AI repurposing engine, and growth tracking dashboard.',
  },
  {
    icon: Megaphone, label: 'Corporates', href: '/for/corporates',
    problems: ['ChatGPT for 50 employees — 10% use it', 'AI strategy = slide deck, nothing implemented', 'Monthly reports take 3 days'],
    solution: 'We audit your operations, train your team, automate your top 3 bottlenecks, and give you a 90-day AI roadmap.',
  },
];

const featuredServices = [
  { icon: Zap,       title: 'AI Quick Win',  subtitle: 'Your #1 problem automated in 3 days', bdPrice: '৳3,750–7,500', usdPrice: '$50–$100', href: '/services/ai-quick-win', featured: false, tag: 'Best entry point' },
  { icon: Timer,     title: 'AI Sprint',     subtitle: 'Full AI stack deployed in 14 days',    bdPrice: '৳25,000–50,000', usdPrice: '$300–$600', href: '/services/ai-sprint', featured: true,  tag: 'Most popular' },
  { icon: RefreshCw, title: 'AI Retainer',   subtitle: 'Ongoing AI management every month',    bdPrice: '৳20,000/mo', usdPrice: '$250/mo', href: '/services/ai-retainer', featured: false, tag: 'Cancel anytime' },
];

const otherServices = [
  { icon: Users,    label: '1:1 Coaching',   href: '/services/ai-coaching'        },
  { icon: BookOpen, label: 'Workshop',        href: '/services/group-workshop'     },
  { icon: Layout,   label: 'Notion OS',       href: '/services/notion-os'          },
  { icon: Bot,      label: 'AI Agent Dev',    href: '/services/ai-agent-dev'       },
  { icon: Settings, label: 'n8n Automation',  href: '/services/n8n-automation'     },
  { icon: Building, label: 'Corp Training',   href: '/services/corporate-training' },
];

const testimonials = [
  { quote: 'Emon built our entire AI operations system in one week. We went from chaos to complete clarity.', name: 'Rumi K.', role: 'E-commerce Founder', city: 'Dhaka', result: '15 hrs saved/week' },
  { quote: 'The AI Quick Win saved us 15 hours of manual work every week — immediately. ROI in the first 3 days.', name: 'Sajid A.', role: 'Digital Agency Owner', city: 'Dhaka', result: '3-day ROI' },
  { quote: "Finally someone who understands Bangladesh's market AND meets global AI standards.", name: 'Tanvir M.', role: 'Senior Freelancer', city: 'Chittagong', result: 'Revenue 3×' },
];

const steps = [
  { num: '01', icon: Search,   title: 'DIAGNOSE', desc: 'Free 30-min discovery call. We map your biggest workflow problem and identify the highest-ROI fix.' },
  { num: '02', icon: PenTool,  title: 'DESIGN',   desc: 'We design your custom AI system — right tools, automations, and agents for your specific situation.' },
  { num: '03', icon: Zap,      title: 'BUILD',    desc: 'We build and deploy it. You just review and approve. No code. No complexity.' },
  { num: '04', icon: Rocket,   title: 'SCALE',    desc: 'We train your team and optimise for 3 months — your system grows with your business.' },
];

/* ═══════════════════════════════════
   HOME PAGE
═══════════════════════════════════ */
export default function Home() {
  const [activeAudience, setActiveAudience] = useState(0);
  const [showUSD, setShowUSD] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* ══════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════ */}
      <section className="relative bg-[#0A0B0F] min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Glow layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600 opacity-[0.10] blur-[140px]" />
          <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-indigo-700 opacity-[0.08] blur-[100px]" />
          <div className="absolute right-1/4 bottom-1/3 w-[250px] h-[250px] rounded-full bg-cyan-600 opacity-[0.06] blur-[90px]" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.8) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600/[0.12] border border-blue-500/25 text-blue-400 text-sm font-medium px-5 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            🇧🇩 Bangladesh's AI Consulting Company — Serving Clients Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-[-0.025em] leading-[1.08] mb-6"
          >
            We Build AI Systems<br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              That Work For You
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stop doing manually what AI can do automatically. SYSmoAI designs, builds, and deploys
            custom AI operating systems — so your business runs even when you're not in the room.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              data-testid="link-hero-whatsapp"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-[0_0_32px_rgba(37,211,102,0.4)] min-w-[220px] justify-center">
              <MessageCircle size={21} />
              Start on WhatsApp
            </a>
            <Link href="/services"
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 min-w-[200px] justify-center">
              See How It Works
              <ChevronRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              { label: 'Top 5% Prompt Engineers Globally' },
              { label: '500+ Projects Delivered' },
              { label: '8+ Client Categories' },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-slate-600 tracking-wider uppercase">scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          SECTION 2 — PROBLEM STATEMENT
      ══════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Running your business shouldn't feel like this.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
          >
            {[
              { emoji: '📱', title: 'Drowning in WhatsApp', desc: 'Orders, leads, and follow-ups lost in an endless inbox every single day.' },
              { emoji: '🔄', title: 'Everything is manual', desc: 'Your team repeats the same tasks daily that AI could handle in seconds.' },
              { emoji: '📊', title: 'No visibility', desc: "You can't see what's happening in your business without asking 5 people." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative bg-red-950/30 border border-red-900/30 rounded-2xl p-7 hover:border-red-700/40 transition-all duration-300">
                <div className="absolute top-4 right-4 opacity-10 text-4xl font-black text-red-400">✗</div>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2">"{item.title}"</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center"
          >
            <p className="text-xl font-semibold text-slate-300 mb-5">There's a better way.</p>
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              See how SYSmoAI fixes this <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 3 — WHO WE HELP (tabs)
      ══════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-10"
          >
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Who We Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              One AI partner. Every type of business.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Whether you're a solo freelancer or a corporate team — we have a solution built for your exact situation.
            </p>
          </motion.div>

          {/* Tab row — horizontally scrollable */}
          <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4 scrollbar-none">
            <div className="flex gap-2 min-w-max">
              {audiences.map((a, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveAudience(i)}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeAudience === i
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <a.icon size={14} />
                  {a.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAudience}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* Left — Problems */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                      {React.createElement(audiences[activeAudience].icon, { size: 18, className: 'text-red-500' })}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Top challenges for {audiences[activeAudience].label}:
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {audiences[activeAudience].problems.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                          <X size={11} className="text-red-500" />
                        </span>
                        <span className="text-slate-600 text-sm leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — Solution */}
                <div className="p-8 bg-slate-50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={18} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">How SYSmoAI solves it:</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8 text-sm">
                    {audiences[activeAudience].solution}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={audiences[activeAudience].href}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-600/20">
                      See Full Solution <ArrowRight size={15} />
                    </Link>
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white">
                      <MessageCircle size={14} />
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 4 — WHAT WE BUILD
      ══════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-4"
          >
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
              From 3-day quick wins to full AI operating systems.
            </h2>

            {/* Currency toggle */}
            <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
              <span className={`text-sm font-semibold transition-colors ${!showUSD ? 'text-white' : 'text-slate-500'}`}>🇧🇩 BDT ৳</span>
              <button onClick={() => setShowUSD(!showUSD)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${showUSD ? 'bg-blue-600' : 'bg-slate-700'}`}
                aria-label="Toggle currency">
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${showUSD ? 'translate-x-[22px]' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-semibold transition-colors ${showUSD ? 'text-white' : 'text-slate-500'}`}>🌍 USD $</span>
            </div>
          </motion.div>

          {/* Featured 3 */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 mb-8"
          >
            {featuredServices.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  s.featured
                    ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-600/30 scale-[1.02]'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-xl'
                }`}>
                {s.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full tracking-wide">
                    {s.tag}
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.featured ? 'bg-white/20' : 'bg-blue-600/15'}`}>
                  <s.icon size={22} className={s.featured ? 'text-white' : 'text-blue-400'} />
                </div>
                <h3 className={`text-xl font-bold mb-1.5 ${s.featured ? 'text-white' : 'text-white'}`}>{s.title}</h3>
                <p className={`text-sm mb-5 ${s.featured ? 'text-blue-100' : 'text-slate-400'}`}>{s.subtitle}</p>
                <p className={`text-2xl font-bold mb-1 ${s.featured ? 'text-white' : 'text-blue-400'}`}>
                  {showUSD ? s.usdPrice : s.bdPrice}
                </p>
                {!s.featured && <p className="text-xs text-slate-500 mb-5">{s.tag}</p>}
                <Link href={s.href}
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    s.featured ? 'text-white hover:text-blue-100' : 'text-blue-400 hover:text-blue-300'
                  }`}>
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Other 6 */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8"
          >
            {otherServices.map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={s.href}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-600/40 rounded-xl text-center transition-all duration-200 group">
                  <s.icon size={19} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 leading-tight">{s.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Browse all 10 services <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 5 — HOW IT WORKS
      ══════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#060810]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              From chaos to AI-powered in 4 steps.
            </h2>
            <p className="text-slate-400 text-lg">You don't write a single line of code.</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {/* connector line */}
            <div className="hidden lg:block absolute top-10 left-[13%] right-[13%] h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent z-0" />

            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-600/[0.12] border border-blue-600/25 flex items-center justify-center">
                    <step.icon size={26} className="text-blue-400" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-black text-white">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mb-3 tracking-[0.1em]">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 bg-blue-600/[0.08] border border-blue-600/20 text-blue-300 px-6 py-3 rounded-xl text-sm font-medium">
              <Zap size={15} />
              Most clients see results in the first 72 hours. Guaranteed.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 6 — SOCIAL PROOF
      ══════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Real results. Real people.</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative bg-white border border-slate-200 rounded-2xl p-7 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                <Quote size={28} className="text-blue-100 mb-4" />
                <p className="text-slate-700 leading-relaxed mb-6 text-sm italic">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role} · {t.city}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {t.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { val: '500+', label: 'Projects Delivered' },
              { val: '3+',   label: 'Years Experience'   },
              { val: '8+',   label: 'Industries Served'  },
              { val: 'Top 5%', label: 'Prompt Engineers Globally' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="text-3xl font-black text-blue-600 mb-1">{s.val}</div>
                <div className="text-xs font-medium text-slate-500 leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mt-10">
            <Link href="/proof" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              See full case studies <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 7 — FINAL CTA
      ══════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0B0F] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-700 opacity-[0.12] blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 px-4 py-1.5 rounded-full border border-blue-600/25 bg-blue-600/[0.08]">
                Book a Free AI Audit
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
              Ready to run your business<br />on autopilot?
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute AI Audit. We'll identify your top 3 automation opportunities
              and tell you exactly what to do — no pitch, no commitment.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ead57] text-white px-9 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-[0_0_36px_rgba(37,211,102,0.4)] min-w-[240px] justify-center">
                <MessageCircle size={22} />
                Book Free Audit Now
              </a>
              <Link href="/services"
                className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200">
                Explore Services <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-8 text-slate-600 text-sm">
              🇧🇩 Bangladesh rates · Worldwide delivery · Reply in &lt; 2 hours
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
