import nextJest from 'next/jest';
import type { Config } from "jest";


const createJestConfig = nextJest({
    dir: './',
  });

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Jest Test Report",
        outputPath: "./test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    // "<rootDir>/node_modules/",
    "<rootDir>/tests/",
    // "<rootDir>/public/",
    // "<rootDir>/.next/",
    // "<rootDir>/coverage/",
    // "<rootDir>/dist/",
    // "<rootDir>/build/",
  ],
};

export default createJestConfig(config);