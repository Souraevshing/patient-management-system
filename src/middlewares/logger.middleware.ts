import type { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.info(
    `${new Date().toISOString()} - ${req.method} ${req.url} ${req.ip}`
  );

  res.on("finish", () => {
    console.info(
      `${new Date().toISOString()} - ${req.method} ${res.statusCode} ${
        req.url
      } ${req.ip}`
    );
  });

  next();
};
