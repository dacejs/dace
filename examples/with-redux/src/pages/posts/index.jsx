import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'dace';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchPosts } from './action';
import reducer from './reducer';

@getInitialProps({
  reducer,
  promise: ({ store: { dispatch } }) => dispatch(fetchPosts())
})
@connect(state => state)
export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }))
  };

  static defaultProps = {
    posts: []
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
            this.props.posts.map(post => <li key={post.id}>{post.title}</li>)
          }
        </ol>
      </div>
    );
  }
}
