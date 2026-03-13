import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@stores/(.*)$": "<rootDir>/src/stores/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/test/**",
    "!src/**/types/**",
    "!src/app/**",
  ],
};

export default createJestConfig(config);
