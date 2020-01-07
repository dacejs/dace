/* eslint no-nested-ternary: 0 */
import fs from 'fs';
import path from 'path';
import util from 'util';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import StartServerPlugin from 'start-server-webpack-plugin';
import eslintFormatter from 'react-dev-utils/eslintFormatter';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import stylelintFormatter from '../../utils/stylelintFormatter';
import logger from '../../utils/logger';

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
  const {
    DACE_HOST,
    DACE_PORT,
    NODE_PATH = '',
    DACE_PUBLIC_PATH,
    DACE_VENDORS,
    DACE_LONG_TERM_CACHING,
    DACE_LONG_TERM_CACHING_LENGTH,
    // DACE_PATH_ROOT,
    DACE_SERVER_MINIMIZE,
    DACE_CLIENT_MINIMIZE,
    DACE_POLYFILL,
    DACE_HMR,
    DACE_BABEL_COMPILE_MODULES,
    DACE_PATH_BABEL_RC,
    DACE_PATH_ESLINT_RC,
    DACE_PATH_POSTCSS_RC,
    DACE_PATH_NODE_MODULES,
    DACE_PATH_CLIENT_ENTRY,
    DACE_PATH_SERVER_ENTRY,
    DACE_PATH_CLIENT_DIST,
    DACE_PATH_SERVER_DIST
  } = process.env;
  const IS_NODE = target === 'node';
  const IS_WEB = target === 'web';
  const IS_DEV = isDev;
  const devServerPort = parseInt(DACE_PORT, 10) + 1;
  const getHash = (hash) => {
    if (DACE_LONG_TERM_CACHING === 'true') {
      return `.[${hash}:${DACE_LONG_TERM_CACHING_LENGTH}]`;
    }
    return '';
  };

  // 将 process.env 中所有以 DACE_ 开头的变量传递到代码运行时环境
  const daceEnv = Object.keys(process.env)
    .filter(key => key.startsWith('DACE_'))
    .reduce((envs, key) => {
      envs[`process.env.${key}`] = JSON.stringify(process.env[key]);
      return envs;
    }, {});

  // 获取 .babelrc 配置
  let mainBabelOptions = {
    cacheDirectory: true,
    babelrc: false
  };
  const hasBabelRc = fs.existsSync(DACE_PATH_BABEL_RC);
  if (hasBabelRc) {
    if (IS_WEB) {
      logger.info('Using custom .babelrc');
    }
    mainBabelOptions = {
      ...mainBabelOptions,
      configFile: DACE_PATH_BABEL_RC
    };
  } else {
    mainBabelOptions = {
      ...mainBabelOptions,
      presets: [
        require.resolve('babel-preset-dace')
      ]
    };
  }

  const babelIncludeOptions = DACE_BABEL_COMPILE_MODULES
    .split(',')
    .map((name) => {
      name = name.trim();
      if (name === '') {
        return null;
      }
      return path.resolve(`node_modules/${name}`);
    })
    .concat(path.resolve('src'))
    .filter(Boolean);

  // 获取 .eslintrc.js 配置
  const hasEslintRc = fs.existsSync(DACE_PATH_ESLINT_RC);
  const mainEslintOptions = {
    formatter: eslintFormatter,
    // failOnError: true,
    // 无效的 disable 提示报错
    reportUnusedDisableDirectives: true,
    eslintPath: require.resolve('eslint'),
    useEslintrc: true,
    cache: true
  };

  if (hasEslintRc) {
    if (IS_WEB) {
      logger.info('Using custom .eslintrc.js');
    }
  } else {
    mainEslintOptions.extends = ['eslint-config-qunar-react'];
  }

  // 获取 postcss 配置
  const hasPostcssRc = fs.existsSync(DACE_PATH_POSTCSS_RC);
  const mainPostcssOptions = { ident: 'postcss' };
  if (hasPostcssRc) {
    if (IS_WEB) {
      logger.info('Using custom postcss.config.js');
    }
    // 只能指定 postcss.config.js 所在的目录
    mainPostcssOptions.config = {
      path: path.dirname(DACE_PATH_POSTCSS_RC)
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
    devtool: 'none',
    resolve: {
      modules: ['node_modules', DACE_PATH_NODE_MODULES].concat((NODE_PATH).split(path.delimiter).filter(Boolean)),
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
          test: /\/ssrRoutes/,
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
          include: babelIncludeOptions,
          // exclude: [/node_modules/],
          // and: [
          //   /chalk/
          //   // '/Users/zhi.zhong/workspace/q/h_pc_ssr/node_modules/chalk/index.js'
          //   // path.resolve('node_modules/chalk/index.js')
          // ],
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
            name: `media/[name]${getHash('hash')}.[ext]`,
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
            name: `media/[name]${getHash('hash')}.[ext]`,
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
                modules: false
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: mainPostcssOptions
            }
          ])
        },
        // 支持 [CSS Modules](https://github.com/css-modules/css-modules)
        // 使用 `.module.css` 后缀
        {
          test: /\.module\.css$/,
          exclude: [DACE_PATH_CLIENT_DIST, DACE_PATH_SERVER_DIST],
          use: IS_NODE ? [
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[path]__[name]___[local]'
                },
                importLoaders: 1,
                // 服务器端编译不需要内联 css ，只需要获取混淆后的 class 名称
                onlyLocals: true
              }
            }
          ] : (IS_DEV ? [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[path]__[name]___[local]'
                },
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
                modules: {
                  localIdentName: '[path]__[name]___[local]'
                },
                importLoaders: 1
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
      __dirname: false,
      __filename: false
    };

    config.externals = [
      nodeExternals({
        // 白名单中的包会包含在编译后的包里
        whitelist: [
          IS_DEV ? 'webpack/hot/poll?300' : null,
          /dace/, // <-- #13
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|sss|less)$/
        ].filter(Boolean)
      })
    ];

    config.output = {
      path: DACE_PATH_SERVER_DIST,
      publicPath: IS_DEV ? `http://${DACE_HOST}:${devServerPort}/` : '/',
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    };

    config.entry = [
      fs.existsSync(DACE_PATH_SERVER_ENTRY)
        ? DACE_PATH_SERVER_ENTRY
        : path.resolve(__dirname, '../../runtime/server.js')
    ];

    config.plugins = [
      // 将定义环境变量传递到运行时环境
      new webpack.DefinePlugin(daceEnv),
      // 防止 node 编译时打成多个包
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ];

    config.optimization = { minimize: DACE_SERVER_MINIMIZE === 'true' };

    if (IS_DEV) {
      config.watch = true;

      config.plugins = [
        ...config.plugins,
        // Supress errors to console (we use our own logger)
        // StartServerPlugin 会出 DeprecationWarning: Buffer()
        new StartServerPlugin({
          name: 'server.js'
        }),
        // 不监视编译输出目录，避免重新压缩死循环
        new webpack.WatchIgnorePlugin([DACE_PATH_CLIENT_DIST, DACE_PATH_SERVER_DIST])
      ];

      if (DACE_HMR === 'true') {
        config.entry.unshift('webpack/hot/poll?300');
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
      }
    }
  }

  if (IS_WEB) {
    config.entry = [
      fs.existsSync(DACE_PATH_CLIENT_ENTRY)
        ? DACE_PATH_CLIENT_ENTRY
        : path.resolve(__dirname, '../../runtime/client.js')
    ];
    if (DACE_POLYFILL === 'true') {
      config.entry.unshift('@babel/polyfill');
    }

    config.output = {
      path: DACE_PATH_CLIENT_DIST,
      libraryTarget: 'var'
    };

    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [DACE_PATH_CLIENT_DIST, DACE_PATH_SERVER_DIST]
      }),
      new webpack.DefinePlugin(daceEnv),
      new LoadablePlugin({
        writeToDisk: true,
        outputAsset: false
      })
    ];

    const vendorPattern = new RegExp(`(${DACE_VENDORS})`);
    config.optimization = {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          // 禁用 cacheGroups(test/priority/reuseExistingChunk)默认配置
          default: false,

          // 禁用 vendors
          vendors: false,

          // 打包 vendor.js
          vendor: {
            name: 'vendor',
            test: vendorPattern,
            chunks: 'all',
            enforce: true
          },

          // 打包 styles.css
          styles: {
            name: 'styles',
            test: /\.(css|less|scss)$/,
            chunks: 'all',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }

        }
      }
    };

    if (IS_DEV) {
      config.devtool = 'cheap-module-source-map';
      if (DACE_HMR === 'true') {
        config.entry.unshift(require.resolve('../../utils/webpackHotDevClient'));
      }

      // Configure our client bundles output. Not the public path is to 3001.
      config.output = {
        ...config.output,
        publicPath: `http://${DACE_HOST}:${devServerPort}/`,
        pathinfo: true,
        filename: `js/bundle${getHash('hash')}.js`,
        chunkFilename: `js/[name]${getHash('hash')}.chunk.js`,
        devtoolModuleFilenameTemplate: info => path.resolve(info.resourcePath).replace(/\\/g, '/')
      };
      // Configure webpack-dev-server to serve our client-side bundle from
      // http://${process.env.DACE_HOST}:3001
      config.devServer = {
        disableHostCheck: true,
        clientLogLevel: 'none',
        // Enable gzip compression of generated files.
        compress: true,
        // watchContentBase: true,
        headers: {
          'Access-Control-Allow-Origin': `http://${DACE_HOST}:${DACE_PORT}`,
          'Access-Control-Allow-Credentials': true
        },
        host: '0.0.0.0',
        hot: DACE_HMR === 'true',
        noInfo: !program.verbose,
        overlay: false,
        port: devServerPort,
        quiet: !program.verbose,
        // By default files from `contentBase` will not trigger a page reload.
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebookincubator/create-react-app/issues/293
        watchOptions: {
          ignored: /node_modules/
        }
      };
      // Add client-only development plugins
      if (DACE_HMR === 'true') {
        config.plugins.push(new webpack.HotModuleReplacementPlugin({
          multiStep: true
        }));
      }
    } else { // web-build
      config.output = {
        ...config.output,
        publicPath: DACE_PUBLIC_PATH,
        filename: `js/bundle${getHash('chunkhash')}.js`,
        chunkFilename: `js/[name]${getHash('chunkhash')}.chunk.js`
      };

      config.plugins = [
        ...config.plugins,
        // Extract our CSS into a files.
        new MiniCssExtractPlugin({
          filename: `css/[name]${getHash('contenthash')}.css`,
          // allChunks: true because we want all css to be included in the main
          // css bundle when doing code splitting to avoid FOUC:
          // https://github.com/facebook/create-react-app/issues/2415
          allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin() // ,
        // new webpack.optimize.AggressiveMergingPlugin()
      ];

      config.optimization = { ...config.optimization, minimize: DACE_CLIENT_MINIMIZE === 'true' };
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

  // 绑定 dace 插件
  if (plugins) {
    if (!Array.isArray(plugins)) {
      plugins = [plugins];
    }
    const pluginPrefix = 'dace-plugin-';
    plugins.forEach((name) => {
      // 解析带参数的插件 [['redux', {}], 'mobx']
      let options = {};
      if (util.isArray(name)) {
        let opts = {};
        [name, opts] = name;
        options = { ...options, ...opts };
      }
      // 支持类似 babel preset 的语法
      const completePluginName = name.startsWith(pluginPrefix) ? name : `${pluginPrefix}${name}`;
      let dacePlugin;
      try {
        dacePlugin = require(`${completePluginName}/plugin`);
        if (dacePlugin.default) {
          dacePlugin = dacePlugin.default;
        }
      } catch (e) {
        logger.error(`Not found dace plugin: ${completePluginName}`);
        throw e;
      }
      if (dacePlugin.modify && util.isFunction(dacePlugin.modify)) {
        config = dacePlugin.modify(config, { target, isDev }, webpack, options);
      }
    });
  }

  // 项目中的配置文件优先级最高
  if (modify) {
    config = modify(config, { target, isDev }, webpack);
  }

  return config;
};
