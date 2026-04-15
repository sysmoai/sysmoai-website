import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const faqs = [
  { q: 'Do I need to know anything about AI to work with you?', a: 'Not at all. We handle everything technical. You just show up for the onboarding call and tell us about your business. We do the rest.' },
  { q: 'How fast do I see results?', a: 'Most Quick Win clients see measurable results within 72 hours of delivery. Sprint clients typically see major impact in the first 2 weeks.' },
  { q: 'Do you only work with businesses in Bangladesh?', a: 'No. We work with clients worldwide. International payments are handled via Wise or Payoneer.' },
  { q: 'What if I don\'t like the output?', a: 'We offer one free revision on all projects. For Quick Win packages: if the stated goal isn\'t met, we rebuild it at no extra charge.' },
  { q: 'Is this consulting or do you actually build?', a: 'We build. You get a working, deployed system — not a slide deck. We don\'t get paid until it works.' },
  { q: 'How do you handle payment?', a: 'Quick Win: 100% advance. Sprint: 50% upfront, 50% on delivery. Retainer: monthly billing. We accept bKash, Nagad, bank transfer, Wise, and Payoneer.' },
  { q: 'What tools will you use?', a: 'Notion, ChatGPT, Claude, n8n, Zapier, WhatsApp automation, and custom AI agents — all chosen based on your specific needs. We work with what you have.' },
  { q: 'Can you train my team as well?', a: 'Yes. Every Sprint includes team training. We also offer standalone Group Workshops for teams of 10+.' },
  { q: 'How do I start?', a: 'Book a free 30-minute discovery call via WhatsApp. No commitment required. We respond within 2 hours on working days.' },
  { q: 'I\'m a student / freelancer / individual — is SYSmoAI for me?', a: 'Absolutely. We have solutions for every stage — from students learning AI for the first time to enterprises deploying full AI stacks. See our "For You" pages to find your exact situation.' },
  { q: 'Do you offer international client services?', a: 'Yes. We serve clients in the US, UK, Canada, Australia, and across Southeast Asia. International payments via Wise and Payoneer.' },
  { q: 'What makes SYSmoAI different from hiring a freelancer on Fiverr?', a: 'Freelancers do tasks. SYSmoAI builds repeatable systems. We document everything, train your team, and ensure the system runs without us — with 3 months of support included.' },
  { q: 'What happens during the free 30-minute AI audit?', a: 'We spend the first 10 minutes understanding your business and current workflow. The next 15 minutes we identify your biggest automation opportunity and map the exact solution. The final 5 minutes we give you a clear action plan with tools, costs, and timeline. You leave knowing exactly what to build — whether you hire us or not.' },
  { q: 'Is my business data safe with SYSmoAI?', a: 'Absolutely. We sign a confidentiality agreement before every project begins. We never store your business data beyond the project duration. All AI systems are built within your own accounts — your data stays under your control at all times. We follow Bangladesh Personal Data Protection guidelines.' },
  { q: 'What if I already tried AI tools and they didn\'t work?', a: 'This is the most common situation we encounter. Tools alone rarely work — the implementation is everything. Most people try ChatGPT or Notion on their own, use it for basic tasks, and give up. We build the complete system FOR you, on YOUR specific data and workflows. It\'s a completely different experience from DIY.' },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};

export default function FAQ() {
  React.useEffect(() => { document.title = 'Frequently Asked Questions | SYSmoAI Bangladesh'; }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative bg-[#0A0B0F] py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600 opacity-[0.1] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400">Everything you need to know before working with SYSmoAI.</motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-100">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600 py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-slate-500 mb-6">We respond within 2 hours on working days.</motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold transition-all min-h-[52px]">
              <MessageCircle size={20} /> Ask on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
