import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => (
  <div className="center-align" style={{ marginTop: '200px' }}>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h3>Welcome</h3>
    <p>Check out these awesome features</p>
  </div>
);

export default Home;
