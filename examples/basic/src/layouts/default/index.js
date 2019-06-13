import React from 'react';
import PropTypes from 'prop-types';
import { Head } from 'dace';
import Header from '../../components/Header';

const DefaultLayout = props => (
  <div>
    <Head>
      <link rel="icon" type="image/png" href="//m.xxxxx.com/zhuanti/dace-logo-200.png" />
    </Head>
    <Header />
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
