import fs from 'fs';
import paths from '../webpack/config/paths';
import defaultEnv from '../webpack/config/defaultEnv';
import logger from '../utils/logger';

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('../webpack/config/paths')];

if (!('NODE_ENV' in process.env)) {
  logger.warn('The NODE_ENV environment variable is required but was not specified.');
  process.env.NODE_ENV = 'local';
}

const { NODE_ENV, PROFILE } = process.env;
logger.info(`process.env.NODE_ENV: ${NODE_ENV}`);

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.appProfiles}/.${PROFILE}.env`,
  `${paths.appProfiles}/.${NODE_ENV}.env`,
  `${paths.appProfiles}/.common.env`
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
