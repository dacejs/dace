const paths = require('./paths');

module.exports = {
  // 客户端编译输出的 stats 文件位置
  DACE_STATS_JSON: paths.appStatsJson,

  // 本地开发 web server 主机名
  DACE_HOST: 'localhost',

  // 本地开发 web server 端口
  DACE_PORT: 3000,

  // 编译产物对外服务访问使用的 URL
  DACE_PUBLIC_PATH: '/',

  // 编译产物输出目录位置
  DACE_BUILD_PATH: paths.appBuild
};
