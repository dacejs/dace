export default {
  mode: 'development',
  entry: ['./src/entry.js'],
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: ['node_modules'],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.png$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
};
