import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Home extends Component {
  static propTypes = {
    users: PropTypes.array,
    post: PropTypes.object
  }

  static defaultProps = {
    users: [],
    post: {}
  }

  static async getInitialProps() {
    const users = await axios.get('/api/users', { baseURL: process.env.DACE_API_BASE_URL });
    const post = await axios.get(`/api/post?id=${Date.now()}`, { baseURL: process.env.DACE_API_BASE_URL });
    return {
      users: users.data,
      post: post.data
    };
  }

  render() {
    return (
      <div>
        <h1>mock-data example</h1>
        <h2>Users</h2>
        <ul>
          {
            this.props.users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))
          }
        </ul>
        <h2>Post: #{this.props.post.id}</h2>
      </div>
    );
  }
}
