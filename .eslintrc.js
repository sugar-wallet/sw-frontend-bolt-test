module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    'import/no-duplicates': 2, // disabling multiple lines import from same file
    // 'no-console': 2, // disabling console statement
    'unused-imports/no-unused-imports': 2, // remove unsed imports
    'react-hooks/exhaustive-deps': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // first of all import builtin modules like fs, path, etc..
          'external', // then third party libraries like lodash etc..
          'internal', // then our internal absolute imports
          'index', // then relatively import something from current directory
          'sibling', // then relatively import something inside nested directory of current directory
          'parent', // then relatively import some thing from parent directory
          'object', // lastly object if any,
          'unknown'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */
        }
      }
    ]
  }
}
