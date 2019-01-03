import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

const DefaultLayout = props => (
  <div>
    <Header />
    <h1>with-redux example</h1>
    {props.children}
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};

export default DefaultLayout;
