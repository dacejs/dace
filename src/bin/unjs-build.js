#!/usr/bin/env node

require('babel-register');
const program = require('commander');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const { dist } = require('../../config/unjs');

program
  .option('-h, --host', '环境类型')
  .parse(process.argv);

// eslint-disable-next-line
const config = require(`../../config/webpack/build${program.host === 'client' ? 'Client' : 'Server'}`);

webpack(config, (err, stats) => {
  if (err) {
    console.log(err);
  } else if (stats.hasErrors()) {
    const message = chalk.red(`[build]: 💔 Webpack 打包失败。\n${stats.compilation.errors}`);
    console.error(message);
    // 让 jenkins 终止编译
    process.exit(1);
  } else {
    const filename = resolve(__dirname, `../../${dist}/webpack-stats.json`);
    const json = stats.toJson({
      all: false,
      publicPath: true,
      chunks: true
    });
    if (program.host === 'client') {
      writeFileSync(filename, JSON.stringify(json));
    }
  }
});
