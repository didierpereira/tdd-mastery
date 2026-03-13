/**
 * Quiz Scoring Service - Business Logic
 */

export interface Answer {
  questionId: string;
  answer?: string | boolean;
}

export interface QuizScoreResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  breakdown: Array<{
    questionId: string;
    isCorrect: boolean;
    correctAnswer: string;
    userAnswer: string;
  }>;
}

interface QuizQuestion {
  id: string;
  correctAnswer?: boolean;
  options?: Array<{
    id: string;
    isCorrect: boolean;
  }>;
}

interface QuizModule {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
}

/**
 * Calculate quiz score based on user answers
 */
export function calculateScore(
  module: QuizModule,
  answers: Answer[]
): QuizScoreResult {
  const breakdown: QuizScoreResult["breakdown"] = [];
  let correctAnswers = 0;

  for (const question of module.questions) {
    const userAnswer = answers.find((a) => a.questionId === question.id);
    let isCorrect = false;
    let correctAnswerStr = "";
    let userAnswerStr = "";

    if (question.correctAnswer !== undefined) {
      // True/False question
      correctAnswerStr = String(question.correctAnswer);
      userAnswerStr = userAnswer ? String(userAnswer.answer) : "unanswered";
      isCorrect =
        userAnswer?.answer === question.correctAnswer;
    } else if (question.options) {
      // Multiple choice
      const correctOption = question.options.find((o) => o.isCorrect);
      correctAnswerStr = correctOption?.id || "";
      userAnswerStr = userAnswer ? String(userAnswer.answer) : "unanswered";
      isCorrect =
        userAnswer?.answer === correctAnswerStr;
    }

    if (isCorrect) {
      correctAnswers++;
    }

    breakdown.push({
      questionId: question.id,
      isCorrect,
      correctAnswer: correctAnswerStr,
      userAnswer: userAnswerStr,
    });
  }

  const totalQuestions = module.questions.length;
  const score = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0;

  return {
    score,
    totalQuestions,
    correctAnswers,
    passed: score >= module.passingScore,
    breakdown,
  };
}

/**
 * Validate quiz submission
 */
export function validateAnswers(
  module: QuizModule,
  answers: Answer[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check if all questions are answered
  const answeredIds = new Set(answers.map((a) => a.questionId));
  for (const question of module.questions) {
    if (!answeredIds.has(question.id)) {
      errors.push(`Question ${question.id} is not answered`);
    }
  }

  // Validate answer format
  for (const answer of answers) {
    if (!answer.questionId || answer.answer === undefined) {
      errors.push("Invalid answer format");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
