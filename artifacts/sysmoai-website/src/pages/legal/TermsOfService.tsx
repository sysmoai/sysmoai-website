import React from 'react';

export default function TermsOfService() {
  React.useEffect(() => { document.title = 'Terms of Service | SYSmoAI'; }, []);
  return (
    <div className="bg-white min-h-screen text-slate-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-10">Last updated: August 24, 2026</p>
        <div className="space-y-8 leading-relaxed">
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Website use</h2><p>This website describes SYSmoAI's current capability areas and provides contact channels. Website copy is not itself a project proposal, guarantee, quotation, or commitment to deliver a specific outcome.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Project agreement</h2><p>For any paid engagement, the written scope or proposal is the commercial source of truth. It should define deliverables, exclusions, dependencies, access requirements, timeline, payment terms, acceptance criteria, support period, and any cancellation or refund terms that apply to that engagement.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Changes and third-party systems</h2><p>Scope changes require written agreement. Third-party tools, APIs, platforms, subscriptions, and infrastructure remain subject to their own availability, pricing, policies, limits, and terms.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Business outcomes</h2><p>Automation and AI systems can support operations, but business, revenue, cost, or productivity outcomes depend on factors outside the implementation itself. Any project-specific target or acceptance test must be stated in the written scope.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Intellectual property and confidentiality</h2><p>Ownership, licensing, credentials, confidentiality, portfolio use, and data-handling requirements should be stated in the project agreement where relevant. Third-party intellectual property remains governed by the applicable third-party terms.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2><p>Questions about these website terms: <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a>.</p></section>
        </div>
      </div>
    </div>
  );
}
