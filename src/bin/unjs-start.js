process.env.BABEL_ENV = 'server';
process.env.NODE_ENV = 'local';
require('babel-register');
require('../utils/requireHook');
require('../server');
