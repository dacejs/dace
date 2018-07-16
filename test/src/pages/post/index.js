import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { prefetch, Head } from 'dace';
import reducer from './reducer';
import { fetchPost, cleanPost } from './action';
import Layout from '../../layouts/default';

@prefetch({
  key: 'post',
  reducer,
  promise: ({ store: { dispatch }, match }) => {
    const { id } = match.params;
    return dispatch(fetchPost(id));

    // return Promise.all([
    //   dispatch(fetchPost(id))
    // ]);
  }
})
@connect(({ post = {} }) => ({ post }))
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    post: {}
  };

  componentWillUnmount() {
    // 清除当前 store ，防治下次渲染时内容露出
    this.props.dispatch(cleanPost());
  }

  render() {
    const { post: { title, body } } = this.props;

    return (
      <Layout>
        <Head>
          <title>Posts</title>
        </Head>
        <h3>{title}</h3>
        <p>{body}</p>
      </Layout>
    );
  }
}
