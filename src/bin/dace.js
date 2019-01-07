#!/usr/bin/env node

import program from 'commander';
import logger from '../utils/logger';
import { version } from '../../package.json';
import '../utils/env';

program
  .command('start', '启动本地服务', { isDefault: true })
  .command('build', '编译工程')
  .parse(process.argv);

logger.info(`dace/${version} ${process.env.npm_config_user_agent}`);
