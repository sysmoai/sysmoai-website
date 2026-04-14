import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MessageCircle, Zap, Timer, RefreshCw, Users, BookOpen, Layout, Bot, Settings, Building, Globe, ArrowRight } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.09 } } };

const featured = [
  { icon: Zap, title: 'AI Quick Win', subtitle: 'Your #1 problem automated in 3 days', bd: '৳3,750–7,500', usd: '$50–$100', href: '/services/ai-quick-win', tag: 'Best starting point' },
  { icon: Timer, title: 'AI Implementation Sprint', subtitle: 'Full AI stack deployed in 14 days', bd: '৳25,000–50,000', usd: '$300–$600', href: '/services/ai-sprint', tag: 'Most popular' },
  { icon: RefreshCw, title: 'AI Operations Retainer', subtitle: 'Ongoing AI management, every month', bd: '৳20,000/mo', usd: '$250/mo', href: '/services/ai-retainer', tag: 'Cancel anytime' },
];

const other = [
  { icon: Users, title: '1:1 AI Coaching', desc: '60-min personalized session', bd: '৳2,500/session', href: '/services/ai-coaching' },
  { icon: BookOpen, title: 'Group AI Workshop', desc: 'Team upskilling, half-day', bd: '৳500/person', href: '/services/group-workshop' },
  { icon: Layout, title: 'Notion OS Build', desc: 'Your business in one place', bd: '৳15,000–50,000', href: '/services/notion-os' },
  { icon: Bot, title: 'AI Agent Development', desc: 'Custom AI agents, 24/7', bd: '৳50,000–2,00,000', href: '/services/ai-agent-dev' },
  { icon: Settings, title: 'n8n Automation', desc: 'Per-workflow automation', bd: '৳2,000–10,000', href: '/services/n8n-automation' },
  { icon: Building, title: 'Corporate Training', desc: 'Enterprise AI adoption', bd: '৳50,000–2,00,000', href: '/services/corporate-training' },
  { icon: Globe, title: 'International Clients', desc: 'USD pricing, global delivery', bd: 'View USD Pricing', href: '/services/international' },
];

export default function Services() {
  React.useEffect(() => { document.title = 'AI Services Bangladesh | SYSmoAI'; }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            From 3-day quick wins to full AI operating systems.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every service is built around one goal: real, measurable results. We don't get paid until it works.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-10">Core services</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl p-8 rounded-2xl transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <s.icon size={22} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{s.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm mb-5 flex-1">{s.subtitle}</p>
                <div className="mb-5">
                  <span className="text-2xl font-bold text-blue-600">{s.bd}</span>
                  <span className="text-slate-400 text-sm ml-2">· {s.usd} intl</span>
                </div>
                <Link href={s.href}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all min-h-[44px]">
                  Learn More <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-10">All services</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {other.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md p-6 rounded-2xl transition-all group">
                <s.icon size={22} className="text-blue-600 mb-4" />
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-slate-500 text-sm mb-3">{s.desc}</p>
                <p className="text-blue-600 font-semibold text-sm mb-4">{s.bd}</p>
                <Link href={s.href} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors">
                  Details <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 text-center mb-12">Not sure which service is right for you?</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'I have one specific problem', rec: 'Start with AI Quick Win', href: '/services/ai-quick-win' },
              { label: 'I want a complete AI transformation', rec: 'Go with AI Sprint', href: '/services/ai-sprint' },
              { label: "I don't know where to start", rec: 'Book a free discovery call', href: WA_LINK, external: true },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center">
                <p className="text-slate-600 text-sm mb-3">{item.label}</p>
                <p className="font-bold text-slate-900 mb-4">→ {item.rec}</p>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MessageCircle size={15} /> WhatsApp Us
                  </a>
                ) : (
                  <Link href={item.href} className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-blue-700">
                    Learn More <ArrowRight size={14} />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to get started?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-slate-400 mb-8">
            Book a free 30-minute AI Audit on WhatsApp — no commitment required.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] min-h-[56px]">
              <MessageCircle size={22} /> Book Free AI Audit
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
