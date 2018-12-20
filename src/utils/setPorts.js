import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';

// 检查 PORT 和 PORT_DEV 是否可用
// 不可用的话，更换端口
const { DACE_PORT } = process.env;
export default async () => {
  await choosePort('localhost', DACE_PORT);
  await choosePort('localhost', parseInt(DACE_PORT, 10) + 1);
};
