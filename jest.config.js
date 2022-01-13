module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/build/',
    '<rootDir>/.yalc',
    'utils',
  ],
  moduleNameMapper: {
    '\\.(sass|scss|css)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/build/',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/types.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/**/*.(stories|test).{js,jsx,ts,tsx}',
  ],
};
