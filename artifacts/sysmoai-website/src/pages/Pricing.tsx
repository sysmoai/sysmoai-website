import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const services = [
  {
    title: 'AI Quick Win', bd: '৳3,750–7,500', usd: '$50–$100', href: '/services/ai-quick-win',
    features: ['1 workflow automated', 'Video walkthrough', '1 free revision', '3-day delivery'],
    tag: 'Start here',
  },
  {
    title: 'AI Implementation Sprint', bd: '৳25,000–50,000', usd: '$300–$600', href: '/services/ai-sprint',
    features: ['Complete AI system (3–5 workflows)', 'Team training included', '3-month post-launch support', 'Video documentation'],
    tag: 'Most popular', featured: true,
  },
  {
    title: 'AI Operations Retainer', bd: '৳20,000/month', usd: '$250/month', href: '/services/ai-retainer',
    features: ['4–8 hrs/month hands-on work', 'Monthly improvements', 'Priority WhatsApp support', 'Monthly AI performance report'],
    tag: 'Cancel anytime',
  },
  {
    title: '1:1 AI Coaching', bd: '৳2,500/session', usd: '$30/session', href: '/services/ai-coaching',
    features: ['60-min live session', 'Session recording', 'Follow-up Q&A (3 days)', 'Personal action plan'],
    tag: 'Individual',
  },
  {
    title: 'Group AI Workshop', bd: '৳500/person', usd: '$15/person', href: '/services/group-workshop',
    features: ['Custom industry curriculum', 'Hands-on exercises', 'Post-workshop resource pack', 'Min 10 participants'],
    tag: 'Teams',
  },
  {
    title: 'Notion OS Build', bd: '৳15,000–50,000', usd: '$800–$5,000', href: '/services/notion-os',
    features: ['Custom workspace architecture', 'All databases + automations', 'Dashboard views', 'Video tutorial + training'],
    tag: 'One-time',
  },
  {
    title: 'AI Agent Development', bd: '৳50,000–2,00,000', usd: '$2,500–$15,000', href: '/services/ai-agent-dev',
    features: ['Custom-trained AI agent', 'WhatsApp/web integration', 'Full deployment + testing', '30-day support'],
    tag: 'Enterprise',
  },
  {
    title: 'n8n Automation', bd: '৳2,000–10,000/workflow', usd: '$50–$300/workflow', href: '/services/n8n-automation',
    features: ['Per-workflow automation', 'Any app integration', 'Error handling built in', 'Video documentation'],
    tag: 'Per workflow',
  },
  {
    title: 'Corporate Training', bd: '৳50,000–2,00,000', usd: '$1,500–$8,000', href: '/services/corporate-training',
    features: ['Enterprise AI audit', 'Custom curriculum', 'Top 3 automations implemented', '90-day AI roadmap'],
    tag: 'Enterprise',
  },
];

const payments = [
  { label: 'AI Quick Win', terms: '100% advance' },
  { label: 'AI Sprint', terms: '50% upfront, 50% on delivery' },
  { label: 'AI Retainer', terms: 'Monthly billing' },
  { label: 'All other services', terms: '50% upfront, 50% on delivery' },
];

const methods = ['bKash', 'Nagad', 'Bank transfer', 'Wise', 'Payoneer', 'Credit card (via Stripe)'];

export default function Pricing() {
  const [showUSD, setShowUSD] = useState(false);
  React.useEffect(() => { document.title = 'AI Services Pricing Bangladesh | SYSmoAI'; }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Transparent pricing. No surprises.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-8">Bangladesh rates. International quality. We don't get paid until it works.</motion.p>
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className={`rounded-2xl p-7 border-2 flex flex-col transition-all hover:shadow-lg ${s.featured ? 'border-blue-400 bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'border-slate-200 bg-white hover:border-blue-300'}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.featured ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>{s.tag}</span>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${s.featured ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                <p className={`text-2xl font-bold mb-5 ${s.featured ? 'text-white' : 'text-blue-600'}`}>
                  {showUSD ? s.usd : s.bd}
                </p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${s.featured ? 'text-green-300' : 'text-green-500'}`} />
                      <span className={s.featured ? 'text-blue-100' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={s.href}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all min-h-[44px] ${s.featured ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  View Full Details <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 text-center mb-10">Payment terms & methods</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Payment Terms</h3>
              <div className="space-y-3">
                {payments.map((p, i) => (
                  <div key={i} className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-xl text-sm">
                    <span className="font-medium text-slate-700">{p.label}</span>
                    <span className="text-slate-500">{p.terms}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Accepted Payment Methods</h3>
              <div className="grid grid-cols-2 gap-3">
                {methods.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-slate-100 p-4 rounded-xl text-sm">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-white mb-4">Not sure which package is right?</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8">
            Book a free 30-minute call. We'll recommend the right service for your budget and goals.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all min-h-[56px]">
              <MessageCircle size={22} /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
