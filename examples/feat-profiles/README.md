# 设置环境变量

下面的文档将介绍如何在工程中使用环境变量。

dace 使用 [dotenv](https://www.npmjs.com/package/dotenv) 进行配置管理。

在工程根目录下（注意不是 `src` 目录）新建 `profiles` 目录，在 `profiles` 目录下分别为不同环境建立 profile 文件。

## 加载规则
dace 启动时可以加载多个配置文件，当配置项存在冲突时，以先加载的配置为准。

## 配置类型

配置文件有三种类型：

1. `.${PROFILE}.env`：PROFILE 是 portal 发布系统配置的，执行编译时会通过 `build.sh` 获取到该参数，并传递到 `npm run build`，用它来控制发布到不同测试环境的配置文件。
1. `.${NODE_ENV}.env`：与 `process.env.NODE_ENV` 环境变量对应的配置文件，它有四种取值[ `local`, `development`, `beta`, `prod` ]。
1. `.common.env`：所有环境通用的配置文件。
