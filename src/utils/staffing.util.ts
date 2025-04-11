import {
  DEFAULT_STAFF_COUNT,
  MAX_PATIENT_TO_STAFF_RATIO,
} from "../constants/index.constant.js";
import patientStore from "../models/patient-store.model.js";

global.staffCount = DEFAULT_STAFF_COUNT;

export const checkStaffingThreshold = (): boolean => {
  const counts = patientStore.getCounts();
  const patientCount = counts.waitingCount + counts.treatingCount;
  return patientCount / global.staffCount > MAX_PATIENT_TO_STAFF_RATIO;
};

export const updateStaffCount = (count: number): boolean => {
  if (count > 0) {
    global.staffCount = count;
    return true;
  }
  return false;
};

export const getStaffCount = (): number => {
  return global.staffCount;
};
