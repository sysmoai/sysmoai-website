import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, ArrowRight, CheckCircle2, Globe, Star, ShoppingBag, Building, BookOpen } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const challenges = [
  { icon: MessageCircle, title: 'Lost in WhatsApp', desc: 'Orders, inquiries, complaints — all in one inbox. Nothing tracked, nothing followed up.' },
  { icon: ShoppingBag, title: 'F-Commerce chaos', desc: 'Facebook DMs turn into orders, but there is no system to manage them. Orders get missed, customers get ignored.' },
  { icon: Star, title: 'Manual everything', desc: 'Inventory tracking in notebooks. Customer lists in WhatsApp groups. Revenue numbers in your head.' },
  { icon: Building, title: 'Low AI adoption', desc: 'Teams use ChatGPT unofficially, inconsistently — no training, no governance, no measurable improvement.' },
];

const solutions = [
  { href: '/lead-rescue', label: 'Lead Rescue', desc: 'Stop losing leads — centralize inquiries from WhatsApp, Facebook, and calls into one trackable system.', icon: MessageCircle },
  { href: '/for/f-commerce', label: 'F-Commerce Automation', desc: 'Automate order tracking, customer replies, and delivery updates for Facebook-based businesses.', icon: ShoppingBag },
  { href: '/services/notion-os', label: 'Notion Business OS', desc: 'Replace scattered tools with one connected workspace for clients, projects, and finances.', icon: BookOpen },
  { href: '/services/corporate-training', label: 'AI Training for Teams', desc: 'Structured AI adoption programs for Bangladeshi companies — from SMEs to enterprises.', icon: Building },
];

export default function Bangladesh() {
  const { isDark } = useTheme();
  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';

  useEffect(() => {
    document.title = 'SYSmoAI for Bangladesh — AI Systems for Local Businesses';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'SYSmoAI builds practical AI systems for Bangladesh businesses — lead management, F-Commerce automation, Notion OS, and corporate AI training. Locally built, globally competitive.');
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>
      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500 mb-5">
            SYSmoAI · Systems in Motion
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            AI Systems Built for<br />Bangladesh Businesses
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            Lead management, F-Commerce automation, Notion systems, and AI training — designed for how Bangladesh actually does business.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lead-rescue"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
              Explore Lead Rescue <ArrowRight size={18} />
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
              <MessageCircle size={18} /> Talk to Us
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4">
            <Link href="/bn" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              বাংলায় দেখুন →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: heading }}>
            The Bangladesh Business Challenge
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12 max-w-2xl mx-auto" style={{ color: body }}>
            Bangladesh businesses operate differently. WhatsApp-first communication, Facebook-based commerce, and cash-heavy transactions create unique operational challenges that imported software doesn't solve.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-2xl"
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}` }}>
                <c.icon size={24} className="text-blue-500 mb-3" />
                <h3 className="font-bold mb-1" style={{ color: heading }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: body }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: heading }}>
            How SYSmoAI Helps
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-6">
            {solutions.map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={s.href}
                  className="flex items-start gap-4 p-6 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}` }}>
                  <s.icon size={24} className="text-blue-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: heading }}>{s.label}</h3>
                    <p className="text-sm" style={{ color: body }}>{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 mt-2">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: heading }}>Built in Bangladesh, for Bangladesh</h2>
            <p className="mb-8 leading-relaxed" style={{ color: body }}>
              We're a Dhaka-based team. We understand F-commerce, bKash payments, WhatsApp business workflows, and the specific challenges of running a business in Bangladesh. We don't import solutions from abroad — we build them here, for how your business actually works.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 gap-4">
            {[
              'WhatsApp-first communication design',
              'bKash and Nagad integration support',
              'F-Commerce and Facebook shop workflows',
              'Bangla-language training and support',
              'Local business hours and holiday awareness',
              'Pricing in BDT with local payment terms',
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">See if Lead Rescue fits your business</h2>
          <p className="text-slate-400 mb-8">
            A 15-minute qualification conversation. No commitment. No sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fit-check"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
              Book a Fit Check
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-4">
            <Link href="/bn" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              বাংলায় SYSmoAI সম্পর্কে জানুন →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
