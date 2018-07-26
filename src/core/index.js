import http from 'http';
import app from './server';

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.DACE_PORT, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`🐟 Your application is running at http://${process.env.DACE_HOST}:${process.env.DACE_PORT}`);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server');
    server.on('request', newApp);
    currentApp = newApp;
  });
}
