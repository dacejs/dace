从零开始搭建 webpack SSR 环境

* 创建工作目录
```
mkdir bullock
cd bullock
```

* 初始化工程
```
npm init -y
```

* 安装 webpack
```
npm i webpack
```

* 创建入口文件
```
mkdir src
echo "console.log('test');" > src/entry.js
```

* 创建 webpack/build.config.js
```
// webpack/build.config.js

module.exports = {
  entry: './src/entry.js'
};
```

* 用 webpack-cli 支持命令行下直接运行 webpack 命令
  npm i webpack-cli

* 在 `package.json` 中增加编译命令:
```json
{
  "name": "bullock",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --config webpack/build.config.js"
  },
  "dependencies": {
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    "webpack": "^4.9.1",
    "webpack-cli": "^2.1.4"
  }
}
```

* 运行 `npm run build`, 输出 `dist/main.js`，但有告警信息
>WARNING in configuration
>The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
>You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

* 增加 mode 配置
```
// webpack/build.config.js

module.exports = {
  mode: 'development',
  entry: './src/entry.js'
};
```

## 让 wepack.config.js 支持 ES6 语法
  1. 安装 babel 插件 `babel-plugin-transform-es2015-modules-commonjs`
  ```
  npm i babel-plugin-transform-es2015-modules-commonjs
  ```

  2. 在 `.babelrc` 或 `package.json` 增加配置
  ```json
  {
    "plugins": [
      "transform-es2015-modules-commonjs"
    ]
  }
  ```

  3. 修改配置文件名称
  ```
  mv webpack/build.config.js webpack/build.config.babel.js
  ```
  这样，webpack 就会使用 babel-loader 来加载配置文件

  4. 修改编译脚本，让 webpack 加载重命名后的配置文件 `webpack/build.config.babel.js`
  ```json
  {
    "name": "bullock",
    "version": "1.0.0",
    "scripts": {
      "build": "webpack --config webpack/build.config.babel.js"
    },
    "dependencies": {
      "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
      "webpack": "^4.9.1",
      "webpack-cli": "^2.1.4"
    }
  }
  ```

## 让 webpack 支持 react
  1. 安装 react react-dom
  ```
  npm i react react-dom
  ```

  2. 让 webpack 支持 ES6
  ```
  npm i babel-loader
  ```

  在 build.config.babel.js 中增加 loader
  ```
  export default {
    mode: 'development',
    entry: './src/entry.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: ['node_modules'],
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  };
  ```

  >这里出道题

  3. 让 babel 支持 JSX
  ```
  npm i babel-preset-react
  ```

  * 让 babel 支持 JSX
  ```json
  {
    "presets": [
      "react"
    ],
    "plugins": [
      "transform-es2015-modules-commonjs"
    ]
  }
  ```

## 服务器端渲染
之前的代码都是在浏览器端执行，现在我们让工程支持服务器端渲染。

首先，我们需要增加了一个本地 web server，这里我们选择最常见的 koa
```
npm i koa
```

增加 babel-cli ，因为需要在服务器端解析 JSX
```
npm i babel-cli
```

接下来，我们来增加一个服务器端的入口文件 `src/server.js`：

```js
const Koa = require('koa');
const React = require('react');
const ReactDOM = require('react-dom/server');

const host = 'localhost';
const port = '3000';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = '111';
});

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  } else {
    console.info(`==> 💻  http://${host}:${port}`);
  }
});
```

并且在 `package.json` 中增加一个命令:
```json
{
  "scripts": {
    "server": "babel-node src/server.js",
    "build": "webpack --config webpack/build.config.babel.js"
  },
  "dependencies": {
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    "babel-preset-react": "^6.24.1",
    "koa": "^2.5.1",
    "react": "^16.4.0",
    "react-dom": "^16.4.0",
    "webpack": "^4.9.1",
    "webpack-cli": "^2.1.4"
  }
}
```
运行 `npm run server`，打开 http://localhost:3000，可以看到网页显示 Hello world，网页源代码如下
```html
<!doctype html>
<h1 data-reactroot="">Hello world</h1>
```

## 加载图片
```js
// components/Hello/index.js
import React, { Component } from 'react';
import logo from './logo.png';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <img src={logo} />
      </div>
    );
  }
};
```
* 运行 `npm run build`，会报错，需要增加 `file-loader`
  ```
  npm i file-loader
  ```

* 在 webpack/build.config.babel.js 中增加 file-loader
```js
export default {
  mode: 'development',
  entry: './src/entry.js',
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
```
这时，`npm run build` 可以正常运行了。但 `npm run server` 还会报错（语法错误），因为在 node 中直接 require png文件内容后，代码无法解析。解决方法是：将 require('./logo.png') 包装成返回 logo.png 地址的字符串。因为 webpack 过程会对图片文件重命名，所以该翻译过程还需要支持重命名的情况。
```
require('./logo.png') => module.exports = './logo.png';
```

我们使用 `asset-require-hook` 来完成这个转换
安装依赖，并在 `server.js` 加上对它的配置
```
npm i asset-require-hook
```

由于 `asset-require-hook` 会影响 require 对图片的引用，所以，务必确保下面的代码在任何对图片 require 代码的前面执行。
```js
require('asset-require-hook')({
  extensions: ['png']
});

// const logo = require('./logo.png');
```

这时，运行 `http://localhost:3000` 看到了什么？
- 看到 Hello world 和 logo 图片
- 看到 Hello world 和 一张加载出错的图片
- 看到 404 页面
- 看到页面报错信息 SyntaxError: xxx

没错，页面上的文字能正常显示，但图片显示不出来，通过查看源文件我们能发现，图片的地址不是我们期望的 `<img src="ba7c5a74e5ad30bb4c534c29f674aa7d.png"/>`，这个地址是webpack对静态文件编译后的地址，而现在我们并没有启动webpack，因此该地址找不到。

如何解决这个问题？我们需要引入 `koa-webpack`，它提供了在 koa 中使用 dev 和 HRM 功能。
```
npm i koa-webpack
```

```js
// src/server.js
import './require-hook';
import Koa from 'koa';
import webpack from 'webpack';
import middleware from 'koa-webpack';
import React from 'react';
import ReactDOM from 'react-dom/server';
import webpackConfig from '../webpack/dev.config.babel';
import Hello from './components/Hello';

const host = 'localhost';
const port = '3000';

const app = new Koa();

// 提供 webpack-dev-server
const compiler = webpack(webpackConfig);
app.use(middleware({ compiler }));

app.use(async (ctx) => {
  const html = ReactDOM.renderToString(
    <Hello />
  );
  ctx.body = `<!doctype html>\n${html}`;
});

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  } else {
    console.info(`==> 💻  http://${host}:${port}`);
  }
});
```

`dev.config.babel.js` 中的 `entry` 需改为数组类型：
```js
// webpack/dev.config.babel.js
export default {
  mode: 'development',
  entry: ['./src/entry.js'], // 改成数组
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
```

## webpack 支持 css
网页离开不开 CSS 样式，我们新建一个 CSS 文件，让 `Hello` 组件的文字变成红色。
```css
/* components/Hello/style.css */
h1 {
  text-align: center;
  color: #f00;
}
```

在 `src/components/Hello/index.js` 中引入样式文件，修改后的代码如下：
```js
import React, { Component } from 'react';
import logo from './logo.png';
import 'style.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <img src={logo} />
      </div>
    );
  }
};
```
安装 `css-loader`
```
npm i css-loader
```
在 webpack 的配置中 module 和 plugins 增加相应配置
```js
// webpack/dev.config.babel.js
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};
```
到这一步，样式文件会打包到 `main.js` 包中，在运行时，会用 `<link>` 标签动态插入到 `<head>` 中。

如何把 css 文件打成独立样式文件？需要用到 `mini-css-extract-plugin`
```
npm i mini-css-extract-plugin
```

修改 `require-hook.js`
```js
// src/require-hook.js
require('asset-require-hook')({
  extensions: ['png']
});

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});
```

## 使用 cdn 网络
- 直接设置 `publicPath` 即可

## 路由
```
# 浏览器端使用
npm i react-router-dom

# 服务器端使用
npm i react-router
```

## 页面标题切换
```
npm i react-helmet
```

浏览器端使用：在组件中增加
```js
// src/components/App/index.js
const Home = () => (
  <div>
    <Helmet>
      <title>Bullock</title>
    </Helmet>
    <h2 className={styles.header}>Home</h2>
    <div className={styles.box}>
      <img className={styles.card} src={logo} alt="logo" />
    </div>
  </div>
);
```

服务器端使用：
坑：要先执行 `ReactDOM.renderToString()` ，再执行 `Helmet.renderStatic()`
```js
// src/server.js
import Helmet from 'react-helmet';

// <Page />中包含 <Helmet />
const page = ReactDOM.renderToString(<Page />);

const helmet = Helmet.renderStatic();

ReactDOM.renderToString(
  <html>
    <head>
      { helmet.title.toComponent() }
    </head>
    <body></body>
  </html>
);
```

## 热模块替换
- css 不能HRM

## 拆分成多个包

## 数据管理
```
npm i redux react-redux serialize-javascript
```
服务器端获取到初始化数据后，更新 redux ，同时在输出 HTML 时，将 redux 中的数据序列化后拍到网页中的全局变量 window.__INITIAL_STATE__ ，浏览器用 `window.__INITIAL_STATE__` 来初始化 redux，这样就完成了前后端 redux 数据共享和同构。

## 支持装饰器语法
```
npm i babel-plugin-transform-decorators-legacy
```
在 `.babelrc` 增加该插件的引用
```json
{
  "presets": [
    "react"
  ],
  "plugins": [
    "transform-es2015-modules-commonjs",
    "transform-decorators-legacy"
  ]
}
```

## 数据获取
```
npm i axios
```

## 避免前后端重复渲染
保证前后端渲染输出的DOM结构一致即可，react 的 DOM diff 时会对比出 DOM 结构没有发生变化，从而忽略浏览器端渲染。

## 避免前后端重复获取数据

## 为什么不直接使用 next.js
* 静态文件不支持增量部署
* 不支持 webpack 4
* 默认使用 `css in js`, 和传统的CSS开发方式差异大
* 使用自家路由

## 前后端同构工程发布指南
http://wiki.corp.qunar.com/confluence/pages/viewpage.action?pageId=189430663
