import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { prefetch } from 'unjs';
import reducer from './reducer';
import { fetchPost } from './action';
import DefaultLayout from '../../layouts/default';

@prefetch({
  key: 'post',
  reducer,
  promise: ({ store: { dispatch }, match/* , query */ }) => {
    // console.log('--query:', query); // Get query string
    const { id } = match.params; // Get url parameters
    return dispatch(fetchPost(id));

    // return Promise.all([
    //   dispatch(fetchPost(id))
    // ]);
  }
})
@connect(({ post = {} }) => ({ post }))
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object
  };

  static defaultProps = {
    post: {}
  };

  render() {
    const { post: { title, body } } = this.props;

    return (
      <DefaultLayout>
        <Helmet>
          <title>Posts</title>
        </Helmet>
        <h3>{title}</h3>
        <p>{body}</p>
      </DefaultLayout>
    );
  }
}
