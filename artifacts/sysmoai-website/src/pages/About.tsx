import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { WA_URLS } from '../lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import { DirectAnswer } from '@/components/DirectAnswer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const InlineLink = ({ href, children, isDark }: { href: string; children: React.ReactNode; isDark: boolean }) => (
  <a href={href} style={{ color: isDark ? '#93C5FD' : '#2563EB' }}
    className="hover:underline decoration-blue-400 transition-colors duration-150">
    {children}
  </a>
);

const timeline = [
  {
    icon: '🧠', step: '01',
    title: 'The Overwhelm Begins',
    desc: 'Emon was running a solo business — managing orders, follow-ups, content, and clients entirely manually. Sound familiar?',
    metric: null
  },
  {
    icon: '😤', step: '02',
    title: 'Every Tool Failed',
    desc: 'He tried Trello, Asana, spreadsheets, Notion without a system. They all failed alone. The problem wasn\'t the tools — it was the missing system.',
    metric: null
  },
  {
    icon: '⚡', step: '03',
    title: '3 Years Mastering AI',
    desc: 'Deep mastery of ChatGPT, Claude, Notion, n8n, and full automation stacks. Not casual use — building real production systems.',
    metric: '3 years · 10,000+ hours'
  },
  {
    icon: '🏗️', step: '04',
    title: 'Built His Own AI OS',
    desc: null,
    metric: null,
    descNode: (isDark: boolean) => <>He built a complete <InlineLink href="/services/ai-sprint" isDark={isDark}>AI Operating System</InlineLink> for his own business. Everything connected. Follow-ups automated. Visibility restored. Chaos ended.</>
  },
  {
    icon: '🚀', step: '05',
    title: 'Results Followed',
    desc: 'Revenue grew. Time freed up. Clients and peers noticed the transformation and started asking: "Can you build this for us?"',
    metric: 'First client: 2022'
  },
  {
    icon: '🌍', step: '06',
    title: 'SYSmoAI Was Born',
    desc: null,
    metric: '500+ projects · 8+ categories · Bangladesh → World',
    descNode: (isDark: boolean) => <>To give every founder, freelancer, and team the same unfair competitive advantage — AI systems that work, built by someone who needed them first. Now serving <InlineLink href="/services/international" isDark={isDark}>clients worldwide</InlineLink>.</>
  },
];

const principles = [
  {
    icon: '🔨',
    title: 'We Build, Not Consult',
    desc: 'You get a working, deployed AI system — not a strategy document or slide deck. We measure success by what runs, not what\'s recommended.',
    link: '/services/ai-quick-win'
  },
  {
    icon: '✅',
    title: 'Results First',
    desc: 'We don\'t get paid until your system delivers ROI. If the stated goal isn\'t met on a Quick Win, we rebuild it at no extra charge.',
    link: '/results'
  },
  {
    icon: '🎯',
    title: 'Your System, Your Control',
    desc: 'Every system we build comes with documentation and training. Your team runs it independently after day 1. No dependency on us.',
    link: '/services/ai-sprint'
  },
  {
    icon: '🇧🇩',
    title: 'Bangladesh-Rooted',
    desc: null,
    link: '/services',
    descNode: (isDark: boolean) => <>We understand bKash, Nagad, <InlineLink href="/for/f-commerce" isDark={isDark}>F-commerce</InlineLink>, WhatsApp-first business culture, and local market realities that global firms never will.</>
  },
  {
    icon: '🌍',
    title: 'Global Standards',
    desc: null,
    link: '/pricing',
    descNode: (isDark: boolean) => <>Top 5% prompt engineering. International AI best practices. Our quality benchmark is global — not the local average. Clients in US, UK, Canada trust our <InlineLink href="/services/international" isDark={isDark}>international services</InlineLink>.</>
  },
];

const stats = [
  { label: 'Prompt Engineers Globally', value: 'Top 5%' },
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Client Categories Served', value: '8+' },
  { label: 'Years Building AI Systems', value: '3+' },
];

const skillTags = [
  { label: 'AI Systems Architecture', href: '/services' },
  { label: 'Prompt Engineering', href: '/free-ai-audit' },
  { label: 'Notion OS', href: '/services/notion-os' },
  { label: 'n8n Automation', href: '/services/n8n-automation' },
  { label: 'AI Agent Design', href: '/services/ai-agent-dev' },
  { label: '500+ Projects', href: '/results' },
  { label: 'SEO Expert', href: '/services' },
  { label: 'AI Coaching', href: '/services/ai-coaching' },
];

const credentials = [
  { icon: '🏆', number: 'Top 5%', label: 'Prompt Engineers Globally', sub: 'Verified benchmark' },
  { icon: '📦', number: '500+', label: 'Projects Delivered', sub: 'AI systems & automations' },
  { icon: '🗓️', number: '3+', label: 'Years Building AI', sub: 'Notion, n8n, AI Agents' },
];

export default function About() {
  const { isDark } = useTheme();

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const bodyMuted = isDark ? '#64748B' : '#64748B';

  useEffect(() => {
    document.title = 'About SYSmoAI & Founder Emon Hossain | AI Systems Architect Bangladesh';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Meet Emon Hossain — AI Systems Architect, Top 5% Prompt Engineer globally, 500+ projects delivered. SYSmoAI was built from his own 3-year AI journey. Bangladesh-based, globally-rated.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Emon Hossain",
      "jobTitle": "Founder & CEO, AI Systems Architect",
      "description": "Top 5% Prompt Engineer globally. 500+ AI projects delivered. Founder of SYSmoAI — Bangladesh's AI consulting company. Specializes in Notion OS, n8n automation, and custom AI agent development.",
      "url": "https://sysmoai.com/about",
      "image": "https://sysmoai.com/founder.jpg",
      "email": "hello@sysmoai.com",
      "telephone": "+8801711638693",
      "worksFor": {
        "@type": "Organization",
        "name": "SYSmoAI",
        "url": "https://sysmoai.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD"
      },
      "knowsAbout": [
        "AI Systems Architecture", "Prompt Engineering", "Notion OS Design",
        "n8n Automation", "AI Agent Development", "Business Process Automation", "SEO"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/emonhossainpro/",
        "https://www.facebook.com/sysmoai",
        "https://www.instagram.com/sysmoai/",
        "https://www.linkedin.com/company/sysmoai"
      ]
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* ── HERO ── */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500 mb-5"
          >
            SYSmoAI · Systems in Motion
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            From Overworked Founder to AI Visionary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            After 3 years of building his own AI operating system and delivering{' '}
            <a href="/results" className="text-blue-400 hover:text-blue-300 underline decoration-blue-600 transition-colors">500+ projects</a>,
            Emon Hossain created SYSmoAI — so founders, agencies and freelancers in Bangladesh and{' '}
            <a href="/services/international" className="text-blue-400 hover:text-blue-300 underline decoration-blue-600 transition-colors">worldwide</a>{' '}
            can achieve the same freedom.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/free-ai-audit"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              📅 Book Free 30-Min Consultation
            </a>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              💬 Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Direct Answer — GEO */}
      <section className="pt-10 pb-0" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DirectAnswer bangla="ইমন হোসেন হলেন SYSmoAI-এর প্রতিষ্ঠাতা ও CEO — বিশ্বব্যাপী শীর্ষ ৫% প্রম্পট ইঞ্জিনিয়ার এবং ৫০০+ AI প্রজেক্ট সম্পন্নকারী। তিনি ২০২২ সালে ঢাকায় SYSmoAI প্রতিষ্ঠা করেন।">
            Emon Hossain is the founder of SYSmoAI — Bangladesh's AI consulting company. Ranked top 5% globally in prompt engineering with 500+ AI projects delivered across 8+ industries. He founded SYSmoAI in 2022 in Dhaka after spending 3 years mastering ChatGPT, Claude, Notion, n8n, and automation stacks. Now serving clients in Bangladesh and worldwide.
          </DirectAnswer>
        </div>
      </section>

      {/* ── FOUNDER CARD ── */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="rounded-2xl p-8 md:p-12 shadow-sm"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="flex flex-col md:flex-row gap-8 items-start">

              {/* Photo */}
              <div className="shrink-0 self-start">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl"
                    style={{ border: `4px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#FFFFFF'}`, outline: `4px solid ${isDark ? 'rgba(37,99,235,0.3)' : '#BFDBFE'}` }}>
                    <img
                      src="/founder.jpg"
                      alt="Emon Hossain — Founder & CEO, SYSmoAI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold" style={{ color: heading }}>Emon Hossain</h2>
                  <p className="text-blue-500 font-semibold">
                    Founder & CEO · AI Systems Architect ·{' '}
                    <a href="/results" className="hover:underline decoration-blue-400 transition-colors">Top 5% Prompt Engineer</a>
                  </p>
                </div>

                {/* Credentials grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {credentials.map((cred) => (
                    <div key={cred.label} className="text-center p-4 rounded-xl"
                      style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#BFDBFE'}` }}>
                      <div className="text-3xl mb-2">{cred.icon}</div>
                      <div className="text-2xl font-bold text-blue-500">{cred.number}</div>
                      <div className="font-semibold text-sm" style={{ color: isDark ? '#CBD5E1' : '#1E3A5F' }}>{cred.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: body }}>{cred.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {skillTags.map(tag => (
                    <a key={tag.label} href={tag.href}
                      className="px-3 py-1 text-sm font-medium rounded-full transition-all duration-150"
                      style={{
                        background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF',
                        color: isDark ? '#93C5FD' : '#1D4ED8',
                        border: `1px solid ${isDark ? 'rgba(37,99,235,0.2)' : '#BFDBFE'}`,
                      }}>
                      {tag.label}
                    </a>
                  ))}
                </div>

                {/* Founder video placeholder */}
                <div className="mb-6 rounded-2xl p-8 text-center"
                  style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#0F172A', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#1E293B'}` }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span className="text-white text-2xl leading-none">▶</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Watch: Why I Built SYSmoAI</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    60 seconds. Emon explains the journey from overwhelmed founder to AI systems architect.
                  </p>
                  <p className="text-slate-500 text-xs italic">
                    Video coming soon — subscribe to be notified
                  </p>
                </div>

                <blockquote className="text-lg leading-relaxed italic border-l-4 border-blue-500 pl-5 my-5"
                  style={{ color: isDark ? '#94A3B8' : '#374151' }}>
                  "I built SYSmoAI because I was you 3 years ago — overwhelmed, tool-hopping, and losing income while AI changed everything around me. I spent 3 years mastering every AI tool. Then I realized: most people don't need another tool. They need someone to build the system FOR them."
                  <footer className="mt-3 text-sm font-semibold not-italic" style={{ color: body }}>
                    — Emon Hossain, Founder & CEO, SYSmoAI
                  </footer>
                </blockquote>

                {/* Social links */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <a href="https://www.linkedin.com/in/emonhossainpro/" target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors flex items-center gap-1.5 hover:text-blue-500" style={{ color: bodyMuted }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Personal LinkedIn
                  </a>
                  <a href="https://www.linkedin.com/company/sysmoai" target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors flex items-center gap-1.5 hover:text-blue-500" style={{ color: bodyMuted }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.063 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    SYSmoAI Company Page
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 md:py-24" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-center mb-14" style={{ color: heading }}>
            How SYSmoAI Came to Be
          </motion.h2>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/40 via-blue-600/20 to-transparent" />
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-10">
              {timeline.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl relative z-10"
                    style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#BFDBFE'}` }}>
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">{step.step}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2" style={{ color: heading }}>{step.title}</h3>
                    <p className="leading-relaxed" style={{ color: body }}>
                      {step.descNode ? step.descNode(isDark) : step.desc}
                    </p>
                    {step.metric && (
                      <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ background: isDark ? 'rgba(37,99,235,0.12)' : '#DBEAFE', color: isDark ? '#93C5FD' : '#1D4ED8' }}>
                        {step.metric}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW WE OPERATE ── */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-center mb-12" style={{ color: heading }}>
            How We Operate
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-2xl flex flex-col"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: heading }}>{p.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: body }}>
                  {p.descNode ? p.descNode(isDark) : p.desc}
                </p>
                <a href={p.link}
                  className="text-sm font-semibold mt-4 inline-flex items-center gap-1 transition-colors text-blue-500 hover:text-blue-400">
                  See example →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="py-20" style={{ background: isDark ? '#060810' : '#0F172A' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-2">Proven Results. Verified Numbers.</h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto mb-12">
              Every number below is backed by real projects, real clients, and real outcomes — not projections or estimates.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-3xl font-bold text-blue-400 mb-2">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
                <a href="/results" className="text-blue-500 text-xs font-semibold hover:underline mt-2 inline-block">
                  See case studies →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-blue-100 text-lg mb-4 max-w-xl mx-auto">
            Book a free 30-minute consultation where we analyse your workflow,
            identify your highest-ROI AI opportunity, and design a clear action plan.
          </motion.p>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-blue-200 text-sm mb-10">
            No commitment required. No sales pitch. Just a practical plan you can act on.
          </motion.p>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { icon: '🔍', title: 'Workflow audit', desc: 'We map where your time goes' },
              { icon: '💡', title: 'AI opportunity', desc: 'We identify the highest-ROI fix' },
              { icon: '📋', title: 'Action plan', desc: 'You leave with a clear next step' },
            ].map(item => (
              <motion.div key={item.title} variants={fadeUp}
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-white text-sm">{item.title}</div>
                <div className="text-blue-200 text-xs mt-1">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/free-ai-audit"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-blue-50">
              📅 Book via Free Audit Page
            </a>
            <a href={WA_URLS.consultation} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              💬 Start on WhatsApp
            </a>
          </motion.div>

          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-blue-300 text-sm mt-6">
            Prefer email? Write to{' '}
            <a href="mailto:hello@sysmoai.com" className="text-white underline hover:text-blue-100">
              hello@sysmoai.com
            </a>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
