import type { Request, Response } from "express";
import {
  addPatient,
  dischargePatient,
  getQueuedPatients,
  moveToTreatment,
} from "../services/patientService.js";
import type { PatientData } from "../types/index.js";
import { validatePatientData } from "../utils/validators.js";

// Add a new patient to the queue
export const addPatientController = (req: Request, res: Response): void => {
  const patientData = req.body as PatientData;

  // Validate input
  const validation = validatePatientData(patientData);
  if (!validation.isValid) {
    res.status(400).json({ errors: validation.errors });
    return;
  }

  // Add patient
  const patient = addPatient(patientData);

  res.status(201).json(patient);
};

// Get all patients in the queue
export const getQueuedPatientsController = (
  req: Request,
  res: Response
): void => {
  const patients = getQueuedPatients();
  res.json(patients);
};

// Move a patient to treatment
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

// Discharge a patient
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
