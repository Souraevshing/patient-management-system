export const MAX_PATIENT_TO_STAFF_RATIO = 5;
export const DEFAULT_STAFF_COUNT = 3;

export const BASE_WAIT_TIMES: Record<number, number> = {
  1: 0,
  2: 10 * 60000,
  3: 30 * 60000,
  4: 60 * 60000,
  5: 120 * 60000,
};

export const ADDITIONAL_WAIT_PER_PATIENT = 5 * 60000;
