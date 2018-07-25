module.exports = {
  extends: ['eslint-config-qunar'].map(require.resolve),
  rules: {
    'no-unused-vars': 0
  }
};
