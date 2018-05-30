import React, { Component } from 'react';
import Helmet from 'react-helmet';
import logo from './logo.png';
import styles from './style.css';

export default () => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h2 className={styles.header}>Home</h2>
    <div className={styles.box}>
      <img className={styles.card} src={logo} alt="logo" />
    </div>
  </div>
);
