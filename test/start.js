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
      shell.cd(example);
      // 如果例子工程没有安装依赖包，程序自动执行安装
      if (!fs.existsSync(path.resolve(example, 'node_modules/dace'))) {
        shell.exec('npm i --no-package-lock --registry https://registry.npm.taobao.org');
      }
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
            const reactTestResult = js.stdout.includes('React');
            testResult.push(reactTestResult);
            if (!reactTestResult) {
              console.log('js test failed.');
            }
            const nameTextResult = html.stdout.includes(exampleName);
            testResult.push(nameTextResult);
            if (!nameTextResult) {
              console.log('name test failed.');
            }
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
