import express from "express";

import {
  getStatsController,
  updateStaffCountController,
} from "../controllers/statsController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes
router.get("/", getStatsController);
router.put("/staff", updateStaffCountController);

export default router;
