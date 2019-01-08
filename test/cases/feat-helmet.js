const shell = require('shelljs');
const { fetch, kill, setup, test, exampleName } = require('../util');

describe(exampleName, function () {
  const results = [];
  let child;

  before(async function () {
    await setup();

    await new Promise((resolve) => {
      child = shell.exec('./node_modules/.bin/dace start', () => {
        resolve(results);
      });
      child.stdout.on('data', (data) => {
        if (data.includes('Server-side HMR Enabled!')) {
          results.push(fetch('localhost:3000').includes('<title data-react-helmet="true">Home</title>'));
          // 必须把 dace 进程杀掉才能执行后续的程序
          kill(child.pid);
        }
      });
    });
  });

  it('服务器端渲染应该输出 <title>', test(results));
});
