const program = require('commander');
const webpack = require('webpack');
const log = require('npmlog');
const setBabelOptions = require('../utils/setBabelOptions');
const getWebpackConfig = require('../utils/getWebpackConfig');

program
  .option('-t, --type <build-type>', '指定编译类型(client|server)')
  .option('-v, --no-verbose', '禁用日志输出功能')
  .parse(process.argv);

const { verbose, type } = program;
if (!verbose) {
  log.level = 'error';
}

const configFile = type === 'client' ? 'buildClient' : 'buildServer';
const target = type === 'client' ? 'web' : 'node';

require('babel-register')(setBabelOptions({ target }));

const config = getWebpackConfig(configFile); // eslint-disable-line

// build:server 依赖 build:client
// 需要确保 build:client 编译成功后再启动 build:server
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    log.error('build', '打包失败 %s', err || stats.compilation.errors);
    // 让 jenkins 退出编译
    process.exit(1);
  } else if (stats.hasWarnings()) {
    log.warn('build', stats.compilation.errors);
  }
});
