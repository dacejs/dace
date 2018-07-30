import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dace';

const Index = props => (
  <div>
    <h1>with-custom-router example</h1>
    <h2>id={props.match.params.id}</h2>
    <ul>
      <li>
        <Link to="/1">1</Link>
      </li>
      <li>
        <Link to="/2">2</Link>
      </li>
      <li>
        <Link to="/3">3</Link>
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
