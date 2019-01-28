import urlrewrite from 'packing-urlrewrite';

export default (app) => {
  let rules = {};
  try {
    rules = require(process.env.DACE_PATH_PROXY_TABLE);
    if (rules.default) {
      rules = rules.default;
    }
    app.use(urlrewrite(rules));
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Proxy table disabled.');
    }
  }
};
