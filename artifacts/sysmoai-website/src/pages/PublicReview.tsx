import { useLocation, Link } from 'wouter';
import { useEffect } from 'react';

const NAV = [
  { href: '/', label: 'Overview' },
  { href: '/services', label: 'Service areas' },
  { href: '/pricing', label: 'Commercial terms' },
  { href: '/proof', label: 'Evidence standard' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const PAGE_TITLES: Record<string, string> = {
  '/': 'Practical AI systems, grounded in real work.',
  '/services': 'Service areas are being reviewed.',
  '/services/ai-sprint': 'Workflow implementation: scope first.',
  '/services/ai-quick-win': 'A small workflow starts with a real problem.',
  '/services/ai-retainer': 'Ongoing support requires a defined scope.',
  '/services/international': 'International work requires an approved scope.',
  '/services/other-engagements': 'Explore possible engagement areas.',
  '/for/f-commerce': 'F-commerce workflows require owner approval.',
  '/pricing': 'Pricing is confirmed only after review.',
  '/proof': 'Evidence before results claims.',
  '/results': 'Evidence before results claims.',
  '/faq': 'Frequently asked questions.',
  '/free-ai-audit': 'Discovery arrangements are being verified.',
  '/about': 'About SYSmoAI.',
  '/contact': 'Contact information is being verified.',
  '/terms-of-service': 'Service terms are under review.',
  '/refund-policy': 'Refund terms are under review.',
  '/privacy-policy': 'Privacy documentation is under review.',
};

const SUMMARY = 'SYSmoAI explores practical AI workflows, documentation, training and bounded implementations. Any paid engagement requires a verified responsible seller, lawful account permissions, defined scope, a written agreement and independently checked delivery and cost assumptions. No price, delivery deadline, refund guarantee, outcome claim or support SLA is approved by this page.';

export default function PublicReview() {
  const [location] = useLocation();
  const title = PAGE_TITLES[location] || 'Information is being reviewed.';
  const legalNotice = location === '/terms-of-service' || location === '/refund-policy' || location === '/privacy-policy';

  useEffect(() => {
    document.title = title + ' | SYSmoAI';
  }, [title]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white" aria-label="SYSmoAI overview">SYS<span className="text-blue-400">mo</span>AI</Link>
          <nav aria-label="Primary navigation" className="flex gap-x-5 gap-y-2 flex-wrap">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-sm uppercase tracking-widest text-blue-300 mb-5">SYSmoAI • Scope-first AI systems</p>
        <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-7">{title}</h1>
        <p className="max-w-3xl text-lg text-slate-300 leading-relaxed mb-9">{SUMMARY}</p>
        <div className="max-w-3xl rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 mb-12" role="status">
          <p className="font-semibold text-amber-200 mb-1">Commercial information under review</p>
          <p className="text-slate-300 text-sm leading-relaxed">Older price cards, service timelines, testimonials and automated claims should not be relied upon as current offers. No customer purchase or payment can be initiated through this page.</p>
        </div>

        {legalNotice ? (
          <section aria-label="Legal status" className="max-w-3xl rounded-2xl border border-slate-700 p-6 mb-10">
            <h2 className="text-xl font-semibold mb-3">For existing engagements</h2>
            <p className="text-slate-300 leading-relaxed">This informational status notice is not a contract, a new refund policy or legal advice. It does not modify signed agreements or limit consumer and other rights under applicable law. The responsible contracting party and official terms must be confirmed through an already established, authorized channel.</p>
          </section>
        ) : (
          <section aria-label="Areas of investigation" className="grid sm:grid-cols-3 gap-5 mb-14">
            {[
              ['Understand', 'Map the real workflow, constraints, account ownership and safer non-automation alternatives.'],
              ['Design', 'Evaluate a limited implementation only when permissions, security and acceptance criteria can be verified.'],
              ['Enable', 'Plan practical documentation, owner training and a tested, reversible handover.'],
            ].map(([heading, copy]) => (
              <article key={heading} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <h2 className="text-xl font-semibold text-white mb-3">{heading}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{copy}</p>
              </article>
            ))}
          </section>
        )}

        <section className="max-w-3xl border-t border-slate-800 pt-8" aria-label="Contact and safety">
          <h2 className="text-lg font-semibold mb-2">Next steps</h2>
          <p className="text-slate-300 text-sm leading-relaxed">Project discussions and support for existing clients should use previously verified official contact channels. Do not submit credentials, customer data, payment information or sensitive business records through an unverified channel. Public contact details and service-specific documents will return after owner verification and review.</p>
        </section>
      </main>
      <footer className="border-t border-slate-800 px-5 sm:px-8 py-6 text-sm text-slate-400">
        <div className="max-w-6xl mx-auto">SYSmoAI · Bangladesh · Evidence-led systems research and design</div>
      </footer>
    </div>
  );
}
