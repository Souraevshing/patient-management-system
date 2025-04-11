import express from "express";

import {
  addPatientController,
  dischargePatientController,
  getQueuedPatientsController,
  moveToTreatmentController,
} from "../controllers/patient.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addPatientController);
router.get("/", getQueuedPatientsController);
router.put("/:id/treat", moveToTreatmentController);
router.put("/:id/discharge", dischargePatientController);

export default router;
