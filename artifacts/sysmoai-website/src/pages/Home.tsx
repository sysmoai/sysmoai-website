import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  MessageCircle, ChevronRight, Zap, Timer, RefreshCw, Users, BookOpen,
  Layout, Bot, Settings, Building, Globe, GraduationCap, Briefcase, Laptop,
  FlaskConical, Building2, ShoppingBag, Users2, Megaphone, Video, Star,
  CheckCircle2, AlertCircle, BarChart3, ArrowRight, Search, PenTool, Rocket,
  TrendingUp
} from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const audiences = [
  { icon: GraduationCap, label: 'Students', href: '/for/students', problems: ['Terrible prompts, no real AI skills', 'CV looks like everyone else\'s', 'No freelance portfolio or income'], solution: 'We teach you exactly which AI tools to learn for your career, build your portfolio, and launch your first freelance service — in 30 days.' },
  { icon: Briefcase, label: 'Job Seekers', href: '/for/job-seekers', problems: ['Getting rejected without knowing why', 'No AI skills on your CV', 'LinkedIn has 0 engagement'], solution: 'We overhaul your CV with AI skills, rebuild your LinkedIn, and build real portfolio projects so you get shortlisted.' },
  { icon: Laptop, label: 'Freelancers', href: '/for/freelancers', problems: ['Income dropped 30% — "ChatGPT can do this"', 'Stuck at low-ticket ৳500 projects', 'Chaotic client management'], solution: 'We upgrade your skills, build your premium service package, and set up a Notion CRM so you earn 3x more.' },
  { icon: FlaskConical, label: 'Researchers', href: '/for/researchers', problems: ['Literature review takes 4 weeks', 'Notes in 6 different apps', 'Paper writing is a bottleneck'], solution: 'We build your AI Research OS — literature review in 3 days, notes organized, papers written 3x faster.' },
  { icon: Building2, label: 'Agencies', href: '/for/agencies', problems: ['Competitors pitching AI — you have nothing', 'Content production is 3x slower than it should be', 'Proposals take 3-5 hours each'], solution: 'We deploy your complete agency AI stack in 14 days — content production, proposal builder, and team training.' },
  { icon: Star, label: 'SME Founders', href: '/for/sme-founders', problems: ['847 unread WhatsApp messages', 'No dashboard — you ask 5 people', '14-hour days with nothing automated'], solution: 'We build your AI business OS — WhatsApp auto-replies, connected tools, and a real-time dashboard.' },
  { icon: ShoppingBag, label: 'F-Commerce', href: '/for/f-commerce', problems: ['500 DMs a day, replying to 100', 'Order tracking in a notebook', '0 repeat customer follow-ups'], solution: 'We automate your Facebook DMs, build an order management system, and set up customer follow-up sequences.' },
  { icon: Users2, label: 'Consultants', href: '/for/consultants', problems: ['Onboarding takes 2-3 days manually', 'Warm leads go cold — revenue lost', 'Everything is in your head'], solution: 'We automate your onboarding, build a proposal system, and document your expertise into a searchable knowledge base.' },
  { icon: Video, label: 'Creators', href: '/for/creators', problems: ['50 ideas — 0 become posts', '1 YouTube video takes 2 days', 'No content calendar or system'], solution: 'We build your content pipeline OS, AI repurposing engine, and growth tracking dashboard.' },
  { icon: Megaphone, label: 'Corporates', href: '/for/corporates', problems: ['ChatGPT for 50 employees — 10% use it', 'AI strategy = slide deck, nothing implemented', 'Monthly reports take 3 days'], solution: 'We audit your operations, train your team, automate your top 3 bottlenecks, and give you a 90-day AI roadmap.' },
  { icon: Globe, label: 'International', href: '/for/international', problems: ['US/EU consultants charge $200-500/hr', 'Same quality at 60-80% less cost', 'International payments made easy'], solution: 'World-class AI expertise at Bangladesh rates. Wise & Payoneer accepted. English-first, no timezone confusion.' },
];

const featuredServices = [
  {
    icon: Zap,
    title: 'AI Quick Win',
    subtitle: 'Your #1 problem automated in 3 days',
    bdPrice: '৳3,750–7,500',
    usdPrice: '$50–$100',
    href: '/services/ai-quick-win',
    featured: false,
    guarantee: 'Guaranteed or we rebuild it free',
  },
  {
    icon: Timer,
    title: 'AI Sprint',
    subtitle: 'Full AI stack deployed in 14 days',
    bdPrice: '৳25,000–50,000',
    usdPrice: '$300–$600',
    href: '/services/ai-sprint',
    featured: true,
    guarantee: 'Most popular',
  },
  {
    icon: RefreshCw,
    title: 'AI Retainer',
    subtitle: 'Ongoing AI management, every month',
    bdPrice: '৳20,000/mo',
    usdPrice: '$250/mo',
    href: '/services/ai-retainer',
    featured: false,
    guarantee: 'Cancel anytime',
  },
];

const otherServices = [
  { icon: Users, label: '1:1 Coaching', href: '/services/ai-coaching' },
  { icon: BookOpen, label: 'Group Workshop', href: '/services/group-workshop' },
  { icon: Layout, label: 'Notion OS', href: '/services/notion-os' },
  { icon: Bot, label: 'AI Agent Dev', href: '/services/ai-agent-dev' },
  { icon: Settings, label: 'n8n Automation', href: '/services/n8n-automation' },
  { icon: Building, label: 'Corporate Training', href: '/services/corporate-training' },
];

const tools = [
  'ChatGPT', 'Claude', 'Notion', 'n8n', 'Zapier', 'WhatsApp API', 'Make', 'Google Workspace'
];

export default function Home() {
  const [activeAudience, setActiveAudience] = useState(0);
  const [showUSD, setShowUSD] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── SECTION 1: HERO ── */}
      <section className="relative bg-[#0A0B0F] pt-16 pb-20 md:pt-24 md:pb-28 flex items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB] opacity-[0.12] blur-[130px] rounded-full" />
          <div className="absolute left-1/4 top-1/4 w-[300px] h-[300px] bg-[#1E3A8A] opacity-[0.1] blur-[100px] rounded-full" />
          <div className="absolute right-1/4 bottom-1/3 w-[200px] h-[200px] bg-cyan-600 opacity-[0.06] blur-[80px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8"
          >
            <span>🇧🇩</span>
            Bangladesh's AI Consulting Company — Serving Clients Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-tight mb-6"
          >
            We Build AI Systems<br className="hidden sm:block" /> That Work For You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
          >
            Stop doing manually what AI can do automatically. SYSmoAI designs, builds, and deploys custom AI operating systems — so your business runs even when you're not in the room.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-[0_0_28px_rgba(37,211,102,0.4)] min-h-[52px]"
              data-testid="link-hero-whatsapp"
            >
              <MessageCircle size={22} />
              Start on WhatsApp
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all min-h-[52px]"
            >
              See How It Works
              <ChevronRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            {['Top 5% Prompt Engineers Globally', '500+ Projects Delivered', '8+ Client Categories'].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-500" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEM STATEMENT ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Running your business shouldn't feel like this.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: MessageCircle, emoji: '📱', title: 'Drowning in WhatsApp', desc: 'Orders, leads, and follow-ups lost in an endless inbox every day.' },
              { icon: AlertCircle, emoji: '🔄', title: 'Everything is manual', desc: 'Your team repeats the same tasks daily that AI could handle in seconds.' },
              { icon: BarChart3, emoji: '📊', title: 'No visibility', desc: 'You can\'t see what\'s happening in your business without asking 5 people.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-red-50 border border-red-100 p-8 rounded-2xl"
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">"{item.title}"</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center"
          >
            <p className="text-xl font-semibold text-slate-700 mb-6">There's a better way.</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              See Our Solutions <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: WHO WE HELP ── */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              One AI partner. Every type of business.
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Whether you're a solo freelancer or a corporate team — we have a solution built for your exact situation.
            </p>
          </motion.div>

          {/* Tab Row */}
          <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {audiences.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAudience(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeAudience === i
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  <a.icon size={15} />
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Audience Panel */}
          <motion.div
            key={activeAudience}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Top challenges for {audiences[activeAudience].label}:</h3>
                <ul className="space-y-3">
                  {audiences[activeAudience].problems.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">✗</span>
                      <span className="text-slate-600 text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">How SYSmoAI solves it:</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{audiences[activeAudience].solution}</p>
                <Link
                  href={audiences[activeAudience].href}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                >
                  See Full Solution <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT WE BUILD ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              From 3-day quick wins to full AI operating systems.
            </h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className={`text-sm font-medium ${!showUSD ? 'text-slate-900' : 'text-slate-400'}`}>🇧🇩 BDT ৳</span>
              <button
                onClick={() => setShowUSD(!showUSD)}
                className={`relative w-12 h-6 rounded-full transition-colors ${showUSD ? 'bg-blue-600' : 'bg-slate-300'}`}
                aria-label="Toggle currency"
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${showUSD ? 'left-7' : 'left-1'}`} />
              </button>
              <span className={`text-sm font-medium ${showUSD ? 'text-slate-900' : 'text-slate-400'}`}>🌍 USD $</span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10"
          >
            {featuredServices.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-2xl p-8 border transition-all ${
                  s.featured
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20 scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {s.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    {s.guarantee}
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.featured ? 'bg-white/20' : 'bg-blue-50'}`}>
                  <s.icon size={24} className={s.featured ? 'text-white' : 'text-blue-600'} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${s.featured ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                <p className={`text-sm mb-4 ${s.featured ? 'text-blue-100' : 'text-slate-500'}`}>{s.subtitle}</p>
                <p className={`text-2xl font-bold mb-1 ${s.featured ? 'text-white' : 'text-blue-600'}`}>
                  {showUSD ? s.usdPrice : s.bdPrice}
                </p>
                {!s.featured && (
                  <p className="text-xs text-slate-400 mb-5">{s.guarantee}</p>
                )}
                <Link
                  href={s.href}
                  className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${
                    s.featured ? 'text-white' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {otherServices.map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link
                  href={s.href}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl text-center transition-all group"
                >
                  <s.icon size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700">{s.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mt-8"
          >
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              See All Services <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: HOW IT WORKS ── */}
      <section className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              From chaos to AI-powered in 4 steps.
            </h2>
            <p className="text-slate-400 text-lg">You don't write a single line of code.</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent z-0" />
            {[
              { num: '01', icon: Search, title: 'DIAGNOSE', desc: 'Free 30-min discovery call. We map your biggest workflow problem and identify the highest-ROI fix.' },
              { num: '02', icon: PenTool, title: 'DESIGN', desc: 'We design your custom AI system — right tools, automations, and agents for your specific situation.' },
              { num: '03', icon: Zap, title: 'BUILD', desc: 'We build and deploy it. You just review and approve. No code. No complexity.' },
              { num: '04', icon: Rocket, title: 'SCALE', desc: 'We train your team and optimize for 3 months — your system grows with your business.' },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-600/20 border-2 border-blue-600/40 rounded-full flex items-center justify-center mb-5 relative">
                  <step.icon size={28} className="text-blue-400" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-3 tracking-wide">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="mt-14 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-blue-600/10 border border-blue-600/20 text-blue-300 px-6 py-3 rounded-xl text-sm font-medium">
              <Zap size={16} />
              Most clients see results in the first 72 hours. Guaranteed.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: SOCIAL PROOF & TRUST ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Real results. Real people.</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { quote: '"Emon built our entire AI operations system in one week. We went from chaos to complete clarity."', name: 'Rumi K.', role: 'E-commerce Founder', city: 'Dhaka' },
              { quote: '"The AI Quick Win saved us 15 hours of manual work every week — immediately. ROI in the first 3 days."', name: 'Sajid A.', role: 'Digital Agency Owner', city: 'Dhaka' },
              { quote: '"Finally someone who understands Bangladesh\'s market AND meets global AI standards."', name: 'Tanvir M.', role: 'Senior Freelancer', city: 'Chittagong' },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-slate-50 border border-slate-100 p-8 rounded-2xl"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 text-sm">{t.quote}</p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}, {t.city}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Founder Card */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-slate-900 rounded-2xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">EH</div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['AI Systems Architecture', 'Top 5% Prompt Engineering', '500+ Projects', 'Notion OS', 'n8n Automation'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs font-medium rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Emon Hossain — Founder & CEO, SYSmoAI</h3>
                <p className="text-blue-400 text-sm font-medium mb-4">AI Systems Architect · Notion OS Builder · Top 5% Prompt Engineer</p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  "I built SYSmoAI because I was you 3 years ago — overwhelmed, tool-hopping, and losing income while AI was changing everything. I spent 3 years mastering every AI tool, building real systems. Then I realized: most people don't need another tool. They need someone to build the system FOR them. That's SYSmoAI."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7: TOOL LOGOS ── */}
      <section className="py-14 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Tools We Master</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-700 hover:border-blue-300 hover:shadow-sm transition-all cursor-default"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#0A0B0F]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/20 via-transparent to-[#2563EB]/10" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[500px] h-[250px] bg-[#2563EB] opacity-[0.1] blur-[80px] rounded-[100%]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Your AI transformation starts with one conversation.
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Book your FREE 30-minute AI Audit. We'll identify your #1 bottleneck and show you exactly how to fix it — even if you don't hire us.
          </motion.p>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-5 rounded-xl font-bold text-xl transition-all hover:shadow-[0_0_32px_rgba(37,211,102,0.35)] min-h-[64px]"
              data-testid="link-cta-whatsapp"
            >
              <MessageCircle size={26} />
              Book Free AI Audit on WhatsApp
            </a>
            <p className="mt-4 text-slate-600 text-sm">We reply within 2 hours on working days.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
