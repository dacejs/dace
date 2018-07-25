const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '../../..', relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBabelRc: resolveApp('.babelrc'),
  appEslintRc: resolveApp('.eslintrc.js'),
  appPostcssRc: resolveApp('postcss.config.js'),
  appSrc: resolveApp('src'),
  appPages: resolveApp('src/pages'),
  appServerIndexJs: resolveApp('src/index.js'),
  appClientIndexJs: resolveApp('src/client.js'),
  appNodeModules: resolveApp('node_modules'),
  appBuild: resolveApp('build'),
  appManifest: resolveApp('build/webpack-stats.json'),
  ownServerIndexJs: resolveOwn('src/core/index.js'),
  ownClientIndexJs: resolveOwn('src/core/client.js')
};
