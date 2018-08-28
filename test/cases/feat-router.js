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
        ['/', '/a', '/b', '/c'].forEach((endpoint) => {
          const html = getContext(`localhost:3000${endpoint}`);
          const nameTextResult = html.stdout.includes(`<h2>${endpoint}</h2>`);
          testResult.push(nameTextResult);
        });
        kill(child.pid);
      }
    });
  });
  it('各种路由应该都正常', test(run));
});
