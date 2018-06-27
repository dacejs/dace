process.env.NODE_ENV = 'local';

const setBabelOptions = require('../utils/setBabelOptions');

require('babel-register')(setBabelOptions({
  target: 'node'
}));
require('../utils/requireHook');
const app = require('../server');

module.exports = app;
