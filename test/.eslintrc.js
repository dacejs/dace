module.exports = {
  extends: [
    'unjs/.eslintrc.js'
  ].map(require.resolve),
  rules: {
    'vars-on-top': 0
  }
};
