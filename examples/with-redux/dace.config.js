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
              case '/api/users':
                data = [
                  { id: 1, name: '张三' },
                  { id: 2, name: '李四' },
                  { id: 3, name: '王五' },
                  { id: 4, name: '钟六' }
                ];
                break;
              case '/api/posts':
                const { page = 1 } = req.query; // eslint-disable-line
                for (let i = 0; i < 10; i++) {
                  const id = i + 1 + ((page - 1) * 10);
                  data.push({ id, title: `标题${id}` });
                }
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
  },
  plugins: [
    ['redux'/* , {
      middlewares: [
        'require(\'redux-logger\').default'
      ]
    } */]
  ]
};
