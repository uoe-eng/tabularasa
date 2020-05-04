module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
  ],
  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: false,
      },
    },
  },
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier-vue/prettier': 'warn',
    camelcase: 'error',
    'no-console': 'warn',
  },
}
