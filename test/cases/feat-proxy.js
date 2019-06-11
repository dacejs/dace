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
          fetch('localhost:3000');
          // 第二次请求才有数据返回
          results.push(fetch('localhost:3000').includes(exampleName));
          // 必须把 dace 进程杀掉才能执行后续的程序
          kill(child.pid);
        }
      });
    });
  });

  it('模拟数据返回正常', test(results));
});
