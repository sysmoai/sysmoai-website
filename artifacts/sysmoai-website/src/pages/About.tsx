import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings, Rocket } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const timeline = [
  { years: "2015–2020", title: "WordPress Era", desc: "Built 500+ WordPress websites for clients across Bangladesh, learning the fundamentals of web, business, and client delivery." },
  { years: "2020–2022", title: "Marketing & Systems", desc: "Transitioned to marketing automation and systems engineering — discovering that most businesses fail due to lack of systems, not effort." },
  { years: "2022–2024", title: "AI Premium Shop", desc: "Built and operated AI Premium Shop, serving 10,000+ customers through AI-powered e-commerce and WhatsApp-first business models." },
  { years: "2024–Present", title: "SYSmoAI", desc: "Founded SYSmoAI Pvt Ltd — an early-stage AI systems consultancy helping Bangladesh businesses build the infrastructure they need to compete." },
];

const values = [
  { icon: Zap, title: "Provider, not Planner", desc: "We build real AI systems — not just strategies and decks. If it doesn't ship, it doesn't count." },
  { icon: Settings, title: "Systems over Hustle", desc: "Sustainable automation beats manual grind every time. We install systems that compound." },
  { icon: Rocket, title: "Action over Perfection", desc: "We ship, iterate, and improve. The best AI system is the one that's live and working." },
];

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* Founder Section */}
      <section className="py-24 relative bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden" animate="show" variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-10">
              <div
                className="w-[250px] h-[250px] rounded-full flex items-center justify-center shadow-2xl mx-auto"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                  border: '3px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 0 0 6px rgba(37,99,235,0.12), 0 24px 64px rgba(37,99,235,0.2)'
                }}
              >
                <span className="text-white font-bold" style={{ fontSize: '80px', letterSpacing: '-0.04em', lineHeight: 1 }}>EH</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2 tracking-[-0.02em]">
              Md. Emon Hossain
            </motion.h1>

            <motion.h2 variants={fadeUp} className="text-xl text-[#2563EB] font-semibold mb-6">
              Founder & AI Systems Architect
            </motion.h2>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 text-gray-600 font-medium">
              <span className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm">28, Dhaka, Bangladesh</span>
              <span className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm">BBA Marketing, North South University</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-[-0.02em]">The Journey</h2>
            <p className="mt-3 text-gray-500">From WordPress to AI — a decade of building</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="relative"
          >
            <div className="absolute left-[110px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#2563EB] to-[#3B82F6]/20 hidden md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="md:w-[110px] shrink-0 flex md:flex-col md:items-end md:pt-1">
                    <span className="text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">
                      {item.years}
                    </span>
                  </div>
                  <div className="relative md:pl-8">
                    <div className="hidden md:block absolute left-0 top-2 w-3 h-3 bg-[#2563EB] rounded-full -translate-x-[calc(50%+1px)] ring-4 ring-[#F8F9FA]" />
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-[#0A0B0F] text-center relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2563EB] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-[#60A5FA] font-semibold tracking-widest uppercase text-sm mb-6">Our Philosophy</p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
              "Provider, not Planner"
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto">
              Action over perfection. Systems over hustle. We don't just advise — we build, deploy, and optimize.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">What We Stand For</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((v, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="bg-[#F8F9FA] p-8 rounded-2xl border border-gray-100 hover:border-[#2563EB]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#2563EB] text-white rounded-xl flex items-center justify-center mb-6">
                  <v.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">What We've Built</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { stat: "500+", label: "WordPress Projects" },
              { stat: "10,000+", label: "Customers Served" },
              { stat: "7+", label: "Websites on Replit" },
              { stat: "Since 2022", label: "Operating" },
            ].map((item, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="p-8 text-center bg-white rounded-2xl border border-gray-100 hover:border-[#2563EB]/20 hover:shadow-md transition-all"
              >
                <div className="text-4xl font-bold text-[#2563EB] mb-2">{item.stat}</div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About SYSmoAI */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">About SYSmoAI</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              SYSmoAI Pvt Ltd is an early-stage AI systems consultancy based in Dhaka, Bangladesh. We are not a large agency — we are a focused, action-oriented team that builds real AI systems for real businesses. Our approach is simple: understand your business, identify automation opportunities, and ship AI systems that work.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
