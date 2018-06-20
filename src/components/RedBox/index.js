import React from 'react';
import PropTypes from 'prop-types';

const RedBox = (props) => {
  const { error: { name, message, stack } } = props;
  const bodyStyle = {
    background: 'rgb(204, 0, 0)',
    color: '#fff'
  };
  const preStyle = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{message}</title>
      </head>
      <body style={bodyStyle}>
        <h3>{name}: {message}</h3>
        <pre style={preStyle}>{stack}</pre>
      </body>
    </html>
  );
};

RedBox.propTypes = {
  error: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    stack: PropTypes.string
  }).isRequired
};

export default RedBox;
