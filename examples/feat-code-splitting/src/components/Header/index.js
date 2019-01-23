import React from 'react';
import { Link } from 'dace';
import './4.css';

export default () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/users">Users</Link>
    </li>
  </ul>
);
