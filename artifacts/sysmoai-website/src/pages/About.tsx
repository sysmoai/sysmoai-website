import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* Founder Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center shadow-2xl mx-auto">
                <span className="text-white text-5xl font-bold tracking-tighter">EH</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2 tracking-[-0.02em]">
              Md. Emon Hossain
            </motion.h1>
            
            <motion.h2 variants={fadeUp} className="text-2xl text-[#2563EB] font-medium mb-6">
              Founder & AI Systems Architect
            </motion.h2>
            
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 text-gray-600 font-medium">
              <span className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100">28, Dhaka, Bangladesh</span>
              <span className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100">BBA Marketing, North South University</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-bold text-[#1A1A1A] mb-8">The Journey</h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>
                Starting with 500+ WordPress projects, I discovered that most businesses weren't failing due to lack of effort — they were failing due to lack of systems. I transitioned from web development to marketing automation, then to systems engineering, and finally to AI.
              </p>
              <p className="mt-4">
                Today, SYSmoAI Pvt Ltd helps businesses in Bangladesh build the AI infrastructure they need to compete in the modern economy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-[#0A0B0F] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
              "Provider, not Planner"
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto">
              Action over perfection. Systems over hustle. We don't just advise — we build, deploy, and optimize.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">What We've Built</h3>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { stat: "500+", label: "WordPress Projects" },
              { stat: "10,000+", label: "Customers via AI Premium Shop" },
              { stat: "7+", label: "Websites on Replit" },
              { stat: "2022", label: "Since" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="text-4xl font-bold text-[#2563EB] mb-2">{item.stat}</div>
                <div className="text-gray-600 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About SYSmoAI */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-bold text-[#1A1A1A] mb-8">About SYSmoAI</h3>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              SYSmoAI Pvt Ltd is an early-stage AI systems consultancy based in Dhaka, Bangladesh. We are not a large agency — we are a focused, action-oriented team that builds real AI systems for real businesses. Our approach is simple: understand your business, identify automation opportunities, and ship AI systems that work.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
