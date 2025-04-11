import type { Request, Response } from "express";
import { getStatistics } from "../services/patientService.js";
import { getStaffCount, updateStaffCount } from "../utils/staffingUtils.js";

// Get system statistics
export const getStatsController = (req: Request, res: Response): void => {
  const stats = getStatistics();
  res.json(stats);
};

// Update staff count
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
