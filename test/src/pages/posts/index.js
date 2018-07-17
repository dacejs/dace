import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { prefetch, Head } from 'dace';
import { fetchPosts } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';
import Loading from '../../components/Loading';

const defaultProps = {
  posts: []
};

function mapStateToProps(state) {
  return { posts: state.posts.data };
}

@prefetch({
  reducer,
  defer: true,
  loading: Loading,
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

  static defaultProps = defaultProps;

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
      <Layout>
        <Head>
          <title>Posts</title>
        </Head>
        <h3>List of Posts (Rendering by browser)</h3>
        <ul>{this.renderPosts()}</ul>
      </Layout>
    );
  }
}
