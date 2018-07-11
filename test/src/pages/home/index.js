import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../layouts/default';

const Home = () => (
  <Layout>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h3>Welcome</h3>
    <p>Check out these awesome features</p>
  </Layout>
);

export default Home;
