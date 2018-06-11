import React from 'react';

export default (props) => {
  const { error } = props;
  const message = error.toString();
  const bodyStyle = {
    background: 'rgb(204, 0, 0)',
    color: '#fff'
  };
  const preStyle = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{message}</title>
      </head>
      <body style={bodyStyle}>
        <h3>{error.name}: {error.message}</h3>
        <pre style={preStyle}>{error.stack}</pre>
      </body>
    </html>
  );
};
