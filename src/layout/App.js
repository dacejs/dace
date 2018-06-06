import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const App = ({ route }) => (
  <div>
    <Header />
    {renderRoutes(route.routes)}
  </div>
);

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default {
  component: App
};
