const css = {
  prefix: 'color: #999; padding: 0 0 0 20px; line-height: 16px; background: url(https://webpack.js.org/6bc5d8cf78d442a984e70195db059b69.svg) no-repeat; background-size: 16px 16px; background-position: 0 -2px;',
  reset: 'color: #444'
};

export default ['warn', 'info', 'error'].reduce((total, item) => {
  total[item] = (message) => {
    console[item]('%c｢unjs｣%c', css.prefix, css.reset, message);
  };
  return total;
}, {});