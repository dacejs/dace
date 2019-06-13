import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

const DefaultLayout = ({ children }) => (
  <div>
    <Header />
    <h1>with-redux example</h1>
    {children}
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};

export default DefaultLayout;
