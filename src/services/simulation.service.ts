import type { SimulationOptions, SimulationResult } from "../types/index.js";
import { addPatient } from "./patientService.js";
import { emitEvent } from "./socketService.js";

let simulationInterval: NodeJS.Timeout | null = null;

// Start a simulation that randomly adds patients
export const startSimulation = (
  options: SimulationOptions = {}
): SimulationResult => {
  const { duration = 60, patientsPerMinute = 1 } = options;

  // Clear any existing simulation
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }

  let simulationTime = 0;

  simulationInterval = setInterval(() => {
    // Generate random patients
    const randomPatients = Math.floor(Math.random() * patientsPerMinute) + 1;

    for (let i = 0; i < randomPatients; i++) {
      const triageLevel = Math.floor(Math.random() * 5) + 1;

      addPatient({
        name: `Simulated Patient ${Math.floor(Math.random() * 1000)}`,
        condition: `Simulated Condition ${triageLevel}`,
        triageLevel,
      });
    }

    simulationTime++;

    // End simulation after specified duration
    if (simulationTime >= duration) {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
      }
      emitEvent("simulationEnded", { message: "Simulation has ended" });
    }
  }, 60000); // Run every minute

  return {
    message: `Simulation started for ${duration} minutes with ~${patientsPerMinute} patients per minute`,
  };
};

// Stop an ongoing simulation
export const stopSimulation = (): SimulationResult => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    emitEvent("simulationEnded", {
      message: "Simulation has been stopped manually",
    });
    return { message: "Simulation stopped" };
  }

  return { message: "No simulation running" };
};
