/**
 * 支持的环境变量如下：
 * NODE_ENV: NODE_ENV，由编译系统传入
 * PROFILE: 编译系统分组编号，由编译系统传入
 * DACE_PATH_ROOT: 工程根目录位置，测试可能用到
 * DACE_PATH_PROFILES: `profiles` 目录的绝对路径位置
 */
import fs from 'fs';
import logger from './logger';
import defaultEnv from './defaultEnv';
import resolveApp from './resolveApp';

// 不存在 NODE_ENV 时为其设置默认值 `local`
if (!('NODE_ENV' in process.env)) {
  logger.warn('The NODE_ENV environment variable is required but was not specified.');
  process.env.NODE_ENV = 'local';
}

const {
  NODE_ENV,
  PROFILE,
  DACE_PATH_PROFILES = defaultEnv.DACE_PATH_PROFILES,
  DACE_PATH_CONFIG = 'dace.config.js'
} = process.env;
logger.info(`process.env.NODE_ENV: ${NODE_ENV}`);

// 获取 proflies 目录的绝对路径
const profilesDir = resolveApp(DACE_PATH_PROFILES);

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${profilesDir}/.${PROFILE}.env`,
  `${profilesDir}/.${NODE_ENV}.env`,
  `${profilesDir}/.common.env`
];
// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile
    });
  }
});

// 读 dace.config.js 中的配置
const daceConfigFile = resolveApp(DACE_PATH_CONFIG);
const daceConfig = fs.existsSync(daceConfigFile) ? require(daceConfigFile) : {};
// `plugins` `modify` 不加入环境变量
const excludeKeys = ['plugins', 'modify'];
Object.keys(daceConfig)
  .filter(key => excludeKeys.indexOf(key) === -1)
  .forEach((key) => {
    if (!(key in process.env)) {
      process.env[key] = daceConfig[key];
    }
  });

// 最后使用 dace 默认 dotenv 兜底
Object.keys(defaultEnv).forEach((key) => {
  if (!(key in process.env)) {
    process.env[key] = defaultEnv[key];
  }
});

// 完成所有环境变量设置后，将 DACE_PATH_ 开头的环境变量转换为绝对路径
// 目的是为了 webpack 编译时能通过 require(process.env.XX) 引用到对应的文件
Object.keys(process.env)
  .filter(key => key.startsWith('DACE_PATH_'))
  .forEach((key) => {
    process.env[key] = resolveApp(process.env[key]);
  });
