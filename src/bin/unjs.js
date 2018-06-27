#!/usr/bin/env node

const program = require('commander');
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

console.log('==== versions ====');
console.log(`user-agent:\t${process.env.npm_config_user_agent}`);
console.log(`unjs:\t${version}`);
