import express, { type Application } from "express";

import { loggerMiddleware } from "../middlewares/logger.middleware.js";
import { rateLimiter } from "../middlewares/rate-limiter.middleware.js";

export const setupMiddleware = (app: Application): void => {
  app.use(express.json());

  app.use(loggerMiddleware);

  app.use(rateLimiter);
};
