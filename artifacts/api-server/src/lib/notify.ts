import type { Logger } from "pino";
import { ADMIN_ALLOWLIST_EMAILS } from "./admin";

export type LeadKind = "contact" | "audit" | "waitlist";

interface LeadField {
  label: string;
  value: string | null | undefined;
}

interface NotifyArgs {
  kind: LeadKind;
  id: string | number;
  submitter: { name?: string | null; email?: string | null };
  fields: LeadField[];
  log: Pick<Logger, "info" | "warn" | "error">;
}

const KIND_META: Record<
  LeadKind,
  { label: string; subjectPrefix: string; adminPath: string }
> = {
  contact: {
    label: "contact submission",
    subjectPrefix: "New contact",
    adminPath: "contacts",
  },
  audit: {
    label: "audit request",
    subjectPrefix: "New audit request",
    adminPath: "audits",
  },
  waitlist: {
    label: "waitlist signup",
    subjectPrefix: "New waitlist signup",
    adminPath: "waitlist",
  },
};

function getAdminBaseUrl(): string {
  const explicit = process.env.ADMIN_BASE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const firstDomain = (process.env.REPLIT_DOMAINS ?? "")
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean)[0];
  if (firstDomain) return `https://${firstDomain}/admin`;
  return "http://localhost/admin";
}

function buildDeepLink(kind: LeadKind, id: string | number): string {
  const base = getAdminBaseUrl();
  return `${base}/${KIND_META[kind].adminPath}/${id}`;
}

// Conservative RFC-5322-ish check: must look like local@domain.tld with no
// spaces. We are not validating, just gating reply_to to avoid Resend errors
// when the field can also hold non-email values (e.g. WhatsApp numbers).
function isLikelyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBody(
  kind: LeadKind,
  args: NotifyArgs,
  deepLink: string,
): { text: string; html: string } {
  const meta = KIND_META[kind];
  const filledFields = args.fields.filter(
    (f) => f.value !== null && f.value !== undefined && String(f.value).trim() !== "",
  );

  const textLines = [
    `A new ${meta.label} just came in.`,
    "",
    ...filledFields.map((f) => `${f.label}: ${f.value}`),
    "",
    `View in admin: ${deepLink}`,
  ];

  const rows = filledFields
    .map(
      (f) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b;vertical-align:top;white-space:nowrap;">${escapeHtml(
          f.label,
        )}</td><td style="padding:4px 0;color:#0f172a;white-space:pre-wrap;">${escapeHtml(
          String(f.value),
        )}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#0f172a;background:#f8fafc;padding:24px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
<h2 style="margin:0 0 8px;font-size:18px;">${escapeHtml(meta.subjectPrefix)} on SYSmoAI</h2>
<p style="margin:0 0 16px;color:#475569;font-size:14px;">A new ${escapeHtml(meta.label)} just came in.</p>
<table style="border-collapse:collapse;font-size:14px;width:100%;">${rows}</table>
<p style="margin:24px 0 0;"><a href="${escapeHtml(deepLink)}" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-size:14px;">Open in admin</a></p>
<p style="margin:16px 0 0;color:#94a3b8;font-size:12px;">Or paste this link: ${escapeHtml(deepLink)}</p>
</div></body></html>`;

  return { text: textLines.join("\n"), html };
}

async function sendViaResend(args: {
  apiKey: string;
  from: string;
  to: readonly string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true; id?: string } | { ok: false; status: number; body: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from,
      to: [...args.to],
      subject: args.subject,
      text: args.text,
      html: args.html,
      ...(args.replyTo ? { reply_to: args.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    return { ok: false, status: res.status, body: await res.text() };
  }
  const json = (await res.json().catch(() => ({}))) as { id?: string };
  return { ok: true, id: json.id };
}

export async function notifyNewLead(args: NotifyArgs): Promise<void> {
  const meta = KIND_META[args.kind];
  const deepLink = buildDeepLink(args.kind, args.id);
  const subject = `[SYSmoAI] ${meta.subjectPrefix}: ${
    args.submitter.name || args.submitter.email || `#${args.id}`
  }`;
  const { text, html } = renderBody(args.kind, args, deepLink);

  const recipients = ADMIN_ALLOWLIST_EMAILS;
  if (recipients.length === 0) {
    args.log.warn(
      { kind: args.kind, id: args.id },
      "notifyNewLead: no admin recipients configured (ADMIN_ALLOWLIST_EMAILS empty)",
    );
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    args.log.info(
      {
        kind: args.kind,
        id: args.id,
        recipients,
        deepLink,
        subject,
      },
      "notifyNewLead: RESEND_API_KEY not set — skipping email send (logged only)",
    );
    return;
  }

  const from =
    process.env.NOTIFY_FROM_EMAIL ?? "SYSmoAI Leads <onboarding@resend.dev>";
  // Only set reply_to when the submitter value is a syntactically valid email.
  // Some endpoints (e.g. contact form) accept "email or WhatsApp number" in
  // the same field — passing a phone number to Resend's reply_to causes the
  // send to fail and the team would silently miss the lead.
  const replyTo =
    args.submitter.email && isLikelyEmail(args.submitter.email)
      ? args.submitter.email
      : undefined;

  try {
    const result = await sendViaResend({
      apiKey,
      from,
      to: recipients,
      subject,
      text,
      html,
      replyTo,
    });
    if (!result.ok) {
      args.log.error(
        {
          kind: args.kind,
          id: args.id,
          status: result.status,
          body: result.body,
        },
        "notifyNewLead: Resend API rejected the email",
      );
      return;
    }
    args.log.info(
      {
        kind: args.kind,
        id: args.id,
        recipients,
        resendId: result.id,
      },
      "notifyNewLead: email sent via Resend",
    );
  } catch (err) {
    args.log.error(
      { err, kind: args.kind, id: args.id },
      "notifyNewLead: unexpected error sending email",
    );
  }
}
