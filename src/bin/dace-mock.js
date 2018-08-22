const url = require('url');
const path = require('path');
const fs = require('fs');
const express = require('express');
const importFresh = require('import-fresh');
const util = require('util');

const server = express();
server
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  })
  .get('*', (req, res, next) => {
    const urlObject = url.parse(req.url);
    const { pathname } = urlObject;
    const dataFile = path.join(process.cwd(), 'mock', pathname);
    const extension = ['json', 'js'].find(ext => fs.existsSync(`${dataFile}.${ext}`));
    if (extension) {
      // 确保加载到最新的数据
      let json = importFresh(`${dataFile}.${extension}`);
      if (json.default) {
        json = json.default;
      }
      if (util.isFunction(json)) {
        json = json(req, res, next);
      }
      // const json = fs.readFileSync(dataFile, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(json));
    } else {
      next();
    }
  });

const { DACE_MOCK_PORT } = process.env;
server.listen(DACE_MOCK_PORT, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`mock server is running at http://localhost:${DACE_MOCK_PORT}`);
});
