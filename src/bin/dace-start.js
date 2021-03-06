import fs from 'fs';
import program from 'commander';
import chalk from 'chalk';
import webpack from 'webpack';
import DevServer from 'webpack-dev-server-speedy';
import clearConsole from 'react-dev-utils/clearConsole';
import logger from '../utils/logger';
import createConfig from '../webpack/config/createConfig';
import setPorts from '../utils/setPorts';

program
  .option('-s, --silent', '禁用所有输出信息')
  .option('-v, --verbose', '显示详细日志信息')
  .option('-V, --visualizer', '启用 webpack-visualizer 打包分析工具')
  .parse(process.argv);

process.noDeprecation = true; // 关闭告警信息，避免对进度条显示产生干扰

process.env.NODE_ENV = 'local';

// 捕获 webpack 执行过程中的错误
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    logger.error(`Failed to compile: ${e}`);
    process.exit(1);
  }
  return compiler;
}

function main() {
  const { DACE_PATH_CONFIG, DACE_PATH_CLIENT_DIST } = process.env;
  let dace = {};

  if (fs.existsSync(DACE_PATH_CONFIG)) {
    try {
      dace = require(DACE_PATH_CONFIG);
    } catch (e) {
      clearConsole();
      logger.error('Invalid dace.config.js file.', e);
      process.exit(1);
    }
  }

  const clientConfig = createConfig({ webpack, dace, target: 'web', isDev: true, program });
  const serverConfig = createConfig({ webpack, dace, target: 'node', isDev: true, program });

  logger.start('Compiling...');

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  // 在确保浏览器端编译成功后再启动服务器端编译
  clientCompiler.hooks.done.tap('abc', (stats) => {
  // clientCompiler.plugin('done', (stats) => {
    if (stats.compilation.errors.length === 0 && stats.compilation.warnings.length === 0) {
      if (program.visualizer) {
        const file = `${DACE_PATH_CLIENT_DIST}/stats.html`;
        const message = `\`webpack visualizer\` has been generated.\nOpen it ${chalk.underline(`open file://${file}`)}`;
        logger.info(message);
      }

      serverCompiler.watch({
        quiet: true,
        stats: 'none'
      }, () => {});
    } else {
      logger.error('Client build failed.');
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
