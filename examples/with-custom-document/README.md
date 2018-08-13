# 自定义服务器端渲染模版

虽然 dace 服务器端渲染的首屏 HTML 结构能满足大部分开发需求，但有时我们还是希望能根据实际需要修改输出的 HTML 结构，下面的文档将介绍如何在工程中自定义服务器端渲染模版。

## 步骤
- 在 `src` 目录新增 `document.js`，这个是我们需要自定义的渲染模版文件，这个文件是一个函数模块文件，接收 dace 转过来的参数（详情参考 [document.js API](https://dacejs.github.io/api/document.md)），返回一个字符串。
- 在工程根目录新增 `dace.config.js`。
- 让 webpack 使用自定义模版。在 `dace.config.js` 中将 dace 默认的 `document.js` 修改为我们自定义后的 `document.js`，代码如下：
  ```js
  const path = require('path');

  module.exports = {
    modify(config) {
      const appConfig = config;

      appConfig.resolve.alias = {
        ...appConfig.resolve.alias,
        '../../dist/core/document.js': path.resolve(__dirname, 'src/document.js')
      };
      return appConfig;
    }
  };
  ```

## 相关文档
- [如何自定义 webpack 配置](https://dacejs.github.io/faq/custom-webpack.md)
- [document.js API](https://dacejs.github.io/api/document.md)
