import type { Request, Response } from "express";

import {
  startSimulation,
  stopSimulation,
} from "../services/simulationService.js";
import type { SimulationOptions } from "../types/index.js";

// Start a simulation
export const startSimulationController = (
  req: Request,
  res: Response
): void => {
  const options: SimulationOptions = {
    duration: req.body.duration,
    patientsPerMinute: req.body.patientsPerMinute,
  };

  const result = startSimulation(options);

  res.json(result);
};

// Stop a simulation
export const stopSimulationController = (req: Request, res: Response): void => {
  const result = stopSimulation();

  res.json(result);
};
