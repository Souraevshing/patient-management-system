import express from "express";

import {
  startSimulationController,
  stopSimulationController,
} from "../controllers/simulation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/start", startSimulationController);
router.post("/stop", stopSimulationController);

export default router;
