module.exports = {
  extends: [
    'eslint-config-qunar'
  ].map(require.resolve),
  env: {
    mocha: true
  },
  rules: {
    'no-var': 0,
    'global-require': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-dynamic-require': 0
  }
};
