import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-[#0A0B0F] py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-[#1E3A8A] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-[-0.02em] mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Tier 1 */}
            <motion.div 
              variants={fadeUp}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col h-full relative"
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
                  "Client provides content"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[#2563EB] shrink-0 mt-0.5" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://wa.me/8801711638693" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                data-testid="link-order-tier-1"
              >
                Order via WhatsApp
              </a>
            </motion.div>

            {/* Tier 2 */}
            <motion.div 
              variants={fadeUp}
              className="bg-white border-2 border-[#2563EB] rounded-3xl p-8 shadow-xl flex flex-col h-full relative scale-100 lg:scale-105 z-10"
              data-testid="card-pricing-tier-2"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2563EB] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Implementation Sprint</h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">৳40,000 – ৳75,000</div>
              <p className="text-sm text-gray-500 mb-8 font-medium">Delivery: 1-2 weeks</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="font-semibold text-[#1A1A1A]">Everything in AI Profit Audit, plus:</li>
                {[
                  "5-10 page AI system build",
                  "Full SEO integration",
                  "Professional copywriting",
                  "Custom automation flows",
                  "30-day support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[#2563EB] shrink-0 mt-0.5" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://wa.me/8801711638693" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-4 rounded-xl font-semibold transition-colors text-lg"
                data-testid="link-order-tier-2"
              >
                Order via WhatsApp
              </a>
            </motion.div>

            {/* Tier 3 */}
            <motion.div 
              variants={fadeUp}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col h-full relative"
              data-testid="card-pricing-tier-3"
            >
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Premium Brand Build</h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">৳1,00,000 – ৳1,50,000</div>
              <p className="text-sm text-gray-500 mb-8 font-medium">Delivery: 2-4 weeks</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="font-semibold text-[#1A1A1A]">Everything in Implementation Sprint, plus:</li>
                {[
                  "Bespoke 7-15 page system",
                  "Custom design",
                  "Advanced AI agents",
                  "Priority support",
                  "Monthly optimization"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="text-[#2563EB] shrink-0 mt-0.5" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://wa.me/8801711638693" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                data-testid="link-order-tier-3"
              >
                Order via WhatsApp
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Available Add-Ons</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { name: "Professional Copywriting", price: "৳5,000" },
              { name: "Advanced SEO Package", price: "৳8,000" },
              { name: "Analytics Dashboard", price: "৳10,000" },
              { name: "WhatsApp Automation Flows", price: "৳12,000" },
              { name: "Notion CMS Integration", price: "৳7,000" },
              { name: "Monthly Retainer (support + optimization)", price: "৳15,000/month" }
            ].map((addon, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#60A5FA]" size={20} />
                  <span className="font-medium text-[#1A1A1A]">{addon.name}</span>
                </div>
                <span className="font-bold text-[#2563EB]">{addon.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#0A0B0F] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            Not Sure Which Plan Is Right for You?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <a 
              href="https://wa.me/8801711638693" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105"
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
