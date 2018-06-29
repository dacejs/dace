import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { prefetch } from 'unjs';
import { fetchPosts } from './action';
import reducer from './reducer';
import DefaultLayout from '../../layouts/default';

function mapStateToProps({ posts = [] }) {
  return { posts };
}

@prefetch({
  key: 'posts',
  reducer,
  defer: true,
  promise: ({ store: { dispatch } }) => dispatch(fetchPosts())
})
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
    return posts.map(post => (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    ));
  }

  render() {
    return (
      <DefaultLayout>
        <Helmet>
          <title>Posts</title>
        </Helmet>
        <h3>List of Posts (Rendering by browser)</h3>
        <ul>{this.renderPosts()}</ul>
      </DefaultLayout>
    );
  }
}
