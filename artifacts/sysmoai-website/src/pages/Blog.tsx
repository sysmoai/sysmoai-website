import React from 'react';
import { Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';

export default function Blog() {
  const { isDark } = useTheme();
  const bg = isDark ? '#0A0B0F' : '#FFFFFF';
  const surface = isDark ? '#0D0F14' : '#F8FAFC';
  const heading = isDark ? '#F8FAFC' : '#0F172A';
  const body = isDark ? '#94A3B8' : '#475569';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';

  React.useEffect(() => { document.title = 'SYSmoAI Insights | Editorial Review'; }, []);

  return (
    <div style={{ background: bg }}>
      <section className="py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">SYSmoAI insights</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: heading }}>Evidence-first publishing.</h1>
          <p className="text-lg leading-relaxed max-w-3xl mt-6" style={{ color: body }}>
            The SYSmoAI article library is under editorial review. Historical posts are temporarily unavailable while numerical claims, examples, sources, dates, commercial references, and case-study language are checked against the current evidence standard.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: surface }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-7 md:p-9" style={{ background: bg, border: `1px solid ${border}` }}>
            <h2 className="text-2xl font-bold" style={{ color: heading }}>Publication rule</h2>
            <p className="mt-4 leading-relaxed" style={{ color: body }}>
              New or restored articles should distinguish sourced facts, demonstrations, illustrative examples, opinion, and verified case evidence. A composite or hypothetical scenario must be labelled as such and must not be presented as a measured client outcome.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: body }}>
              Pricing, timelines, guarantees, performance metrics, rankings, market-size figures, security claims, and client outcomes require current evidence or an appropriate source before publication.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/about" className="inline-flex justify-center rounded-xl px-6 py-3.5 font-semibold" style={{ color: heading, border: `1px solid ${border}` }}>
              About SYSmoAI
            </Link>
            <Link href="/contact" className="inline-flex justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 font-semibold transition-colors">
              Discuss a workflow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
