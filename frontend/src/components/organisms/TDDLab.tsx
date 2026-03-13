/**
 * TDD Lab IDE Component
 * Interactive coding environment for TDD practice
 */

"use client";

import { useState } from "react";
import { CodeEditor } from "../molecules/CodeEditor";
import { runTests, getExecutionOutput } from "@/lib/testRunner";
import type { TDDChallenge, TestResult } from "@/types/challenge";

interface TDDLabProps {
  challenge: TDDChallenge;
}

type TDDPhase = "red" | "green" | "refactor";

export function TDDLab({ challenge }: TDDLabProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [phase, setPhase] = useState<TDDPhase>("red");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const handleRunTests = () => {
    const results = runTests(code, challenge.testCases);
    setTestResults(results);

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      setPhase("green");
    } else {
      setPhase("red");
    }
  };

  const handleShowSolution = () => {
    setCode(challenge.solution);
    const results = runTests(challenge.solution, challenge.testCases);
    setTestResults(results);
    setPhase("green");
  };

  const handleShowHint = () => {
    if (currentHint < challenge.hints.length) {
      setShowHints(true);
    }
  };

  const passedCount = testResults.filter((r) => r.passed).length;
  const totalTests = challenge.testCases.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{challenge.title}</h1>
        <p className="text-gray-400">{challenge.description}</p>
      </div>

      {/* Phase Indicator */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            phase === "red"
              ? "bg-red-600 text-white"
              : "bg-red-900 text-red-300"
          }`}
        >
          🔴 Red
        </div>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            phase === "green"
              ? "bg-green-600 text-white"
              : "bg-green-900 text-green-300"
          }`}
        >
          🟢 Green
        </div>
        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            phase === "refactor"
              ? "bg-blue-600 text-white"
              : "bg-blue-900 text-blue-300"
          }`}
        >
          🔵 Refactor
        </div>

        {testResults.length > 0 && (
          <div className="ml-auto text-gray-400">
            {passedCount}/{totalTests} tests passing
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div>
          <div className="bg-gray-900 border border-gray-800 rounded-t-lg px-4 py-2 flex justify-between items-center">
            <span className="text-sm text-gray-400">solution.js</span>
            <div className="flex gap-2">
              <button
                onClick={handleShowHint}
                disabled={currentHint >= challenge.hints.length}
                className="text-sm px-3 py-1 rounded bg-yellow-900 text-yellow-300 hover:bg-yellow-800 disabled:opacity-50"
              >
                💡 Hint ({currentHint}/{challenge.hints.length})
              </button>
              <button
                onClick={handleShowSolution}
                className="text-sm px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                Show Solution
              </button>
            </div>
          </div>
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
            height="400px"
          />
        </div>

        {/* Test Results */}
        <div className="flex flex-col gap-4">
          {/* Run Tests Button */}
          <button
            onClick={handleRunTests}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
          >
            ▶ Run Tests
          </button>

          {/* Test Output */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Test Results</h3>

            {testResults.length === 0 ? (
              <p className="text-gray-500">Click "Run Tests" to see results</p>
            ) : (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div
                    key={result.testId}
                    className={`p-3 rounded-lg ${
                      result.passed ? "bg-green-900/30" : "bg-red-900/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={result.passed ? "text-green-400" : "text-red-400"}>
                        {result.passed ? "✓" : "✗"}
                      </span>
                      <span className="text-gray-300 text-sm">
                        Test {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {challenge.testCases[index]?.description}
                    </p>
                    {result.error && (
                      <p className="text-red-400 text-xs mt-2">{result.error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hints Panel */}
          {showHints && (
            <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">💡 Hint {currentHint + 1}</h4>
              <p className="text-gray-300">{challenge.hints[currentHint]}</p>
              <button
                onClick={() => setCurrentHint(currentHint + 1)}
                disabled={currentHint >= challenge.hints.length - 1}
                className="mt-3 text-sm text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
              >
                Next Hint →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
