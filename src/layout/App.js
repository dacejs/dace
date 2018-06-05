import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '../components/Header';

const App = ({ route }) => (
  <div>
    <Header />
    {renderRoutes(route.routes)}
  </div>
);

export default {
  component: App
};
