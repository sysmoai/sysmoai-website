import { AudiencePageTemplate } from '@/components/AudiencePageTemplate';

export default function JobSeekers() {
  return (
    <AudiencePageTemplate
      metaTitle="AI Skills for Job Seekers Bangladesh | Get Hired Faster with SYSmoAI"
      segment="Job Seekers"
      heroHeadline="Companies Are Hiring People With AI Skills. You Need Them Now."
      heroSub="Rejection isn't about your degree — it's about a skills gap you can close in 30 days. SYSmoAI gets you hired."
      painPoints={[
        { emoji: '📄', label: 'Getting rejected without knowing why', desc: 'I keep getting rejected but I don\'t know why. My CV looks fine to me.' },
        { emoji: '🤷', label: 'Which AI tools actually matter?', desc: 'Everyone says learn AI but there are 100 AI tools. Which ones actually matter for jobs?' },
        { emoji: '🔗', label: 'LinkedIn ghost account', desc: 'My LinkedIn has 47 connections and 0 content. Nobody knows I exist.' },
        { emoji: '🔄', label: 'No portfolio in the new field', desc: 'I want to switch careers but I have no portfolio in the new field — zero proof.' },
        { emoji: '⏳', label: '4 months. Nothing is working.', desc: 'I\'ve been job hunting for 4 months. I apply every day. Nothing is working.' },
        { emoji: '📊', label: 'No AI experience for interviewers', desc: 'Interviewers ask about AI experience. I don\'t have any. The conversation ends there.' },
      ]}
      beforeAfter={[
        { before: 'CV ignored by 50 companies — same template as 10,000 other applicants', after: 'CV with AI skills, measurable results, and a portfolio link — getting shortlisted' },
        { before: 'LinkedIn ghost account — 0 posts, 47 connections, invisible to recruiters', after: 'Active LinkedIn with posts, keyword-optimized profile, getting recruiter messages' },
        { before: 'No portfolio — "I can do this but I have no proof" in interviews', after: 'Real AI projects built during coaching to show in interviews with confidence' },
      ]}
      solutions={[
        { icon: '📝', title: 'AI-Powered CV Overhaul', desc: 'Rewritten to pass ATS (Applicant Tracking Systems) and impress human reviewers — with AI skills prominently featured.' },
        { icon: '🔗', title: 'LinkedIn Profile Build', desc: 'Headline, about section, featured projects, and a posting strategy that gets recruiter attention.' },
        { icon: '🗂️', title: 'Portfolio Creation', desc: 'We build you real AI project samples relevant to your target role — proof you can show in interviews.' },
        { icon: '🎯', title: 'Career AI Roadmap', desc: 'A 30-day AI skills learning plan tailored specifically to your target role and industry.' },
      ]}
      relevantServices={[
        { href: '/services/ai-coaching', label: '1:1 AI Coaching', price: '৳2,500/session' },
        { href: '/services/notion-os', label: 'Notion OS Build', price: '৳15,000–50,000' },
        { href: '/services/group-workshop', label: 'Group Workshop', price: '৳500/person' },
      ]}
      finalCtaHeadline="Ready to get hired with AI skills?"
      faqs={[
        { q: 'Will this actually help me get hired faster?', a: 'Yes. Our clients who complete CV + LinkedIn work see interview invitations within 2–4 weeks. AI skills are the single biggest differentiator in today\'s market.' },
        { q: 'What if I\'m switching industries entirely?', a: 'Career switchers are our specialty. We build portfolio projects in the new field so you have proof before you have experience.' },
        { q: 'Which AI skills are most in demand right now?', a: 'Prompt engineering, AI-assisted content production, workflow automation (n8n/Zapier), and AI research tools. We\'ll map the exact skills for your target role.' },
        { q: 'How long does the CV + LinkedIn work take?', a: '5–7 business days for a complete overhaul. We send drafts for your review before finalizing.' },
        { q: 'Do you offer any guarantees?', a: 'We guarantee that your CV will be significantly improved. We cannot guarantee job placement — but our clients\' results speak for themselves.' },
      ]}
    />
  );
}
