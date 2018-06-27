// eslint disable

const chalk = require('chalk');

module.exports = () => {
  [
    '',
    '  __    __  .__   __.        __       _______.',
    ' |  |  |  | |  \\ |  |       |  |     /       |',
    ' |  |  |  | |   \\|  |       |  |    |   (----`',
    ' |  |  |  | |  . `  | .--.  |  |     \\   \\',
    ' |  `--\'  | |  |\\   | |  `--\'  | .----)   |',
    '  \\______/  |__| \\__|  \\______/  |_______/',
    '',
    ''
  ]
    .forEach((line) => {
        console.log(
          '\t',
          chalk.red(line.substr(0, 11)),
          chalk.green(line.substr(11, 11)),
          chalk.yellow(line.substr(22, 11)),
          chalk.blue(line.substr(33, 13))
        );
      });
};
