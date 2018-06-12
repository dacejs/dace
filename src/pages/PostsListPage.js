import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import asyncConnect from '../helpers/asyncConnect';

function mapStateToProps({ posts }) {
  return { posts };
}

@asyncConnect(dispatch => dispatch(fetchPosts()))
@connect(mapStateToProps, { fetchPosts })
export default class PostsListPage extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }))
  };

  static defaultProps = {
    posts: []
  };

  renderPosts() {
    const { posts } = this.props;
    return posts.map(post => <li key={post.id}>{post.title}</li>);
  }

  render() {
    return (
      <div>
        <h3>Protected list of posts</h3>
        <ul>{this.renderPosts()}</ul>
      </div>
    );
  }
}
