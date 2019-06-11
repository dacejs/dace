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
          results.push(fetch('localhost:3000/a/1').includes('<h2>id=<!-- -->1</h2>'));
          results.push(fetch('localhost:3000/b/2/c').includes('<h2>id=<!-- -->2</h2>'));
          // 必须把 dace 进程杀掉才能执行后续的程序
          kill(child.pid);
        }
      });
    });
  });

  it('localhost:3000/1 应该正常显示', test(results));
});
