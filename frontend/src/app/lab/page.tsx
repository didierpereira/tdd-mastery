/**
 * Lab Index Page
 */

"use client";

import Link from "next/link";
import { challenges } from "@/lib/challengeData";

function ChallengeCard({
  challenge,
}: {
  challenge: { id: string; title: string; description: string; difficulty: string };
}) {
  const difficultyColors = {
    easy: "bg-green-900 text-green-300",
    medium: "bg-yellow-900 text-yellow-300",
    hard: "bg-red-900 text-red-300",
  };

  return (
    <Link
      href={`/lab/${challenge.id}`}
      className="block bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            difficultyColors[challenge.difficulty as keyof typeof difficultyColors]
          }`}
        >
          {challenge.difficulty}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-4">{challenge.description.split("\n")[0]}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{challenge.testCases.length} test cases</span>
        <span className="text-blue-400">Start Challenge →</span>
      </div>
    </Link>
  );
}

export default function LabIndex() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">TDD Lab 🧪</h1>
        <p className="text-xl text-gray-400">
          Practice Test-Driven Development with real coding challenges
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Available Challenges</h2>
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </main>
    </div>
  );
}
