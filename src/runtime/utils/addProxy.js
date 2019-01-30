import urlrewrite from 'packing-urlrewrite';

export default (app) => {
  if (process.env.DACE_PROXY) {
    let rules = {};
    try {
      rules = JSON.parse(process.env.DACE_PROXY);
      app.use(urlrewrite(rules));
    } catch (e) {
      throw new Error('[JSON.parse error] `DACE_PROXY` is an invalid json.');
    }
  }
};
