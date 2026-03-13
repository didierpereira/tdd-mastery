/**
 * QuizCard Component Tests
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { QuizCard } from "./QuizCard";
import type { QuizQuestion } from "@/types/quiz";

const mockQuestion: QuizQuestion = {
  id: "q1",
  type: "true_false",
  level: "beginner",
  question: "TDD means Test Driven Development?",
  explanation: "Yes! TDD stands for Test-Driven Development.",
};

const mockMultiChoiceQuestion: QuizQuestion = {
  id: "q2",
  type: "concept",
  level: "beginner",
  question: "What comes first in TDD?",
  explanation: "First you write a failing test.",
  options: [
    { id: "a", text: "Implementation", isCorrect: false },
    { id: "b", text: "Test", isCorrect: true },
    { id: "c", text: "Refactor", isCorrect: false },
  ],
};

describe("QuizCard", () => {
  it("renders a true/false question correctly", () => {
    const onAnswer = jest.fn();
    render(
      <QuizCard
        question={mockQuestion}
        questionNumber={1}
        onAnswer={onAnswer}
      />
    );

    expect(screen.getByText("TDD means Test Driven Development?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /true/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /false/i })).toBeInTheDocument();
  });

  it("renders a multiple choice question correctly", () => {
    const onAnswer = jest.fn();
    render(
      <QuizCard
        question={mockMultiChoiceQuestion}
        questionNumber={2}
        onAnswer={onAnswer}
      />
    );

    expect(screen.getByText("What comes first in TDD?")).toBeInTheDocument();
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Refactor")).toBeInTheDocument();
  });

  it("calls onAnswer when a true/false option is clicked", () => {
    const onAnswer = jest.fn();
    render(
      <QuizCard
        question={mockQuestion}
        questionNumber={1}
        onAnswer={onAnswer}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /true/i }));
    expect(onAnswer).toHaveBeenCalledWith("q1", true);
  });

  it("calls onAnswer when a multiple choice option is clicked", () => {
    const onAnswer = jest.fn();
    render(
      <QuizCard
        question={mockMultiChoiceQuestion}
        questionNumber={2}
        onAnswer={onAnswer}
      />
    );

    fireEvent.click(screen.getByText("Test"));
    expect(onAnswer).toHaveBeenCalledWith("q2", "b");
  });

  it("shows question number and level", () => {
    const onAnswer = jest.fn();
    render(
      <QuizCard
        question={mockQuestion}
        questionNumber={3}
        onAnswer={onAnswer}
      />
    );

    expect(screen.getByText("Question 3")).toBeInTheDocument();
    expect(screen.getByText("beginner")).toBeInTheDocument();
  });

  it("highlights the selected answer", () => {
    const onAnswer = jest.fn();
    render(
      <QuizCard
        question={mockQuestion}
        questionNumber={1}
        selectedAnswer={true}
        onAnswer={onAnswer}
      />
    );

    const trueButton = screen.getByRole("button", { name: /true/i });
    expect(trueButton).toHaveClass("bg-blue-600");
  });
});
