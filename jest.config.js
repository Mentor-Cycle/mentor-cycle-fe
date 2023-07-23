// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

// Add any custom config to be passed to Jest
const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jest-environment-jsdom",
  // moduleNameMapper: {
  //   "^@components/(.*)$": "<rootDir>/src/components/$1",
  //   "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
  //   "^@types/(.*)$": "<rootDir>/src/types/$1",
  //   "^/(.*)$": "<rootDir>/src/$1",
  // },
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
