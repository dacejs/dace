const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = (options) => {
  const babelrcPath = resolve(__dirname, '../../.babelrc');
  const babelrcText = readFileSync(babelrcPath, { encoding: 'utf8' });
  const babelrc = JSON.parse(babelrcText);

  switch (options.target) {
    case 'web':
      babelrc.plugins.push('syntax-dynamic-import');
      break;
    case 'node':
      babelrc.plugins.push('syntax-import-async-component-sync');
      break;
    default:
  }

  return {
    ...babelrc,
    babelrc: false
  };
};
