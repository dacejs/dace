import http from 'http';
import chalk from 'chalk';
import app from './createServer';

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.DACE_PORT, (error) => {
  if (error) {
    console.log(error);
  }

  const url = chalk.underline(`http://${process.env.DACE_HOST}:${process.env.DACE_PORT}`);
  console.log(`\n🐟 Your application is running at ${url}`);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./createServer', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./createServer'); // eslint-disable-line
    server.on('request', newApp);
    currentApp = newApp;
  });
}
