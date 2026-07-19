import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { WA_URLS } from '../lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

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
    desc: "He tried Trello, Asana, spreadsheets, Notion without a system. They all failed alone. The problem wasn't the tools — it was the missing system.",
    metric: null
  },
  {
    icon: '⚡', step: '03',
    title: 'Years Mastering AI',
    desc: 'Deep focus on ChatGPT, Claude, Notion, n8n, and automation stacks. Not casual use — building real working systems and understanding where they break.',
    metric: 'Since 2022'
  },
  {
    icon: '🏗️', step: '04',
    title: 'Built His Own System',
    desc: 'He built a complete operating system for his own business. Everything connected. Follow-ups tracked. Visibility restored. Chaos reduced.',
    metric: null
  },
  {
    icon: '🚀', step: '05',
    title: 'First Client',
    desc: 'Peers and clients noticed the transformation and started asking: "Can you build this for us?" SYSmoAI began as a response to that question.',
    metric: 'First client: 2022'
  },
  {
    icon: '🌱', step: '06',
    title: 'Validation Stage',
    desc: 'SYSmoAI is now in active validation — building and delivering real systems for founder-led micro agencies in Bangladesh, starting with the Lead Rescue System pilot.',
    metric: 'Current: Lead Rescue pilot'
  },
];

const principles = [
  {
    icon: '🔨',
    title: 'We Build, Not Consult',
    desc: "You get a working, deployed system — not a strategy document or slide deck. We measure success by what runs, not what's recommended.",
    link: '/lead-rescue'
  },
  {
    icon: '✅',
    title: 'Acceptance Test, Not Promises',
    desc: 'Every delivery is validated with your own data. For Lead Rescue, that means a 5-lead acceptance test. You confirm it works before the balance is due.',
    link: '/lead-rescue'
  },
  {
    icon: '🎯',
    title: 'Your System, Your Control',
    desc: 'Every system we build is client-owned. Your workspace, your access, your data. Full documentation and handover — no ongoing dependency on us.',
    link: '/how-we-work'
  },
  {
    icon: '🇧🇩',
    title: 'Bangladesh-Rooted',
    desc: 'We understand Bangladesh business culture, F-commerce, WhatsApp-first workflows, and the local agency landscape that international firms never will.',
    link: '/lead-rescue'
  },
  {
    icon: '🔒',
    title: 'Honest About Stage',
    desc: "We're a validation-stage business. No inflated client counts, no fabricated case studies. Evidence only appears after real delivery and written client permission.",
    link: '/how-we-work'
  },
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
    document.title = 'About SYSmoAI & Founder Emon Hossain | AI Systems Bangladesh';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Meet Emon Hossain — Founder of SYSmoAI. A founder-led AI systems initiative building real, client-owned workflows for Bangladesh micro agencies. Currently in validation stage with the Lead Rescue System pilot.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Emon Hossain",
      "jobTitle": "Founder, SYSmoAI",
      "description": "Founder of SYSmoAI. AI systems builder focused on Notion OS, automation workflows, and lead management systems for Bangladesh founder-led businesses.",
      "url": "https://sysmoai.com/about",
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
        "AI Systems Architecture", "Notion OS Design",
        "n8n Automation", "Business Process Automation", "Lead Management Systems"
      ]
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* HERO */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500 mb-5"
          >
            SYSmoAI · Systems in Motion
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            From Overworked Founder<br />to AI Systems Builder
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Emon Hossain built SYSmoAI after solving his own business chaos with AI systems. Now he's doing the same for Bangladesh founder-led agencies — starting with the Lead Rescue System pilot.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/fit-check"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Book a Fit Check
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              💬 Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER CARD */}
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
                      alt="Emon Hossain — Founder, SYSmoAI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold" style={{ color: heading }}>Emon Hossain</h2>
                  <p className="text-blue-500 font-semibold">Founder · SYSmoAI · AI Systems Builder</p>
                </div>

                {/* Context tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    'AI Systems Architecture',
                    'Notion OS',
                    'n8n Automation',
                    'Lead Management Systems',
                    'Bangladesh · Founded 2022',
                  ].map(tag => (
                    <span key={tag}
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{
                        background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF',
                        color: isDark ? '#93C5FD' : '#1D4ED8',
                        border: `1px solid ${isDark ? 'rgba(37,99,235,0.2)' : '#BFDBFE'}`,
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Video placeholder */}
                <div className="mb-6 rounded-2xl p-6 text-center"
                  style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#0F172A', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#1E293B'}` }}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl leading-none">▶</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-sm">Watch: Why I Built SYSmoAI</h3>
                  <p className="text-slate-500 text-xs italic">Video coming soon</p>
                </div>

                <blockquote className="text-base leading-relaxed italic border-l-4 border-blue-500 pl-5 my-5"
                  style={{ color: isDark ? '#94A3B8' : '#374151' }}>
                  "I built SYSmoAI because I was you — overwhelmed, tool-hopping, and losing income while AI changed everything around me. I spent years mastering every AI tool. Then I realized: most people don't need another tool. They need someone to build the system for them."
                  <footer className="mt-3 text-sm font-semibold not-italic" style={{ color: body }}>
                    — Emon Hossain, Founder, SYSmoAI
                  </footer>
                </blockquote>

                {/* Contact links */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <a href="mailto:hello@sysmoai.com"
                    className="text-sm transition-colors hover:text-blue-500" style={{ color: bodyMuted }}>
                    hello@sysmoai.com
                  </a>
                  <a href="https://www.linkedin.com/in/emonhossainpro/" target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors flex items-center gap-1.5 hover:text-blue-500" style={{ color: bodyMuted }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
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
                    <p className="leading-relaxed" style={{ color: body }}>{step.desc}</p>
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

      {/* HOW WE OPERATE */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <p className="text-sm leading-relaxed flex-1" style={{ color: body }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interested in the Lead Rescue Pilot?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Start with a 15-minute Fit Check to see if your agency meets the criteria. Qualification only — no commitment.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fit-check"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-blue-50">
              Book a Fit Check
            </Link>
            <a href={WA_URLS.leadrescue} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              Message on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
