import React from 'react';
import PropTypes from 'prop-types';

/**
 * 路由无匹配结果时提示找不到页面的组件
 *
 * @param {object} location
 * @return {component}
 */
const NotFound = ({ location }) => (
  <h1>Ooops, No match for <code>{location.pathname}</code></h1>
);

NotFound.propTypes = {
  location: PropTypes.object.isRequired
};

export default NotFound;
