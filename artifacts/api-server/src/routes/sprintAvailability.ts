import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, sprintAvailabilityTable } from "@workspace/db";
import {
  GetSprintAvailabilityResponse,
  UpdateSprintAvailabilityBody,
} from "@workspace/api-zod";
import { validateBody } from "../lib/validation";

const SINGLETON_ID = 1;

async function loadOrSeed() {
  const [row] = await db
    .select()
    .from(sprintAvailabilityTable)
    .where(eq(sprintAvailabilityTable.id, SINGLETON_ID));
  if (row) return row;
  const [inserted] = await db
    .insert(sprintAvailabilityTable)
    .values({
      id: SINGLETON_ID,
      slotsAvailable: 0,
      monthLabel: "",
      nextStartDate: null,
    })
    .returning();
  return inserted;
}

function serialize(row: Awaited<ReturnType<typeof loadOrSeed>>) {
  return GetSprintAvailabilityResponse.parse({
    slotsAvailable: row.slotsAvailable,
    monthLabel: row.monthLabel,
    nextStartDate: row.nextStartDate ?? null,
    updatedAt: row.updatedAt.toISOString(),
  });
}

export const publicSprintRouter: IRouter = Router();

publicSprintRouter.get("/sprint-availability", async (_req, res) => {
  const row = await loadOrSeed();
  res.json(serialize(row));
});

export const adminSprintRouter: IRouter = Router();

adminSprintRouter.get("/sprint-availability", async (_req, res) => {
  const row = await loadOrSeed();
  res.json(serialize(row));
});

adminSprintRouter.patch(
  "/sprint-availability",
  validateBody(UpdateSprintAvailabilityBody),
  async (req, res) => {
    const data = req.body as ReturnType<
      typeof UpdateSprintAvailabilityBody.parse
    >;
    if (
      data.slotsAvailable !== undefined &&
      !Number.isInteger(data.slotsAvailable)
    ) {
      res
        .status(400)
        .json({ error: "slotsAvailable must be a whole number." });
      return;
    }
    await loadOrSeed();
    const patch: Record<string, unknown> = { updatedAt: new Date() };
    if (data.slotsAvailable !== undefined)
      patch.slotsAvailable = data.slotsAvailable;
    if (data.monthLabel !== undefined) patch.monthLabel = data.monthLabel;
    if (data.nextStartDate !== undefined)
      patch.nextStartDate = data.nextStartDate;

    const [updated] = await db
      .update(sprintAvailabilityTable)
      .set(patch)
      .where(eq(sprintAvailabilityTable.id, SINGLETON_ID))
      .returning();
    res.json(serialize(updated));
  },
);
