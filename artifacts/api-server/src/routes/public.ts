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
import { honeypot } from "../middlewares/honeypot";
import { validateBody } from "../lib/validation";
import { notifyNewLead } from "../lib/notify";

const router: IRouter = Router();

const submissionRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
});

const submissionHoneypot = honeypot();

function formatBkashNagad(
  value: "yes" | "no" | "mix" | null | undefined,
): string | null {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  if (value === "mix") return "Mix";
  return null;
}

router.post(
  "/contact",
  submissionRateLimit,
  submissionHoneypot,
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
      void notifyNewLead({
        kind: "contact",
        id: row.id,
        // `contact` may be email OR WhatsApp number — notify.ts validates
        // before using it as a reply_to address.
        submitter: { name: data.name, email: data.contact },
        fields: [
          { label: "Name", value: data.name },
          { label: "Contact", value: data.contact },
          { label: "Service", value: data.service ?? null },
          { label: "Message", value: data.message },
        ],
        log: req.log,
      });
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
  submissionHoneypot,
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
          businessType: data.businessType ?? null,
          monthlyOrders: data.monthlyOrders ?? null,
          dailyDmVolume: data.dailyDmVolume ?? null,
          currentTools: data.currentTools ?? null,
          usesBkashNagad: data.usesBkashNagad ?? null,
          preferredCurrency: data.preferredCurrency ?? null,
          utmSource: data.utmSource ?? null,
          utmMedium: data.utmMedium ?? null,
          utmCampaign: data.utmCampaign ?? null,
          utmContent: data.utmContent ?? null,
          utmTerm: data.utmTerm ?? null,
          referrer: data.referrer ?? null,
        })
        .returning({ id: auditRequestsTable.id });
      req.log.info({ id: row.id }, "Audit request saved");
      void notifyNewLead({
        kind: "audit",
        id: row.id,
        submitter: { name: data.name, email: data.email },
        fields: [
          { label: "Name", value: data.name },
          { label: "Email", value: data.email },
          { label: "WhatsApp", value: data.whatsapp ?? null },
          { label: "Company", value: data.company ?? null },
          { label: "Business type", value: data.businessType ?? null },
          { label: "Monthly orders", value: data.monthlyOrders ?? null },
          { label: "Daily DM volume", value: data.dailyDmVolume ?? null },
          { label: "Current tools", value: data.currentTools ?? null },
          {
            label: "Uses bKash/Nagad",
            value: formatBkashNagad(data.usesBkashNagad),
          },
          { label: "Preferred currency", value: data.preferredCurrency ?? null },
          { label: "Biggest challenge", value: data.biggestChallenge },
        ],
        log: req.log,
      });
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
  submissionHoneypot,
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
          utmSource: data.utmSource ?? null,
          utmMedium: data.utmMedium ?? null,
          utmCampaign: data.utmCampaign ?? null,
          utmContent: data.utmContent ?? null,
          utmTerm: data.utmTerm ?? null,
          referrer: data.referrer ?? null,
        })
        .returning({ id: waitlistSignupsTable.id });
      req.log.info({ id: row.id }, "Waitlist signup saved");
      void notifyNewLead({
        kind: "waitlist",
        id: row.id,
        submitter: { name: data.name ?? null, email: data.email },
        fields: [
          { label: "Email", value: data.email },
          { label: "Name", value: data.name ?? null },
          { label: "Source", value: data.source ?? null },
        ],
        log: req.log,
      });
      res.status(201).json({ id: row.id, ok: true });
    } catch (err) {
      // Treat unique-violation on the case-insensitive email index as a
      // success — the user is already on the list. Drizzle wraps the pg
      // error so walk the cause chain looking for SQLSTATE 23505 AND the
      // specific constraint name; any other unique-violation should still
      // surface as a 500 so we don't silently mask data-integrity bugs.
      const isWaitlistEmailDup = (() => {
        let cur: unknown = err;
        for (let i = 0; i < 5 && cur; i++) {
          const c = cur as { code?: string; constraint?: string };
          if (c.code === "23505" && c.constraint === "waitlist_signups_email_lower_uniq") {
            return true;
          }
          cur = (cur as { cause?: unknown }).cause;
        }
        return false;
      })();
      if (isWaitlistEmailDup) {
        req.log.info({ err }, "Waitlist re-signup (already on list)");
        res.status(200).json({ ok: true, alreadySubscribed: true });
        return;
      }
      req.log.error({ err }, "Failed to save waitlist signup");
      res.status(500).json({ error: "Failed to save submission." });
    }
  },
);

export default router;
