import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import { DirectAnswer } from '@/components/DirectAnswer';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const faqs = [
  {
    q: 'What is SYSmoAI and how does it help businesses in Bangladesh?',
    a: 'SYSmoAI is Bangladesh\'s AI consulting company, founded by Emon Hossain in 2022. We build custom AI operating systems — automating DM replies, order management, payment workflows, and reporting — for F-commerce sellers, SME founders, agencies, and corporates. We\'ve delivered 500+ AI projects across 8+ industries. Unlike freelancers who do one-off tasks, we build complete, documented systems that run independently. Pricing starts at ৳3,750 for a single workflow (AI Quick Win, 3 days).',
    bangla: 'SYSmoAI হলো বাংলাদেশের AI কনসালটিং কোম্পানি, ২০২২ সালে ইমন হোসেন প্রতিষ্ঠিত। আমরা কাস্টম AI অপারেটিং সিস্টেম তৈরি করি এবং ৫০০+ AI প্রজেক্ট সম্পন্ন করেছি।',
  },
  {
    q: 'How much does AI consulting cost in Bangladesh?',
    a: 'SYSmoAI pricing: AI Quick Win ৳3,750–৳7,500 (1 workflow in 3 days); F-Commerce AI Sprint ৳50,000 (full system in 14 days); AI Retainer ৳20,000/month (ongoing management). International rates: $50–$600 USD — 60–80% below US/EU agency rates. Payment via bKash, Nagad, bank transfer, Wise, or Payoneer. Quick Win is 100% advance; Sprint is 50% upfront, 50% on delivery; Retainer is monthly billing.',
    bangla: 'AI কনসালটিং খরচ: AI কুইক উইন ৳৩,৭৫০–৳৭,৫০০, F-কমার্স AI স্প্রিন্ট ৳৫০,০০০, AI রিটেইনার ৳২০,০০০/মাস।',
  },
  {
    q: 'How long does AI implementation take for a business in Bangladesh?',
    a: 'Timeline depends on scope: AI Quick Win (1 workflow) = 3 days; F-Commerce AI Sprint (full DM agent + order tracker + payment workflow + dashboard) = 14 days; AI Retainer = ongoing monthly. A free 30-minute discovery call takes 30 minutes and results in a clear action plan with tools, costs, and timeline. Most clients start seeing measurable results within 72 hours of Quick Win delivery, or within the first 2 weeks of Sprint delivery.',
    bangla: 'সময়সীমা: AI কুইক উইন ৩ দিন, F-কমার্স AI স্প্রিন্ট ১৪ দিন, AI রিটেইনার মাসিক।',
  },
  {
    q: 'What AI tools does SYSmoAI use to automate business workflows?',
    a: 'SYSmoAI uses ChatGPT (OpenAI GPT-4o), Claude (Anthropic), Notion, n8n, Zapier, Make, WhatsApp Business API, ManyChat, bKash/Nagad integrations, Google Workspace, Airtable, and LangChain — selected based on your specific business model. We work with what you already use and add only what you need. Every system is built within your own accounts so you own it completely.',
    bangla: 'আমরা ব্যবহার করি: ChatGPT, Claude, Notion, n8n, WhatsApp API, bKash ইন্টিগ্রেশন — আপনার ব্যবসার জন্য সঠিক সমন্বয়ে।',
  },
  {
    q: 'How does F-commerce automation work in Bangladesh?',
    a: 'F-commerce automation connects your Facebook Business Page Messenger to an AI agent that auto-replies DMs in Bangla and English, captures orders, confirms bKash/Nagad payments, and sends follow-up messages — all without manual intervention. SYSmoAI\'s F-Commerce AI Sprint deploys this full stack in 14 days for ৳50,000 — replacing 14-hour manual workdays for sellers managing 100–500+ DMs/day. Bangladesh has 700,000+ active F-commerce sellers (a-commerce Bangladesh 2023); manual management at scale is no longer viable.',
    bangla: 'F-কমার্স অটোমেশন ফেসবুক মেসেঞ্জারকে AI এজেন্টের সাথে সংযুক্ত করে — DM অটো-রিপ্লাই, অর্ডার ট্র্যাকিং, bKash কনফার্মেশন।',
  },
  {
    q: 'What is an AI Operating System (AI OS) for business?',
    a: 'An AI Operating System (AI OS) is a connected suite of AI tools, automations, and dashboards that runs your business operations — handling DMs, orders, payments, reports, and follow-ups — with minimal human input. Unlike using individual tools like ChatGPT or Notion alone, an AI OS integrates everything so actions in one system trigger actions in others. SYSmoAI specializes in building AI OS for Bangladesh businesses, with the F-Commerce AI Sprint as the standard deployment for F-commerce sellers.',
    bangla: 'AI অপারেটিং সিস্টেম হলো সংযুক্ত AI টুল, অটোমেশন এবং ড্যাশবোর্ডের একটি সেট যা আপনার পুরো ব্যবসা পরিচালনা করে।',
  },
  {
    q: 'Is there a guarantee on AI consulting results?',
    a: 'Yes. SYSmoAI\'s results-first guarantee: if the stated goal isn\'t met on an AI Quick Win, we rebuild it at no extra charge (1 free revision guaranteed). For the F-Commerce AI Sprint, if the agreed deliverables aren\'t met within 14 days, you get a full refund. We sign a confidentiality agreement before every project, and every system is built within your own accounts — your data stays under your control at all times.',
    bangla: 'হ্যাঁ। AI কুইক উইনে: লক্ষ্য পূরণ না হলে বিনামূল্যে পুনর্নির্মাণ। F-কমার্স AI স্প্রিন্টে: সম্মত ডেলিভারেবল না হলে সম্পূর্ণ অর্থ ফেরত।',
  },
  {
    q: 'What makes SYSmoAI different from freelancers or other AI consultants in Bangladesh?',
    a: 'Key differences: (1) SYSmoAI builds complete, documented systems — not one-off tasks. (2) Every project includes team training + video documentation so you run it independently. (3) 3-month post-launch support is standard. (4) Founder Emon Hossain is ranked top 5% globally in prompt engineering with 500+ projects delivered. (5) We specialize in Bangladesh market realities: bKash/Nagad automation, Bangla-language AI, F-commerce workflow patterns. (6) We use a results-first guarantee — no payment until it works.',
    bangla: 'পার্থক্য: সম্পূর্ণ সিস্টেম তৈরি করি, টিম ট্রেনিং দিই, ভিডিও ডকুমেন্টেশন দিই, ৩ মাস সাপোর্ট দিই — ফ্রিল্যান্সারের মতো একবারের কাজ নয়।',
  },
  {
    q: 'Do I need technical knowledge to use AI systems built by SYSmoAI?',
    a: 'Not after setup. SYSmoAI handles all technical implementation. You attend a 30-minute onboarding call, review and approve the system, and receive complete video documentation so you (and your team) can manage it using simple dashboards — no coding, no technical background required. If something breaks after delivery, we fix it within the support period. For Retainer clients, we handle ongoing maintenance entirely.',
    bangla: 'না। SYSmoAI সব কিছু তৈরি করে দেয়। আপনি শুধু ৩০ মিনিটের আলোচনায় অংশ নেন এবং ভিডিও ডকুমেন্টেশন পান।',
  },
  {
    q: 'How do I start working with SYSmoAI?',
    a: 'Three ways to start: (1) Book a free 30-minute AI audit at sysmoai.com/free-ai-audit — Emon Hossain reviews your workflow and gives you a specific action plan (no commitment required). (2) Message on WhatsApp — we respond within 2 hours on working days. (3) Start directly with an AI Quick Win (৳3,750) — tell us your #1 workflow problem and we automate it in 3 days. Most clients book the free audit first, then choose a package.',
    bangla: 'শুরু করুন: (১) বিনামূল্যে AI অডিট বুক করুন, (২) WhatsApp-এ মেসেজ করুন, বা (৩) সরাসরি AI কুইক উইন (৳৩,৭৫০) দিয়ে শুরু করুন।',
  },
];

export default function FAQ() {
  const { isDark } = useTheme();

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const heading = isDark ? '#F1F5F9' : '#0A0B0F';
  const body = isDark ? '#94A3B8' : '#475569';

  React.useEffect(() => { document.title = 'Frequently Asked Questions | SYSmoAI Bangladesh AI Consulting'; }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: bg1 }}>

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
            className="text-slate-400">Everything you need to know about AI consulting in Bangladesh with SYSmoAI.</motion.p>
        </div>
      </section>

      <section className="py-10" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <DirectAnswer bangla="SYSmoAI বাংলাদেশের AI কনসালটিং কোম্পানি। আমরা F-কমার্স বিক্রেতা, SME ফাউন্ডার এবং এজেন্সির জন্য কাস্টম AI সিস্টেম তৈরি করি। AI কুইক উইন ৳৩,৭৫০ থেকে শুরু।">
            SYSmoAI is Bangladesh's AI consulting company founded by Emon Hossain in 2022. We build custom AI systems — automating DMs, orders, payments, and workflows — for F-commerce sellers, SME founders, and agencies. Pricing starts at ৳3,750 (AI Quick Win, 3 days). Free 30-minute AI audit available with no commitment.
          </DirectAnswer>
        </div>
      </section>

      <section className="py-10 pt-0" style={{ background: bg1 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} style={{ borderBottomColor: cardBorder }}>
                  <AccordionTrigger
                    className="text-left font-semibold hover:text-blue-500 py-5"
                    style={{ color: heading }}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed pb-3" style={{ color: body }}>
                    <p className="mb-2">{faq.a}</p>
                    {faq.bangla && (
                      <p className="text-sm mt-2 pt-2 border-t" style={{ borderColor: cardBorder, color: isDark ? '#64748B' : '#94A3B8' }}>
                        <span className="font-medium" style={{ color: '#2563EB' }}>বাংলায়: </span>
                        {faq.bangla}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ background: bg2, borderTop: `1px solid ${cardBorder}` }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold mb-4" style={{ color: heading }}>Still have questions?</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="mb-6" style={{ color: body }}>We respond within 2 hours on working days.</motion.p>
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
