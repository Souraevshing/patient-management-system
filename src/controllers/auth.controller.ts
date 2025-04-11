import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN } from "../config/jwt.config.js";

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Generate a JWT token for API authentication
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 expiresIn:
 *                   type: string
 *                   example: 24h
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const generateToken = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      expiresIn: JWT_EXPIRES_IN,
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
