# 自定义 eslint 规则

下面的文档将介绍如何在工程中自定义 webpack 配置。

## 要点
- 在工程根目录新增 `.eslintrc.js`，在 `.eslintrc.js` 增加 rules 即可。
- `.eslintrc.js` 中的规则会和 dace 默认的 eslint 规则合并。
- 如果希望在编辑器中（如 atom）看到实时校验结果，请使用如下 `extends` 方式继承 dace 默认规则：
  ```js
  module.exports = {
    extends: ['eslint-config-qunar'].map(require.resolve),
    rules: {
      'no-unused-vars': 0
    }
  };
  ```
