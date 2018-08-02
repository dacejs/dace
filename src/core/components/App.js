const { renderRoutes } = require('react-router-config');
const PropTypes = require('prop-types');
const { parse } = require('qs');

/**
 * 网站入口组件
 * 服务器端和浏览器端渲染都会调用
 */
const App = (props) => {
  const { route, location: { search }, initialProps } = props;
  // 将解析后的 querystring 对象挂载到 location 对象上
  props.location.query = parse(search, { ignoreQueryPrefix: true });
  return renderRoutes(route.routes, initialProps);
};

App.propTypes = {
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  initialProps: PropTypes.any
};

App.defaultProps = {
  initialProps: {}
};

module.exports = App;
