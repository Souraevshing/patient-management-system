import type { Patient } from "../types/index.js";

class ERQueue {
  private patients: Patient[];

  constructor() {
    this.patients = [];
  }

  enqueue(patient: Patient): Patient {
    this.patients.push(patient);
    this.sort();
    return patient;
  }

  dequeue(): Patient | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.patients.shift() || null;
  }

  sort(): void {
    this.patients.sort((a, b) => {
      if (a.triageLevel !== b.triageLevel) {
        return a.triageLevel - b.triageLevel;
      }
      return a.arrivalTime - b.arrivalTime;
    });
  }

  getAll(): Patient[] {
    return this.patients;
  }

  removeById(id: string): Patient | null {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
    const patient = this.patients[index];
    this.patients.splice(index, 1);
    return patient;
  }

  isEmpty(): boolean {
    return this.patients.length === 0;
  }

  size(): number {
    return this.patients.length;
  }
}

export default ERQueue;
