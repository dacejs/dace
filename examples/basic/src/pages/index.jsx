import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/default';

export default class Home extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: ''
  }

  static getInitialProps(ctx) {
    return { name: 'Joe' };
  }

  render() {
    return (
      <Layout>
        <h1>basic example</h1>
        <h2>{this.props.name}</h2>
      </Layout>
    );
  }
}
