#!/usr/bin/env node

/* eslint global-require: 0 */

const program = require('commander');
const webpack = require('webpack');
const chalk = require('chalk');

program
  .option('-t, --type <build-type>', '指定编译类型(all|client|server)', 'all')
  .parse(process.argv);

const clientConfig = require('../config/webpack/buildClient');
const serverConfig = require('../config/webpack/buildServer');

let configs;

switch (program.type) {
  case 'client':
    configs = [clientConfig];
    break;
  case 'server':
    configs = [serverConfig];
    break;
  default:
    configs = [clientConfig, serverConfig];
}

// build:server 依赖 build:client
// 需要确保 build:client 编译成功后再启动 build:server
webpack(configs[0], (err, stats) => {
  if (err) {
    console.log(err);
  } else if (stats.hasErrors()) {
    const message = chalk.red(`[build]: 💔 Webpack 打包失败。\n${stats.compilation.errors}`);
    console.error(message);
    // 让 jenkins 终止编译
    process.exit(1);
  } else if (stats.hasWarnings()) {
    const message = chalk.yellow(stats.compilation.errors);
    console.error(message);
  }
  if (configs[1]) {
    webpack(configs[1], (err, stats) => { // eslint-disable-line
      if (err) {
        console.log(err);
      } else if (stats.hasErrors()) {
        const message = chalk.red(`[build]: 💔 Webpack 打包失败。\n${stats.compilation.errors}`);
        console.error(message);
        // 让 jenkins 终止编译
        process.exit(1);
      } else if (stats.hasWarnings()) {
        const message = chalk.yellow(stats.compilation.errors);
        console.error(message);
      }
    });
  }
});
