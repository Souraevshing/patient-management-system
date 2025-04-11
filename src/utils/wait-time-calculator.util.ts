import {
  ADDITIONAL_WAIT_PER_PATIENT,
  BASE_WAIT_TIMES,
} from "../config/constants.js";
import patientStore from "../models/PatientStore.js";
import type { Patient } from "../types/index.js";

// Calculate estimated wait time for a patient
export const calculateWaitTimeEstimate = (patient: Patient): number => {
  const now = Date.now();
  const waitedSoFar = now - patient.arrivalTime;

  // Count patients ahead in the queue with higher or equal priority
  const patientsAhead = patientStore
    .getQueuedPatients()
    .filter(
      (p) =>
        p.triageLevel <= patient.triageLevel &&
        p.arrivalTime < patient.arrivalTime
    ).length;

  // Adjust wait time based on patients ahead
  const adjustedWaitTime =
    BASE_WAIT_TIMES[patient.triageLevel] +
    patientsAhead * ADDITIONAL_WAIT_PER_PATIENT;

  // Return remaining wait time
  return Math.max(0, adjustedWaitTime - waitedSoFar);
};
