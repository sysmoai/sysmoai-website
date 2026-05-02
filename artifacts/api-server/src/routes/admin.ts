import { Router, type IRouter, type Request, type Response } from "express";
import { sql, desc, eq, and, type SQL } from "drizzle-orm";
import {
  db,
  contactSubmissionsTable,
  auditRequestsTable,
  waitlistSignupsTable,
  type ContactSubmission,
  type AuditRequest,
  type WaitlistSignup,
} from "@workspace/db";
import {
  GetAdminMeResponse,
  GetAdminSummaryResponse,
  ListContactSubmissionsQueryParams,
  ListContactSubmissionsResponse,
  GetContactSubmissionResponse,
  UpdateContactSubmissionBody,
  UpdateContactSubmissionResponse,
  ListAuditRequestsQueryParams,
  ListAuditRequestsResponse,
  GetAuditRequestResponse,
  UpdateAuditRequestBody,
  UpdateAuditRequestResponse,
  ListWaitlistSignupsQueryParams,
  ListWaitlistSignupsResponse,
  GetWaitlistSignupResponse,
  UpdateWaitlistSignupBody,
  UpdateWaitlistSignupResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/requireAdmin";
import { validateBody, validateListQuery } from "../lib/validation";
import { rowsToCsv } from "../lib/csv";

const router: IRouter = Router();

router.use(requireAdmin);

router.get("/me", (req: Request, res: Response) => {
  const admin = req.admin!;
  res.json(
    GetAdminMeResponse.parse({
      userId: admin.userId,
      email: admin.email,
      isAdmin: true,
    }),
  );
});

async function countContact() {
  const rows = await db
    .select({
      status: contactSubmissionsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(contactSubmissionsTable)
    .groupBy(contactSubmissionsTable.status);
  return rollup(rows);
}
async function countAudit() {
  const rows = await db
    .select({
      status: auditRequestsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(auditRequestsTable)
    .groupBy(auditRequestsTable.status);
  return rollup(rows);
}
async function countWaitlist() {
  const rows = await db
    .select({
      status: waitlistSignupsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(waitlistSignupsTable)
    .groupBy(waitlistSignupsTable.status);
  return rollup(rows);
}

function rollup(rows: Array<{ status: string; count: number }>) {
  const out = { total: 0, new: 0, contacted: 0, archived: 0 };
  for (const r of rows) {
    out.total += r.count;
    if (r.status === "new") out.new = r.count;
    else if (r.status === "contacted") out.contacted = r.count;
    else if (r.status === "archived") out.archived = r.count;
  }
  return out;
}

router.get("/summary", async (_req: Request, res: Response) => {
  const [contactSubmissions, auditRequests, waitlistSignups] =
    await Promise.all([countContact(), countAudit(), countWaitlist()]);
  res.json(
    GetAdminSummaryResponse.parse({
      contactSubmissions,
      auditRequests,
      waitlistSignups,
    }),
  );
});

function csvHeaders(resource: "contact" | "audit" | "waitlist"): string[] {
  if (resource === "contact")
    return [
      "id",
      "createdAt",
      "name",
      "contact",
      "service",
      "status",
      "message",
      "internalNote",
    ];
  if (resource === "audit")
    return [
      "id",
      "createdAt",
      "name",
      "email",
      "whatsapp",
      "company",
      "status",
      "biggestChallenge",
      "internalNote",
    ];
  return [
    "id",
    "createdAt",
    "email",
    "name",
    "source",
    "status",
    "internalNote",
  ];
}

function sendCsv(res: Response, name: string, csv: string) {
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${name}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv"`,
  );
  res.send(csv);
}

// ─────────── Contact submissions ───────────

router.get(
  "/contact-submissions/export.csv",
  async (_req: Request, res: Response) => {
    const rows = await db
      .select()
      .from(contactSubmissionsTable)
      .orderBy(desc(contactSubmissionsTable.createdAt));
    const csv = rowsToCsv(
      csvHeaders("contact"),
      rows.map((r: ContactSubmission) => ({
        id: r.id,
        createdAt: r.createdAt,
        name: r.name,
        contact: r.contact,
        service: r.service,
        status: r.status,
        message: r.message,
        internalNote: r.internalNote,
      })),
    );
    sendCsv(res, "contact-submissions", csv);
  },
);

router.get(
  "/contact-submissions",
  async (req: Request, res: Response) => {
    const q = validateListQuery(ListContactSubmissionsQueryParams, req, res);
    if (!q) return;
    const { page, pageSize, status } = q;
    const filters: SQL[] = [];
    if (status) filters.push(eq(contactSubmissionsTable.status, status));
    const where = filters.length ? and(...filters) : undefined;

    const countQuery = db
      .select({ count: sql<number>`count(*)::int` })
      .from(contactSubmissionsTable);
    if (where) countQuery.where(where);
    const [{ count }] = await countQuery;

    const itemsQuery = db.select().from(contactSubmissionsTable);
    if (where) itemsQuery.where(where);
    const items = await itemsQuery
      .orderBy(desc(contactSubmissionsTable.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    res.json(
      ListContactSubmissionsResponse.parse({
        items,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.max(1, Math.ceil(count / pageSize)),
        },
      }),
    );
  },
);

router.get(
  "/contact-submissions/:id",
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid id." });
      return;
    }
    const [row] = await db
      .select()
      .from(contactSubmissionsTable)
      .where(eq(contactSubmissionsTable.id, id))
      .limit(1);
    if (!row) {
      res.status(404).json({ error: "Not found." });
      return;
    }
    res.json(GetContactSubmissionResponse.parse(row));
  },
);

router.patch(
  "/contact-submissions/:id",
  validateBody(UpdateContactSubmissionBody),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid id." });
      return;
    }
    const data = req.body as ReturnType<
      typeof UpdateContactSubmissionBody.parse
    >;
    const update: { status?: "new" | "contacted" | "archived"; internalNote?: string | null } = {};
    if (data.status) update.status = data.status;
    if (data.internalNote !== undefined) update.internalNote = data.internalNote;

    if (Object.keys(update).length === 0) {
      const [row] = await db
        .select()
        .from(contactSubmissionsTable)
        .where(eq(contactSubmissionsTable.id, id))
        .limit(1);
      if (!row) {
        res.status(404).json({ error: "Not found." });
        return;
      }
      res.json(UpdateContactSubmissionResponse.parse(row));
      return;
    }

    const [row] = await db
      .update(contactSubmissionsTable)
      .set(update)
      .where(eq(contactSubmissionsTable.id, id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Not found." });
      return;
    }
    res.json(UpdateContactSubmissionResponse.parse(row));
  },
);

// ─────────── Audit requests ───────────

router.get(
  "/audit-requests/export.csv",
  async (_req: Request, res: Response) => {
    const rows = await db
      .select()
      .from(auditRequestsTable)
      .orderBy(desc(auditRequestsTable.createdAt));
    const csv = rowsToCsv(
      csvHeaders("audit"),
      rows.map((r: AuditRequest) => ({
        id: r.id,
        createdAt: r.createdAt,
        name: r.name,
        email: r.email,
        whatsapp: r.whatsapp,
        company: r.company,
        status: r.status,
        biggestChallenge: r.biggestChallenge,
        internalNote: r.internalNote,
      })),
    );
    sendCsv(res, "audit-requests", csv);
  },
);

router.get("/audit-requests", async (req: Request, res: Response) => {
  const q = validateListQuery(ListAuditRequestsQueryParams, req, res);
  if (!q) return;
  const { page, pageSize, status } = q;
  const filters: SQL[] = [];
  if (status) filters.push(eq(auditRequestsTable.status, status));
  const where = filters.length ? and(...filters) : undefined;

  const countQuery = db
    .select({ count: sql<number>`count(*)::int` })
    .from(auditRequestsTable);
  if (where) countQuery.where(where);
  const [{ count }] = await countQuery;

  const itemsQuery = db.select().from(auditRequestsTable);
  if (where) itemsQuery.where(where);
  const items = await itemsQuery
    .orderBy(desc(auditRequestsTable.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  res.json(
    ListAuditRequestsResponse.parse({
      items,
      pagination: {
        page,
        pageSize,
        total: count,
        totalPages: Math.max(1, Math.ceil(count / pageSize)),
      },
    }),
  );
});

router.get("/audit-requests/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  const [row] = await db
    .select()
    .from(auditRequestsTable)
    .where(eq(auditRequestsTable.id, id))
    .limit(1);
  if (!row) {
    res.status(404).json({ error: "Not found." });
    return;
  }
  res.json(GetAuditRequestResponse.parse(row));
});

router.patch(
  "/audit-requests/:id",
  validateBody(UpdateAuditRequestBody),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid id." });
      return;
    }
    const data = req.body as ReturnType<typeof UpdateAuditRequestBody.parse>;
    const update: { status?: "new" | "contacted" | "archived"; internalNote?: string | null } = {};
    if (data.status) update.status = data.status;
    if (data.internalNote !== undefined) update.internalNote = data.internalNote;

    if (Object.keys(update).length === 0) {
      const [row] = await db
        .select()
        .from(auditRequestsTable)
        .where(eq(auditRequestsTable.id, id))
        .limit(1);
      if (!row) {
        res.status(404).json({ error: "Not found." });
        return;
      }
      res.json(UpdateAuditRequestResponse.parse(row));
      return;
    }

    const [row] = await db
      .update(auditRequestsTable)
      .set(update)
      .where(eq(auditRequestsTable.id, id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Not found." });
      return;
    }
    res.json(UpdateAuditRequestResponse.parse(row));
  },
);

// ─────────── Waitlist signups ───────────

router.get(
  "/waitlist-signups/export.csv",
  async (_req: Request, res: Response) => {
    const rows = await db
      .select()
      .from(waitlistSignupsTable)
      .orderBy(desc(waitlistSignupsTable.createdAt));
    const csv = rowsToCsv(
      csvHeaders("waitlist"),
      rows.map((r: WaitlistSignup) => ({
        id: r.id,
        createdAt: r.createdAt,
        email: r.email,
        name: r.name,
        source: r.source,
        status: r.status,
        internalNote: r.internalNote,
      })),
    );
    sendCsv(res, "waitlist-signups", csv);
  },
);

router.get("/waitlist-signups", async (req: Request, res: Response) => {
  const q = validateListQuery(ListWaitlistSignupsQueryParams, req, res);
  if (!q) return;
  const { page, pageSize, status } = q;
  const filters: SQL[] = [];
  if (status) filters.push(eq(waitlistSignupsTable.status, status));
  const where = filters.length ? and(...filters) : undefined;

  const countQuery = db
    .select({ count: sql<number>`count(*)::int` })
    .from(waitlistSignupsTable);
  if (where) countQuery.where(where);
  const [{ count }] = await countQuery;

  const itemsQuery = db.select().from(waitlistSignupsTable);
  if (where) itemsQuery.where(where);
  const items = await itemsQuery
    .orderBy(desc(waitlistSignupsTable.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  res.json(
    ListWaitlistSignupsResponse.parse({
      items,
      pagination: {
        page,
        pageSize,
        total: count,
        totalPages: Math.max(1, Math.ceil(count / pageSize)),
      },
    }),
  );
});

router.get("/waitlist-signups/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  const [row] = await db
    .select()
    .from(waitlistSignupsTable)
    .where(eq(waitlistSignupsTable.id, id))
    .limit(1);
  if (!row) {
    res.status(404).json({ error: "Not found." });
    return;
  }
  res.json(GetWaitlistSignupResponse.parse(row));
});

router.patch(
  "/waitlist-signups/:id",
  validateBody(UpdateWaitlistSignupBody),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid id." });
      return;
    }
    const data = req.body as ReturnType<typeof UpdateWaitlistSignupBody.parse>;
    const update: { status?: "new" | "contacted" | "archived"; internalNote?: string | null } = {};
    if (data.status) update.status = data.status;
    if (data.internalNote !== undefined) update.internalNote = data.internalNote;

    if (Object.keys(update).length === 0) {
      const [row] = await db
        .select()
        .from(waitlistSignupsTable)
        .where(eq(waitlistSignupsTable.id, id))
        .limit(1);
      if (!row) {
        res.status(404).json({ error: "Not found." });
        return;
      }
      res.json(UpdateWaitlistSignupResponse.parse(row));
      return;
    }

    const [row] = await db
      .update(waitlistSignupsTable)
      .set(update)
      .where(eq(waitlistSignupsTable.id, id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Not found." });
      return;
    }
    res.json(UpdateWaitlistSignupResponse.parse(row));
  },
);

export default router;
