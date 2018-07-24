#!/usr/bin/env node

const program = require('commander');
const logger = require('../utils/logger');
const { version } = require('../../package.json');
require('../utils/env');

program
  .command('dev', '启动本地服务', { isDefault: true })
  .parse(process.argv);

logger.info(`using dace@${version}`);
logger.info(`using ${process.env.npm_config_user_agent}`);
console.log();
