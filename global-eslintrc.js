module.exports = {
  rules: {
    curly: ['error', 'multi'],
    'no-shadow': 'off',
    'no-empty-function': 'off',
    'newline-before-return': 'error',
    'arrow-parens': ['error', 'as-needed'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        callSignature: true,
        parameter: true,
        arrowParameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        arrayDestructuring: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
  },
};
