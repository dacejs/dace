const fs = require('fs');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server-speedy');
const clearConsole = require('react-dev-utils/clearConsole');
const logger = require('../utils/logger');
const paths = require('../webpack/config/paths');
const createConfig = require('../webpack/config/createConfig');
const setPorts = require('../utils/setPorts');

process.noDeprecation = true; // 关闭告警信息，避免对进度条显示产生干扰

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.error('Failed to compile.', e);
    process.exit(1);
  }
  return compiler;
}

function main() {
  logger.start('Compiling...');

  let dace = {};

  if (fs.existsSync(paths.appDaceConfig)) {
    try {
      dace = require(paths.appDaceConfig);
    } catch (e) {
      clearConsole();
      logger.error('Invalid dace.config.js file.', e);
      process.exit(1);
    }
  }

  const clientConfig = createConfig(webpack, dace, 'web', 'dev');
  const serverConfig = createConfig(webpack, dace, 'node', 'dev');

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  // 在确保浏览器端编译成功后再启动服务器端编译
  clientCompiler.plugin('done', (stats) => {
    if (stats.compilation.errors.length === 0) {
      serverCompiler.watch({
        quiet: true,
        stats: 'none'
      }, () => {});
    }
  });

  // Create a new instance of Webpack-dev-server for our client assets.
  // This will actually run on a different port than the users app.
  const clientDevServer = new DevServer(clientCompiler, clientConfig.devServer);

  // Start Webpack-dev-server
  const devPort = (process.env.DACE_PORT && parseInt(process.env.DACE_PORT, 10) + 1) || 3001;
  clientDevServer.listen(devPort, (err) => {
    if (err) {
      logger.error(err);
    }
  });
}

// 确保服务端口可用
setPorts()
  .then(main)
  .catch(console.error);
