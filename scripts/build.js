#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';
import yargs from 'yargs';
import chalk from 'chalk';
import { dist } from '../config/isapp';

const { argv } = yargs.usage('$0 [args]').help();

// eslint-disable-next-line
const config = require(`../config/webpack/build${argv.host === 'client' ? 'Client' : 'Server'}`);

webpack(config, (err, stats) => {
  if (err) {
    console.log(err);
  } else if (stats.hasErrors()) {
    const message = chalk.red(`[build]: 💔 Webpack 打包失败。\n${stats.compilation.errors}`);
    console.error(message);
    // 让 jenkins 终止编译
    process.exit(1);
  } else {
    const filename = resolve(__dirname, `../${dist}/webpack-stats.json`);
    const json = stats.toJson({
      all: false,
      publicPath: true,
      chunks: true
    });
    if (argv.host === 'client') {
      writeFileSync(filename, JSON.stringify(json));
    }
  }
});
