const shell = require('shelljs');
const { fetch, kill, setup, test, exampleName } = require('../util');

describe(exampleName, function () {
  const results = [];
  let child;

  before(async function () {
    await setup();

    await new Promise((resolve) => {
      child = shell.exec('NODE_ENV=beta ./node_modules/.bin/dace start', () => {
        resolve(results);
      });
      child.stdout.on('data', (data) => {
        if (data.includes('Server-side HMR Enabled!')) {
          results.push(fetch('localhost:3000').includes('//mobileqzz.beta.qunar.com/with-dotenv/prd/'));
          // 必须把 dace 进程杀掉才能执行后续的程序
          kill(child.pid);
        }
      });
    });
  });

  it('应该取到对应环境下的环境变量', test(results));
});
