const path = require('path');
const fs = require('fs');

// 确保项目文件夹中的任何链接都被解析
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '../../..', relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appBabelRc: resolveApp('.babelrc'),
  appEslintRc: resolveApp('.eslintrc.js'),
  appPostcssRc: resolveApp('postcss.config.js'),
  appSrc: resolveApp('src'),
  appPages: resolveApp('src/pages'),
  appServerIndexJs: resolveApp('src/server.js'),
  appClientIndexJs: resolveApp('src/client.js'),
  appNodeModules: resolveApp('node_modules'),
  appClientBuild: resolveApp('prd'),
  appServerBuild: resolveApp('dist'),
  appStatsJson: resolveApp('prd/webpack-stats.json'),
  appDaceConfig: resolveApp('dace.config.js'),
  ownServerIndexJs: resolveOwn('dist/core/server.js'),
  ownClientIndexJs: resolveOwn('dist/core/client.js')
};
