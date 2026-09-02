import { Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';

const capabilities = [
  {
    title: 'Workflow diagnosis',
    description: 'Map the current process, identify bottlenecks, and decide where automation or AI is actually appropriate.',
  },
  {
    title: 'Automation implementation',
    description: 'Connect tools and operational steps into maintainable workflows with explicit handoff and ownership.',
  },
  {
    title: 'AI-assisted operations',
    description: 'Use AI where judgment, drafting, classification, extraction, or structured assistance can improve a real workflow.',
  },
  {
    title: 'Internal operating systems',
    description: 'Design practical workspaces, dashboards, SOPs, and process visibility for teams that need less operational chaos.',
  },
];

const principles = [
  'Scope before promise — price, timeline, and acceptance criteria are confirmed only after the work is understood.',
  'Proof before claim — numerical outcomes are published only when evidence and public-use approval exist.',
  'Client control — implementations should be understandable, documented, and owned through the agreed project setup.',
];

export default function Home() {
  const { isDark } = useTheme();
  const bg = isDark ? '#0A0B0F' : '#FFFFFF';
  const surface = isDark ? '#0D0F14' : '#F8FAFC';
  const heading = isDark ? '#F8FAFC' : '#0F172A';
  const body = isDark ? '#94A3B8' : '#475569';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';

  return (
    <div style={{ background: bg }}>
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">SYSmoAI · Bangladesh</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl" style={{ color: heading }}>
            AI systems and automation for real operations.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mt-7" style={{ color: body }}>
            SYSmoAI is a Bangladesh-based implementation practice focused on practical workflow design, automation, and AI-assisted systems. We start with the actual operating problem, define the scope, and build only what can be tested and handed over responsibly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Link href="/services" className="inline-flex justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 font-semibold transition-colors">
              Explore capabilities
            </Link>
            <Link href="/contact" className="inline-flex justify-center rounded-xl px-6 py-3.5 font-semibold transition-colors" style={{ color: heading, border: `1px solid ${border}` }}>
              Discuss a project
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: surface }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-blue-500 mb-2">CAPABILITIES</p>
            <h2 className="text-3xl font-bold" style={{ color: heading }}>What we work on</h2>
            <p className="mt-3" style={{ color: body }}>These are capability areas, not pre-priced packages. The appropriate scope depends on the workflow, systems, access, risk, and acceptance criteria.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {capabilities.map((item) => (
              <article key={item.title} className="rounded-2xl p-6" style={{ background: bg, border: `1px solid ${border}` }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: heading }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: body }}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-semibold text-blue-500 mb-2">WORKING MODEL</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: heading }}>Scope first. Then build.</h2>
            <p className="leading-relaxed" style={{ color: body }}>
              A qualified engagement begins with the current process and desired outcome. The written scope then defines deliverables, dependencies, timeline, commercial terms, and an acceptance method before implementation begins.
            </p>
          </div>
          <div className="space-y-4">
            {principles.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-xl p-5" style={{ border: `1px solid ${border}` }}>
                <span className="font-bold text-blue-500">0{index + 1}</span>
                <p style={{ color: body }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: surface }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: heading }}>Need to evaluate a workflow?</h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ color: body }}>
            Send the current process, tools involved, and the outcome you want. We will use that information to decide whether a scoped SYSmoAI engagement is appropriate.
          </p>
          <Link href="/contact" className="inline-flex mt-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 font-semibold transition-colors">
            Contact SYSmoAI
          </Link>
        </div>
      </section>
    </div>
  );
}
