/* eslint-disable quotes */

module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/**/index.ts"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testMatch: ['**/*.spec.ts'],
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  transform: {
    "\\.ts$": "ts-jest"
  },
  clearMocks: true

}
