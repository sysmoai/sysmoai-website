import React, { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';
import { answersPosts } from '@/data/answersPosts';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';
import { DirectAnswer } from '@/components/DirectAnswer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function AnswerPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const post = answersPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | SYSmoAI`;
  }, [post]);

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const textColor = isDark ? '#94A3B8' : '#475569';
  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
  const mutedColor = isDark ? '#64748B' : '#94A3B8';

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: bg }}>
        <h1 className="text-2xl font-bold" style={{ color: headingColor }}>Answer not found</h1>
        <Link href="/answers" className="text-blue-500 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Browse All Answers
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>
      <section className="py-14 md:py-20" style={{ background: isDark ? '#0A0B0F' : '#EFF6FF' }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/answers" className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-blue-500 transition-colors" style={{ color: textColor }}>
              <ArrowLeft size={14} /> All Answers
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : '#DBEAFE', color: '#2563EB' }}>
              AI Answers
            </span>
            <span className="text-xs" style={{ color: textColor }}>GEO-optimized guide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
            {post.title}
          </motion.h1>

          {post.titleBangla && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-lg mb-4" style={{ color: textColor }}>
              {post.titleBangla}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-sm" style={{ color: textColor }}>
            <span className="font-medium" style={{ color: isDark ? '#E2E8F0' : '#334155' }}>By {post.author}</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
            <span>{new Date(post.publishDate).toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <DirectAnswer bangla={post.directAnswerBangla}>
            {post.directAnswer}
          </DirectAnswer>
        </motion.div>

        <motion.div
          initial="hidden" animate="show" variants={fadeUp}
          className="prose prose-slate max-w-none mt-8"
          style={{
            '--tw-prose-body': textColor,
            '--tw-prose-headings': headingColor,
            '--tw-prose-links': '#2563EB',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.faq.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-6" style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faq.map((item, i) => (
                <motion.details
                  key={i}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="rounded-xl border overflow-hidden group"
                  style={{ background: cardBg, borderColor }}
                >
                  <summary
                    className="font-semibold p-5 text-sm cursor-pointer list-none flex items-center justify-between gap-3 hover:text-blue-500 transition-colors"
                    style={{ color: headingColor }}>
                    {item.question}
                    <ArrowRight size={14} className="shrink-0 group-open:rotate-90 transition-transform" style={{ color: mutedColor }} />
                  </summary>
                  <p className="text-sm leading-relaxed px-5 pb-5" style={{ color: textColor }}>{item.answer}</p>
                </motion.details>
              ))}
            </div>
          </div>
        )}

        {post.sources.length > 0 && (
          <div className="mt-10 pt-8 border-t" style={{ borderColor }}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: mutedColor }}>Sources</h3>
            <ol className="space-y-1">
              {post.sources.map((src, i) => (
                <li key={i} className="text-xs flex items-start gap-2" style={{ color: mutedColor }}>
                  <span className="shrink-0 font-bold">{i + 1}.</span>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-1">
                      {src.label} <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span>{src.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10 pt-8 border-t" style={{ borderColor }}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h3 className="text-sm font-semibold" style={{ color: headingColor }}>Related Resources</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.relatedLinks.map((link, i) => (
              <Link key={i} href={link.href}
                className="text-xs font-medium px-3 py-2 rounded-lg border transition-colors hover:border-blue-500 hover:text-blue-500"
                style={{ borderColor, color: textColor }}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(59,130,246,0.25)' : '#BFDBFE'}` }}>
          <p className="text-sm font-semibold mb-1" style={{ color: '#2563EB' }}>Ready to implement AI in your business?</p>
          <p className="text-base font-bold mb-4" style={{ color: headingColor }}>Book a Free 30-Minute AI Audit</p>
          <p className="text-sm mb-5" style={{ color: textColor }}>
            Emon Hossain maps your workflow, identifies your highest-ROI AI opportunity, and gives you a clear action plan — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/free-ai-audit"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all">
              📅 Book Free AI Audit
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
