/**
 * 该 hook 仅在本地开发时使用
 * 避免 require 图片和样式在 node 环境下报错
 */

require('asset-require-hook')({
  // 这里的配置要和 file-loader 配置一致
  extensions: ['png', 'jpg', 'gif'],
  name: 'assets/[name].[ext]',
  publicPath: '/'
});

require('css-modules-require-hook')({
  // 这里的配置要和 css-loader 配置一致
  generateScopedName: '[local]_[hash:base64:2]'
});
