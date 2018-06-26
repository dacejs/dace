process.env.BABEL_ENV = 'server';
process.env.NODE_ENV = 'local';
process.env.NODE_PATH = process.cwd();
require('babel-register');
require('../utils/requireHook');
require('../server');
