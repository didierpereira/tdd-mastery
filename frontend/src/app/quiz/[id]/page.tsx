/**
 * Individual Quiz Page
 */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Quiz } from "@/components/organisms/Quiz";
import { getQuizById } from "@/lib/quizData";
import type { QuizModule } from "@/types/quiz";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<QuizModule | null>(null);
  const [loading, setLoading] = useState(true);

  const quizId = params.id as string;

  useEffect(() => {
    const quiz = getQuizById(quizId);
    if (quiz) {
      setModule(quiz);
    }
    setLoading(false);
  }, [quizId]);

  const handleComplete = (score: number, passed: boolean) => {
    console.log(`Quiz completed! Score: ${score}%, Passed: ${passed}`);
    // Here you would typically save the result to the backend
  };

  const handleBack = () => {
    router.push("/quiz");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-semibold">{module.title}</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Quiz Content */}
      <main className="py-8">
        <Quiz module={module} onComplete={handleComplete} />
      </main>
    </div>
  );
}
