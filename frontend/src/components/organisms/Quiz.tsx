/**
 * Quiz Component - Container for quiz flow
 */

"use client";

import { useState } from "react";
import { QuizCard } from "../molecules/QuizCard";
import type { QuizModule, QuizQuestion } from "@/types/quiz";

interface QuizProps {
  module: QuizModule;
  onComplete: (score: number, passed: boolean) => void;
}

export function Quiz({ module, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const currentQuestion = module.questions[currentIndex];
  const totalQuestions = module.questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId: string, answer: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate score
      let correct = 0;
      module.questions.forEach((q) => {
        const userAnswer = answers[q.id];
        if (q.correctAnswer !== undefined) {
          if (userAnswer === q.correctAnswer) correct++;
        } else if (q.options) {
          const correctOption = q.options.find((o) => isCorrect);
          if (userAnswer === correctOption?.id) correct++;
        }
      });

      const calculatedScore = Math.round((correct / totalQuestions) * 100);
      const isPassed = calculatedScore >= module.passingScore;

      setScore(calculatedScore);
      setPassed(isPassed);
      setShowResults(true);
      onComplete(calculatedScore, isPassed);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const canProceed = answers[currentQuestion?.id] !== undefined;

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div
          className={`rounded-lg p-8 text-center ${
            passed ? "bg-green-900 border border-green-700" : "bg-red-900 border border-red-700"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">
            {passed ? "🎉 Congratulations!" : "Keep Practicing!"}
          </h2>
          <p className="text-6xl font-bold mb-4">{score}%</p>
          <p className="text-lg mb-4">
            You got {Math.round((score / 100) * totalQuestions)} out of {totalQuestions} correct
          </p>
          <p className="text-sm text-gray-300">
            {passed
              ? "You've passed this module!"
              : `You need ${module.passingScore}% to pass. Try again!`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <QuizCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentIndex === totalQuestions - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
