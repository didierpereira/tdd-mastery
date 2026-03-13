import { render, screen } from "@testing-library/react";
import { HelloTDD } from "./HelloTDD";

describe("HelloTDD", () => {
  it("renders the heading", () => {
    render(<HelloTDD />);
    
    const heading = screen.getByRole("heading", { name: /hello tdd/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders welcome message", () => {
    render(<HelloTDD />);
    
    const message = screen.getByText(/Welcome to TDD Mastery Platform/i);
    expect(message).toBeInTheDocument();
  });
});
