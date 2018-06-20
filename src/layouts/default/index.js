import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

const DefaultLayout = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default DefaultLayout;
