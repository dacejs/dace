require('../utils/setProcessEnv')({
  NODE_ENV: 'local',
  NODE_PATH: process.cwd()
});

const program = require('commander');

program
  .option('-v, --no-verbose', '禁用日志输出功能')
  .parse(process.argv);

const setBabelOptions = require('../utils/setBabelOptions');

require('babel-register')(setBabelOptions({
  target: 'node'
}));

require('../utils/requireHook');
const app = require('../server');

module.exports = app;
