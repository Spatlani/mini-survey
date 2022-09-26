module.exports = {
  setupFiles: ["<rootDir>/tests/index.js"],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },

  moduleFileExtensions: ['js', 'vue', 'json'],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|jpeg|mp3|ttf|woff|woff2)$': 'jest-transform-stub'
  },

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],

  preset: '@vue/cli-plugin-unit-jest/presets/no-babel'
}
