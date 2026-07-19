import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getWhatsAppUrl } from '../lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const steps = [
  { icon: '💬', label: 'You describe your business', desc: 'Tell us what you do, what your team looks like, and where things break down.' },
  { icon: '🗺️', label: 'We map your biggest bottleneck', desc: 'We identify your single most time-consuming or error-prone manual process.' },
  { icon: '💡', label: 'We suggest practical options', desc: 'We explain what could be automated, how long it takes, and what it costs.' },
];

const gets = [
  'A clear picture of your biggest AI opportunity',
  'Honest assessment of whether AI can actually help',
  'An idea of scope, timeline, and cost before any commitment',
  'No obligation, no sales pressure',
];

export default function FreeAudit() {
  const { isDark } = useTheme();

  useEffect(() => {
    document.title = 'Free AI Readiness Audit — SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Book a free 30-minute discovery call with SYSmoAI. We map your biggest manual bottleneck and suggest practical AI options — no commitment required.');
  }, []);

  const bg = isDark ? '#0A0B0F' : '#FFFFFF';
  const altBg = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const subheading = isDark ? '#CBD5E1' : '#334155';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg }}>

      {/* Hero */}
      <section className="relative py-20 md:py-28" style={{ background: bg }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600 opacity-[0.07] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
              style={{ background: isDark ? 'rgba(37,99,235,0.08)' : 'rgba(37,99,235,0.05)', borderColor: 'rgba(37,99,235,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: '#3B82F6' }}>Free — No Commitment</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: heading }}>
            Free AI Readiness Audit
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="text-lg mb-8 max-w-xl mx-auto" style={{ color: body }}>
            A focused 30-minute discovery call. We understand your business, identify your biggest
            manual bottleneck, and suggest practical AI options — before any commitment.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getWhatsAppUrl('audit')} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-[0_0_24px_rgba(37,99,235,0.35)]">
              <MessageCircle size={18} />
              Book via WhatsApp
            </a>
            <a href="mailto:hello@sysmoai.com"
              className="inline-flex items-center justify-center gap-2 border px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200"
              style={{ borderColor: border, color: subheading, background: 'transparent' }}>
              Email Instead
            </a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="mt-4 text-sm flex items-center justify-center gap-1.5" style={{ color: body }}>
            <Clock size={13} />
            We respond within 2 hours on working days
          </motion.p>
        </div>
      </section>

      {/* What happens */}
      <section className="py-16 md:py-20" style={{ background: altBg }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: heading }}>What happens in the call</h2>
            <p className="text-sm" style={{ color: body }}>30 minutes. No slides. Just a real conversation about your business.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-2xl p-6"
                style={{ background: cardBg, border: `1px solid ${border}` }}>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: subheading }}>{i + 1}. {step.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: body }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-20" style={{ background: bg }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: heading }}>What you walk away with</h2>
            <p className="text-sm" style={{ color: body }}>You'll have clarity. Whether we work together or not.</p>
          </motion.div>
          <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="space-y-4">
            {gets.map((item, i) => (
              <motion.li key={i} variants={fadeUp}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: cardBg, border: `1px solid ${border}` }}>
                <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-sm" style={{ color: subheading }}>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: altBg }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: heading }}>Ready to talk?</h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: body }}>
              Send a WhatsApp message or email — we'll schedule a time that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href={getWhatsAppUrl('audit')} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-[0_0_24px_rgba(37,99,235,0.35)]">
                <MessageCircle size={18} />
                Book via WhatsApp
              </a>
            </div>
            <p className="text-sm" style={{ color: body }}>
              Or check out{' '}
              <Link href="/lead-rescue"
                className="underline underline-offset-2"
                style={{ color: '#3B82F6' }}>
                Lead Rescue System
              </Link>
              {' '}if you're a micro digital agency in Bangladesh.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: body }}
              onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
              onMouseLeave={e => (e.currentTarget.style.color = body)}>
              Browse all services <ArrowRight size={14} />
            </Link>
            <Link href="/pricing"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: body }}
              onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
              onMouseLeave={e => (e.currentTarget.style.color = body)}>
              View pricing <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
