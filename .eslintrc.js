module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  plugins: ['prettier'],
  rules: {
    // override/add rules settings here, such as:
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase']
    // 'vue/no-unused-vars': 'error'
  }
}
