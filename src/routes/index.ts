import type { Application } from "express";

import patientRoutes from "./patient.route.js";
import simulationRoutes from "./simulation.route.js";
import statsRoutes from "./stats.route.js";

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message for the API
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Patient management system API
 */
export const setupRoutes = (app: Application): void => {
  app.get("/", (req, res) => {
    res.send("Server running successfully");
  });

  app.use("/patients", patientRoutes);
  app.use("/stats", statsRoutes);
  app.use("/simulation", simulationRoutes);
};
