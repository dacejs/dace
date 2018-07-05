import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'qs';
import isClient from '../utils/isClient';

export default options => Target => class extends Component {
// export default (key, reducer, loadData) => Target => class extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props, Target);
    this.state = {
      loaded: true
    };
  }

  async componentDidMount() {
    // 该方法在页面浏览器端渲染时会调用
    // 在浏览器端动态添加reducer
    const { store, match } = this.props;
    const { search } = window.location;
    const querystring = search.startsWith('?') ? search.substring(1) : search;
    const query = parse(querystring);

    if (!Array.isArray(options)) {
      options = [options];
    }
    const promises = options.map((item) => {
      const { key, reducer, promise } = item;
      store.injectReducer(key, reducer);
      return promise({ store, match, query });
    });
    await Promise.all(promises);
    this.setState({ loaded: true }); // eslint-disable-line
  }

  static getInitialProps(store, match, query) {
    // 该方法在页面服务器端渲染时会调用
    // 在服务器端动态添加reducer
    if (!Array.isArray(options)) {
      options = [options];
    }
    const promises = options.filter(item => !item.defer).map((item) => {
      const { key, reducer, promise } = item;
      store.injectReducer(key, reducer);
      return promise({ store, match, query });
    });
    return Promise.all(promises);
  }

  render() {
    if (isClient) {
      return this.state.loaded ? <Target {...this.props} /> : <div>loading</div>;
    }
    // 服务器端渲染时不需要显示 loading
    return <Target {...this.props} />;
  }
};
