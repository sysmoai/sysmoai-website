import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { WA_URLS } from '../lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const anchorServices = [
  {
    title: 'F-Commerce AI Sprint',
    bd: '৳50,000',
    usd: '$600',
    href: '/services/ai-sprint',
    features: [
      'Bangla DM auto-reply agent (24/7)',
      'Order management system (DM → delivery)',
      'bKash / Nagad payment workflow',
      'Customer re-engagement sequences',
      'Daily revenue dashboard in Notion',
      'Owner training + video documentation',
      '90-day post-launch support',
    ],
    tag: '⭐ Anchor Offer',
    featured: true,
    tagline: 'Full F-commerce automation in 14 days',
  },
  {
    title: 'AI Retainer',
    bd: '৳20,000/month',
    usd: '$250/month',
    href: '/services/ai-retainer',
    features: [
      'Monthly AI system improvements',
      'Priority WhatsApp support',
      'New automations as you grow',
      'Monthly performance report',
    ],
    tag: 'Cancel anytime',
    featured: false,
    tagline: 'Keep your systems improving every month',
  },
  {
    title: 'AI Quick Win',
    bd: '৳3,750–7,500',
    usd: '$50–$100',
    href: '/services/ai-quick-win',
    features: [
      '1 workflow automated in 3 days',
      'Video walkthrough + handover',
      '1 free revision',
      '30-day support included',
    ],
    tag: 'Start here',
    featured: false,
    tagline: 'Test before the full Sprint',
  },
];

const inquiryServices = [
  { title: 'AI Agent Development', bd: '৳50,000–2,00,000', usd: '$2,500–$15,000', href: '/services/other-engagements' },
  { title: 'Notion OS Build', bd: '৳15,000–50,000', usd: '$800–$5,000', href: '/services/other-engagements' },
  { title: 'n8n Automation', bd: '৳2,000–10,000/workflow', usd: '$50–$300/workflow', href: '/services/other-engagements' },
  { title: '1:1 AI Coaching', bd: '৳2,500/session', usd: '$30/session', href: '/services/other-engagements' },
  { title: 'Group AI Workshop', bd: '৳500/person', usd: '$15/person', href: '/services/other-engagements' },
  { title: 'Corporate Training', bd: '৳50,000–2,00,000', usd: '$1,500–$8,000', href: '/services/other-engagements' },
];

const payments = [
  { label: 'AI Quick Win', terms: '100% advance' },
  { label: 'F-Commerce AI Sprint', terms: '50% upfront, 50% on delivery' },
  { label: 'AI Retainer', terms: 'Monthly billing' },
  { label: 'All other services', terms: '50% upfront, 50% on delivery' },
];

const methods = ['bKash', 'Nagad', 'Bank transfer', 'Wise', 'Payoneer', 'Credit card (via Stripe)'];

const pricingFAQ = [
  { q: 'Are there any hidden fees?', a: 'No. The price shown is the price you pay. Payment terms are listed clearly for each package.' },
  { q: 'How do international clients pay?', a: 'USD payments via Wise, Payoneer, or Stripe. No currency conversion fees on our side.' },
  { q: "What if the system doesn't deliver results?", a: "We offer a results-first guarantee. If we can't improve your workflow within the agreed timeline, you get a full refund." },
  { q: 'Can I cancel the retainer anytime?', a: 'Yes. The AI Retainer is month-to-month with no long-term commitment. Cancel anytime.' },
  { q: 'Can I start with the Quick Win before committing to the Sprint?', a: "Absolutely. The AI Quick Win (৳3,750–7,500) lets you see how we work and gets one workflow automated in 3 days. Most F-commerce sellers who do the Quick Win proceed to the Sprint within 30 days." },
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

export default function Pricing() {
  const [showUSD, setShowUSD] = useState(false);
  const { isDark } = useTheme();

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const bodyMuted = isDark ? '#64748B' : '#64748B';

  useEffect(() => {
    document.title = 'F-Commerce AI Sprint Pricing — SYSmoAI | BDT & USD';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'F-Commerce AI Sprint: ৳50,000 one-time + ৳20,000/mo retainer. Cancel anytime. Results-first guarantee. BDT and USD pricing for Bangladesh and international clients.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": pricingFAQ.map(faq => ({
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500 mb-5"
          >
            SYSmoAI · F-Commerce Operating System
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            One offer. Transparent pricing.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-6 max-w-2xl mx-auto">
            The F-Commerce AI Sprint at ৳50,000 — full DM automation, order tracking, and bKash workflow deployed in 14 days. Followed by a ৳20,000/mo retainer to keep growing.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="text-green-400 text-sm font-medium">✓ Results-first guarantee — refund if your system doesn't deliver</span>
            </span>
          </motion.div>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!showUSD ? 'text-white' : 'text-slate-400'}`}>🇧🇩 BDT ৳</span>
            <button onClick={() => setShowUSD(!showUSD)}
              className={`relative w-12 h-6 rounded-full transition-colors ${showUSD ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${showUSD ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-medium ${showUSD ? 'text-white' : 'text-slate-400'}`}>🌍 USD $</span>
          </div>
        </div>
      </section>

      {/* Anchor pricing cards */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-2">F-Commerce Packages</p>
            <h2 className="text-2xl font-bold" style={{ color: heading }}>Start, sprint, then scale</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {anchorServices.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-2xl p-7 flex flex-col transition-all hover:shadow-lg"
                style={s.featured ? {
                  border: '2px solid #3B82F6',
                  background: 'linear-gradient(135deg, #1E3A8A, #1E40AF 55%, #2563EB)',
                  boxShadow: '0 20px 40px rgba(37,99,235,0.25)',
                } : {
                  border: `2px solid ${cardBorder}`,
                  background: cardBg,
                }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={s.featured ? { background: 'rgba(255,255,255,0.2)', color: '#FFFFFF' } : { background: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF', color: '#3B82F6' }}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: s.featured ? '#FFFFFF' : heading }}>{s.title}</h3>
                <p className="text-xs mb-4" style={{ color: s.featured ? 'rgba(219,234,254,0.7)' : bodyMuted }}>{s.tagline}</p>
                <p className="text-2xl font-bold mb-5 min-h-[2rem]" style={{ color: s.featured ? '#FFFFFF' : '#3B82F6' }}>
                  {showUSD ? s.usd : s.bd}
                </p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${s.featured ? 'text-green-300' : 'text-green-500'}`} />
                      <span style={{ color: s.featured ? 'rgba(219,234,254,0.9)' : body }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={s.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all min-h-[44px]"
                  style={s.featured ? { background: '#FFFFFF', color: '#2563EB' } : { background: '#2563EB', color: '#FFFFFF' }}>
                  {s.featured ? 'View Full Sprint Details' : 'View Details'}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Other engagements — by inquiry */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: isDark ? '#475569' : '#94A3B8' }}>By Inquiry</p>
            <h2 className="text-xl font-bold" style={{ color: heading }}>Other Engagements</h2>
            <p className="text-sm mt-2" style={{ color: body }}>
              We take select engagements beyond the Sprint. Reach out on WhatsApp to discuss your situation.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inquiryServices.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-xl p-5 flex flex-col gap-2"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <h3 className="font-semibold text-sm" style={{ color: heading }}>{s.title}</h3>
                <p className="text-sm font-bold" style={{ color: '#3B82F6' }}>
                  {showUSD ? s.usd : s.bd}
                </p>
                <Link href={s.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-1 group">
                  Details <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mt-6">
            <Link href="/services/other-engagements"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              View all other engagements <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Payment terms */}
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-center mb-10" style={{ color: heading }}>
            Payment terms & methods
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: bodyMuted }}>Payment Terms</h3>
              <div className="space-y-3">
                {payments.map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl text-sm"
                    style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <span className="font-medium" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{p.label}</span>
                    <span style={{ color: body }}>{p.terms}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: bodyMuted }}>Accepted Payment Methods</h3>
              <div className="grid grid-cols-2 gap-3">
                {methods.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 p-4 rounded-xl text-sm"
                    style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span className="font-medium" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Clients */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="rounded-2xl p-8"
            style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#0F172A', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#1E293B'}` }}>
            <h2 className="text-xl font-bold text-white mb-4">🌍 International Clients</h2>
            <p className="text-slate-400 mb-6">
              We serve clients worldwide at competitive USD rates — typically 60–80% less than US/EU agencies for the same quality.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-white font-semibold mb-3">Payment Methods</h4>
                <ul className="text-slate-400 space-y-2">
                  {['Wise (preferred — zero fees)', 'Payoneer', 'Stripe', 'Bank transfer (SWIFT)'].map(m => (
                    <li key={m} className="flex items-center gap-2"><span className="text-green-400">•</span>{m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">How It Works</h4>
                <ul className="text-slate-400 space-y-2">
                  {['All prices available in USD (use toggle)', 'Communication in English', 'Timezone-flexible scheduling', 'Same deliverables & guarantee'].map(m => (
                    <li key={m} className="flex items-center gap-2"><span className="text-green-400">•</span>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/services/international"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
                View International Pricing <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-10" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="rounded-2xl p-8 text-center"
            style={{
              background: isDark ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.06)',
              border: `1px solid ${isDark ? 'rgba(34,197,94,0.25)' : 'rgba(34,197,94,0.3)'}`,
            }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: heading }}>🛡️ Our Results-First Guarantee</h3>
            <p style={{ color: body }}>
              We don't charge until your system delivers measurable results. If we can't improve your workflow within the agreed timeline, you get a full refund. Zero risk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-center mb-10" style={{ color: heading }}>
            Pricing FAQs
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {pricingFAQ.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FAQItem q={faq.q} a={faq.a} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-white mb-4">
            Ready to automate your F-commerce?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8">
            Book a free 30-minute audit. Emon reviews your operation and gives you a clear action plan — no commitment required.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-ai-audit"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all min-h-[52px]">
              📅 Book Free F-Commerce Audit
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
