import React, { Component } from 'react';
import logo from './logo.png';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <img src={logo} />
      </div>
    );
  }
};
