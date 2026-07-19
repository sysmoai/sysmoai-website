import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, AlertCircle, ArrowRight, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WA_URLS } from '@/lib/whatsapp';
import { EMAIL } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import { useCreateContactSubmission } from '@workspace/api-client-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z.string().min(5, 'Please enter your email or WhatsApp number'),
  message: z.string().min(20, 'Please describe your situation in at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

const criteria = [
  'Bangladesh-based micro digital agency (2-8 person team)',
  '5-20 active clients or 20+ genuine enquiries per month',
  'No shared, dependable lead view currently',
  'Able to provide client workspace access (Notion or Google Sheets)',
  'Able to commit 90 minutes (2 Google Meet sessions)',
];

export default function FitCheck() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const createSubmission = useCreateContactSubmission();

  React.useEffect(() => {
    document.title = 'Lead Leakage Fit Check — 15 Minutes | SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'A 15-minute qualification conversation for the Lead Rescue System. Find out if your agency qualifies for the Lead Rescue pilot. Free, no commitment.');
  }, []);

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.12)' : '#E2E8F0';
  const inputText = isDark ? '#F1F5F9' : '#0A0B0F';

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      await createSubmission.mutateAsync({
        data: {
          name: data.name,
          contact: data.contact,
          message: `[FIT CHECK REQUEST]\n${data.message}`,
          service: 'lead-rescue',
        },
      });
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again or message us on WhatsApp.';
      setSubmitError(msg);
    }
  };

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
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Lead Leakage Fit Check
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto">
            A 15-minute qualification conversation to see if the Lead Rescue System is right for your agency.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-3 mt-6">
            <span className="flex items-center gap-1.5 text-sm text-slate-500"><Clock size={13} /> 15 minutes</span>
            <span className="text-slate-600">·</span>
            <span className="text-sm text-slate-500">Qualification only</span>
            <span className="text-slate-600">·</span>
            <span className="text-sm text-green-500">Free</span>
          </motion.div>
        </div>
      </section>

      {/* What is this? */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-4" style={{ color: heading }}>
            Is Lead Rescue right for your agency?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="mb-6 leading-relaxed" style={{ color: body }}>
            This is a short qualification conversation to confirm your agency meets the criteria for the Lead Rescue pilot.
            It is not a consultation or free advice session — just a straightforward fit check.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="text-left">
              <p className="font-bold mb-2" style={{ color: isDark ? '#86EFAC' : '#14532D' }}>What happens on this call</p>
              <ul className="space-y-1.5 text-sm" style={{ color: body }}>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> 5-6 specific questions about your agency</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> We assess whether Lead Rescue fits your situation</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> If it fits, we explain the next steps</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> If not, we tell you directly</li>
              </ul>
            </div>
            <div className="text-left">
              <p className="font-bold mb-2" style={{ color: isDark ? '#FCA5A5' : '#7F1D1D' }}>What does not happen</p>
              <ul className="space-y-1.5 text-sm" style={{ color: body }}>
                <li className="flex items-start gap-2"><AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" /> Free consulting or advice</li>
                <li className="flex items-start gap-2"><AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" /> Solving your lead problems on the call</li>
                <li className="flex items-start gap-2"><AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" /> Sending a proposal or quotation</li>
                <li className="flex items-start gap-2"><AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" /> Requesting payment</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-xl font-bold mb-4 text-center" style={{ color: heading }}>
            Confirm you meet the criteria before applying
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="space-y-3">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: isDark ? 'rgba(37,99,235,0.08)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.2)' : '#BFDBFE'}` }}>
                <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: isDark ? '#93C5FD' : '#1E40AF' }}>{c}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fastest way */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-xl font-bold mb-4 text-center" style={{ color: heading }}>
            Fastest way to apply
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="max-w-lg mx-auto">
            <a href={WA_URLS.fitcheck} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-5 rounded-xl font-semibold text-lg transition-all">
              <MessageCircle size={26} className="shrink-0" />
              <div>
                <div>Message us on WhatsApp</div>
                <div className="text-green-100 text-sm font-normal">+880 1711-638693 · Reply within 2 hours</div>
              </div>
            </a>
            <div className="mt-6 p-5 rounded-2xl" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', border: `1px solid ${cardBorder}` }}>
              <p className="font-semibold mb-2" style={{ color: heading }}>In your message, include:</p>
              <ul className="space-y-1.5 text-sm" style={{ color: body }}>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> Your agency name and team size</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> Number of enquiries per month</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> Say "I want a Fit Check"</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-xl mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-xl font-bold mb-6 text-center" style={{ color: heading }}>
            Or fill in the form
          </motion.h2>

          {submitted ? (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="text-center py-10 px-6 rounded-2xl"
              style={{ background: isDark ? 'rgba(34,197,94,0.08)' : 'rgba(240,253,244,1)', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}` }}>
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: isDark ? '#86EFAC' : '#14532D' }}>Request received!</h3>
              <p className="mb-4" style={{ color: isDark ? '#86EFAC' : '#166534' }}>
                Emon will review your request and respond within 2 working days. For a faster response, continue on WhatsApp.
              </p>
              <a href={WA_URLS.fitcheck} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                <MessageCircle size={16} /> Continue on WhatsApp
              </a>
            </motion.div>
          ) : (
            <motion.form initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="fc-name" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Your Name *</label>
                <input id="fc-name" {...register('name')}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                  placeholder="Your name" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="fc-contact" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Email or WhatsApp Number *</label>
                <input id="fc-contact" {...register('contact')}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                  placeholder="email@example.com or +880..." />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
              </div>
              <div>
                <label htmlFor="fc-message" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Tell us about your agency *</label>
                <textarea id="fc-message" {...register('message')} rows={4}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none"
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                  placeholder="Agency name, team size, monthly enquiries, and what lead tracking problem you are facing..." />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              <p className="text-xs" style={{ color: body }}>
                By submitting, you agree to our{' '}
                <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                We will only use your details to process this Fit Check request.
              </p>
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-all min-h-[52px] flex items-center justify-center gap-2">
                {isSubmitting ? 'Submitting...' : <><>Submit Fit Check Request</> <ArrowRight size={16} /></>}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
