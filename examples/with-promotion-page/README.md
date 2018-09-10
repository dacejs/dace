# 内嵌到促销页面

下面的文档将介绍如何将工程中A页面嵌入到其他网站B页面中。

## 测试
### 测试SSR页面
用下面的命令可以启动一个 dace 服务，在 `http://localhost:3000/list` 预览普通网站
```
npm i && npm start
```

### 测试内嵌酒店list页的活动页
用下面的命令可以启动一个express服务（模拟活动页web服务），在 `http://localhost:4000/mis/abcd` 预览嵌入页面
```
node ../../test/cases/with-promotion-page.js
```

## 要点
- 修改A页面对应到路由，让A能分别在不同网站的URL地址下渲染。
  ```js
  // router.js
  module.exports = {
    path: /(mis\/\\w+|list)/
  };
  ```
- A页面中的地址需要使用绝对地址，如 `https://touch.qunar.com/hotel/detail/1234` ，否则域名会串了
- 禁止A页面中的js修改B页面的 title
