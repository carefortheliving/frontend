module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'sourceType': "module",
    'tsconfigRootDir': __dirname,
    'project': ["./tsconfig.json"],
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'import',
    "react-hooks",
    "simple-import-sort",
  ],
  'rules': {
    'react-hooks/exhaustive-deps': 'off',
    'require-jsdoc': 'off',
    'react/prop-types': 'off',
    'array-callback-return': 'off',
    'linebreak-style': 'off',
    'max-len': ["error", { "ignoreStrings": true }],
    'object-curly-spacing': ["error", "always", { "arraysInObjects": false }],
    "indent": ["error", "tab"],
    "no-tabs": "off",
    "max-len": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
  },
  'settings': {
    'import/resolver': {
      'typescript': {},
    },
    "react": {
      "version": "detect"
    },
  },
  "ignorePatterns": ["**/node_modules/**"],
};
