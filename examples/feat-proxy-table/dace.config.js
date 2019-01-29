/**
 * dace.config.js 未使用 babel 编译
 * 保险起见，请使用 es5 语法书写
 */

module.exports = {
  modify(config, { target, isDev }) {
    const appConfig = config;
    if (target === 'web' && isDev) {
      // 模拟 http://localhost:3001/api 返回
      appConfig.devServer.proxy = {
        '/api': {
          bypass: (req, res) => {
            let data = [];
            switch (req._parsedUrl.pathname) { // eslint-disable-line
              case '/api/name':
                data = {
                  name: 'feat-proxy-table'
                };
                break;
              default:
            }
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.set('Access-Control-Allow-Credentials', true);
            res.json(data);
          }
        }
      };
    }

    return appConfig;
  }
};
