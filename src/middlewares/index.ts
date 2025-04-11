import express, { type Application } from "express";

import { loggerMiddleware } from "./logger.js";
import { rateLimiter } from "./rateLimiter.js";

export const setupMiddleware = (app: Application): void => {
  app.use(express.json());

  app.use(loggerMiddleware);

  app.use(rateLimiter);
};
