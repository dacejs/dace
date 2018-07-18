/**
 * 返回浏览器控制台输出格式化日志函数
 * @return {object}
 */

const css = {
  prefix: 'color: #999; padding: 0 0 0 20px; line-height: 16px; background: url(https://webpack.js.org/assets/favicon.ico) no-repeat; background-size: 16px 16px; background-position: 0 -2px;',
  reset: 'color: #444'
};

export default ['warn', 'info', 'error'].reduce((total, item) => {
  total[item] = (message) => {
    console[item]('%c｢dace｣%c', css.prefix, css.reset, message);
  };
  return total;
}, {});
