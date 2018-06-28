import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'qs';

export default (key, reducer, loadData) => Target => class extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props, Target);
  }

  componentDidMount() {
    // 该方法在页面浏览器端渲染时会调用
    // 在浏览器端动态添加reducer
    const { store, match } = this.props;
    const { search } = window.location;
    const querystring = search.startsWith('?') ? search.substring(1) : search;
    const query = parse(querystring);
    store.injectReducer(key, reducer);
    // 浏览器端获取数据
    loadData({ store, match, query });
  }

  static getInitialProps(store, match, query) {
    // 该方法在页面服务器端渲染时会调用
    // 在服务器端动态添加reducer
    store.injectReducer(key, reducer);
    return loadData({ store, match, query });
  }

  render() {
    return <Target {...this.props} />;
  }
};
