import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { useSeo } from "@/hooks/useSeo";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { CookieConsent } from "@/components/CookieConsent";
import StickyCTA from "@/components/StickyCTA";
import { RedirectTo } from "@/components/RedirectTo";
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
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/legal/TermsOfService"));
const RefundPolicy = lazy(() => import("@/pages/legal/RefundPolicy"));
const AnswersList = lazy(() => import("@/pages/answers/AnswersList"));
const AnswerPost = lazy(() => import("@/pages/answers/AnswerPost"));
const FreeAudit = lazy(() => import("@/pages/FreeAudit"));

// Anchor services
const ServiceAISprint = lazy(() => import("@/pages/services/AISprint"));
const ServiceAIRetainer = lazy(() => import("@/pages/services/AIRetainer"));
const ServiceAIQuickWin = lazy(() => import("@/pages/services/AIQuickWin"));
const ServiceInternational = lazy(() => import("@/pages/services/International"));
const ServiceOtherEngagements = lazy(() => import("@/pages/services/OtherEngagements"));

// Primary audience page
const ForFCommerce = lazy(() => import("@/pages/for/FCommerce"));

const queryClient = new QueryClient();

const Fallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">Loading…</div>
);

function SeoHead() {
  useSeo();
  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <SeoHead />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path="/" component={Home} />

            {/* Services */}
            <Route path="/services" component={Services} />
            <Route path="/services/ai-sprint" component={ServiceAISprint} />
            <Route path="/services/ai-retainer" component={ServiceAIRetainer} />
            <Route path="/services/ai-quick-win" component={ServiceAIQuickWin} />
            <Route path="/services/international" component={ServiceInternational} />
            <Route path="/services/other-engagements" component={ServiceOtherEngagements} />

            {/* Legacy service slugs → Other Engagements hub */}
            <Route path="/services/ai-coaching">
              <RedirectTo to="/services/other-engagements" />
            </Route>
            <Route path="/services/group-workshop">
              <RedirectTo to="/services/other-engagements" />
            </Route>
            <Route path="/services/notion-os">
              <RedirectTo to="/services/other-engagements" />
            </Route>
            <Route path="/services/ai-agent-dev">
              <RedirectTo to="/services/other-engagements" />
            </Route>
            <Route path="/services/n8n-automation">
              <RedirectTo to="/services/other-engagements" />
            </Route>
            <Route path="/services/corporate-training">
              <RedirectTo to="/services/other-engagements" />
            </Route>

            {/* Primary audience page */}
            <Route path="/for/f-commerce" component={ForFCommerce} />

            {/* Demoted audience pages → blog or wedge */}
            <Route path="/for/sme-founders">
              <RedirectTo to="/for/f-commerce" />
            </Route>
            <Route path="/for/students">
              <RedirectTo to="/blog?group=students" />
            </Route>
            <Route path="/for/job-seekers">
              <RedirectTo to="/blog?group=job-seekers" />
            </Route>
            <Route path="/for/freelancers">
              <RedirectTo to="/blog?group=freelancers" />
            </Route>
            <Route path="/for/researchers">
              <RedirectTo to="/blog?group=researchers" />
            </Route>
            <Route path="/for/agencies">
              <RedirectTo to="/blog?group=agencies" />
            </Route>
            <Route path="/for/consultants">
              <RedirectTo to="/blog?group=consultants" />
            </Route>
            <Route path="/for/creators">
              <RedirectTo to="/blog?group=creators" />
            </Route>
            <Route path="/for/corporates">
              <RedirectTo to="/blog?group=corporates" />
            </Route>

            {/* Core pages */}
            <Route path="/about" component={About} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/proof" component={Proof} />
            <Route path="/results" component={Proof} />
            <Route path="/faq" component={FAQ} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/answers" component={AnswersList} />
            <Route path="/answers/:slug" component={AnswerPost} />
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
