import { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { parse } from 'qs';

/**
 * 网站入口组件
 * 服务器端和浏览器端渲染都会调用
 */
@connect(state => state)
export default class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { route, store, location: { search } } = this.props;
    // 将解析后的 querystring 对象挂载到 location 对象上
    this.props.location.query = parse(search, { ignoreQueryPrefix: true });
    return renderRoutes(route.routes, { store });
  }
}
