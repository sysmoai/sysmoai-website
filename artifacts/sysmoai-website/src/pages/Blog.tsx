import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts, groupLabels, articleTypeLabels, type BlogPost } from '@/data/blogPosts';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const allGroups = ['all', ...Object.keys(groupLabels)];

function PostCard({ post }: { post: BlogPost }) {
  const { isDark } = useTheme();
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl"
        style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.1)',
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : '#EFF6FF', color: isDark ? '#93C5FD' : '#2563EB' }}>
              {groupLabels[post.targetGroup] ?? post.targetGroup}
            </span>
            <span className="text-xs" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
              {articleTypeLabels[post.articleType]}
            </span>
          </div>
          <h2 className="font-bold text-base leading-snug mb-2 group-hover:text-blue-500 transition-colors line-clamp-2"
            style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
            {post.title}
          </h2>
          <p className="text-sm line-clamp-2 mb-4" style={{ color: isDark ? '#64748B' : '#64748B' }}>
            {post.metaDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
              <Clock size={12} />
              <span>{post.readTime}</span>
              <span className="mx-1">·</span>
              <span>{new Date(post.publishDate).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <span className="text-blue-500 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function Blog() {
  const { isDark } = useTheme();
  const searchParams = new URLSearchParams(window.location.search);
  const initialGroup = searchParams.get('group') || 'all';
  const [activeGroup, setActiveGroup] = useState(initialGroup);

  React.useEffect(() => {
    document.title = 'AI Blog Bangladesh — Practical Guides | SYSmoAI';
  }, []);

  const filtered = activeGroup === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.targetGroup === activeGroup);

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const subColor = isDark ? '#64748B' : '#64748B';

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative py-20 md:py-24" style={{ background: isDark ? '#0A0B0F' : '#EFF6FF' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : '#DBEAFE', color: '#2563EB' }}>
              AI Insights · Bangladesh
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
            Practical AI Guides<br className="hidden md:block" /> for Bangladesh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto" style={{ color: subColor }}>
            No theory. No fluff. Actionable systems for students, businesses, and professionals.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-0 z-30 py-4 border-b" style={{ background: isDark ? 'rgba(10,11,15,0.95)' : 'rgba(248,250,255,0.95)', borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {allGroups.map(group => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className="shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full transition-all"
                style={{
                  background: activeGroup === group
                    ? (isDark ? '#2563EB' : '#2563EB')
                    : (isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'),
                  color: activeGroup === group ? '#FFFFFF' : (isDark ? '#94A3B8' : '#475569'),
                }}
              >
                {group === 'all' ? 'All Articles' : groupLabels[group]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-6" style={{ color: subColor }}>
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            {activeGroup !== 'all' ? ` for ${groupLabels[activeGroup]}` : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.08)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-3" style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
            Get new articles in your inbox
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-sm mb-6" style={{ color: subColor }}>
            Practical AI insights for Bangladesh — no spam, no theory. Just what works.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)'}`,
                color: isDark ? '#F1F5F9' : '#0A0B0F',
              }}
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
