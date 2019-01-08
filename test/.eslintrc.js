module.exports = {
  extends: ['eslint-config-qunar'].map(require.resolve),
  rules: {
    'object-curly-newline': 0,
    'func-names': 0,
    'prefer-arrow-callback': 0
  }
};
