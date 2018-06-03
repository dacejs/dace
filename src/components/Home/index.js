import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import logo from './logo.png';
import s from './style.css';

@connect(state => state)
export default class Home extends Component {
  render() {
    console.log('--this.props:', this.props);
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h2 className={s.header}>Home</h2>
        <div className={s.box}>
          <img className={s.card} src={logo} alt="logo" />
          <ul>
            {
              this.props.users.map(user => (
                <li key={user.name}>{user.name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
};
