import express, { Request, Response } from "express";
import { calculateScore, validateAnswers } from "../services/quizService";
import { quizModules, getQuizById } from "../data/quizData";

const router = express.Router();

/**
 * GET /api/quiz - List all quiz modules
 */
router.get("/", (_req: Request, res: Response) => {
  const modules = quizModules.map(({ questions, ...rest }) => ({
    ...rest,
    questionCount: questions.length,
  }));
  res.json(modules);
});

/**
 * GET /api/quiz/:id - Get specific quiz module
 */
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const quiz = getQuizById(id);

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  // Remove correct answers from response
  const { questions, ...quizWithoutAnswers } = quiz;
  res.json({
    ...quizWithoutAnswers,
    questions: questions.map(({ correctAnswer, options, ...q }) => ({
      ...q,
      options: options?.map(({ isCorrect, ...o }) => o),
    })),
  });
});

/**
 * POST /api/quiz/:id/submit - Submit quiz answers
 */
router.post("/:id/submit", (req: Request, res: Response) => {
  const { id } = req.params;
  const { answers, userId } = req.body;

  const quiz = getQuizById(id);

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  // Validate answers
  const validation = validateAnswers(quiz, answers);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  // Calculate score
  const result = calculateScore(quiz, answers);

  res.json({
    moduleId: id,
    userId,
    ...result,
  });
});

export default router;
