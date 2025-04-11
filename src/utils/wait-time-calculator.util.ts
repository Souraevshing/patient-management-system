import {
  ADDITIONAL_WAIT_PER_PATIENT,
  BASE_WAIT_TIMES,
} from "../config/constants.js";
import patientStore from "../models/patient-store.model.js";
import type { Patient } from "../types/index.js";

export const calculateWaitTimeEstimate = (patient: Patient): number => {
  const now = Date.now();
  const waitedSoFar = now - patient.arrivalTime;

  const patientsAhead = patientStore
    .getQueuedPatients()
    .filter(
      (p) =>
        p.triageLevel <= patient.triageLevel &&
        p.arrivalTime < patient.arrivalTime
    ).length;

  const adjustedWaitTime =
    BASE_WAIT_TIMES[patient.triageLevel] +
    patientsAhead * ADDITIONAL_WAIT_PER_PATIENT;

  return Math.max(0, adjustedWaitTime - waitedSoFar);
};
