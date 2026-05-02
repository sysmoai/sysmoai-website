import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodSchema, ZodTypeAny, infer as zInfer } from "zod";

export function validateBody<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "Invalid request body.",
        details: result.error.issues,
      });
      return;
    }
    req.body = result.data;
    next();
  };
}

export function validateListQuery<S extends ZodTypeAny>(
  schema: S,
  req: Request,
  res: Response,
): zInfer<S> | null {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    res.status(400).json({
      error: "Invalid query parameters.",
      details: result.error.issues,
    });
    return null;
  }
  return result.data;
}
