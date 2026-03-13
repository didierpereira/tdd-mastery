/**
 * Quiz Scoring Service Tests
 */

import { calculateScore, validateAnswers } from "../services/quizService";

describe("Quiz Scoring Service", () => {
  const mockQuizModule = {
    id: "test-001",
    questions: [
      {
        id: "q1",
        correctAnswer: true,
      },
      {
        id: "q2",
        correctAnswer: false,
      },
      {
        id: "q3",
        options: [
          { id: "a", isCorrect: false },
          { id: "b", isCorrect: true },
          { id: "c", isCorrect: false },
        ],
      },
    ],
    passingScore: 70,
  };

  describe("calculateScore", () => {
    it("should return 100% when all answers are correct", () => {
      const answers = [
        { questionId: "q1", answer: true },
        { questionId: "q2", answer: false },
        { questionId: "q3", answer: "b" },
      ];

      const result = calculateScore(mockQuizModule, answers);

      expect(result.score).toBe(100);
      expect(result.correctAnswers).toBe(3);
      expect(result.totalQuestions).toBe(3);
      expect(result.passed).toBe(true);
    });

    it("should return 0% when all answers are wrong", () => {
      const answers = [
        { questionId: "q1", answer: false },
        { questionId: "q2", answer: true },
        { questionId: "q3", answer: "a" },
      ];

      const result = calculateScore(mockQuizModule, answers);

      expect(result.score).toBe(0);
      expect(result.correctAnswers).toBe(0);
      expect(result.passed).toBe(false);
    });

    it("should return 67% when 2 out of 3 are correct", () => {
      const answers = [
        { questionId: "q1", answer: true },
        { questionId: "q2", answer: true }, // wrong
        { questionId: "q3", answer: "b" }, // correct
      ];

      const result = calculateScore(mockQuizModule, answers);

      expect(result.score).toBe(67);
      expect(result.correctAnswers).toBe(2);
    });

    it("should pass when score meets passing threshold", () => {
      const answers = [
        { questionId: "q1", answer: true }, // correct
        { questionId: "q2", answer: false }, // correct
        { questionId: "q3", answer: "a" }, // wrong
      ];

      const result = calculateScore(mockQuizModule, answers);

      expect(result.score).toBe(67);
      expect(result.passed).toBe(false); // 67 < 70
    });

    it("should handle unanswered questions as incorrect", () => {
      const answers = [
        { questionId: "q1", answer: true },
        // q2 not answered
        { questionId: "q3", answer: "b" },
      ];

      const result = calculateScore(mockQuizModule, answers);

      expect(result.score).toBe(67);
      expect(result.breakdown[1].isCorrect).toBe(false);
      expect(result.breakdown[1].userAnswer).toBe("unanswered");
    });

    it("should provide detailed breakdown of each answer", () => {
      const answers = [
        { questionId: "q1", answer: true },
        { questionId: "q2", answer: false },
        { questionId: "q3", answer: "c" },
      ];

      const result = calculateScore(mockQuizModule, answers);

      expect(result.breakdown).toHaveLength(3);
      expect(result.breakdown[0].questionId).toBe("q1");
      expect(result.breakdown[0].isCorrect).toBe(true);
      expect(result.breakdown[2].isCorrect).toBe(false);
    });
  });

  describe("validateAnswers", () => {
    it("should return valid when all questions are answered", () => {
      const answers = [
        { questionId: "q1", answer: true },
        { questionId: "q2", answer: false },
        { questionId: "q3", answer: "b" },
      ];

      const result = validateAnswers(mockQuizModule, answers);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should return errors when questions are missing", () => {
      const answers = [
        { questionId: "q1", answer: true },
        // q2 and q3 missing
      ];

      const result = validateAnswers(mockQuizModule, answers);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Question q2 is not answered");
      expect(result.errors).toContain("Question q3 is not answered");
    });

    it("should return errors for invalid answer format", () => {
      const answers = [
        { questionId: "q1", answer: true },
        { questionId: "q2" }, // missing answer
        { questionId: "q3", answer: "b" },
      ];

      const result = validateAnswers(mockQuizModule, answers);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Invalid answer format");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty quiz module", () => {
      const emptyModule = {
        id: "empty",
        questions: [],
        passingScore: 70,
      };

      const result = calculateScore(emptyModule, []);

      expect(result.score).toBe(0);
      expect(result.totalQuestions).toBe(0);
      expect(result.passed).toBe(false);
    });
  });
});
