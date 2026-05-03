import { Router, type IRouter } from "express";
import healthRouter from "./health";
import publicRouter from "./public";
import adminRouter from "./admin";
import {
  publicSprintRouter,
  adminSprintRouter,
} from "./sprintAvailability";

const router: IRouter = Router();

router.use(healthRouter);
router.use(publicRouter);
router.use(publicSprintRouter);
router.use("/admin", adminSprintRouter);
router.use("/admin", adminRouter);

export default router;
