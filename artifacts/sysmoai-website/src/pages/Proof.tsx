import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { WA_URLS } from '../lib/whatsapp';
import { F_COMMERCE_PROOF } from '../data/fCommerceProof';
import { DirectAnswer } from '@/components/DirectAnswer';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const stats = [
  { value: '3+',     label: 'Years Building AI Systems' },
  { value: '8+',     label: 'Client Categories'         },
  { value: '24/7',   label: 'Automation Always-on'      },
  { value: '100%',   label: 'Client-Owned Deliverables' },
];

// Note: F-Commerce results live in their own dedicated section above
// (sourced from src/data/fCommerceProof.ts). The cards below cover other
// industries we've shipped for, to keep this list non-duplicative.
const resultCards = [
  { icon: '🏢', category: 'Digital Agency',  result: '15 hrs/week saved',              detail: 'AI Quick Win — automated reporting + client updates'       },
  { icon: '🎓', category: 'Coaching Business', result: '20 hrs/week freed',            detail: 'Notion OS + client onboarding automation'                 },
  { icon: '💼', category: 'Senior Freelancer', result: 'Revenue tripled',              detail: 'Skill upgrade + premium AI service package launch'        },
  { icon: '🏭', category: 'SME Founder',     result: 'WhatsApp chaos eliminated',      detail: 'WhatsApp auto-reply + CRM + real-time dashboard'          },
  { icon: '🎨', category: 'Creative Agency', result: 'Proposals: 4 hrs → 15 mins',    detail: 'AI Sprint — automated proposal builder + client templates' },
];

export default function Proof() {
  const { isDark } = useTheme();
  React.useEffect(() => {
    document.title = 'Client Results & Case Studies — SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Real results from real clients. See how SYSmoAI has helped businesses in Bangladesh and worldwide save time, grow revenue, and automate operations.');
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Hero */}
      <section className="relative py-20 md:py-28" style={{ background: isDark ? '#0A0B0F' : 'linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600 opacity-[0.1] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
            Real results. Verified numbers.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
            We measure success by your results — not our hours.
          </motion.p>
        </div>
      </section>

      {/* Direct Answer — GEO */}
      <section className="pt-10 pb-0" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4">
          <DirectAnswer>
            SYSmoAI builds AI systems across 8+ client categories in Bangladesh and worldwide. We are currently documenting detailed client case studies — real names, real numbers, real proof — and publish representative scenarios until then. Emon Hossain (founder) has 3+ years of hands-on experience building production AI systems and prompt-engineering workflows.
          </DirectAnswer>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* F-Commerce seller proof — shared dataset with Home page */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            F-Commerce sellers — what we've shipped
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-slate-500 text-sm mb-10 max-w-2xl"
          >
            Representative outcomes from F-Commerce sellers we've worked with across
            Dhaka, Chattogram, and Sylhet. Verified case studies with full names are
            published as sellers approve them.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {F_COMMERCE_PROOF.map((s) => (
              <motion.div
                key={s.id}
                variants={fadeUp}
                className="bg-white border border-slate-100 p-7 rounded-2xl shadow-sm flex flex-col"
              >
                <span className="text-3xl mb-3">{s.emoji}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-3">
                  {s.seller}
                </span>
                <p className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                  {s.headline}
                </p>
                <p className="text-slate-500 text-sm flex-1 mb-4">{s.detail}</p>
                <span className="text-xs font-semibold self-start px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  ⏱ {s.window}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Result cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-3">What we've delivered</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-500 text-sm mb-10">
            Representative results from client engagements across industries. Full verified case studies with client names are coming soon.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultCards.map((r, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white border border-slate-100 p-7 rounded-2xl shadow-sm flex flex-col">
                <span className="text-3xl mb-3">{r.icon}</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full self-start mb-4">{r.category}</span>
                <p className="text-xl font-bold text-slate-900 mb-2">{r.result}</p>
                <p className="text-slate-500 text-sm flex-1">{r.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case studies coming soon */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Detailed case studies coming soon</h2>
            <p className="text-slate-600 mb-3 max-w-md mx-auto">
              We're documenting verified case studies from our clients — real names, real metrics, real screenshots. Check back soon.
            </p>
            <p className="text-slate-500 text-sm mb-8">
              Want to be our next success story?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-ai-audit"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all min-h-[52px]">
                📅 Book Free AI Audit
              </Link>
              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold px-8 py-4 rounded-xl transition-all min-h-[52px]">
                <MessageCircle size={18} /> Ask Us on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
