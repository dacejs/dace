/**
 * 自定义服务器端渲染模版
 * 可以通过该模版改写首屏的 DOM 结构
 * @param {object} options 传入参数
 * @param {object} options.head helmet 对象，里面包含 title, meta, link, style, script, noscript 等
 * @param {string} options.cssTags webpack 编译输出的 css 标签字符串
 * @param {string} options.jsTags webpack 编译输出的 css 标签字符串
 * @param {string} options.markup 服务器端渲染生成的 DOM 字符串
 * @param {string} options.state 服务器端渲染生成的 state 经 JSON.stringify() 后的字符串
 * @return {string} 首屏 HTML
 */

export default ({
  helmet, cssTags, jsTags, markup, state
}) => `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  <meta charset="utf-8" />
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  ${helmet.style.toString()}
  ${helmet.script.toString()}
  ${helmet.noscript.toString()}
  ${cssTags}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${markup}</div>
  <script>
  window.INITIAL_STATE=${state};
  </script>
  ${jsTags}
</body>
</html>`;
