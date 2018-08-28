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
        const html = getContext('localhost:3000');
        const nameTextResult = html.stdout.includes('<h1>10</h1>');
        testResult.push(nameTextResult);
        if (!nameTextResult) {
          console.log('name test failed.');
        }
        kill(child.pid);
      }
    });
  });
  it('使用 .babelrc 后服务应该正常启动', test(run));
});
