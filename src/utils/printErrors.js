import chalk from 'chalk';

/**
 * Print an array of errors to console.
 *
 * @param {string} summary Summary of error
 * @param {Array<Error>} errors Array of Errors
 */
export default (summary, errors) => {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((err) => {
    console.log(err.message || err);
    console.log();
  });
};
