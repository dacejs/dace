import { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

@connect(state => state)
export default class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { route, store } = this.props;
    return renderRoutes(route.routes, { store });
  }
}
