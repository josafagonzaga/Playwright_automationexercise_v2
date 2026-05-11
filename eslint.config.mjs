import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'dist/**',
      'coverage/**',
    ],
  },
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
