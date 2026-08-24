import React from 'react';
import { Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';

const principles = [
  {
    title: 'Build around the operation',
    description: 'Start with the real workflow and constraints rather than forcing a fashionable AI tool into the process.',
  },
  {
    title: 'Separate deterministic and AI work',
    description: 'Use rules and automation where reliability is required; use AI where interpretation or assistance adds value and can be reviewed appropriately.',
  },
  {
    title: 'Make claims evidence-based',
    description: 'Public outcomes, numerical results, rankings, and performance claims require a source and explicit approval before publication.',
  },
  {
    title: 'Design for handoff',
    description: 'Documentation, ownership, access, maintenance, and exception handling are part of the system — not an afterthought.',
  },
];

export default function About() {
  const { isDark } = useTheme();
  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFC';
  const heading = isDark ? '#F8FAFC' : '#0F172A';
  const body = isDark ? '#94A3B8' : '#475569';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';

  React.useEffect(() => {
    document.title = 'About SYSmoAI & Emon Hossain | AI Systems and Automation';
  }, []);

  return (
    <div style={{ background: bg1 }}>
      <section className="py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">About SYSmoAI</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl" style={{ color: heading }}>
            Practical systems first. AI where it earns its place.
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl mt-7" style={{ color: body }}>
            SYSmoAI is a Bangladesh-based AI systems and automation practice founded by Emon Hossain. It focuses on turning operational problems into scoped workflows, automations, and AI-assisted systems that can be tested, documented, and handed over responsibly.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div className="rounded-2xl p-7" style={{ background: bg1, border: `1px solid ${border}` }}>
            <p className="text-sm font-semibold text-blue-500 mb-2">FOUNDER</p>
            <h2 className="text-2xl font-bold" style={{ color: heading }}>Emon Hossain</h2>
            <p className="mt-2 font-medium" style={{ color: body }}>AI Systems Strategist & Automation Builder</p>
            <p className="mt-5 leading-relaxed" style={{ color: body }}>
              Emon's broader personal work spans applied AI systems, automation, operator workflows, and research/public-interest work around AI in Bangladesh. His canonical personal profile is maintained separately at emonhossain.pro.
            </p>
            <a href="https://emonhossain.pro" target="_blank" rel="noopener noreferrer" className="inline-flex mt-6 text-blue-500 font-semibold hover:underline">
              Visit Emon's personal site →
            </a>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: heading }}>Why SYSmoAI exists</h2>
            <p className="leading-relaxed mb-5" style={{ color: body }}>
              Many businesses do not need another AI subscription. They need clearer processes, better operational visibility, and selective automation. SYSmoAI is the commercial implementation lane for that kind of work.
            </p>
            <p className="leading-relaxed" style={{ color: body }}>
              The site deliberately avoids treating historical package copy or unsupported numerical outcomes as current truth. Each client engagement is defined through a written scope with its own deliverables, dependencies, timeline, commercial terms, and acceptance method.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10" style={{ color: heading }}>Operating principles</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((item) => (
              <article key={item.title} className="rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: heading }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: body }}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: bg2 }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>Want to discuss an implementation?</h2>
          <p className="mt-3" style={{ color: body }}>Start with the workflow and desired outcome. We will determine the appropriate scope before making a commercial commitment.</p>
          <Link href="/contact" className="inline-flex mt-7 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors">
            Contact SYSmoAI
          </Link>
        </div>
      </section>
    </div>
  );
}
