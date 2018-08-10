const fs = require('fs');
const paths = require('../webpack/config/paths');
const defaultEnv = require('../webpack/config/defaultEnv');
const logger = require('../utils/logger');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('../webpack/config/paths')];

// 当 process.env.NODE_ENV 不存在时，将其设置为线上环境
// 避免错误的发布配置导致线上故障
if (!('NODE_ENV' in process.env)) {
  logger.warn('The NODE_ENV environment variable is required but was not specified.');
  process.env.NODE_ENV = 'production';
}

const { NODE_ENV, PROFILE } = process.env;
logger.info(`process.env.NODE_ENV: ${NODE_ENV}`);

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.appPath}/profiles/.${PROFILE}.env`,
  `${paths.appPath}/profiles/.${NODE_ENV}.env`,
  `${paths.appPath}/profiles/.common.env`
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

// 最后使用 dace 默认 dotenv 兜底
Object.keys(defaultEnv).forEach((key) => {
  if (!(key in process.env)) {
    process.env[key] = defaultEnv[key];
  }
});
