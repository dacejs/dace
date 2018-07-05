const { readFileSync } = require('fs');
// const { resolve } = require('path');
const getConfigPath = require('./getConfigPath');

module.exports = (options) => {
  const babelrcPath = getConfigPath('.babelrc');
  const babelrcText = readFileSync(babelrcPath, { encoding: 'utf8' });
  const babelrc = JSON.parse(babelrcText);
  // babelrc.plugins.push(resolve(__dirname, '../babel-plugin/index'));
  const { target, ...others } = options;

  switch (target) {
    case 'web':
      babelrc.plugins.push('syntax-dynamic-import');
      break;
    case 'node':
      babelrc.plugins.push('syntax-import-async-component-sync');
      break;
    default:
  }

  return {
    ...others,
    ...babelrc,
    babelrc: false
  };
};
