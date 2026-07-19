import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Shield, CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const trustPoints = [
  {
    icon: CheckCircle2,
    color: '#10B981',
    title: 'Acceptance Test আপনার হাতে',
    desc: 'Lead Rescue delivery শেষে আপনার ৫টি real lead দিয়ে acceptance test হবে। System pass না করলে আমরা revise করব। Balance payment শুধু test pass হওয়ার পরে।',
  },
  {
    icon: Shield,
    color: '#2563EB',
    title: 'Client Ownership, সবসময়',
    desc: 'আপনার workspace, আপনার data, আপনার access। Handover মানে সত্যিকারের handover — SYSmoAI-এর কোনো ongoing dependency নেই।',
  },
  {
    icon: AlertCircle,
    color: '#F59E0B',
    title: 'Validation Stage — সৎ কথা',
    desc: 'এটি SYSmoAI-এর প্রথম commercial pilot delivery। আমরা কোনো published case study বা "500+ clients"-এর মতো claim করি না।',
  },
];

const safetyRules = [
  'আমরা আপনার password বা OTP নেব না',
  'আমরা unofficial Meta বা WhatsApp automation করি না',
  'আমরা sensitive data handle করি না',
  'Scope-এর বাইরে কাজ করব না লিখিত agreement ছাড়া',
  'Payment method আলাদাভাবে verify করা হবে — website-এ কোনো payment link নেই',
];

export default function Proof() {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = 'How We Work — Trust & Evidence Policy | SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'SYSmoAI-এর delivery approach, acceptance test, client ownership, এবং evidence policy সম্পর্কে সৎ তথ্য। Validation pilot stage-এ আমরা কিভাবে কাজ করি।');
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
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600 opacity-[0.07] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-6">
            Trust & Evidence
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            আমরা কিভাবে কাজ করি
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="text-slate-400 text-lg">
            Validation pilot stage-এ আমাদের approach, safety rules, এবং evidence policy।
          </motion.p>
        </div>
      </section>

      {/* Trust Points */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-8" style={{ color: heading }}>
              কিভাবে trust তৈরি হয়
            </motion.h2>
            <div className="space-y-5">
              {trustPoints.map((t, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${t.color}15` }}>
                    <t.icon size={20} style={{ color: t.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2" style={{ color: heading }}>{t.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: body }}>{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Evidence Policy */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-4" style={{ color: heading }}>
              আমাদের evidence policy
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm mb-8 leading-relaxed" style={{ color: body }}>
              আমরা বর্তমানে pilot stage-এ আছি। কোনো verified client case study এখনো নেই।
              Case study publish করা হবে শুধুমাত্র:
            </motion.p>
            <motion.div variants={stagger} className="space-y-3">
              {[
                'Actual delivery সম্পন্ন হওয়ার পরে',
                'Acceptance test pass হওয়ার পরে',
                'Client-এর লিখিত অনুমতি নেওয়ার পরে',
                'Real data ও metrics ব্যবহার করে — কোনো "representative" বা extrapolated result নয়',
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: isDark ? 'rgba(37,99,235,0.06)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.18)' : '#BFDBFE'}` }}>
                  <CheckCircle2 size={15} className="text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: body }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-sm p-4 rounded-xl"
              style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFF', border: `1px solid ${cardBorder}`, color: isDark ? '#475569' : '#94A3B8' }}>
              এই সাইটে যেকোনো demo বা sample non-client evidence — এগুলো কোনো real client-এর data নয়।
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Safety Rules */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-4" style={{ color: heading }}>
              Safety rules — আমরা যা করি না
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm mb-6" style={{ color: body }}>
              এগুলো এই engagement-এ কখনো হবে না।
            </motion.p>
            <div className="space-y-2.5">
              {safetyRules.map((rule, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <Shield size={14} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: body }}>{rule}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-3">
              আরো জানতে চান?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 mb-8">
              Lead Rescue-এর details দেখুন অথবা Fit Check দিয়ে শুরু করুন।
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lead-rescue"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all">
                Lead Rescue দেখুন <ArrowRight size={16} />
              </Link>
              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-xl transition-all">
                <MessageCircle size={16} /> WhatsApp করুন
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
