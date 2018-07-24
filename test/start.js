const path = require('path');
const shell = require('shelljs');
const { getContext, getStatusCode, kill } = require('./util');

shell.config.silent = true;

describe('Dace start', () => {
  describe('basic example', () => {
    before(() => {
      // process.chdir(path.resolve('examples'));
      shell.cd(path.resolve('examples'));
    });

    it('should start a dev server', () => {
      const testResult = [];
      const run = new Promise((resolve) => {
        const child = shell.exec('./node_modules/.bin/dace start', () => {
          resolve(testResult);
        });
        child.stdout.on('data', (data) => {
          if (data.includes('Server-side HMR Enabled!')) {
            shell.exec('sleep 5');
            const js = getContext('localhost:3001/static/js/bundle.js');
            const logo = getContext('localhost:3001/static/media/logo.7ecabd8b.svg');
            const htmlStatusCode = getStatusCode('localhost:3000');
            const html = getContext('localhost:3000');
            testResult.push(js.stdout.includes('React'));
            testResult.push(logo.stdout.includes('xml'));
            testResult.push(htmlStatusCode.stdout === '200');
            testResult.push(html.stdout.includes('Hello world'));
            kill(child.pid);
          }
        });
      });
      return run.then((test) => {
        test.forEach(result => result.should.be.true());
      });
    });
  });
});
