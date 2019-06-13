module.exports = {
  extends: ['eslint-config-qunar'].map(require.resolve),
  rules: {
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'react/jsx-one-expression-per-line': 0
  }
};
