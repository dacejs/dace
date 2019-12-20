import urlrewrite from 'packing-urlrewrite';
import rewriteRules from '../rewriteRules';

export default (app) => {
  // 只在本地开发时使用 mock 数据
  const isDev = process.env.NODE_ENV === 'development';
  let rules = rewriteRules;
  if (!isDev) {
    rules = Object.keys(rules)
      .filter(key => !rules[key].startsWith('require!'))
      .reduce((res, key) => {
        res[key] = rules[key];
        return res;
      }, {});
  }
  app.use(urlrewrite(rules, {
    debug: isDev
  }));
};
