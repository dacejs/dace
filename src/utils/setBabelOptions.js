const { readFileSync } = require('fs');
const getConfigPath = require('./getConfigPath');

/**
 * 获取 babelrc 的配置
 * @param {object} options
 * @param {object} options.target 等同 webpack.config.target
 * @param {object} options.others 除 options.target 外的其它参数，这些参数会直接追加到
 * babelrc 配置对象
 * @return {object} babelrc 配置对象
 */
module.exports = (options) => {
  const babelrcPath = getConfigPath('.babelrc');
  const babelrcText = readFileSync(babelrcPath, { encoding: 'utf8' });
  const babelrc = JSON.parse(babelrcText);
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
