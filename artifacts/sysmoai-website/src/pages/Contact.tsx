import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WA_LINK, EMAIL } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more — at least 10 characters'),
  service: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  React.useEffect(() => { document.title = 'Contact SYSmoAI | Get Your Free AI Audit'; }, []);

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
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
            className="text-slate-400 text-lg">
            Book a free 30-minute AI Audit — no pitch, no commitment.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Fastest way to reach us</h2>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-5 rounded-xl font-semibold text-lg transition-all hover:shadow-lg group">
                  <MessageCircle size={26} className="shrink-0" />
                  <div>
                    <div>WhatsApp Us</div>
                    <div className="text-green-100 text-sm font-normal">+880 1711-638693 · Reply within 2 hours</div>
                  </div>
                </a>
              </div>
              <div className="space-y-4">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                  <Mail size={18} className="text-blue-500 shrink-0" />
                  <span>{EMAIL}</span>
                </a>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin size={18} className="text-blue-500 shrink-0" />
                  <span>Dhaka, Bangladesh 🇧🇩</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock size={18} className="text-blue-500 shrink-0" />
                  <span>10 AM – Midnight BST (working days)</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-900 mb-3">What happens in the free audit?</h3>
                <ul className="space-y-2.5">
                  {[
                    'We map your single biggest workflow bottleneck',
                    'We identify the highest-ROI AI opportunity for your situation',
                    'We show you exactly what a solution would look like',
                    'Zero commitment — even if you don\'t hire us',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
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
                <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message received!</h3>
                  <p className="text-slate-600">We'll respond within 2 hours on working days. For fastest response, WhatsApp us directly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      id="name"
                      {...register('name')}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400"
                      placeholder="Emon Hossain"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400"
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold text-slate-700 mb-1.5">Business / Organization</label>
                    <input
                      id="business"
                      {...register('business')}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-1.5">What are you interested in?</label>
                    <select
                      id="service"
                      {...register('service')}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                    >
                      <option value="">Select a service (optional)</option>
                      <option value="ai-quick-win">AI Quick Win</option>
                      <option value="ai-sprint">AI Sprint</option>
                      <option value="ai-retainer">AI Retainer</option>
                      <option value="notion-os">Notion OS Build</option>
                      <option value="ai-agent-dev">AI Agent Development</option>
                      <option value="n8n-automation">n8n Automation</option>
                      <option value="corporate-training">Corporate Training</option>
                      <option value="coaching">1:1 Coaching</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">Tell us about your situation *</label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="What's your biggest workflow problem? What do you want AI to help with?"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-all min-h-[52px]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-slate-400 text-xs text-center">For fastest response: WhatsApp us directly above.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
