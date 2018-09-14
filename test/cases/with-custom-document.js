const path = require('path');
const shell = require('shelljs');
const { getContext, kill, setup, test } = require('../util');

const exampleName = path.basename(__filename, '.js');
describe(exampleName, async () => {
  setup(exampleName);

  const testResult = [];
  const run = new Promise((resolve) => {
    const child = shell.exec('./node_modules/.bin/dace start', () => {
      resolve(testResult);
    });
    child.stdout.on('data', (data) => {
      if (data.includes('Server-side HMR Enabled!')) {
        shell.exec('sleep 3');
        const js = getContext('localhost:3001/js/bundle.js');
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
  it('自定义文档应该正常被使用', test(run));
});
