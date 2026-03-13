/**
 * Quiz Types and Schemas for TDD Mastery Platform
 */

export const QUIZ_LEVEL = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export const QUESTION_TYPE = {
  TRUE_FALSE: "true_false",
  MULTIPLE_CHOICE: "multiple_choice",
  CONCEPT: "concept",
} as const;

export type QuizLevel = (typeof QUIZ_LEVEL)[keyof typeof QUIZ_LEVEL];
export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  level: QuizLevel;
  question: string;
  explanation: string;
  options?: QuizOption[];
  correctAnswer?: boolean; // For true/false
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  level: QuizLevel;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface QuizAttempt {
  moduleId: string;
  userId: string;
  answers: Record<string, boolean>; // questionId -> isCorrect
  score: number;
  completedAt: Date;
}

export interface QuizResult {
  moduleId: string;
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
