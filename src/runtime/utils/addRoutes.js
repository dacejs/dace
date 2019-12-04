export default (app) => {
  if (process.env.DACE_PATH_ROUTES) {
    try {
      const router = require(process.env.DACE_PATH_ROUTES);
      app.use(router);
    } catch (e) {
      console.error(`DACE_PATH_ROUTES not exist. ${e}`);
    }
  }
};
