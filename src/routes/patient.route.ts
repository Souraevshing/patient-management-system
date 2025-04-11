import express from "express";

import {
  addPatientController,
  dischargePatientController,
  getQueuedPatientsController,
  moveToTreatmentController,
} from "../controllers/patientController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes
router.post("/", addPatientController);
router.get("/", getQueuedPatientsController);
router.put("/:id/treat", moveToTreatmentController);
router.put("/:id/discharge", dischargePatientController);

export default router;
