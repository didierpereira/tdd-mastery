/**
 * TDD Challenge: Login Form Validation
 * 
 * Challenge: Implement a validateLogin function that:
 * - Accepts an object with email and password
 * - Returns an object with isValid and errors
 * - Email must be valid format
 * - Password must be at least 8 characters
 */

import type { TDDChallenge } from "../types/challenge";

export const loginFormChallenge: TDDChallenge = {
  id: "login-form-validation-001",
  title: "Login Form Validation",
  description: `Implement a \`validateLogin\` function that validates login form input.

**Requirements:**
- Email must be a valid email format
- Password must be at least 8 characters long
- Return \`{ isValid: boolean, errors: string[] }\``,
  difficulty: "easy",
  starterCode: `function validateLogin(formData) {
  // Your implementation here
  // Return { isValid: boolean, errors: string[] }
}

// Export for testing
module.exports = { validateLogin };`,
  testCases: [
    {
      id: "test-1",
      description: "Valid email and password should pass",
      code: `const { validateLogin } = require('./solution');
const result = validateLogin({ email: 'test@example.com', password: 'password123' });
if (!result.isValid) throw new Error('Expected isValid to be true');
if (result.errors.length !== 0) throw new Error('Expected no errors');
console.log('✓ Test 1 passed');`,
    },
    {
      id: "test-2",
      description: "Invalid email should fail",
      code: `const { validateLogin } = require('./solution');
const result = validateLogin({ email: 'invalid', password: 'password123' });
if (result.isValid) throw new Error('Expected isValid to be false');
if (!result.errors.some(e => e.includes('email'))) throw new Error('Expected email error');
console.log('✓ Test 2 passed');`,
    },
    {
      id: "test-3",
      description: "Short password should fail",
      code: `const { validateLogin } = require('./solution');
const result = validateLogin({ email: 'test@example.com', password: 'short' });
if (result.isValid) throw new Error('Expected isValid to be false');
if (!result.errors.some(e => e.includes('password'))) throw new Error('Expected password error');
console.log('✓ Test 3 passed');`,
    },
    {
      id: "test-4",
      description: "Empty fields should fail",
      code: `const { validateLogin } = require('./solution');
const result = validateLogin({ email: '', password: '' });
if (result.isValid) throw new Error('Expected isValid to be false');
if (result.errors.length === 0) throw new Error('Expected errors');
console.log('✓ Test 4 passed');`,
    },
  ],
  solution: `function validateLogin(formData) {
  const errors = [];
  
  // Validate email
  if (!formData.email) {
    errors.push('Email is required');
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
    errors.push('Email is invalid');
  }
  
  // Validate password
  if (!formData.password) {
    errors.push('Password is required');
  } else if (formData.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = { validateLogin };`,
  hints: [
    "Use a regex to validate email format: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/",
    "Check if the password length is less than 8 characters",
    "Return an object with isValid (boolean) and errors (array)",
  ],
};

export const challenges: TDDChallenge[] = [loginFormChallenge];

export function getChallengeById(id: string): TDDChallenge | undefined {
  return challenges.find((c) => c.id === id);
}
