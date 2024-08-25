import globals from 'globals'
import eslint from '@eslint/js'
import ts from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import pluginReactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import { fixupConfigRules } from '@eslint/compat'

export default ts.config({
  files: ['src/**/*.{ts,tsx}'],
  extends: [
    eslint.configs.recommended,
    ...ts.configs.recommended,
    ...fixupConfigRules(pluginReactConfig),
    ...fixupConfigRules(pluginReactJSXRuntime),
  ],
  languageOptions: {
    parserOptions: { ecmaFeatures: { jsx: true } },
    globals: {
      ...globals.browser,
      ...globals.es2022,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  },
  ignores: ['build/*', 'node_modules/*', 'vite.config.js'],
})
