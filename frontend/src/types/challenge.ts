/**
 * TDD Challenge Types
 */

export const CHALLENGE_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export type ChallengeDifficulty = (typeof CHALLENGE_DIFFICULTY)[keyof typeof CHALLENGE_DIFFICULTY];

export interface TestCase {
  id: string;
  description: string;
  code: string;
}

export interface TDDChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  starterCode: string;
  testCases: TestCase[];
  solution: string;
  hints: string[];
}

export interface ChallengeAttempt {
  challengeId: string;
  code: string;
  testResults: TestResult[];
  passed: boolean;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  error?: string;
  expected?: string;
  actual?: string;
}
