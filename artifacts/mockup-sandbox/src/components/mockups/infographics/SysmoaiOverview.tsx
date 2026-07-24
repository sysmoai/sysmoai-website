import {
  Activity,
  Award,
  Bot,
  Briefcase,
  CheckCircle2,
  Compass,
  Cog,
  Globe2,
  GraduationCap,
  Layers,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

const credibility = [
  { icon: Award, value: "Top 5%", label: "Prompt Engineers Globally" },
  { icon: Briefcase, value: "500+", label: "Projects Delivered" },
  { icon: Layers, value: "8+", label: "Client Categories Served" },
  { icon: Activity, value: "3+ yrs", label: "Building AI Systems" },
];

const process = [
  {
    n: "01",
    title: "Diagnose",
    when: "Day 1",
    desc: "Free 30-min discovery call. We map your biggest workflow problem and identify the highest-ROI fix.",
    icon: Compass,
  },
  {
    n: "02",
    title: "Design",
    when: "Day 2",
    desc: "We design your custom AI system — right tools, automations, and agents for your specific situation.",
    icon: Cog,
  },
  {
    n: "03",
    title: "Build",
    when: "Day 3",
    desc: "We build and deploy it. You just review and approve. No code. No complexity.",
    icon: Rocket,
  },
  {
    n: "04",
    title: "Scale",
    when: "Day 4–90",
    desc: "We train your team and optimise for 3 months — your system grows with your business.",
    icon: TrendingUp,
  },
];

const services = [
  { icon: Zap, name: "AI Quick Win", price: "৳3.7k–7.5k", note: "#1 problem automated in 3 days" },
  { icon: Rocket, name: "Implementation Sprint", price: "৳25k–50k", note: "Full AI stack in 14 days" },
  { icon: Cog, name: "AI Operations Retainer", price: "৳20k/mo", note: "Ongoing AI management" },
  { icon: Bot, name: "AI Agent Development", price: "৳50k–2L", note: "Custom AI agents, 24/7" },
  { icon: Workflow, name: "n8n Automation", price: "৳2k–10k", note: "Per-workflow automation" },
  { icon: Layers, name: "Notion OS Build", price: "৳15k–50k", note: "Your business in one place" },
  { icon: Users, name: "Group AI Workshop", price: "৳500/person", note: "Team upskilling, half-day" },
  { icon: GraduationCap, name: "1:1 AI Coaching", price: "৳2.5k/session", note: "60-min personalized" },
  { icon: Globe2, name: "International Services", price: "USD pricing", note: "Global delivery" },
];

const wedge = [
  "500+ DMs a day, replying to ~100",
  "Order tracking is a mess (notebooks, screenshots)",
  "bKash confirmation takes 30 minutes",
  "Zero repeat customers — no follow-ups",
];

const results = [
  { tag: "F-Commerce", value: "400+", unit: "DMs/day automated", icon: MessageSquare },
  { tag: "Digital Agency", value: "15", unit: "hrs/week saved", icon: Activity },
  { tag: "Coaching Business", value: "20", unit: "hrs/week freed", icon: Users },
  { tag: "Senior Freelancer", value: "3×", unit: "Revenue tripled", icon: TrendingUp },
  { tag: "Creative Agency", value: "4h → 15m", unit: "Proposals time", icon: Zap },
];

const whyUs = [
  {
    icon: Rocket,
    title: "We Build, Not Consult",
    desc: "A working, deployed AI system — not a strategy document or slide deck.",
  },
  {
    icon: Target,
    title: "Results First",
    desc: "Every project is scoped with a written acceptance test agreed before work starts.",
  },
  {
    icon: ShieldCheck,
    title: "Your System, Your Control",
    desc: "Your team runs it independently after day 1. No dependency on us.",
  },
  {
    icon: Globe2,
    title: "Bangladesh-Rooted, Global Standard",
    desc: "bKash, Nagad, F-commerce, WhatsApp-first — delivered to a global quality benchmark.",
  },
];

export function SysmoaiOverview() {
  return (
    <div className="w-[1200px] min-h-screen bg-slate-950 p-12 font-sans text-slate-100">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 mb-10">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative flex items-start justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Systems in Motion
            </div>
            <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight">
              SYSmoAI — Your Business,
              <br /> Powered by AI Systems.
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/85">
              From 3-day Quick Wins to full AI Operating Systems — built, deployed, and owned by you.
            </p>
          </div>
          <div className="hidden shrink-0 rounded-2xl bg-white/10 p-5 text-right backdrop-blur md:block">
            <div className="text-xs uppercase tracking-widest text-white/70">Founder</div>
            <div className="mt-1 text-xl font-bold">Emon Hossain</div>
            <div className="text-sm text-white/80">AI Systems Consultancy</div>
            <div className="mt-2 text-xs text-white/70">Bangladesh · Global Delivery</div>
          </div>
        </div>

        {/* Credibility row */}
        <div className="relative mt-8 grid grid-cols-4 gap-4">
          {credibility.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/15"
            >
              <Icon className="h-5 w-5 text-cyan-200" />
              <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
              <div className="text-xs text-white/80">{label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Process */}
      <section className="mb-10">
        <SectionHeader
          eyebrow="How We Work"
          title="A 4-Step System, Live in Days — Not Months"
        />
        <div className="grid grid-cols-4 gap-4">
          {process.map((p, i) => (
            <div
              key={p.n}
              className="relative rounded-2xl bg-slate-900 border border-slate-800 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-violet-400">{p.n}</span>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                  {p.when}
                </span>
              </div>
              <p.icon className="mt-3 h-6 w-6 text-fuchsia-400" />
              <div className="mt-2 text-lg font-bold text-white">{p.title}</div>
              <p className="mt-1 text-sm leading-snug text-slate-400">{p.desc}</p>
              {i < process.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-violet-500 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mb-10">
        <SectionHeader
          eyebrow="What We Build"
          title="From Quick Wins to Full AI Operating Systems"
        />
        <div className="grid grid-cols-3 gap-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="rounded-xl bg-slate-900 border border-slate-800 p-4 flex items-start gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-violet-500/30">
                <s.icon className="h-5 w-5 text-violet-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-white truncate">{s.name}</div>
                </div>
                <div className="text-xs text-slate-400">{s.note}</div>
                <div className="mt-1 text-sm font-bold text-cyan-300">{s.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wedge + Why Us */}
      <section className="mb-10 grid grid-cols-5 gap-6">
        <div className="col-span-2 rounded-2xl bg-gradient-to-br from-rose-600/20 to-orange-500/10 border border-rose-500/30 p-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-200">
            <Target className="h-3.5 w-3.5" /> The F-Commerce Wedge
          </div>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white">
            500 DMs a Day. 1 Person.
            <br /> Manual Chaos.
          </h3>
          <p className="mt-1 text-sm text-rose-100/80">
            We replace the chaos with auto-replies, automated order management, and customer
            re-engagement systems.
          </p>
          <ul className="mt-4 space-y-2">
            {wedge.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-violet-200">
            <ShieldCheck className="h-3.5 w-3.5" /> Why Teams Choose SYSmoAI
          </div>
          <div className="grid grid-cols-2 gap-3">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="rounded-xl bg-slate-900 border border-slate-800 p-4"
              >
                <w.icon className="h-5 w-5 text-cyan-300" />
                <div className="mt-2 font-bold text-white">{w.title}</div>
                <p className="mt-1 text-xs leading-snug text-slate-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mb-8">
        <SectionHeader eyebrow="Proof in the Pudding" title="Real Outcomes, Real Clients" />
        <div className="grid grid-cols-5 gap-3">
          {results.map((r) => (
            <div
              key={r.tag}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-4 text-center"
            >
              <r.icon className="mx-auto h-5 w-5 text-emerald-400" />
              <div className="mt-2 text-3xl font-black text-white">{r.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">
                {r.unit}
              </div>
              <div className="mt-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                {r.tag}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insight */}
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600/15 via-fuchsia-600/10 to-indigo-600/15 p-5 mb-6">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-5 w-5 text-fuchsia-300" />
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">
              Key Insight
            </div>
            <p className="mt-1 text-base text-white">
              SYSmoAI delivers <span className="font-bold text-cyan-300">deployed AI systems</span>{" "}
              — not slide decks — starting with a 3-day Quick Win you own from day one.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
        <span>Source: sysmoai.com — Services, Process, Proof, About</span>
        <span className="inline-flex items-center gap-1">
          <Globe2 className="h-3.5 w-3.5" /> sysmoai.com · Systems in Motion
        </span>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white">{title}</h2>
      </div>
      <div className="h-px flex-1 ml-6 bg-gradient-to-r from-violet-500/40 to-transparent" />
    </div>
  );
}
