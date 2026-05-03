import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MessageSquare,
  ClipboardCheck,
  Users,
  LogOut,
  Zap,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/audits", label: "Audits", icon: ClipboardCheck },
  { href: "/waitlist", label: "Waitlist", icon: Users },
  { href: "/sprint-availability", label: "Sprint slots", icon: Zap },
] as const;

interface AdminShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminShell({ title, subtitle, actions, children }: AdminShellProps) {
  const [location] = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="min-h-screen w-full flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Link href="/">
            <a className="flex items-center gap-2" data-testid="sidebar-logo">
              <img src={`${basePath}/logo.svg`} alt="SYSmoAI" className="h-7 w-auto" />
            </a>
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            Founder console
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? location === "/" || location === ""
                : location === item.href || location.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors " +
                    (isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground")
                  }
                >
                  <Icon className="h-4 w-4 opacity-80" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-muted-foreground truncate">
              Signed in as
            </p>
            <p
              className="text-sm font-medium truncate"
              data-testid="text-current-user"
            >
              {user?.primaryEmailAddress?.emailAddress ?? user?.id ?? "—"}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            data-testid="button-sign-out"
            className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-6 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
