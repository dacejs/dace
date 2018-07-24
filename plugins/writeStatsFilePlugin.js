const { resolve, dirname } = require('path');
const { writeFileSync } = require('fs');
const mkdirp = require('mkdirp');

/**
 * 将 webpack state 信息写入文件
 */
class WriteStatsFilePlugin {
  constructor(options) {
    this.options = {
      ...options,
      filename: 'webpack-stats.json',
      toJsonOptions: {
        all: false,
        publicPath: true,
        chunks: true
      }
    };
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, (stats) => {
      const { filename, toJsonOptions, outputPath = compiler.options.output.path } = this.options;
      const json = stats.toJson(toJsonOptions);
      const fullpath = resolve(outputPath, filename);
      mkdirp.sync(dirname(fullpath));
      writeFileSync(fullpath, JSON.stringify(json));
    });
  }
}

module.exports = WriteStatsFilePlugin;
