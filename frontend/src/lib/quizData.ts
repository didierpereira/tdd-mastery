import type { QuizModule } from "../types/quiz";

export const tddBasicsQuiz: QuizModule = {
  id: "tdd-basics-001",
  title: "TDD Fundamentals",
  description: "Test the basics of Test-Driven Development",
  level: "beginner",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      type: "true_false",
      level: "beginner",
      question: "In TDD, you write the test before the implementation code.",
      explanation:
        "True! TDD follows the Red-Green-Refactor cycle: first write a failing test (Red), then write the minimum code to pass (Green), then refactor.",
      correctAnswer: true,
    },
    {
      id: "q2",
      type: "true_false",
      level: "beginner",
      question: "The 'Green' phase in TDD means the test is failing.",
      explanation:
        "False! Green means all tests are passing. Red means tests are failing.",
      correctAnswer: false,
    },
    {
      id: "q3",
      type: "concept",
      level: "beginner",
      question: "What does the 'Refactor' phase involve?",
      explanation:
        "After making tests pass, you can improve the code structure without breaking functionality. This is the refactor phase.",
      options: [
        {
          id: "a",
          text: "Writing more tests",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Improving code structure while keeping tests green",
          isCorrect: true,
        },
        {
          id: "c",
          text: "Deleting tests",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Deploying to production",
          isCorrect: false,
        },
      ],
    },
    {
      id: "q4",
      type: "true_false",
      level: "beginner",
      question: "TDD helps catch regressions early.",
      explanation:
        "True! By having a comprehensive test suite, you can immediately detect when new changes break existing functionality.",
      correctAnswer: true,
    },
    {
      id: "q5",
      type: "concept",
      level: "beginner",
      question: "Which is the correct TDD cycle order?",
      explanation:
        "The correct order is: Write failing test (Red) → Write minimal code to pass (Green) → Refactor code.",
      options: [
        {
          id: "a",
          text: "Refactor → Red → Green",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Green → Red → Refactor",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Red → Green → Refactor",
          isCorrect: true,
        },
        {
          id: "d",
          text: "Test → Code → Deploy",
          isCorrect: false,
        },
      ],
    },
  ],
};

export const jestFundamentalsQuiz: QuizModule = {
  id: "jest-fundamentals-001",
  title: "Jest Fundamentals",
  description: "Master the basics of Jest testing framework",
  level: "beginner",
  passingScore: 70,
  questions: [
    {
      id: "j1",
      type: "true_false",
      level: "beginner",
      question: "describe() is used to group related tests in Jest.",
      explanation:
        "True! describe() creates a block that groups together several related tests.",
      correctAnswer: true,
    },
    {
      id: "j2",
      type: "true_false",
      level: "beginner",
      question: "test() and it() are aliases in Jest.",
      explanation:
        "True! Both test() and it() can be used interchangeably to define a test.",
      correctAnswer: true,
    },
    {
      id: "j3",
      type: "concept",
      level: "beginner",
      question: "What does expect(value).toBe(expected) do?",
      explanation:
        "toBe uses exact equality (===). For objects, use toEqual for deep comparison.",
      options: [
        {
          id: "a",
          text: "Checks if values are the same object reference",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Performs deep equality check",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Uses strict equality (===)",
          isCorrect: true,
        },
        {
          id: "d",
          text: "Checks if value exists",
          isCorrect: false,
        },
      ],
    },
  ],
};

export const quizModules: QuizModule[] = [tddBasicsQuiz, jestFundamentalsQuiz];

export function getQuizById(id: string): QuizModule | undefined {
  return quizModules.find((module) => module.id === id);
}

export function getQuizzesByLevel(
  level: "beginner" | "intermediate" | "advanced"
): QuizModule[] {
  return quizModules.filter((module) => module.level === level);
}
