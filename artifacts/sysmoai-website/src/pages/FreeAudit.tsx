import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { WA_URLS } from '../lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function FreeAudit() {
  React.useEffect(() => {
    document.title = 'Free AI Audit — 30-Minute Business Review | SYSmoAI';
  }, []);

  const steps = [
    {
      time: 'First 10 minutes',
      icon: '🔍',
      title: 'We understand your business',
      desc: 'Emon asks targeted questions about your current workflow — what tools you use, where your time goes, what\'s breaking most often. No generic questions. All specific to your situation.',
    },
    {
      time: 'Next 15 minutes',
      icon: '🗺️',
      title: 'We map your #1 automation opportunity',
      desc: 'Based on your answers, Emon identifies the single workflow that will save the most time and money when automated. He explains exactly what to build, which tools to use, and what the result will look like.',
    },
    {
      time: 'Final 5 minutes',
      icon: '📋',
      title: 'You leave with a clear action plan',
      desc: 'Emon gives you a written action plan: the exact problem, the exact solution, the tools needed, the timeline, and the cost. You can implement this yourself or hire SYSmoAI to build it for you.',
    },
  ];

  const forYouItems = [
    "You're spending too much time on manual, repetitive tasks",
    "Your team is overwhelmed and you don't know where AI fits",
    "You've tried AI tools before but they didn't stick",
    "You want to automate but don't know where to start",
    "You're a Bangladesh SME, agency, or freelancer",
    "You're an international client looking for world-class AI at better rates",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/30 mb-6">
              100% Free · No Commitment · No Sales Pitch
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Book Your Free 30-Minute AI Audit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-xl text-blue-100 mb-4 leading-relaxed"
          >
            Emon Hossain personally reviews your business workflow, identifies your biggest AI automation opportunity, and gives you a clear action plan — free.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="text-blue-300 text-sm"
          >
            Available for businesses in Bangladesh and worldwide.
          </motion.p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-slate-900 text-center mb-12"
          >
            What Happens in Your Free AI Audit
          </motion.h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200"
              >
                <div className="text-4xl flex-shrink-0">{step.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{step.time}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 text-center mb-8"
          >
            The Audit Is For You If...
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forYouItems.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100"
              >
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Ready to Book Your Free Audit?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-600 mb-8"
          >
            Send Emon a WhatsApp message. He'll confirm a time that works for you — usually within 2 hours on working days.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a
              href={WA_URLS.audit}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <WhatsAppIcon />
              Book Free AI Audit on WhatsApp
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-slate-400">
              <span>✓ 100% free</span>
              <span>✓ No obligation</span>
              <span>✓ Reply within 2 hours</span>
              <span>✓ Bangladesh & worldwide</span>
            </div>
          </motion.div>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-slate-400 text-sm mb-3">Prefer email? That works too.</p>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
              Fill out our contact form →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
