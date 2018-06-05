module.exports = {
  extends: [
    'eslint-config-qunar'
  ].map(require.resolve),
  rules: {
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0
  }
};
