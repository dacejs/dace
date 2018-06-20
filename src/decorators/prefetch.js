import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default loadData => Target => class extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props, Target);
  }

  componentDidMount() {
    // 浏览器端获取数据
    loadData(this.props.dispatch);
  }

  static getInitialProps(store) {
    return loadData(store.dispatch);
  }

  render() {
    return <Target {...this.props} />;
  }
};
