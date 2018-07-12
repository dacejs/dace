/**
 * 返回合并 profiles/${NODE_ENV} 配置
 */

/* eslint import/no-dynamic-require: 0 */
const projectConfig = require('../preval/getConfig');

const profileConfig = require(`./profiles/${process.env.NODE_ENV}`);

const defaultConfig = {
  /**
   * web服务器对外访问主机名
   * @type {string}
   */
  host: 'localhost',

  /**
   * web服务器对外访问端口
   * @type {number}
   */
  port: 3000,

  /**
   * 编译产物输出目录
   * @type {string}
   */
  outputPath: 'prd',

  /**
   * APIs 请求的地址
   * @type {string}
   */
  ApiUrl: 'http://jsonplaceholder.typicode.com',

  /**
   * 禁用服务器端渲染
   * @type {boolean}
   */
  noSSR: false,

  /**
   * 自定义css-modules类标识命名规则
   * @type {string}
   */
  localIdentName: '[local]_[hash:base64:2]',

  /**
   * 静态资源类型
   * @type {array}
   */
  assetExtensions: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'mp3',
    'ttf',
    'woff',
    'woff2',
    'eot',
    'svg'
  ]
};

module.exports = {
  ...defaultConfig,
  ...profileConfig,
  ...projectConfig
};
