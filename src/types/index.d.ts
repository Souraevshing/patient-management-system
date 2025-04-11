export interface Patient {
  id: string;
  name: string;
  condition: string;
  triageLevel: number;
  arrivalTime: number;
  status: "waiting" | "being treated" | "discharged";
  estimatedWaitTime: number;
  treatmentStartTime?: number;
  dischargeTime?: number;
}

export interface PatientData {
  name: string;
  condition: string;
  triageLevel: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SimulationOptions {
  duration?: number;
  patientsPerMinute?: number;
}

export interface SimulationResult {
  message: string;
}

export interface Statistics {
  waitingCount: number;
  treatingCount: number;
  dischargedCount: number;
  staffCount: number;
  patientToStaffRatio: number;
  thresholdExceeded: boolean;
}

export interface CriticalPatientEvent {
  message: string;
  patient: {
    id: string;
    name: string;
  };
}

export interface StaffingThresholdEvent {
  message: string;
  ratio: number;
}

export interface PatientTreatingEvent {
  message: string;
  patient: Patient;
}

export interface PatientDischargedEvent {
  message: string;
  patient: Patient;
}

export interface WaitTimeUpdate {
  id: string;
  name: string;
  triageLevel: number;
  waitTime: number;
}

export interface SimulationEndedEvent {
  message: string;
}

export interface MessageResponse {
  message: string;
}

export interface StaffCountResponse extends MessageResponse {
  staffCount: number;
}

export interface ErrorResponse {
  error: string;
}

export interface ValidationErrorResponse {
  errors: string[];
}
