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

  const clientConfig = createConfig('web', 'local', dace, webpack);
  const serverConfig = createConfig('node', 'local', dace, webpack);

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  // Start our server webpack instance in watch mode after assets compile
  clientCompiler.plugin('done', () => {
    serverCompiler.watch(
      {
        quiet: true,
        stats: 'none'
      },
      /* eslint-disable no-unused-vars */
      (stats) => {}
    );
  });

  // Create a new instance of Webpack-dev-server for our client assets.
  // This will actually run on a different port than the users app.
  const clientDevServer = new DevServer(clientCompiler, clientConfig.devServer);

  // Start Webpack-dev-server
  clientDevServer.listen(3001, (err) => {
    if (err) {
      logger.error(err);
    }
  });
}

setPorts()
  .then(main)
  .catch(console.error);
