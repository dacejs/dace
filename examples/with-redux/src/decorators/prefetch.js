/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

/**
 * 页面组件渲染前获取数据的装饰器
 * 装饰器会将数据获取的请求代码分别注入到组件的
 * 静态方法 `getInitialProps()` 和生命周期方法 `componentDidMount()`
 * 以简化开发编码
 *
 * @param {object} options
 * @param {string} options.key
 * @param {function} options.reducer
 * @param {function|[function]} options.promise
 * @param {component} options.loading
 */
export default options => Target => class extends Component {
  // static propTypes = {
  //   store: PropTypes.object.isRequired,
  //   match: PropTypes.object.isRequired
  // };

  constructor(props) {
    super(props, Target);
  }

  async componentDidMount() {
    // 该方法在页面浏览器端渲染时会调用
    // 在浏览器端动态添加reducer
    if (!Array.isArray(options)) {
      options = [options];
    }

    const { store, match, location: { query } } = this.props;
    const promises = options.map((item) => {
      const { reducer, promise } = item;
      store.injectReducer(reducer);
      return promise({ store, match, query });
    });
    await Promise.all(promises);
  }

  /**
   * 服务器端渲染时会先调用该方法获取数据
   * 数据回来后通过 redux 更新 store
   *
   * @param {object} options
   * @param {function} options.reducer 需要动态绑定的 reducer
   * @param {function|[function]} options.promise 获取数据的 fetch 函数
   * @param {string} [options.key] 数据绑定到 store 用的 key 值，默认为当前页面 URL
   * @param {function} [options.defer=false] 是否延迟加载。只在浏览器端渲染时加载，服务
   * 器端渲染时不加载，以达到加载页面显示的目的。`defer=true` 的请求只会在浏览器中以 ajax
   * 的形式发起
   *
   * @return {Promise}
   */
  static getInitialProps(ctx) {
    // 该方法在页面服务器端渲染时会调用
    // 在服务器端动态添加 reducer
    if (!Array.isArray(options)) {
      options = [options];
    }
    const promises = options.filter(item => !item.defer).map((item) => {
      const { reducer, promise } = item;
      ctx.store.injectReducer(reducer);
      return promise(ctx);
    });
    return Promise.all(promises);
  }

  render() {
    // 服务器端渲染时不需要显示 loading
    return <Target {...this.props} />;
  }
};
