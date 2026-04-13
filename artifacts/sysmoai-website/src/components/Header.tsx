import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, MessageCircle } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';

const WA_LINK = "https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%27m%20interested%20in%20your%20AI%20services.";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0B0F]/80 backdrop-blur-[12px] shadow-[0_1px_0_rgba(255,255,255,0.05)]'
          : 'bg-[#0A0B0F] border-b border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <SYSmoAILogo size={36} />
            <SYSmoAIWordmark darkMode={true} />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map(link => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors group ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#3B82F6] rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(37,211,102,0.35)]"
              data-testid="link-header-whatsapp"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0A0B0F] border-b border-gray-800 px-4 pt-2 pb-6 space-y-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                location === link.href
                  ? 'text-white bg-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
              data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 pb-2 px-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3 rounded-full font-semibold transition-colors w-full"
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-header-whatsapp"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
