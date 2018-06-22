#!/usr/bin/env node

const program = require('commander');
const { version } = require('../../package.json');

console.log('Versions:');
console.log(` user-agent: ${process.env.npm_config_user_agent}`);
console.log(` packing: ${version}`);

program
  .command('start', '启动本地服务', { isDefault: true })
  // .command('serve-dist', 'review build output')
  // .alias('serve:dist')
  .command('build', '编译项目')
  .parse(process.argv);
