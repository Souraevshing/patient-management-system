import { describe, expect, it } from "vitest";

import type { PatientData } from "../types/index.js";
import { validatePatientData } from "../utils/validators.util.js";

describe("Validators", () => {
  describe("validatePatientData", () => {
    it("should validate correct patient data", () => {
      const data: PatientData = {
        name: "John Doe",
        condition: "Chest pain",
        triageLevel: 2,
      };

      const result = validatePatientData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it("should reject missing name", () => {
      const data: PatientData = {
        name: "",
        condition: "Chest pain",
        triageLevel: 2,
      };

      const result = validatePatientData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Name is required");
    });

    it("should reject missing condition", () => {
      const data: PatientData = {
        name: "John Doe",
        condition: "",
        triageLevel: 2,
      };

      const result = validatePatientData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Condition is required");
    });

    it("should reject missing triage level", () => {
      const data: Partial<PatientData> = {
        name: "John Doe",
        condition: "Chest pain",
      };

      const result = validatePatientData(data as PatientData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Triage level is required");
    });

    it("should reject invalid triage level (non-integer)", () => {
      const data: PatientData = {
        name: "John Doe",
        condition: "Chest pain",
        triageLevel: 2.5,
      };

      const result = validatePatientData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Triage level must be an integer between 1 and 5"
      );
    });

    it("should reject invalid triage level (out of range)", () => {
      const data: PatientData = {
        name: "John Doe",
        condition: "Chest pain",
        triageLevel: 6,
      };

      const result = validatePatientData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Triage level must be an integer between 1 and 5"
      );
    });

    it("should reject multiple invalid fields", () => {
      const data: Partial<PatientData> = {
        triageLevel: 0,
      };

      const result = validatePatientData(data as PatientData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(3);
    });
  });
});
