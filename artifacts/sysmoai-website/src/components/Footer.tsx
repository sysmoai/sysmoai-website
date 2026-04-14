import React from 'react';
import { Link } from 'wouter';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';
import { WA_LINK, EMAIL } from '@/lib/config';

export function Footer() {
  return (
    <footer className="bg-[#0A0B0F] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <SYSmoAILogo size={32} />
              <SYSmoAIWordmark darkMode={true} />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered operating systems for ambitious businesses.
            </p>
            <p className="text-slate-500 text-sm">🇧🇩 Bangladesh · Serving clients worldwide</p>
          </div>

          {/* Column 2 — Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/services/ai-quick-win', label: 'AI Quick Win' },
                { href: '/services/ai-sprint', label: 'AI Sprint' },
                { href: '/services/ai-retainer', label: 'AI Retainer' },
                { href: '/services/notion-os', label: 'Notion OS Build' },
                { href: '/services/ai-agent-dev', label: 'AI Agent Dev' },
                { href: '/services/n8n-automation', label: 'n8n Automation' },
                { href: '/services/ai-coaching', label: '1:1 AI Coaching' },
                { href: '/services/corporate-training', label: 'Corporate Training' },
                { href: '/services/international', label: 'International Clients' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Who We Help + Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Who We Help</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/for/students', label: 'Students' },
                { href: '/for/job-seekers', label: 'Job Seekers' },
                { href: '/for/freelancers', label: 'Freelancers' },
                { href: '/for/sme-founders', label: 'SME Founders' },
                { href: '/for/f-commerce', label: 'F-Commerce Sellers' },
                { href: '/for/agencies', label: 'Digital Agencies' },
                { href: '/for/consultants', label: 'Consultants' },
                { href: '/for/creators', label: 'Content Creators' },
                { href: '/for/corporates', label: 'Corporates' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider pt-2">Resources</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/proof', label: 'Case Studies' },
                { href: '/blog', label: 'Blog' },
                { href: '/faq', label: 'FAQ' },
                { href: '/pricing', label: 'Pricing' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  data-testid="link-footer-email"
                >
                  <Mail size={14} />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                  data-testid="link-footer-whatsapp"
                >
                  <MessageCircle size={14} />
                  +880 1711-638693
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                Dhaka, Bangladesh
              </li>
            </ul>
            <p className="text-xs text-slate-500 leading-relaxed pt-2">
              Service hours: 10 AM – Midnight (BST)<br />
              Reply within 2 hours on working days.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-500">© 2026 SYSmoAI · Made in Bangladesh 🇧🇩</p>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
