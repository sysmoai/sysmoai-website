import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Check, X } from 'lucide-react';

const WA_LINK = "https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%27m%20interested%20in%20your%20AI%20services.";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Services() {
  return (
    <div className="flex flex-col w-full">

      {/* Hero */}
      <section className="bg-[#0A0B0F] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3A8A] opacity-20 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-[-0.02em] mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            AI solutions designed for Bangladesh businesses
          </motion.p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Tier 1 */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              data-testid="card-pricing-tier-1"
            >
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">AI Profit Audit</h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">৳15,000 – ৳25,000</div>
              <p className="text-sm text-gray-500 mb-8 font-medium">Delivery: 3-5 days</p>

              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Business process audit",
                  "AI opportunity mapping",
                  "10-page strategy report",
                  "1 automation prototype",
                  "Client provides content",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[#2563EB] shrink-0 mt-0.5" size={20} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                data-testid="link-order-tier-1"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>
            </motion.div>

            {/* Tier 2 — Most Popular */}
            <motion.div
              variants={fadeUp}
              className="bg-white border-2 border-[#2563EB] rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative lg:scale-[1.03] z-10"
              data-testid="card-pricing-tier-2"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2563EB] text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Implementation Sprint</h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">৳40,000 – ৳75,000</div>
              <p className="text-sm text-gray-500 mb-8 font-medium">Delivery: 1-2 weeks</p>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="font-semibold text-[#1A1A1A] text-sm uppercase tracking-wide">Everything in Tier 1, plus:</li>
                {[
                  "5-10 page AI system build",
                  "Full SEO integration",
                  "Professional copywriting",
                  "Custom automation flows",
                  "30-day support",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[#2563EB] shrink-0 mt-0.5" size={20} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02]"
                data-testid="link-order-tier-2"
              >
                <MessageCircle size={20} />
                Order via WhatsApp
              </a>
            </motion.div>

            {/* Tier 3 */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              data-testid="card-pricing-tier-3"
            >
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Premium Brand Build</h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">৳1,00,000 – ৳1,50,000</div>
              <p className="text-sm text-gray-500 mb-8 font-medium">Delivery: 2-4 weeks</p>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="font-semibold text-[#1A1A1A] text-sm uppercase tracking-wide">Everything in Tier 2, plus:</li>
                {[
                  "Bespoke 7-15 page system",
                  "Custom design",
                  "Advanced AI agents",
                  "Priority support",
                  "Monthly optimization",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[#2563EB] shrink-0 mt-0.5" size={20} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                data-testid="link-order-tier-3"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Plan Comparison</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200 bg-white"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-[#1A1A1A]">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-600">AI Profit Audit</th>
                  <th className="py-4 px-4 text-center font-semibold text-[#2563EB] bg-blue-50/50">Implementation Sprint</th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-600">Premium Build</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Business Process Audit", true, true, true],
                  ["AI Opportunity Map", true, true, true],
                  ["Strategy Report", true, true, true],
                  ["AI System Build", false, true, true],
                  ["SEO Integration", false, true, true],
                  ["Professional Copywriting", false, true, true],
                  ["Custom Automation Flows", false, true, true],
                  ["Bespoke Design (7-15 pages)", false, false, true],
                  ["Advanced AI Agents", false, false, true],
                  ["Priority Support", false, false, true],
                  ["Monthly Optimization", false, false, true],
                ].map(([feature, t1, t2, t3], i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-6 text-gray-700 font-medium">{feature as string}</td>
                    {[t1, t2, t3].map((val, j) => (
                      <td key={j} className={`py-3.5 px-4 text-center ${j === 1 ? 'bg-blue-50/30' : ''}`}>
                        {val
                          ? <Check className="text-[#2563EB] mx-auto" size={18} />
                          : <X className="text-gray-300 mx-auto" size={18} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Available Add-Ons</h2>
            <p className="mt-3 text-gray-500">Enhance any tier with these optional services</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { name: "Copywriting", price: "৳3,000–5,000/page" },
              { name: "SEO Setup", price: "৳5,000–10,000" },
              { name: "Analytics Setup", price: "৳3,000–5,000" },
              { name: "WhatsApp Business Flows", price: "৳5,000–10,000" },
              { name: "Notion CMS Integration", price: "৳10,000–20,000" },
              { name: "Monthly Retainer", price: "৳5,000–15,000/month" },
              { name: "Replit Agent Training", price: "৳3,000–5,000" },
              { name: "App Transfer (Handoff)", price: "৳5,000" },
            ].map((addon, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="bg-[#F8F9FA] p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-[#2563EB]/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#60A5FA]" size={20} />
                  <span className="font-medium text-[#1A1A1A]">{addon.name}</span>
                </div>
                <span className="font-bold text-[#2563EB] text-sm whitespace-nowrap ml-4">{addon.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Payment Methods</h2>
            <p className="mt-3 text-gray-500">Flexible payment options for your convenience</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            {["bKash", "Nagad", "Rocket", "Bank Transfer", "Binance"].map((method, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center font-semibold text-gray-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
              >
                {method}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-white rounded-2xl border border-gray-200 p-8"
          >
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Payment Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { pct: "50%", label: "Deposit", desc: "Paid before work begins to kick off the project" },
                { pct: "30%", label: "On Delivery", desc: "Paid when the build is complete and handed over" },
                { pct: "20%", label: "On Launch", desc: "Final payment after your AI system goes live" },
              ].map((m, i) => (
                <div key={i} className="text-center p-4 bg-[#F8F9FA] rounded-xl">
                  <div className="text-4xl font-bold text-[#2563EB] mb-2">{m.pct}</div>
                  <div className="font-semibold text-[#1A1A1A] mb-1">{m.label}</div>
                  <div className="text-sm text-gray-500">{m.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#0A0B0F] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Not Sure Which Plan Is Right for You?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-gray-400 text-xl mb-10"
          >
            Message us and we will help you choose the best fit.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.03]"
              data-testid="link-cta-consultation"
            >
              <MessageCircle size={24} />
              Book a Free Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
