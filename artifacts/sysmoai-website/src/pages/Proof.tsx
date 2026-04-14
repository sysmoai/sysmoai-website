import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const testimonials = [
  { quote: '"Emon built our entire AI operations system in one week. We went from chaos to complete clarity. The WhatsApp automation alone saves our team 3 hours every day."', name: 'Rumi K.', role: 'E-commerce Founder', city: 'Dhaka', service: 'AI Sprint', result: '3 hrs saved daily' },
  { quote: '"The AI Quick Win saved us 15 hours of manual work every week — immediately. ROI in the first 3 days. Wish we\'d done this 6 months ago."', name: 'Sajid A.', role: 'Digital Agency Owner', city: 'Dhaka', service: 'AI Quick Win', result: '15 hrs/week saved' },
  { quote: '"Finally someone who understands Bangladesh\'s market AND meets global AI standards. The Notion OS he built replaced 5 different apps for our team."', name: 'Tanvir M.', role: 'Senior Freelancer', city: 'Chittagong', service: 'Notion OS Build', result: '5 apps → 1 system' },
];

const stats = [
  { value: 'Top 5%', label: 'Prompt Engineers Globally' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '8+', label: 'Client Categories' },
  { value: '3+', label: 'Years Building AI Systems' },
];

export default function Proof() {
  React.useEffect(() => { document.title = 'Case Studies & Results | SYSmoAI Bangladesh'; }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600 opacity-[0.1] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Real results. Real people.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg">
            We measure success by your results — not our hours.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-10">Client testimonials</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 flex-1 text-sm italic">{t.quote}</p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs mb-3">{t.role}, {t.city}</p>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">{t.service}</span>
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">{t.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Case studies coming soon</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              We're documenting detailed before/after case studies across all our client categories. Check back soon — or ask us directly on WhatsApp.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold transition-all min-h-[52px]">
              <MessageCircle size={20} /> Ask Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
