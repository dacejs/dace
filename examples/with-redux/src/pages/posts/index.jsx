/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Head } from 'dace';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchPosts } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

@getInitialProps({
  reducer,
  promise: ({ store, query }) => {
    const { page = 1 } = query;
    return store.dispatch(fetchPosts(page));
  }
})
@connect(state => state)
export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })),
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired
  };

  static defaultProps = {
    posts: []
  }

  constructor(props) {
    super(props);
    let { page = 1 } = props.location.query;
    page = parseInt(page, 10);
    this.state = { page };
  }

  async next() {
    const { history, dispatch } = this.props;
    const { page } = this.state;
    const nextPage = page + 1;
    history.push(`/posts?page=${nextPage}`);
    await dispatch(fetchPosts(nextPage));
    this.setState({ page: nextPage });
  }

  render() {
    const { page } = this.state;
    const { posts } = this.props;
    return (
      <Layout>
        <Head>
          <title>Posts</title>
        </Head>
        <ol start={((page - 1) * 10) + 1}>
          {
            posts.map(post => <li key={post.id}>{post.title}</li>)
          }
        </ol>
        <div>
          <button type="button" onClick={this.next.bind(this)}>下一页</button>
        </div>
      </Layout>
    );
  }
}
