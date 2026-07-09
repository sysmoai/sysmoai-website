import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListCitationQueries,
  useListCitationChecks,
  useCreateCitationCheck,
  useDeleteCitationCheck,
  getListCitationQueriesQueryKey,
  getListCitationChecksQueryKey,
  type CitationQuery,
  type ListCitationChecksParams,
} from "@workspace/api-client-react";
import { AdminShell } from "@/components/AdminShell";
import { Pagination } from "@/components/Pagination";
import { formatDate, describeApiError } from "@/lib/format";

const ENGINES = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "perplexity", label: "Perplexity" },
  { value: "google_ai_overviews", label: "Google AI Overviews" },
  { value: "bing_copilot", label: "Bing Copilot" },
  { value: "other", label: "Other" },
] as const;

type EngineValue = (typeof ENGINES)[number]["value"];

function engineLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return ENGINES.find((e) => e.value === value)?.label ?? value;
}

function priorityBadge(priority: string) {
  const cls =
    priority === "critical"
      ? "bg-red-500/15 text-red-300 border border-red-500/30"
      : priority === "high"
        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
        : "bg-zinc-500/15 text-zinc-300 border border-zinc-500/30";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${cls}`}
    >
      {priority}
    </span>
  );
}

function citedBadge(cited: boolean | null | undefined) {
  if (cited === null || cited === undefined) {
    return (
      <span className="inline-block rounded px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground border border-border">
        Not checked
      </span>
    );
  }
  return cited ? (
    <span className="inline-block rounded px-2 py-0.5 text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
      Cited
    </span>
  ) : (
    <span className="inline-block rounded px-2 py-0.5 text-[11px] font-medium bg-red-500/15 text-red-300 border border-red-500/30">
      Not cited
    </span>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CitationsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const queries = useListCitationQueries();
  const params: ListCitationChecksParams = { page, pageSize: 25 };
  const checks = useListCitationChecks(params);
  const createCheck = useCreateCitationCheck();
  const deleteCheck = useDeleteCitationCheck();

  const [checkedOn, setCheckedOn] = useState(todayISO());
  const [engine, setEngine] = useState<EngineValue>("chatgpt");
  const [queryChoice, setQueryChoice] = useState<string>("");
  const [customQuery, setCustomQuery] = useState("");
  const [cited, setCited] = useState(false);
  const [urlCited, setUrlCited] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const targetQueries = queries.data ?? [];
  const items = checks.data?.items ?? [];
  const pg = checks.data?.pagination;

  const invalidate = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: getListCitationQueriesQueryKey() }),
      qc.invalidateQueries({ queryKey: getListCitationChecksQueryKey() }),
    ]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    const selected: CitationQuery | undefined = targetQueries.find(
      (q) => String(q.id) === queryChoice,
    );
    const queryText = selected ? selected.query : customQuery.trim();
    if (!queryText) {
      setFormError("Pick a target query or enter a custom one.");
      return;
    }

    try {
      await createCheck.mutateAsync({
        data: {
          checkedOn,
          engine,
          query: queryText,
          queryId: selected ? selected.id : null,
          cited,
          urlCited: urlCited.trim() || null,
          notes: notes.trim() || null,
        },
      });
      setFormSuccess(true);
      setUrlCited("");
      setNotes("");
      setCited(false);
      setCustomQuery("");
      await invalidate();
    } catch (err) {
      setFormError(describeApiError(err, "Could not save the check."));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCheck.mutateAsync({ id });
      await invalidate();
    } catch {
      // list refresh below will surface state
    }
  }

  return (
    <AdminShell
      title="AI citations"
      subtitle="Track which AI engines mention sysmoai.com for the target queries."
    >
      <div className="space-y-8">
        {/* Checklist */}
        <section className="rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Target query checklist</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              The 10 highest-value queries where sysmoai.com should appear in
              AI citations, with the latest check result.
            </p>
          </div>
          {queries.isLoading ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">Loading…</p>
          ) : queries.isError ? (
            <p className="px-4 py-6 text-sm text-red-400" data-testid="text-queries-error">
              {describeApiError(queries.error)}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Target query</th>
                    <th className="px-4 py-3 font-medium">Expected engines</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Latest result</th>
                    <th className="px-4 py-3 font-medium">Last checked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {targetQueries.map((q) => (
                    <tr key={q.id} data-testid={`row-citation-query-${q.id}`}>
                      <td className="px-4 py-3 text-muted-foreground">
                        {q.sortOrder}
                      </td>
                      <td className="px-4 py-3 font-medium">{q.query}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {q.engines}
                      </td>
                      <td className="px-4 py-3">{priorityBadge(q.priority)}</td>
                      <td className="px-4 py-3">
                        {citedBadge(q.lastCited)}
                        {q.lastEngine ? (
                          <span className="ml-2 text-xs text-muted-foreground">
                            via {engineLabel(q.lastEngine)}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {q.lastCheckedOn ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Add check form */}
        <section className="rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Record a check</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ran a target query through an AI engine? Log the result here.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Date checked
                </label>
                <input
                  type="date"
                  className={inputCls}
                  value={checkedOn}
                  max={todayISO()}
                  onChange={(e) => setCheckedOn(e.target.value)}
                  required
                  data-testid="input-checked-on"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  AI engine
                </label>
                <select
                  className={inputCls}
                  value={engine}
                  onChange={(e) => setEngine(e.target.value as EngineValue)}
                  data-testid="select-engine"
                >
                  {ENGINES.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Target query
                </label>
                <select
                  className={inputCls}
                  value={queryChoice}
                  onChange={(e) => setQueryChoice(e.target.value)}
                  data-testid="select-query"
                >
                  <option value="">Custom query…</option>
                  {targetQueries.map((q) => (
                    <option key={q.id} value={String(q.id)}>
                      {q.query}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {queryChoice === "" && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Custom query text
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder='e.g. "best AI agency in Dhaka"'
                  maxLength={500}
                  data-testid="input-custom-query"
                />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  URL cited (if any)
                </label>
                <input
                  type="url"
                  className={inputCls}
                  value={urlCited}
                  onChange={(e) => setUrlCited(e.target.value)}
                  placeholder="https://sysmoai.com/…"
                  data-testid="input-url-cited"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional context"
                  data-testid="input-notes"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cited}
                onChange={(e) => setCited(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-emerald-500"
                data-testid="checkbox-cited"
              />
              sysmoai.com was cited in the response
            </label>

            {formError && (
              <p className="text-sm text-red-400" data-testid="text-form-error">
                {formError}
              </p>
            )}
            {formSuccess && (
              <p
                className="text-sm text-emerald-300"
                data-testid="text-form-success"
              >
                Check saved.
              </p>
            )}

            <button
              type="submit"
              disabled={createCheck.isPending}
              className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              data-testid="button-save-check"
            >
              {createCheck.isPending ? "Saving…" : "Save check"}
            </button>
          </form>
        </section>

        {/* Results log */}
        <section className="rounded-lg border border-border bg-card">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold">Results log</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Every recorded citation check, newest first.
            </p>
          </div>
          {checks.isLoading ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">Loading…</p>
          ) : checks.isError ? (
            <p className="px-4 py-6 text-sm text-red-400" data-testid="text-checks-error">
              {describeApiError(checks.error)}
            </p>
          ) : items.length === 0 ? (
            <p
              className="px-4 py-6 text-sm text-muted-foreground"
              data-testid="text-checks-empty"
            >
              No checks recorded yet. Log your first one above.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Engine</th>
                      <th className="px-4 py-3 font-medium">Query</th>
                      <th className="px-4 py-3 font-medium">Cited?</th>
                      <th className="px-4 py-3 font-medium">URL cited</th>
                      <th className="px-4 py-3 font-medium">Notes</th>
                      <th className="px-4 py-3 font-medium" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((row) => (
                      <tr key={row.id} data-testid={`row-citation-check-${row.id}`}>
                        <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                          {row.checkedOn}
                        </td>
                        <td className="px-4 py-3">{engineLabel(row.engine)}</td>
                        <td className="px-4 py-3 font-medium">{row.query}</td>
                        <td className="px-4 py-3">{citedBadge(row.cited)}</td>
                        <td className="px-4 py-3 max-w-[220px] truncate">
                          {row.urlCited ? (
                            <a
                              href={row.urlCited}
                              target="_blank"
                              rel="noreferrer"
                              className="text-accent hover:underline"
                            >
                              {row.urlCited}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground max-w-[220px] truncate">
                          {row.notes ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(row.id)}
                            disabled={deleteCheck.isPending}
                            className="text-xs text-red-400 hover:underline disabled:opacity-50"
                            data-testid={`button-delete-check-${row.id}`}
                          >
                            Delete
                          </button>
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
            </>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
