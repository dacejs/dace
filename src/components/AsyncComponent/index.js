import React, { Component } from 'react';

/**
 * 辅助 webpack 拆分打包的高阶组件
 * 目的是为了动态加载其它页面组件
 *
 * @param {component} importComponent 欲动态加载的组件
 * @return {component}
 */
export default (importComponent) => {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component }); // eslint-disable-line
    }

    render() {
      const WrappedComponent = this.state.component;
      return WrappedComponent ? <WrappedComponent {...this.props} /> : null;
    }
  }

  return AsyncComponent;
};
