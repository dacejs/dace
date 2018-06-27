require('../utils/setProcessEnv')({
  NODE_PATH: process.cwd()
});

const { error, warn } = require('npmlog');
const program = require('commander');
const webpack = require('webpack');

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
  if (err || stats.hasErrors()) {
    error('build', '打包失败 %s', err || stats.compilation.errors);
    // 让 jenkins 退出编译
    process.exit(1);
  } else if (stats.hasWarnings()) {
    warn('build', stats.compilation.errors);
  }
  if (configs[1]) {
    webpack(configs[1], (err, stats) => { // eslint-disable-line
      if (err || stats.hasErrors()) {
        error('build', '打包失败 %s', err || stats.compilation.errors);
        // 让 jenkins 退出编译
        process.exit(1);
      } else if (stats.hasWarnings()) {
        warn('build', stats.compilation.errors);
      }
    });
  }
});
