const { Component } = require('react');
const { renderRoutes, matchRoutes } = require('react-router-config');
const PropTypes = require('prop-types');
const { parse } = require('qs');

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
    const navigated = nextProps.location !== this.props.location;
    if (navigated) {
      window.scrollTo(0, 0);

      const promises = matchRoutes(this.props.routes, nextProps.location.pathname)
        .map(({ route, match, location, history }) => {
          const { component } = route;
          if (component && component.getInitialProps) {
            const ctx = { match, location, history };
            const { getInitialProps } = component;
            return getInitialProps ? getInitialProps(ctx) : null;
          }
          return null;
        })
        .filter(Boolean);

      try {
        const [initialProps] = await Promise.all(promises);
        this.setState({ initialProps });
      } catch (e) {
        console.log('getInitialProps error: ', e);
      }
    }
  }

  render() {
    const { initialProps } = this.state;
    const { route, location: { search } } = this.props;
    // 将解析后的 querystring 对象挂载到 location 对象上
    this.props.location.query = parse(search, { ignoreQueryPrefix: true });
    return renderRoutes(route.routes, initialProps);
  }
}
