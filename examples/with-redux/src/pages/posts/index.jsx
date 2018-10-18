/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'dace';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchPosts } from './action';
import reducer from './reducer';

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
    history: PropTypes.any.isRequired
  };

  static defaultProps = {
    posts: []
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  async next() {
    const { page } = this.state;
    const nextPage = page + 1;
    this.props.history.push(`/posts?page=${nextPage}`);
    await this.props.dispatch(fetchPosts(nextPage));
    this.setState({ page: nextPage });
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
        <ol start={((this.state.page - 1) * 10) + 1}>
          {
            this.props.posts.map(post => <li key={post.id}>{post.title}</li>)
          }
        </ol>
        <div>
          <button onClick={this.next.bind(this)}>下一页</button>
        </div>
      </div>
    );
  }
}
