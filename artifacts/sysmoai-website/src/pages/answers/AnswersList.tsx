import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { answersPosts } from '@/data/answersPosts';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function AnswersList() {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = 'AI Answers — Bangladesh Business & F-Commerce | SYSmoAI';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Direct answers to the most-asked questions about AI consulting, F-commerce automation, and AI implementation in Bangladesh. Written by Emon Hossain, SYSmoAI.');
  }, []);

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const textColor = isDark ? '#64748B' : '#64748B';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg, minHeight: '100vh' }}>
      <section className="relative py-20 md:py-24" style={{ background: isDark ? '#0A0B0F' : '#EFF6FF' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : '#DBEAFE', color: '#2563EB' }}>
              Direct Answers · Bangladesh AI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
            Answers to Your AI Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto" style={{ color: textColor }}>
            Direct, verifiable answers about AI consulting, F-commerce automation, and AI implementation in Bangladesh — written by Emon Hossain, SYSmoAI founder.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-6">
            {answersPosts.map((post, i) => (
              <Link key={post.slug} href={`/answers/${post.slug}`}>
                <motion.article
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-lg p-6"
                  style={{
                    transitionDelay: `${i * 50}ms`,
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.1)',
                  }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: isDark ? 'rgba(59,130,246,0.15)' : '#EFF6FF', color: '#2563EB' }}>
                      AI Answers
                    </span>
                    <span className="text-xs" style={{ color: textColor }}>{post.targetKeyword}</span>
                  </div>
                  <h2 className="font-bold text-lg leading-snug mb-2 group-hover:text-blue-500 transition-colors"
                    style={{ color: headingColor }}>
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: textColor }}>
                    {post.directAnswer}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: textColor }}>
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                      <span className="mx-1">·</span>
                      <span>{new Date(post.publishDate).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span className="text-blue-500 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Answer <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
