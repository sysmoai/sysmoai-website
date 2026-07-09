import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, CheckCircle2, ArrowRight, LucideIcon } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

interface FAQ { q: string; a: string; }
interface Step { title: string; desc: string; }
interface ServicePageProps {
  icon: LucideIcon;
  title: string;
  headline: string;
  bdPrice: string;
  usdPrice: string;
  guarantee?: string;
  whatItIs: string;
  deliverables: string[];
  bestFor: string[];
  beforeAfter: { before: string; after: string }[];
  steps: Step[];
  faqs: FAQ[];
  relatedServices?: { href: string; label: string; price?: string }[];
  metaTitle?: string;
}

export function ServicePageTemplate({
  icon: Icon,
  title,
  headline,
  bdPrice,
  usdPrice,
  guarantee,
  whatItIs,
  deliverables,
  bestFor,
  beforeAfter,
  steps,
  faqs,
  relatedServices = [],
  metaTitle,
}: ServicePageProps) {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = metaTitle || `${title} | SYSmoAI`;
  }, [metaTitle, title]);

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const bodyDark = isDark ? '#64748B' : '#64748B';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              ← All Services
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-14 h-14 bg-blue-600/20 border border-blue-600/30 rounded-2xl flex items-center justify-center mb-6">
              <Icon size={28} className="text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              {headline}
            </h1>
            <div className="flex flex-wrap gap-3 items-center mb-8">
              <span className="text-2xl font-bold text-blue-400">{bdPrice}</span>
              <span className="text-slate-500 text-sm">·</span>
              <span className="text-lg font-semibold text-slate-400">{usdPrice} international</span>
              {guarantee && (
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium rounded-full">{guarantee}</span>
              )}
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] min-h-[52px]"
            >
              <MessageCircle size={20} />
              Start on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* What It Is */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: heading }}>What is {title}?</h2>
              <p className="leading-relaxed text-lg" style={{ color: body }}>{whatItIs}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: heading }}>What you get</h2>
              <ul className="space-y-3">
                {deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                    <span style={{ color: isDark ? '#CBD5E1' : '#374151' }}>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: heading }}
          >
            The problem it solves
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <div className="text-center mb-4 font-bold text-red-500 uppercase text-sm tracking-wider">❌ Before</div>
              <div className="space-y-3">
                {beforeAfter.map((ba, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="p-4 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: isDark ? 'rgba(239,68,68,0.08)' : '#FEF2F2',
                      border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#FECACA'}`,
                      color: isDark ? '#FCA5A5' : '#7F1D1D',
                    }}>
                    {ba.before}
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-center mb-4 font-bold text-green-500 uppercase text-sm tracking-wider">✅ After SYSmoAI</div>
              <div className="space-y-3">
                {beforeAfter.map((ba, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="p-4 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: isDark ? 'rgba(34,197,94,0.08)' : '#F0FDF4',
                      border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}`,
                      color: isDark ? '#86EFAC' : '#14532D',
                    }}>
                    {ba.after}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: heading }}
          >
            Who it's for
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {bestFor.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-4 rounded-xl text-sm font-medium text-center"
                style={{
                  background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF',
                  border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#BFDBFE'}`,
                  color: isDark ? '#93C5FD' : '#1E40AF',
                }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20" style={{ background: isDark ? '#060810' : '#0F172A' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-white mb-10 text-center"
          >
            How it works
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: heading }}
          >
            Frequently asked questions
          </motion.h2>
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
                  <AccordionContent className="leading-relaxed pb-5 text-sm" style={{ color: bodyDark }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12" style={{ background: bg1 }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-center" style={{ color: bodyDark }}>Related Services</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedServices.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:text-blue-500"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: isDark ? '#CBD5E1' : '#374151' }}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8"
          >
            Not sure? Talk to us first — no commitment required.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] min-h-[56px]"
            >
              <MessageCircle size={22} />
              Book a Free Discovery Call
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
