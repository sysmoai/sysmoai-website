import { Router, type IRouter } from "express";
import {
  CreateContactSubmissionBody,
  CreateAuditRequestBody,
  CreateWaitlistSignupBody,
} from "@workspace/api-zod";
import {
  db,
  contactSubmissionsTable,
  auditRequestsTable,
  waitlistSignupsTable,
} from "@workspace/db";
import { rateLimit } from "../middlewares/rateLimit";
import { validateBody } from "../lib/validation";

const router: IRouter = Router();

const submissionRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
});

router.post(
  "/contact",
  submissionRateLimit,
  validateBody(CreateContactSubmissionBody),
  async (req, res) => {
    try {
      const data = req.body as ReturnType<
        typeof CreateContactSubmissionBody.parse
      >;
      const [row] = await db
        .insert(contactSubmissionsTable)
        .values({
          name: data.name,
          contact: data.contact,
          message: data.message,
          service: data.service ?? null,
        })
        .returning({ id: contactSubmissionsTable.id });
      req.log.info({ id: row.id }, "Contact submission saved");
      res.status(201).json({ id: row.id, ok: true });
    } catch (err) {
      req.log.error({ err }, "Failed to save contact submission");
      res.status(500).json({ error: "Failed to save submission." });
    }
  },
);

router.post(
  "/audit-requests",
  submissionRateLimit,
  validateBody(CreateAuditRequestBody),
  async (req, res) => {
    try {
      const data = req.body as ReturnType<typeof CreateAuditRequestBody.parse>;
      const [row] = await db
        .insert(auditRequestsTable)
        .values({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp ?? null,
          company: data.company ?? null,
          biggestChallenge: data.biggestChallenge,
        })
        .returning({ id: auditRequestsTable.id });
      req.log.info({ id: row.id }, "Audit request saved");
      res.status(201).json({ id: row.id, ok: true });
    } catch (err) {
      req.log.error({ err }, "Failed to save audit request");
      res.status(500).json({ error: "Failed to save submission." });
    }
  },
);

router.post(
  "/waitlist",
  submissionRateLimit,
  validateBody(CreateWaitlistSignupBody),
  async (req, res) => {
    try {
      const data = req.body as ReturnType<
        typeof CreateWaitlistSignupBody.parse
      >;
      const [row] = await db
        .insert(waitlistSignupsTable)
        .values({
          email: data.email,
          name: data.name ?? null,
          source: data.source ?? null,
        })
        .returning({ id: waitlistSignupsTable.id });
      req.log.info({ id: row.id }, "Waitlist signup saved");
      res.status(201).json({ id: row.id, ok: true });
    } catch (err) {
      req.log.error({ err }, "Failed to save waitlist signup");
      res.status(500).json({ error: "Failed to save submission." });
    }
  },
);

export default router;
