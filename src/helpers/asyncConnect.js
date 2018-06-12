import React, { Component } from 'react';

export default loadData => Target => class extends Component {
  constructor(props) {
    super(props, Target);
  }

  // componentDidMount() {
  //   // 浏览器端获取数据
  //   this.props.fetchUsers();
  // }

  static getInitialProps(store) {
    return loadData(store);
  }

  render() {
    return <Target {...this.props} />;
  }
};
