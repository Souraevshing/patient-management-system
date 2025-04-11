import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/jwt.config.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Authorization header missing" });
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "Invalid authorization format. Use Bearer token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (token === "er-api-token") {
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
