import React, { Component } from 'react';

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
