module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:react-hooks/recommended',
    ],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', 'react-hooks', 'jsx-a11y'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      "no-unused-vars": "off",
      "react/prop-types": "off",
			"react/no-unescaped-entities": "off",
			"no-debugger":"off"
    },
    settings: {
      react: { version: 'detect' },
    },
  };