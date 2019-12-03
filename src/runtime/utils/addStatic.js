import { existsSync } from 'fs';
import express from 'express';

export default (app) => {
  const {
    DACE_PATH_STATIC,
    DACE_PUBLIC_PATH,
    DACE_PATH_CLIENT_DIST
  } = process.env;
  // 当 publicPath = '/' 需要将编译目录挂载为虚拟目录（本地开发模式）
  if (DACE_PUBLIC_PATH === '/') {
    app.use(express.static(DACE_PATH_CLIENT_DIST));
  }

  if (DACE_PATH_STATIC !== '' && existsSync(DACE_PATH_STATIC)) {
    app.use(express.static(DACE_PATH_STATIC));
  }
};
