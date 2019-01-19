import { Component } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { parse } from 'qs';

/**
 * 网站入口组件
 * 服务器端和浏览器端渲染都会调用
 */
export default class App extends Component {
  static propTypes = {
    routes: PropTypes.any,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    initialProps: PropTypes.any
  }

  static defaultProps = {
    initialProps: {},
    routes: []
  }

  constructor(props) {
    super(props);
    this.state = {
      initialProps: props.initialProps
    };
  }

  async componentWillReceiveProps(nextProps/* , nextState */) {
    const navigated = nextProps.location.pathname !== this.props.location.pathname;
    if (navigated) {
      // 浏览器端路由（首次渲染后）时解析 querystring -> object
      const query = parse(nextProps.location.search, { ignoreQueryPrefix: true });
      nextProps.location.query = query;

      const promises = matchRoutes(this.props.routes, nextProps.location.pathname)
        .map(({ route, match }) => {
          const { component } = route;
          if (component && component.getInitialProps) {
            const ctx = { match, query };
            const { getInitialProps } = component;
            return getInitialProps ? getInitialProps(ctx) : null;
          }
          return null;
        })
        .filter(Boolean);

      try {
        let initialProps = {};
        (await Promise.all(promises)).forEach((item) => {
          initialProps = { ...initialProps, ...item };
        });
        this.setState({ initialProps });
      } catch (e) {
        console.log('getInitialProps error: ', e);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (process.env.DACE_SCROLL_TO_TOP === 'true' &&
      this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { initialProps } = this.state;
    const { route, location } = this.props;
    // 让 children 能通过 props.location.query 能取到 query string
    // App 组件首次渲染时执行
    location.query = parse(location.search, { ignoreQueryPrefix: true });
    return renderRoutes(route.routes, initialProps);
  }
}
