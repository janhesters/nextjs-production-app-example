export default {
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/tests/mocks/style-mock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  setupFiles: ['<rootDir>/src/tests/setup-environment-variables.js'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
