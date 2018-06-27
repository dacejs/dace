require('../utils/setProcessEnv')({
  NODE_ENV: 'local',
  NODE_PATH: process.cwd()
});

const setBabelOptions = require('../utils/setBabelOptions');

require('babel-register')(setBabelOptions({
  target: 'node'
}));

require('../utils/requireHook');
const app = require('../server');

module.exports = app;
