import React from 'react';

export default function RefundPolicy() {
  React.useEffect(() => { document.title = 'Commercial Terms Notice | SYSmoAI'; }, []);
  return (
    <div className="bg-white min-h-screen text-slate-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Commercial Terms Notice</h1>
        <p className="text-slate-500 mb-10">Last updated: August 24, 2026</p>
        <div className="space-y-8 leading-relaxed">
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">No universal package refund promise</h2><p>SYSmoAI does not use this website page to impose one refund or cancellation formula across every project. Different engagements can have materially different scope, dependencies, third-party costs, milestones, and delivery risks.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Written agreement controls</h2><p>Before a paid engagement begins, the written scope or proposal should state the payment schedule, cancellation conditions, refund rules if any, milestone treatment, third-party costs, and the acceptance method for that project.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Do not rely on historical package pages</h2><p>Any older SYSmoAI page, cached search result, screenshot, or previous package description that lists a standard refund percentage, fixed delivery guarantee, or universal commercial promise is superseded by the current written engagement agreement.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 mb-3">Questions</h2><p>For questions about the terms of a specific engagement, use the contact details in the applicable proposal or email <a href="mailto:hello@sysmoai.com" className="text-blue-600 hover:underline">hello@sysmoai.com</a>.</p></section>
        </div>
      </div>
    </div>
  );
}
