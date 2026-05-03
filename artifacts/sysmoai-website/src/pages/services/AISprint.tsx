import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2, ArrowRight, MessageCircle, ShoppingBag, Clock, TrendingUp, Zap } from 'lucide-react';
import { WA_URLS } from '@/lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const deliverables = [
  'Trained Bangla DM auto-reply agent (FAQ + order intake + lead capture)',
  'Order management system — every order tracked from DM to delivery',
  'bKash / Nagad payment workflow — confirmation time cut from 30 min to <5 min',
  'Customer re-engagement sequences — automated follow-ups to past buyers',
  'Daily revenue dashboard in Notion (orders, revenue, pending, disputes)',
  'Owner training session + full video documentation',
  '90-day support and optimization period after launch',
];

const beforeAfter = [
  {
    before: '500 DMs/day, replying to 100 — 400 orders permanently lost',
    after: 'AI handles all FAQ & order DMs 24/7, you only see exceptions',
  },
  {
    before: 'Orders tracked in a notebook — errors and disputes every day',
    after: 'Every order auto-logged from DM to delivery, zero manual entry',
  },
  {
    before: 'bKash confirmation takes 30+ minutes per order, customers leave',
    after: 'Payment workflow cuts confirmation to under 5 minutes',
  },
  {
    before: "Zero repeat customers — you've never followed up with a past buyer",
    after: 'Automated follow-up sequences bring buyers back in 30 days',
  },
];

const steps = [
  {
    num: '01',
    title: 'Audit (Days 1–2)',
    desc: 'Emon maps your entire F-commerce operation — DM flow, order process, payment handling, and biggest bottlenecks. You get a written system design before any build begins.',
  },
  {
    num: '02',
    title: 'Build (Days 3–12)',
    desc: 'We build every automation in your stack — DM agent, order tracker, payment workflow, follow-up sequences. Daily WhatsApp updates. You review before anything goes live.',
  },
  {
    num: '03',
    title: 'Launch + Train (Days 13–14)',
    desc: 'Full training session so you understand every system. Go live. 90-day support period begins — we tune based on real order volume.',
  },
];

const faqs = [
  { q: 'Does this work with any Facebook page?', a: 'Yes, it integrates with Facebook Business pages via Messenger API. We handle the setup — you just need a Facebook Business account.' },
  { q: 'What if the AI replies wrong?', a: 'The system flags complex queries for your review. You handle exceptions — not the 400 routine DMs. We tune the AI on real conversations in the first 30 days.' },
  { q: 'Does it handle both Bangla and English messages?', a: 'Yes. Bilingual (Bangla + English) systems are standard for all F-commerce clients.' },
  { q: 'How does payment work?', a: '50% upfront (৳25,000) to start, 50% on delivery (৳25,000). We accept bKash, Nagad, bank transfer, Wise, and Payoneer.' },
  { q: 'What tools will you use?', a: "n8n automation, Facebook Messenger API, Notion, and ManyChat or similar — depending on your page's current setup. We work around your existing stack." },
  { q: "What's in the 90-day support period?", a: 'Priority WhatsApp access for questions, bug fixes, optimization tweaks, and one additional workflow each month as your business grows.' },
  { q: "What if I'm a small seller — can I afford this?", a: "The Sprint at ৳50,000 pays for itself within the first month if you're currently missing 100+ orders/week. Need to start smaller? Try the AI Quick Win (৳3,750–7,500) first." },
];

export default function AISprint() {
  const { isDark } = useTheme();
  const [showUSD, setShowUSD] = React.useState(false);

  React.useEffect(() => {
    document.title = 'F-Commerce AI Sprint — 14-Day Full Automation | SYSmoAI';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'SYSmoAI F-Commerce AI Sprint: Bangla DM agent, order tracker, bKash workflow, and customer follow-up — fully built in 14 days for Bangladesh F-commerce sellers.');
  }, []);

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600 opacity-[0.1] blur-[130px] rounded-full" />
          <div className="absolute right-1/4 top-1/4 w-[300px] h-[300px] bg-emerald-600 opacity-[0.06] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              ← All Services
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={24} className="text-blue-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-amber-300"
                style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)' }}>
                ⭐ Anchor Offer
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              F-Commerce AI Sprint
            </h1>
            <p className="text-xl text-slate-300 mb-3 max-w-2xl">
              Stop losing orders in your DMs. Get a Bangla auto-reply agent, order tracker, bKash workflow, and customer follow-up system — fully built and deployed in 14 days.
            </p>

            {/* Price toggle */}
            <div className="flex items-center gap-3 mb-7">
              <button onClick={() => setShowUSD(false)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${!showUSD ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                ৳ BDT
              </button>
              <button onClick={() => setShowUSD(true)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${showUSD ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                $ USD
              </button>
            </div>

            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-4xl font-black text-blue-400">
                {showUSD ? '$600' : '৳50,000'}
              </span>
              <span className="text-slate-400 text-lg">one-time Sprint</span>
              <span className="text-slate-500">+</span>
              <span className="text-xl font-bold text-slate-300">
                {showUSD ? '$250/mo' : '৳20,000/mo'}
              </span>
              <span className="text-slate-400 text-sm">retainer</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link href="/free-ai-audit"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-bold text-base transition-all shadow-lg"
                style={{ boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}>
                Book Free F-Commerce Audit
                <ArrowRight size={16} />
              </Link>
              <a href={WA_URLS.consultation} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ead57] text-white px-7 py-4 rounded-xl font-bold text-base transition-all">
                <MessageCircle size={17} />
                Start on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Results-first guarantee</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Bangla + English</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> bKash / Nagad ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> 90-day support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcome metrics */}
      <section className="py-12 border-y" style={{ background: isDark ? '#060810' : '#F0F9FF', borderColor: isDark ? 'rgba(37,99,235,0.15)' : '#BFDBFE' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Clock, value: '14 days', label: 'Full system live', color: '#3B82F6' },
              { icon: Zap, value: '400 DMs', label: 'Handled per day (was 0)', color: '#10B981' },
              { icon: TrendingUp, value: '5 min', label: 'bKash confirmation (was 30)', color: '#8B5CF6' },
              { icon: CheckCircle2, value: '90 days', label: 'Post-launch support', color: '#F59E0B' },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center"
                  style={{ background: `${m.color}18`, border: `1px solid ${m.color}30` }}>
                  <m.icon size={18} style={{ color: m.color }} />
                </div>
                <div className="text-2xl font-black mb-0.5" style={{ color: m.color }}>{m.value}</div>
                <div className="text-xs font-medium" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: heading }}>What's included in the Sprint</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((d, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <CheckCircle2 size={17} className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{ color: heading }}>Before and after the Sprint</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-center mb-4 font-bold text-red-500 uppercase text-xs tracking-widest">❌ Before</div>
              <div className="space-y-3">
                {beforeAfter.map((ba, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="p-4 rounded-xl text-sm leading-relaxed"
                    style={{ background: isDark ? 'rgba(239,68,68,0.08)' : '#FEF2F2', border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#FECACA'}`, color: isDark ? '#FCA5A5' : '#7F1D1D' }}>
                    {ba.before}
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-center mb-4 font-bold text-green-500 uppercase text-xs tracking-widest">✅ After Sprint</div>
              <div className="space-y-3">
                {beforeAfter.map((ba, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="p-4 rounded-xl text-sm leading-relaxed"
                    style={{ background: isDark ? 'rgba(34,197,94,0.08)' : '#F0FDF4', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}`, color: isDark ? '#86EFAC' : '#14532D' }}>
                    {ba.after}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20" style={{ background: isDark ? '#060810' : '#0F172A' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">How the 14 days work</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-[10px] font-black tracking-[0.25em] mb-4 text-blue-400 font-mono">{step.num}</div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing recap */}
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 55%, #2563EB 100%)', border: '1px solid rgba(96,165,250,0.3)' }}>
            <h2 className="text-2xl font-bold text-white mb-2">F-Commerce AI Sprint</h2>
            <p className="text-blue-200 mb-6">One price. Full system. 14 days.</p>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div>
                <div className="text-4xl font-black text-white">৳50,000</div>
                <div className="text-blue-300 text-sm">one-time Sprint</div>
              </div>
              <div className="text-blue-400 text-2xl">+</div>
              <div>
                <div className="text-2xl font-bold text-white">৳20,000/mo</div>
                <div className="text-blue-300 text-sm">retainer (cancel anytime)</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-8">50% upfront · 50% on delivery · bKash / Nagad / bank transfer</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/free-ai-audit"
                className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 px-7 py-3.5 rounded-xl font-bold text-sm transition-all">
                Book Free Audit
                <ArrowRight size={15} />
              </Link>
              <a href={WA_URLS.consultation} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ead57] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all">
                <MessageCircle size={15} />
                WhatsApp Emon
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ color: heading }}>Frequently asked questions</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}
                  style={{ borderBottomColor: cardBorder }}>
                  <AccordionTrigger
                    className="text-left font-semibold hover:text-blue-500 py-5 text-sm md:text-base"
                    style={{ color: heading }}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed pb-5 text-sm" style={{ color: isDark ? '#64748B' : '#64748B' }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Related */}
      <section className="py-10" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-center" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
            Start smaller or stay longer
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/services/ai-quick-win', label: 'AI Quick Win — start at ৳3,750' },
              { href: '/services/ai-retainer', label: 'AI Retainer — ৳20,000/mo' },
              { href: '/services/other-engagements', label: 'Other Engagements (by inquiry)' },
            ].map((s, i) => (
              <Link key={i} href={s.href}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:text-blue-500"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: isDark ? '#CBD5E1' : '#374151' }}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
