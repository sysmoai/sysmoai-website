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
          <p className="text-slate-500 mb-10">Last updated: July 19, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. What we offer</h2>
              <p>SYSmoAI currently offers one active service: the <strong>Lead Rescue System — Agency Edition</strong>, a 14-day validation pilot for founder-led micro digital agencies in Bangladesh. The specific scope, deliverables, acceptance criteria, and timeline for any engagement are agreed upon in a written scope document before work begins and before any payment is made.</p>
              <p className="mt-2 text-sm text-slate-500">Other services described on this website represent potential future offerings and are not currently available for purchase or booking.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Payment terms</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>50% advance:</strong> Due after qualification is confirmed, written scope is agreed and signed, and a payment method is separately verified with the client. No advance is requested before these steps are complete.</li>
                <li><strong>50% balance:</strong> Due after the acceptance test (5-lead test) is passed and before final handover and access transfer.</li>
                <li><strong>Payment method:</strong> The specific payment rail will be confirmed separately with each client during qualification. No payment method is available on this website at this time.</li>
                <li><strong>Third-party tool costs:</strong> Any third-party tool or platform fees (e.g. Notion, Google Workspace) are the client's responsibility and are separate from the service fee.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Scope and acceptance</h2>
              <p>All work is defined in a written scope document. The scope will explicitly state what is included and what is excluded. An acceptance test using the client's own data (5 real leads) will confirm that the deliverables function as agreed before the balance payment is due. Out-of-scope requests after work begins will be treated as a separate engagement.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Client responsibilities</h2>
              <p>Clients are responsible for providing timely access to required tools and data, attending scheduled sessions, and completing the acceptance test. Delays caused by client non-availability do not extend SYSmoAI's delivery obligations. The 7-day post-handover support period begins at the time of handover regardless of when the client begins using the system.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Intellectual property</h2>
              <p>Upon full payment, clients own all deliverables created for their engagement. Third-party tools and platforms (Notion, Google Workspace, etc.) remain subject to their own terms of service. SYSmoAI retains the right to publish case studies only after actual delivery and with the client's written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of liability</h2>
              <p>SYSmoAI is not liable for business outcomes, revenue changes, or consequential damages resulting from the use or non-use of systems we build. Our liability is limited to the amount paid for the specific engagement. We make no guarantee of sales, leads, or revenue results from any system we build.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Governing law</h2>
              <p>These terms are governed by the laws of Bangladesh. Any disputes will first be addressed through good-faith negotiation. If unresolved, they will be subject to the jurisdiction of courts in Dhaka, Bangladesh.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact</h2>
              <p>Questions: <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
