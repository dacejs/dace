# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
