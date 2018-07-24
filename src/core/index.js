import http from 'http';
import app from './server';

const server = http.createServer(app);

let currentApp = app;

server.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }

  console.log('🐟 🐟 🐟 Dace running at http://localhost:3000/');
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
