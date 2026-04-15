import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { CookieConsent } from "@/components/CookieConsent";

import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
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

const Fallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
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
            <Route path="/faq" component={FAQ} />
            <Route path="/blog" component={Blog} />
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
