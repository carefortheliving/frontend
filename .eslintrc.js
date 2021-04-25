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
  },
  'settings': {
    'import/resolver': {
      'typescript': {},
    },
    "react": {
      "version": "detect"
    },
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
  },
};
