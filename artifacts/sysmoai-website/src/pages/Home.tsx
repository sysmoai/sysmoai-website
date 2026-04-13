import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Building2, User, Rocket, Briefcase, CheckCircle2, MessageCircle } from 'lucide-react';
import { SYSmoAILogo } from '@/components/SYSmoAILogo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#0A0B0F] py-20 lg:py-32 flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB] opacity-20 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <SYSmoAILogo size={80} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-tight mb-6"
          >
            AI Systems That Work For You
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl"
          >
            We build AI-powered operating systems for businesses in Bangladesh
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://wa.me/8801711638693" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              data-testid="link-hero-whatsapp"
            >
              Message Us on WhatsApp <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Who We Help</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Building2, title: "SMEs", desc: "Scale your operations with AI workflows that save time and money" },
              { icon: User, title: "Freelancers", desc: "Build AI-powered service packages that command premium rates" },
              { icon: Rocket, title: "Startups", desc: "Launch faster with pre-built AI infrastructure and automation" },
              { icon: Briefcase, title: "Agencies", desc: "White-label AI solutions to expand your service offerings" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                data-testid={`card-who-we-help-${i}`}
              >
                <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">How It Works</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gray-200 z-0"></div>
            
            {[
              { num: "1", title: "Audit", desc: "We analyze your business processes and identify AI opportunities" },
              { num: "2", title: "Build", desc: "We architect and implement custom AI systems tailored to your needs" },
              { num: "3", title: "Launch", desc: "We deploy, monitor and optimize your AI systems for maximum ROI" }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="relative z-10 flex flex-col items-center text-center"
                data-testid={`step-how-it-works-${i}`}
              >
                <div className="w-24 h-24 bg-white border-4 border-[#F8F9FA] rounded-full shadow-sm flex items-center justify-center text-2xl font-bold text-[#2563EB] mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-[#0A0B0F] border-y border-gray-800 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16"
          >
            10,000+ Customers Served Since 2022
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            {[
              "Since 2022",
              "7+ Websites",
              "WhatsApp-First",
              "Replit-Powered"
            ].map((badge, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="px-6 py-3 rounded-full bg-gray-900 border border-gray-800 text-gray-300 font-medium flex items-center gap-2"
                data-testid={`badge-social-proof-${i}`}
              >
                <CheckCircle2 className="text-[#3B82F6]" size={18} />
                {badge}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Tier Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Our Services</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "AI Profit Audit", price: "৳15,000–25,000", desc: "Quick wins analysis" },
              { title: "Implementation Sprint", price: "৳40,000–75,000", desc: "Full AI buildout" },
              { title: "Premium Brand Build", price: "৳1,00,000–1,50,000", desc: "Bespoke AI system" }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-[#2563EB] hover:shadow-lg transition-all group flex flex-col h-full"
                data-testid={`card-service-preview-${i}`}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{service.title}</h3>
                  <p className="text-[#2563EB] font-semibold">{service.price}</p>
                </div>
                <p className="text-gray-600 mb-8 flex-1">{service.desc}</p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center text-[#2563EB] font-medium group-hover:gap-2 transition-all"
                  data-testid={`link-service-preview-${i}`}
                >
                  View Details <span>→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Frequently Asked Questions</h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "What is AI consulting?",
                  a: "We analyze your business and build custom AI systems that automate repetitive tasks, improve decision-making, and increase revenue."
                },
                {
                  q: "How long does a project take?",
                  a: "Our AI Profit Audit takes 3-5 days. Implementation Sprints take 1-2 weeks. Premium Brand Builds take 2-4 weeks."
                },
                {
                  q: "Do I need technical knowledge?",
                  a: "No technical background required. We handle everything from strategy to deployment. You just need a clear business goal."
                },
                {
                  q: "What industries do you serve?",
                  a: "We work with SMEs, freelancers, startups, and agencies across Bangladesh. Our AI systems are industry-agnostic."
                },
                {
                  q: "How do I get started?",
                  a: "Simply message us on WhatsApp at +880 1711-638693. We'll schedule a free consultation within 24 hours."
                },
                {
                  q: "What makes SYSmoAI different?",
                  a: "We're action-focused, not consultancy-focused. We build, deploy, and optimize — not just plan. Provider, not Planner."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-[#1A1A1A] hover:text-[#2563EB]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#0A0B0F]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/20 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight"
          >
            Ready to Transform Your Business with AI?
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
              data-testid="link-cta-whatsapp"
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
