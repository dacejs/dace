process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('chalk');
const webpack = require('webpack');
const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const logger = require('../utils/logger');
const paths = require('../webpack/config/paths');
const createConfig = require('../webpack/config/createConfig');
const printErrors = require('../utils/printErrors');

process.noDeprecation = true; // 关闭告警信息，避免对进度条显示产生干扰

// Wrap webpack compile in a try catch.
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
      logger.error('Invalid dace.config.js file.', e);
      process.exit(1);
    }
  }

  const clientConfig = createConfig(webpack, dace, 'web', false);
  const serverConfig = createConfig(webpack, dace, 'node', false);

  console.log('Creating an optimized production build...');
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

measureFileSizesBeforeBuild(paths.appBuild)
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
      printFileSizesAfterBuild(stats, previousFileSizes, paths.appBuild);
      console.log();
    },
    (err) => {
      console.log(chalk.red('Failed to compile.\n'));
      console.log(`${err.message || err}\n`);
      process.exit(1);
    }
  );
