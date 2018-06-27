#!/usr/bin/env node

const program = require('commander');
const { info } = require('npmlog');
const logo = require('../utils/logo');
const { version } = require('../../package.json');

program
  .command('start', '启动本地服务', { isDefault: true })
  .command('build', '编译项目')
  .option('-l, --no-logo', '隐藏logo图标')
  .parse(process.argv);

if (program.logo) {
  logo();
}

info('time', new Date());
info('using', 'unjs@%s', version);
info('using', process.env.npm_config_user_agent);
