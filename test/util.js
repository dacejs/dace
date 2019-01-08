const path = require('path');
const psTree = require('ps-tree');
const shell = require('shelljs');

shell.config.silent = !process.env.DEBUG;

/**
 * 获取测试文件名称
 * @return {string} 测试文件名称
 */
const exampleName = path.basename(module.parent.id, '.js');

/**
 * 杀掉进程
 * @param {number} pid 进程编号
 * @param {string} [signal='SIGKILL']
 * @param {function} [callback] 回调函数
 */
const kill = (pid, signal = 'SIGKILL', callback) => {
  psTree(pid, (err, children) => {
    let arr = [pid].concat(children.map(p => p.PID));
    arr = arr.filter((item, poss) => arr.indexOf(item) === poss);
    arr.forEach((tpid) => {
      try {
        process.kill(tpid, signal);
      } catch (ex) {
        console.log('Could not kill process', tpid, ex);
      }
    });
    if (callback) {
      callback();
    }
  });
};

/**
 * 初始化测试工程
 */
const setup = () => {
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
  shell.cp('-R', `${examples}/${exampleName}/*`, workspace);
  // 如果有隐藏文件(.babelrc/.eslintrc等)，需要拷贝隐藏文件
  if (shell.ls(`${examples}/${exampleName}/.*`).length > 0) {
    shell.cp(`${examples}/${exampleName}/.*`, workspace);
  }
  shell.exec('npm i --no-package-lock --registry https://registry.npm.taobao.org');
  shell.cp('-R', dist, `${workspace}/node_modules/dace`);
};

/**
 * 验证测试结果
 * @param {array} results 需要校验的结果，全部为 `true` 时通过
 * @return {function}
 */
const test = results => () => {
  if (process.env.DEBUG) {
    console.log('[results]:', results);
  }
  if (results.length === 0) {
    console.log(`    返回的测试结果为空，可能是3000端口号被占用导致启动失败
    请使用 \`ps -ef|grep node\` 查看详情`);
  }
  results.forEach(result => result.should.be.true());
};

/**
 * 获取 url 内容
 * @param {string} url
 * @return {string}
 */
const fetch = url => shell.exec(`curl -sb -o "" ${url}`, { silent: true }).stdout;

module.exports = { kill, fetch, setup, test, exampleName };
