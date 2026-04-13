import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Building2, User, Rocket, Briefcase, MessageCircle, Calendar, Globe, Code2, MessageSquare } from 'lucide-react';
import { SYSmoAILogo } from '@/components/SYSmoAILogo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WA_LINK = "https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%27m%20interested%20in%20your%20AI%20services.";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Hero */}
      <section className="relative bg-[#0A0B0F] py-24 lg:py-36 flex items-center justify-center min-h-[85vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2563EB] opacity-[0.15] blur-[140px] rounded-full" />
          <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] bg-[#1E3A8A] opacity-[0.12] blur-[100px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <SYSmoAILogo size={90} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-tight mb-6"
          >
            AI Systems That Work For You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            We build AI-powered operating systems for businesses in Bangladesh
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(37,211,102,0.4)]"
              data-testid="link-hero-whatsapp"
            >
              <MessageCircle size={22} />
              Message Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Who We Help</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">Serving businesses of every size across Bangladesh</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Building2, title: "SMEs", desc: "Scale your operations with AI workflows that save time and money" },
              { icon: User, title: "Freelancers", desc: "Build AI-powered service packages that command premium rates" },
              { icon: Rocket, title: "Startups", desc: "Launch faster with pre-built AI infrastructure and automation" },
              { icon: Briefcase, title: "Agencies", desc: "White-label AI systems for your clients. Scale your agency with AI-powered delivery." },
            ].map((item, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                data-testid={`card-who-we-help-${i}`}
              >
                <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">How It Works</h2>
            <p className="mt-4 text-gray-500 text-lg">Three steps from idea to live AI system</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent z-0" />
            {[
              { num: "01", title: "Audit", desc: "We analyze your business processes and identify high-value AI opportunities" },
              { num: "02", title: "Build", desc: "We architect and implement custom AI systems tailored to your needs" },
              { num: "03", title: "Launch", desc: "We deploy, monitor and optimize your AI systems for maximum ROI" },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center" data-testid={`step-how-it-works-${i}`}>
                <div className="w-20 h-20 bg-white border-2 border-[#2563EB]/20 rounded-full shadow-md flex items-center justify-center text-2xl font-bold text-[#2563EB] mb-6 hover:border-[#2563EB] hover:shadow-lg transition-all">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-[#0A0B0F] border-y border-gray-800 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            10,000+ Customers Served
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-gray-400 text-lg mb-16"
          >
            Trusted by businesses across Bangladesh since 2022
          </motion.p>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { icon: Calendar, label: "Since 2022" },
              { icon: Globe, label: "7+ Websites" },
              { icon: MessageSquare, label: "WhatsApp-First" },
              { icon: Code2, label: "Replit-Powered" },
            ].map((badge, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="px-6 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-200 font-medium flex items-center gap-3 hover:border-[#2563EB]/40 hover:bg-gray-800 transition-all"
                data-testid={`badge-social-proof-${i}`}
              >
                <badge.icon className="text-[#3B82F6]" size={20} />
                {badge.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Tier Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Our Services</h2>
            <p className="mt-4 text-gray-500 text-lg">Choose the right AI investment for your business</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "AI Profit Audit", price: "৳15,000–25,000", desc: "Identify your highest-value AI opportunities in 3-5 days" },
              { title: "Implementation Sprint", price: "৳40,000–75,000", desc: "Full AI system buildout in 1-2 weeks, end-to-end" },
              { title: "Premium Brand Build", price: "৳1,00,000–1,50,000", desc: "Bespoke AI infrastructure built for scale and performance" },
            ].map((service, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-[#2563EB] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                data-testid={`card-service-preview-${i}`}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{service.title}</h3>
                  <p className="text-[#2563EB] font-bold text-lg">{service.price}</p>
                </div>
                <p className="text-gray-600 mb-8 flex-1 leading-relaxed">{service.desc}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-[#2563EB] font-semibold group-hover:gap-2 transition-all"
                  data-testid={`link-service-preview-${i}`}
                >
                  View Details <span>→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
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
                  a: "Simply message us on WhatsApp at +880 1711-638693. We will schedule a free consultation within 24 hours."
                },
                {
                  q: "What makes SYSmoAI different?",
                  a: "We are action-focused, not consultancy-focused. We build, deploy, and optimize — not just plan. Provider, not Planner."
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="hover:bg-gray-50/80 rounded-lg px-2 transition-colors">
                  <AccordionTrigger className="text-left font-semibold text-[#1A1A1A] hover:text-[#2563EB] py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden bg-[#0A0B0F]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/30 via-transparent to-[#2563EB]/10" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB] opacity-[0.12] blur-[80px] rounded-[100%]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Ready to Transform Your Business with AI?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-gray-400 text-xl mb-10"
          >
            Book a free consultation — response within 5 minutes on WhatsApp.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-10 py-5 rounded-full font-semibold text-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(37,211,102,0.35)]"
              data-testid="link-cta-whatsapp"
            >
              <MessageCircle size={26} />
              Book a Free Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
