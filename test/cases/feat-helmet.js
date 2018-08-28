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
        const nameTextResult = html.stdout.includes('<title data-react-helmet="true">Home</title>');
        testResult.push(nameTextResult);
        kill(child.pid);
      }
    });
  });
  it('服务器端渲染应该输出<title>', test(run));
});
