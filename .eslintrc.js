module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier-vue/recommended'],
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
    camelcase: ["error", {"properties": "never"}],
    'no-console': process.env.NODE_ENV === "production" ? ["error", { "allow": ["error"] }] : "off",
    'no-debugger': process.env.NODE_ENV === "production" ? "error" : "off"
  },
}
