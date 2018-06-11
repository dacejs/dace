import React from 'react';
import PropTypes from 'prop-types';

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Ooops, route not found.</h1>;
};

NotFoundPage.propTypes = {
  staticContext: PropTypes.object
};

NotFoundPage.defaultProps = {
  staticContext: {}
};

export default NotFoundPage;
