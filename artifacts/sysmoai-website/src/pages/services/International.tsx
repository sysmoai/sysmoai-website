import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Globe, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { WA_LINK, EMAIL } from '@/lib/config';
import { DirectAnswer } from '@/components/DirectAnswer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const reasons = [
  { icon: '💰', title: '60–80% cost savings', desc: 'vs US/EU consultants — same quality, fraction of the price' },
  { icon: '🏆', title: 'Top 5% globally', desc: 'Prompt engineering verified by international benchmarks' },
  { icon: '🗂️', title: 'Notion OS specialist', desc: 'One of the most advanced Notion architects in Asia' },
  { icon: '🤖', title: 'Custom AI agents', desc: 'WhatsApp, web, and custom platform integration' },
  { icon: '⚙️', title: 'n8n automation expert', desc: 'Complex workflow automation for any tool stack' },
  { icon: '💳', title: 'International payments', desc: 'Wise and Payoneer accepted — easy, fast, no friction' },
  { icon: '🌐', title: 'English-first', desc: 'No language barrier, clear communication, async-friendly' },
  { icon: '✅', title: 'Results guarantee', desc: 'We don\'t get paid until it works — no risk to you' },
];

const services = [
  { label: 'AI Quick Win', price: '$50–$100', href: '/services/ai-quick-win' },
  { label: 'F-Commerce AI Sprint (14 days)', price: '$600', href: '/services/ai-sprint' },
  { label: 'AI Retainer', price: '$250/month', href: '/services/ai-retainer' },
  { label: '1:1 AI Coaching', price: '$30/session', href: '/services/ai-coaching' },
  { label: 'Notion OS Build', price: '$800–$5,000', href: '/services/notion-os' },
  { label: 'AI Agent Development', price: '$2,500–$15,000', href: '/services/ai-agent-dev' },
  { label: 'n8n Automation', price: '$50–$300/workflow', href: '/services/n8n-automation' },
  { label: 'Corporate Training', price: '$1,500–$8,000', href: '/services/corporate-training' },
];

export default function International() {
  React.useEffect(() => {
    document.title = 'AI Consulting for International Clients | World-Class AI at Bangladesh Rates | SYSmoAI';
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <span className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full">
              <Globe size={15} /> International Clients
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            World-Class AI Expertise.<br />Bangladesh Rates.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            US and EU AI consultants charge $200–$500/hr. SYSmoAI delivers the same expertise — Notion OS, custom AI agents, n8n automation — at a fraction of the cost. International payments via Wise and Payoneer.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-ai-audit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all min-h-[52px]">
              <ArrowRight size={20} /> Book Free AI Audit
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 px-6 py-4 rounded-xl font-semibold text-base transition-all min-h-[52px]">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Direct Answer — GEO */}
      <section className="pt-10 pb-0 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <DirectAnswer>
            SYSmoAI serves international clients (US, UK, Canada, Australia, Southeast Asia) with world-class AI consulting at Bangladesh rates — 60–80% below US/EU agency prices. Services: AI Quick Win ($50–$100), F-Commerce AI Sprint ($600), AI Retainer ($250/month), Notion OS ($800–$5,000), AI Agents ($2,500–$15,000). Payment via Wise or Payoneer. Founder Emon Hossain is ranked top 5% globally in prompt engineering.
          </DirectAnswer>
        </div>
      </section>

      {/* Why International Clients Choose SYSmoAI */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-slate-900 text-center mb-12"
          >
            Why international clients choose SYSmoAI
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {reasons.map((r, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services (USD pricing) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-slate-900 text-center mb-12"
          >
            Services & USD pricing
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md p-5 rounded-2xl transition-all flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{s.label}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{s.price}</p>
                </div>
                <Link href={s.href} className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                  Details <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work Internationally */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-white text-center mb-10"
          >
            How we work with international clients
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { num: '01', title: 'Discovery call', desc: 'Free 30-min Zoom call to understand your project. No commitment.' },
              { num: '02', title: 'Proposal + payment', desc: 'We send a detailed scope. Payment via Wise or Payoneer. 50% to start, 50% on delivery.' },
              { num: '03', title: 'Build + deliver', desc: 'Async updates via email/Slack. You review at milestones. Full documentation on delivery.' },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">{step.num}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Ready to start your project?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8"
          >
            Book a free 30-minute discovery call. No commitment.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-ai-audit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all min-h-[52px]">
              <ArrowRight size={20} /> Book Free AI Audit
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 px-6 py-4 rounded-xl font-semibold text-base transition-all min-h-[52px]">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
