import type { Request, Response, NextFunction, RequestHandler } from "express";

interface Bucket {
  count: number;
  resetAt: number;
}

interface Options {
  windowMs: number;
  max: number;
}

export function rateLimit(opts: Options): RequestHandler {
  const buckets = new Map<string, Bucket>();

  return (req: Request, res: Response, next: NextFunction) => {
    // req.ip already honors `app.set("trust proxy", 1)`, which trusts exactly
    // one hop (the Replit reverse proxy). We deliberately do NOT read
    // x-forwarded-for ourselves — that would let any client spoof the header
    // and rotate IPs to evade limits.
    const ip = req.ip || req.socket.remoteAddress || "unknown";

    const key = `${req.method}:${req.baseUrl}${req.path}:${ip}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
      return next();
    }

    existing.count += 1;
    if (existing.count > opts.max) {
      const retryAfter = Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      );
      res.setHeader("Retry-After", String(retryAfter));
      res.status(429).json({
        error: "Too many requests. Please try again shortly.",
      });
      return;
    }

    next();
  };
}
