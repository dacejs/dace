const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appManifest: resolveApp('dist/webpack-stats.json'),
  appBabelRc: resolveApp('.babelrc'),
  appEslintRc: resolveApp('.eslintrc.js'),
  appSrc: resolveApp('.'),
  ownServerIndexJs: resolveOwn('src'),
  ownClientIndexJs: resolveOwn('src/client'),
  appServerIndexJs: resolveApp('.'),
  appClientIndexJs: resolveApp('client')
};
