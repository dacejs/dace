import React from 'react';
import { Helmet } from 'react-helmet';
import DefaultLayout from '../../layouts/default';

const Home = () => (
  <DefaultLayout>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h3>Welcome</h3>
    <p>Check out these awesome features</p>
  </DefaultLayout>
);

export default Home;
