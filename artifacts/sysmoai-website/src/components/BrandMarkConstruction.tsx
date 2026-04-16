import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// Official brand paths — viewBox 0 0 100 100
const L1 = 'M25 34 L50 24 L75 34 L75 54 L50 64 L25 54 Z';
const L2 = 'M30 49 L50 40 L70 49 L70 64 L50 73 L30 64 Z';
const L3 = 'M40 61 L50 56 L60 61 L60 71 L50 76 L40 71 Z';

// Geometry annotation data
const specs = [
  { key: 'ViewBox',            val: '100 × 100' },
  { key: 'Optical center',     val: '(50, 50)'  },
  { key: 'Layer scale ratio',  val: '0.78×'     },
  { key: 'Stroke weight',      val: '2px (scales)' },
  { key: 'Stroke join',        val: 'Round'     },
  { key: 'Layer count',        val: '3'         },
];

const layers = [
  {
    name: 'Layer 1 — Infrastructure',
    spec: '50u wide',
    color: '#2563EB',
    desc: 'Your tools, data, and workflows — organized, connected, and ready to scale.',
  },
  {
    name: 'Layer 2 — Orchestration',
    spec: '40u wide',
    color: '#3B82F6',
    desc: 'AI models, automation flows, and decision logic — coordinated with surgical precision.',
  },
  {
    name: 'Layer 3 — Intelligence',
    spec: '20u wide',
    color: '#60A5FA',
    desc: 'The 24/7 AI engine that runs your business while you sleep.',
  },
];

// Stagger container
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const fadeRow = {
  hidden: { opacity: 0, x: 20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

/* ─────────────────────────────────────────────────────────────────────────
   AnimatedMark — draws the 3 hexagon layers one by one, with grid & labels
───────────────────────────────────────────────────────────────────────── */
function AnimatedMark({ trigger }: { trigger: boolean }) {
  const ctrl = useAnimation();

  useEffect(() => {
    if (!trigger) return;
    ctrl.start('show');
  }, [trigger, ctrl]);

  // Each path is drawn via pathLength 0→1
  const pathVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show:   { pathLength: 1, opacity: 1, transition: { pathLength: { delay, duration: 0.7, ease: 'easeInOut' as const }, opacity: { delay, duration: 0.25 } } },
  });

  // Fill opacity fades in after stroke is drawn
  const fillVariants = (delay: number) => ({
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { delay: delay + 0.4, duration: 0.55 } },
  });

  // Grid lines
  const lineVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show:   { pathLength: 1, opacity: 1, transition: { pathLength: { delay, duration: 0.55, ease: 'easeOut' as const }, opacity: { delay, duration: 0.15 } } },
  });

  // Annotation text
  const textVariants = (delay: number) => ({
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { delay, duration: 0.5 } },
  });

  // Label bubble
  const labelVariants = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.85 },
    show:   { opacity: 1, scale: 1, transition: { delay, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] } },
  });

  return (
    <motion.svg viewBox="-20 10 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" animate={ctrl}>
      {/* ── Grid crosshairs ── */}
      {/* Vertical */}
      <motion.path d="M50 10 L50 100" stroke="#2563EB" strokeOpacity={0.2} strokeWidth={0.4} strokeDasharray="2 3"
        variants={lineVariants(0)} initial="hidden" animate={ctrl} />
      {/* Horizontal */}
      <motion.path d="M5 49 L95 49" stroke="#2563EB" strokeOpacity={0.2} strokeWidth={0.4} strokeDasharray="2 3"
        variants={lineVariants(0.08)} initial="hidden" animate={ctrl} />
      {/* Bounding box */}
      <motion.path d="M22 22 L78 22 L78 78 L22 78 Z" stroke="#3B82F6" strokeOpacity={0.12} strokeWidth={0.35} strokeDasharray="1.5 3"
        variants={lineVariants(0.15)} initial="hidden" animate={ctrl} />

      {/* ── Width annotation (56u) ── */}
      {/* Bracket lines */}
      <motion.path d="M25 18 L75 18" stroke="#60A5FA" strokeOpacity={0.55} strokeWidth={0.6}
        variants={lineVariants(0.25)} initial="hidden" animate={ctrl} />
      <motion.path d="M25 15 L25 21" stroke="#60A5FA" strokeOpacity={0.55} strokeWidth={0.6}
        variants={lineVariants(0.25)} initial="hidden" animate={ctrl} />
      <motion.path d="M75 15 L75 21" stroke="#60A5FA" strokeOpacity={0.55} strokeWidth={0.6}
        variants={lineVariants(0.25)} initial="hidden" animate={ctrl} />
      <motion.text x="50" y="14" textAnchor="middle" fontSize="4" fill="#60A5FA" fillOpacity={0.7}
        fontFamily="'Inter', monospace" fontWeight={500}
        variants={textVariants(0.35)} initial="hidden" animate={ctrl}>
        56u
      </motion.text>

      {/* ── Center dot ── */}
      <motion.circle cx={50} cy={49} r={1.2} fill="#60A5FA" fillOpacity={0.6}
        variants={fillVariants(0.2)} initial="hidden" animate={ctrl} />

      {/* ── LAYER 1 fill ── */}
      <motion.path d={L1} fill="#1E3A8A" fillOpacity={0.30}
        variants={fillVariants(0.35)} initial="hidden" animate={ctrl} />
      {/* ── LAYER 1 stroke (drawn) ── */}
      <motion.path d={L1} fill="none" stroke="#2563EB" strokeOpacity={0.75} strokeWidth={1.8} strokeLinejoin="round"
        variants={pathVariants(0.4)} initial="hidden" animate={ctrl} />

      {/* ── LAYER 2 fill ── */}
      <motion.path d={L2} fill="#2563EB" fillOpacity={0.45}
        variants={fillVariants(0.65)} initial="hidden" animate={ctrl} />
      {/* ── LAYER 2 stroke (drawn) ── */}
      <motion.path d={L2} fill="none" stroke="#3B82F6" strokeOpacity={0.90} strokeWidth={1.8} strokeLinejoin="round"
        variants={pathVariants(0.72)} initial="hidden" animate={ctrl} />

      {/* ── LAYER 3 fill ── */}
      <motion.path d={L3} fill="#3B82F6" fillOpacity={1}
        variants={fillVariants(1.0)} initial="hidden" animate={ctrl} />
      {/* ── LAYER 3 stroke (drawn) + glow ── */}
      <motion.path d={L3} fill="none" stroke="#60A5FA" strokeOpacity={1} strokeWidth={1.8} strokeLinejoin="round"
        variants={pathVariants(1.06)} initial="hidden" animate={ctrl}
        filter="url(#core-glow)" />

      {/* ── Glow filter for core layer ── */}
      <defs>
        <filter id="core-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── "optically centered" annotation ── */}
      <motion.text x="50" y="105" textAnchor="middle" fontSize="3.8" fill="#60A5FA" fillOpacity={0.5}
        fontFamily="'Inter', monospace"
        variants={textVariants(1.3)} initial="hidden" animate={ctrl}>
        optically centered
      </motion.text>

      {/* ── Layer labels (right side, floating) ── */}
      {/* L1 label */}
      <motion.rect x="78" y="30" width="30" height="8.5" rx="2" fill="#1E3A8A" fillOpacity={0.7}
        variants={labelVariants(1.05)} initial="hidden" animate={ctrl} />
      <motion.text x="93" y="35.5" textAnchor="middle" fontSize="3.5" fill="#93C5FD"
        fontFamily="'Inter', monospace" fontWeight={500}
        variants={textVariants(1.1)} initial="hidden" animate={ctrl}>
        Infrastructure
      </motion.text>

      {/* L2 label */}
      <motion.rect x="78" y="50" width="30" height="8.5" rx="2" fill="#1E40AF" fillOpacity={0.7}
        variants={labelVariants(1.2)} initial="hidden" animate={ctrl} />
      <motion.text x="93" y="55.5" textAnchor="middle" fontSize="3.5" fill="#BFDBFE"
        fontFamily="'Inter', monospace" fontWeight={500}
        variants={textVariants(1.25)} initial="hidden" animate={ctrl}>
        Orchestration
      </motion.text>

      {/* L3 label */}
      <motion.rect x="78" y="62" width="30" height="8.5" rx="2" fill="#2563EB" fillOpacity={0.85}
        variants={labelVariants(1.35)} initial="hidden" animate={ctrl} />
      <motion.text x="93" y="67.5" textAnchor="middle" fontSize="3.5" fill="#FFFFFF"
        fontFamily="'Inter', monospace" fontWeight={600}
        variants={textVariants(1.4)} initial="hidden" animate={ctrl}>
        Intelligence
      </motion.text>

      {/* Connector lines from labels to layers */}
      <motion.path d="M78 34.5 L76 39" stroke="#2563EB" strokeOpacity={0.35} strokeWidth={0.4}
        variants={lineVariants(1.15)} initial="hidden" animate={ctrl} />
      <motion.path d="M78 54.5 L72 52" stroke="#3B82F6" strokeOpacity={0.35} strokeWidth={0.4}
        variants={lineVariants(1.3)} initial="hidden" animate={ctrl} />
      <motion.path d="M78 66.5 L61 64" stroke="#60A5FA" strokeOpacity={0.45} strokeWidth={0.4}
        variants={lineVariants(1.45)} initial="hidden" animate={ctrl} />
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Animated number / counter for spec values
───────────────────────────────────────────────────────────────────────── */
function AnimCounter({ val, trigger, delay }: { val: string; trigger: boolean; delay: number }) {
  const [display, setDisplay] = useState('—');

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setDisplay(val), delay * 1000);
    return () => clearTimeout(t);
  }, [trigger, val, delay]);

  return <span>{display}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export function BrandMarkConstruction() {
  const { isDark } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const bg          = isDark ? '#07090F' : '#F0F4FF';
  const borderC     = isDark ? 'rgba(37,99,235,0.10)' : 'rgba(37,99,235,0.12)';
  const headingC    = isDark ? '#F1F5F9' : '#0A0B0F';
  const subC        = isDark ? '#64748B'  : '#64748B';
  const cardBg      = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(37,99,235,0.04)';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.10)';
  const specKeyC    = isDark ? '#475569'  : '#64748B';
  const specValC    = isDark ? '#E2E8F0'  : '#0A0B0F';
  const dividerC    = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.08)';
  const markPanelBg = isDark ? '#080C16'  : '#FFFFFF';

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: bg, borderTop: `1px solid ${borderC}`, borderBottom: `1px solid ${borderC}` }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={container}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p variants={fadeUp}
            className="text-xs font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: '#2563EB' }}
          >
            Brand Identity · Systems in Motion
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-5"
            style={{ color: headingC, letterSpacing: '-0.03em' }}
          >
            Engineered Down to the Geometry
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

        {/* ── Main 2-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 xl:gap-12 items-start">

          {/* ── LEFT: animated SVG construction panel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl relative overflow-hidden"
            style={{ background: markPanelBg, border: `1px solid ${cardBorder}`, aspectRatio: '1/0.85' }}
          >
            {/* Panel label */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: '#2563EB' }}>
                03
              </span>
              <span className="text-xs uppercase tracking-[0.12em]" style={{ color: isDark ? '#334155' : '#94A3B8' }}>
                Construction
              </span>
            </div>

            {/* Grid reference text */}
            <div
              className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between"
              style={{ color: isDark ? '#1E293B' : '#CBD5E1' }}
            >
              <span className="text-xs font-mono">viewBox 100×100</span>
              <span className="text-xs font-mono">0.78× scale</span>
            </div>

            {/* Animated mark SVG — takes all the space */}
            <div className="absolute inset-0 flex items-center justify-center p-10 pt-12">
              <AnimatedMark trigger={inView} />
            </div>
          </motion.div>

          {/* ── RIGHT: specs + layer info ── */}
          <div className="flex flex-col gap-6">

            {/* GEOMETRY table */}
            <motion.div
              className="rounded-2xl p-6"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                Geometry
              </p>
              <div className="space-y-0">
                {specs.map((s, i) => (
                  <motion.div
                    key={s.key}
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: i < specs.length - 1 ? `1px solid ${dividerC}` : 'none' }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.45 }}
                  >
                    <span className="text-sm" style={{ color: specKeyC }}>{s.key}</span>
                    <span className="text-sm font-mono font-semibold" style={{ color: specValC }}>
                      <AnimCounter val={s.val} trigger={inView} delay={0.6 + i * 0.12} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* LAYERS */}
            <motion.div
              className="rounded-2xl p-6"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: isDark ? '#475569' : '#94A3B8' }}>
                Layers
              </p>
              <div className="space-y-4">
                {layers.map((l, i) => (
                  <motion.div
                    key={l.name}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.1 + i * 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold" style={{ color: isDark ? '#E2E8F0' : '#0A0B0F' }}>{l.name}</span>
                        <span className="text-xs font-mono flex-shrink-0" style={{ color: isDark ? '#475569' : '#94A3B8' }}>{l.spec}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: isDark ? '#64748B' : '#6B7280' }}>{l.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Clear Space rule */}
            <motion.div
              className="rounded-2xl p-5"
              style={{ background: isDark ? 'rgba(37,99,235,0.06)' : 'rgba(37,99,235,0.05)', border: `1px solid ${isDark ? 'rgba(37,99,235,0.18)' : 'rgba(37,99,235,0.14)'}` }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.65, duration: 0.5 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#2563EB' }}>Clear Space</p>
              <p className="text-xs leading-relaxed" style={{ color: isDark ? '#64748B' : '#6B7280' }}>
                Minimum clear space equals <strong style={{ color: isDark ? '#93C5FD' : '#2563EB' }}>1.5×</strong> the height of the core layer (Layer 3) on all sides.
                No text, graphics, or other elements may enter this protected zone.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom brand statement ── */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-flex flex-col items-center gap-5 px-10 py-8 rounded-3xl max-w-2xl"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
          >
            {/* Wordmark display */}
            <div className="flex items-center gap-3">
              <svg width={40} height={40} viewBox="0 0 100 100" fill="none">
                <path d={L1} fill="#1E3A8A" fillOpacity={.30} stroke="#2563EB" strokeOpacity={.60} strokeWidth={2.5} strokeLinejoin="round"/>
                <path d={L2} fill="#2563EB" fillOpacity={.50} stroke="#3B82F6" strokeOpacity={.80} strokeWidth={2.5} strokeLinejoin="round"/>
                <path d={L3} fill="#3B82F6" fillOpacity={1}   stroke="#60A5FA" strokeOpacity={1}   strokeWidth={2.5} strokeLinejoin="round"/>
              </svg>
              <span
                style={{
                  fontSize: 28, fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
                  fontFeatureSettings: '"kern" 1, "liga" 1', color: headingC,
                  display: 'inline-flex', alignItems: 'baseline', letterSpacing: '-0.02em',
                }}
              >
                <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>SYS</span>
                <span style={{ fontWeight: 400, letterSpacing: '-0.04em', opacity: 0.65 }}>mo</span>
                <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: subC, fontStyle: 'italic' }}
            >
              "Three layers. One mission — to put an AI-powered operating system
              at the heart of every ambitious business in Bangladesh and beyond."
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#2563EB' }}>
              Emon Hossain · Founder & CEO, SYSmoAI
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
