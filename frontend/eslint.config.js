import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import apifyTypescriptConfig from '@apify/eslint-config/ts';

export default tseslint.config(
    {
        ignores: ['dist', '**/*.js'],
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            apifyTypescriptConfig,
            tseslint.configs.recommendedTypeChecked,
            eslintPluginPrettierRecommended,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'import/extensions': 'off',
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
        },
    },
);
