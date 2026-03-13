/**
 * Quiz List - Display available quizzes
 */

"use client";

import Link from "next/link";
import { quizModules } from "@/lib/quizData";
import type { QuizModule } from "@/types/quiz";

function QuizCard({ module }: { module: QuizModule }) {
  return (
    <Link
      href={`/quiz/${module.id}`}
      className="block bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{module.title}</h3>
        <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
          {module.level}
        </span>
      </div>
      <p className="text-gray-400 mb-4">{module.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{module.questions.length} questions</span>
        <span>{module.passingScore}% to pass</span>
      </div>
    </Link>
  );
}

export default function QuizList() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">TDD Mastery</h1>
        <p className="text-xl text-gray-400">
          Learn Test-Driven Development through interactive quizzes
        </p>
        
        {/* Navigation */}
        <nav className="flex gap-4 mt-6">
          <Link
            href="/quiz"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            📝 Quizzes
          </Link>
          <Link
            href="/lab"
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600"
          >
            🧪 TDD Lab
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Available Modules</h2>
        <div className="grid gap-6">
          {quizModules.map((module) => (
            <QuizCard key={module.id} module={module} />
          ))}
        </div>
      </main>
    </div>
  );
}
