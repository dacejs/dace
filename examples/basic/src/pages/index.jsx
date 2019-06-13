import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Head } from 'dace';
import Layout from '../layouts/default';

export default class Home extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: ''
  }

  static getInitialProps() {
    // console.log(ctx);
    return { name: 'Joe' };
  }

  render() {
    const { name } = this.props;
    return (
      <Layout>
        <Head>
          <title>Home</title>
        </Head>
        <h1>basic example</h1>
        <h2>{name}</h2>
      </Layout>
    );
  }
}
