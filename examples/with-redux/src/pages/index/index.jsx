import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Head } from 'dace';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchUsers } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

@getInitialProps({
  reducer,
  promise: ({ store }) => store.dispatch(fetchUsers())
})
@connect(state => state)
export default class Users extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = {
    users: []
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Home</title>
        </Head>
        <ol>
          {
            this.props.users.map(user => <li key={user.id}>{user.name}</li>)
          }
        </ol>
      </Layout>
    );
  }
}
