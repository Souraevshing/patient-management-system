import express, { type Application } from "express";

import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { setupMiddleware } from "./middlewares/index.js";
import { setupRoutes } from "./routes/index.js";

const app: Application = express();

setupMiddleware(app);

setupRoutes(app);

app.use(errorHandler);

export default app;
