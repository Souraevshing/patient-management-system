import type { Application } from "express";

import authRoutes from "./auth.route.js";
import patientRoutes from "./patient.route.js";
import simulationRoutes from "./simulation.route.js";
import statsRoutes from "./stats.route.js";

/**
 * @swagger
 * /:
 *   get:
 *     summary: Server health check
 *     description: Returns server health status
 *     responses:
 *       200:
 *         description: Server health
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Patient Management API
 */
export const setupRoutes = (app: Application): void => {
  app.get("/", (req, res) => {
    res.send("Server running successfully");
  });

  app.use("/auth", authRoutes);

  app.use("/patients", patientRoutes);
  app.use("/stats", statsRoutes);
  app.use("/simulation", simulationRoutes);
};
