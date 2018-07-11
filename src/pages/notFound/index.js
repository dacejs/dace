import React from 'react';
import PropTypes from 'prop-types';

/**
 * 路由无匹配结果时提示找不到页面的组件
 *
 * @param {object} [staticContext={}]
 * @return {component}
 */
const NotFound = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Ooops, route not found.</h1>;
};

NotFound.propTypes = {
  staticContext: PropTypes.object
};

NotFound.defaultProps = {
  staticContext: {}
};

export default NotFound;
