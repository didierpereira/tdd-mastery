/**
 * Test Runner - Executes user code against test cases
 * Uses sandboxed JavaScript execution
 */

import type { TestCase, TestResult, TDDChallenge } from "../types/challenge";

interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

/**
 * Execute user code in a sandboxed environment
 */
function executeCode(userCode: string, testCode: string): ExecutionResult {
  try {
    // Create a sandboxed environment
    const sandbox = {
      console: {
        log: (...args: unknown[]) => output.push(args.join(" ")),
        error: (...args: unknown[]) => output.push("ERROR: " + args.join(" ")),
      },
      setTimeout: () => {},
      setInterval: () => {},
      clearTimeout: () => {},
      clearInterval: () => {},
    };

    const output: string[] = [];

    // Create user function
    const userFn = new Function(
      "sandbox",
      `
      const console = sandbox.console;
      ${userCode}
      return typeof validateLogin !== 'undefined' ? { validateLogin } : {};
    `
    );

    const userExports = userFn(sandbox);

    if (!userExports.validateLogin) {
      return {
        success: false,
        output: output.join("\n"),
        error: "validateLogin function not found. Make sure you define it!",
      };
    }

    // Make validateLogin available globally for test code
    const testFn = new Function(
      "validateLogin",
      "sandbox",
      `
      const console = sandbox.console;
      ${testCode}
    `
    );

    testFn(userExports.validateLogin, sandbox);

    return {
      success: true,
      output: output.join("\n"),
    };
  } catch (error) {
    return {
      success: false,
      output: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Run all test cases for a challenge
 */
export function runTests(
  userCode: string,
  testCases: TestCase[]
): TestResult[] {
  const results: TestResult[] = [];

  for (const testCase of testCases) {
    const result = executeCode(userCode, testCase.code);

    results.push({
      testId: testCase.id,
      passed: result.success && !result.error,
      error: result.error,
      expected: testCase.description,
      actual: result.success ? "Test passed" : result.error,
    });
  }

  return results;
}

/**
 * Get execution output from all tests
 */
export function getExecutionOutput(
  userCode: string,
  testCases: TestCase[]
): string {
  const outputs: string[] = [];

  for (const testCase of testCases) {
    const result = executeCode(userCode, testCase.code);
    outputs.push(
      `Test: ${testCase.description}\n` +
        (result.success
          ? `✓ Passed\n${result.output}`
          : `✗ Failed: ${result.error}`)
    );
  }

  return outputs.join("\n\n");
}
