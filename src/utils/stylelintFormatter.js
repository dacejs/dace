const path = require('path');
const chalk = require('chalk');
const table = require('table');
const stringWidth = require('string-width');
const _ = require('lodash');
const symbols = require('log-symbols');
const utils = require('postcss-reporter/lib/util');

const MARGIN_WIDTHS = 9;

const levelColors = {
  info: 'blue',
  warning: 'yellow',
  error: 'red'
};

function logFrom(fromValue) {
  if (fromValue.charAt(0) === '<') {
    return fromValue;
  }

  return path
    .relative(process.cwd(), fromValue)
    .split(path.sep)
    .join('/');
}

const columnWidths = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 };

const calculateWidths = (columns) => {
  _.forOwn(columns, (value, key) => {
    const normalisedValue = value ? value.toString() : value;
    columnWidths[key] = Math.max(
      columnWidths[key],
      stringWidth(normalisedValue)
    );
  });

  return columns;
};

function getMessageWidth(widths) {
  if (!process.stdout.isTTY) {
    return widths[3];
  }

  const availableWidth = process.stdout.columns < 80 ? 80 : process.stdout.columns;
  const fullWidth = _.sum(_.values(columnWidths));

  // If there is no reason to wrap the text, we won't align the last column to the right
  if (availableWidth > fullWidth + MARGIN_WIDTHS) {
    return columnWidths[3];
  }

  return availableWidth - ((fullWidth - columnWidths[3]) + MARGIN_WIDTHS);
}


module.exports = ({ source, messages }) => {
  let output = '\n';

  if (source) {
    output = `${output}${chalk.underline(logFrom(source))}\n`;
  }

  const orderedMessages = _.sortBy(
    messages,
    m => (m.line ? 2 : 1), // positionless first
    m => m.line,
    m => m.column
  );

  const cleanedMessages = orderedMessages.map((message) => {
    const location = utils.getLocation(message);
    const { severity } = message;
    const row = [
      location.line || '',
      location.column || '',
      symbols[severity]
        ? chalk[levelColors[severity]](symbols[severity])
        : severity,
      message.text
        // Remove all control characters (newline, tab and etc)
        .replace(/[\x01-\x1A]+/g, ' ') // eslint-disable-line
        .replace(/\.$/, '')
        .replace(new RegExp(`${_.escapeRegExp(`(${message.rule})`)}$`), ''),
      chalk.dim(message.rule || '')
    ];

    calculateWidths(row);

    return row;
  });

  output += table
    .table(cleanedMessages, {
      border: table.getBorderCharacters('void'),
      columns: {
        0: { alignment: 'right', width: columnWidths[0], paddingRight: 0 },
        1: { alignment: 'left', width: columnWidths[1] },
        2: { alignment: 'center', width: columnWidths[2] },
        3: {
          alignment: 'left',
          width: getMessageWidth(columnWidths),
          wrapWord: true
        },
        4: { alignment: 'left', width: columnWidths[4], paddingRight: 0 }
      },
      drawHorizontalLine: () => false
    })
    .split('\n')
    .map(el => el.replace(/(\d+)\s+(\d+)/, (m, p1, p2) => chalk.dim(`${p1}:${p2}`)))
    .join('\n');

  return output;
};
