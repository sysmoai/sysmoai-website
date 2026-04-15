import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Blog() {
  React.useEffect(() => { document.title = 'AI Blog Bangladesh | SYSmoAI'; }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative bg-[#0A0B0F] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600 opacity-[0.1] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            AI Insights & Practical Guides
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg">
            No theory. No fluff. Just actionable AI knowledge for Bangladesh businesses.
          </motion.p>
        </div>
      </section>

      {/* Blog section hidden until articles are published */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              In-depth AI guides coming soon
            </h3>
            <p className="text-slate-500">
              We're publishing real case studies and how-to guides.
              Check back soon or{' '}
              <a
                href="https://wa.me/8801711638693"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                subscribe via WhatsApp
              </a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-4">Get practical AI guides in your inbox</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-500 mb-6">No fluff. Practical AI implementation insights for Bangladesh businesses.</motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a
              href="https://wa.me/8801711638693"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold transition-all min-h-[52px]"
            >
              <MessageCircle size={20} /> Follow on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
