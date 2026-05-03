import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, MessageCircle, Users, BookOpen, Layout, Bot, Settings, Building, Globe } from 'lucide-react';
import { WA_URLS } from '@/lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import { DirectAnswer } from '@/components/DirectAnswer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const engagements = [
  {
    icon: Bot,
    title: 'AI Agent Development',
    desc: 'Custom AI agents trained on your business — WhatsApp, web, or internal. For businesses that need beyond-sprint complexity.',
    bd: '৳50,000–2,00,000',
    usd: '$2,500–$15,000',
    tag: 'Custom build',
  },
  {
    icon: Layout,
    title: 'Notion OS Build',
    desc: 'Your entire business in one Notion workspace — databases, dashboards, automations, and team SOPs.',
    bd: '৳15,000–50,000',
    usd: '$800–$5,000',
    tag: 'One-time',
  },
  {
    icon: Settings,
    title: 'n8n Automation',
    desc: 'Per-workflow automation connecting any apps you use — built and deployed with full error handling.',
    bd: '৳2,000–10,000/workflow',
    usd: '$50–$300/workflow',
    tag: 'Per workflow',
  },
  {
    icon: Users,
    title: '1:1 AI Coaching',
    desc: 'Personalised 60-minute session with Emon. Walk away with a specific AI action plan for your situation.',
    bd: '৳2,500/session',
    usd: '$30/session',
    tag: 'Individual',
  },
  {
    icon: BookOpen,
    title: 'Group AI Workshop',
    desc: 'Half-day hands-on workshop for teams. Custom curriculum for your industry. Min 10 participants.',
    bd: '৳500/person',
    usd: '$15/person',
    tag: 'Teams',
  },
  {
    icon: Building,
    title: 'Corporate AI Training',
    desc: 'Enterprise-wide AI adoption — audit, training, top 3 automations implemented, 90-day roadmap.',
    bd: '৳50,000–2,00,000',
    usd: '$1,500–$8,000',
    tag: 'Enterprise',
  },
  {
    icon: Globe,
    title: 'International Clients',
    desc: 'World-class AI systems at Dhaka rates — typically 60–80% less than US/EU agencies. USD pricing, Wise/Stripe payments.',
    bd: null,
    usd: 'Custom USD',
    tag: 'Worldwide',
  },
];

export default function OtherEngagements() {
  const { isDark } = useTheme();

  React.useEffect(() => {
    document.title = 'Other Engagements — By Inquiry | SYSmoAI';
  }, []);

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(37,99,235,0.12)';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';

  return (
    <div className="flex flex-col w-full" style={{ background: bg1 }}>

      {/* Direct Answer — GEO */}
      <section className="pt-10 pb-0" style={{ background: bg1 }}>
        <div className="max-w-4xl mx-auto px-4">
          <DirectAnswer bangla="SYSmoAI-এর অন্যান্য সেবা (ইনকোয়ারি ভিত্তিক): AI কোচিং ৳২,৫০০/সেশন, গ্রুপ ওয়ার্কশপ ৳৫০০/জন, Notion OS ৳১৫,০০০–৳৫০,০০০, AI এজেন্ট ৳৫০,০০০–৳২,০০,০০০, n8n অটোমেশন, কর্পোরেট ট্রেনিং।">
            SYSmoAI's additional services (available by inquiry): 1:1 AI Coaching ৳2,500/session ($30), Group AI Workshop ৳500/person ($8), Notion OS Build ৳15,000–৳50,000 ($800–$5,000), AI Agent Development ৳50,000–৳2,00,000 ($2,500–$15,000), n8n Automation per workflow, Corporate Training ৳50,000–৳2,00,000 ($1,500–$8,000). All engagements by inquiry — contact via WhatsApp or book a free audit.
          </DirectAnswer>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600 opacity-[0.07] blur-[140px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              ← All Services
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-blue-400"
              style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)' }}>
              By Inquiry
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Other Engagements
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              Beyond our F-Commerce AI Sprint, we take select engagements for agent development, corporate training, international clients, and specialised automation work. These are by inquiry — reach out on WhatsApp to discuss your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/free-ai-audit"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all">
                Book Free Audit First
                <ArrowRight size={15} />
              </Link>
              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ead57] border border-[#25D366]/30 hover:border-[#25D366] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all">
                <MessageCircle size={15} />
                Enquire on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anchor reminder */}
      <section className="py-10 border-b" style={{ background: isDark ? 'rgba(37,99,235,0.06)' : '#EFF6FF', borderColor: isDark ? 'rgba(37,99,235,0.15)' : '#BFDBFE' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-medium" style={{ color: isDark ? '#93C5FD' : '#1E40AF' }}>
            💡 Most F-Commerce sellers start with the{' '}
            <Link href="/services/ai-sprint" className="font-bold underline underline-offset-2 hover:text-blue-500">
              F-Commerce AI Sprint (৳50,000)
            </Link>
            {' '}— 14 days to a fully automated operation. Looking for something else? Read on.
          </p>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-20" style={{ background: bg1 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {engagements.map((e, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    <e.icon size={18} className="text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.06)', color: isDark ? '#94A3B8' : '#64748B' }}>
                    {e.tag}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-2" style={{ color: heading }}>{e.title}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: body }}>{e.desc}</p>
                  <div className="flex items-center gap-2 text-sm">
                    {e.bd && <span className="font-semibold text-blue-400">{e.bd}</span>}
                    {e.bd && <span style={{ color: isDark ? '#334155' : '#CBD5E1' }}>·</span>}
                    <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>{e.usd}</span>
                  </div>
                </div>
                <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#25D366] hover:text-[#1ead57] transition-colors group">
                  <MessageCircle size={13} />
                  Enquire on WhatsApp
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: heading }}>Not sure which fits you?</h2>
            <p className="mb-8" style={{ color: body }}>
              Book a free 30-minute audit. Emon reviews your situation and recommends the right engagement — no obligation.
            </p>
            <Link href="/free-ai-audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all">
              Book Free AI Audit
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
