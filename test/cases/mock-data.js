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
        // users 数据 mock 成功
        testResult.push(html.stdout.includes('<li>Joe1</li>'));
        // post 数据 mock 成功
        testResult.push(/<h2>Post: #<!-- -->\d{13}<\/h2>/.test(html.stdout));
        kill(child.pid);
      }
    });
  });
  it('数据 `users` 和 `post` 都应该模拟成功', test(run));
});
