module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['@brightlayer-ui/eslint-config/tsx'],
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        jest: true,
    },
    plugins: ['react-hooks'],
    rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'no-empty-function': 'off',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: [
                    'classProperty',
                    'objectLiteralProperty',
                    'typeProperty',
                    'classMethod',
                    'objectLiteralMethod',
                    'typeMethod',
                    'accessor',
                    'enumMember',
                ],
                format: null,
                modifiers: ['requiresQuotes'],
            },
        ],
    },
};
