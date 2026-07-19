import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Official brand paths — viewBox 0 0 100 100, optically centered at (50,50)
const L1 = 'M25 34 L50 24 L75 34 L75 54 L50 64 L25 54 Z';
const L2 = 'M30 49 L50 40 L70 49 L70 64 L50 73 L30 64 Z';
const L3 = 'M40 61 L50 56 L60 61 L60 71 L50 76 L40 71 Z';

// The three layers — each maps to a real SYSmoAI service value
const LAYERS = [
  {
    id: 1,
    name: 'Infrastructure',
    spec: 'Layer 1 · 50u wide',
    color: '#2563EB',
    dimColor: '#1E3A8A',
    tagColor: '#BFDBFE',
    headline: 'Your foundation, rebuilt.',
    body: 'We audit your tools, untangle your data, and build a single source of truth — so every part of your business is organized, connected, and scalable from day one.',
    service: 'AI Quick Win · Notion OS',
  },
  {
    id: 2,
    name: 'Orchestration',
    spec: 'Layer 2 · 40u wide',
    color: '#3B82F6',
    dimColor: '#1E40AF',
    tagColor: '#DBEAFE',
    headline: 'Workflows that run themselves.',
    body: 'We design and deploy the automation flows that connect your tools, trigger your processes, and eliminate the manual work stealing 20+ hours a week from your team.',
    service: 'n8n Automation · AI Sprint',
  },
  {
    id: 3,
    name: 'Intelligence',
    spec: 'Layer 3 · 20u wide · core',
    color: '#60A5FA',
    dimColor: '#2563EB',
    tagColor: '#EFF6FF',
    headline: 'AI that works while you sleep.',
    body: 'Custom AI agents that answer leads, follow up on deals, generate reports, and make decisions — trained on your business, running 24/7, and built to compound over time.',
    service: 'AI Agent Dev · AI Retainer',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Large animated construction SVG — draws layers one by one
   activeLayer: 0 = all visible, 1/2/3 = that layer glows
───────────────────────────────────────────────────────────────────────── */
function ConstructionMark({
  trigger,
  activeLayer,
}: {
  trigger: boolean;
  activeLayer: number;
}) {
  const ctrl = useAnimation();

  useEffect(() => {
    if (trigger) ctrl.start('show');
  }, [trigger, ctrl]);

  const pathDraw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 0.75, ease: 'easeInOut' as const },
        opacity: { delay, duration: 0.2 },
      },
    },
  });

  const fillFade = (delay: number) => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay: delay + 0.45, duration: 0.6 } },
  });

  const lineDraw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 0.5, ease: 'easeOut' as const },
        opacity: { delay, duration: 0.15 },
      },
    },
  });

  const textIn = (delay: number) => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay, duration: 0.5 } },
  });

  // Dynamic glow intensity per layer based on active state
  const l1Glow = activeLayer === 1 ? 0.65 : activeLayer === 0 ? 0.28 : 0.08;
  const l2Glow = activeLayer === 2 ? 0.75 : activeLayer === 0 ? 0.35 : 0.08;
  const l3Glow = activeLayer === 3 ? 1.0  : activeLayer === 0 ? 0.55 : 0.08;
  const l1Fill = activeLayer === 1 ? 0.45 : activeLayer === 0 ? 0.28 : 0.06;
  const l2Fill = activeLayer === 2 ? 0.65 : activeLayer === 0 ? 0.42 : 0.06;
  const l3Fill = activeLayer === 3 ? 1.0  : activeLayer === 0 ? 0.95 : 0.15;

  return (
    <motion.svg
      viewBox="-5 12 110 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      animate={ctrl}
    >
      <defs>
        <filter id="bmc-glow-l1" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="bmc-glow-l3" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Construction grid ── */}
      <motion.path d="M50 13 L50 97" stroke="#3B82F6" strokeOpacity={0.15} strokeWidth={0.35} strokeDasharray="1.5 3"
        variants={lineDraw(0)} initial="hidden" animate={ctrl} />
      <motion.path d="M5 49 L95 49" stroke="#3B82F6" strokeOpacity={0.15} strokeWidth={0.35} strokeDasharray="1.5 3"
        variants={lineDraw(0.06)} initial="hidden" animate={ctrl} />
      <motion.path d="M22 22 L78 22 L78 78 L22 78 Z" stroke="#2563EB" strokeOpacity={0.10} strokeWidth={0.3} strokeDasharray="1 2.5"
        variants={lineDraw(0.12)} initial="hidden" animate={ctrl} />

      {/* ── 56u width annotation ── */}
      <motion.path d="M25 17.5 L75 17.5" stroke="#60A5FA" strokeOpacity={0.45} strokeWidth={0.5}
        variants={lineDraw(0.22)} initial="hidden" animate={ctrl} />
      <motion.path d="M25 15 L25 20" stroke="#60A5FA" strokeOpacity={0.45} strokeWidth={0.5}
        variants={lineDraw(0.22)} initial="hidden" animate={ctrl} />
      <motion.path d="M75 15 L75 20" stroke="#60A5FA" strokeOpacity={0.45} strokeWidth={0.5}
        variants={lineDraw(0.22)} initial="hidden" animate={ctrl} />
      <motion.text x="50" y="14" textAnchor="middle" fontSize="3.8" fill="#60A5FA" fillOpacity={0.55}
        fontFamily="monospace" variants={textIn(0.32)} initial="hidden" animate={ctrl}>
        56u
      </motion.text>

      {/* Center point */}
      <motion.circle cx={50} cy={49} r={1.0} fill="#60A5FA" fillOpacity={0.45}
        variants={fillFade(0.18)} initial="hidden" animate={ctrl} />

      {/* ── LAYER 1 — Infrastructure ── */}
      <motion.path d={L1} fill="#1E3A8A" fillOpacity={l1Fill}
        variants={fillFade(0.38)} initial="hidden" animate={ctrl}
        style={{ transition: 'fill-opacity 0.5s ease' }}
        filter={activeLayer === 1 ? 'url(#bmc-glow-l1)' : undefined}
      />
      <motion.path d={L1} fill="none" stroke="#2563EB" strokeOpacity={l1Glow} strokeWidth={1.6} strokeLinejoin="round"
        variants={pathDraw(0.42)} initial="hidden" animate={ctrl}
        style={{ transition: 'stroke-opacity 0.5s ease' }}
      />

      {/* ── LAYER 2 — Orchestration ── */}
      <motion.path d={L2} fill="#2563EB" fillOpacity={l2Fill}
        variants={fillFade(0.68)} initial="hidden" animate={ctrl}
        style={{ transition: 'fill-opacity 0.5s ease' }}
      />
      <motion.path d={L2} fill="none" stroke="#3B82F6" strokeOpacity={l2Glow} strokeWidth={1.6} strokeLinejoin="round"
        variants={pathDraw(0.74)} initial="hidden" animate={ctrl}
        style={{ transition: 'stroke-opacity 0.5s ease' }}
      />

      {/* ── LAYER 3 — Intelligence (core, glowing) ── */}
      <motion.path d={L3} fill="#3B82F6" fillOpacity={l3Fill}
        variants={fillFade(1.0)} initial="hidden" animate={ctrl}
        style={{ transition: 'fill-opacity 0.5s ease' }}
        filter={activeLayer === 3 || activeLayer === 0 ? 'url(#bmc-glow-l3)' : undefined}
      />
      <motion.path d={L3} fill="none" stroke="#60A5FA" strokeOpacity={l3Glow} strokeWidth={1.6} strokeLinejoin="round"
        variants={pathDraw(1.06)} initial="hidden" animate={ctrl}
        style={{ transition: 'stroke-opacity 0.5s ease' }}
      />

      {/* "optically centered" */}
      <motion.text x="50" y="101" textAnchor="middle" fontSize="3.5" fill="#60A5FA" fillOpacity={0.38}
        fontFamily="monospace" variants={textIn(1.3)} initial="hidden" animate={ctrl}>
        optically centered
      </motion.text>
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export function BrandMarkConstruction() {
  const { isDark } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const [activeLayer, setActiveLayer] = useState(0);
  const [cycleStarted, setCycleStarted] = useState(false);

  // After initial draw, start cycling layers to hold attention
  useEffect(() => {
    if (!inView || cycleStarted) return;
    const t = setTimeout(() => {
      setCycleStarted(true);
      let step = 1;
      const interval = setInterval(() => {
        setActiveLayer(step);
        step = step < 3 ? step + 1 : 0;
      }, 2200);
      return () => clearInterval(interval);
    }, 2800); // wait for initial draw to complete
    return () => clearTimeout(t);
  }, [inView, cycleStarted]);

  const bg        = isDark ? '#06080E' : '#F0F5FF';
  const headingC  = isDark ? '#F1F5F9' : '#0A0B0F';
  const subC      = isDark ? '#64748B'  : '#64748B';
  const cardBg    = isDark ? 'rgba(255,255,255,0.033)' : 'rgba(255,255,255,0.9)';
  const cardBorder= isDark ? 'rgba(255,255,255,0.07)'  : 'rgba(37,99,235,0.12)';
  const markBg    = isDark ? '#080C18' : '#FFFFFF';
  const markBorder= isDark ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.12)';

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14 } },
  };

  // Active layer data
  const active = activeLayer > 0 ? LAYERS[activeLayer - 1] : null;

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{
        background: bg,
        borderTop:    `1px solid ${isDark ? 'rgba(37,99,235,0.10)' : 'rgba(37,99,235,0.10)'}`,
        borderBottom: `1px solid ${isDark ? 'rgba(37,99,235,0.10)' : 'rgba(37,99,235,0.10)'}`,
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)',
      }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp}
            className="text-xs font-bold uppercase tracking-[0.28em] mb-5"
            style={{ color: '#2563EB' }}
          >
            Brand Identity · Systems in Motion
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight"
            style={{ color: headingC, letterSpacing: '-0.03em' }}
          >
            Engineered Down<br className="sm:hidden" /> to the Geometry
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: subC }}
          >
            The SYSmoAI mark isn't just a logo — it's a declaration. Three hexagonal layers,
            mathematically proportioned and optically centered. Every dimension intentional.
            Every ratio deliberate.
          </motion.p>
        </motion.div>

        {/* ── MAIN: Mark + live layer callout ── */}
        <div className="flex flex-col items-center gap-10">

          {/* Mark panel */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: markBg,
              border: `1px solid ${markBorder}`,
              width: '100%',
              maxWidth: 480,
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top label */}
            <div className="absolute top-5 left-6 flex items-center gap-2 z-10">
              <span className="text-xs font-mono font-semibold" style={{ color: '#2563EB' }}>03</span>
              <span className="text-xs uppercase tracking-[0.12em]" style={{ color: isDark ? '#2D3A52' : '#94A3B8' }}>Construction</span>
            </div>

            {/* SVG mark */}
            <div style={{ padding: '52px 40px 44px', aspectRatio: '1 / 0.72' }}>
              <ConstructionMark trigger={inView} activeLayer={activeLayer} />
            </div>

            {/* Active layer indicator bar */}
            <div className="absolute bottom-0 left-0 right-0 flex">
              {LAYERS.map((l, i) => (
                <motion.div
                  key={l.id}
                  className="h-0.5 flex-1 cursor-pointer"
                  style={{ background: activeLayer === i + 1 ? l.color : 'transparent', transition: 'background 0.4s ease' }}
                  onClick={() => setActiveLayer(activeLayer === i + 1 ? 0 : i + 1)}
                />
              ))}
            </div>
          </motion.div>

          {/* Live layer callout — changes as layers cycle */}
          <div className="w-full" style={{ minHeight: 48 }}>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }} />
                  <p className="text-sm font-semibold" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                    {active.name}
                    <span className="ml-2 text-xs font-normal" style={{ color: active.color }}>
                      {active.spec}
                    </span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  {LAYERS.map((l) => (
                    <div key={l.id} className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Layer cards — the marketing payoff */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 1.5 } } }}
          >
            {LAYERS.map((l, i) => {
              const isActive = activeLayer === l.id;
              return (
                <motion.div
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } } }}
                  className="rounded-2xl p-6 cursor-pointer transition-all duration-500"
                  style={{
                    background:  isActive
                      ? (isDark ? `rgba(${l.id === 1 ? '37,99,235' : l.id === 2 ? '59,130,246' : '96,165,250'},0.12)` : l.tagColor + '55')
                      : cardBg,
                    border: `1px solid ${isActive ? l.color + '55' : cardBorder}`,
                    boxShadow: isActive ? `0 0 24px ${l.color}18` : 'none',
                  }}
                  onClick={() => setActiveLayer(isActive ? 0 : l.id)}
                >
                  {/* Layer badge */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: l.color, boxShadow: isActive ? `0 0 8px ${l.color}` : 'none', transition: 'box-shadow 0.4s' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: l.color }}>
                      {l.name}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2 leading-tight" style={{ color: headingC }}>
                    {l.headline}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: subC }}>
                    {l.body}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                    style={{ background: isDark ? `${l.color}18` : l.tagColor + '88', color: l.color }}>
                    {l.service}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Wordmark + CTA ── */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Lockup */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg width={36} height={36} viewBox="0 0 100 100" fill="none">
                <path d={L1} fill="#1E3A8A" fillOpacity={.30} stroke="#2563EB" strokeOpacity={.60} strokeWidth={2.5} strokeLinejoin="round"/>
                <path d={L2} fill="#2563EB" fillOpacity={.50} stroke="#3B82F6" strokeOpacity={.80} strokeWidth={2.5} strokeLinejoin="round"/>
                <path d={L3} fill="#3B82F6" fillOpacity={1}   stroke="#60A5FA" strokeOpacity={1}   strokeWidth={2.5} strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontSize: 26, display: 'inline-flex', alignItems: 'baseline',
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                fontFeatureSettings: '"kern" 1, "liga" 1', color: headingC, letterSpacing: '-0.02em',
              }}>
                <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
                <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
                <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.22em] mb-8" style={{ color: isDark ? '#2D3A52' : '#94A3B8' }}>
              Systems in Motion
            </p>

            {/* CTA */}
            <Link
              href="/free-ai-audit"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 group shadow-lg hover:shadow-blue-500/25"
            >
              Get your free AI system audit
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs mt-3" style={{ color: isDark ? '#334155' : '#94A3B8' }}>
              No commitment · 30-min strategy call · Reply within 2 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
