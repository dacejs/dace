// @preval

const { existsSync } = require('fs');
const { resolve } = require('path');

/* eslint-disable */
const configFile = resolve('src/config/unjs.js');
const profileConfigFile = resolve(`src/config/profiles/${process.env.NODE_ENV}/unjs.js`);

const config = existsSync(configFile) ? require(configFile) : {};
const profileConfig = existsSync(profileConfigFile) ? require(profileConfigFile) : {}

/**
 * 获取工程目录下的配置信息
 */
module.exports = { ...config, ...profileConfig };
