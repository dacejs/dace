import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'dace';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchUsers } from './action';
import reducer from './reducer';

@getInitialProps({
  reducer,
  promise: ({ store: { dispatch } }) => dispatch(fetchUsers())
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
      <div>
        <h1>with-redux example</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
        <ol>
          {
            this.props.users.map(user => <li key={user.id}>{user.name}</li>)
          }
        </ol>
      </div>
    );
  }
}
