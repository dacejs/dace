# 与 redux 一起使用

下面的文档将介绍如何让 dace 与 redux 一起工作。

## 要点
- 在 `package.json` 增加依赖 `dace-plugin-redux`。
- 增加 `dace.config.js` 。
- 每个页面使用独立目录。
- `action.js` 和 `reducer.js` 是 redux 的标准写法。
- 每个页面组件增加静态方法 `getInitialProps()` ，该方法会在页面渲染前获取初始化 props。
