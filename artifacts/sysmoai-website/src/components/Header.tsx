import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, MessageCircle } from 'lucide-react';
import { SYSmoAILogo } from './SYSmoAILogo';
import { SYSmoAIWordmark } from './SYSmoAIWordmark';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="bg-[#0A0B0F] sticky top-0 z-40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <SYSmoAILogo size={36} />
            <SYSmoAIWordmark darkMode={true} />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {links.map(link => (
              <Link 
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#60A5FA] ${
                  location === link.href ? 'text-white' : 'text-gray-300'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/8801711638693" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-5 py-2.5 rounded-full font-semibold transition-colors"
              data-testid="link-header-whatsapp"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0A0B0F] border-b border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-3 text-base font-medium rounded-md ${
                  location === link.href ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-3">
              <a 
                href="https://wa.me/8801711638693" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-3 rounded-full font-semibold transition-colors w-full"
                data-testid="link-mobile-header-whatsapp"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
