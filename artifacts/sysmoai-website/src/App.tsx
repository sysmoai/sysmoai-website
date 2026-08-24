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
import { RedirectTo } from "@/components/RedirectTo";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/legal/TermsOfService"));
const RefundPolicy = lazy(() => import("@/pages/legal/RefundPolicy"));

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
            <Route path="/services" component={Services} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug"><RedirectTo to="/blog" /></Route>

            {/* Historical commercial/content routes are quarantined until each claim is re-verified. */}
            <Route path="/pricing"><RedirectTo to="/services" /></Route>
            <Route path="/proof"><RedirectTo to="/services" /></Route>
            <Route path="/results"><RedirectTo to="/services" /></Route>
            <Route path="/faq"><RedirectTo to="/services" /></Route>
            <Route path="/free-ai-audit"><RedirectTo to="/contact" /></Route>
            <Route path="/answers"><RedirectTo to="/blog" /></Route>
            <Route path="/answers/:slug"><RedirectTo to="/blog" /></Route>
            <Route path="/for/f-commerce"><RedirectTo to="/services" /></Route>
            <Route path="/for/:slug"><RedirectTo to="/services" /></Route>
            <Route path="/services/:slug"><RedirectTo to="/services" /></Route>

            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/refund-policy" component={RefundPolicy} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFAB />
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
