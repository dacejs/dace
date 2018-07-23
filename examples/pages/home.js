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
    console.log('---getInitialProps.ctx:', ctx);
    return { name: 'Joe' };
    // axios.get('aaa')
  }

  render() {
    console.log('==home props:', this.props);
    return (
      <Layout>
        <h1>Hello world!</h1>
        <h2>{this.props.name}</h2>
      </Layout>
    );
  }
}
