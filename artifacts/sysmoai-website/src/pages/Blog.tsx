import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const posts = [
  {
    title: 'The AI Agent Economy: Why Bangladesh Businesses Must Act Now',
    excerpt: 'AI agents are no longer a future concept — they\'re live, affordable, and being deployed by forward-thinking businesses right now. Here\'s what it means for Bangladesh.',
    category: 'AI Trends',
    date: 'April 2026',
    readTime: '7 min read',
    slug: '#',
  },
  {
    title: 'How to Build a Notion OS for Your Business in 2026',
    excerpt: 'A step-by-step guide to designing a Notion Operating System that actually works — from database architecture to automations.',
    category: 'Notion OS',
    date: 'April 2026',
    readTime: '12 min read',
    slug: '#',
  },
  {
    title: 'n8n vs Zapier: Which Automation Tool is Right for Bangladesh Businesses?',
    excerpt: 'Both tools automate workflows. But one costs 80% less at scale and gives you far more control. Here\'s an honest comparison.',
    category: 'Automation',
    date: 'Coming Soon',
    readTime: '8 min read',
    slug: '#',
  },
  {
    title: 'The Freelancer\'s Guide to 3x Rates with AI',
    excerpt: 'AI isn\'t replacing freelancers — it\'s separating the ones who adapt from those who get left behind. Here\'s exactly how to use AI to charge more.',
    category: 'Freelancers',
    date: 'Coming Soon',
    readTime: '10 min read',
    slug: '#',
  },
  {
    title: 'Building an F-Commerce Auto-Response System with n8n',
    excerpt: 'A practical walkthrough of how to set up a Facebook DM auto-response system for F-commerce sellers using n8n — without a developer.',
    category: 'F-Commerce',
    date: 'Coming Soon',
    readTime: '15 min read',
    slug: '#',
  },
  {
    title: 'Why Most AI Transformations Fail (And How to Do It Right)',
    excerpt: 'Most companies buy AI tools and see zero ROI. The problem isn\'t the tools — it\'s the implementation approach. Here\'s what works.',
    category: 'AI Strategy',
    date: 'Coming Soon',
    readTime: '9 min read',
    slug: '#',
  },
];

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

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article key={i} variants={fadeUp}
                className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl overflow-hidden transition-all group flex flex-col">
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">{post.category}</span>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${post.date === 'Coming Soon' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock size={12} /> {post.readTime}
                    </span>
                    {post.date !== 'Coming Soon' ? (
                      <Link href={post.slug} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Read <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Coming soon</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-4">Get practical AI guides in your inbox</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-500 mb-6">No fluff. Practical AI implementation insights for Bangladesh businesses.</motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold transition-all min-h-[52px]">
              <MessageCircle size={20} /> Follow on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
