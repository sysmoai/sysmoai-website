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
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষর হতে হবে'),
  contact: z.string().min(5, 'Email বা WhatsApp number দিন'),
  message: z.string().min(20, 'আপনার agency সম্পর্কে একটু বিস্তারিত লিখুন (কমপক্ষে ২০ অক্ষর)'),
});

type FormData = z.infer<typeof schema>;

const criteria = [
  'বাংলাদেশ-ভিত্তিক micro digital agency (২–৮ জন team)',
  '৫–২০ active client বা মাসে ২০+ genuine enquiry',
  'কোনো shared, dependable lead view নেই',
  'Client workspace (Notion/Google Sheets) access দিতে পারবেন',
  '৯০ মিনিট সময় দিতে পারবেন (২টি Google Meet session)',
];

export default function FitCheck() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const createSubmission = useCreateContactSubmission();

  React.useEffect(() => {
    document.title = 'Lead Leakage Fit Check — ১৫ মিনিট | SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Lead Rescue System-এর জন্য ১৫-মিনিটের qualification conversation। এটি consultation নয় — আপনার agency criteria meet করে কিনা সেটা দেখতে।');
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
      const msg = err instanceof Error ? err.message : 'কিছু একটা ভুল হয়েছে। WhatsApp-এ message করুন।';
      setSubmitError(msg);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600 opacity-[0.09] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-6"
          >
            <Clock size={13} /> ১৫ মিনিট · Qualification Only
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight"
          >
            Lead Leakage Fit Check
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="text-slate-300 text-lg mb-4 leading-relaxed"
          >
            Lead Rescue System-এর জন্য আপনার agency qualify করে কিনা সেটা দেখার জন্য একটি ছোট conversation।
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#FCD34D' }}
          >
            <AlertCircle size={14} />
            এটি consultation বা free advice নয় — শুধু qualification।
          </motion.div>
        </div>
      </section>

      {/* What this is */}
      <section className="py-12" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl" style={{ background: isDark ? 'rgba(34,197,94,0.06)' : '#F0FFF4', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}` }}>
                <div className="font-bold mb-3" style={{ color: isDark ? '#86EFAC' : '#14532D' }}>✓ এই call-এ কি হবে</div>
                <ul className="space-y-2 text-sm" style={{ color: isDark ? '#6EE7B7' : '#166534' }}>
                  <li>আপনার agency সম্পর্কে ৫-৬টি specific প্রশ্ন</li>
                  <li>Lead Rescue criteria আপনার situation-এ match হয় কিনা সেটা বলা</li>
                  <li>Fit হলে — next step কি সেটা explain করা</li>
                  <li>Fit না হলে — সেটাও সরাসরি বলা</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: isDark ? 'rgba(239,68,68,0.06)' : '#FFF5F5', border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#FED7D7'}` }}>
                <div className="font-bold mb-3" style={{ color: isDark ? '#FCA5A5' : '#7F1D1D' }}>✗ এই call-এ কি হবে না</div>
                <ul className="space-y-2 text-sm" style={{ color: isDark ? '#F87171' : '#991B1B' }}>
                  <li>Free consulting বা advice দেওয়া</li>
                  <li>আপনার লিড সমস্যা solve করে দেওয়া</li>
                  <li>Proposal বা quotation পাঠানো</li>
                  <li>Payment নেওয়া</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Criteria reminder */}
      <section className="py-12" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-bold mb-5 text-lg" style={{ color: heading }}>
              Apply করার আগে confirm করুন
            </h2>
            <div className="space-y-2.5">
              {criteria.map((c, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <CheckCircle2 size={15} className="text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: body }}>{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">

            {/* Left: WhatsApp preferred */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>সবচেয়ে দ্রুত উপায়</h2>
                <a href={WA_URLS.fitcheck} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-5 rounded-xl font-semibold text-base transition-all hover:shadow-lg"
                >
                  <MessageCircle size={24} className="shrink-0" />
                  <div>
                    <div>WhatsApp-এ Message করুন</div>
                    <div className="text-green-100 text-sm font-normal">+880 1711-638693 · ২ ঘণ্টার মধ্যে reply</div>
                  </div>
                </a>
              </div>
              <div className="text-sm" style={{ color: body }}>
                <p className="mb-2 font-semibold" style={{ color: heading }}>WhatsApp message-এ লিখুন:</p>
                <ul className="space-y-1 text-xs" style={{ color: body }}>
                  <li>আপনার agency-র নাম</li>
                  <li>Team size (কতজন)</li>
                  <li>মাসে কতটি enquiry আসে</li>
                  <li>"Fit Check চাই" বলুন</li>
                </ul>
              </div>
              <div className="text-sm" style={{ color: body }}>
                <p>Email: <a href={`mailto:${EMAIL}`} className="text-blue-500 hover:underline">{EMAIL}</a></p>
                <p className="text-xs mt-1" style={{ color: isDark ? '#475569' : '#94A3B8' }}>Working days: 10 AM – Midnight BST</p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              {submitted ? (
                <div className="text-center py-10 px-6 rounded-2xl"
                  style={{ background: isDark ? 'rgba(34,197,94,0.08)' : 'rgba(240,253,244,1)', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}` }}>
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#86EFAC' : '#14532D' }}>Request পাওয়া গেছে!</h3>
                  <p className="text-sm mb-6" style={{ color: isDark ? '#6EE7B7' : '#166534' }}>
                    Emon ২ working day-এর মধ্যে reply করবেন। দ্রুত response-এর জন্য WhatsApp-এ message করুন।
                  </p>
                  <a href={WA_URLS.fitcheck} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={16} /> WhatsApp-এ Continue করুন
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h2 className="text-xl font-bold mb-2" style={{ color: heading }}>অথবা form পূরণ করুন</h2>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>আপনার নাম *</label>
                    <input {...register('name')}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-colors text-sm"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                      placeholder="আপনার নাম" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Email বা WhatsApp *</label>
                    <input {...register('contact')}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-colors text-sm"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                      placeholder="email@example.com বা +880..." />
                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>
                      আপনার agency সম্পর্কে বলুন *
                    </label>
                    <textarea {...register('message')} rows={5}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-colors resize-none text-sm"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                      placeholder="Agency-র নাম, team size, মাসে কতটি enquiry আসে, লিড tracking-এ কি সমস্যা হচ্ছে..." />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <p className="text-xs" style={{ color: body }}>
                    Submit করলে আপনি আমাদের{' '}
                    <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>-তে
                    agree করছেন। আপনার তথ্য শুধু এই request-এর জন্য ব্যবহার হবে।
                  </p>
                  {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'পাঠানো হচ্ছে...' : (<>Fit Check Request পাঠান <ArrowRight size={16} /></>)}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
