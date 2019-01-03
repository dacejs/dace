import React from 'react';
import { Link } from 'dace';

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
    </ul>
  </nav>
);
