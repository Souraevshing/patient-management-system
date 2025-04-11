import type { Patient } from "../types/index.js";
import ERQueue from "./er-queue.model.js";

class PatientStore {
  private queue: ERQueue;
  private treatingPatients: Patient[];
  private dischargedPatients: Patient[];

  constructor() {
    this.queue = new ERQueue();
    this.treatingPatients = [];
    this.dischargedPatients = [];
  }

  addPatient(patient: Patient): Patient {
    return this.queue.enqueue(patient);
  }

  getQueuedPatients(): Patient[] {
    return this.queue.getAll();
  }

  moveToTreatment(id: string): Patient | null {
    const patient = this.queue.removeById(id);
    if (patient) {
      patient.status = "being treated";
      patient.treatmentStartTime = Date.now();
      this.treatingPatients.push(patient);
    }
    return patient;
  }

  dischargePatient(id: string): Patient | null {
    const index = this.treatingPatients.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }

    const patient = this.treatingPatients[index];
    patient.status = "discharged";
    patient.dischargeTime = Date.now();

    this.treatingPatients.splice(index, 1);
    this.dischargedPatients.push(patient);

    return patient;
  }

  getPatientById(id: string): Patient | null {
    const queuedPatient = this.queue
      .getAll()
      .find((p: { id: string }) => p.id === id);
    if (queuedPatient) return queuedPatient;

    const treatingPatient = this.treatingPatients.find((p) => p.id === id);
    if (treatingPatient) return treatingPatient;

    const dischargedPatient = this.dischargedPatients.find((p) => p.id === id);
    if (dischargedPatient) return dischargedPatient;

    return null;
  }

  getCounts(): {
    waitingCount: number;
    treatingCount: number;
    dischargedCount: number;
  } {
    return {
      waitingCount: this.queue.size(),
      treatingCount: this.treatingPatients.length,
      dischargedCount: this.dischargedPatients.length,
    };
  }

  getTreatingPatients(): Patient[] {
    return this.treatingPatients;
  }

  getDischargedPatients(): Patient[] {
    return this.dischargedPatients;
  }
}

const patientStore = new PatientStore();

export default patientStore;
