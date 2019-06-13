import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { serverInstance as axios } from 'dace/dist/runtime/axiosInstance';
import { Head } from 'dace';

export default class Index extends Component {
  static propTypes = {
    name: PropTypes.string
  };

  static defaultProps = {
    name: ''
  }

  static async getInitialProps(ctx) {
    let res = {};
    try {
      res = await axios(ctx).get('/api/name');
    } catch (e) {
      console.error(e);
    }
    return res.data;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <h1>Home</h1>
        <h2>{name}</h2>
      </div>
    );
  }
}
