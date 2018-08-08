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
        .map(({ route, match }) => {
          const { component } = route;
          if (component && component.getInitialProps) {
            // 将解析后的 querystring 对象挂载到 location 对象上
            const query = parse(window.location.search, { ignoreQueryPrefix: true });
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

  render() {
    const { initialProps } = this.state;
    const { route } = this.props;
    return renderRoutes(route.routes, initialProps);
  }
}
