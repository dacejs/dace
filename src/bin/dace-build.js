// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at:', p, 'reason:', reason);
// });

import fs from 'fs';
import chalk from 'chalk';
import webpack from 'webpack';
import program from 'commander';
import clearConsole from 'react-dev-utils/clearConsole';
import { measureFileSizesBeforeBuild, printFileSizesAfterBuild } from 'react-dev-utils/FileSizeReporter';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import logger from '../utils/logger';
import paths from '../webpack/config/paths';
import createConfig from '../webpack/config/createConfig';
import printErrors from '../utils/printErrors';

process.noDeprecation = true; // 关闭告警信息，避免对进度条显示产生干扰

program
  .option('-v, --verbose', '显示详细日志信息')
  .option('-V, --visualizer', '启用 webpack-visualizer 打包分析工具')
  .parse(process.argv);

// 捕捉 webpack 编译过程中的错误
function compile(config, cb) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors('Failed to compile.', [e]);
    process.exit(1);
  }
  compiler.run((err, stats) => {
    cb(err, stats);
  });
}

function build(previousFileSizes) {
  let dace = {};

  if (fs.existsSync(paths.appDaceConfig)) {
    try {
      dace = require(paths.appDaceConfig);
    } catch (e) {
      clearConsole();
      logger.error(`Invalid dace.config.js file. ${e}`);
      process.exit(1);
    }
  }

  const clientConfig = createConfig({ webpack, dace, target: 'web', isDev: false, program });
  const serverConfig = createConfig({ webpack, dace, target: 'node', isDev: false, program });

  console.log('Creating an optimized production build...');
  if (program.verbose) {
    console.log('Client build config:');
    console.dir(clientConfig, { showHidden: true, depth: 10 });
  }
  console.log('Compiling client...');

  return new Promise((resolve, reject) => {
    compile(clientConfig, (clientError, clientStats) => { // eslint-disable-line
      if (clientError) {
        reject(clientError);
      }
      const clientMessages = formatWebpackMessages(clientStats.toJson({}, true));
      if (clientMessages.errors.length) {
        return reject(new Error(clientMessages.errors.join('\n\n')));
      }

      console.log(chalk.green('Compiled client successfully.'));
      if (program.visualizer) {
        const file = `${paths.appClientBuild}/stats.html`;
        const message = `\`webpack visualizer\` has been generated.\nOpen it ${chalk.underline(`open file://${file}`)}`;
        logger.info(message);
      }

      if (program.verbose) {
        console.log('Server build config:');
        console.dir(serverConfig, { showHidden: true, depth: 10 });
      }
      console.log('Compiling server...');

      compile(serverConfig, (serverError, serverStats) => {
        if (serverError) {
          reject(serverError);
        }
        const serverMessages = formatWebpackMessages(serverStats.toJson({}, true));
        if (serverMessages.errors.length) {
          return reject(new Error(serverMessages.errors.join('\n\n')));
        }
        console.log(chalk.green('Compiled server successfully.'));
        return resolve({
          stats: clientStats,
          previousFileSizes,
          warnings: Object.assign(
            {},
            clientMessages.warnings,
            serverMessages.warnings
          )
        });
      });
    });
  });
}

measureFileSizesBeforeBuild(paths.appClientBuild)
  .then(previousFileSizes => build(previousFileSizes))
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(`\nSearch for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`);
        console.log(`To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`);
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }
      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(stats, previousFileSizes, paths.appClientBuild);
      console.log();
    },
    (err) => {
      console.log(chalk.red('Failed to compile.\n'));
      console.log(`${err.message || err}\n`);
      process.exit(1);
    }
  );
