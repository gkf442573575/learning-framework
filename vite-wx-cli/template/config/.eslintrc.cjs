/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  globals: {
    $: true,
    wx: true,
    browser: true,
    chrome: true,
    window: true,
    define: true,
    history: true,
    location: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-undef': 2,
    'no-undef-init': 2,
    'no-async-promise-executor': 'off',
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    'no-useless-escape': 0,
    'template-curly-spacing': [2, 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    "vue/no-setup-props-destructure": 'off'
  }
}
