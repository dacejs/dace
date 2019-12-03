import { existsSync } from 'fs';

export default (app) => {
  if (process.env.DACE_PATH_ROUTES && existsSync(process.env.DACE_PATH_ROUTES)) {
    const router = require(process.env.DACE_PATH_ROUTES);
    app.use(router);
  }
};
