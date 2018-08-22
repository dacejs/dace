module.exports = {
  // 将 api 请求转发到本地模拟数据服务
  '^/api/(.*)': 'http://localhost:3002/api/$1'
};
