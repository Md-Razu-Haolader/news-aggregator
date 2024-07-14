module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'filenames'],
  overrides: [
    {
      files: ['src/controllers/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-]*\.controller$`],
      },
    },
    {
      files: ['src/services/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-]*\.service$`],
      },
    },
    {
      files: ['src/helpers/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-]*\.helper$`],
      },
    },
    {
      files: ['src/middleware/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-]*\.middleware$`],
      },
    },
    {
      files: ['src/providers/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-]*\.provider$`],
      },
    },
    {
      files: ['src/validators/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-]*\.validator$`],
      },
    },
    {
      files: ['src/repositories/*.ts'],
      rules: {
        'filenames/match-regex': [2, `^[a-z-.]*repository$`],
      },
    },
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'property',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: null,
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: ['objectLiteralProperty', 'classProperty', 'classMethod', 'function', 'objectLiteralMethod'],
        format: null,
        custom: {
          regex: `[a-zA-Z]Data$`,
          match: false,
        },
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
  },
};
