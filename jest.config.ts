/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    'repositories',
    'jestGlobalMocks.ts',
    '<rootDir>/src/server.ts',
    '<rootDir>/src/app.ts',
    '<rootDir>/src/database',
    '<rootDir>/src/controllers',
    '<rootDir>/src/middlewares',
    '<rootDir>/src/repositories',
    '<rootDir>/src/routes',
    '<rootDir>/src/routers',
    '<rootDir>/src/schemas',
    '<rootDir>/src/services/testsService.ts',
    '<rootDir>/src/utils',
    '<rootDir>/tests'
  ],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}
