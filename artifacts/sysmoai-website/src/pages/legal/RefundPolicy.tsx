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
          <p className="text-slate-500 mb-10">Last updated: April 14, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Our guarantee</h2>
              <p>SYSmoAI is built on a simple commitment: every project is scoped with a written acceptance test before work starts, and our refund policy reflects that. We don't hide behind fine print — we make it right.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">AI Quick Win</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Guarantee:</strong> If the stated goal isn't met after delivery and one revision cycle, we rebuild the automation at no additional charge.</li>
                <li><strong>Refund:</strong> If we cannot meet the stated goal after two attempts, a full refund is issued.</li>
                <li><strong>Not applicable:</strong> If the goal changes after project start, or if client doesn't provide required access/information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">AI Sprint</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>If cancelled before work begins:</strong> 100% refund of deposit.</li>
                <li><strong>If cancelled after work begins (before 50% completion):</strong> 50% of deposit refunded.</li>
                <li><strong>If cancelled after 50% completion:</strong> No refund. Work completed to date will be delivered.</li>
                <li><strong>If we fail to deliver:</strong> Full refund of all payments made.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">AI Retainer</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Monthly billing. Cancel before the next billing cycle to avoid the next charge.</li>
                <li>No refund for the current month's payment if work has commenced.</li>
                <li>Prorated refund available if we fail to deliver the agreed monthly scope.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1:1 Coaching & Workshops</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cancelled 48+ hours before session:</strong> Full refund or reschedule.</li>
                <li><strong>Cancelled less than 48 hours before:</strong> 50% refund or reschedule.</li>
                <li><strong>No-show (client):</strong> No refund. Session can be rescheduled once at 50% of session fee.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">How to request a refund</h2>
              <p>Contact us at <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a> or via WhatsApp. All refund requests are reviewed within 2 business days. Refunds are processed via the same payment method used for the original transaction within 5–7 business days.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
