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

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
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
