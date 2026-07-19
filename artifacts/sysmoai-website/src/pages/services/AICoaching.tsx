import { Users } from 'lucide-react';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';

export default function AICoaching() {
  return (
    <ServicePageTemplate
      metaTitle="1:1 AI Coaching Sessions Bangladesh | SYSmoAI"
      icon={Users}
      title="1:1 AI Coaching"
      headline="60 Minutes With an AI Expert. Built Around Your Exact Situation."
      bdPrice="৳2,500/session"
      whatItIs="A 60-minute live, personalized coaching session where we work on your specific AI challenge — not a generic tutorial. Whether you want to learn prompting, automate one thing, set up a tool, or get unstuck on an AI project, we focus 100% on your situation. No fluff. No theory without practice."
      deliverables={[
        '60-minute live session (Zoom or Google Meet)',
        'Full session recording sent within 24 hours',
        'Written action plan — specific next steps',
        'Follow-up Q&A via WhatsApp for 3 days',
        'Recommended tools and resources for your goal',
      ]}
      bestFor={[
        'Individuals learning AI for the first time',
        'Students building AI skills for careers',
        'Professionals upgrading their workflow',
        'Freelancers adding AI to their services',
        'Anyone who learns best by doing, not reading',
      ]}
      beforeAfter={[
        { before: 'Watching generic YouTube tutorials that don\'t apply to your situation', after: 'A personalized session focused on YOUR tools, YOUR goals, YOUR problems' },
        { before: 'Trial and error for weeks on the wrong AI tools', after: 'Clarity on exactly what to learn, in what order, for your specific goal' },
        { before: 'AI knowledge scattered, nothing applied to real work', after: 'Walk away with an action plan and a working example from the session' },
      ]}
      steps={[
        { title: 'Pre-Session Form', desc: 'You fill out a short form about your goal, current tools, and what you want to achieve. We review it before the call.' },
        { title: 'Live 60-Min Session', desc: 'We work on your specific challenge — hands-on, screen-share, real examples. You can ask anything.' },
        { title: 'Recording + Action Plan', desc: 'Session recording sent within 24 hours. Written action plan with specific next steps. 3 days of follow-up Q&A.' },
      ]}
      faqs={[
        { q: 'What topics can we cover in a session?', a: 'Prompting, Notion setup, AI tool selection, automation basics, portfolio building, freelance AI services, research workflows, LinkedIn strategy, or any specific AI challenge you have.' },
        { q: 'Do I need any prior AI knowledge?', a: 'Zero prior knowledge needed. We start from your current level — beginner or advanced.' },
        { q: 'Can I book multiple sessions?', a: 'Yes. Many clients book 4–8 sessions as a learning journey. We offer a 4-session package at 20% discount.' },
        { q: 'What platform do we use?', a: 'Zoom or Google Meet — your choice. We share screens and work hands-on together.' },
        { q: 'How do I book?', a: 'WhatsApp us — we\'ll schedule a time within 48 hours. Payment before the session via bKash, Nagad, or Wise.' },
      ]}
      relatedServices={[
        { href: '/services/group-workshop', label: 'Group Workshop', price: '৳500/person' },
        { href: '/services/ai-quick-win', label: 'AI Quick Win', price: '৳3,750–7,500' },
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
      ]}
    />
  );
}
