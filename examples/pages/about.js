import React from 'react';
import Layout from '../layouts/default';

export default (props) => {
  console.log('--props:', props);
  return (
    <Layout>
      <h1>Hello world!</h1>
    </Layout>
  );
};
