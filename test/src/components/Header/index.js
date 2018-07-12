import React from 'react';
import { Link } from 'dace';
import logo from './logo.png';
import s from './style.css';

export default () => (
  <nav>
    <Link to="/" className={s.brandLogo}>
      <img src={logo} alt="logo" />
    </Link>
    <ul className={s.right}>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
    </ul>
  </nav>
);
