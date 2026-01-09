import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports/jest',
        outputName: 'junit.xml',
      },
    ],
  ],
};

export default createJestConfig(customJestConfig);
