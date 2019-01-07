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
        const html2 = getContext('localhost:3000/posts');
        const reactTestResult = js.stdout.includes('React');
        testResult.push(reactTestResult);
        if (!reactTestResult) {
          console.log('js test failed.');
        }
        const nameTextResult = html.stdout.includes('<li>张三</li>');
        testResult.push(nameTextResult);
        testResult.push(html2.stdout.includes('<li>标题1</li>'));
        if (!nameTextResult) {
          console.log('name test failed.');
        }
        kill(child.pid);
      }
    });
  });
  it('应该能正常拿到store中的数据', test(run));
});
