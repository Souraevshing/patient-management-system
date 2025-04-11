import type { Application } from "express";

import patientRoutes from "./patient.route.js";
import simulationRoutes from "./simulation.route.js";
import statsRoutes from "./stats.route.js";

export const setupRoutes = (app: Application): void => {
  app.get("/", (req, res) => {
    res.send("Server running successfully");
  });

  app.use("/patients", patientRoutes);
  app.use("/stats", statsRoutes);
  app.use("/simulation", simulationRoutes);
};
