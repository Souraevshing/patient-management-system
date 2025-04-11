import cors from "cors";
import express, { type Application } from "express";
import swaggerUI from "swagger-ui-express";

import swaggerSpec from "./config/swagger.config.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { setupMiddleware } from "./middlewares/index.js";
import { setupRoutes } from "./routes/index.js";

const app: Application = express();

setupMiddleware(app);

setupRoutes(app);

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:5000", "https://localhost:5000"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorHandler);

export default app;
