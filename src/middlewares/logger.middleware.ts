import type { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
