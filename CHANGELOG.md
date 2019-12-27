# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.4.8](https://github.com/dacejs/dace/compare/v3.4.7...v3.4.8) (2019-12-27)


### Bug Fixes

* 修复 @babel/preset-env 缺失 corejs 参数的报警 ([49a2b5f](https://github.com/dacejs/dace/commit/49a2b5fba7f9e014ed68a0dc610bd2301d91d2a4))

### [3.4.7](https://github.com/dacejs/dace/compare/v3.4.6...v3.4.7) (2019-12-27)


### Features

* 增加 DACE_HMR 配置，可以关闭 webpack 热模块替换功能 ([fcc7d64](https://github.com/dacejs/dace/commit/fcc7d64ad6e326c55f3dafaabb5b0143f3a2f4e7))
* 支持按 .browserslistrc 添加所需的 polyfill ([af58db0](https://github.com/dacejs/dace/commit/af58db0551eb5103210e44a0ab5bfbe26d7ce9f9))

### [3.4.6](https://github.com/dacejs/dace/compare/v3.4.5...v3.4.6) (2019-12-26)


### Features

* 增加配置项 DACE_BABEL_COMPILE_MODULES ，用来指定哪些依赖包需要通过 babel 编译 ([580b544](https://github.com/dacejs/dace/commit/580b5446f8fbc3bdd3d95d22bbdbfa4eb2c77449))
* 移除依赖包 axios ([33dc01a](https://github.com/dacejs/dace/commit/33dc01aa642aa2c6cdee3af885195051c522d67d))

### [3.4.5](https://github.com/dacejs/dace/compare/v3.4.4...v3.4.5) (2019-12-25)


### Features

* eslint 校验时无效的 disable 提示报错 ([bea2c7e](https://github.com/dacejs/dace/commit/bea2c7e4a9051fe58d0ff3bbe041554a4b72af9a))
* 移除 dase-router ([91d4807](https://github.com/dacejs/dace/commit/91d480710e605bbcaa5f5ca63510ce375e85ebbf))

### [3.4.4](https://github.com/dacejs/dace/compare/v3.4.3...v3.4.4) (2019-12-20)

### [3.4.3](https://github.com/dacejs/dace/compare/v3.4.2...v3.4.3) (2019-12-20)

### [3.4.2](https://github.com/dacejs/dace/compare/v3.4.1...v3.4.2) (2019-12-09)


### Features

* 增加 body-parser ([0172f93](https://github.com/dacejs/dace/commit/0172f93e3e151563343befda3b5799da59aedbcc))
* 本地开发时js文件输出sourcemap ([e25c622](https://github.com/dacejs/dace/commit/e25c622c72a5f16f79611922fe90ca4584c9cb9d))

### [3.4.1](https://github.com/dacejs/dace/compare/v3.4.0...v3.4.1) (2019-12-06)

## [3.4.0](https://github.com/dacejs/dace/compare/v3.3.1...v3.4.0) (2019-12-06)


### Features

* 分别为服务器端和客户端增加代码编译混淆开关 ([bcb5048](https://github.com/dacejs/dace/commit/bcb50481a4c8d8487b736241d490d61bf009e2d7))
* 支持在服务器上挂载多个 static 目录 ([7923b8e](https://github.com/dacejs/dace/commit/7923b8e5255f707554e23e653ffb1a42adc64917))
* 线上编译时不输出source map ([4fd4f9d](https://github.com/dacejs/dace/commit/4fd4f9d9e1d6752024c0ae934510453e51fd8f58))

### [3.3.1](https://github.com/dacejs/dace/compare/v3.3.0...v3.3.1) (2019-12-04)


### Features

* 支持编译时不压缩源码 ([fff23ea](https://github.com/dacejs/dace/commit/fff23eab8d969f2a70aeeea1d0316861bad8b8db))


### Bug Fixes

* 修复因编译机和运行机不是同一台导致的路由挂载无效的问题 ([98c23b9](https://github.com/dacejs/dace/commit/98c23b98fedb88041153ff11787a650e66301714))

## [3.3.0](https://github.com/dacejs/dace/compare/v3.2.0...v3.3.0) (2019-12-04)


### Features

* 增加是否添加 polyfill 的开关配置 ([bcb7086](https://github.com/dacejs/dace/commit/bcb70861f444c8fe414fd5c6ccc8f017d84ea0d3))

## [3.2.0](https://github.com/dacejs/dace/compare/v3.1.0...v3.2.0) (2019-12-03)


### Features

* 支持静态文件目录 ([d2ec849](https://github.com/dacejs/dace/commit/d2ec849ec2bf3bc5f927c3719cc78b2adc41a944))

## [3.1.0](https://github.com/dacejs/dace/compare/v3.0.1...v3.1.0) (2019-12-03)


### Features

* 默认为 DACE_PATH_ROUTES 设置值 ([be8ce56](https://github.com/dacejs/dace/commit/be8ce5669e617d6b7f89988034425f27c7bcee4c))

### [3.0.1](https://github.com/dacejs/dace/compare/v3.0.0...v3.0.1) (2019-11-27)

## [3.0.0](https://github.com/dacejs/dace/compare/v2.4.1...v3.0.0) (2019-11-25)


### Features

* 重写数据代理方法 ([07f4e38](https://github.com/dacejs/dace/commit/07f4e381b52e7e49ed469c7d94318b751a9a38c7))

### [2.4.1](https://github.com/dacejs/dace/compare/v2.4.0...v2.4.1) (2019-11-23)

## [2.4.0](https://github.com/dacejs/dace/compare/v2.3.0...v2.4.0) (2019-11-22)


### Features

* 增加输出 urlrewrite 转发信息日志 ([f48e528](https://github.com/dacejs/dace/commit/f48e5288717d67b1c3c5accaa1774a2f3ed0faf2))

## [2.3.0](https://github.com/dacejs/dace/compare/v2.2.6...v2.3.0) (2019-11-20)


### Features

* 增加 cookie 解析 ([8e7e69e](https://github.com/dacejs/dace/commit/8e7e69e40e597fb30af4a9fbb98868aee0720c8e))


### Bug Fixes

* 修复静态资源不存在时返回 notFound 页面的问题 ([d6f2f53](https://github.com/dacejs/dace/commit/d6f2f53b655b13a207d2807eec629475e60016ea))

<a name="2.2.6"></a>
## [2.2.6](https://github.com/dacejs/dace/compare/v2.2.5...v2.2.6) (2019-07-31)


### Bug Fixes

* 修复不支持 post 方式提交的地址 ([c242d0f](https://github.com/dacejs/dace/commit/c242d0f))



<a name="2.2.5"></a>
## [2.2.5](https://github.com/dacejs/dace/compare/v2.2.4...v2.2.5) (2019-06-17)


### Bug Fixes

* 使用 stats 代替statsFile，避免运行时 require 不到文件。 ([bd07e8c](https://github.com/dacejs/dace/commit/bd07e8c))



<a name="2.2.4"></a>
## [2.2.4](https://github.com/dacejs/dace/compare/v2.2.3...v2.2.4) (2019-06-17)


### Bug Fixes

* 修复 DACE_PATH_LOADABLE_STATS_JSON 拼写错误 ([f77768e](https://github.com/dacejs/dace/commit/f77768e))



<a name="2.2.3"></a>
## [2.2.3](https://github.com/dacejs/dace/compare/v2.2.2...v2.2.3) (2019-06-17)


### Bug Fixes

* 修复 prd/loadable-stats.json 找不到的问题 ([5e6651e](https://github.com/dacejs/dace/commit/5e6651e))



<a name="2.2.2"></a>
## [2.2.2](https://github.com/dacejs/dace/compare/v2.2.1...v2.2.2) (2019-06-13)

### Bug Fixes

* 修复 TRAVIS 编译的问题，使用 `node@8||12`

<a name="2.2.1"></a>
## [2.2.1](https://github.com/dacejs/dace/compare/v2.2.0...v2.2.1) (2019-06-13)


### Bug Fixes

* [#20](https://github.com/dacejs/dace/issues/20) 修复 babel.config.js 不生效的问题 ([e6d14bb](https://github.com/dacejs/dace/commit/e6d14bb))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/dacejs/dace/compare/v2.1.1...v2.2.0) (2019-06-13)


### Features

* 升级 eslint-config-qunar@5.1.0 , 默认支持老的装饰器语法 ([db1f1ee](https://github.com/dacejs/dace/commit/db1f1ee))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/dacejs/dace/compare/v2.1.0...v2.1.1) (2019-06-13)


### Features

* 测试用例的 react 版本升级到 react@^16.8.6 ([b71b3cc](https://github.com/dacejs/dace/commit/b71b3cc))
* 测试命令增加 `FROM` 参数，当 `npm test` 执行失败时，可以使用 `FROM=xx npm test` 继续执行剩余的 case


<a name="2.1.0"></a>
# [2.1.0](https://github.com/dacejs/dace/compare/v2.0.1...v2.1.0) (2019-06-13)


### Features

* 升级 `eslint-config-qunar@5.x` ([94c29c5](https://github.com/dacejs/dace/commit/94c29c5))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/dacejs/dace/compare/v2.0.0...v2.0.1) (2019-06-13)


### Features

* 升级 `react-dev-utils@^9.x` ，删除 `react-error-overlay` ([96032d3](https://github.com/dacejs/dace/commit/96032d3))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/dacejs/dace/compare/v2.0.0-alpha.18...v2.0.0) (2019-06-12)


### Bug Fixes

* [#19](https://github.com/dacejs/dace/issues/19) 预加载 [@loadable](https://github.com/loadable)/component  确保服务器端第一次渲染时能拿到数据 ([4fac946](https://github.com/dacejs/dace/commit/4fac946))
* 删除 renderTags 和 writeStatsFilePlugin ([1b6fb76](https://github.com/dacejs/dace/commit/1b6fb76))


### Features

* 升级 css-loader@^2.1.1 ([6942b09](https://github.com/dacejs/dace/commit/6942b09))



<a name="2.0.0-alpha.18"></a>
# [2.0.0-alpha.18](https://github.com/dacejs/dace/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2019-06-11)


### Features

* 升级 react-router@5.x ([393653c](https://github.com/dacejs/dace/commit/393653c))



<a name="2.0.0-alpha.17"></a>
# [2.0.0-alpha.17](https://github.com/dacejs/dace/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2019-06-11)


### Features

* 升级 mocha@^6.1.4 ([d02ecf1](https://github.com/dacejs/dace/commit/d02ecf1))
* 升级依赖包 babel@7.x ([7225966](https://github.com/dacejs/dace/commit/7225966))



<a name="2.0.0-alpha.16"></a>
# [2.0.0-alpha.16](https://github.com/dacejs/dace/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2019-06-10)


### Features

* 升级依赖包 ([36da952](https://github.com/dacejs/dace/commit/36da952))



<a name="2.0.0-alpha.15"></a>
# [2.0.0-alpha.15](https://github.com/dacejs/dace/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2019-06-10)


### Bug Fixes

* [#16](https://github.com/dacejs/dace/issues/16) 修复 `DACE_PATH_AXIOS_INSTANCE` 默认值错误。 ([6bb37e8](https://github.com/dacejs/dace/commit/6bb37e8))
* [#17](https://github.com/dacejs/dace/issues/17) 修复使用默认路由时的报错 ([535c72b](https://github.com/dacejs/dace/commit/535c72b))



<a name="2.0.0-alpha.14"></a>
# [2.0.0-alpha.14](https://github.com/dacejs/dace/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2019-06-03)


### Bug Fixes

* [#15](https://github.com/dacejs/dace/issues/15) route.path 支持数组参数 ([5ebc5a5](https://github.com/dacejs/dace/commit/5ebc5a5))



<a name="2.0.0-alpha.13"></a>
# [2.0.0-alpha.13](https://github.com/dacejs/dace/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2019-01-31)


### Bug Fixes

* [#13](https://github.com/dacejs/dace/issues/13) 运行编译后代码报错 Not found `DACE_PATH_STATS_JSON` in `process.env` ([0dcc7e7](https://github.com/dacejs/dace/commit/0dcc7e7))


### Features

* 增加 DACE_LONG_TERM_CACHING ([2438ccc](https://github.com/dacejs/dace/commit/2438ccc))



<a name="2.0.0-alpha.12"></a>
# [2.0.0-alpha.12](https://github.com/dacejs/dace/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2019-01-30)


### Features

* 开发环境下也使用长期缓存 ([d7cabd6](https://github.com/dacejs/dace/commit/d7cabd6))
* 调整代理请求规则配置方式 ([8bb7bd7](https://github.com/dacejs/dace/commit/8bb7bd7))



<a name="2.0.0-alpha.11"></a>
# [2.0.0-alpha.11](https://github.com/dacejs/dace/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2019-01-29)


### Bug Fixes

* 修复前端路由不触发getInitialProps的问题 ([c6de1e4](https://github.com/dacejs/dace/commit/c6de1e4))



<a name="2.0.0-alpha.10"></a>
# [2.0.0-alpha.10](https://github.com/dacejs/dace/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2019-01-28)


### Features

* 地址找不到时显示404页面 ([0210dbd](https://github.com/dacejs/dace/commit/0210dbd))
* **config:** 增加 `DACE_SCRIPT_CROSSORIGIN` 配置项 ([ad2d127](https://github.com/dacejs/dace/commit/ad2d127))
* **deps:** `axios@^0.18.0` `packing-urlrewrite@^0.2.0` ([b54657c](https://github.com/dacejs/dace/commit/b54657c))
* **deps:** redbox-react@1.6.0 ([cc60a29](https://github.com/dacejs/dace/commit/cc60a29))
* 新增请求转发功能 ([06f31c1](https://github.com/dacejs/dace/commit/06f31c1))



<a name="2.0.0-alpha.9"></a>
# [2.0.0-alpha.9](https://github.com/dacejs/dace/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2019-01-23)


### Features

* 修改环境变量名称 ([1b121da](https://github.com/dacejs/dace/commit/1b121da))
* 提取 DACE_VENDORS 变量 ([2330235](https://github.com/dacejs/dace/commit/2330235))
* 禁用 `import/prefer-default-export` eslint 规则 ([77833de](https://github.com/dacejs/dace/commit/77833de))
* 重构 dace 配置文件机制 ([28d0bb2](https://github.com/dacejs/dace/commit/28d0bb2))



<a name="2.0.0-alpha.8"></a>
# [2.0.0-alpha.8](https://github.com/dacejs/dace/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2019-01-14)


### Features

* 增加 `DACE_AXIOS_INSTANCE_PATH` 参数 ([b76d259](https://github.com/dacejs/dace/commit/b76d259))
* 重命名配置参数 `DACE_DISABLE_SSR` ->`DACE_NO_SSR` ([1be4239](https://github.com/dacejs/dace/commit/1be4239))



<a name="2.0.0-alpha.7"></a>
# [2.0.0-alpha.7](https://github.com/dacejs/dace/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2019-01-11)



<a name="2.0.0-alpha.6"></a>
# [2.0.0-alpha.6](https://github.com/dacejs/dace/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2019-01-11)


### Bug Fixes

* 修复设置router.js时页面不能正常插入css文件的问题 ([fe9baa6](https://github.com/dacejs/dace/commit/fe9baa6))
* 当 publicPath = '/' 需要将编译目录挂载为虚拟目录（本地开发模式） ([5ab0e91](https://github.com/dacejs/dace/commit/5ab0e91))


### Features

* **config:** 增加 `vendors` 配置 ([6a963d0](https://github.com/dacejs/dace/commit/6a963d0))
* 将 style.css 从 splitChunk 配置中删除 ([06d6fa8](https://github.com/dacejs/dace/commit/06d6fa8))



<a name="2.0.0-alpha.5"></a>
# [2.0.0-alpha.5](https://github.com/dacejs/dace/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2019-01-10)



<a name="2.0.0-alpha.4"></a>
# [2.0.0-alpha.4](https://github.com/dacejs/dace/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2019-01-10)


### Bug Fixes

* 回退到 `webpack@4.28.1` ([aaf925d](https://github.com/dacejs/dace/commit/aaf925d))



<a name="2.0.0-alpha.3"></a>
# [2.0.0-alpha.3](https://github.com/dacejs/dace/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2019-01-09)



<a name="2.0.0-alpha.2"></a>
# [2.0.0-alpha.2](https://github.com/dacejs/dace/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2019-01-09)



<a name="2.0.0-alpha.1"></a>
# [2.0.0-alpha.1](https://github.com/dacejs/dace/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2019-01-09)



<a name="2.0.0-alpha.0"></a>
# [2.0.0-alpha.0](https://github.com/dacejs/dace/compare/v1.6.0...v2.0.0-alpha.0) (2019-01-09)


### Bug Fixes

* 从环境变量中获取devServer的端口号 ([8680a6c](https://github.com/dacejs/dace/commit/8680a6c))
* 删除无用的虚拟目录 ([53a409d](https://github.com/dacejs/dace/commit/53a409d))


### Features

* 使用 logger 代替 console 输出 ([ec01f35](https://github.com/dacejs/dace/commit/ec01f35))
* 可以在 dace.config.js 中配置环境变量和路径变量 ([aa074c6](https://github.com/dacejs/dace/commit/aa074c6))
* **config:** 增加 DACE_SCROLL_TO_TOP 开关 ([b500fd2](https://github.com/dacejs/dace/commit/b500fd2))
* **config:** 增加禁用服务器端渲染开关 `DACE_DISABLE_SSR` ([b8b95af](https://github.com/dacejs/dace/commit/b8b95af))
* **config:** 增加默认首页文件名称配置 `DACE_INDEX` ([d511b4c](https://github.com/dacejs/dace/commit/d511b4c))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/dacejs/dace/compare/v1.5.2...v1.6.0) (2018-10-18)


### Bug Fixes

* 修复使用 history.push 修改 url 后 query 获取异常的问题 ([d45fc63](https://github.com/dacejs/dace/commit/d45fc63))


### Features

* 删除 dace mock 服务，使用 webpack-dev-server 的 proxy 代替 ([2e62298](https://github.com/dacejs/dace/commit/2e62298))



<a name="1.5.2"></a>
## [1.5.2](https://github.com/dacejs/dace/compare/v1.5.1...v1.5.2) (2018-09-28)


### Bug Fixes

* 禁止 splitChunks 自动生成 vendors 包 ([2c435e5](https://github.com/dacejs/dace/commit/2c435e5))
* 给 script 标签加上 crossorigin="anonymous" ([d9e3a2a](https://github.com/dacejs/dace/commit/d9e3a2a))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/dacejs/dace/compare/v1.5.0...v1.5.1) (2018-09-27)


### Bug Fixes

* 修复多级目录时初始化HTML插入script标签错误的问题 ([42750fa](https://github.com/dacejs/dace/commit/42750fa))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/dacejs/dace/compare/v1.4.0...v1.5.0) (2018-09-27)


### Features

* **cli:** 增加 `--visualizer` 参数，是否启用 webpack-visualizer 打包分析工具 ([9603265](https://github.com/dacejs/dace/commit/9603265))
* 在首屏HTML中直接输出css标签，避免页面抖动 ([1d57379](https://github.com/dacejs/dace/commit/1d57379))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/dacejs/dace/compare/v1.3.0...v1.4.0) (2018-09-26)


### Bug Fixes

* 修复默认首页不加载index.css的问题 ([117ae1a](https://github.com/dacejs/dace/commit/117ae1a))
* 美化 Stylelint Error 输出格式 ( [#10](https://github.com/dacejs/dace/issues/10)  ) ([5d4f105](https://github.com/dacejs/dace/commit/5d4f105))
* 解决编译过程自动合并导致打包结果与预期不一致的问题 ([cd41f5c](https://github.com/dacejs/dace/commit/cd41f5c))


### Features

* **cli:** 增加 verbose 参数，显示详细日志信息 ([f05a276](https://github.com/dacejs/dace/commit/f05a276))
* 用 post-preset-env 代替 post-cssnext ([3864c25](https://github.com/dacejs/dace/commit/3864c25))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/dacejs/dace/compare/v1.2.0...v1.3.0) (2018-09-14)


### Features

* 将前后端编译产物输出到不同目录 ([9297e7e](https://github.com/dacejs/dace/commit/9297e7e))
* 支持 code-splitting ([937295a](https://github.com/dacejs/dace/commit/937295a))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/dacejs/dace/compare/v1.1.1...v1.2.0) (2018-08-29)


### Features

* dace-plugin 支持配置参数 ([870ee1f](https://github.com/dacejs/dace/commit/870ee1f))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/zhongzhi107/dace/compare/v1.1.0...v1.1.1) (2018-08-23)


### Bug Fixes

* 修复 rules 配置文件不存在时报错的问题 ([297edd8](https://github.com/zhongzhi107/dace/commit/297edd8))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/zhongzhi107/dace/compare/v1.0.0...v1.1.0) (2018-08-22)


### Features

* 增加 API 接口数据 mock 功能 ([c324ebc](https://github.com/zhongzhi107/dace/commit/c324ebc))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/zhongzhi107/dace/compare/v0.0.1...v1.0.0) (2018-08-22)


### Bug Fixes

* [#1](https://github.com/zhongzhi107/dace/issues/1) 发生 JSX 语法错误后，当修改正确后 dev server 一直处于加载状态 ([b77eb28](https://github.com/zhongzhi107/dace/commit/b77eb28))
* [#5](https://github.com/zhongzhi107/dace/issues/5) 修复服务器端渲染时，当前页面reducer没能注入浏览器端 store 引发的界面不更新 ([8c94bd8](https://github.com/zhongzhi107/dace/commit/8c94bd8))
* DACE_PUBLIC_PATH 不生效 ([1db34fd](https://github.com/zhongzhi107/dace/commit/1db34fd))
* fix doc link ([8059057](https://github.com/zhongzhi107/dace/commit/8059057))
* process.env.NODE_ENV 缺省值为 local ([2249793](https://github.com/zhongzhi107/dace/commit/2249793))
* url中包含querystring时react-router匹配失效 ([47b25fc](https://github.com/zhongzhi107/dace/commit/47b25fc))
* 修复因模糊路由匹配导致的路由错误 ([805922c](https://github.com/zhongzhi107/dace/commit/805922c))
* 修改拼写错误 ([5823412](https://github.com/zhongzhi107/dace/commit/5823412))
* 当 node_modules/dace-plugin-redux 存在且工程不使用 redux 时会报错 ([2426a3f](https://github.com/zhongzhi107/dace/commit/2426a3f))
* 根据 learn dace demo 调整代码 ([3b29c0e](https://github.com/zhongzhi107/dace/commit/3b29c0e))
* 编译工程缺少参数 ([3dba5bd](https://github.com/zhongzhi107/dace/commit/3dba5bd))
* 解决 server build 报错 “ModuleDependencyWarning: Critical dependency: the request of a dependency is an expression” ([f0ea48e](https://github.com/zhongzhi107/dace/commit/f0ea48e))
* 解决服务器端渲染中文乱码的问题 ([2ca013a](https://github.com/zhongzhi107/dace/commit/2ca013a))
* 资源文件的引用--引号缺失 ([0c4e8d7](https://github.com/zhongzhi107/dace/commit/0c4e8d7))


### Features

* 为 reducer-key 增加默认值 ([420ef27](https://github.com/zhongzhi107/dace/commit/420ef27))
* 使用 nodeLoader 让 js 具备 node 能力 ([29a732f](https://github.com/zhongzhi107/dace/commit/29a732f))
* 使用Promise.all支持多种数据类型返回 ([25148e0](https://github.com/zhongzhi107/dace/commit/25148e0))
* 使用新的插件机制 ([e1e2766](https://github.com/zhongzhi107/dace/commit/e1e2766))
* 允许某些请求只在前端发起，服务端忽略 ([d0d51a4](https://github.com/zhongzhi107/dace/commit/d0d51a4))
* 启用stylelint ([1d0eec7](https://github.com/zhongzhi107/dace/commit/1d0eec7))
* 增加 babel-plugin-add-module-exports，支持 require default 模块 ([5d8d995](https://github.com/zhongzhi107/dace/commit/5d8d995))
* 增加 dotenv ([82b077a](https://github.com/zhongzhi107/dace/commit/82b077a))
* 增加 eslint 和 styelint 代码检查 ([38566f5](https://github.com/zhongzhi107/dace/commit/38566f5))
* 增加 postcss-next 支持 ([1518203](https://github.com/zhongzhi107/dace/commit/1518203))
* 增加禁止使用服务器端渲染的开关 ([396345a](https://github.com/zhongzhi107/dace/commit/396345a))
* 增加自动路由规则 ([fb4e570](https://github.com/zhongzhi107/dace/commit/fb4e570))
* 增加自定义数据请求过程中的loading组件 ([2679092](https://github.com/zhongzhi107/dace/commit/2679092))
* 增加路由无匹配时404页面 ([2545393](https://github.com/zhongzhi107/dace/commit/2545393))
* 导出 Helmet ([88ba61a](https://github.com/zhongzhi107/dace/commit/88ba61a))
* 封装成基础类库，提高易用性 ([87c80c6](https://github.com/zhongzhi107/dace/commit/87c80c6))
* 将 home 设置为默认首页 ([94d4ec8](https://github.com/zhongzhi107/dace/commit/94d4ec8))
* 将 querystring 和路由匹配结果传入 perfetch 装饰器中 ([8a7aa86](https://github.com/zhongzhi107/dace/commit/8a7aa86))
* 将 src 编译到 dist ([392d194](https://github.com/zhongzhi107/dace/commit/392d194))
* 支持 import() 异步代码加载和代码拆分 ([135727c](https://github.com/zhongzhi107/dace/commit/135727c))
* 支持加载项目中 eslint／postcss／stylelint／babelrc 等配置 ([8808585](https://github.com/zhongzhi107/dace/commit/8808585))
* 支持在项目中重写 webpack 配置 ([23ef79e](https://github.com/zhongzhi107/dace/commit/23ef79e))
* 支持更丰富的 dotenv ([7062e8a](https://github.com/zhongzhi107/dace/commit/7062e8a))
* 支持自定义server.js 和 client.js ([b09d3fe](https://github.com/zhongzhi107/dace/commit/b09d3fe))
* **CLI:** 增加 --verbose 参数 ([3fc86ff](https://github.com/zhongzhi107/dace/commit/3fc86ff))
* 简化 router.js 写法 ([77112eb](https://github.com/zhongzhi107/dace/commit/77112eb))
* 美化浏览器控制台输出格式 ([5b592a8](https://github.com/zhongzhi107/dace/commit/5b592a8))
* 自定义document.js ([a9687bc](https://github.com/zhongzhi107/dace/commit/a9687bc))


### Performance Improvements

* 优化 querystring 的传递方式 ([1c84948](https://github.com/zhongzhi107/dace/commit/1c84948))
* 优化代码 ([9f4cb6d](https://github.com/zhongzhi107/dace/commit/9f4cb6d))
* 优化数据预加载书写方式，使用组件的静态方法代替 route.loadData() ([fa9e8f1](https://github.com/zhongzhi107/dace/commit/fa9e8f1))
* 优化服务器端渲染网页中静态文件插入标签 ([f46611c](https://github.com/zhongzhi107/dace/commit/f46611c))
