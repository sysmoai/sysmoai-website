import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Bot, Users, BookOpen, Layout, Settings, Building, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const engagements = [
  {
    icon: Bot,
    title: 'AI Systems & Agent Workflows',
    desc: 'Bounded AI-assisted workflows or agent-style systems designed around an agreed business process, review points and acceptance criteria.',
    tag: 'By scope',
  },
  {
    icon: Layout,
    title: 'Notion & Operating Systems',
    desc: 'Structured workspaces, databases, dashboards, SOPs and handoffs designed for the actual team and operating workflow.',
    tag: 'By scope',
  },
  {
    icon: Settings,
    title: 'Workflow Automation',
    desc: 'Low-code automation connecting selected tools and processes, with error handling and ownership requirements defined for the engagement.',
    tag: 'By scope',
  },
  {
    icon: Users,
    title: 'Advisory & Coaching',
    desc: 'Focused sessions for founders or operators who need help evaluating an AI workflow, automation decision or implementation plan.',
    tag: 'By inquiry',
  },
  {
    icon: BookOpen,
    title: 'Team Workshops',
    desc: 'Practical workshops on AI adoption, workflow mapping and responsible automation, customized to the audience and objectives.',
    tag: 'By inquiry',
  },
  {
    icon: Building,
    title: 'Organizational AI Adoption',
    desc: 'Discovery and implementation support for teams that need a structured approach to AI use cases, controls, workflow ownership and rollout.',
    tag: 'By scope',
  },
  {
    icon: Globe,
    title: 'International Engagements',
    desc: 'Remote projects can be considered when the problem, delivery model, communication requirements and commercial terms are a good fit.',
    tag: 'Remote',
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
      <section className="relative py-20 md:py-24" style={{ background: isDark ? '#0A0B0F' : 'linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-blue-500" style={{ color: body }}>
            ← All Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: isDark ? 'rgba(37,99,235,0.12)' : '#EFF6FF', border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#BFDBFE'}`, color: isDark ? '#60A5FA' : '#1D4ED8' }}>
              By Inquiry
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: heading }}>
              Other Engagements
            </h1>
            <p className="text-lg max-w-2xl mb-8" style={{ color: body }}>
              Some projects do not fit a standard service page. For those cases, SYSmoAI can review the workflow, expected outcome, delivery constraints and evidence requirements before confirming whether there is a fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all">
                Discuss a Project
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <p className="text-sm leading-relaxed" style={{ color: body }}>
              Pricing, delivery timelines, project scope, performance expectations and support terms are confirmed in the actual proposal or agreement. Older public price cards or result guarantees should not be treated as current offers unless they are explicitly re-approved and evidence-backed.
            </p>
          </div>
        </div>
      </section>

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
                  <p className="text-sm leading-relaxed" style={{ color: body }}>{e.desc}</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors group">
                  Discuss scope <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: heading }}>Have a workflow that needs review?</h2>
            <p className="mb-8" style={{ color: body }}>
              Send the current process, the intended outcome, the key constraints and any deadline. Fit, scope and commercial terms can then be evaluated without promising a result before the work is understood.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all">
              Contact SYSmoAI
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
