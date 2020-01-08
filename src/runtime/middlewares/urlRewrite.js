import url from 'url';
import path from 'path';
import axios from 'axios';

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function dispatcher(req, res, next, options) {
  return (rule) => {
    if (rule.from.test(req.path)) {
      if (rule.to.indexOf('require!') === 0) {
        // 使用本地文件模拟数据
        const urlObject = url.parse(req.url);
        const filepath = urlObject.pathname
          .replace(rule.from, rule.to)
          .replace('require!', '');
        const realpath = path.join(process.cwd(), filepath);
        if (options.debug) {
          console.log(`[urlrewrite] ${req.url} -> ${realpath}`);
        }
        res.setHeader('Content-Type', 'application/json');
        requireUncached(realpath)(req, res);
      } else if (/^(https{0,1}:){0,1}\/\//.test(rule.to)) {
        // 使用跨域API模拟数据
        const toUrl = req.url.replace(rule.from, rule.to);
        if (options.debug) {
          console.log(`[urlrewrite] ${req.url} -> ${toUrl}`);
        }
        axios({
          method: req.method,
          url: toUrl,
          headers: req.headers,
          data: req.body
        }).then((response) => {
          res.status(response.status).json(response.data).end();
        });
      } else {
        // 使用同域名的其他API模拟数据
        const toUrl = req.url.replace(req.path, rule.to);
        req.url = toUrl;
        if (options.debug) {
          console.log(`[urlrewrite] ${req.url} -> ${toUrl}`);
        }
        next();
      }
      return true;
    }
    return false;
  };
}

function convertRules(data) {
  return Object.keys(data).map(from => ({
    from: new RegExp(from),
    to: data[from]
  }));
}

export default (rewriteTable, options) => {
  options = options || {
    debug: false
  };
  const rules = convertRules(rewriteTable);
  return (req, res, next) => {
    if (rules.length === 0 || !rules.some(dispatcher(req, res, next, options))) {
      next();
    }
  };
};
