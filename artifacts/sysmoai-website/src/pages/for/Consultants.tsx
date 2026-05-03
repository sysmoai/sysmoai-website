import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function Consultants() {
  return (
    <AudiencePageTemplate
      metaTitle="AI for Consultants & Coaches Bangladesh | Productize Your Expertise | SYSmoAI"
      segment="Consultants & Coaches"
      heroHeadline="Your Expertise Is Locked in Your Head. Let's Get It Out."
      heroSub="As a consultant or coach, your knowledge is your product — but manual processes and scattered systems are limiting your income ceiling. SYSmoAI productizes your expertise."
      painPoints={[
        { emoji: '🐌', label: 'Onboarding takes 2-3 days of manual work', desc: 'New client onboarding requires me to manually send 15 emails, 3 contracts, and 2 intake forms. Every time.' },
        { emoji: '📅', label: 'LinkedIn posting — almost never', desc: 'I post on LinkedIn when I remember — which is almost never. I have no content system.' },
        { emoji: '📝', label: 'Proposals rebuilt every time', desc: 'I rebuild every proposal from scratch. Last month I spent 15 hours on proposals that didn\'t close.' },
        { emoji: '🧠', label: 'Everything is in my head', desc: 'Everything I know is in my head. If I get sick, my business stops. No SOPs. No documentation.' },
        { emoji: '❄️', label: 'Warm leads go cold', desc: 'I\'ve lost ৳50,000+ in forgotten leads that went cold because I didn\'t follow up in time.' },
        { emoji: '💰', label: 'Selling time has a ceiling', desc: 'I\'m selling 1:1 time. I can\'t scale because there\'s only so many hours in a day.' },
      ]}
      beforeAfter={[
        { before: '2-3 day manual onboarding — 15 emails sent individually, contracts sent one by one', after: 'Automated onboarding in 15 minutes — intake, contract, payment link, welcome email sent automatically' },
        { before: 'Rebuilding proposals for 3 hours each — inconsistent quality, slow turnaround', after: 'AI proposal system generates a professional draft in 20 minutes — you refine, client approves' },
        { before: 'Knowledge locked in head — business stops if you\'re sick or traveling', after: 'SOP library + knowledge base in Notion — any team member can run the process without you' },
      ]}
      solutions={[
        { icon: '🚀', title: 'Client Onboarding Automation', desc: 'Automated intake form, contract delivery, payment link, and welcome sequence — triggered the moment a client says yes.' },
        { icon: '📋', title: 'AI Proposal System', desc: 'Template system that generates professional, personalized proposals in 20 minutes — consistent and winning.' },
        { icon: '🗂️', title: 'Knowledge Base + SOP Library', desc: 'Your expertise documented, searchable, and runnable by a VA or team member without you in the room.' },
        { icon: '📅', title: 'Content Engine', desc: 'LinkedIn + newsletter workflow that publishes consistently — capturing your ideas automatically and scheduling them.' },
      ]}
      relevantServices={[
        { href: '/services/ai-quick-win', label: 'AI Quick Win', price: '৳3,750–7,500' },
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint', price: '৳50,000' },
      ]}
      finalCtaHeadline="Ready to scale your consulting beyond your own hours?"
      faqs={[
        { q: 'I already use Notion — can you improve my existing setup?', a: 'Yes. Most consultants we work with have started a Notion workspace but haven\'t built the interconnected OS layer. We audit and upgrade what you have.' },
        { q: 'What if my clients aren\'t tech-savvy?', a: 'We design client-facing portals that are simple and clean — your clients never see the backend complexity.' },
        { q: 'How do I start building a content system when I have no time?', a: 'We start by capturing ideas you already have — meeting notes, WhatsApp voice memos, old presentations. We turn your existing thinking into content.' },
        { q: 'Can AI help me create courses or productized services?', a: 'Yes. Productizing your expertise into a course or consulting package is one of the outcomes we actively design for.' },
        { q: 'I work solo — do I need a VA to run these systems?', a: 'Designed for solo operators. Everything runs on automation — you only need to make the human decisions.' },
      ]}
    />
  );
}
