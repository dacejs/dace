export default {
  // 本地开发 web server 主机名
  DACE_HOST: 'localhost',

  // 本地开发 web server 端口
  DACE_PORT: '3000',

  // 代理请求规则（需JSON.stringify）
  DACE_PROXY: '',

  // 是否可以将请求代理到数据文件
  DACE_PROXY_TO_FILE: 'false',

  // 编译产物对外服务访问使用的 URL
  DACE_PUBLIC_PATH: '/',

  // 页面切换后是否自动滚动到页面顶部
  DACE_SCROLL_TO_TOP: 'true',

  // 路由默认使用的首页文件名称
  DACE_INDEX: 'index',

  // 使用服务器端渲染
  DACE_SSR: 'true',

  // 输出的 script 标签是否使用 crossorigin 属性
  DACE_SCRIPT_CROSSORIGIN: 'true',

  // 公共包包含的文件，包之间用竖线连接，匹配时使用的是正则匹配
  DACE_VENDORS: 'react|redux|loadable-components|core-js|deep-equal|dace/dist',

  // 静态文件是否使用长期缓存
  DACE_LONG_TERM_CACHING: 'true',

  // 静态文件长期缓存长度
  DACE_LONG_TERM_CACHING_LENGTH: '8',

  // 以 `DACE_PATH_` 开头的变量会转换成绝对路径
  // 工程根目录
  DACE_PATH_ROOT: '.',

  // dace 配置文件位置
  // dace-plugin-* 会用到
  DACE_PATH_CONFIG: 'dace.config.js',

  // babel 配置文件位置
  DACE_PATH_BABEL_RC: 'babel.config.js',

  // eslint 配置文件位置
  DACE_PATH_ESLINT_RC: '.eslintrc.js',

  // postcss 配置文件位置
  DACE_PATH_POSTCSS_RC: 'postcss.config.js',

  // profiles 目录位置
  DACE_PATH_PROFILES: 'profiles',

  // src 目录位置
  // appSrc: 'src',
  DACE_PATH_SRC: 'src',

  // pages 目录位置
  DACE_PATH_PAGES: 'src/pages',

  // 服务器端编译入口文件位置
  DACE_PATH_SERVER_ENTRY: 'src/server.js',

  // 浏览器端编译入口文件位置
  DACE_PATH_CLIENT_ENTRY: 'src/client.js',

  // 自定义路由文件位置
  DACE_PATH_ROUTES: '',

  // node_modules 目录位置
  DACE_PATH_NODE_MODULES: 'node_modules',

  // 浏览器端编译产物输出目录位置
  DACE_PATH_CLIENT_DIST: 'prd',

  // 服务器端编译产物输出目录位置
  DACE_PATH_SERVER_DIST: 'dist',

  // 客户端编译输出 stats 文件位置
  DACE_PATH_LOADABLE_STATS_JSON: 'prd/loadable-stats.json',

  // 创建 axios 实例文件位置
  DACE_PATH_AXIOS_INSTANCE: 'node_modules/dace-plugin-redux/dist/runtime/axiosInstance.js'
};
