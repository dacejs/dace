const fs = require('fs');
const paths = require('../webpack/config/paths');
const defaultEnv = require('../webpack/config/defaultEnv');
// const path = require('path');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('../webpack/config/paths')];

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  process.env.NODE_ENV = 'local';
  console.log('The NODE_ENV environment variable is required but was not specified.');
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  `${paths.dotenv}.local`,
  paths.dotenv
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
