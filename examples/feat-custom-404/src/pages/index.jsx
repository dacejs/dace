import React from 'react';
import { Link } from 'dace';

export default () => (
  <div>
    <h1>Home</h1>
    <ul>
      <li>
        <Link to="/404">404</Link>
      </li>
    </ul>
  </div>
);
