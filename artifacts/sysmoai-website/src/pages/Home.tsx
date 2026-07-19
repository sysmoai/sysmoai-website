import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  CheckCircle2, XCircle, AlertCircle, ArrowRight, MessageCircle,
  Users, Calendar, Shield, Clock, Target, Layers, FileText,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const problems = [
  {
    icon: '😤',
    bangla: 'কে ফলো-আপ করবে?',
    english: 'Who owns this lead?',
    desc: 'Lead আসে — WhatsApp-এ, Facebook-এ, website-এ। কিন্তু কোনো shared view নেই। সবাই ভাবে অন্যজন দেখবে। লিড মরে যায়।',
    color: '#EF4444',
  },
  {
    icon: '🤷',
    bangla: 'Stage কোথায় আছে?',
    english: 'Is this in negotiation or already lost?',
    desc: 'Proposal পাঠানো হয়েছে নাকি negotiation চলছে? Follow-up হয়েছে? WhatsApp thread দেখে বোঝার উপায় নেই।',
    color: '#F59E0B',
  },
  {
    icon: '💸',
    bangla: 'Handover কখন হলো?',
    english: 'How did this slip through?',
    desc: 'Lead won হয়ে client হয়েছে — কিন্তু কে কি জানে সেটা শুধু একজন বোঝে। তিনি না থাকলে সব থেমে যায়।',
    color: '#8B5CF6',
  },
];

const deliverables = [
  'একটি clean এনকোয়ারি ফ্লো (in-scope leads)',
  'Lead card: source, owner, stage, next action, won/lost',
  'Won-client handoff view',
  'Client-owned Notion বা Google Sheets workspace',
  'Owner visibility — কোন লিড কার কাছে আছে',
  '২টি ৫০-মিনিট Bangla Google Meet session',
  '১টি ৩০-মিনিট adoption review (after acceptance test)',
  'Written SOP + full handover',
  '৫-lead acceptance test (আপনার real data দিয়ে)',
  '৭ calendar days bounded post-handover support',
];

const exclusions = [
  'Ad management বা lead generation',
  'Full CRM বা project management',
  'Custom apps, APIs, বা unofficial automation',
  'Multiple businesses বা channels একসাথে',
  'Unlimited revisions বা unlimited support',
];

const steps = [
  { num: '০১', icon: Target,      color: '#3B82F6', title: 'Fit Check',       bangla: '১৫ মিনিট, বিনামূল্যে',      desc: 'Emon আপনার agency সম্পর্কে ৫-৬টি specific প্রশ্ন করেন। Fit হলে next step, না হলে সেটাও বলা হবে।' },
  { num: '০২', icon: FileText,    color: '#8B5CF6', title: 'Written Scope',   bangla: 'Fit হলে, লিখিত scope',      desc: 'কি হবে, কি হবে না, acceptance test কেমন — সব লিখিত। Sign করার আগে সব প্রশ্ন করুন।' },
  { num: '০৩', icon: Shield,      color: '#10B981', title: '৫০% Advance',    bangla: '৳৭,৫০০ — scope sign-এর পরে', desc: 'Verified payment rail-এর মাধ্যমে। Payment link এখন নেই — method আলাদাভাবে verify হবে।' },
  { num: '০৪', icon: Layers,      color: '#F59E0B', title: '১৪-দিন Build',   bangla: '২টি Google Meet session',    desc: 'Bangla-তে। আপনার client-owned workspace-এ সব কিছু সেটআপ হবে।' },
  { num: '০৫', icon: CheckCircle2, color: '#EC4899', title: 'Acceptance Test', bangla: 'আপনার ৫টি real lead দিয়ে',  desc: 'Test pass হলে balance payment, তারপর SOP + handover। আপনার হাতে।' },
];

export default function Home() {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = 'SYSmoAI — Lead Rescue System for Bangladesh Agencies';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Lead Rescue System — Agency Edition: বাংলাদেশের মাইক্রো ডিজিটাল এজেন্সির জন্য একটি ১৪-দিনের validation pilot। Client-owned lead-to-client workflow। ৳১৫,০০০।');
  }, []);

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const subtle = isDark ? '#475569' : '#94A3B8';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0A0B0F] overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.11) 0%, transparent 65%)' }} />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center py-24">

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Lead Rescue System — Agency Edition · Validation Pilot
            </span>
          </motion.div>

          {/* Bangla headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
            style={{ color: '#F1F5F9', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            আপনার এজেন্সির<br />
            <span style={{ color: '#2563EB' }}>লিড কোথায় হারিয়ে যাচ্ছে?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-400 mb-4 leading-relaxed max-w-2xl mx-auto"
          >
            You're getting enquiries. But without a shared pipeline, leads die between team members. Revenue leaks. Quietly.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-sm text-slate-600 mb-10"
          >
            বাংলাদেশের মাইক্রো ডিজিটাল এজেন্সির জন্য একটি ১৪-দিনের validation pilot।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/fit-check"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-blue-900/30"
            >
              Fit Check নিন — ১৫ মিনিট <ArrowRight size={17} />
            </Link>
            <Link href="/lead-rescue"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 font-semibold px-8 py-4 rounded-xl transition-all text-base"
            >
              Lead Rescue সম্পর্কে জানুন
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-xs text-slate-600 mt-6"
          >
            Fit Check বিনামূল্যে। কোনো commitment নেই। Consultation নয় — qualification।
          </motion.p>
        </div>
      </section>

      {/* ══════════════════ PROBLEM ══════════════════ */}
      <section className="py-20 md:py-24" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 block mb-3">সমস্যা</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>
                তিনটা সমস্যা যা প্রতিটি ছোট এজেন্সি চেনে
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {problems.map((p, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="p-6 rounded-2xl flex flex-col"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: p.color }}>{p.bangla}</h3>
                  <p className="text-xs font-medium mb-3 italic" style={{ color: subtle }}>{p.english}</p>
                  <p className="text-sm leading-relaxed" style={{ color: body }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ ICP ══════════════════ */}
      <section className="py-20 md:py-24" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#2563EB' }}>এই pilot কাদের জন্য</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: heading }}>
                Criteria পূরণ হলে Fit Check-এ জানানো হবে।
              </h2>
              <p className="text-sm" style={{ color: subtle }}>না হলে সেটাও সরাসরি বলা হবে।</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                'বাংলাদেশ-ভিত্তিক micro digital agency',
                '২–৮ জন team member (founder সহ)',
                '৫–২০ active client বা মাসে ২০+ enquiry',
                'Shared lead view নেই — owner, stage, next action',
                'Notion বা Google Sheets access দিতে পারবেন',
                '৯০ মিনিট Google Meet-এর জন্য সময় আছে',
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <CheckCircle2 size={15} className="text-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: body }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ OFFER IDENTITY ══════════════════ */}
      <section className="py-20 bg-[#080A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-4">
              একটিমাত্র active offer
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lead Rescue System<br />
              <span className="text-blue-400">— Agency Edition</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-3 leading-relaxed">
              ১৪ দিনে একটি client-owned lead-to-client control workflow।
            </motion.p>
            <motion.p variants={fadeUp} className="text-slate-600 text-sm mb-10">
              আপনার workspace। আপনার data। আপনার access। SYSmoAI-এর কোনো ongoing dependency নেই।
            </motion.p>

            {/* Deliverables in two columns */}
            <motion.div variants={fadeUp} className="text-left grid sm:grid-cols-2 gap-2 mb-8">
              {deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2.5 rounded-lg"
                  style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)' }}
                >
                  <CheckCircle2 size={13} className="text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>{d}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="/lead-rescue"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                সম্পূর্ণ deliverables ও exclusions দেখুন <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ PROCESS ══════════════════ */}
      <section className="py-20 md:py-24" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-3">প্রক্রিয়া</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>কিভাবে কাজ হয়</h2>
            </motion.div>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}15` }}>
                    <s.icon size={17} style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.num}</span>
                      <span className="font-bold text-sm" style={{ color: heading }}>{s.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${s.color}12`, color: s.color }}>{s.bangla}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: body }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ FEE + EXCLUSIONS ══════════════════ */}
      <section className="py-20 md:py-24" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Fee */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-4">Validation Fee</span>
              <div className="text-4xl font-bold mb-2" style={{ color: '#2563EB' }}>৳১৫,০০০</div>
              <p className="text-sm mb-6" style={{ color: subtle }}>সর্বোচ্চ ২ জন participant। Third-party tool fees আলাদা।</p>
              <div className="space-y-3">
                {[
                  { label: '৫০% Advance (৳৭,৫০০)', note: 'Written scope sign + payment rail verify-এর পরে' },
                  { label: '৫০% Balance (৳৭,৫০০)', note: 'Acceptance test pass হওয়ার পরে, handover-এর আগে' },
                ].map((p, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <div className="font-semibold text-sm mb-1" style={{ color: heading }}>{p.label}</div>
                    <div className="text-xs" style={{ color: body }}>{p.note}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl flex gap-2"
                style={{ background: isDark ? 'rgba(251,191,36,0.06)' : '#FFFBEB', border: `1px solid ${isDark ? 'rgba(251,191,36,0.18)' : '#FDE68A'}` }}>
                <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs" style={{ color: isDark ? '#FCD34D' : '#92400E' }}>
                  Payment method এখন website-এ নেই। Fit Check-এর পরে separately verify করা হবে।
                </p>
              </div>
            </motion.div>

            {/* Exclusions */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 block mb-4">Scope-এর বাইরে</span>
              <h3 className="font-bold mb-4 text-lg" style={{ color: heading }}>এগুলো এই offer-এ নেই</h3>
              <div className="space-y-2.5">
                {exclusions.map((ex, i) => (
                  <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: isDark ? 'rgba(239,68,68,0.05)' : '#FFF5F5', border: `1px solid ${isDark ? 'rgba(239,68,68,0.12)' : '#FED7D7'}` }}>
                    <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm" style={{ color: body }}>{ex}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/lead-rescue"
                  className="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  পুরো exclusions list দেখুন <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ VALIDATION TRUST ══════════════════ */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="p-8 rounded-2xl"
            style={{ background: isDark ? 'rgba(37,99,235,0.07)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.2)' : '#BFDBFE'}` }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Shield size={18} className="text-blue-400" />
              <span className="font-bold text-blue-400">Validation Stage — সৎ কথা</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5 text-sm leading-relaxed" style={{ color: body }}>
              <div className="space-y-3">
                <p className="flex gap-2"><CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" /><span>Acceptance test আপনার control-এ — আপনার ৫টি real lead দিয়ে</span></p>
                <p className="flex gap-2"><CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" /><span>সব workspace, SOP, access আপনার কাছে handover হবে</span></p>
                <p className="flex gap-2"><CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" /><span>Balance payment শুধু test pass হওয়ার পরে</span></p>
              </div>
              <div className="space-y-3">
                <p className="flex gap-2"><AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" /><span>এটি প্রথম commercial pilot। কোনো published case study এখনো নেই।</span></p>
                <p className="flex gap-2"><AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" /><span>Case study শুধু actual delivery + লিখিত permission-এর পরে publish হবে</span></p>
                <p className="flex gap-2"><AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" /><span>কোনো revenue guarantee বা "ROI promise" নেই</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="py-24 bg-[#0A0B0F]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <Calendar size={36} className="text-blue-400 mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Fit Check নিন
              </h2>
              <p className="text-slate-400 mb-2 text-lg">
                ১৫ মিনিটের একটি conversation।
              </p>
              <p className="text-slate-500 text-sm mb-10">
                আপনার agency Lead Rescue-এর জন্য ready কিনা সেটা দেখতে। Qualification only — কোনো sales pitch নেই।
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/fit-check"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
              >
                Fit Check শুরু করুন <ArrowRight size={17} />
              </Link>
              <a href={WA_URLS.leadrescue} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-8 py-4 rounded-xl transition-all text-base"
              >
                <MessageCircle size={18} /> WhatsApp করুন
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-500" /> ১৫ মিনিট</span>
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-slate-500" /> Qualification only</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-slate-500" /> বিনামূল্যে</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
