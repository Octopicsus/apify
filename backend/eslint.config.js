import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import apifyJestConfig from '@apify/eslint-config/jest';
import apifyTypescriptConfig from '@apify/eslint-config/ts';

export default tseslint.config(
    {
        ignores: ['dist', '**/*.js'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            apifyTypescriptConfig,
            apifyJestConfig,
            eslintPluginPrettierRecommended
        ],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            ecmaVersion: 2023,
            globals: globals.node,
        },
        rules: {
            "prettier/prettier": [
                "error",
                {
                    "singleQuote": true,
                    "trailingComma": "all",
                    "useTabs": false,
                    "tabWidth": 4,
                    "printWidth": 120
                }
            ],
            "no-bitwise": 0,
        }
    },
)
