const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

// Checks if PORT and PORT_DEV are available and suggests alternatives if not
module.exports = async () => {
  await choosePort('localhost', 3000);
  await choosePort('localhost', 3001);
};
