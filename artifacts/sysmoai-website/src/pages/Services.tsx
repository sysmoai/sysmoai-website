import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Zap, Timer, RefreshCw, Users, BookOpen, Layout, Bot, Settings, Building, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import { WA_URLS } from '../lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import { DirectAnswer } from '@/components/DirectAnswer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.09 } } };

const featured = [
  { icon: Zap, title: 'AI Quick Win', subtitle: 'Your #1 problem automated in 3 days', bd: '৳3,750–7,500', usd: '$50–$100', href: '/services/ai-quick-win', tag: 'Best starting point' },
  { icon: Timer, title: 'F-Commerce AI Sprint', subtitle: 'Full F-Commerce AI stack deployed in 14 days', bd: '৳50,000', usd: '$600', href: '/services/ai-sprint', tag: 'Most popular' },
  { icon: RefreshCw, title: 'AI Operations Retainer', subtitle: 'Ongoing AI management, every month', bd: '৳20,000/mo', usd: '$250/mo', href: '/services/ai-retainer', tag: 'Cancel anytime' },
];

const other = [
  { icon: Users, title: '1:1 AI Coaching', desc: '60-min personalized session', bd: '৳2,500/session', href: '/services/other-engagements' },
  { icon: BookOpen, title: 'Group AI Workshop', desc: 'Team upskilling, half-day', bd: '৳500/person', href: '/services/other-engagements' },
  { icon: Layout, title: 'Notion OS Build', desc: 'Your business in one place', bd: '৳15,000–50,000', href: '/services/other-engagements' },
  { icon: Bot, title: 'AI Agent Development', desc: 'Custom AI agents, 24/7', bd: '৳50,000–2,00,000', href: '/services/other-engagements' },
  { icon: Settings, title: 'n8n Automation', desc: 'Per-workflow automation', bd: '৳2,000–10,000', href: '/services/other-engagements' },
  { icon: Building, title: 'Corporate Training', desc: 'Enterprise AI adoption', bd: '৳50,000–2,00,000', href: '/services/other-engagements' },
  { icon: Globe, title: 'International Clients', desc: 'USD pricing, global delivery', bd: 'View USD Pricing', href: '/services/international' },
];

const servicesFAQ = [
  { q: 'How long does each package take?', a: 'AI Quick Win: 3 days. F-Commerce AI Sprint: 14 days. AI Operations Retainer: ongoing monthly.' },
  { q: 'Can I start with a Quick Win and upgrade later?', a: 'Absolutely. Most clients start with a Quick Win to see results fast, then move to a Sprint for full transformation.' },
  { q: 'What if I need more workflows than included?', a: 'We scope every project individually. If you need more, we adjust the package or recommend the next tier.' },
  { q: 'Do you work with international clients?', a: 'Yes. We accept USD via Wise, Payoneer, and Stripe. We coordinate across timezones and communicate in English.' },
  { q: "What's your revision policy?", a: 'Quick Win includes 1 free revision. Sprint includes unlimited revisions during the 14-day build. Retainer includes continuous improvements.' },
];

const comparison = [
  { feature: 'Workflows automated', qw: '1', sprint: '5–10', retainer: 'Ongoing' },
  { feature: 'Timeline', qw: '3 days', sprint: '14 days', retainer: 'Monthly' },
  { feature: 'Team training', qw: 'Video walkthrough', sprint: 'Full training + docs', retainer: 'Continuous' },
  { feature: 'Revisions', qw: '1 free', sprint: 'Unlimited during build', retainer: 'Continuous' },
  { feature: 'Support', qw: 'WhatsApp (1 week)', sprint: '30 days post-launch', retainer: 'Priority (ongoing)' },
  { feature: 'Payment', qw: '100% upfront', sprint: '50/50', retainer: 'Monthly' },
  { feature: 'Best for', qw: 'Quick relief', sprint: 'Full transformation', retainer: 'Continuous growth' },
];

function FAQItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
      }}
    >
      <div className="flex justify-between items-center p-5">
        <span className="font-semibold pr-4" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>{q}</span>
        <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: isDark ? '#64748B' : '#94A3B8' }} />
      </div>
      {open && <p className="text-sm px-5 pb-5 leading-relaxed" style={{ color: isDark ? '#94A3B8' : '#475569' }}>{a}</p>}
    </div>
  );
}

export default function Services() {
  const { isDark } = useTheme();

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const bodyMuted = isDark ? '#64748B' : '#94A3B8';

  useEffect(() => {
    document.title = 'AI Services — SYSmoAI | Automation, Notion OS, AI Agents for Bangladesh';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'From 3-day quick wins to full AI operating systems. AI automation, Notion OS builds, AI agent development, n8n workflows, and corporate training. Bangladesh rates, global standards.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": servicesFAQ.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500 mb-5"
          >
            SYSmoAI · Systems in Motion
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            The F-Commerce AI Sprint — and Everything Around It
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our anchor offer is the 14-day F-Commerce AI Sprint. Everything else is by inquiry — for founders who need something beyond the Sprint.
          </motion.p>
        </div>
      </section>

      {/* Direct Answer — GEO */}
      <section className="pt-10 pb-0" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4">
          <DirectAnswer bangla="SYSmoAI-এর প্রধান সেবাগুলো: AI কুইক উইন (৳৩,৭৫০–৳৭,৫০০, ৩ দিন), F-কমার্স AI স্প্রিন্ট (৳৫০,০০০, ১৪ দিন), AI রিটেইনার (৳২০,০০০/মাস)।">
            SYSmoAI's AI services in Bangladesh: AI Quick Win (৳3,750–৳7,500, 3 days, 1 workflow), F-Commerce AI Sprint (৳50,000, 14 days, full system), AI Retainer (৳20,000/month, ongoing management). Also available: Notion OS builds, AI agent development, n8n automation, corporate training, and 1:1 AI coaching — all by inquiry. Free 30-minute AI audit with every engagement.
          </DirectAnswer>
        </div>
      </section>

      {/* Core services */}
      <section className="py-20 md:py-24" style={{ background: bg1 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-10" style={{ color: heading }}>Core services</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-8 rounded-2xl transition-all flex flex-col hover:shadow-xl"
                style={{ background: cardBg, border: `2px solid ${cardBorder}` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-blue-600/15 rounded-xl flex items-center justify-center">
                    <s.icon size={22} className="text-blue-500" />
                  </div>
                  <span className="text-xs font-semibold text-blue-500 bg-blue-600/10 px-2.5 py-1 rounded-full border border-blue-500/20">{s.tag}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: heading }}>{s.title}</h3>
                <p className="text-sm mb-5 flex-1" style={{ color: body }}>{s.subtitle}</p>
                <div className="mb-5">
                  <span className="text-2xl font-bold text-blue-500">{s.bd}</span>
                  <span className="text-sm ml-2" style={{ color: bodyMuted }}>· {s.usd} intl</span>
                </div>
                <Link href={s.href}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all min-h-[44px]">
                  Learn More <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All services */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-2" style={{ color: heading }}>Other engagements</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-sm mb-10" style={{ color: heading === '#F1F5F9' ? '#64748B' : '#94A3B8' }}>
            These are by inquiry only — not our primary service line. <a href="/services/other-engagements" className="text-blue-400 hover:underline">See the full details →</a>
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {other.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-2xl transition-all group"
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', border: `1px solid ${cardBorder}` }}>
                <s.icon size={22} className="text-blue-500 mb-4" />
                <h3 className="font-bold mb-1 group-hover:text-blue-500 transition-colors" style={{ color: heading }}>{s.title}</h3>
                <p className="text-sm mb-3" style={{ color: body }}>{s.desc}</p>
                <p className="text-blue-500 font-semibold text-sm mb-4">{s.bd}</p>
                <Link href={s.href} className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-blue-500" style={{ color: bodyMuted }}>
                  Details <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-center mb-10" style={{ color: heading }}>Compare Packages</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="overflow-x-auto rounded-2xl shadow-sm"
            style={{ border: `1px solid ${cardBorder}` }}>
            <table className="w-full text-sm text-left">
              <thead>
                <tr style={{ background: bg2, borderBottom: `1px solid ${cardBorder}` }}>
                  <th className="py-4 px-5 font-semibold" style={{ color: body }}>Feature</th>
                  <th className="py-4 px-5 font-bold text-blue-500">AI Quick Win</th>
                  <th className="py-4 px-5 font-bold text-blue-500">AI Sprint</th>
                  <th className="py-4 px-5 font-bold text-blue-500">AI Retainer</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: `1px solid ${cardBorder}`,
                    background: i % 2 === 0 ? (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF') : (isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF'),
                  }}>
                    <td className="py-3.5 px-5 font-medium" style={{ color: body }}>{row.feature}</td>
                    <td className="py-3.5 px-5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{row.qw}</td>
                    <td className="py-3.5 px-5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{row.sprint}</td>
                    <td className="py-3.5 px-5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{row.retainer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Not sure */}
      <section className="py-20" style={{ background: bg2, borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-center mb-12" style={{ color: heading }}>Not sure which service is right for you?</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'I have one specific problem', rec: 'Start with AI Quick Win', href: '/services/ai-quick-win' },
              { label: 'I want a complete AI transformation', rec: 'Go with AI Sprint', href: '/services/ai-sprint' },
              { label: "I don't know where to start", rec: 'Book a free AI audit', href: '/free-ai-audit' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-2xl text-center"
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', border: `1px solid ${cardBorder}` }}>
                <p className="text-sm mb-3" style={{ color: body }}>{item.label}</p>
                <p className="font-bold mb-4" style={{ color: heading }}>→ {item.rec}</p>
                <Link href={item.href} className="inline-flex items-center gap-1.5 text-sm text-blue-500 font-semibold hover:text-blue-400">
                  {i === 2 ? 'Book Free Audit' : 'Learn More'} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-center mb-10" style={{ color: heading }}>Frequently Asked Questions</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="space-y-3">
            {servicesFAQ.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FAQItem q={faq.q} a={faq.a} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to get started?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-slate-400 mb-8">
            Book a free 30-minute AI Audit — map your bottlenecks, get a real action plan.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-ai-audit"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all min-h-[52px]">
              📅 Book Free AI Audit
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-base transition-all min-h-[52px]">
              💬 Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
