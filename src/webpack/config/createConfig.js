/* eslint no-nested-ternary: 0 */
import fs from 'fs';
import path from 'path';
import util from 'util';
import WebpackBar from 'webpackbar';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import StartServerPlugin from 'start-server-webpack-plugin';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import eslintFormatter from 'react-dev-utils/eslintFormatter';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import stylelintFormatter from '../../utils/stylelintFormatter';
import WrireStatsFilePlugin from '../plugins/writeStatsFilePlugin';
import paths from './paths';

/**
 * webpack config 生成器
 *
 * @param {object} option
 * @param {object} option.webpack 父模块创建的 webpack 实例
 * @param {object} option.dace dace.config.js
 * @param {string} option.[target='web']
 * @param {boolean} option.[isDev=true] 是否为开发环境
 * @param {object} option.[program={}] 程序运行句柄，能获取到命令参数
 * @return {object} webpack 配置对象
 */
export default ({
  webpack,
  dace: { modify, plugins },
  target = 'web',
  isDev = true,
  program = {}
}) => {
  const IS_NODE = target === 'node';
  const IS_WEB = target === 'web';
  const IS_DEV = isDev;
  const devServerPort = parseInt(process.env.DACE_PORT, 10) + 1;

  const daceEnv = Object.keys(process.env)
    .filter(key => key.startsWith('DACE_'))
    .reduce((envs, key) => {
      envs[`process.env.${key}`] = JSON.stringify(process.env[key]);
      return envs;
    }, {});

  // 获取 .babelrc 配置
  let mainBabelOptions = {
    cacheDirectory: true
  };
  const hasBabelRc = fs.existsSync(paths.appBabelRc);
  if (hasBabelRc) {
    console.log('Using .babelrc defined in your app root');
  } else {
    mainBabelOptions = {
      ...mainBabelOptions,
      presets: [
        require.resolve('babel-preset-env'),
        require.resolve('babel-preset-dace')
      ],
      babelrc: false
    };
  }

  // 获取 .eslintrc.js 配置
  const hasEslintRc = fs.existsSync(paths.appEslintRc);
  const mainEslintOptions = {
    formatter: eslintFormatter,
    // failOnError: true,
    eslintPath: require.resolve('eslint'),
    useEslintrc: true
  };

  if (hasEslintRc) {
    console.log('Using .eslintrc.js defined in your app root');
  } else {
    mainEslintOptions.configFile = path.resolve(__dirname, '../../../.eslintrc.js');
  }

  // 获取 postcss 配置
  const hasPostcssRc = fs.existsSync(paths.appPostcssRc);
  const mainPostcssOptions = { ident: 'postcss' };
  if (hasPostcssRc) {
    console.log('Using postcss.config.js defined in your app root');
    // 只能指定 postcss.config.js 所在的目录
    mainPostcssOptions.config = {
      path: path.dirname(paths.appPostcssRc)
    };
  } else {
    mainPostcssOptions.plugins = [
      require('stylelint')({
        config: {
          extends: 'stylelint-config-dace'
        }
      }),
      require('postcss-preset-env')(),
      require('postcss-reporter')({
        throwError: true,
        clearReportedMessages: true,
        clearAllMessages: true,
        plugins: ['stylelint'],
        formatter: stylelintFormatter
      })
    ];
  }

  let config = {
    mode: IS_DEV ? 'development' : 'production',
    context: process.cwd(),
    target,
    devtool: 'cheap-module-source-map',
    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat((process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean)),
      extensions: ['.js', '.jsx'],
      alias: {
        // This is required so symlinks work during development.
        'webpack/hot/poll': require.resolve('webpack/hot/poll')
      }
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\/routes/,
          // 多个 loaders 按 `从后往前` 的顺序执行
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: mainBabelOptions
            },
            {
              loader: path.resolve(__dirname, '../loaders/routesLoader.js')
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          // 强制在其他 loader 之前执行
          enforce: 'pre',
          // 本地调试时 dace 并未在 node_modules 目录下
          // 需要单独排除
          exclude: [/node_modules/, /\/dace[^/]*\/dist\//],
          use: [
            {
              options: mainEslintOptions,
              loader: require.resolve('eslint-loader')
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
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
            name: 'media/[name].[hash:8].[ext]',
            emitFile: true
          }
        },
        // 'url' loader works like 'file' loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]',
            emitFile: true
          }
        },

        // 'postcss' loader applies autoprefixer to our CSS.
        // 'css' loader resolves paths in CSS and adds assets as dependencies.
        // 'style' loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development 'style' loader enables hot editing of CSS.
        //
        // Note: this yields the exact same CSS config as create-react-app.
        {
          test: /\.css$/,
          exclude: [/\.module\.css$/],
          use: IS_NODE ? [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1
              }
            }
          ] : (IS_DEV ? [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: mainPostcssOptions
            }
          ] : [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: false,
                minimize: true
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: mainPostcssOptions
            }
          ])
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: /\.module\.css$/,
          exclude: [paths.appClientBuild, paths.appServerBuild],
          use: IS_NODE ? [
            {
              // on the server we do not need to embed the css and just want the identifier mappings
              // https://github.com/webpack-contrib/css-loader#scope
              loader: require.resolve('css-loader/locals'),
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[path]__[name]___[local]'
              }
            }
          ] : (IS_DEV ? [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[path]__[name]___[local]'
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: mainPostcssOptions
            }
          ] : [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                importLoaders: 1,
                minimize: true,
                localIdentName: '[path]__[name]___[local]'
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: mainPostcssOptions
            }
          ])
        }
      ]
    },
    plugins: []
  };

  if (IS_NODE) {
    // We want to uphold node's __filename, and __dirname.
    config.node = {
      __console: false,
      __dirname: false,
      __filename: false
    };

    config.externals = [
      nodeExternals({
        whitelist: [
          IS_DEV ? 'webpack/hot/poll?300' : null,
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|sss|less)$/
        ].filter(Boolean)
      })
    ];

    config.output = {
      path: paths.appServerBuild,
      publicPath: IS_DEV ? `http://${process.env.DACE_HOST}:${devServerPort}/` : '/',
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    };

    config.entry = [
      fs.existsSync(paths.appServerIndexJs) ?
        paths.appServerIndexJs :
        paths.ownServerIndexJs
    ];

    config.plugins = [
      // We define environment variables that can be accessed globally in our
      new webpack.DefinePlugin(daceEnv),
      // 防止 node 编译时打成多个包
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ];

    if (IS_DEV) {
      config.watch = true;
      config.entry.unshift('webpack/hot/poll?300');

      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        // Supress errors to console (we use our own logger)
        // StartServerPlugin 会出 DeprecationWarning: Buffer()
        new StartServerPlugin({
          name: 'server.js'
        }),
        // Ignore assets.json to avoid infinite recompile bug
        new webpack.WatchIgnorePlugin([paths.appStatsJson])
      ];
    }
  }

  if (IS_WEB) {
    config.entry = {
      client: [
        fs.existsSync(paths.appClientIndexJs) ?
          paths.appClientIndexJs :
          paths.ownClientIndexJs
      ]
    };

    config.plugins = [
      ...config.plugins,
      new WrireStatsFilePlugin(),
      new CleanWebpackPlugin([paths.appClientBuild, paths.appServerBuild], {
        root: paths.appPath,
        verbose: false
      }),
      new webpack.DefinePlugin(daceEnv)
    ];

    config.optimization = {
      minimize: false,
      splitChunks: {
        cacheGroups: {

          // 将指定的包打到 vendor.js
          vendor: {
            name: 'vendor',
            test: /(react|redux|loadable-components|core-js|deep-equal|dace\/dist)/,
            chunks: 'all',
            enforce: true
          },

          // 暂时将所有 css 打成一个包
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }

        }
      }
    };

    if (IS_DEV) {
      config.entry.client.unshift(require.resolve('../../utils/webpackHotDevClient'));

      // Configure our client bundles output. Not the public path is to 3001.
      config.output = {
        path: paths.appClientBuild,
        publicPath: `http://${process.env.DACE_HOST}:${devServerPort}/`,
        pathinfo: true,
        libraryTarget: 'var',
        filename: 'js/bundle.js',
        chunkFilename: 'js/[name].chunk.js',
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
        host: process.env.DACE_HOST,
        hot: true,
        noInfo: !program.verbose,
        overlay: false,
        port: devServerPort,
        quiet: !program.verbose,
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
    } else { // web-build
      config.output = {
        path: paths.appClientBuild,
        publicPath: process.env.DACE_PUBLIC_PATH || '/',
        filename: 'js/bundle.[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        libraryTarget: 'var'
      };

      config.plugins = [
        ...config.plugins,
        // Extract our CSS into a files.
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          // allChunks: true because we want all css to be included in the main
          // css bundle when doing code splitting to avoid FOUC:
          // https://github.com/facebook/create-react-app/issues/2415
          allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin() // ,
        // new webpack.optimize.AggressiveMergingPlugin()
      ];

      config.optimization = { ...config.optimization, minimize: true };
    }
  }

  if (IS_DEV && !program.verbose) {
    config.plugins = [
      ...config.plugins,
      new WebpackBar({
        color: target === 'web' ? '#f5a623' : '#9013fe',
        name: target === 'web' ? 'client' : 'server'
      })
    ];
  }

  if (program.visualizer) {
    config.plugins = [
      ...config.plugins,
      new Visualizer()
    ];
  }

  if (modify) {
    config = modify(config, { target, isDev: IS_DEV }, webpack);
  }

  // 绑定 dace 插件
  if (plugins) {
    if (!Array.isArray(plugins)) {
      plugins = [plugins];
    }
    const pluginPrefix = 'dace-plugin-';
    plugins.forEach((name) => {
      // 解析带参数的插件 [['redux', {}], 'mobx']
      let options = { paths };
      if (util.isArray(name)) {
        let opts = {};
        [name, opts] = name;
        options = { ...options, ...opts };
      }
      // 支持类似 babel preset 的语法
      const completePluginName = name.startsWith(pluginPrefix) ? name : `${pluginPrefix}${name}`;
      let dacePlugin;
      try {
        dacePlugin = require(completePluginName);
        if (dacePlugin.default) {
          dacePlugin = dacePlugin.default;
        }
      } catch (e) {
        console.log(`Not found dace plugin: ${completePluginName}`);
        throw e;
      }
      if (dacePlugin.modify && util.isFunction(dacePlugin.modify)) {
        config = dacePlugin.modify(config, { target, isDev }, webpack, options);
      }
    });
  }

  return config;
};
