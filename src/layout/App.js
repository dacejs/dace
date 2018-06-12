import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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
    return (
      <div>
        <Header />
        {renderRoutes(route.routes, { dispatch })}
      </div>
    );
  }
}
