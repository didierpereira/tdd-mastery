/**
 * Module Registry - Dynamic module loading system
 * 
 * This pattern allows easy scaling of the platform by registering
 * modules dynamically instead of hardcoding them.
 */

import type { QuizModule } from "../types/quiz";
import type { TDDChallenge } from "../types/challenge";

// Module types
export type ModuleType = "quiz" | "challenge";

export interface ModuleMetadata {
  id: string;
  type: ModuleType;
  title: string;
  description: string;
  difficulty?: string;
  level?: string;
  questionCount?: number;
  testCaseCount?: number;
  estimatedMinutes?: number;
}

// Registry storage
const quizRegistry = new Map<string, QuizModule>();
const challengeRegistry = new Map<string, TDDChallenge>();

/**
 * Register a quiz module
 */
export function registerQuiz(module: QuizModule): void {
  quizRegistry.set(module.id, module);
}

/**
 * Register a challenge
 */
export function registerChallenge(challenge: TDDChallenge): void {
  challengeRegistry.set(challenge.id, challenge);
}

/**
 * Get a quiz by ID
 */
export function getQuiz(id: string): QuizModule | undefined {
  return quizRegistry.get(id);
}

/**
 * Get a challenge by ID
 */
export function getChallenge(id: string): TDDChallenge | undefined {
  return challengeRegistry.get(id);
}

/**
 * Get all quizzes
 */
export function getAllQuizzes(): QuizModule[] {
  return Array.from(quizRegistry.values());
}

/**
 * Get all challenges
 */
export function getAllChallenges(): TDDChallenge[] {
  return Array.from(challengeRegistry.values());
}

/**
 * Get metadata for all modules (lightweight info for listings)
 */
export function getAllModuleMetadata(): ModuleMetadata[] {
  const quizMeta: ModuleMetadata[] = getAllQuizzes().map((q) => ({
    id: q.id,
    type: "quiz" as ModuleType,
    title: q.title,
    description: q.description,
    level: q.level,
    questionCount: q.questions.length,
    estimatedMinutes: q.questions.length * 2,
  }));

  const challengeMeta: ModuleMetadata[] = getAllChallenges().map((c) => ({
    id: c.id,
    type: "challenge" as ModuleType,
    title: c.title,
    description: c.description,
    difficulty: c.difficulty,
    testCaseCount: c.testCases.length,
    estimatedMinutes: c.testCases.length * 5,
  }));

  return [...quizMeta, ...challengeMeta];
}

/**
 * Get modules by type
 */
export function getModulesByType(type: ModuleType): ModuleMetadata[] {
  return getAllModuleMetadata().filter((m) => m.type === type);
}

/**
 * Initialize registry with default modules
 * Call this once at app startup
 */
export function initializeRegistry(): void {
  // Import and register all modules
  // This is done lazily to avoid circular dependencies
  
  const { quizModules } = require("../lib/quizData");
  quizModules.forEach(registerQuiz);
  
  const { challenges } = require("../lib/challengeData");
  challenges.forEach(registerChallenge);
}
