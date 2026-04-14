import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function PrivacyPolicy() {
  React.useEffect(() => { document.title = 'Privacy Policy | SYSmoAI'; }, []);
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 mb-10">Last updated: April 14, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Who we are</h2>
              <p>SYSmoAI ("we", "us", "our") is an AI consulting company based in Dhaka, Bangladesh. We operate the website sysmoai.com and provide AI systems, automation, and consulting services. Contact: hello@sysmoai.com</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. What data we collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Contact information:</strong> Name, email address, phone number when you fill out our contact form or reach out via WhatsApp.</li>
                <li><strong>Business information:</strong> Company name, business type, and workflow details you share during our discovery calls.</li>
                <li><strong>Usage data:</strong> Standard web analytics — page views, browser type, approximate location (country/city level). No personal identification.</li>
                <li><strong>Cookies:</strong> We use minimal cookies for site functionality and analytics. You can decline via our cookie consent banner.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. How we use your data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to your inquiries and deliver services you've requested</li>
                <li>To communicate project updates, proposals, and reports</li>
                <li>To improve our website and service quality (aggregated, anonymized analytics only)</li>
                <li>We do NOT sell your data to third parties. Ever.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data storage & security</h2>
              <p>Your data is stored securely using industry-standard encryption. We use reputable third-party services (Google Workspace, Notion, WhatsApp Business) that comply with international data protection standards. We retain your data only as long as necessary to provide our services or as required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Your rights</h2>
              <p>You have the right to: access your personal data, request correction or deletion, withdraw consent at any time, and file a complaint with relevant authorities. To exercise any of these rights, contact us at hello@sysmoai.com.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Bangladesh compliance</h2>
              <p>This policy is aligned with Bangladesh's Digital Security Act and emerging Personal Data Protection Ordinance (PDPO) 2025 framework. As regulations evolve, we will update this policy accordingly.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact</h2>
              <p>Privacy questions: <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
