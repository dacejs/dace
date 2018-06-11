import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers } from '../actions';

function mapStateToProps(state) {
  return { users: state.users };
}

@connect(mapStateToProps, { fetchUsers })
export default class UsersList extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func,
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = {
    fetchUsers: () => {},
    users: []
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  static getInitialProps(store) {
    return store.dispatch(fetchUsers());
  }

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
