module.exports = {
  extends: [
    'eslint-config-qunar'
  ].map(require.resolve),
  env: {
    mocha: true
  },
  rules: {
    'react/forbid-prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-unresolved': [2, { ignore: ['^__CONFIG__', '^__PAGES__$'] }],
    'import/extensions': [2, 'ignorePackages']
  }
};
