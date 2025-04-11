import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== "Bearer er-api-token") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};
