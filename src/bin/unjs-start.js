process.env.NODE_ENV = 'local';
process.env.NODE_PATH = process.cwd();
// https://www.cnblogs.com/accordion/p/6074350.html
module.constructor._initPaths(); // eslint-disable-line

const setBabelOptions = require('../utils/setBabelOptions');

require('babel-register')(setBabelOptions({
  target: 'node'
}));

require('../utils/requireHook');
const app = require('../server');

module.exports = app;
