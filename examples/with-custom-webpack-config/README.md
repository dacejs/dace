# 自定义 webpack 配置

下面的文档将介绍如何在工程中自定义 webpack 配置。

## 要点
- 在工程根目录新增 `dace.config.js`。
- 在 `dace.config.js` 中返回 `modify()` 方法。
- `modify()` 参数如下：
  - config：默认 webpack 配置。
  - { target, dev }：环境信息。
    - target：编译类型，参考 `webpack.config.target` 。可选值：`web`（浏览器端）, `node`（浏览器端）。
    - dev：`NODE_ENV` 值。可选值：`local`, `development`, `beta`, `production`。
  - webpack：webpack 实例。可能在修改 plugin 时用到。
