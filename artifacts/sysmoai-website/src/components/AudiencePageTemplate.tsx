import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, CheckCircle2, ArrowRight, LucideIcon } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
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
  React.useEffect(() => {
    document.title = metaTitle || `AI for ${segment} Bangladesh | SYSmoAI`;
  }, [metaTitle, segment]);

  return (
    <div className="flex flex-col w-full overflow-hidden">

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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center"
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
                className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-3">{p.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">"{p.label}"</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center"
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
                  <motion.div key={i} variants={fadeUp} className="bg-red-50 border border-red-100 p-4 rounded-xl text-sm text-slate-700 leading-relaxed">
                    {ba.before}
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-center mb-4 font-bold text-green-600 uppercase text-xs tracking-widest">✅ After SYSmoAI</div>
              <div className="space-y-3">
                {beforeAfter.map((ba, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-green-50 border border-green-100 p-4 rounded-xl text-sm text-slate-700 leading-relaxed">
                    {ba.after}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center"
          >
            How we solve it
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 md:py-20 bg-slate-900">
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
              <motion.div key={i} variants={fadeUp} className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">0{i + 1}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Relevant Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-10 text-center"
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
                className="bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md p-6 rounded-2xl transition-all group"
              >
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{s.label}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-4">{s.price}</p>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
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
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="text-2xl font-bold text-slate-900 mb-8 text-center"
            >
              Common questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-200">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600 py-4 text-sm">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-4 text-sm">
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
