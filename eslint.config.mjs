import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'dist', 'build', 'node_modules', '*.css', '*.scss', '*.svg']
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            react,
            'react-hooks': reactHooks,
            prettier
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules
        },
        settings: {
            react: {
                version: 'detect' // Or specify your version, e.g., '18.2'
            }
        }
    },
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: { jsx: true }
            },
            sourceType: 'module'
        }
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            'react/react-in-jsx-scope': 'off', // Not needed for React 17+
            'react/prop-types': 'off', // Not needed with TypeScript
            '@typescript-eslint/no-unsafe-assignment': 'warn' // Checks rules of Hooks
        }
    }
);
