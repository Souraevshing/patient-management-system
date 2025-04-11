import type { PatientData, ValidationResult } from "../types/index.js";

export const validatePatientData = (data: PatientData): ValidationResult => {
  const errors: string[] = [];

  if (!data.name) {
    errors.push("Name is required");
  }

  if (!data.condition) {
    errors.push("Condition is required");
  }

  if (!data.triageLevel) {
    errors.push("Triage level is required");
  } else if (
    !Number.isInteger(data.triageLevel) ||
    data.triageLevel < 1 ||
    data.triageLevel > 5
  ) {
    errors.push("Triage level must be an integer between 1 and 5");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
