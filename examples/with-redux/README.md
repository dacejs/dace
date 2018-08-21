# 与 redux 一起使用

下面的文档将介绍如何让 dace 与 redux 一起工作。

## 要点
- 在 `package.json` 增加依赖 `dace-plugin-redux`。
- 增加 `dace.config.js` 。
- 在 `dace.config.js` 使用插件
  ```js
  module.exports = {
    plugins: ['redux']
  };
  ```
- 建议每个页面均使用独立目录。
- `action.js` 和 `reducer.js` 是 redux 的标准写法。
- 对每个页面组件类使用装饰器 `@getInitialProps()` ，该装饰器会在页面渲染前获取初始化 props，并注入页面所需的 reducer 。
