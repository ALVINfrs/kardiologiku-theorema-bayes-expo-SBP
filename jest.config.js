/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/src/ui/**/*.test.{ts,tsx}'],
  setupFiles: ['./jest.setup.js'],
  resolver: './jest.resolver.js',
};
