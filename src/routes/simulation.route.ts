import express from "express";

import {
  startSimulationController,
  stopSimulationController,
} from "../controllers/simulationController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes
router.post("/start", startSimulationController);
router.post("/stop", stopSimulationController);

export default router;
