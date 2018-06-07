//  require.ensure polyfill
require('require-ensure');

require('asset-require-hook')({
  // 这里的配置要和 file-loader 配置一致
  extensions: ['png'],
  name: 'assets/[name].[hash:8].[ext]',
  publicPath: '/'
});

require('css-modules-require-hook')({
  // 这里的配置要和 css-loader 配置一致
  generateScopedName: '[local]_[hash:base64:2]'
});
