import express from "express";

import {
  getStatsController,
  updateStaffCountController,
} from "../controllers/stats.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getStatsController);
router.put("/staff", updateStaffCountController);

export default router;
