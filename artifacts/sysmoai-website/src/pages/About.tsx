import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const timeline = [
  { icon: '🧠', label: '01', title: 'The overwhelm begins', desc: 'Emon was a solo founder doing everything manually — orders, follow-ups, content, clients. Sound familiar?' },
  { icon: '😤', label: '02', title: 'Every tool failed alone', desc: 'He tried every productivity tool: Trello, Asana, spreadsheets, apps. They all failed without a system behind them.' },
  { icon: '⚡', label: '03', title: '3 years mastering AI', desc: 'He spent 3 years going deep on AI — ChatGPT, Claude, Notion, n8n, full automation stacks. Not tutorials. Real systems.' },
  { icon: '🏗️', label: '04', title: 'Built his own AI OS', desc: 'He built a complete AI Operating System for his own business. Everything connected. Automated. Measurable.' },
  { icon: '🚀', label: '05', title: 'Results followed', desc: 'Revenue grew. Time freed up. Other founders noticed. They asked: "Can you build this for us?"' },
  { icon: '🌍', label: '06', title: 'SYSmoAI is born', desc: 'SYSmoAI was founded to give every founder, freelancer, and team the same unfair advantage.' },
];

const principles = [
  { icon: '🔨', title: 'We Build, Not Consult', desc: 'You get a working system, not a slide deck or a 50-page strategy document.' },
  { icon: '✅', title: 'Results First', desc: "We don't get paid until it works. Your success is our success — literally." },
  { icon: '🎯', title: 'Problem-First', desc: 'We solve your specific problem, not a generic one. Every system is custom-built.' },
  { icon: '🤝', title: 'Your System, Your Control', desc: "We train you to run it independently. You're never dependent on us to keep the lights on." },
  { icon: '🇧🇩', title: 'Bangladesh-Rooted', desc: "We understand the local market at a level global firms never will — WhatsApp culture, bKash, F-commerce, SME reality." },
  { icon: '🌍', title: 'Global Standards', desc: "Our quality benchmark is international, not local average. Top 5% globally — that's not a claim. It's verified." },
];

const stats = [
  { label: 'Prompt Engineers Globally', value: 'Top 5%' },
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Client Categories Served', value: '8+' },
  { label: 'Years Building AI Systems', value: '3+' },
];

const skills = ['AI Systems Architecture', 'Prompt Engineering — Top 5% Global', 'Notion OS', 'n8n Automation', 'AI Agent Design', 'SEO — 500+ Projects', 'WordPress', 'AI Coaching'];

export default function About() {
  React.useEffect(() => {
    document.title = 'About SYSmoAI | AI Systems Built By Someone Who Needed Them First';
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 opacity-[0.1] blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            We Build AI Systems Because We Needed Them Ourselves.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            SYSmoAI was built by Emon Hossain — an AI Systems Architect who spent 3 years building systems for his own business before offering them to others. Real story. Real expertise.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-slate-900 text-center mb-14">
            How SYSmoAI came to be
          </motion.h2>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/40 via-blue-600/20 to-transparent" />
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-10">
              {timeline.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-full flex items-center justify-center text-2xl relative z-10">
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">{step.label}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-slate-900 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0">
                <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">EH</div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Emon Hossain</h2>
                <p className="text-blue-400 font-medium mb-4">Founder & CEO, SYSmoAI · AI Systems Architect · Notion OS Builder</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs font-medium rounded-full">{skill}</span>
                  ))}
                </div>
                <blockquote className="text-slate-300 leading-relaxed italic border-l-2 border-blue-600 pl-5">
                  "I built SYSmoAI because I was you 3 years ago — overwhelmed, tool-hopping, and losing income while AI was changing everything around me. I spent 3 years learning every AI tool, building real systems, and delivering 500+ projects. Then I realized: most people don't need another tool. They need someone to build the system FOR them. SYSmoAI is that builder."
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-slate-900 text-center mb-12">
            How we operate
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-white mb-12">By the numbers</motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
                <div className="text-3xl font-bold text-blue-400 mb-2">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to work with us?
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-400 mb-8">
            Book a free 30-minute discovery call. No commitment required.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] min-h-[56px]">
              <MessageCircle size={22} /> Start on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
