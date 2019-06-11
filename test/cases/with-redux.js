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
          fetch('localhost:3000/posts');
          results.push(fetch('localhost:3000').includes('<li>张三</li>'));
          results.push(fetch('localhost:3000/posts').includes('<li>标题1</li>'));
          // 必须把 dace 进程杀掉才能执行后续的程序
          kill(child.pid);
        }
      });
    });
  });

  it('应该能正常拿到 store 中的数据', test(results));
});
