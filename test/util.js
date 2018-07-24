const psTree = require('ps-tree');
const shell = require('shelljs');

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

const getContext = url => shell.exec(`curl -sb -o "" ${url}`);
const getStatusCode = url => shell.exec(`curl -I -m 10 -o /dev/null -s -w %{http_code} ${url}`);

// Loops through processes and kills them
module.exports = { kill, getContext, getStatusCode };
