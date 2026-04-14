import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function TermsOfService() {
  React.useEffect(() => { document.title = 'Terms of Service | SYSmoAI'; }, []);
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 mb-10">Last updated: April 14, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Services</h2>
              <p>SYSmoAI provides AI consulting, automation development, Notion OS builds, AI agent development, training, and related services. The specific scope, deliverables, and timeline for each engagement are agreed upon in writing (WhatsApp, email, or formal proposal) before work begins.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Payment terms</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>AI Quick Win:</strong> 100% payment required before work begins.</li>
                <li><strong>AI Sprint & other projects:</strong> 50% upfront, 50% upon delivery and client approval.</li>
                <li><strong>AI Retainer:</strong> Monthly billing. Due at the start of each month.</li>
                <li>Accepted methods: bKash, Nagad, bank transfer, Wise, Payoneer.</li>
                <li>Work will not commence until the initial payment is confirmed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Scope & revisions</h2>
              <p>All projects include one free revision cycle. Additional revisions or scope changes may incur additional charges, which will be communicated and agreed upon before implementation. Changes to agreed scope that require significant additional work will be treated as a new project or add-on.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Delivery & timelines</h2>
              <p>Delivery timelines are estimates based on agreed scope and our current workload. Delays caused by client non-responsiveness (missing approvals, not providing required information) do not affect our delivery obligation timeline. We will communicate any delays proactively.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Intellectual property</h2>
              <p>Upon full payment, clients own the deliverables created for their project. SYSmoAI retains the right to use project work in portfolios and case studies (anonymized where requested). Third-party tools and platforms used (Notion, n8n, etc.) are subject to their own terms of service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of liability</h2>
              <p>SYSmoAI is not liable for business outcomes, revenue changes, or consequential damages resulting from the use or non-use of systems we build. Our liability is limited to the amount paid for the specific service in question.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Governing law</h2>
              <p>These terms are governed by the laws of Bangladesh. Any disputes will first be addressed through good-faith negotiation. If unresolved, they will be subject to the jurisdiction of courts in Dhaka, Bangladesh.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact</h2>
              <p>Questions about these terms: <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
