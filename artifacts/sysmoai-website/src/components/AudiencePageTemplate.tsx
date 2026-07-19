import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } }
};

interface Solution { icon: string; title: string; desc: string; }
interface ServiceCard { href: string; label: string; price: string; }
interface FAQ { q: string; a: string; }

interface AudiencePageProps {
  segment: string;
  heroHeadline: string;
  heroSub: string;
  painPoints: { emoji: string; label: string; desc: string }[];
  beforeAfter: { before: string; after: string }[];
  solutions: Solution[];
  steps?: { title: string; desc: string }[];
  relevantServices: ServiceCard[];
  finalCtaHeadline: string;
  faqs?: FAQ[];
  metaTitle?: string;
  metaDescription?: string;
}

export function AudiencePageTemplate({
  segment,
  heroHeadline,
  heroSub,
  painPoints,
  beforeAfter,
  solutions,
  steps = [
    { title: 'Audit', desc: 'Free 30-min discovery call. We map your situation and identify the highest-ROI fix.' },
    { title: 'Build', desc: 'We design and build your custom AI solution. No code required from you.' },
    { title: 'Train', desc: 'We hand it over, train you to run it, and support you for 3 months.' },
  ],
  relevantServices,
  finalCtaHeadline,
  faqs = [],
  metaTitle,
  metaDescription,
}: AudiencePageProps) {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = metaTitle || `AI for ${segment} Bangladesh | SYSmoAI`;
    if (metaDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', metaDescription);
    }
  }, [metaTitle, metaDescription, segment]);

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const bodyDark = isDark ? '#64748B' : '#64748B';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-28 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-block bg-blue-600/10 border border-blue-600/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              For {segment}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            {heroHeadline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
          >
            {heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] min-h-[52px]"
            >
              <MessageCircle size={20} />
              Book Free AI Audit on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 md:py-24" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: heading }}
          >
            Does this sound familiar?
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl transition-all"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="text-2xl mb-3">{p.emoji}</div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: heading }}>"{p.label}"</h3>
                <p className="text-sm leading-relaxed" style={{ color: body }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 md:py-24" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: heading }}
          >
            Here's what changes
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <div className="text-center mb-4 font-bold text-red-500 uppercase text-xs tracking-widest">❌ Before SYSmoAI</div>
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
              <div className="text-center mb-4 font-bold text-green-500 uppercase text-xs tracking-widest">✅ After SYSmoAI</div>
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

      {/* Solutions */}
      <section className="py-16 md:py-24" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: heading }}
          >
            How we solve it
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl transition-all"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: heading }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: body }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 md:py-20" style={{ background: isDark ? '#060810' : '#0F172A' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-white mb-10 text-center"
          >
            How we work together
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-6 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">0{i + 1}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Relevant Services */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-10 text-center" style={{ color: heading }}
          >
            Services built for {segment}
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {relevantServices.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl transition-all group"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <h3 className="font-bold mb-1 group-hover:text-blue-500 transition-colors" style={{ color: heading }}>{s.label}</h3>
                <p className="text-blue-500 font-semibold text-sm mb-4">{s.price}</p>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-blue-500"
                  style={{ color: bodyDark }}
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16" style={{ background: bg1 }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="text-2xl font-bold mb-8 text-center" style={{ color: heading }}
            >
              Common questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} style={{ borderBottomColor: cardBorder }}>
                  <AccordionTrigger
                    className="text-left font-semibold hover:text-blue-500 py-4 text-sm"
                    style={{ color: heading }}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed pb-4 text-sm" style={{ color: bodyDark }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
            {finalCtaHeadline}
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8"
          >
            Book a free 30-min AI Audit — no commitment required.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] min-h-[56px]"
            >
              <MessageCircle size={22} />
              Start on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
