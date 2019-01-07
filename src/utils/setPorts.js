import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';

// Checks if PORT and PORT_DEV are available and suggests alternatives if not
export default async () => {
  const { DACE_HOST, DACE_PORT } = process.env;
  const webserverPort = parseInt(DACE_PORT, 10);
  const staticPort = webserverPort + 1;

  await choosePort(DACE_HOST, webserverPort);
  await choosePort(DACE_HOST, staticPort);
};
