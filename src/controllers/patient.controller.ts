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

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients in the queue
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getQueuedPatientsController = (
  req: Request,
  res: Response
): void => {
  const patients = getQueuedPatients();
  res.json(patients);
};

/**
 * @swagger
 * /patients/{id}/treat:
 *   put:
 *     summary: Move a patient to treatment
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient moved to treatment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /patients/{id}/discharge:
 *   put:
 *     summary: Discharge a patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient discharged
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found or not in treatment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
