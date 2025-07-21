// https://docs.expo.dev/guides/using-eslint/
import stylistic from '@stylistic/eslint-plugin';
import expoConfig from 'eslint-config-expo/flat.js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  stylistic.configs.customize({
    semi: true,
    braceStyle: '1tbs',
  }),
  {
    rules: {
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'never', avoidEscape: true }],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
  },
]);
