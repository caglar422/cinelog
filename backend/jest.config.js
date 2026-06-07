module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: ['src/**/*.ts'],
  testTimeout: 60000,
  globalSetup: './src/__tests__/setup.ts',
  globalTeardown: './src/__tests__/teardown.ts',
};