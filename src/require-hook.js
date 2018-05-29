require('asset-require-hook')({
  extensions: ['png'],
  name: 'assets/[name].[hash:8].[ext]'
});

require('css-modules-require-hook')({
  generateScopedName: '[local]_[hash:base64:2]',
});
