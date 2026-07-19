import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2, XCircle, ArrowRight, MessageCircle, Target, Clock, Shield, Layers, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const problems = [
  'Customers send inquiries via WhatsApp, Facebook, and calls — no central inbox',
  'Replies are delayed by hours. By then, the customer has moved on',
  'Messages get lost in crowded WhatsApp chats',
  'No one owns each lead — follow-up depends on memory',
  'No system to track which leads converted and which were lost',
  'Customer details are scattered across messages, notes, and memory',
];

const deliverables = [
  'Centralized lead pipeline — Notion or Google Sheets-based workspace',
  'Lead card with: source, owner, stage, next action, qualification notes, won/lost reason',
  'Inquiry flow for in-scope leads only',
  'Simple won-client handoff view',
  'Owner visibility — see which team member owns each lead',
  'Two 50-minute implementation sessions (Bangla or English)',
  'One 30-minute adoption review after 5-lead acceptance test',
  'Written SOP with ownership and access handover',
  '5-lead acceptance test — confirmed with your real data',
  '7 calendar days of bounded post-handover support',
  'Readiness checklist to confirm you\'re prepared',
  'Limited human-reviewed AI assistance where useful',
];

const exclusions = [
  'Ad management, lead generation, sales, or ROAS guarantees',
  'Unofficial Meta or WhatsApp automation (API-based only)',
  'Custom app or API development',
  'Multiple businesses or channels simultaneously',
  'Full CRM or project management implementation',
  'Sensitive data handling or password/OTP collection',
  'Unlimited revisions or unlimited support',
  'Tracking of out-of-scope leads',
];

const steps = [
  { num: '01', icon: Target, title: 'Fit Check', desc: 'A 15-minute qualification conversation to confirm Lead Rescue fits your agency. Not a consultation — just qualification.' },
  { num: '02', icon: Layers, title: 'Build', desc: 'We set up your pipeline, configure the lead card template, and build the inquiry flow. Two 50-minute implementation sessions included.' },
  { num: '03', icon: Shield, title: 'Test & Hand Over', desc: 'You run 5 real leads through the system. If everything works, we hand over full ownership. Written SOP and 7-day support included.' },
];

const faqs = [
  { q: 'What channels does Lead Rescue support?', a: 'Lead Rescue works with leads from WhatsApp, Facebook Messenger, website forms, phone calls, and email. We centralize them into one pipeline. Direct WhatsApp Business API integration requires Meta approval and is not included in the base pilot.' },
  { q: 'Is Lead Rescue a CRM?', a: 'No. Lead Rescue is a structured lead-tracking pipeline — not a full CRM. It focuses on capture, qualification, assignment, and follow-up. If you need a full CRM with advanced reporting, we can scope that separately.' },
  { q: 'How long does implementation take?', a: 'The base Lead Rescue pilot is designed for a 7-14 day implementation: two sessions for setup, followed by a 5-lead acceptance test. The total engagement is bounded to ensure predictable delivery.' },
  { q: 'What happens after the 5-lead test?', a: 'After successful testing, you own the system. We provide a written SOP and 7 days of post-handover support. You can continue using the system independently or upgrade to a retainer for ongoing improvements.' },
  { q: 'Can I get a refund if it does not work?', a: 'The Fit Check is free and confirms suitability before you commit. Once implementation begins, we work to the agreed scope. If deliverables are not met as scoped, we fix them at no extra cost.' },
  { q: 'Is this available outside Bangladesh?', a: 'The Lead Rescue pilot is designed for Bangladesh-based micro digital agencies. International clients should contact us for a custom scope.' },
];

export default function LeadRescue() {
  const { isDark } = useTheme();
  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';

  useEffect(() => {
    document.title = 'Lead Rescue — Stop Losing Leads After They Contact You | SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Lead Rescue is a structured lead-capture and follow-up system for Bangladesh businesses. Centralize inquiries from WhatsApp, Facebook, and calls into one trackable pipeline. From ৳15,000.');
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>
      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              ← All Services
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-14 h-14 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6">
              <Target size={28} className="text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Stop Losing Leads<br />After They Contact You
            </h1>
            <p className="text-slate-400 text-lg mb-6 max-w-2xl leading-relaxed">
              Lead Rescue helps your team capture, track, and follow up with incoming leads — so no opportunity is forgotten.
            </p>
            <div className="flex flex-wrap gap-3 items-center mb-8">
              <span className="text-2xl font-bold text-amber-400">৳15,000</span>
              <span className="text-slate-500 text-sm">·</span>
              <span className="text-lg font-semibold text-slate-400">Validation pilot</span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium rounded-full">Bangladesh only</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/fit-check"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all min-h-[52px]">
                Apply for Fit Check <ArrowRight size={20} />
              </Link>
              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all min-h-[52px]">
                <MessageCircle size={20} /> Ask on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: heading }}>
            The Lead Problem
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-10 max-w-lg mx-auto" style={{ color: body }}>
            When leads arrive through multiple channels with no system to track them, opportunities disappear.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: isDark ? 'rgba(239,68,68,0.06)' : '#FEF2F2', border: `1px solid ${isDark ? 'rgba(239,68,68,0.15)' : '#FECACA'}` }}>
                <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: isDark ? '#FCA5A5' : '#991B1B' }}>{p}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: heading }}>
            What You Get
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-3">
            {deliverables.map((d, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 p-3">
                <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exclusions — transparent */}
      <section className="py-12" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="p-6 rounded-2xl"
            style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFF', border: `1px solid ${cardBorder}` }}>
            <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: heading }}>
              <Shield size={16} className="text-slate-400" /> What is not included
            </h3>
            <p className="text-sm mb-3" style={{ color: body }}>
              We believe in clear scope. Here is what Lead Rescue does not include:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {exclusions.map((e, i) => (
                <div key={i} className="flex items-start gap-2 text-xs" style={{ color: body }}>
                  <span className="text-slate-500">—</span> {e}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20" style={{ background: isDark ? '#060810' : '#0F172A' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            How It Works
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">{s.num}</div>
                <s.icon size={20} className="text-amber-400 mb-3" />
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-8 text-center" style={{ color: heading }}>
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i}
                className="rounded-xl overflow-hidden"
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', border: `1px solid ${cardBorder}` }}>
                <summary className="cursor-pointer p-5 font-semibold text-sm flex justify-between items-center" style={{ color: heading }}>
                  {faq.q}
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: body }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to stop losing leads?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8">
            Start with a free 15-minute Fit Check to confirm Lead Rescue fits your business.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fit-check"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all min-h-[56px]">
              Apply for Fit Check <ArrowRight size={20} />
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all min-h-[56px]">
              <MessageCircle size={22} /> Ask on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
