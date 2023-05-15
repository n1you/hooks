module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                moduleDirectory: ['node_modules', 'src'],
            },
        },
    },
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    plugins: ['github', 'regexp', '@typescript-eslint', 'jest'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:github/recommended',
        'plugin:regexp/recommended',
        '@fullstacksjs',
        '@fullstacksjs/eslint-config/typecheck',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {},
            {
                usePrettierrc: true,
            },
        ],
        'filenames/match-regex': 'off',
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                caughtErrors: 'none',
            },
        ],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'security/detect-object-injection': 'off',
        'simple-import-sort/imports': 'off',
        'no-shadow': 'off',
        'max-lines-per-function': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'no-case-declarations': 'off',
        'ithub/array-foreach': 'off',
        'react/jsx-no-useless-fragment': 'off',
        complexity: 'off',
        'react/jsx-no-leaked-render': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'fp/no-let': 'off',
        'default-param-last': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'github/array-foreach': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        'fp/no-loops': 'off',
        'object-shorthand': 'off',
        "import/no-anonymous-default-export": 'off'
    },
};
