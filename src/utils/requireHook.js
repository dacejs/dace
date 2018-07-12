/**
 * 该 hook 仅在本地开发时使用
 * 避免 require 图片和样式在 node 环境下报错
 */

const { assetExtensions, localIdentName } = require('../config/dace');

require('asset-require-hook')({
  // 这里的配置要和 file-loader 配置一致
  extensions: assetExtensions,
  name: 'assets/[name].[ext]',
  publicPath: '/'
});

require('css-modules-require-hook')({
  // 这里的配置要和 css-loader 配置一致
  generateScopedName: localIdentName
});
