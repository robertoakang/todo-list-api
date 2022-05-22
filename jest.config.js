module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/server/adapters/**',
    '!<rootDir>/src/server.js'
  ],
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'v8'
}
