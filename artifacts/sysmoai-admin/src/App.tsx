import { useEffect, useRef } from "react";
import {
  ClerkProvider,
  SignIn,
  Show,
  useClerk,
  useAuth,
} from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { dark } from "@clerk/themes";
import {
  Switch,
  Route,
  useLocation,
  Router as WouterRouter,
  Redirect,
} from "wouter";
import {
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useGetAdminMe,
  ApiError,
  getGetAdminMeQueryKey,
} from "@workspace/api-client-react";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardPage } from "@/pages/Dashboard";
import { ContactsPage } from "@/pages/Contacts";
import { ContactDetailPage } from "@/pages/ContactDetail";
import { AuditsPage } from "@/pages/Audits";
import { AuditDetailPage } from "@/pages/AuditDetail";
import { WaitlistPage } from "@/pages/Waitlist";
import { WaitlistDetailPage } from "@/pages/WaitlistDetail";
import { SprintAvailabilityPage } from "@/pages/SprintAvailability";
import { AccessDeniedPage } from "@/pages/AccessDenied";
import NotFound from "@/pages/not-found";

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const APP_NAME = "SYSmoAI Admin";

const clerkLocalization = {
  signIn: {
    start: {
      title: `Sign in to ${APP_NAME}`,
      titleCombined: `Sign in to ${APP_NAME}`,
      subtitle: "Welcome back — please sign in to continue",
      subtitleCombined: "Welcome back — please sign in to continue",
    },
    password: { title: `Sign in to ${APP_NAME}` },
    emailCode: { title: `Sign in to ${APP_NAME}` },
    emailLink: { title: `Sign in to ${APP_NAME}` },
  },
  signUp: {
    start: {
      title: `Create your ${APP_NAME} account`,
      titleCombined: `Create your ${APP_NAME} account`,
    },
  },
};

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in environment");
}

const clerkAppearance = {
  baseTheme: dark,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#60A5FA",
    colorForeground: "#F8FAFF",
    colorMutedForeground: "#94A3B8",
    colorDanger: "#F87171",
    colorBackground: "#1A1C28",
    colorInput: "#11131C",
    colorInputForeground: "#F8FAFF",
    colorNeutral: "#2A2D3D",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    borderRadius: "0.625rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox:
      "bg-[#1A1C28] border border-[#2A2D3D] rounded-2xl w-[440px] max-w-full overflow-hidden shadow-xl",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButtonText: "text-foreground",
    formFieldLabel: "text-foreground",
    footerActionLink: "text-accent hover:underline",
    footerActionText: "text-muted-foreground",
    dividerText: "text-muted-foreground",
    identityPreviewEditButton: "text-accent",
    formFieldSuccessText: "text-emerald-300",
    alertText: "text-foreground",
    logoBox: "justify-center",
    logoImage: "h-8 w-auto",
    socialButtonsBlockButton:
      "bg-[#11131C] border border-[#2A2D3D] hover:bg-[#1F2230]",
    formButtonPrimary:
      "bg-[#1E3A8A] hover:bg-[#1E40AF] text-white border border-[#1E40AF]",
    formFieldInput:
      "bg-[#11131C] border border-[#2A2D3D] text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent",
    footerAction: "bg-transparent",
    dividerLine: "bg-border",
    alert: "bg-destructive/10 border border-destructive/30",
    otpCodeFieldInput: "bg-[#11131C] border border-[#2A2D3D] text-foreground",
    formFieldRow: "space-y-1",
    main: "gap-4",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-10">
      <SignIn routing="path" path={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prev = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsub = addListener(({ user }) => {
      const id = user?.id ?? null;
      if (prev.current !== undefined && prev.current !== id) {
        qc.clear();
      }
      prev.current = id;
    });
    return unsub;
  }, [addListener, qc]);

  return null;
}

function FullScreenLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center text-sm text-muted-foreground"
      data-testid="full-screen-loader"
    >
      {label}
    </div>
  );
}

function AdminGate({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const me = useGetAdminMe({
    query: {
      queryKey: getGetAdminMeQueryKey(),
      enabled: Boolean(isLoaded && isSignedIn),
      retry: false,
    },
  });

  if (!isLoaded) return <FullScreenLoader />;
  if (!isSignedIn) return <Redirect to="/sign-in" />;
  if (me.isLoading) return <FullScreenLoader label="Verifying access…" />;

  if (me.isError) {
    const err = me.error;
    if (err instanceof ApiError && err.status === 403) {
      return <AccessDeniedPage />;
    }
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center px-4">
        <p className="text-sm text-red-400" data-testid="text-gate-error">
          Could not verify access. Please refresh.
        </p>
      </div>
    );
  }

  if (!me.data?.isAdmin) return <AccessDeniedPage />;
  return <>{children}</>;
}

function ProtectedRoutes() {
  return (
    <AdminGate>
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/contacts/:id">
          {(params) => {
            const id = Number(params.id);
            if (!Number.isFinite(id)) return <NotFound />;
            return <ContactDetailPage id={id} />;
          }}
        </Route>
        <Route path="/audits" component={AuditsPage} />
        <Route path="/audits/:id">
          {(params) => {
            const id = Number(params.id);
            if (!Number.isFinite(id)) return <NotFound />;
            return <AuditDetailPage id={id} />;
          }}
        </Route>
        <Route path="/sprint-availability" component={SprintAvailabilityPage} />
        <Route path="/waitlist" component={WaitlistPage} />
        <Route path="/waitlist/:id">
          {(params) => {
            const id = Number(params.id);
            if (!Number.isFinite(id)) return <NotFound />;
            return <WaitlistDetailPage id={id} />;
          }}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AdminGate>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      localization={clerkLocalization}
      signInUrl={`${basePath}/sign-in`}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Switch>
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?">
              <Redirect to="/sign-in" />
            </Route>
            <Route>
              <Show when="signed-out">
                <Redirect to="/sign-in" />
              </Show>
              <Show when="signed-in">
                <ProtectedRoutes />
              </Show>
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
