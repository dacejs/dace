import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: ''
  }

  static getInitialProps() {
    return { name: 'Joe' };
  }

  render() {
    return (
      <div>
        <h1>with-babelrc example</h1>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}
