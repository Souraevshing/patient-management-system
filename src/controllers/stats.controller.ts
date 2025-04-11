import type { Request, Response } from "express";

import { getStatistics } from "../services/patient.service.js";
import { getStaffCount, updateStaffCount } from "../utils/staffing.util.js";

export const getStatsController = (req: Request, res: Response): void => {
  const stats = getStatistics();
  res.json(stats);
};

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get system statistics
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const updateStaffCountController = (
  req: Request,
  res: Response
): void => {
  const { count } = req.body;

  if (!count || !Number.isInteger(count) || count <= 0) {
    res.status(400).json({ error: "Staff count must be a positive integer" });
    return;
  }

  const updated = updateStaffCount(count);

  if (!updated) {
    res.status(400).json({ error: "Failed to update staff count" });
    return;
  }

  res.json({
    message: "Staff count updated",
    staffCount: getStaffCount(),
  });
};
