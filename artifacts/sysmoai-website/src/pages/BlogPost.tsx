import React, { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, Share2, MessageCircle } from 'lucide-react';
import { blogPosts, groupLabels, articleTypeLabels, type BlogPost } from '@/data/blogPosts';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function injectSchema(type: 'Article' | 'FAQPage', data: object) {
  const id = `schema-${type.toLowerCase()}`;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    (el as HTMLScriptElement).type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeSchemas() {
  ['schema-article', 'schema-faqpage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} | SYSmoAI Blog`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.metaDescription);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', `https://sysmoai.com/blog/${post.slug}`);

    injectSchema('Article', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.headline,
      description: post.metaDescription,
      author: { '@type': 'Person', name: post.author, url: 'https://sysmoai.com/about' },
      publisher: {
        '@type': 'Organization',
        name: 'SYSmoAI',
        url: 'https://sysmoai.com',
        logo: { '@type': 'ImageObject', url: 'https://sysmoai.com/og-image.png' },
      },
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://sysmoai.com/blog/${post.slug}` },
      keywords: post.metaKeywords.join(', '),
    });

    injectSchema('FAQPage', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });

    return () => removeSchemas();
  }, [post]);

  const bg = isDark ? '#0A0B0F' : '#F8FAFF';
  const headingColor = isDark ? '#F1F5F9' : '#0A0B0F';
  const textColor = isDark ? '#94A3B8' : '#475569';
  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.1)';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: bg }}>
        <h1 className="text-2xl font-bold" style={{ color: headingColor }}>Article not found</h1>
        <Link href="/blog" className="text-blue-500 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.slug !== post.slug && post.relatedGroups.includes(p.targetGroup)).slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://sysmoai.com/blog/${post.slug}`;

  return (
    <div style={{ background: bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section className="py-14 md:py-20" style={{ background: isDark ? 'rgba(10,11,15,1)' : '#EFF6FF' }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm mb-6 hover:text-blue-500 transition-colors"
              style={{ color: textColor }}>
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="flex items-center gap-2 flex-wrap mb-4">
            <Link href={`/blog?group=${post.targetGroup}`}
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : '#DBEAFE', color: '#2563EB' }}>
              {groupLabels[post.targetGroup]}
            </Link>
            <span className="text-xs" style={{ color: textColor }}>
              {articleTypeLabels[post.articleType]}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
            {post.headline}
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-sm" style={{ color: textColor }}>
            <span className="font-medium" style={{ color: isDark ? '#E2E8F0' : '#334155' }}>By {post.author}</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
            <span>{new Date(post.publishDate).toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          {/* Main content */}
          <div>
            <motion.div
              initial="hidden" animate="show" variants={fadeUp}
              className="prose prose-slate max-w-none"
              style={{
                '--tw-prose-body': textColor,
                '--tw-prose-headings': headingColor,
                '--tw-prose-links': '#2563EB',
              } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share bar */}
            <div className="mt-10 pt-6 border-t flex items-center justify-between flex-wrap gap-4"
              style={{ borderColor }}>
              <span className="text-sm font-medium" style={{ color: textColor }}>Found this useful?</span>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors hover:bg-blue-50"
                  style={{ borderColor, color: textColor }}>
                  <Share2 size={13} /> Share
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors">
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>

            {/* FAQ */}
            {post.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6" style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faq.map((item, i) => (
                    <motion.div
                      key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                      className="rounded-xl p-5 border"
                      style={{ background: cardBg, borderColor }}>
                      <h3 className="font-semibold mb-2 text-sm" style={{ color: headingColor }}>{item.question}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: textColor }}>{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl p-5 border" style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', borderColor: isDark ? 'rgba(59,130,246,0.2)' : '#BFDBFE' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2563EB' }}>
                  {post.ctaService}
                </p>
                <p className="text-lg font-bold mb-1" style={{ color: headingColor }}>{post.ctaPrice}</p>
                <p className="text-xs mb-4" style={{ color: textColor }}>
                  Get personalized help building your AI system.
                </p>
                <Link href={post.ctaLink}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors mb-2">
                  Learn More
                </Link>
                <Link href="/free-ai-audit"
                  className="block w-full text-center border text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  style={{ borderColor: isDark ? 'rgba(59,130,246,0.4)' : '#93C5FD', color: '#2563EB' }}>
                  Free AI Audit →
                </Link>
              </div>

              <div className="rounded-2xl p-5 border" style={{ background: cardBg, borderColor }}>
                <p className="text-xs font-semibold mb-2" style={{ color: headingColor }}>Internal links</p>
                <ul className="space-y-2">
                  {post.internalLinks.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors">
                        <ArrowRight size={11} /> {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
                <MessageCircle size={16} /> Ask on WhatsApp
              </a>
            </div>
          </aside>
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 lg:hidden space-y-3">
          <Link href={post.ctaLink}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl transition-colors">
            {post.ctaService} — {post.ctaPrice}
          </Link>
          <Link href="/free-ai-audit"
            className="flex items-center justify-center border font-semibold px-6 py-4 rounded-xl transition-colors"
            style={{ borderColor, color: '#2563EB' }}>
            Book Free AI Audit
          </Link>
          <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-xl transition-colors">
            <MessageCircle size={18} /> Ask on WhatsApp
          </a>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t" style={{ borderColor }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: headingColor, fontFamily: "'Space Grotesk', sans-serif" }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <div className="group p-4 rounded-xl border hover:-translate-y-1 transition-all cursor-pointer"
                    style={{ background: cardBg, borderColor }}>
                    <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{ background: isDark ? 'rgba(59,130,246,0.1)' : '#EFF6FF', color: '#2563EB' }}>
                      {groupLabels[rp.targetGroup]}
                    </span>
                    <p className="text-sm font-semibold leading-snug group-hover:text-blue-500 transition-colors line-clamp-2"
                      style={{ color: headingColor }}>
                      {rp.title}
                    </p>
                    <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: textColor }}>
                      <Clock size={11} /> {rp.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
