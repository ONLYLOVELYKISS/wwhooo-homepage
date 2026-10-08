// ESLint flat config.
//
// Two environments in one repo: browser code under src/, and Node code for the
// build script, the test suite and this file. The test suite additionally needs
// browser globals because it installs a DOM onto globalThis and then drives the
// built bundle through it.

import js from '@eslint/js';
import globals from 'globals';

const base = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};

const rules = {
  ...js.configs.recommended.rules,
  // `catch {}` and deliberately ignored parameters are used on purpose.
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
};

export default [
  { ignores: ['dist/**', 'node_modules/**', 'design/**'] },
  {
    files: ['src/**/*.js'],
    languageOptions: { ...base, globals: globals.browser },
    rules,
  },
  {
    files: ['scripts/**/*.mjs', '*.js'],
    languageOptions: { ...base, globals: globals.node },
    rules,
  },
  {
    files: ['test/**/*.mjs'],
    languageOptions: { ...base, globals: { ...globals.node, ...globals.browser } },
    rules,
  },
];
