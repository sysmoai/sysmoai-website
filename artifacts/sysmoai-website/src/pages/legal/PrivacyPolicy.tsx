import React from 'react';

export default function PrivacyPolicy() {
  React.useEffect(() => { document.title = 'Privacy Policy | SYSmoAI'; }, []);
  return (
    <div className="bg-white min-h-screen text-slate-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: August 24, 2026</p>
        <div className="space-y-8 leading-relaxed">
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Who this covers</h2><p>This policy covers information submitted through sysmoai.com and the contact channels linked from the website. Project-specific data handling may require additional written terms depending on the systems and access involved.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Information you submit</h2><p>The website may collect information you intentionally provide, such as your name, email or WhatsApp contact, workflow description, and other project context entered into forms or messages.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">How it is used</h2><p>Submitted information is used to review inquiries, communicate with you, assess whether a project is appropriate, and administer an agreed engagement. Do not submit credentials, passwords, API keys, payment-card data, or other secrets through ordinary contact forms.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Third-party services</h2><p>Website hosting, communication, forms, and project delivery can involve third-party providers. Where a project requires access to client systems or sensitive information, the applicable scope should state the required access and handling arrangements.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Retention and requests</h2><p>Information should be retained only as needed for the inquiry, engagement, operational records, or legal obligations. You may contact SYSmoAI to request correction or deletion where applicable.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2><p>Privacy questions: <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a>.</p></section>
        </div>
      </div>
    </div>
  );
}
