import type { Request, Response } from "express";

import {
  addPatient,
  dischargePatient,
  getQueuedPatients,
  moveToTreatment,
} from "../services/patient.service.js";
import type { PatientData } from "../types/index.js";
import { validatePatientData } from "../utils/validators.util.js";

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Add a new patient to the queue
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       201:
 *         description: Patient added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const addPatientController = (req: Request, res: Response): void => {
  const patientData = req.body as PatientData;

  const validation = validatePatientData(patientData);
  if (!validation.isValid) {
    res.status(400).json({ errors: validation.errors });
    return;
  }

  const patient = addPatient(patientData);

  res.status(201).json(patient);
};

export const getQueuedPatientsController = (
  req: Request,
  res: Response
): void => {
  const patients = getQueuedPatients();
  res.json(patients);
};

export const moveToTreatmentController = (
  req: Request,
  res: Response
): void => {
  const { id } = req.params;

  const patient = moveToTreatment(id);

  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }

  res.json(patient);
};

export const dischargePatientController = (
  req: Request,
  res: Response
): void => {
  const { id } = req.params;

  const patient = dischargePatient(id);

  if (!patient) {
    res.status(404).json({ error: "Patient not found or not in treatment" });
    return;
  }

  res.json(patient);
};
