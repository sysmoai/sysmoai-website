import { Link } from "wouter";
import { ArrowRight, MessageSquare, ClipboardCheck, Users } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import {
  useGetAdminSummary,
  useListContactSubmissions,
  useListAuditRequests,
  useListWaitlistSignups,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardPage() {
  const summary = useGetAdminSummary();
  const recentContacts = useListContactSubmissions({ pageSize: 5 });
  const recentAudits = useListAuditRequests({ pageSize: 5 });
  const recentWaitlist = useListWaitlistSignups({ pageSize: 5 });

  const cards = [
    {
      label: "Contact submissions",
      counts: summary.data?.contactSubmissions,
      icon: MessageSquare,
      href: "/contacts",
      testId: "card-contacts",
    },
    {
      label: "Audit requests",
      counts: summary.data?.auditRequests,
      icon: ClipboardCheck,
      href: "/audits",
      testId: "card-audits",
    },
    {
      label: "Waitlist signups",
      counts: summary.data?.waitlistSignups,
      icon: Users,
      href: "/waitlist",
      testId: "card-waitlist",
    },
  ];

  return (
    <AdminShell
      title="Overview"
      subtitle="Inbound leads from the SYSmoAI website."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <a className="block group">
              <Card
                className="hover-elevate transition-colors"
                data-testid={c.testId}
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {c.label}
                  </CardTitle>
                  <c.icon className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold tracking-tight">
                      {summary.isLoading ? (
                        <Skeleton className="h-8 w-12" />
                      ) : (
                        (c.counts?.total ?? 0).toLocaleString()
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {summary.isLoading
                        ? ""
                        : `${(c.counts?.new ?? 0).toLocaleString()} new`}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center text-xs text-accent group-hover:underline">
                    View all <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mt-6">
        <RecentList
          title="Recent contacts"
          href="/contacts"
          items={recentContacts.data?.items?.map((c) => ({
            id: c.id,
            primary: c.name,
            secondary: c.contact,
            tertiary: c.message,
            createdAt: c.createdAt,
            status: c.status,
          }))}
          isLoading={recentContacts.isLoading}
          itemHrefPrefix="/contacts"
          testIdPrefix="recent-contact"
        />
        <RecentList
          title="Recent audits"
          href="/audits"
          items={recentAudits.data?.items?.map((a) => ({
            id: a.id,
            primary: a.name,
            secondary: a.email,
            tertiary: a.biggestChallenge,
            createdAt: a.createdAt,
            status: a.status,
          }))}
          isLoading={recentAudits.isLoading}
          itemHrefPrefix="/audits"
          testIdPrefix="recent-audit"
        />
        <RecentList
          title="Recent waitlist"
          href="/waitlist"
          items={recentWaitlist.data?.items?.map((w) => ({
            id: w.id,
            primary: w.email,
            secondary: w.name ?? null,
            tertiary: w.source ?? null,
            createdAt: w.createdAt,
            status: w.status,
          }))}
          isLoading={recentWaitlist.isLoading}
          itemHrefPrefix="/waitlist"
          testIdPrefix="recent-waitlist"
        />
      </div>
    </AdminShell>
  );
}

interface RecentItem {
  id: number;
  primary: string;
  secondary: string | null;
  tertiary: string | null;
  createdAt: string;
  status: string;
}

function RecentList({
  title,
  href,
  items,
  isLoading,
  itemHrefPrefix,
  testIdPrefix,
}: {
  title: string;
  href: string;
  items: RecentItem[] | undefined;
  isLoading: boolean;
  itemHrefPrefix: string;
  testIdPrefix: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{title}</CardTitle>
        <Link href={href}>
          <a className="text-xs text-accent hover:underline">View all</a>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        ) : items && items.length > 0 ? (
          items.map((it) => (
            <Link key={it.id} href={`${itemHrefPrefix}/${it.id}`}>
              <a
                className="block rounded-md p-3 -mx-1 hover-elevate"
                data-testid={`${testIdPrefix}-${it.id}`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="text-sm font-medium truncate">{it.primary}</p>
                  <StatusBadge status={it.status} />
                </div>
                {it.secondary && (
                  <p className="text-xs text-muted-foreground truncate">
                    {it.secondary}
                  </p>
                )}
                {it.tertiary && (
                  <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">
                    {it.tertiary}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground/70 mt-1">
                  {formatDate(it.createdAt)}
                </p>
              </a>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
