import nextJest from "next/jest.js";

import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@actions/(.*)$": "<rootDir>/src/app/actions/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^next/image$": "<rootDir>/__mocks__/next/image.tsx",
    "^next-auth$": "<rootDir>/__mocks__/next-auth.ts",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/src/e2e/",
  ],
  setupFiles: ["<rootDir>/jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};

export default createJestConfig(config);
