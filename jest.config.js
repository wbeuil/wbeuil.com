module.exports = {
  roots: ['./src'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/components/Boop.tsx',
    '!src/pages/_document.tsx',
    '!src/pages/api/**',
    '!src/utils/**',
  ],
  moduleDirectories: ['node_modules', './src'],
  setupFilesAfterEnv: ['./config/jest/rtl.setup.ts'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    '.*\\.css$': '<rootDir>/config/mocks/css.js',
    '.*\\.svg$': '<rootDir>/config/mocks/svg.ts',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  testEnvironment: 'jsdom',
};
