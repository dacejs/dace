module.exports = {
  // 同域转发
  // '^/$': '/index.html',
  // 跨域转发
  '^/api/(.*)': 'http://localhost:3001/api/$1'
};
