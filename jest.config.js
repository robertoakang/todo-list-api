module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js'
  ],
  coverageProvider: 'v8'
}
