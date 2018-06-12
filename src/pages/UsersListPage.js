import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers, fetchCurrentUser } from '../actions';
import asyncConnect from '../helpers/asyncConnect';

function mapStateToProps(state) {
  return { users: state.users };
}

@asyncConnect(dispatch => Promise.all([
  dispatch(fetchUsers()),
  dispatch(fetchCurrentUser(2))
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

  // componentDidMount() {
  //   // console.log('--this.props:', this.props);
  //   this.props.dispatch(fetchUsers());
  //   // 浏览器端获取数据
  //   // this.props.fetchUsers();
  // }

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
      <div>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}
