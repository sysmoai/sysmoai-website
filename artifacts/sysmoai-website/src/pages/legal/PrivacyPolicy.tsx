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
          <p className="text-slate-500 mb-10">Last updated: July 19, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Who we are</h2>
              <p>SYSmoAI ("we", "us", "our") is a founder-led AI consulting initiative based in Bangladesh. We operate the website sysmoai.com. Contact: hello@sysmoai.com.</p>
              <p className="mt-2 text-sm text-slate-500">Note: SYSmoAI is not currently an incorporated legal entity. Name clearance has been obtained. This will be updated when incorporation is complete.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. What data we collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Contact information:</strong> Name, email address, and/or WhatsApp number when you fill out our contact form or enquiry form on this site.</li>
                <li><strong>Business context:</strong> Information you voluntarily share about your business, team, or workflow during enquiry conversations.</li>
                <li><strong>Form metadata:</strong> Which service you enquired about and the timestamp of submission — stored with your form data in our secure database.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-500">We do not currently use any web analytics tools, tracking pixels, or advertising cookies. The cookie consent notice on this site reflects our readiness for when such tools are added; no tracking cookies are active at this time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. How we use your data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to your enquiry and assess whether our active offer is a good fit for your situation.</li>
                <li>To communicate scope, timelines, and project updates if you become a client.</li>
                <li>We do NOT sell your data to any third party.</li>
                <li>We do NOT use your data for advertising or marketing to unrelated parties.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data storage</h2>
              <p>Your form submissions are stored in a secure, hosted PostgreSQL database. We do not share this data with external marketing or CRM services. We retain your data only as long as needed to handle your enquiry or deliver services, unless you request earlier deletion.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Your rights</h2>
              <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a>. We process such requests manually within 5 business days.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Cookies</h2>
              <p>This site sets a single functional cookie (<code>sysmoai_cookie_consent</code>) to remember your cookie preference. No analytics, advertising, or tracking cookies are set. If we add analytics tools in the future, this policy will be updated and the consent banner will become functional for that purpose.</p>
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
