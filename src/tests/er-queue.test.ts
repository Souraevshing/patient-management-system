import { v4 as uuidv4 } from "uuid";
import { beforeEach, describe, expect, it } from "vitest";

import ERQueue from "../models/er-queue.model.js";
import type { Patient } from "../types/index.js";

describe("ERQueue", () => {
  let queue: ERQueue;

  beforeEach(() => {
    queue = new ERQueue();
  });

  it("should start empty", () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  it("should enqueue patients correctly", () => {
    const patient: Patient = {
      id: uuidv4(),
      name: "John Doe",
      condition: "Fever",
      triageLevel: 3,
      arrivalTime: Date.now(),
      status: "waiting",
      estimatedWaitTime: 0,
    };

    queue.enqueue(patient);
    expect(queue.size()).toBe(1);
    expect(queue.isEmpty()).toBe(false);
  });

  it("should dequeue patients in priority order", () => {
    const now = Date.now();

    const patient1: Patient = {
      id: uuidv4(),
      name: "Patient 1",
      condition: "Moderate pain",
      triageLevel: 3,
      arrivalTime: now,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    const patient2: Patient = {
      id: uuidv4(),
      name: "Patient 2",
      condition: "Cardiac arrest",
      triageLevel: 1,
      arrivalTime: now + 1000,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    const patient3: Patient = {
      id: uuidv4(),
      name: "Patient 3",
      condition: "Fracture",
      triageLevel: 3,
      arrivalTime: now - 1000,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    queue.enqueue(patient1);
    queue.enqueue(patient2);
    queue.enqueue(patient3);

    expect(queue.dequeue()?.id).toBe(patient2.id);
    expect(queue.dequeue()?.id).toBe(patient3.id);
    expect(queue.dequeue()?.id).toBe(patient1.id);
    expect(queue.isEmpty()).toBe(true);
  });

  it("should sort patients by triage level first", () => {
    const now = Date.now();

    const patient1: Patient = {
      id: uuidv4(),
      name: "Patient 1",
      condition: "Cold symptoms",
      triageLevel: 5,
      arrivalTime: now - 5000,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    const patient2: Patient = {
      id: uuidv4(),
      name: "Patient 2",
      condition: "Chest pain",
      triageLevel: 2,
      arrivalTime: now,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    queue.enqueue(patient1);
    queue.enqueue(patient2);

    const patients = queue.getAll();
    expect(patients[0].id).toBe(patient2.id);
  });

  it("should sort patients by arrival time within the same triage level", () => {
    const now = Date.now();

    const patient1: Patient = {
      id: uuidv4(),
      name: "Patient 1",
      condition: "Fracture",
      triageLevel: 3,
      arrivalTime: now,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    const patient2: Patient = {
      id: uuidv4(),
      name: "Patient 2",
      condition: "Moderate pain",
      triageLevel: 3,
      arrivalTime: now - 1000,
      status: "waiting",
      estimatedWaitTime: 0,
    };

    queue.enqueue(patient1);
    queue.enqueue(patient2);

    const patients = queue.getAll();
    expect(patients[0].id).toBe(patient2.id);
  });

  it("should remove patients by ID", () => {
    const patient1: Patient = {
      id: uuidv4(),
      name: "Patient 1",
      condition: "Fracture",
      triageLevel: 3,
      arrivalTime: Date.now(),
      status: "waiting",
      estimatedWaitTime: 0,
    };

    const patient2: Patient = {
      id: uuidv4(),
      name: "Patient 2",
      condition: "Chest pain",
      triageLevel: 2,
      arrivalTime: Date.now(),
      status: "waiting",
      estimatedWaitTime: 0,
    };

    queue.enqueue(patient1);
    queue.enqueue(patient2);

    const removed = queue.removeById(patient1.id);
    expect(removed?.id).toBe(patient1.id);
    expect(queue.size()).toBe(1);
    expect(queue.getAll()[0].id).toBe(patient2.id);
  });

  it("should return null when removing a non-existent patient", () => {
    const result = queue.removeById("non-existent-id");
    expect(result).toBe(null);
  });
});
