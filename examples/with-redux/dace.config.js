/**
 * dace.config.js 未使用 babel 编译
 * 保险起见，请使用 es5 语法书写
 */

module.exports = {
  // 创建 axios 实例的文件路径
  DACE_PATH_AXIOS_INSTANCE: 'src/axios.js',

  // 加上 dace-plugin-redux
  plugins: [
    ['redux'/* , {
      middlewares: [
        'require(\'redux-logger\').default'
      ]
    } */]
  ]
};
