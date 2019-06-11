const shell = require('shelljs');
const { fetch, kill, setup, test, exampleName } = require('../util');

describe.skip(exampleName, function () {
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
          results.push(fetch('localhost:3000').includes(exampleName));
          // 必须把 dace 进程杀掉才能执行后续的程序
          kill(child.pid);
        }
      });
    });
  });

  it('使用 .babelrc 后服务应该正常启动', test(results));
});
