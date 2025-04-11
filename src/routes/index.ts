import type { Application } from "express";

import patientRoutes from "./patientRoutes.js";
import simulationRoutes from "./simulationRoutes.js";
import statsRoutes from "./statsRoutes.js";

export const setupRoutes = (app: Application): void => {
  // Home route
  app.get("/", (req, res) => {
    res.send("ER Queue Management API");
  });

  // API routes
  app.use("/patients", patientRoutes);
  app.use("/stats", statsRoutes);
  app.use("/simulation", simulationRoutes);
};
