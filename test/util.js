const path = require('path');
const psTree = require('ps-tree');
const shell = require('shelljs');

shell.config.silent = !process.env.DEBUG;

const kill = (pid, signal = 'SIGKILL', callback) => {
  psTree(pid, (err, children) => {
    let arr = [pid].concat(children.map(p => p.PID));
    arr = arr.filter((item, poss) => arr.indexOf(item) === poss);
    arr.forEach((tpid) => {
      try {
        process.kill(tpid, signal);
      } catch (ex) {
        const logger = console;
        logger.log('Could not kill process', tpid, ex);
      }
    });
    if (callback) {
      callback();
    }
  });
};

const setup = (name) => {
  const dist = path.resolve(__dirname, '../dist');
  const workspace = path.resolve(__dirname, 'workspace');
  const examples = path.resolve(__dirname, '../examples');

  if (!shell.test('-d', workspace)) {
    shell.mkdir(workspace);
    shell.cd(workspace);
  } else {
    shell.cd(workspace);
    shell.exec('rm -rf `ls -a|egrep -v node_modules`', { silent: true });
  }
  shell.cp('-R', `${examples}/${name}/*`, workspace);
  // 如果有隐藏文件(.babelrc/.eslintrc等)，需要拷贝隐藏文件
  if (shell.ls(`${examples}/${name}/.*`).length > 0) {
    shell.cp(`${examples}/${name}/.*`, workspace);
  }
  shell.exec('npm i --no-package-lock --registry https://registry.npm.taobao.org');
  shell.cp('-R', dist, `${workspace}/node_modules/dace`);
};

const test = run => (done) => {
  run.then((results) => {
    if (process.env.DEBUG) {
      console.log('--results:', results);
    }
    if (results.length === 0) {
      const message = '返回的测试结果为空，可能是3000端口号被占用导致启动失败。请使用 `ps -ef|grep node` 查看详情'
        .split('。')
        .map(text => `    ${text}`)
        .join('\n');
      console.log(message);
    }
    results.forEach(result => result.should.be.true());
    done();
  }).catch(e => console.log(e));
};

const getContext = url => shell.exec(`curl -sb -o "" ${url}`, { silent: true });
const getStatusCode = url => shell.exec(`curl -I -m 10 -o /dev/null -s -w %{http_code} ${url}`, { silent: true });

// Loops through processes and kills them
module.exports = { kill, getContext, getStatusCode, setup, test };
