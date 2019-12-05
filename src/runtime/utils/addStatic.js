import express from 'express';

export default (app) => {
  const {
    DACE_STATIC,
    DACE_PUBLIC_PATH,
    DACE_PATH_CLIENT_DIST
  } = process.env;
  // 当 publicPath = '/' 需要将编译目录挂载为虚拟目录（本地开发模式）
  if (DACE_PUBLIC_PATH === '/') {
    app.use(express.static(DACE_PATH_CLIENT_DIST));
  }

  if (DACE_STATIC !== '') {
    DACE_STATIC.split(',').map(dir => dir.trim()).forEach((dir) => {
      // dir 为相对程序启动入口文件的相对目录
      app.use(express.static(dir));
    });
    console.log(`set static success, the root directory is ${DACE_STATIC}`);
  }
};
