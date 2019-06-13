import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Head } from 'dace';
import Layout from '../layouts/default';

export default class Index extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = {
    users: []
  }

  static async getInitialProps() {
    const res = await axios.get('http://jsonplaceholder.typicode.com/users');
    const res2 = await axios.get('http://jsonplaceholder.typicode.com/users/1');
    return {
      user: res2.data,
      users: res.data
    };
  }

  render() {
    const { users } = this.props;
    return (
      <Layout>
        <Head>
          <title>Users</title>
        </Head>
        <h1>Users</h1>
        <ol>
          {
            users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))
          }
        </ol>
      </Layout>
    );
  }
}
