/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'dace';
import { fetchPosts } from './action';
import reducer from './reducer';

@connect(state => state)
export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })),
    dispatch: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    posts: []
  }

  static getInitialProps = (ctx) => {
    // 服务器端渲染时，ctx 是服务器端的上下文
    // injectReducer 只改变了服务器端的 store
    // 所以还需要在 componentDidMount 中执行一次 injectReducer
    // 防止浏览器中找不到对应的 reducer
    ctx.store.injectReducer(reducer);
    return ctx.store.dispatch(fetchPosts(1));
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    this.props.store.injectReducer(reducer);
  }

  next() {
    const { page } = this.state;
    const nextPage = page + 1;
    this.props.dispatch(fetchPosts(nextPage));
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
        <ol start={(this.state.page * 10) + 1}>
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
