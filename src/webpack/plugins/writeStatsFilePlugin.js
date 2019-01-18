import { dirname } from 'path';
import { writeFileSync } from 'fs';
import mkdirp from 'mkdirp';

/**
 * 将 webpack state 信息写入文件
 */
class WriteStatsFilePlugin {
  constructor(options) {
    this.options = {
      ...options,
      filename: process.env.DACE_PATH_STATS_JSON,
      toJsonOptions: {
        all: false,
        publicPath: true,
        chunks: true
      }
    };
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, (stats) => {
      const { filename, toJsonOptions } = this.options;
      const json = stats.toJson(toJsonOptions);
      const fullpath = filename;
      mkdirp.sync(dirname(fullpath));
      writeFileSync(fullpath, JSON.stringify(json));
    });
  }
}

export default WriteStatsFilePlugin;
