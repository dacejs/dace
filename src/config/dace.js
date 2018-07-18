/**
 * 该文件只放 编译过程／本地调试 环境所需要的配置
 * 运行时需要的配置请放到 `${process.cwd()}/config/publicRuntime.js`
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

if (typeof window === 'object') {
  console.error('config/dace.js 只能在服务器端代码中使用，请勿将浏览器端配置信息写在该文件中！');
}

module.exports = {
  ...defaultConfig,
  ...profileConfig,
  ...projectConfig
};
