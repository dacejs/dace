module.exports = {
  extends: [
    'dace/.eslintrc.js'
  ].map(require.resolve),
  rules: {
    'vars-on-top': 0
  }
};
