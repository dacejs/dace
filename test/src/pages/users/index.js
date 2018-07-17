import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { prefetch, Head } from 'dace';
import { fetchUsers } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

const defaultProps = {
  users: []
};

function mapStateToProps(state) {
  return { users: state.users.data };
}

@prefetch({
  reducer,
  promise: ({ store: { dispatch } }) => Promise.all([
    dispatch(fetchUsers())
  ])
})
@connect(mapStateToProps)
export default class Users extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = defaultProps;

  head() {
    const { users } = this.props;
    return (
      <Head>
        <title>{`${users.length} Users Loaded`}</title>
      </Head>
    );
  }

  renderUsers() {
    const { users } = this.props;
    return users.map(user => <li key={user.id}>{user.name}</li>);
  }

  render() {
    return (
      <Layout>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
      </Layout>
    );
  }
}
