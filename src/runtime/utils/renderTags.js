/**
 * 根据 webpack-stats.json 显示 script 和 link 标签
 * @param {array} branch
 * @return {string}
 */
export default (branch, extension) => {
  // 确保先做 client build，再做 server build
  if (!process.env.DACE_PATH_STATS_JSON) {
    throw new Error('Not found `DACE_PATH_STATS_JSON` in `process.env`');
  }
  // 获取初始化网页需要插入的 CSS/JS 静态文件
  const { publicPath, chunks } = require(process.env.DACE_PATH_STATS_JSON);
  let files = [];
  // 输出入口文件
  const [root] = chunks.filter(chunk => chunk.initial && chunk.entry);
  files = files.concat(root.files);

  // 输出公共文件
  const vendors = chunks.filter(chunk => chunk.reason && chunk.reason.startsWith('split chunk (cache group:'));
  vendors.forEach((vendor) => {
    files = files.concat(vendor.files);
  });

  // 根据当前路由反查对应的页面组件
  let currentPage;
  branch.forEach(({ route }) => {
    if (route.path) {
      const { component: { componentId } } = route;
      currentPage = componentId.replace(`${process.env.DACE_PATH_PAGES}/`, '');
    }
  });

  if (currentPage) {
    const [page] = chunks.filter(chunk => !chunk.initial && chunk.names[0] === currentPage);
    // 只包含一个页面时不会拆分打包，所有文件会打到 main.js 里
    if (page && page.files) {
      // 只需在 HTML 中插入 css ，js 会通过异步加载，此处无需显式插入
      files = files.concat(page.files.filter(file => file.endsWith('.css')));
    }
  }

  const crossOrigin = process.env.DACE_SCRIPT_CROSSORIGIN === 'true' ?
    ' crossorigin="anonymous"' : '';

  const getTagByFilename = filename => (filename.endsWith('js') ?
    `<script src="${publicPath + filename}"${crossOrigin}></script>` :
    `<link rel="stylesheet" href="${publicPath + filename}" />`);

  return files
    .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
    .filter(item => item.endsWith(extension))
    .map(item => getTagByFilename(item))
    .join('');
};
