import { v4 as uuidv4 } from "uuid";

import patientStore from "../models/patient-store.model.js";
import type {
  CriticalPatientEvent,
  Patient,
  PatientData,
  StaffingThresholdEvent,
  WaitTimeUpdate,
} from "../types/index.js";
import { checkStaffingThreshold } from "../utils/staffing.util.js";
import { calculateWaitTimeEstimate } from "../utils/wait-time-calculator.util.js";
import { emitEvent } from "./socket.service.js";

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

  patientStore.addPatient(patient);

  patient.estimatedWaitTime = calculateWaitTimeEstimate(patient);

  if (triageLevel === 1) {
    const criticalEvent: CriticalPatientEvent = {
      message:
        "ALERT: Critical patient has arrived and needs immediate attention!",
      patient: { id: patient.id, name: patient.name },
    };
    emitEvent("criticalPatient", criticalEvent);
  }

  if (checkStaffingThreshold()) {
    const staffingEvent: StaffingThresholdEvent = {
      message: "WARNING: Patient-to-staff ratio has exceeded safe levels",
      ratio: calculatePatientToStaffRatio(),
    };
    emitEvent("staffingThresholdExceeded", staffingEvent);
  }

  updateWaitTimeEstimates();
  emitEvent("queueUpdate", patientStore.getQueuedPatients());

  return patient;
};

export const getQueuedPatients = (): Patient[] => {
  const patients = patientStore.getQueuedPatients();

  patients.forEach((patient) => {
    patient.estimatedWaitTime = calculateWaitTimeEstimate(patient);
  });

  return patients;
};

export const moveToTreatment = (id: string): Patient | null => {
  const patient = patientStore.moveToTreatment(id);

  if (patient) {
    updateWaitTimeEstimates();

    emitEvent("queueUpdate", patientStore.getQueuedPatients());
    emitEvent("patientTreating", {
      message: `Patient ${patient.name} is now being treated`,
      patient,
    });
  }

  return patient;
};

export const dischargePatient = (id: string): Patient | null => {
  const patient = patientStore.dischargePatient(id);

  if (patient) {
    emitEvent("patientDischarged", {
      message: `Patient ${patient.name} has been discharged`,
      patient,
    });

    if (!checkStaffingThreshold()) {
      emitEvent("staffingNormalized", {
        message: "Patient-to-staff ratio has returned to safe levels",
        ratio: calculatePatientToStaffRatio(),
      });
    }
  }

  return patient;
};

export const getStatistics = () => {
  const counts = patientStore.getCounts();

  return {
    ...counts,
    staffCount: global.staffCount || 3,
    patientToStaffRatio: calculatePatientToStaffRatio(),
    thresholdExceeded: checkStaffingThreshold(),
  };
};

export const updateWaitTimeEstimates = (): Patient[] => {
  const patients = patientStore.getQueuedPatients();

  patients.forEach((patient) => {
    patient.estimatedWaitTime = calculateWaitTimeEstimate(patient);
  });

  const waitTimeUpdates: WaitTimeUpdate[] = patients.map((p) => ({
    id: p.id,
    name: p.name,
    triageLevel: p.triageLevel,
    waitTime: Math.ceil(p.estimatedWaitTime / 60000),
  }));

  emitEvent("waitTimeUpdates", waitTimeUpdates);

  return patients;
};

export const calculatePatientToStaffRatio = (): number => {
  const counts = patientStore.getCounts();
  return (
    (counts.waitingCount + counts.treatingCount) / (global.staffCount || 3)
  );
};

declare global {
  var staffCount: number;
}
