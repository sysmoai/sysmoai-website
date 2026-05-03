import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  useListAuditRequests,
  exportAuditRequests,
  type ListAuditRequestsParams,
} from "@workspace/api-client-react";
import { SubmissionListShell } from "@/components/SubmissionListShell";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, describeApiError } from "@/lib/format";
import type { SubmissionStatusValue } from "@/lib/format";
import { Pagination } from "@/components/Pagination";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  f_commerce: "F-Commerce",
  service: "Service",
  agency: "Agency",
  other: "Other",
};

type SortByField = "monthlyOrders" | "dailyDmVolume";
type SortOrder = "asc" | "desc";

function SortIcon({ active, order }: { active: boolean; order: SortOrder }) {
  if (!active) return <ChevronsUpDown className="inline ml-1 w-3 h-3 opacity-40" />;
  return order === "asc"
    ? <ChevronUp className="inline ml-1 w-3 h-3 text-accent" />
    : <ChevronDown className="inline ml-1 w-3 h-3 text-accent" />;
}

export function AuditsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<SubmissionStatusValue | "all">("all");
  const [businessTypeFilter, setBusinessTypeFilter] = useState<string>("all");
  const [usesBkashFilter, setUsesBkashFilter] = useState<string>("all");
  const [currencyFilter, setCurrencyFilter] = useState<string>("all");
  const [monthlyOrdersFilter, setMonthlyOrdersFilter] = useState<string>("all");
  const [dailyDmFilter, setDailyDmFilter] = useState<string>("all");
  const [toolsSearch, setToolsSearch] = useState<string>("");
  const [debouncedToolsSearch, setDebouncedToolsSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortByField | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedToolsSearch(toolsSearch); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [toolsSearch]);

  const params: ListAuditRequestsParams = {
    page,
    pageSize: 25,
    ...(status !== "all" ? { status } : {}),
    ...(businessTypeFilter !== "all"
      ? { businessType: businessTypeFilter as "f_commerce" | "service" | "agency" | "other" }
      : {}),
    ...(usesBkashFilter !== "all"
      ? { usesBkashNagad: usesBkashFilter as "yes" | "no" | "mix" }
      : {}),
    ...(currencyFilter !== "all"
      ? { preferredCurrency: currencyFilter as "BDT" | "USD" }
      : {}),
    ...(monthlyOrdersFilter !== "all"
      ? { monthlyOrders: monthlyOrdersFilter as "<50" | "50-200" | "200-1000" | "1000+" }
      : {}),
    ...(dailyDmFilter !== "all"
      ? { dailyDmVolume: dailyDmFilter as "<20" | "20-100" | "100-500" | "500+" }
      : {}),
    ...(debouncedToolsSearch ? { currentToolsSearch: debouncedToolsSearch } : {}),
    ...(sortBy ? { sortBy, sortOrder } : {}),
  };
  const list = useListAuditRequests(params);

  const items = list.data?.items ?? [];
  const pg = list.data?.pagination;

  const handleSort = (field: SortByField) => {
    if (sortBy === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const resetFilter = () => { setPage(1); };

  return (
    <SubmissionListShell
      title="Free audit requests"
      subtitle="Founders booking the 30-minute AI audit."
      fetchCsv={() => exportAuditRequests()}
      csvFilename="audit-requests"
      status={status}
      onStatusChange={(s) => { setStatus(s); setPage(1); }}
      isLoading={list.isLoading}
      isError={list.isError}
      errorMessage={describeApiError(list.error)}
      isEmpty={!list.isLoading && items.length === 0}
      emptyLabel="No audit requests match this filter yet."
    >
      {/* Filter row */}
      <div className="px-4 pb-3 flex flex-col gap-2">
        {/* Business type */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Biz type:</span>
          {["all", "f_commerce", "service", "agency", "other"].map((bt) => (
            <button
              key={bt}
              onClick={() => { setBusinessTypeFilter(bt); resetFilter(); }}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                businessTypeFilter === bt
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {bt === "all" ? "All" : (BUSINESS_TYPE_LABELS[bt] ?? bt)}
            </button>
          ))}
        </div>
        {/* bKash/Nagad + currency filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">bKash/Nagad:</span>
            {["all", "yes", "mix", "no"].map((v) => (
              <button key={v} onClick={() => { setUsesBkashFilter(v); resetFilter(); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  usesBkashFilter === v
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >{v === "all" ? "All" : v === "yes" ? "Yes" : v === "mix" ? "Mix" : "No"}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Currency:</span>
            {["all", "BDT", "USD"].map((v) => (
              <button key={v} onClick={() => { setCurrencyFilter(v); resetFilter(); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  currencyFilter === v
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >{v}</button>
            ))}
          </div>
        </div>
        {/* Tools search */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Tools:</span>
          <input
            type="text"
            value={toolsSearch}
            onChange={(e) => setToolsSearch(e.target.value)}
            placeholder="Search tools (e.g. Manychat, Excel…)"
            className="px-3 py-1 rounded-lg text-xs border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-64"
          />
          {toolsSearch && (
            <button onClick={() => setToolsSearch("")} className="text-xs text-muted-foreground hover:text-foreground">✕ clear</button>
          )}
        </div>
        {/* Volume bucket filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Orders/mo:</span>
            {["all", "<50", "50-200", "200-1000", "1000+"].map((v) => (
              <button key={v} onClick={() => { setMonthlyOrdersFilter(v); resetFilter(); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  monthlyOrdersFilter === v
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >{v === "all" ? "All" : v}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">DMs/day:</span>
            {["all", "<20", "20-100", "100-500", "500+"].map((v) => (
              <button key={v} onClick={() => { setDailyDmFilter(v); resetFilter(); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  dailyDmFilter === v
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >{v === "all" ? "All" : v}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Biz type</th>
              <th
                className="px-4 py-3 font-medium cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => handleSort("monthlyOrders")}
              >
                Monthly orders <SortIcon active={sortBy === "monthlyOrders"} order={sortOrder} />
              </th>
              <th
                className="px-4 py-3 font-medium cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => handleSort("dailyDmVolume")}
              >
                Daily DMs <SortIcon active={sortBy === "dailyDmVolume"} order={sortOrder} />
              </th>
              <th className="px-4 py-3 font-medium">bKash/Nagad</th>
              <th className="px-4 py-3 font-medium">Currency</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((row) => (
              <tr
                key={row.id}
                className="hover-elevate"
                data-testid={`row-audit-${row.id}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDate(row.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                <td className="px-4 py-3">
                  {row.businessType ? (
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        row.businessType === "f_commerce"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {BUSINESS_TYPE_LABELS[row.businessType] ?? row.businessType}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {row.monthlyOrders ? volumeBadge(row.monthlyOrders, ["<50", "50-200", "200-1000", "1000+"]) : <span className="text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3">
                  {row.dailyDmVolume ? volumeBadge(row.dailyDmVolume, ["<20", "20-100", "100-500", "500+"]) : <span className="text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.usesBkashNagad ?? "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.preferredCurrency ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/audits/${row.id}`}>
                    <a
                      className="text-accent hover:underline text-xs"
                      data-testid={`link-audit-${row.id}`}
                    >
                      View
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pg && pg.totalPages > 1 && (
        <Pagination
          page={pg.page}
          totalPages={pg.totalPages}
          onPageChange={setPage}
        />
      )}
    </SubmissionListShell>
  );
}

function volumeBadge(val: string, buckets: string[]) {
  const idx = buckets.indexOf(val);
  const color =
    idx === -1
      ? "text-muted-foreground"
      : idx >= buckets.length - 2
        ? "text-emerald-600 font-semibold dark:text-emerald-400"
        : "text-muted-foreground";
  return <span className={color}>{val}</span>;
}
