import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Search, Workflow, Bot, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const capabilities = [
  {
    icon: Search,
    title: 'Workflow diagnosis',
    description: 'Map the current process, bottlenecks, handoffs, tools, and failure points before deciding what should be automated.',
  },
  {
    icon: Workflow,
    title: 'Automation implementation',
    description: 'Design and connect practical workflows across the tools already used by the business, with documented ownership and exception handling.',
  },
  {
    icon: Bot,
    title: 'AI-assisted workflows',
    description: 'Apply AI to suitable tasks such as drafting, classification, extraction, structured assistance, or internal knowledge workflows.',
  },
  {
    icon: LayoutDashboard,
    title: 'Operating systems & visibility',
    description: 'Build practical dashboards, SOPs, databases, and operating views that reduce manual coordination and improve control.',
  },
];

export default function Services() {
  const { isDark } = useTheme();
  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFC';
  const heading = isDark ? '#F8FAFC' : '#0F172A';
  const body = isDark ? '#94A3B8' : '#475569';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';

  React.useEffect(() => {
    document.title = 'AI Systems & Automation Capabilities | SYSmoAI';
  }, []);

  return (
    <div style={{ background: bg1 }}>
      <section className="py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">SYSmoAI capabilities</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ color: heading }}>
            Practical AI systems, scoped around the workflow.
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl mt-6" style={{ color: body }}>
            SYSmoAI does not publish one-size-fits-all package promises. We first understand the process, systems, access, risk, dependencies, and desired outcome. A written scope then defines deliverables, timeline, price, and acceptance criteria.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {capabilities.map((item) => (
              <motion.article key={item.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl p-7" style={{ background: bg1, border: `1px solid ${border}` }}>
                <item.icon size={24} className="text-blue-500 mb-5" />
                <h2 className="text-xl font-bold mb-2" style={{ color: heading }}>{item.title}</h2>
                <p className="leading-relaxed" style={{ color: body }}>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: heading }}>How an engagement is defined</h2>
              <p className="leading-relaxed" style={{ color: body }}>
                The proposal is the commercial source of truth. It records the exact deliverables, exclusions, dependencies, milestones, timeline, payment terms, acceptance method, and support period for that engagement.
              </p>
            </div>
            <div className="space-y-3">
              {['Current workflow and problem', 'Systems and access required', 'Deliverables and exclusions', 'Timeline and dependencies', 'Commercial terms', 'Acceptance and handoff'].map((item, index) => (
                <div key={item} className="flex items-center gap-4 p-4 rounded-xl" style={{ border: `1px solid ${border}` }}>
                  <span className="text-sm font-bold text-blue-500">0{index + 1}</span>
                  <span style={{ color: body }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>Have a workflow worth evaluating?</h2>
          <p className="mt-3" style={{ color: body }}>Describe the current process and desired outcome. We will determine whether a scoped implementation is appropriate.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors">
            Discuss the workflow <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
