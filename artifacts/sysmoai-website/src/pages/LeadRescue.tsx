import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  CheckCircle2, XCircle, AlertCircle, Users, Calendar, FileText,
  MessageCircle, ArrowRight, Shield, Clock, Target, Layers,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const deliverables = [
  'একটি এনকোয়ারি ফ্লো (in-scope leads only)',
  'ক্লায়েন্ট-owned pipeline/workspace — Notion বা Google Sheets',
  'Lead card template: source, owner, stage, next action, qualification note, won/lost reason',
  'Simple won-client handoff view',
  'Owner visibility — কোন লিড কার কাছে আছে সেটা দেখা যাবে',
  '২টি ৫০-মিনিট Bangla Google Meet implementation session',
  '১টি ৩০-মিনিট adoption review (after 5-lead test)',
  'Written SOP + ownership/access handover',
  '৫-lead acceptance test — আপনার নিজের data দিয়ে',
  '৭ calendar days bounded post-handover support',
  'Readiness checklist (আপনি কি ready তা confirm করতে)',
  'Limited human-reviewed AI assistance where useful',
];

const exclusions = [
  'Ad management, lead generation, sales, বা ROAS guarantee',
  'Unofficial Meta বা WhatsApp automation',
  'Custom apps বা APIs',
  'Multiple businesses বা channels একসাথে',
  'Full CRM বা project management implementation',
  'Sensitive data handling বা password/OTP collection',
  'Unlimited revisions বা unlimited support',
  'যে leads in-scope নয় তাদের tracking',
];

const steps = [
  {
    num: '০১',
    icon: Target,
    title: 'Fit Check',
    bangla: '১৫ মিনিট, বিনামূল্যে',
    desc: 'Emon আপনার সাথে কথা বলেন — আপনার agency কি criteria meet করে, কি ধরনের লিড আসে, কোথায় সমস্যা। এটি consultation নয়, qualification।',
    color: '#3B82F6',
  },
  {
    num: '০২',
    icon: FileText,
    title: 'Written Scope',
    bangla: 'Fit হলে, লিখিত scope পাবেন',
    desc: 'কি deliver হবে, কি হবে না, acceptance test কেমন হবে — সব লিখিত। সই করার আগে সব প্রশ্ন করুন।',
    color: '#8B5CF6',
  },
  {
    num: '০৩',
    icon: Shield,
    title: '৫০% Advance',
    bangla: 'Qualification নিশ্চিত হলে',
    desc: '৳৭,৫০০ advance — শুধু qualification confirm হওয়ার পর এবং verified payment rail-এর মাধ্যমে। Payment-এর আগে আপনাকে জানানো হবে কোন method ব্যবহার করতে হবে।',
    color: '#10B981',
  },
  {
    num: '০৪',
    icon: Layers,
    title: '১৪-দিন Build',
    bangla: 'দুই session + async support',
    desc: 'দুটি ৫০-মিনিট Bangla Google Meet-এ system build ও train। আপনার client-owned workspace-এ সব কিছু সেটআপ হবে।',
    color: '#F59E0B',
  },
  {
    num: '০৫',
    icon: CheckCircle2,
    title: 'Acceptance Test',
    bangla: '৫টি real lead দিয়ে test',
    desc: 'আপনার ৫টি real lead দিয়ে acceptance test হবে। Test pass হলে ৫০% balance payment, তারপর handover। SOP + access সব আপনার কাছে।',
    color: '#EC4899',
  },
];

export default function LeadRescue() {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = 'Lead Rescue System — Agency Edition | SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Lead Rescue System — Agency Edition: একটি ১৪-দিনের validation pilot যা বাংলাদেশের ছোট ডিজিটাল এজেন্সির জন্য একটি client-owned lead-to-client workflow তৈরি করে। ৳১৫,০০০।');
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

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-6"
          >
            Validation Pilot · সীমিত আসন
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight"
          >
            Lead Rescue System<br />
            <span className="text-blue-400">— Agency Edition</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="text-slate-300 text-lg md:text-xl mb-4 leading-relaxed"
          >
            ১৪-দিনে একটি client-owned lead-to-client control workflow।<br className="hidden sm:block" />
            বাংলাদেশের ছোট ডিজিটাল এজেন্সির জন্য।
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-500 text-sm mb-10"
          >
            এটি একটি validation pilot — বিস্তারিত নিচে আছে।
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/fit-check"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
            >
              Fit Check নিন <ArrowRight size={18} />
            </Link>
            <a href={WA_URLS.leadrescue} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-green-500/40 text-green-400 hover:bg-green-500/10 font-semibold px-8 py-4 rounded-xl transition-all text-base"
            >
              <MessageCircle size={18} /> WhatsApp-এ জিজ্ঞেস করুন
            </a>
          </motion.div>
        </div>
      </section>

      {/* ICP */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#2563EB' }}>এই অফার কাদের জন্য</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: heading }}>
              Criteria পূরণ না হলে Fit Check-এ সেটা বলা হবে।
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'বাংলাদেশ-ভিত্তিক founder-led micro digital agency',
                '২–৮ জন team member (founder সহ)',
                '৫–২০ জন active client, অথবা মাসে কমপক্ষে ২০টি genuine enquiry',
                'কোনো dependable shared view নেই — lead owner, stage, এবং next action কেউ এক জায়গায় দেখতে পায় না',
                'Client নিজে workspace (Notion বা Google Sheets) access দিতে পারবেন',
                '২টি Google Meet session-এর জন্য ৯০ মিনিট সময় দিতে পারবেন',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <CheckCircle2 size={17} className="text-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed" style={{ color: body }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-3">আপনি কি পাবেন</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>Deliverables</h2>
              <p className="mt-2 text-sm" style={{ color: subtle }}>
                লিখিত scope-এ এই items clearly define করা থাকবে।
              </p>
            </motion.div>
            <div className="space-y-3">
              {deliverables.map((d, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <CheckCircle2 size={16} className="text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed" style={{ color: body }}>{d}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-3">প্রক্রিয়া</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>কিভাবে কাজ হয়</h2>
            </motion.div>
            <div className="space-y-6">
              {steps.map((s, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex gap-5 p-5 rounded-2xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}18` }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.num}</span>
                      <span className="font-bold" style={{ color: heading }}>{s.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>{s.bangla}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: body }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fee */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-3">Validation Fee</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>৳১৫,০০০</h2>
              <p className="mt-2 text-sm" style={{ color: subtle }}>সর্বোচ্চ ২ জন client participant। Third-party tool fees আলাদা।</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: '৫০% Advance', value: '৳৭,৫০০', note: 'Qualification নিশ্চিত হওয়ার পর, written scope-এ sign করার পর, এবং verified payment rail confirm হওয়ার পর।' },
                { label: '৫০% Balance', value: '৳৭,৫০০', note: 'Acceptance test pass হওয়ার পর এবং handover-এর আগে।' },
              ].map((p, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="p-5 rounded-2xl"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: '#2563EB' }}>{p.value}</div>
                  <div className="font-semibold mb-2" style={{ color: heading }}>{p.label}</div>
                  <p className="text-xs leading-relaxed" style={{ color: body }}>{p.note}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp}
              className="mt-6 p-4 rounded-xl flex gap-3"
              style={{ background: isDark ? 'rgba(251,191,36,0.06)' : '#FFFBEB', border: `1px solid ${isDark ? 'rgba(251,191,36,0.2)' : '#FDE68A'}` }}
            >
              <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed" style={{ color: isDark ? '#FCD34D' : '#92400E' }}>
                এটি একটি validation pilot। Payment method Fit Check-এর পরে separately verify করা হবে — কোনো payment link বা QR code এখন নেই।
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 block mb-3">Scope এর বাইরে</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>এগুলো এই offer-এ নেই</h2>
              <p className="mt-2 text-sm" style={{ color: subtle }}>Written scope-এ পরিষ্কার করা থাকবে।</p>
            </motion.div>
            <div className="space-y-2.5">
              {exclusions.map((ex, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: isDark ? 'rgba(239,68,68,0.05)' : '#FFF5F5', border: `1px solid ${isDark ? 'rgba(239,68,68,0.15)' : '#FED7D7'}` }}
                >
                  <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: body }}>{ex}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Validation Stage Honesty */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="p-8 rounded-2xl"
            style={{ background: isDark ? 'rgba(37,99,235,0.07)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.2)' : '#BFDBFE'}` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-blue-400" />
              <span className="font-bold text-blue-400">Validation Pilot সম্পর্কে সৎ কথা</span>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: body }}>
              <p>এটি SYSmoAI-এর প্রথম commercial pilot delivery। আমরা কোনো published case study বা verified client result এখনো claim করি না।</p>
              <p>Acceptance test আপনার control-এ থাকে — আপনার ৫টি real lead দিয়ে test করবেন। Test fail হলে আমরা ঠিক করব, তারপর balance নেব।</p>
              <p>Case study publish করা হবে শুধুমাত্র actual delivery-এর পরে এবং আপনার লিখিত অনুমতি নিয়ে।</p>
              <p>Demo বা sample যা দেখানো হয়েছে সেগুলো non-client evidence — আপনার data নয়।</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <Calendar size={32} className="text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Fit Check নিন</h2>
              <p className="text-slate-400 mb-2">
                ১৫ মিনিটের একটি conversation — আপনার agency কি criteria meet করে সেটা দেখার জন্য।
              </p>
              <p className="text-slate-500 text-sm mb-8">
                Fit না হলে সেটাও বলা হবে। এটি consultation নয়, qualification।
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fit-check"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
              >
                Fit Check শুরু করুন <ArrowRight size={18} />
              </Link>
              <a href={WA_URLS.leadrescue} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-8 py-4 rounded-xl transition-all text-base"
              >
                <MessageCircle size={18} /> WhatsApp-এ কথা বলুন
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
