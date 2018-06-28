require('../utils/setProcessEnv')({
  NODE_PATH: process.cwd()
});

const { error, warn } = require('npmlog');
const program = require('commander');
const webpack = require('webpack');

program
  .option('-t, --type <build-type>', '指定编译类型(all|client|server)', 'all')
  .option('-v, --no-verbose', '禁用日志输出功能')

  .parse(process.argv);

const { verbose } = program;

const webpackExec = (config, callback) => {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      if (program.verbose) {
        error('build', '打包失败 %s', err || stats.compilation.errors);
      }
      // 让 jenkins 退出编译
      process.exit(1);
    } else if (stats.hasWarnings()) {
      if (program.verbose) {
        warn('build', stats.compilation.errors);
      }
    }
    if (callback) {
      callback();
    }
  });
};

const clientConfig = require('../config/webpack/buildClient')({ verbose });
const serverConfig = require('../config/webpack/buildServer')({ verbose });

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
webpackExec(configs[0], () => {
  if (configs.length === 2) {
    webpackExec(configs[1]);
  }
});
