import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers/* , fetchCurrentUser */ } from './action';
import prefetch from '../../decorators/prefetch';
import DefaultLayout from '../../layouts/default';

function mapStateToProps(state) {
  return { users: state.users };
}

@prefetch(dispatch => Promise.all([
  dispatch(fetchUsers()) // ,
  // dispatch(fetchCurrentUser(2))
]))
@connect(mapStateToProps, { fetchUsers })
export default class UsersList extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = {
    users: []
  };

  head() {
    const { users } = this.props;
    return (
      <Helmet>
        <title>{`${users.length} Users Loaded`}</title>
      </Helmet>
    );
  }

  renderUsers() {
    const { users } = this.props;
    return users.map(user => <li key={user.id}>{user.name}</li>);
  }

  render() {
    return (
      <DefaultLayout>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
      </DefaultLayout>
    );
  }
}
