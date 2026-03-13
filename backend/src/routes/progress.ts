/**
 * Progress Routes - Save and retrieve user progress
 */

import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserProgress } from "../models/UserProgress.js";
import { z } from "zod";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "tdd-mastery-secret-key";

// Zod validation schemas
const progressSchema = z.object({
  moduleId: z.string().min(1, { error: "Module ID is required" }),
  moduleType: z.enum(["quiz", "challenge"]),
  score: z.number().min(0).max(100),
  passed: z.boolean(),
});

function getUserIdFromToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

/**
 * GET /api/progress - Get all progress for current user
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const progress = await UserProgress.find({ userId }).sort({
      completedAt: -1,
    });

    res.json(progress);
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/progress/:moduleId - Get progress for specific module
 */
router.get("/:moduleId", async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { moduleId } = req.params;
    const progress = await UserProgress.findOne({ userId, moduleId });

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    res.json(progress);
  } catch (error) {
    console.error("Get module progress error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/progress - Save progress
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = progressSchema.parse(req.body);
    const { moduleId, moduleType, score, passed } = data;
    const now = new Date();

    // Find existing progress
    const existing = await UserProgress.findOne({ userId, moduleId });

    if (existing) {
      // Update if new score is better or if passed for first time
      if (score > existing.score || (passed && !existing.passed)) {
        existing.score = score;
        existing.passed = passed;
        existing.completedAt = now;
        existing.attempts += 1;
        existing.lastAttemptAt = now;
        await existing.save();
        return res.json(existing);
      }

      // Just increment attempts
      existing.attempts += 1;
      existing.lastAttemptAt = now;
      await existing.save();
      return res.json(existing);
    }

    // Create new progress
    const progress = new UserProgress({
      userId,
      moduleId,
      moduleType,
      score,
      passed,
      completedAt: now,
      attempts: 1,
      lastAttemptAt: now,
    });

    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    console.error("Save progress error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
