import type { Request, Response } from "express";

import {
  startSimulation,
  stopSimulation,
} from "../services/simulation.service.js";
import type { SimulationOptions } from "../types/index.js";

/**
 * @swagger
 * /simulation/start:
 *   post:
 *     summary: Start a simulation
 *     tags: [Simulation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SimulationOptions'
 *     responses:
 *       200:
 *         description: Simulation started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Simulation started for 60 minutes with ~1 patients per minute
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /simulation/stop:
 *   post:
 *     summary: Stop a running simulation
 *     tags: [Simulation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Simulation stopped
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Simulation stopped
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const stopSimulationController = (req: Request, res: Response): void => {
  const result = stopSimulation();

  res.json(result);
};
