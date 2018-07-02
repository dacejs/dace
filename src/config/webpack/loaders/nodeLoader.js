/**
 * 加载 node 代码并把执行后的结果返回的 webpack loader
 * 因为需要获取到 this，所以该文件只能使用 function 形式函数来定义，不能使用尖头函数定义
 */
module.exports = function nodeLoader(source) {
  // console.log('--source:', source);
  const result = eval(source)(this); // eslint-disable-line
  return `module.exports = ${result}`;
};
