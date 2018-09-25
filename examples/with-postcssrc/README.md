# 自定义 postcss 规则

下面的文档将介绍如何在工程中自定义 postcss 配置和 stylelint 规则。

## 要点
- 在工程根目录新增 `postcss.config.js`，在 `postcss.config.js` 增加配置即可。
- `postcss.config.js` 中的规则会覆盖 dace 的 postcss.config 默认配置。
  ```js
  module.exports = {
    plugins: [
      require('stylelint')(),
      require('postcss-preset-env')()
    ]
  };
  ```
- 注意 plugins 的执行顺序。
- 欲修改 `stylelint` 规则，需在工程根目录新增 `stylelint.config.js`，在这个文件中配置规则。强烈建议： **先继承 stylelint-config-dace 再修改 rules**
  ```js
  module.exports = {
    extends: 'stylelint-config-dace',
    rules: {
      // ...
    }
  };
  ```
