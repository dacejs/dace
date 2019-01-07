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
        testResult.push(!html.stdout.includes('<title data-react-helmet="true">Home</title>'));
        testResult.push(html.stdout.includes('<div id="root"></div>'));
        kill(child.pid);
      }
    });
  });
  it('关闭SSR后不输出<title>', test(run));
});
