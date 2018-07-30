# 自定义网页路由

下面的文档将介绍如何在工程中自定义网页路由。

## 要点
- 在需要自定义的 pages 组件目录下增加 `router.js`。
- 在 `router.js` 中增加路由规则：
  ```js
  export default {
    path: '/:id'
  };
  ```
