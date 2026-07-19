import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function RefundPolicy() {
  React.useEffect(() => { document.title = 'Refund Policy | SYSmoAI'; }, []);
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Refund Policy</h1>
          <p className="text-slate-500 mb-10">Last updated: July 19, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Our current active offer</h2>
              <p>This refund policy applies to the <strong>Lead Rescue System — Agency Edition</strong> validation pilot, which is the only active paid service SYSmoAI currently offers. Other policies described here will be updated when additional services are made available.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Lead Rescue System — Agency Edition</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Advance payment (৳7,500):</strong> Refunded in full if you cancel before any implementation work begins (i.e., before the first Google Meet implementation session). No refund after implementation sessions begin.
                </li>
                <li>
                  <strong>Acceptance test failure:</strong> If the system does not pass the 5-lead acceptance test and SYSmoAI is unable to resolve the issues after one revision cycle, the advance (৳7,500) will be refunded in full. No balance payment is due.
                </li>
                <li>
                  <strong>Balance payment (৳7,500):</strong> Due only after the acceptance test is passed. If you choose not to proceed to balance payment after a passed acceptance test, the advance is non-refundable.
                </li>
                <li>
                  <strong>Not applicable:</strong> Refunds are not available if the scope changes after work begins, if client fails to attend scheduled sessions, or if client does not provide the data or access required for the acceptance test.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">How to request a refund</h2>
              <p>Contact us at <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a> or via WhatsApp. All refund requests are reviewed within 2 business days. Refunds are processed via the same payment method used for the original transaction. Processing time depends on the payment method used.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Fit Check (qualification call)</h2>
              <p>The 15-minute Fit Check is free of charge. No payment is taken for or during the Fit Check. There is nothing to refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Questions</h2>
              <p>Contact us at <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
