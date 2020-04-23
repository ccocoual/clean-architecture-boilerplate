module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '../global-eslintrc.js',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/require-prop-types': 'off',
  },
};
