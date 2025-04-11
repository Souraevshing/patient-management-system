import express from "express";

import { generateToken } from "../controllers/auth.controller.js";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */
const router = express.Router();

router.post("/token", generateToken);

export default router;
