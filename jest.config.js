module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/config/**'
  ],
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'v8'
}
