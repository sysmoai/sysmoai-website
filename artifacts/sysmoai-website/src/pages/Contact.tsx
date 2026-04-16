import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WA_URLS } from '../lib/whatsapp';
import { EMAIL } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z.string().min(5, 'Please enter your email or WhatsApp number'),
  message: z.string().min(10, 'Please describe your situation — at least 10 characters'),
  service: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { isDark } = useTheme();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.12)' : '#E2E8F0';
  const inputText = isDark ? '#F1F5F9' : '#0A0B0F';

  useEffect(() => {
    document.title = 'Contact SYSmoAI — Book Your Free AI Audit';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Book a free 30-minute AI audit. Map your bottlenecks, uncover AI opportunities, get an action plan. WhatsApp, email, or contact form. Reply within 2 hours.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "SYSmoAI",
      "description": "AI Systems Studio in Bangladesh",
      "url": "https://sysmoai.com",
      "telephone": "+8801711638693",
      "email": "hello@sysmoai.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD"
      }
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const onSubmit = async (_data: FormData) => {
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>
      <section className="relative bg-[#0A0B0F] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600 opacity-[0.1] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Let's talk about your business.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto">
            Book a free AI audit to map your bottlenecks, uncover your highest-ROI opportunity and see a real example of what AI can do for you. No commitment required.
          </motion.p>
        </div>
      </section>

      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: heading }}>Fastest way to reach us</h2>
                <a href={WA_URLS.consultation} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-5 rounded-xl font-semibold text-lg transition-all hover:shadow-lg group">
                  <MessageCircle size={26} className="shrink-0" />
                  <div>
                    <div>WhatsApp Us</div>
                    <div className="text-green-100 text-sm font-normal">+880 1711-638693 · Reply within 2 hours</div>
                  </div>
                </a>
              </div>

              {/* Calendar booking */}
              <div className="p-5 rounded-2xl" style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#BFDBFE'}` }}>
                <h3 className="font-bold mb-1" style={{ color: heading }}>Prefer to pick a time?</h3>
                <p className="text-sm mb-4" style={{ color: body }}>Book a free 30-min consultation on our audit page — pick the slot that works for you.</p>
                <a href="/free-ai-audit"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
                  📅 Book via Free Audit Page
                </a>
              </div>

              <div className="space-y-4">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-blue-500" style={{ color: body }}>
                  <Mail size={18} className="text-blue-500 shrink-0" />
                  <span>{EMAIL}</span>
                </a>
                <div className="flex items-center gap-3" style={{ color: body }}>
                  <MapPin size={18} className="text-blue-500 shrink-0" />
                  <span>Dhaka, Bangladesh 🇧🇩</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: body }}>
                  <Clock size={18} className="text-blue-500 shrink-0" />
                  <span>10 AM – Midnight BST (working days)</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <h3 className="font-bold mb-3" style={{ color: heading }}>What happens in the free audit?</h3>
                <ul className="space-y-2.5">
                  {[
                    'We map your single biggest workflow bottleneck',
                    'We identify the highest-ROI AI opportunity for your situation',
                    'We show you exactly what a solution would look like',
                    'Zero commitment — even if you don\'t hire us',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: body }}>
                      <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              {submitted ? (
                <div className="text-center py-10 px-6 rounded-2xl"
                  style={{ background: isDark ? 'rgba(34,197,94,0.08)' : 'rgba(240,253,244,1)', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}` }}>
                  <div className="text-6xl mb-5">✅</div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: isDark ? '#86EFAC' : '#14532D' }}>Message Received!</h3>
                  <p className="mb-2 max-w-md mx-auto" style={{ color: isDark ? '#86EFAC' : '#166534' }}>
                    Emon will personally review your message and reply within <strong>2 hours</strong> on working days.
                  </p>
                  <p className="text-sm mb-6" style={{ color: isDark ? '#6EE7B7' : '#15803D' }}>For the fastest response, continue directly on WhatsApp:</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                      💬 Continue on WhatsApp
                    </a>
                    <a href="/free-ai-audit"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200">
                      📅 Book Audit Call
                    </a>
                  </div>
                  <p className="text-xs mt-5" style={{ color: body }}>
                    Or <a href="/services" className="text-blue-500 hover:underline">browse our services</a> while you wait.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Your Name *</label>
                    <input id="name" {...register('name')}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: inputText,
                        outlineColor: '#3B82F6',
                      }}
                      placeholder="Your name" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Email or WhatsApp *</label>
                    <input id="contact" {...register('contact')}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                      placeholder="email@example.com or +880..." />
                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>Your Biggest Workflow Problem *</label>
                    <textarea id="message" {...register('message')} rows={5}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                      placeholder="Describe your biggest workflow pain point..." />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold mb-1.5" style={{ color: isDark ? '#CBD5E1' : '#374151' }}>
                      Service Interest <span className="font-normal" style={{ color: body }}>(optional)</span>
                    </label>
                    <select id="service" {...register('service')}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-colors"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}>
                      <option value="">Not sure yet</option>
                      <option value="ai-quick-win">AI Quick Win</option>
                      <option value="ai-sprint">AI Sprint</option>
                      <option value="ai-retainer">AI Retainer</option>
                      <option value="ai-coaching">AI Coaching</option>
                      <option value="notion-os">Notion OS Build</option>
                      <option value="ai-agent-dev">AI Agent Dev</option>
                      <option value="n8n-automation">n8n Automation</option>
                      <option value="corporate-training">Corporate Training</option>
                    </select>
                  </div>
                  <p className="text-xs mt-1" style={{ color: body }}>
                    By submitting, you agree to our{' '}
                    <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                    We'll only use your details to respond to your inquiry.
                  </p>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-all min-h-[52px]">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-xs text-center" style={{ color: body }}>For fastest response: WhatsApp us directly above.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
