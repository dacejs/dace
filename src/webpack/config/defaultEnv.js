import fs from 'fs';
import path from 'path';
import { appStatsJson, appPages, appClientBuild } from './paths';

const appDaceConfig = path.resolve('dace.config.js');
const daceConfig = fs.existsSync(appDaceConfig) ? require(appDaceConfig) : {};

const defaultEnv = {
  // 本地开发 web server 主机名
  DACE_HOST: 'localhost',

  // 本地开发 web server 端口
  DACE_PORT: '3000',

  // 编译产物对外服务访问使用的 URL
  DACE_PUBLIC_PATH: '/',

  // 浏览器端编译产物输出目录位置
  // 当 publicPath = '/' 需要将编译目录设置为虚拟目录（本地开发模式）
  DACE_CLIENT_BUILD: appClientBuild,

  // pages 目录位置
  DACE_PAGES: appPages,

  // 客户端编译输出的 stats 文件位置
  DACE_STATS_JSON: appStatsJson,

  // API 接口地址 BaseURL，建议配置在 profiles 中
  // 仅在 dace-plugin-redux 中使用
  DACE_API_BASE_URL: 'http://localhost:3002',

  // 页面切换后是否自动滚动到页面顶部
  DACE_SCROLL_TO_TOP: true,

  // 路由默认使用的首页文件名称
  DACE_INDEX: 'index',

  // 禁用服务器端渲染
  DACE_NO_SSR: false
};

// 让 dace.config.js 覆盖 defaultEnv.js 中的配置
Object.keys(defaultEnv).forEach((key) => {
  if (key in daceConfig) {
    defaultEnv[key] = daceConfig[key];
  }
});

export default defaultEnv;
