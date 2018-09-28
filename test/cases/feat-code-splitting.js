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
        const js = getContext('localhost:3001/js/styles.chunk.js');
        const html = getContext('localhost:3000');
        const reactTestResult = js.stdout.includes('style.css');
        testResult.push(reactTestResult);
        if (!reactTestResult) {
          console.log('js test failed.');
        }
        const nameTextResult = html.stdout.includes(exampleName);
        testResult.push(nameTextResult);
        if (!nameTextResult) {
          console.log('name test failed.');
        }
        // 检测是否包含 LOADABLE_STATE
        testResult.push(/{"id":"[^"]+"}/.test(html.stdout));
        kill(child.pid);
      }
    });
  });
  it('网页服务器和静态文件服务器都应该都正常启动', test(run));
});
