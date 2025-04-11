import type { Application } from "express";

import authRoutes from "./auth.route.js";
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
 *               example: ER Queue Management API
 */
export const setupRoutes = (app: Application): void => {
  app.get("/", (req, res) => {
    res.send("ER Queue Management API");
  });

  app.use("/auth", authRoutes);

  app.use("/patients", patientRoutes);
  app.use("/stats", statsRoutes);
  app.use("/simulation", simulationRoutes);
};
