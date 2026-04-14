import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function SMEFounders() {
  return (
    <AudiencePageTemplate
      metaTitle="AI for SME Founders Bangladesh | AI Business OS | SYSmoAI"
      segment="SME Founders"
      heroHeadline="You Started a Business to Have Freedom. Not to Be Buried in It."
      heroSub="WhatsApp overwhelm. Forgotten follow-ups. No visibility into your own business. SYSmoAI builds the AI operating system that runs your business even when you're not in the room."
      painPoints={[
        { emoji: '📱', label: '847 unread WhatsApp messages', desc: 'I\'ve lost at least 10 clients this month because I couldn\'t follow up in time.' },
        { emoji: '🔄', label: 'Follow-ups are manual and I forget', desc: 'I remind myself to follow up with leads manually. I forget. The leads go cold. Revenue lost.' },
        { emoji: '🏗️', label: '7 apps that don\'t talk to each other', desc: 'I use 7 different apps and none of them talk to each other. I manually copy data between them daily.' },
        { emoji: '📊', label: 'No dashboard — I ask my team', desc: 'I have no idea what\'s happening in my business right now unless I ask my team. There\'s no visibility.' },
        { emoji: '😰', label: '14-hour days, still feel behind', desc: 'I\'m working 14 hours a day and still feel like nothing is getting done. Everything depends on me.' },
        { emoji: '🤷', label: 'ChatGPT doesn\'t actually help MY business', desc: 'I\'ve tried ChatGPT. I watched YouTube tutorials. I still don\'t know how to make AI work for my specific business.' },
      ]}
      beforeAfter={[
        { before: '847 unread WhatsApp messages — lost leads, missed follow-ups, revenue leaking daily', after: 'Auto-replies handle FAQs, leads are captured, follow-up sequences run automatically' },
        { before: '7 disconnected tools — manual copy-paste between them every morning', after: '1 central AI Business OS — everything connected, automated, and visible' },
        { before: 'No dashboard — you need to ask 5 people to understand your own business', after: 'Real-time business visibility in 60 seconds — revenue, leads, tasks, team status' },
      ]}
      solutions={[
        { icon: '📱', title: 'WhatsApp AI System', desc: 'Auto-replies, lead capture, FAQ handling, and follow-up sequences — your WhatsApp works even when you\'re asleep.' },
        { icon: '🗂️', title: 'Business OS in Notion', desc: 'Clients, tasks, finance, team, and dashboards — everything in one place, interconnected and searchable.' },
        { icon: '🔄', title: 'Workflow Automation', desc: 'We eliminate your 3–5 most painful daily manual tasks with n8n or Zapier automations.' },
        { icon: '📊', title: 'Business Dashboard', desc: 'See revenue, leads, tasks, and team status in 60 seconds — so you\'re always in control without micromanaging.' },
      ]}
      relevantServices={[
        { href: '/services/ai-sprint', label: 'AI Sprint (full OS)', price: '৳25,000–50,000' },
        { href: '/services/ai-retainer', label: 'AI Retainer', price: '৳20,000/month' },
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
      ]}
      finalCtaHeadline="Ready to run your business — not be run by it?"
      faqs={[
        { q: 'My business is small — am I too early for this?', a: 'No. The earlier you build systems, the faster you grow. We\'ve built AI OSes for businesses doing ৳50,000/month and ৳5 million/month. Scale doesn\'t determine readiness — chaos does.' },
        { q: 'I tried ChatGPT but didn\'t see results. How is this different?', a: 'ChatGPT is a tool. We build systems. One session with ChatGPT doesn\'t change your business — a custom AI operating system does. It\'s the difference between buying a hammer and having a house built.' },
        { q: 'What if I have staff who aren\'t tech-savvy?', a: 'We design for the least technical member of your team. If they can use WhatsApp, they can use the systems we build. Training is included.' },
        { q: 'How long before I see ROI?', a: 'Most SME Sprint clients report time savings within the first week. Revenue impact (from better follow-up and lead capture) typically shows in weeks 2–4.' },
        { q: 'What industries have you worked with?', a: 'F-commerce, retail, consulting, construction, education, healthcare, food delivery, events, and more. We adapt our systems to your specific business model.' },
      ]}
    />
  );
}
