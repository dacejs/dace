const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
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
  appBuild: resolveApp('prd'),
  appStatsJson: resolveApp('prd/webpack-stats.json'),
  appDaceConfig: resolveApp('dace.config.js'),
  ownServerIndexJs: resolveOwn('dist/core/server.js'),
  ownClientIndexJs: resolveOwn('dist/core/client.js')
};
