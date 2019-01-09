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
  const registry = process.env.TRAVIS ? '' : '--registry https://registry.npm.taobao.org';

  if (!shell.test('-d', workspace)) {
    shell.mkdir(workspace);
    shell.cd(workspace);
  } else {
    shell.cd(workspace);
    // 出于性能考虑，保留 node_modules
    shell.exec('rm -rf `ls -a|egrep -v node_modules`', { silent: true });
  }
  shell.cp('-R', `${examples}/${exampleName}/*`, workspace);
  // 如果有隐藏文件(.babelrc/.eslintrc等)，需要拷贝隐藏文件
  shell.config.silent = true; // 避免无隐藏文件时拷贝出错
  shell.cp(`${examples}/${exampleName}/.*`, workspace);
  shell.config.silent = !process.env.DEBUG; // 还原 silent 设置
  shell.exec(`npm i --no-package-lock ${registry}`);
  // 将最新的 dace 代码更新到测试目录的 dace 包
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
    console.log([
      '',
      '测试结果数组为空，可能是以下原因导致：',
      ' - 3000 端口被占用',
      ' - webpack 配置文件出错',
      ''
    ].map(item => `    ${item}`).join('\n'));
    true.should.be.false();
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
