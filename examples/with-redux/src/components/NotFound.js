const React = require('react');
const PropTypes = require('prop-types');

/**
 * 路由无匹配结果时提示找不到页面的组件
 *
 * @param {object} [staticContext={}]
 * @return {component}
 */
const NotFound = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>通过创建 `components/NotFound.js` 来自定义 404 页面</h1>;
};

NotFound.propTypes = {
  staticContext: PropTypes.object
};

NotFound.defaultProps = {
  staticContext: {}
};

module.exports = NotFound;
