/**
 * 自定义服务器端渲染模版
 * 可以通过该模版改写首屏的 DOM 结构
 * @param {object} options 传入参数
 * @param {object} options.head helmet 实例，里面包含 title, meta, link, style, script, noscript 等
 * @param {string} options.cssTags webpack 编译输出的 css 标签字符串
 * @param {string} options.jsTags webpack 编译输出的 css 标签字符串
 * @param {string} options.markup 服务器端渲染生成的 DOM 字符串
 * @param {string} options.state 服务器端渲染生成的 state 经 JSON.stringify() 后的字符串
 * @param {string} options.loadableState loadable-component 输出的 state 字符串
 * @return {string} 首屏 HTML
 */

export default ({
  head, cssTags, jsTags, markup, state, loadableState
}) => `<!doctype html>
<html ${head.htmlAttributes.toString()}>
<head>
  <meta charset="utf-8" />
  ${head.title.toString()}
  ${head.meta.toString()}
  ${head.link.toString()}
  ${head.style.toString()}
  ${head.script.toString()}
  ${head.noscript.toString()}
  ${cssTags}
</head>
<body ${head.bodyAttributes.toString()}>
  <div id="root">${markup}</div>
  <script>window.INITIAL_STATE=${state};</script>
  ${loadableState}
  ${jsTags}
</body>
</html>`;
