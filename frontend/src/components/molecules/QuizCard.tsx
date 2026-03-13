/**
 * QuizCard Component
 * Displays a single quiz question with options
 */

import type { QuizQuestion } from "@/types/quiz";

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  selectedAnswer?: string | boolean;
  onAnswer: (questionId: string, answer: string | boolean) => void;
}

export function QuizCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
}: QuizCardProps) {
  const isTrueFalse = question.type === "true_false";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Question {questionNumber}</span>
        <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
          {question.level}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-white mb-6">{question.question}</h2>

      {/* Options */}
      <div className="space-y-3">
        {isTrueFalse ? (
          <>
            <button
              onClick={() => onAnswer(question.id, true)}
              className={`w-full p-4 rounded-lg border transition-colors text-left ${
                selectedAnswer === true
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
              }`}
            >
              True
            </button>
            <button
              onClick={() => onAnswer(question.id, false)}
              className={`w-full p-4 rounded-lg border transition-colors text-left ${
                selectedAnswer === false
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
              }`}
            >
              False
            </button>
          </>
        ) : (
          question.options?.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id)}
              className={`w-full p-4 rounded-lg border transition-colors text-left ${
                selectedAnswer === option.id
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
              }`}
            >
              {option.text}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
