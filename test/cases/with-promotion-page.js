
const path = require('path');
const shell = require('shelljs');
const express = require('express');
const { setup, exampleName } = require('../util');

setup(exampleName);

shell.exec('NODE_ENV=local ./node_modules/.bin/dace build');

express()
  .use(express.static(path.resolve(__dirname, '../../examples/with-promotion-page')))
  .use(express.static(path.resolve(__dirname, '../workspace/prd')))
  .get('/mis/\\w+/', (req, res) => {
    res.end(`<!DOCTYPE html>
      <html>
      <head>
        <title>Promotion page</title>
        <style>
          #root {
            border: 2px;
          }
        </style>
      </head>

      <body>
        <h1>Promotion page</h1>
        <p>==================</p>
        <div id="root"></div>
        <script src="/js/bundle.js"></script>
      </body>
      </html>
    `);
  })
  .listen(4000, () => console.log('listening at http://localhost:4000/'));
