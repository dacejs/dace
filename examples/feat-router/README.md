# 路由规则

下面的文档将介绍如何 Dace 约定的路由规则。

## 约定
- 所有页面文件存放目录为 `src/pages`。
- 文件扩展名为 `.jsx`。
- `index.jsx` 为默认首页
- 多级目录会根据目录结构生成对应的路由
- 多级目录中 `index.jsx` 为目录默认页

## 举例
每一个在 `src/pages` 目录下的 `.jsx` 页面都会被自动路由，举个例子， `/src/pages/a.jsx` 页面可以无需配置任何路由，访问 `http://localhost:3000/a` 该页面就会被自动渲染，映射关系如下：


| 客户端页面          | 路由 | 备注           |
| ---------------------- | ------ | -------------- |
| src/pages/index.jsx       | /      | 默认路由 |
| src/pages/index/index.jsx | /      | 默认路由 |
| src/pages/a.jsx           | /a     | 自动路由 |
| src/pages/a/index.jsx     | /a     | 自动路由 |
| src/pages/a/b.jsx         | /a/b   | 自动路由 |
| src/pages/a/b/index.jsx   | /a/b   | 自动路由 |
