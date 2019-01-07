/**
 * 该文件只包含和文件路径相关的配置
 * 且只能在node环境下（即除 `core` 目录以外）使用
 * core 目录中的所有代码都会被 webpack 打包，core 目录中的代码中不能使用 `fs` `path` 等 node 内置包
 * core 目录中代码中的配置只能从 process.env 中获取
 */
import { resolve } from 'path';
import { existsSync, realpathSync } from 'fs';

// 确保项目中的所有地址是 `resolved` 处理过的
const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);
const resolveDace = relativePath => resolve(__dirname, '../../..', relativePath);

const defaultConfig = {
  // 工程根目录
  appRoot: '.',

  // babel 配置文件位置
  appBabelRc: '.babelrc',

  // eslint 配置文件位置
  appEslintRc: '.eslintrc.js',

  // postcss 配置文件位置
  appPostcssRc: 'postcss.config.js',

  // profiles 目录位置
  appProfiles: 'profiles',

  // src 目录位置
  appSrc: 'src',

  // pages 目录位置
  appPages: 'src/pages',

  // 服务器端编译入口文件位置
  appServerIndexJs: 'src/server.js',

  // 浏览器端编译入口文件位置
  appClientIndexJs: 'src/client.js',

  // node_modules 目录位置
  appNodeModules: 'node_modules',

  // 浏览器端编译产物输出目录位置
  appClientBuild: 'prd',

  // 服务器端编译产物输出目录位置
  appServerBuild: 'dist',

  // 浏览器端编译输出的版本文件位置
  appStatsJson: 'prd/webpack-stats.json'
};

const appDaceConfig = resolveApp('dace.config.js');
const daceConfig = existsSync(appDaceConfig) ? require(appDaceConfig) : {};

// 将相对路径转换为绝对路径
Object.keys(defaultConfig).forEach((key) => {
  // 让 dace.config.js 覆盖 paths.js 中的配置
  defaultConfig[key] = (key in daceConfig) ?
    resolveApp(daceConfig[key]) :
    resolveApp(defaultConfig[key]);
});

export default {
  ownServerIndexJs: resolveDace('dist/core/server.js'),
  ownClientIndexJs: resolveDace('dist/core/client.js'),
  appDaceConfig,
  ...defaultConfig
};
