import express from 'express';

export default (app) => {
  // 当 publicPath = '/' 需要将编译目录挂载为虚拟目录（本地开发模式）
  if (process.env.DACE_PUBLIC_PATH === '/') {
    app.use(express.static(process.env.DACE_PATH_CLIENT_DIST));
  }
};
