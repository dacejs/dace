/**
 * 在 CLI 输入 dace logo
 */

const chalk = require('chalk');

module.exports = () => {
  [
    '',
    '___  ____ ____ ____',
    '|  \\ |__| |    |___',
    '|__/ |  | |___ |___',
    '',
    ''
  ]
    .forEach((line) => {
      console.log(
        '\t',
        chalk.red(line.substr(0, 4)),
        chalk.green(line.substr(5, 4)),
        chalk.yellow(line.substr(10, 4)),
        chalk.blue(line.substr(15, 4))
      );
    });
};
