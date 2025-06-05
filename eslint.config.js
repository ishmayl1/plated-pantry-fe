import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,vue}'],
        languageOptions: { globals: globals.browser },
        plugins: { prettier },
        rules: {
            quotes: ['error', 'single'],
            indent: ['error', 4],
            'no-trailing-spaces': 'error',
            'prettier/prettier': ['error', { semi: true }],
            semi: ['error', 'always']
        },
        ignores: ['node_modules/', 'dist/', 'build/']
    },
    prettierConfig,
    pluginVue.configs['flat/essential'],
    { files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc' },
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/commonmark'
    },
    {
        files: ['*.svg'],
        options: {
            parser: 'html',
            printWidth: 120,
            tabWidth: 2,
            singleQuote: false,
            bracketSameLine: false,
            semi: false
        }
    }
]);
