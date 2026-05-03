import type { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { isAdminEmail } from "../lib/admin";

export interface AdminContext {
  userId: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AdminContext;
    }
  }
}

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

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // Machine-to-machine path: a static bearer token lets n8n / cron / other
  // backend automations call admin endpoints without holding a Clerk session.
  // Set SYSMOAI_AUTOMATION_TOKEN in the deployment env (long random string)
  // and pass `Authorization: Bearer <token>` from the automation runtime.
  const automationToken = process.env.SYSMOAI_AUTOMATION_TOKEN;
  if (automationToken && automationToken.length >= 24) {
    const presented = extractBearer(req);
    if (presented && timingSafeEquals(presented, automationToken)) {
      req.admin = { userId: AUTOMATION_USER_ID, email: AUTOMATION_EMAIL };
      next();
      return;
    }
  }

  const auth = getAuth(req);
  const userId = auth?.userId;

  if (!userId) {
    res.status(401).json({ error: "Sign in required." });
    return;
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const email =
      user.primaryEmailAddress?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      null;

    if (!isAdminEmail(email)) {
      req.log.warn(
        { userId, email },
        "Authenticated user denied admin access (not on allowlist)",
      );
      res.status(403).json({ error: "Access denied." });
      return;
    }

    req.admin = { userId, email: email as string };
    next();
  } catch (err) {
    req.log.error({ err, userId }, "Failed to load Clerk user for admin check");
    res.status(500).json({ error: "Failed to verify admin." });
  }
}
