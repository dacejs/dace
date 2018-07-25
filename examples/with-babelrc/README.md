# 自定义 babel 规则

下面的文档将介绍如何在工程中自定义 babel 规则。

## 要点
- 在工程根目录新增 `.babelrc`，在 `.babelrc` 增加配置即可。
- `.babelrc` 中的规则会覆盖 dace 默认的 babel 规则。
- 可以使用如下方式预设 dace babel 规则：
  ```json
  {
    "presets": [
      "babel-preset-env",
      "babel-preset-dace"
    ]
  }
  ```
