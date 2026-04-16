import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useState } from "react";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { CookieConsent } from "@/components/CookieConsent";
import StickyCTA from "@/components/StickyCTA";

import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Proof = lazy(() => import("@/pages/Proof"));
const FAQ = lazy(() => import("@/pages/FAQ"));

const ServiceAIQuickWin = lazy(() => import("@/pages/services/AIQuickWin"));
const ServiceAISprint = lazy(() => import("@/pages/services/AISprint"));
const ServiceAIRetainer = lazy(() => import("@/pages/services/AIRetainer"));
const ServiceAICoaching = lazy(() => import("@/pages/services/AICoaching"));
const ServiceGroupWorkshop = lazy(() => import("@/pages/services/GroupWorkshop"));
const ServiceNotionOS = lazy(() => import("@/pages/services/NotionOS"));
const ServiceAIAgentDev = lazy(() => import("@/pages/services/AIAgentDev"));
const ServiceN8nAutomation = lazy(() => import("@/pages/services/N8nAutomation"));
const ServiceCorporateTraining = lazy(() => import("@/pages/services/CorporateTraining"));
const ServiceInternational = lazy(() => import("@/pages/services/International"));

const ForStudents = lazy(() => import("@/pages/for/Students"));
const ForJobSeekers = lazy(() => import("@/pages/for/JobSeekers"));
const ForFreelancers = lazy(() => import("@/pages/for/Freelancers"));
const ForResearchers = lazy(() => import("@/pages/for/Researchers"));
const ForAgencies = lazy(() => import("@/pages/for/Agencies"));
const ForSMEFounders = lazy(() => import("@/pages/for/SMEFounders"));
const ForFCommerce = lazy(() => import("@/pages/for/FCommerce"));
const ForConsultants = lazy(() => import("@/pages/for/Consultants"));
const ForCreators = lazy(() => import("@/pages/for/Creators"));
const ForCorporates = lazy(() => import("@/pages/for/Corporates"));

const FreeAudit = lazy(() => import("@/pages/FreeAudit"));

const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/legal/TermsOfService"));
const RefundPolicy = lazy(() => import("@/pages/legal/RefundPolicy"));

const queryClient = new QueryClient();

// Official SYSmoAI 3-layer hexagonal mark — inline SVG, zero dependency
const PATHS = {
  l1: 'M25 34 L50 24 L75 34 L75 54 L50 64 L25 54 Z',
  l2: 'M30 49 L50 40 L70 49 L70 64 L50 73 L30 64 Z',
  l3: 'M40 61 L50 56 L60 61 L60 71 L50 76 L40 71 Z',
};

const Fallback = () => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
    }}
  >
    {/* Breathing logo mark */}
    <svg
      width={48}
      height={48}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'sysmo-pulse 1.8s ease-in-out infinite',
        filter: 'drop-shadow(0 0 10px rgba(37,99,235,0.4))',
      }}
    >
      <style>{`
        @keyframes sysmo-pulse {
          0%,100% { opacity:.75; transform:scale(1); }
          50% { opacity:1; transform:scale(1.06); filter:drop-shadow(0 0 18px rgba(59,130,246,.65)); }
        }
      `}</style>
      <path d={PATHS.l1} fill="#1E3A8A" fillOpacity={.30} stroke="#2563EB" strokeOpacity={.60} strokeWidth={2.5} strokeLinejoin="round"/>
      <path d={PATHS.l2} fill="#2563EB" fillOpacity={.50} stroke="#3B82F6" strokeOpacity={.80} strokeWidth={2.5} strokeLinejoin="round"/>
      <path d={PATHS.l3} fill="#3B82F6" fillOpacity={1}   stroke="#60A5FA" strokeOpacity={1}   strokeWidth={2.5} strokeLinejoin="round"/>
    </svg>
    {/* Thin progress bar */}
    <div style={{ width: 56, height: 2, borderRadius: 99, overflow: 'hidden', background: 'rgba(148,163,184,0.12)' }}>
      <div style={{
        height: '100%',
        borderRadius: 99,
        background: 'linear-gradient(90deg,#2563EB,#60A5FA)',
        animation: 'sysmo-bar 1s ease-in-out infinite alternate',
      }}/>
      <style>{`
        @keyframes sysmo-bar {
          from { width:15%; margin-left:0; }
          to   { width:55%; margin-left:30%; }
        }
      `}</style>
    </div>
  </div>
);

function SEOManager() {
  const [location] = useLocation();

  useEffect(() => {
    const existingSchema = document.querySelector('script[data-schema="organization"]');
    if (!existingSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'organization');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SYSmoAI",
        "url": "https://sysmoai.com",
        "description": "AI Systems Consultancy — Dhaka, Bangladesh. Custom AI automation, Notion OS, AI agents for businesses worldwide.",
        "founder": {
          "@type": "Person",
          "name": "Emon Hossain",
          "jobTitle": "AI Systems Architect & Founder",
          "url": "https://sysmoai.com/about"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dhaka",
          "addressCountry": "BD"
        },
        "telephone": "+8801711638693",
        "email": "hello@sysmoai.com",
        "sameAs": [
          "https://www.facebook.com/sysmoai",
          "https://www.linkedin.com/company/sysmoai",
          "https://www.youtube.com/@sysmoai"
        ]
      });
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = 'https://sysmoai.com' + location;
  }, [location]);

  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

// Prefetch all lazy routes during idle time so navigation feels instant
const lazyModules = [
  () => import("@/pages/Services"),
  () => import("@/pages/About"),
  () => import("@/pages/Contact"),
  () => import("@/pages/Blog"),
  () => import("@/pages/Pricing"),
  () => import("@/pages/FreeAudit"),
  () => import("@/pages/for/Freelancers"),
  () => import("@/pages/for/Students"),
  () => import("@/pages/for/JobSeekers"),
  () => import("@/pages/for/Agencies"),
  () => import("@/pages/for/SMEFounders"),
  () => import("@/pages/services/AIQuickWin"),
  () => import("@/pages/services/AISprint"),
  () => import("@/pages/services/AIRetainer"),
  () => import("@/pages/services/NotionOS"),
  () => import("@/pages/services/AIAgentDev"),
  () => import("@/pages/services/N8nAutomation"),
];

function IdlePrefetch() {
  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) {
      const ids: number[] = lazyModules.map((fn, i) =>
        ric(() => { fn(); }, { timeout: 3000 + i * 200 })
      );
      return () => {
        const cric = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (cric) ids.forEach((id) => cric(id));
      };
    } else {
      const timers = lazyModules.map((fn, i) =>
        setTimeout(fn, 2000 + i * 150)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, []);
  return null;
}

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <SEOManager />
      <ScrollToTop />
      <IdlePrefetch />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/services/ai-quick-win" component={ServiceAIQuickWin} />
            <Route path="/services/ai-sprint" component={ServiceAISprint} />
            <Route path="/services/ai-retainer" component={ServiceAIRetainer} />
            <Route path="/services/ai-coaching" component={ServiceAICoaching} />
            <Route path="/services/group-workshop" component={ServiceGroupWorkshop} />
            <Route path="/services/notion-os" component={ServiceNotionOS} />
            <Route path="/services/ai-agent-dev" component={ServiceAIAgentDev} />
            <Route path="/services/n8n-automation" component={ServiceN8nAutomation} />
            <Route path="/services/corporate-training" component={ServiceCorporateTraining} />
            <Route path="/services/international" component={ServiceInternational} />
            <Route path="/for/students" component={ForStudents} />
            <Route path="/for/job-seekers" component={ForJobSeekers} />
            <Route path="/for/freelancers" component={ForFreelancers} />
            <Route path="/for/researchers" component={ForResearchers} />
            <Route path="/for/agencies" component={ForAgencies} />
            <Route path="/for/sme-founders" component={ForSMEFounders} />
            <Route path="/for/f-commerce" component={ForFCommerce} />
            <Route path="/for/consultants" component={ForConsultants} />
            <Route path="/for/creators" component={ForCreators} />
            <Route path="/for/corporates" component={ForCorporates} />
            <Route path="/about" component={About} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/proof" component={Proof} />
            <Route path="/results" component={Proof} />
            <Route path="/faq" component={FAQ} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/contact" component={Contact} />
            <Route path="/free-ai-audit" component={FreeAudit} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/refund-policy" component={RefundPolicy} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFAB />
      <StickyCTA />
      <CookieConsent />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
