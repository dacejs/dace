const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const glob = require('glob');
const { getContext, kill } = require('./util');

shell.config.silent = true;

describe('Dace start', async () => {
  const cwd = process.cwd();
  const examples = path.resolve(cwd, 'examples');
  glob.sync('*', { cwd: examples }).forEach((exampleName) => {
    it(exampleName, () => {
      const example = path.resolve(examples, exampleName);
      if (!fs.existsSync(path.resolve(example, 'node_modules/dace'))) {
        throw new Error(`没有找到依赖包，请在 ${exampleName} 目录运行 \`npm i\``);
      }
      shell.exec('sleep 1');
      shell.cd(example);
      const testResult = [];
      const run = new Promise((resolve) => {
        const child = shell.exec('./node_modules/.bin/dace start', () => {
          resolve(testResult);
        });
        child.stdout.on('data', (data) => {
          if (data.includes('Server-side HMR Enabled!')) {
            shell.exec('sleep 5');
            const js = getContext('localhost:3001/static/js/bundle.js');
            const html = getContext('localhost:3000');
            testResult.push(js.stdout.includes('React'));
            testResult.push(html.stdout.includes(exampleName));
            kill(child.pid);
          }
        });
      });
      return run.then((test) => {
        test.forEach(result => result.should.be.true());
      });
    });
  });
});
