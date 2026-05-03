import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Honeypot middleware. Real human users never see or fill the `website` field
 * (it's hidden via CSS + aria-hidden + tabIndex=-1 on the client). Naive bots
 * that auto-fill every input will populate it. When that happens we silently
 * return a 201 so the bot believes its submission worked, while skipping the
 * downstream handler that would write to the database or send notifications.
 */
export function honeypot(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const trap = req.body?.website;
    if (typeof trap === "string" && trap.trim().length > 0) {
      req.log?.warn(
        { ip: req.ip, ua: req.headers["user-agent"] },
        "Honeypot tripped — silently dropping submission",
      );
      res.status(201).json({ ok: true });
      return;
    }
    next();
  };
}
