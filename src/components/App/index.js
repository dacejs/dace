import { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

@connect(state => state)
export default class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  static defaultProps = {
    dispatch: () => {}
  }

  render() {
    const { route, dispatch } = this.props;
    return renderRoutes(route.routes, { dispatch });
  }
}
