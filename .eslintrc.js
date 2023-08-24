module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      globalReturn: true,
      modules: true,
    },
  },
  plugins: [
    'react-native',
    'prettier', // https://github.com/prettier/eslint-plugin-prettier
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Prettier plugin to disable all formatting-related ESLint rules to avoid conflict with prettier ones.
    'prettier',
    // Import plugin recommended rules
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    'import/ignore': ['react-native'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/no-cycle': 'off',

    // No index in import part. Ex: ... from './screens/home/index'
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

    // Force imports line to be grouped the import orgigin. More details at:
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    'no-unused-vars': 1,
    semi: ['error', 'always'],
    'react/prop-types': 0,
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-unresolved': [0],
    'import/no-named-as-default': [0],
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'comma-dangle': 0,
    'padded-blocks': 0,
    'arrow-body-style': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-native/split-platform-components': 2,
    // 'react-native/no-inline-styles': 1,
    // 'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 1,
    'react-native/no-color-literals': 0,
    'eslint-disable prettier/prettier': 0,
  },
  globals: {
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true,
  },
};
