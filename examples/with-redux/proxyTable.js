module.exports = {
  // 用本地文件模拟数据，标示符为 `require!`
  '^/api/(.*)': 'require!/api/$1.js'
};
