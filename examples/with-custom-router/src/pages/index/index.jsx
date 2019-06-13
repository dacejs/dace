import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dace';

const Index = ({ match }) => (
  <div>
    <h1>with-custom-router example</h1>
    <h2>id={match.params.id}</h2>
    <ul>
      <li>
        <Link to="/a/1">/a/1</Link>
      </li>
      <li>
        <Link to="/b/2/c">/b/2/c</Link>
      </li>
    </ul>
  </div>
);

Index.propTypes = {
  match: PropTypes.object
};

Index.defaultProps = {
  match: {
    params: {}
  }
};

export default Index;
