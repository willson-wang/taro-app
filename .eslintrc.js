// 具体规则参考https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin

module.exports = {
  'extends': ['taro/react'],
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    // '@typescript-eslint/indent': ['error', 4],
    // '@typescript-eslint/quotes': ['error', 'single'],
    'space-before-function-paren': [
      'error',
      {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always'
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": ["error"]
  }
}
