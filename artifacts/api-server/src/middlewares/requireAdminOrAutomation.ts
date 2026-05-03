import type { Request, Response, NextFunction } from "express";
import { requireAdmin } from "./requireAdmin";

const AUTOMATION_USER_ID = "service:automation";
const AUTOMATION_EMAIL = "automation@sysmoai.local";

function timingSafeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function extractBearer(req: Request): string | null {
  const header = req.header("authorization") ?? req.header("Authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ", 2);
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

/**
 * Least-privilege middleware: accepts the static SYSMOAI_AUTOMATION_TOKEN bearer
 * (timing-safe compare, gated on length ≥ 24 chars) for machine-to-machine
 * callers, and otherwise delegates to the standard Clerk-backed requireAdmin.
 *
 * Mount this ONLY on the scheduled-posts router so the automation token cannot
 * reach other admin endpoints (waitlist, contacts, audits, sprint availability,
 * etc.). Every other admin route keeps `requireAdmin` (Clerk-only).
 */
export async function requireAdminOrAutomation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const automationToken = process.env.SYSMOAI_AUTOMATION_TOKEN;
  if (automationToken && automationToken.length >= 24) {
    const presented = extractBearer(req);
    if (presented && timingSafeEquals(presented, automationToken)) {
      req.admin = { userId: AUTOMATION_USER_ID, email: AUTOMATION_EMAIL };
      next();
      return;
    }
  }

  return requireAdmin(req, res, next);
}
