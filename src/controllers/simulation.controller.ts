import type { Request, Response } from "express";

import {
  startSimulation,
  stopSimulation,
} from "../services/simulation.service.js";
import type { SimulationOptions } from "../types/index.js";

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

export const stopSimulationController = (req: Request, res: Response): void => {
  const result = stopSimulation();

  res.json(result);
};
