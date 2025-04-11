import { v4 as uuidv4 } from "uuid";
import patientStore from "../models/PatientStore.js";
import type {
  CriticalPatientEvent,
  Patient,
  PatientData,
  StaffingThresholdEvent,
  WaitTimeUpdate,
} from "../types/index.js";
import { checkStaffingThreshold } from "../utils/staffingUtils.js";
import { calculateWaitTimeEstimate } from "../utils/waitTimeCalculator.js";
import { emitEvent } from "./socketService.js";

// Add a new patient to the queue
export const addPatient = (patientData: PatientData): Patient => {
  const { name, condition, triageLevel } = patientData;

  const patient: Patient = {
    id: uuidv4(),
    name,
    condition,
    triageLevel,
    arrivalTime: Date.now(),
    status: "waiting",
    estimatedWaitTime: 0,
  };

  // Add to queue
  patientStore.addPatient(patient);

  // Calculate initial wait time estimate
  patient.estimatedWaitTime = calculateWaitTimeEstimate(patient);

  // Check if this is a critical patient (level 1)
  if (triageLevel === 1) {
    const criticalEvent: CriticalPatientEvent = {
      message:
        "ALERT: Critical patient has arrived and needs immediate attention!",
      patient: { id: patient.id, name: patient.name },
    };
    emitEvent("criticalPatient", criticalEvent);
  }

  // Check staffing threshold
  if (checkStaffingThreshold()) {
    const staffingEvent: StaffingThresholdEvent = {
      message: "WARNING: Patient-to-staff ratio has exceeded safe levels",
      ratio: calculatePatientToStaffRatio(),
    };
    emitEvent("staffingThresholdExceeded", staffingEvent);
  }

  // Update all wait times and emit queue update
  updateWaitTimeEstimates();
  emitEvent("queueUpdate", patientStore.getQueuedPatients());

  return patient;
};

// Get all patients in the queue with updated wait times
export const getQueuedPatients = (): Patient[] => {
  const patients = patientStore.getQueuedPatients();

  // Update wait time estimates before sending
  patients.forEach((patient) => {
    patient.estimatedWaitTime = calculateWaitTimeEstimate(patient);
  });

  return patients;
};

// Move a patient to treatment
export const moveToTreatment = (id: string): Patient | null => {
  const patient = patientStore.moveToTreatment(id);

  if (patient) {
    // Update wait times for remaining patients
    updateWaitTimeEstimates();

    // Emit queue updates
    emitEvent("queueUpdate", patientStore.getQueuedPatients());
    emitEvent("patientTreating", {
      message: `Patient ${patient.name} is now being treated`,
      patient,
    });
  }

  return patient;
};

// Discharge a patient
export const dischargePatient = (id: string): Patient | null => {
  const patient = patientStore.dischargePatient(id);

  if (patient) {
    // Emit updates
    emitEvent("patientDischarged", {
      message: `Patient ${patient.name} has been discharged`,
      patient,
    });

    // Check staffing threshold
    if (!checkStaffingThreshold()) {
      emitEvent("staffingNormalized", {
        message: "Patient-to-staff ratio has returned to safe levels",
        ratio: calculatePatientToStaffRatio(),
      });
    }
  }

  return patient;
};

// Get system statistics
export const getStatistics = () => {
  const counts = patientStore.getCounts();

  return {
    ...counts,
    staffCount: global.staffCount || 3,
    patientToStaffRatio: calculatePatientToStaffRatio(),
    thresholdExceeded: checkStaffingThreshold(),
  };
};

// Update wait time estimates for all patients in queue
export const updateWaitTimeEstimates = (): Patient[] => {
  const patients = patientStore.getQueuedPatients();

  patients.forEach((patient) => {
    patient.estimatedWaitTime = calculateWaitTimeEstimate(patient);
  });

  // Emit updated wait times
  const waitTimeUpdates: WaitTimeUpdate[] = patients.map((p) => ({
    id: p.id,
    name: p.name,
    triageLevel: p.triageLevel,
    waitTime: Math.ceil(p.estimatedWaitTime / 60000), // Convert to minutes
  }));

  emitEvent("waitTimeUpdates", waitTimeUpdates);

  return patients;
};

// Calculate patient to staff ratio
export const calculatePatientToStaffRatio = (): number => {
  const counts = patientStore.getCounts();
  return (
    (counts.waitingCount + counts.treatingCount) / (global.staffCount || 3)
  );
};

// Declare global staffCount
declare global {
  var staffCount: number;
}
