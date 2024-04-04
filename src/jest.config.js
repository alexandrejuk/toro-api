module.exports = {
  testTimeout: 10000,
  testMatch: ["<rootDir>/src/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};