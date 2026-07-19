import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { WA_URLS } from '@/lib/whatsapp';
import { SYSmoAILogo } from '@/components/SYSmoAILogo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const sections = [
  {
    icon: '🤖',
    title: 'AI অটোমেশন',
    desc: 'আপনার ব্যবসার পুনরাবৃত্তিমূলক কাজগুলো AI দিয়ে অটোমেট করুন। WhatsApp থেকে শুরু করে Notion পর্যন্ত সবকিছু সংযুক্ত হবে।',
    href: '/services/n8n-automation',
  },
  {
    icon: '🏗️',
    title: 'Notion OS',
    desc: 'আপনার পুরো ব্যবসা একটি কেন্দ্রীয় Notion ওয়ার্কস্পেস থেকে পরিচালনা করুন। ক্লায়েন্ট, প্রজেক্ট, ফাইন্যান্স — সবকিছু সংযুক্ত।',
    href: '/services/notion-os',
  },
  {
    icon: '📊',
    title: 'SME ও F-Commerce সমাধান',
    desc: 'Facebook থেকে অর্ডার ম্যানেজমেন্ট, WhatsApp অটো-রিপ্লাই, এবং কাস্টমার ট্র্যাকিং — সবকিছু AI দিয়ে অটোমেট করুন।',
    href: '/for/f-commerce',
  },
  {
    icon: '🎓',
    title: 'কর্পোরেট AI ট্রেনিং',
    desc: 'আপনার টিমের জন্য AI ট্রেনিং। ৫০+ কর্মচারীর জন্য কাস্টমাইজড AI কারিকুলাম ও হাতে-কলমে ওয়ার্কশপ।',
    href: '/services/corporate-training',
  },
];

export default function BanglaHub() {
  const { isDark } = useTheme();
  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';

  useEffect(() => {
    document.title = 'SYSmoAI — বাংলা | বাংলাদেশের জন্য AI সিস্টেম';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'SYSmoAI বাংলা — বাংলাদেশের ব্যবসার জন্য AI-চালিত অপারেটিং সিস্টেম। AI অটোমেশন, Notion OS, এবং কর্পোরেট ট্রেনিং।');
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>
      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600 opacity-[0.08] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.26em] text-blue-500 mb-5"
          >
            SYSmoAI · Systems in Motion
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.3]" lang="bn">
            আপনার ব্যবসার জন্য<br />AI-চালিত সিস্টেম
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed" lang="bn">
            SYSmoAI বাংলাদেশের উদ্যোক্তা, এজেন্সি ও কর্পোরেট প্রতিষ্ঠানের জন্য AI অটোমেশন, ওয়ার্কফ্লো সিস্টেম এবং কাস্টম AI এজেন্ট তৈরি করে।
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fit-check"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
                ফ্রি ফিট চেক নিন <ArrowRight size={18} />
              </Link>
              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
                WhatsApp এ যোগাযোগ <MessageCircle size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions in Bangla */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-6">
            {sections.map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={s.href}
                  className="block p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                  }}>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{s.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold mb-1.5" lang="bn" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed" lang="bn" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
                        {s.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 mt-3 group-hover:gap-2 transition-all">
                        বিস্তারিত দেখুন <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process in Bangla */}
      <section className="py-16" style={{ background: isDark ? '#0D0F14' : '#F8FAFF' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView="show" viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-6" lang="bn" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
            আমাদের কাজের প্রক্রিয়া
          </motion.h2>
          <motion.p className="mb-10 max-w-xl mx-auto" lang="bn" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
            আমরা তিনটি ধাপে আপনার ব্যবসার জন্য AI সিস্টেম তৈরি করি — ডিসকভারি থেকে শুরু করে সম্পূর্ণ হ্যান্ডওভার পর্যন্ত।
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { step: '০১', title: 'ডিসকভারি', desc: 'আমরা আপনার বর্তমান ওয়ার্কফ্লো বুঝি, সমস্যা চিহ্নিত করি, এবং সবচেয়ে কার্যকর AI সমাধান ডিজাইন করি।' },
              { step: '০২', title: 'বিল্ড', desc: 'আমরা সিস্টেম তৈরি করি, রিয়েল ডেটা দিয়ে টেস্ট করি, এবং আপনার ফিডব্যাক অনুযায়ী সংশোধন করি।' },
              { step: '০৩', title: 'হ্যান্ডওভার', desc: 'সম্পূর্ণ ডকুমেন্টেশন ও ট্রেনিং সহ সিস্টেম হস্তান্তর। আপনি ১০০% মালিকানা পান।' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="p-6 rounded-2xl"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'}`,
                }}>
                <span className="text-sm font-bold text-blue-500">{item.step}</span>
                <h3 className="text-lg font-bold mt-1 mb-2" lang="bn" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" lang="bn" style={{ color: isDark ? '#94A3B8' : '#475569' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: bg1 }}>
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView="show" viewport={{ once: true }}
            className="text-2xl font-bold mb-4" lang="bn" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
            আজই শুরু করুন
          </motion.h2>
          <motion.p className="mb-8" lang="bn" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
            ১৫ মিনিটের ফ্রি ফিট চেকে জানুন আপনার ব্যবসার জন্য AI সিস্টেম কতটা কার্যকর হতে পারে।
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fit-check"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
              ফ্রি ফিট চেক নিন
            </Link>
            <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm" lang="bn" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
            অথবা ইমেইল: <a href="mailto:hello@sysmoai.com" className="text-blue-500 hover:underline">hello@sysmoai.com</a>
          </p>
          <div className="mt-6">
            <Link href="/"
              className="text-sm text-blue-500 hover:underline">
              ← English site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
