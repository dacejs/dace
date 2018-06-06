import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers } from '../actions';

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  return store.dispatch(fetchUsers());
}

@connect(mapStateToProps, { fetchUsers })
class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
      </Helmet>
    );
  }

  renderUsers() {
    return this.props.users.map(user => <li key={user.id}>{user.name}</li>);
  }

  render() {
    return (
      <div>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

export default {
  loadData,
  component: UsersList
};
