import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (key, reducer, loadData) => Target => class extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props, Target);
  }

  componentDidMount() {
    // 在浏览器端执行
    // 动态添加reducer
    const { store } = this.props;
    store.injectReducer(key, reducer);
    // 浏览器端获取数据
    loadData(store.dispatch);
  }

  static getInitialProps(store) {
    // 在服务器端执行
    // 动态添加reducer
    store.injectReducer(key, reducer);
    return loadData(store.dispatch);
  }

  render() {
    return <Target {...this.props} />;
  }
};
