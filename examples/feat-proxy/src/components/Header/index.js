import React from 'react';
import { Link } from 'dace';
import logo from './logo.svg';
import './style.css';

export default () => (
  <nav>
    <Link to="/" className="brandLogo">
      <img src={logo} alt="logo" />
    </Link>
    <ul className="right">
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  </nav>
);
