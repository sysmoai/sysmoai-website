import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function FCommerce() {
  return (
    <AudiencePageTemplate
      metaTitle="AI for F-Commerce Sellers Bangladesh | Automate Orders & DMs | SYSmoAI"
      segment="F-Commerce Sellers"
      heroHeadline="500 DMs a Day. 1 Person. Manual Chaos. There's a Better Way."
      heroSub="F-commerce in Bangladesh is booming. But managing orders manually on Facebook is breaking sellers. SYSmoAI automates your entire F-commerce operation."
      painPoints={[
        { emoji: '💬', label: '500+ DMs a day, replying to 100', desc: 'I get 500+ Facebook DMs a day. I reply to maybe 100. The other 400 are lost sales.' },
        { emoji: '📦', label: 'Order tracking is a mess', desc: 'My order tracking is a mess — I use a notebook, screenshots, and memory. I make errors daily.' },
        { emoji: '💳', label: 'bKash confirmation takes 30 minutes', desc: 'Confirming bKash payments takes 30 minutes per order. My customers leave before I confirm.' },
        { emoji: '🔁', label: 'Zero repeat customers', desc: 'I have no repeat customers. I\'ve never followed up with a single past buyer. Ever.' },
        { emoji: '📸', label: 'Inconsistent posting', desc: 'I post inconsistently because creating product content takes too long. Some weeks I post nothing.' },
        { emoji: '😤', label: '16-hour days at peak season', desc: 'I\'m working 16 hours a day at peak season and still can\'t keep up. I\'m about to quit.' },
      ]}
      beforeAfter={[
        { before: '500 DMs, 100 replies, 400 lost sales — revenue leaking through every crack', after: 'AI auto-replies handle all FAQs and common questions, capturing leads 24/7' },
        { before: 'Notebook + memory + screenshots for order tracking — errors every day', after: 'Automated order management system — every order tracked from payment to delivery' },
        { before: '0 repeat customer follow-ups — every customer is a one-time sale', after: 'Automated post-purchase follow-up sequences — repeat buyers increase within 30 days' },
      ]}
      solutions={[
        { icon: '💬', title: 'Facebook DM Auto-Response System', desc: 'Automatically answers common questions (price, availability, delivery), captures orders, and routes complex queries to you.' },
        { icon: '📦', title: 'Order Tracking OS', desc: 'Every order tracked from payment confirmation to delivery — no more notebooks, no more errors.' },
        { icon: '💳', title: 'bKash Payment Workflow', desc: 'Semi-automated payment verification that cuts confirmation time from 30 minutes to under 5 minutes.' },
        { icon: '🔁', title: 'Customer Re-engagement System', desc: 'Automated post-purchase follow-up sequences that bring past buyers back for a second, third, fourth purchase.' },
      ]}
      relevantServices={[
        { href: '/services/ai-quick-win', label: 'AI Quick Win', price: '৳3,750–7,500' },
        { href: '/services/ai-retainer', label: 'F-Commerce AI Retainer', price: '৳20,000/mo' },
        { href: '/services/ai-sprint', label: 'F-Commerce AI Sprint', price: '৳50,000' },
      ]}
      finalCtaHeadline="Ready to automate your F-commerce and take back your time?"
      faqs={[
        { q: 'Does the Facebook DM system work with any Facebook page?', a: 'Yes, it integrates with Facebook Business pages. You need a Facebook Business account with Messenger API access — we help you set this up.' },
        { q: 'What happens when a customer asks something the AI can\'t answer?', a: 'The system flags it for you with full conversation context. You respond to the exceptions — not to all 500 messages.' },
        { q: 'Can this handle both Bangla and English messages?', a: 'Yes. We build bilingual systems as standard for F-commerce clients in Bangladesh.' },
        { q: 'Is this legal / does Facebook allow this?', a: 'Yes. The tools we use (n8n, ManyChat, or similar) are fully compliant with Facebook\'s Messenger policies.' },
        { q: 'I\'m a small seller — can I afford this?', a: 'The AI Quick Win starting at ৳3,750 is specifically designed for solo F-commerce sellers. You can start with one automation and scale up.' },
      ]}
    />
  );
}
