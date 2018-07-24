const fs = require('fs');
const path = require('path');
const WebpackBar = require('webpackbar');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
// const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const postcssPresetEnv = require('postcss-preset-env');
const WrireStatsFilePlugin = require('../plugins/writeStatsFilePlugin');
const paths = require('./paths');

const postCssOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-cssnext')(),
    require('stylelint')({
      config: {
        extends: 'stylelint-config-standard',
        rules: {
          'at-rule-empty-line-before': null,
          'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global']
          }],
          'font-family-no-missing-generic-family-keyword': null
        }
      }
      // configFile: resolve(__dirname, 'stylelint.config.js'),
      // ignorePath: resolve(__dirname, '.stylelintignore')
    })
  ]
};

module.exports = (target = 'web', env = 'local', webpack) => {
  const IS_NODE = target === 'node';
  const IS_WEB = target === 'web';
  const IS_DEV = env === 'local';

  const hasBabelRc = fs.existsSync(paths.appBabelRc);
  const mainBabelOptions = {
    babelrc: true,
    cacheDirectory: true,
    presets: []
  };

  const hasEslintRc = fs.existsSync(paths.appEslintRc);
  const mainEslintOptions = {
    formatter: eslintFormatter,
    eslintPath: require.resolve('eslint'),
    ignore: false,
    useEslintrc: true
  };

  if (hasBabelRc) {
    console.log('Using .babelrc defined in your app root');
  } else {
    mainBabelOptions.presets.push(require.resolve('../../babel'));
  }

  if (hasEslintRc) {
    console.log('Using .eslintrc defined in your app root');
  } else {
    mainEslintOptions.baseConfig = require.resolve('../../../.eslintrc.js');
  }

  const config = {
    mode: IS_DEV ? 'development' : 'production',
    target,
    devtool: 'cheap-module-source-map',
    resolve: {
      alias: {
        // This is required so symlinks work during development.
        'webpack/hot/poll': require.resolve('webpack/hot/poll')
      }
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /dace\/src\/core\/routes\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: mainBabelOptions
            },
            {
              loader: path.resolve(__dirname, '../loaders/routesLoader.js')
            }
          ]
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: [/node_modules/],
          use: [
            {
              options: mainEslintOptions,
              loader: require.resolve('eslint-loader')
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: mainBabelOptions
            }
          ]
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx|mjs)$/,
            /\.(ts|tsx)$/,
            /\.(vue)$/,
            /\.(less)$/,
            /\.(re)$/,
            /\.(s?css|sass)$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/
          ],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
            emitFile: true
          }
        },
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
            emitFile: true
          }
        },

        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        //
        // Note: this yields the exact same CSS config as create-react-app.
        {
          test: /\.css$/,
          exclude: [/\.module\.css$/],
          use: IS_NODE
            ? // Style-loader does not work in Node.js without some crazy
              // magic. Luckily we just need css-loader.
              [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
                },
              ]
            : IS_DEV
              ? [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions,
                  },
                ]
              : [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      modules: false,
                      minimize: true,
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions,
                  },
                ],
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: /\.module\.css$/,
          // exclude: [paths.appBuild],
          use: IS_NODE
            ? [
                {
                  // on the server we do not need to embed the css and just want the identifier mappings
                  // https://github.com/webpack-contrib/css-loader#scope
                  loader: require.resolve('css-loader/locals'),
                  options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[path]__[name]___[local]',
                  },
                },
              ]
            : IS_DEV
              ? [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      modules: true,
                      importLoaders: 1,
                      localIdentName: '[path]__[name]___[local]',
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions,
                  },
                ]
              : [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      modules: true,
                      importLoaders: 1,
                      minimize: true,
                      localIdentName: '[path]__[name]___[local]',
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions,
                  },
                ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.WEBPACK_STATS_JSON': JSON.stringify(process.env.WEBPACK_STATS_JSON)
      })
    ]
  };

  if (IS_NODE) {
    // We want to uphold node's __filename, and __dirname.
    config.node = {
      __console: false,
      __dirname: false,
      __filename: false
    };

    config.output = {
      path: paths.appBuild,
      publicPath: 'http://localhost:3001/',
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    };

    config.entry = [
      fs.existsSync(paths.appServerIndexJs) ?
        paths.appServerIndexJs :
        paths.ownServerIndexJs
    ];

    if (IS_DEV) {
      config.watch = true;
      config.entry.unshift('webpack/hot/poll?300');

      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        // Supress errors to console (we use our own logger)
        new StartServerPlugin({
          name: 'server.js'
        }),
        // Ignore assets.json to avoid infinite recompile bug
        new webpack.WatchIgnorePlugin([paths.appManifest])
      ];
    }
  }

  if (IS_WEB) {
    config.plugins = [
      ...config.plugins,
      new WrireStatsFilePlugin(),
      new CleanWebpackPlugin(paths.appBuild, { root: paths.appPath })
    ];

    if (IS_DEV) {
      // Setup Webpack Dev Server on port 3001 and
      // specify our client entry point /client/index.js
      config.entry = {
        client: [
          require.resolve('../../utils/webpackHotDevClient'),
          fs.existsSync(paths.appClientIndexJs) ?
            paths.appClientIndexJs :
            paths.ownClientIndexJs
        ]
      };

      // Configure our client bundles output. Not the public path is to 3001.
      config.output = {
        path: paths.appBuild,
        publicPath: 'http://localhost:3001/',
        pathinfo: true,
        libraryTarget: 'var',
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        devtoolModuleFilenameTemplate: info =>
          path.resolve(info.resourcePath).replace(/\\/g, '/')
      };
      // Configure webpack-dev-server to serve our client-side bundle from
      // http://${dotenv.raw.HOST}:3001
      config.devServer = {
        disableHostCheck: true,
        clientLogLevel: 'none',
        // Enable gzip compression of generated files.
        compress: true,
        // watchContentBase: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: {
          // Paths with dots should still use the history fallback.
          // See https://github.com/facebookincubator/create-react-app/issues/387.
          disableDotRule: true
        },
        host: 'localhost',
        hot: true,
        noInfo: true,
        overlay: false,
        port: 3001,
        quiet: true,
        // By default files from `contentBase` will not trigger a page reload.
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebookincubator/create-react-app/issues/293
        watchOptions: {
          ignored: /node_modules/
        },
        before(app) {
          // This lets us open files from the runtime error overlay.
          app.use(errorOverlayMiddleware());
        }
      };
      // Add client-only development plugins
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin({
          multiStep: true
        })
      ];

      config.optimization = {
        // @todo automatic vendor bundle
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // splitChunks: {
        //   chunks: 'all',
        // },
        // Keep the runtime chunk seperated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        // runtimeChunk: true,
      };
    }
  }

  if (IS_DEV) {
    config.plugins = [
      ...config.plugins,
      // Use our own FriendlyErrorsPlugin during development.
      // new FriendlyErrorsPlugin({
      //   verbose: dotenv.raw.VERBOSE,
      //   target,
      //   onSuccessMessage: `Your application is running at http://${
      //     dotenv.raw.HOST
      //   }:${dotenv.raw.PORT}`,
      // }),
      new WebpackBar({
        color: target === 'web' ? '#f5a623' : '#9013fe',
        name: target === 'web' ? 'client' : 'server'
      })
    ];
  }

  return config;
};
